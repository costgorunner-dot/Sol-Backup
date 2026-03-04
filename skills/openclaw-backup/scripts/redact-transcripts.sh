#!/bin/bash

# Redact all API keys from transcript files
# Run this anytime to manually redact sensitive data

WORKSPACE_DIR="/home/ubuntu/.openclaw/workspace"

echo "🔍 Searching for transcript files..."

# Find all transcript files
FILES=$(find "$WORKSPACE_DIR/memory/transcripts" -name "*.md" 2>/dev/null)
FILES+=" "
FILES+=$(find "$WORKSPACE_DIR/memory/raw" -name "*.md" 2>/dev/null)

if [ -z "$FILES" ]; then
    echo "❌ No transcript files found"
    exit 0
fi

echo "📝 Found files to redact:"
echo "$FILES"
echo ""

# Count occurrences before
echo "📊 Counting API keys before redaction..."
OPENROUTER_BEFORE=$(grep -o 'sk-or-v1-[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)
JOTTY_BEFORE=$(grep -o 'ck_[a-f0-9]\{32\}' $FILES 2>/dev/null | wc -l)
TAVILY_BEFORE=$(grep -o 'tvly-dev-[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)
GITHUB_BEFORE=$(grep -o 'ghp_[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)

echo "  OpenRouter keys: $OPENROUTER_BEFORE"
echo "  Jotty keys: $JOTTY_BEFORE"
echo "  Tavily keys: $TAVILY_BEFORE"
echo "  GitHub tokens: $GITHUB_BEFORE"
echo ""

# Perform redaction
echo "🔒 Redacting sensitive data..."
find "$WORKSPACE_DIR/memory" -type f -name "*.md" -exec sed -i \
    -e 's/sk-or-v1-[a-zA-Z0-9]*/REDACTED/g' \
    -e 's/tvly-dev-[a-zA-Z0-9]*/REDACTED/g' \
    -e 's/ghp_[a-zA-Z0-9]*/REDACTED/g' \
    -e 's/[a-f0-9]\{32\}\.klnF[A-Z0-9]*/REDACTED/g' \
    -e 's/ck_[a-f0-9]\{32\}/REDACTED/g' \
    -e 's/\[REDACTED_OPENROUTER_KEY\]/REDACTED/g' \
    -e 's/\[REDACTED_TAVILY_KEY\]/REDACTED/g' \
    -e 's/\[REDACTED_GITHUB_TOKEN\]/REDACTED/g' \
    -e 's/\[REDACTED_JOTTY_KEY\]/REDACTED/g' \
    {} \; 2>/dev/null

# Count occurrences after
echo "✅ Counting API keys after redaction..."
OPENROUTER_AFTER=$(grep -o 'sk-or-v1-[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)
JOTTY_AFTER=$(grep -o 'ck_[a-f0-9]\{32\}' $FILES 2>/dev/null | wc -l)
TAVILY_AFTER=$(grep -o 'tvly-dev-[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)
GITHUB_AFTER=$(grep -o 'ghp_[a-zA-Z0-9]*' $FILES 2>/dev/null | wc -l)

echo "  OpenRouter keys: $OPENROUTER_AFTER (was $OPENROUTER_BEFORE)"
echo "  Jotty keys: $JOTTY_AFTER (was $JOTTY_BEFORE)"
echo "  Tavily keys: $TAVILY_AFTER (was $TAVILY_BEFORE)"
echo "  GitHub tokens: $GITHUB_AFTER (was $GITHUB_BEFORE)"
echo ""

# Also redact TOOLS.md
if [ -f "$WORKSPACE_DIR/TOOLS.md" ]; then
    echo "🔒 Redacting TOOLS.md..."
    sed -i \
        -e 's/sk-or-v1-[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/tvly-dev-[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/ghp_[a-zA-Z0-9]*/REDACTED/g' \
        -e 's/[a-f0-9]\{32\}\.klnF[A-Z0-9]*/REDACTED/g' \
        -e 's/ck_[a-f0-9]\{32\}/REDACTED/g' \
        "$WORKSPACE_DIR/TOOLS.md" 2>/dev/null
    echo "✅ TOOLS.md redacted"
fi

echo ""
echo "✅ Redaction complete!"
echo "💡 Run 'git diff' to see what was changed"
