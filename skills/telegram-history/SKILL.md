---
name: telegram-history
description: Persistent Telegram message history logger and session context provider. Logs every incoming message to a JSON file and provides last 20 messages at session start for conversational continuity.
homepage: https://github.com/openclaw/skills
metadata:
  openclaw:
    emoji: "📜"
    requires:
      bins: []
      env: []
    permissions:
      - message:read
      - file:read
      - file:write
---

# Telegram History

Provides persistent message history by logging every incoming Telegram message to a JSON file and providing recent context at session start. Complements daily memory files with searchable message history.

## How It Works

**Two-Part System:**

1. **Message Logger** (runs on every incoming message)
   - Captures timestamp, sender, message ID, and text
   - Appends to `memory/telegram-history.json`
   - Automatic, no manual intervention needed

2. **Session Start Reader** (runs when session begins)
   - Reads last 20 messages from `memory/telegram-history.json`
   - Provides as context for conversation continuity
   - Helps maintain awareness across sessions

## Files

```
skills/telegram-history/
├── SKILL.md (this file)
├── log-message.js (message logger)
└── read-history.js (session start reader)

memory/
└── telegram-history.json (persistent message log)
```

## Data Format

`memory/telegram-history.json`:
```json
[
  {
    "timestamp": "2026-02-24T14:45:00-08:00",
    "messageId": "19230",
    "sender": "5083035103",
    "text": "example message",
    "chatId": "5083035103"
  }
]
```

## Usage

**Automatic Operation:**
- Messages are logged automatically as they arrive
- History is provided at session start automatically

**Manual Commands:**
- `/telegram-history` — Show last 20 messages
- `/telegram-history [n]` — Show last n messages
- `/telegram-history search [query]` — Search message history

## Integration

**At Session Start:**
1. Read `memory/telegram-history.json`
2. Extract last 20 messages
3. Provide as context summary:
   ```
   Recent Telegram History (last 20 messages):
   - [14:45] User: "example message"
   - [14:44] User: "previous message"
   ...
   ```

**On Message Receipt:**
1. Extract message details from inbound context
2. Append to `memory/telegram-history.json`
3. Maintain chronological order

## Privacy & Security

- Only logs messages from YOUR chat (not other Telegram conversations)
- Stored locally in `memory/` folder
- Not sent to external services
- Can be cleared anytime by deleting `telegram-history.json`

## Benefits

- ✅ Full message history (not limited to 24h like Telegram API)
- ✅ Timestamps included (solves the missing timestamp issue!)
- ✅ Searchable for future reference
- ✅ Complements daily memory files
- ✅ Works offline (no API calls needed)

## Maintenance

**File Size Management:**
- Script auto-trims to last 1000 messages
- Keeps history manageable
- Older messages available in daily memory files

**Manual Cleanup:**
- Delete `memory/telegram-history.json` to clear all history
- History will rebuild automatically
