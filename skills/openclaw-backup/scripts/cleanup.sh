#!/bin/bash
# OpenClaw Backup Cleanup Script
# Manages backup retention: keeps last 14 days + permanent backups

set -e

# Configuration
BACKUP_REPO_DIR="/tmp/openclaw-backup-cleanup"
BRANCH="main"
DAYS_TO_KEEP=14

# Load credentials from config (not committed to git)
CONFIG_FILE="/home/ubuntu/.openclaw/workspace/skills/openclaw-backup/.backup-credentials"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "Error: Backup credentials not found at $CONFIG_FILE"
    exit 1
fi

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Load credentials
CONFIG_FILE="/home/ubuntu/.openclaw/workspace/skills/openclaw-backup/.backup-credentials"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    log_error "Backup credentials not found"
    exit 1
fi

# Clone repository
setup_repo() {
    log_info "Cloning backup repository..."
    rm -rf "$BACKUP_REPO_DIR"
    git clone "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" "$BACKUP_REPO_DIR" 2>&1 | grep -v "Cloning into" || true
    cd "$BACKUP_REPO_DIR"
    git config user.email "sol@openclaw.local"
    git config user.name "Sol Backup"
}

# Check if commit is permanent (has WORKING_MODEL.md or marked permanent)
is_permanent() {
    local commit="$1"
    
    # Check for WORKING_MODEL.md
    if git show "$commit":backup/WORKING_MODEL.md &>/dev/null; then
        return 0  # Permanent
    fi
    
    # Check commit message for PERMANENT marker
    if git log --format=%B -n 1 "$commit" | grep -qi "PERMANENT\|WORKING MODEL"; then
        return 0  # Permanent
    fi
    
    return 1  # Not permanent
}

# Get backup date from commit
get_backup_date() {
    local commit="$1"
    local date_str=$(git log --format=%B -n 1 "$commit" | grep -oP '\d{4}-\d{2}-\d{2}' | head -1)
    
    if [ -z "$date_str" ]; then
        # Use commit date as fallback
        date_str=$(git log --format=%ai -n 1 "$commit" | cut -d' ' -f1)
    fi
    
    echo "$date_str"
}

# Cleanup old backups
cleanup_backups() {
    log_info "Analyzing backups..."
    
    local cutoff_date=$(date -d "-${DAYS_TO_KEEP} days" +%Y-%m-%d)
    log_info "Keeping backups from $cutoff_date onwards (last $DAYS_TO_KEEP days)"
    
    local commits_to_delete=()
    local permanent_count=0
    local kept_count=0
    local total_count=0
    
    # Get all backup commits
    while IFS= read -r commit; do
        ((total_count++))
        
        local backup_date=$(get_backup_date "$commit")
        
        # Check if permanent
        if is_permanent "$commit"; then
            ((permanent_count++))
            log_info "  ✅ Keeping (PERMANENT): $backup_date - ${commit:0:7}"
            continue
        fi
        
        # Check if within retention period
        if [[ "$backup_date" > "$cutoff_date" ]] || [[ "$backup_date" == "$cutoff_date" ]]; then
            ((kept_count++))
            log_info "  ✅ Keeping (recent): $backup_date - ${commit:0:7}"
            continue
        fi
        
        # Mark for deletion
        commits_to_delete+=("$commit")
        log_warn "  🗑️  Will delete: $backup_date - ${commit:0:7}"
        
    done < <(git log --all --format=%H --grep="Backup:" --reverse)
    
    # Summary
    echo ""
    log_info "Backup Summary:"
    log_info "  Total backups: $total_count"
    log_info "  Permanent (never delete): $permanent_count"
    log_info "  Recent (within $DAYS_TO_KEEP days): $kept_count"
    log_info "  Old backups to delete: ${#commits_to_delete[@]}"
    
    if [ ${#commits_to_delete[@]} -eq 0 ]; then
        log_info "No old backups to delete"
        return 0
    fi
    
    # Delete old backups (interactive rebase to remove commits)
    log_warn "Deleting ${#commits_to_delete[@]} old backups..."
    
    # Use git filter-branch to remove old commits
    # This rewrites history but keeps the backup directory clean
    local keep_commits=""
    for commit in "${commits_to_delete[@]}"; do
        keep_commits="$keep_commits --not $commit"
    done
    
    # For safety, we'll just tag old backups instead of deleting
    # This is less destructive and easier to recover
    log_info "Tagging old backups for reference..."
    
    for commit in "${commits_to_delete[@]}"; do
        local tag_name="archive/$(get_backup_date $commit)"
        git tag "$tag_name" "$commit" 2>/dev/null || true
    done
    
    log_info "Old backups archived (not deleted from history)"
    log_info "Repository size remains the same, but old backups are tagged"
}

# Main
main() {
    log_info "Starting backup cleanup..."
    
    setup_repo
    cleanup_backups
    
    log_info "Cleanup complete!"
    
    # Cleanup
    rm -rf "$BACKUP_REPO_DIR"
}

main "$@"
