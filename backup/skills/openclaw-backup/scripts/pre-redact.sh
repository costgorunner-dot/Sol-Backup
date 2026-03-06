#!/bin/bash
# Pre-Backup Redaction Script
# Runs 10 minutes before each backup to ensure all API keys are redacted
# This is a safety net to catch any keys that might have been missed

WORKSPACE_DIR="/home/ubuntu/.openclaw/workspace"
LOG_FILE="/home/ubuntu/.openclaw/logs/pre-redact-$(date +%Y-%m-%d).log"

# Create log directory if needed
mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🔒 Pre-backup redaction starting..."

# Count files to check
TRANSCRIPT_COUNT=$(find "$WORKSPACE_DIR/memory/transcripts" -name "*.md" 2>/dev/null | wc -l)
RAW_COUNT=$(find "$WORKSPACE_DIR/memory/raw" -name "*.md" 2>/dev/null | wc -l)

log "📝 Checking $TRANSCRIPT_COUNT transcript files and $RAW_COUNT raw files..."

# Count API keys BEFORE redaction
OPENROUTER_BEFORE=$(grep -r 'sk-or-v1-[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
JOTTY_BEFORE=$(grep -r 'ck_[a-f0-9]\{32\}' "$WORKSPACE_DIR/memory" 2>/dev/null | wc -l)
TAVILY_BEFORE=$(grep -r 'tvly-dev-[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
GITHUB_BEFORE=$(grep -r 'ghp_[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
ZAI_BEFORE=$(grep -r '[a-f0-9]\{32\}\.klnF' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)

TOTAL_BEFORE=$((OPENROUTER_BEFORE + JOTTY_BEFORE + TAVILY_BEFORE + GITHUB_BEFORE + ZAI_BEFORE))

if [ $TOTAL_BEFORE -gt 0 ]; then
    log "⚠️  Found $TOTAL_BEFORE exposed API keys!"
    log "   OpenRouter: $OPENROUTER_BEFORE"
    log "   Jotty: $JOTTY_BEFORE"
    log "   Tavily: $TAVILY_BEFORE"
    log "   GitHub: $GITHUB_BEFORE"
    log "   ZAI: $ZAI_BEFORE"
    
    # Perform redaction
    log "🔒 Redacting sensitive data..."
    
    find "$WORKSPACE_DIR/memory" -type f -name "*.md" -exec sed -i \
        -e 's/sk-or-v1-[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/tvly-dev-[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/ghp_[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/[a-f0-9]\{32\}\.klnF[A-Z0-9]*/REDACTED/g' \
        -e 's/ck_[a-f0-9]\{32\}/REDACTED/g' \
        {} \; 2>/dev/null
    
    # Count after redaction
    OPENROUTER_AFTER=$(grep -r 'sk-or-v1-[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
    JOTTY_AFTER=$(grep -r 'ck_[a-f0-9]\{32\}' "$WORKSPACE_DIR/memory" 2>/dev/null | wc -l)
    TAVILY_AFTER=$(grep -r 'tvly-dev-[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
    GITHUB_AFTER=$(grep -r 'ghp_[a-zA-Z0-9]*' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
    ZAI_AFTER=$(grep -r '[a-f0-9]\{32\}\.klnF' "$WORKSPACE_DIR/memory" 2>/dev/null | grep -v REDACTED | wc -l)
    
    log "✅ After redaction:"
    log "   OpenRouter: $OPENROUTER_AFTER (was $OPENROUTER_BEFORE)"
    log "   Jotty: $JOTTY_AFTER (was $JOTTY_BEFORE)"
    log "   Tavily: $TAVILY_AFTER (was $TAVILY_BEFORE)"
    log "   GitHub: $GITHUB_AFTER (was $GITHUB_BEFORE)"
    log "   ZAI: $ZAI_AFTER (was $ZAI_BEFORE)"
else
    log "✅ No exposed API keys found - all clean!"
fi

# Also check TOOLS.md
if [ -f "$WORKSPACE_DIR/TOOLS.md" ]; then
    TOOLS_KEYS=$(grep -E 'sk-or-v1-|ck_[a-f0-9]|tvly-dev-|ghp_' "$WORKSPACE_DIR/TOOLS.md" 2>/dev/null | grep -v REDACTED | wc -l)
    
    if [ $TOOLS_KEYS -gt 0 ]; then
        log "⚠️  Found $TOOLS_KEYS keys in TOOLS.md - redacting..."
        sed -i \
            -e 's/sk-or-v1-[a-zA-Z0-9]*/REDACTED/g' \
            -e 's/tvly-dev-[a-zA-Z0-9]*/REDACTED/g' \
            -e 's/ghp_[a-zA-Z0-9]*/REDACTED/g' \
            -e 's/[a-f0-9]\{32\}\.klnF[A-Z0-9]*/REDACTED/g' \
            -e 's/ck_[a-f0-9]\{32\}/REDACTED/g' \
            "$WORKSPACE_DIR/TOOLS.md" 2>/dev/null
        log "✅ TOOLS.md redacted"
    fi
fi

log "✅ Pre-backup redaction complete! Backup can now safely run."
log ""
