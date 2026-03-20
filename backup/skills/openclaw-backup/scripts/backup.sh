#!/bin/bash
# OpenClaw Backup Script
# Backs up workspace to GitHub repository

set -e

WORKSPACE="/Users/user/.openclaw/workspace"
BACKUP_DIR="$WORKSPACE/backup"
LOG_FILE="$BACKUP_DIR/backup.log"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Ensure we're in the workspace git repository
cd "$WORKSPACE"

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "[$TIMESTAMP] No changes to backup" >> "$LOG_FILE"
    exit 0
fi

# Add all changes
git add -A

# Create commit with timestamp
git commit -m "Backup: $TIMESTAMP"

# Push to GitHub
git push origin main

echo "[$TIMESTAMP] Backup completed successfully" >> "$LOG_FILE"
