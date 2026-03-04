#!/bin/bash
# Extract user messages from session files and add to telegram-history.json

HISTORY_FILE="/home/ubuntu/.openclaw/workspace/memory/telegram-history.json"
SESSIONS_DIR="/home/ubuntu/.openclaw/agents/main/sessions"

# Create temp file for new messages
TEMP_MESSAGES=$(mktemp)

# Extract user messages from all non-deleted session files
for session in "$SESSIONS_DIR"/*.jsonl; do
  if [[ ! "$session" =~ deleted ]]; then
    echo "Processing: $(basename $session)"
    # Extract user messages with timestamps
    jq -c 'select(.type=="message" and .message.role=="user") | {
      messageId: .id,
      sender: "5083035103",
      text: (.message.content | if type=="array" then .[0].text else . end),
      timestamp: .timestamp,
      chatId: "5083035103"
    }' "$session" 2>/dev/null >> "$TEMP_MESSAGES"
  fi
done

echo ""
echo "Extracted $(wc -l < "$TEMP_MESSAGES") messages"
echo ""

# Load existing history
if [ -f "$HISTORY_FILE" ]; then
  EXISTING=$(cat "$HISTORY_FILE" | jq -c '.[]' 2>/dev/null)
  echo "Existing messages: $(echo "$EXISTING" | wc -l)"
else
  EXISTING=""
  echo "No existing history file"
fi

# Combine and deduplicate
{
  [ -n "$EXISTING" ] && echo "$EXISTING"
  cat "$TEMP_MESSAGES"
} | jq -s 'unique_by(.messageId) | sort_by(.timestamp)' > "$HISTORY_FILE.tmp"

# Replace original
mv "$HISTORY_FILE.tmp" "$HISTORY_FILE"

echo ""
echo "✅ Done! Total messages in history: $(jq 'length' "$HISTORY_FILE")"

# Cleanup
rm "$TEMP_MESSAGES"
