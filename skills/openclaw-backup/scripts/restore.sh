#!/bin/bash
# OpenClaw Restore Script
# Restores backup from GitHub repository

set -e

# Configuration
BACKUP_DIR="/home/ubuntu/.openclaw"
WORKSPACE_DIR="/home/ubuntu/.openclaw/workspace"
RESTORE_DIR="/tmp/openclaw-restore"
BRANCH="main"
COMMIT="${1:-}"  # Optional specific commit

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

# Download backup
download_backup() {
    log_info "Downloading backup from GitHub..."
    
    rm -rf "$RESTORE_DIR"
    
    git clone "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" "$RESTORE_DIR" 2>&1 | grep -v "Cloning into" || true
    
    cd "$RESTORE_DIR"
    
    # Checkout specific commit if provided
    if [ -n "$COMMIT" ]; then
        log_info "Restoring from commit: $COMMIT"
        git checkout "$COMMIT"
    else
        log_info "Restoring from latest backup"
    fi
    
    log_info "Backup downloaded successfully"
}

# Verify backup
verify_backup() {
    log_info "Verifying backup integrity..."
    
    if [ ! -d "$RESTORE_DIR/backup" ]; then
        log_error "Invalid backup: backup/ directory not found"
        exit 1
    fi
    
    if [ ! -f "$RESTORE_DIR/backup/BACKUP_INFO.md" ]; then
        log_warn "Backup info file missing, but continuing..."
    fi
    
    log_info "Backup verification complete"
}

# Restore files
restore_files() {
    log_info "Restoring files..."
    
    # Restore skills
    if [ -d "$RESTORE_DIR/backup/skills" ]; then
        log_info "Restoring skills..."
        mkdir -p "$WORKSPACE_DIR/skills"
        cp -r "$RESTORE_DIR/backup/skills"/* "$WORKSPACE_DIR/skills/" 2>/dev/null || true
    fi
    
    # Restore memory
    if [ -d "$RESTORE_DIR/backup/memory" ]; then
        log_info "Restoring memory..."
        mkdir -p "$WORKSPACE_DIR/memory"
        cp -r "$RESTORE_DIR/backup/memory"/* "$WORKSPACE_DIR/memory/" 2>/dev/null || true
    fi
    
    # Restore workspace files
    if [ -d "$RESTORE_DIR/backup/workspace" ]; then
        log_info "Restoring workspace files..."
        cp "$RESTORE_DIR/backup/workspace"/*.md "$WORKSPACE_DIR/" 2>/dev/null || true
    fi
    
    # Restore config
    if [ -d "$RESTORE_DIR/backup/config" ]; then
        log_info "Restoring configuration..."
        
        # Backup current config first
        cp "$BACKUP_DIR/openclaw.json" "$BACKUP_DIR/openclaw.json.pre-restore" 2>/dev/null || true
        
        # Restore config
        cp "$RESTORE_DIR/backup/config/openclaw.json" "$BACKUP_DIR/" 2>/dev/null || true
        
        # Restore agents config
        if [ -d "$RESTORE_DIR/backup/config/agents" ]; then
            mkdir -p "$BACKUP_DIR/agents"
            cp -r "$RESTORE_DIR/backup/config/agents"/* "$BACKUP_DIR/agents/" 2>/dev/null || true
        fi
    fi
    
    # Restore cron jobs
    if [ -d "$RESTORE_DIR/backup/cron" ]; then
        log_info "Restoring cron jobs..."
        mkdir -p "$BACKUP_DIR/cron"
        cp -r "$RESTORE_DIR/backup/cron"/* "$BACKUP_DIR/cron/" 2>/dev/null || true
    fi
    
    log_info "Files restored successfully"
}

# Post-restore steps
post_restore() {
    log_info "Running post-restore steps..."
    
    # Set correct permissions
    chmod -R u+rw "$WORKSPACE_DIR"
    chmod -R u+rw "$BACKUP_DIR"
    
    log_warn "Important: You need to manually restore:"
    log_warn "  1. API keys in ~/.openclaw/credentials/"
    log_warn "  2. Restart OpenClaw: systemctl --user restart openclaw-gateway"
    log_warn "  3. Verify cron jobs are active"
    
    log_info "Restore complete!"
    log_info "Your OpenClaw customizations have been restored."
}

# Main
main() {
    log_info "Starting OpenClaw restore..."
    
    download_backup
    verify_backup
    restore_files
    post_restore
    
    # Cleanup
    rm -rf "$RESTORE_DIR"
    
    log_info "Restore finished successfully!"
}

main "$@"
