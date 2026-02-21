#!/bin/bash
# Manual backup of configuration files (with API key redaction)
# Only run when explicitly requested by user

set -e

BACKUP_DIR="/tmp/manual-config-backup"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

echo "Creating manual configuration backup..."

mkdir -p "$BACKUP_DIR"

# Backup openclaw.json with redaction
if [ -f ~/.openclaw/openclaw.json ]; then
    echo "Backing up openclaw.json (with API key redaction)..."
    cat ~/.openclaw/openclaw.json | \
        sed 's/sk-or-v1-[a-zA-Z0-9]*/INSERT_OPENROUTER_API_KEY_HERE/g' | \
        sed 's/tvly-dev-[a-zA-Z0-9]*/INSERT_TAVILY_API_KEY_HERE/g' | \
        sed 's/ghp_[a-zA-Z0-9]*/INSERT_GITHUB_TOKEN_HERE/g' | \
        sed 's/[a-f0-9]\{32\}\.klnF[A-Z0-9]*/INSERT_ZAI_API_KEY_HERE/g' \
        > "$BACKUP_DIR/openclaw-redacted.json"
fi

# Backup credentials template (no actual keys)
echo "Creating credentials template..."
mkdir -p "$BACKUP_DIR/credentials-templates"
cat > "$BACKUP_DIR/credentials-templates/zai-default.json.template" << 'EOF'
{"apiKey": "INSERT_ZAI_API_KEY_HERE"}
EOF
cat > "$BACKUP_DIR/credentials-templates/openrouter-default.json.template" << 'EOF'
{"apiKey": "INSERT_OPENROUTER_API_KEY_HERE"}
EOF
cat > "$BACKUP_DIR/credentials-templates/tavily-default.json.template" << 'EOF'
{"apiKey": "INSERT_TAVILY_API_KEY_HERE"}
EOF

# Create README
cat > "$BACKUP_DIR/README.md" << 'EOF'
# Manual Configuration Backup

**Created:** TIMESTAMP_PLACEHOLDER
**Purpose:** Backup of OpenClaw configuration with redacted API keys

## Files in This Backup

- `openclaw-redacted.json` - Main config (API keys redacted)
- `credentials-templates/` - Template files for API keys

## How to Restore

1. Copy `openclaw-redacted.json` to `~/.openclaw/openclaw.json`
2. Replace INSERT_* placeholders with your actual API keys
3. Use credential templates to recreate files in `~/.openclaw/credentials/`

## Security Note

All API keys have been redacted. You'll need to add your own keys after restore.
EOF

# Replace timestamp in README
sed -i "s/TIMESTAMP_PLACEHOLDER/$TIMESTAMP/g" "$BACKUP_DIR/README.md"

# Create archive
ARCHIVE_NAME="openclaw-config-backup-$TIMESTAMP.tar.gz"
tar -czf "/tmp/$ARCHIVE_NAME" -C "$BACKUP_DIR" .

echo "✅ Manual backup created: /tmp/$ARCHIVE_NAME"
echo ""
echo "This backup contains:"
echo "  - openclaw.json (with redacted API keys)"
echo "  - Credential templates (no actual keys)"
echo ""
echo "To restore, you'll need to add your API keys manually."
echo ""
echo "You can copy this file to your GitHub repository manually if needed."

# Cleanup
rm -rf "$BACKUP_DIR"
