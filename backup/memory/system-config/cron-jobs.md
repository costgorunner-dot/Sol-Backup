---
date: 2026-02-19
tags: [config, cron, automation]
---

# Cron Jobs Configuration

## Overview

**Status:** All jobs operational
**Last Updated:** February 20, 2026
**Timezone:** America/Vancouver (PST)

---

## Heartbeat System (Every 30 Minutes)

**NOT A CRON JOB** - Runs via main session heartbeat mechanism
**Schedule:** Every 30 minutes via heartbeat polls
**Purpose:** Proactive monitoring and system maintenance

### What It Does
- **System Health Checks:** Disk space, memory, errors
- **Daily Memory File Maintenance (11 PM ONLY):**
  - Check if `memory/raw/YYYY-MM-DD.md` exists for TODAY
  - If NOT exists: Create it with summary of today's conversations
  - If EXISTS: Add important new events from session history
  - **Purpose:** Ensure Dreammode Night Phase (2 AM) has data to process
  - **Timing:** Runs 3 hours before Dreammode, capturing day's activity
- **Pattern Recognition:** Track user behavior over time
- **Alerting:** Only send messages when something needs attention

### Heartbeat Schedule
| Time (PST) | Action |
|---------------|---------|
| Every 30 min | System health check |
| 11:00 PM | Create/update daily memory file |
| Rest of day | Only report if needed |

### 11 PM Memory File Task
**Why 11 PM?**
- Catches end-of-day conversations
- Runs 3 hours before Dreammode Night Phase (2 AM)
- Gives buffer if heartbeat misses
- Quiet time (less likely to interrupt active work)

**File Created:**
```
memory/raw/YYYY-MM-DD.md
```
With sections:
- System Events (cron jobs, debriefs, alerts)
- Conversation Content (important discussions)
- Key Outcomes (decisions, patterns, tasks)
- Notes (context for future reference)

### Documentation
**File:** `HEARTBEAT.md`
**Location:** `/home/ubuntu/.openclaw/workspace/HEARTBEAT.md`
**Contents:** Full heartbeat instructions and alert criteria

---

## Job 1: Daily Weather Report

**Job ID:** 4ff4de1e-ea92-4c33-a8ef-c4203e69ee1c
**Schedule:** Every day at 9:05 AM PST
**Name:** Daily Weather - Revelstoke BC
**Status:** Active and working

### What It Does
- Fetches current weather for Revelstoke, British Columbia, Canada
- Generates text summary with current conditions and forecast
- Creates voice narration using Piper TTS
  - Voice: Jenny Dioco (British English)
  - System: Fully offline
- Sends both text and voice audio to Telegram (ID: 5083035103)

### Job Configuration
```json
{
  "name": "Daily Weather - Revelstoke BC",
  "schedule": {
    "kind": "cron",
    "expr": "5 9 * * *",
    "tz": "America/Vancouver"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Get weather for Revelstoke, BC and send text + voice audio to Telegram"
  },
  "delivery": {
    "mode": "none"
  },
  "sessionTarget": "isolated",
  "enabled": true
}
```

### Weather Report Content
- Current conditions (temperature, weather, wind)
- Today's forecast (high, precipitation chance)
- Tonight's forecast (low, conditions)
- 3-day outlook
- Voice narration of full report

### Telegram Delivery
- **Channel:** telegram
- **Target:** 5083035103
- **Format:** Text message + voice audio attachment
- **Voice:** Jenny Dioco British English

### First Successful Run
**Date:** February 19, 2026 at 9:06 AM PST
**Message ID:** 17534
**Result:** Weather report successfully delivered with text and voice

---

## Job 2: Dreammode Night Phase

**Job ID:** b121c41b-c49b-4d98-99a3-d6758fa5e7f6
**Schedule:** Every day at 2:00 AM PST
**Name:** Dreammode Night Phase
**Status:** Active and working

### What It Does
- Reads yesterday's memory file: `memory/raw/YYYY-MM-DD.md`
- Extracts important items:
  - Decisions made
  - User preferences discovered
  - System changes implemented
  - Patterns detected
  - Random chat conversations
  - Noise to delete
- Analyzes content for:
  - Pattern detection across multiple days
  - Relationships between items
  - Importance scoring
- Writes to: `~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md`
- Silent operation (no message to user)

### Job Configuration
```json
{
  "name": "Dreammode Night Phase",
  "schedule": {
    "kind": "cron",
    "expr": "0 2 * * *",
    "tz": "America/Vancouver"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Process yesterday's memory log and extract candidates for MEMORY.md"
  },
  "delivery": {
    "mode": "none"
  },
  "sessionTarget": "isolated",
  "enabled": true
}
```

### Extraction Categories
1. **Preferences** - What user likes/dislikes
2. **Decisions** - Choices made during conversation
3. **Setups** - System configurations and implementations
4. **Context** - Important background information
5. **Random Chats** - Conversations worth remembering
6. **Noise** - Items to delete (not significant)

### Pattern Detection
- Tracks recurring themes across multiple days
- Identifies user behavior patterns
- Learns from keep/delete decisions (future enhancement)

### Output File Format
```
~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md
```
Contains categorized items with:
- Item content
- Proposed category/file location
- Confidence scores
- Pattern relationships
- Recommendations (keep/delete/organize)

### First Successful Run
**Date:** February 19, 2026 at 2:00 AM PST
**Result:** 19 items extracted and categorized

---

## Job 3: Dreammode Morning Debrief

**Job ID:** 394a77ab-7d52-4cbe-b142-06bd9b8bab53
**Schedule:** Every day at 9:10 AM PST
**Name:** Dreammode Morning Debrief
**Status:** Active and working

### What It Does
- Reads dream-candidates file from previous night
- Formats into structured debrief
- Sends debrief to Telegram:5083035103
- Lists extracted items with numbered references
- Waits for user review and feedback
- Processes user's keep/delete/organize instructions
- Updates MEMORY.md (or categorized files) accordingly
- Deletes dream-candidates file after processing

### Job Configuration
```json
{
  "name": "Dreammode Morning Debrief",
  "schedule": {
    "kind": "cron",
    "expr": "10 9 * * *",
    "tz": "America/Vancouver"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Send formatted debrief of yesterday's memory extraction"
  },
  "delivery": {
    "mode": "none"
  },
  "sessionTarget": "isolated",
  "enabled": true
}
```

### Debrief Format
```
🌙 Dreammode Morning Debrief - February 19, 2026

📋 Extracted Items (19 total):

🔧 Configuration & System Changes:
1. [item content]

🎯 Preferences & Decisions:
2. [item content]

...

🗑️ Noise to Delete:
• [items to remove]

---
Reply with:
• "Keep #1, #2" - Add to MEMORY.md
• "Delete #1" - Remove permanently
• "Organize #3 under [category]" - File accordingly
```

### User Review Process
1. User receives debrief via Telegram
2. User reviews extracted items
3. User replies with feedback:
   - "Keep #1, #2" - Add to permanent memory
   - "Delete #1" - Remove item
   - "Organize #3 under [category]" - Move to specific file
4. Agent processes feedback and updates memory files
5. dream-candidates file deleted after processing

### First Successful Run
**Date:** February 19, 2026 at 9:10 AM PST
**Result:** 19 items presented, all 19 items kept per user feedback
**Message ID:** 17537

---

## Cron Management Commands

### Check Status
```bash
openclaw cron status
```

### List Jobs
```bash
openclaw cron list
```

### Run Job Manually
```bash
openclaw cron run [job-id]
```

### View Job Runs
```bash
openclaw cron runs [job-id]
```

### Update Job
```bash
openclaw cron update [job-id] [patch-data]
```

---

## Session Targets

### Main Session
- **Use for:** System events, reminders
- **Payload Kind:** `systemEvent`
- **Format:** Injects text as system event into main session

### Isolated Session
- **Use for:** Automated tasks, cron jobs
- **Payload Kind:** `agentTurn`
- **Format:** Runs agent turn in isolated session
- **Examples:** Weather report, Dreammode processing

---

## Delivery Modes

### None (No Delivery)
- **Mode:** `none`
- **Use for:** Tasks that don't need user notification
- **Example:** Dreammode night phase (silent operation)

### Announce
- **Mode:** `announce`
- **Use for:** Send finished-run event to chat channel
- **Optional:** Channel and target can be specified
- **Example:** Would send completion message to specified channel

### Webhook
- **Mode:** `webhook`
- **Use for:** Send HTTP POST to webhook URL
- **Requires:** `delivery.to` set to URL
- **Example:** Send job completion to external system

---

## Troubleshooting

### Job Not Running
**Check 1:** Job is enabled
```bash
openclaw cron list
# Verify "enabled": true for all jobs
```

**Check 2:** Scheduler is running
```bash
openclaw cron status
# Should show "running" status
```

**Check 3:** Timezone is correct
```bash
timedatectl
# Should be "Time zone: America/Vancouver"
```

**Check 4:** Job run history
```bash
openclaw cron runs [job-id]
# Check for errors in previous runs
```

### Job Failing
**Check 1:** Job logs
```bash
openclaw cron runs [job-id]
# Look for error messages
```

**Check 2:** Agent/model availability
- Ensure model fallback chain is working
- Check API keys are valid

**Check 3:** File permissions
- Ensure cron job can access required files
- Check memory/ directory is writable

### Telegram Not Receiving Messages
**Check 1:** Bot token is configured
**Check 2:** Chat ID is correct (5083035103)
**Check 3:** Gateway is running: `openclaw gateway status`
**Check 4:** Test send: `openclaw message send --to 5083035103 --channel telegram "test"`

---

## Enhancement Roadmap

### Phase 2: Enhanced Morning Debrief (Planned)
- Show preview of file writes before writing
- Display index.md update preview
- Allow user to edit content before writing
- Add "Approve all" quick action

### Phase 3: Auto-Tagging (Planned)
- Confidence scores on categorization
- Smart tags based on content
- Pattern-based automatic tagging

---

## References

- **Complete Build Documentation:** `memory/system-config/openclaw-build.md`
- **Dreammode System:** `memory/projects/dreammode.md`
- **Model Configuration:** `memory/system-config/model-setup.md`

---

**Last Updated:** February 19, 2026
**Status:** All 3 jobs operational
**Next Review:** As needed
