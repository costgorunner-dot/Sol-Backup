# Memory Extraction System - Introduction for SOL

## What's New

A new automated memory extraction system has been set up for you. Here's what it does:

**Before:** Conversations were saved but facts weren't automatically extracted or indexed.

**Now:** Daily extraction process reads your transcripts, pulls out key facts, and makes them searchable via `memorySearch()`.

---

## How It Works

```
Your conversations
      ↓
transcripts/YYYY-MM-DD.md  ←─ Saved automatically
      ↓
Z.AI GLM-5 extraction (2 AM daily)
      ↓
extracts/YYYY-MM-DD.md  ←─ Structured facts
      ↓
You can search these via memorySearch()
```

---

## Key Files to Know

| File | Location | Purpose |
|------|----------|---------|
| `INSTALLATION-GUIDE.md` | `~/.openclaw/skills/memory-system/` | Full technical docs |
| `MEMORY-SYSTEM-README.md` | `~/.openclaw/workspace/memory/` | Quick reference |
| `HEARTBEAT.md` | `~/.openclaw/workspace/` | Your proactive monitoring guide |
| `config-zai.json` | `~/.openclaw/skills/memory-system/` | API configuration |
| `daily-extract.sh` | `~/.openclaw/skills/memory-system/` | Cron script |

---

## What Gets Extracted

Each fact is formatted as:
```
[TYPE] [IMPORTANCE] [PROJECT:xxx] Fact description
```

**Types:**
- `preference` - User likes/dislikes (HIGH importance)
- `decision` - Technical choices made (CRITICAL)
- `project` - Status updates (HIGH)
- `context` - Important context (MEDIUM)
- `task` - Follow-ups, todos (HIGH)
- `error` - Problems encountered (HIGH)
- `learning` - Lessons learned (CRITICAL)
- `pattern` - Recurring behaviors (MEDIUM)

**Projects auto-detected:**
- `orb-night` - Video generation
- `astra-memory` - Astra system
- `sol-memory` - Your memory system
- `telegram` - Telegram bot
- `general` - Default

---

## Current Stats (as of Mar 13, 2026)

- **370+ facts** extracted
- **Feb 18 - Mar 12, 2026** covered
- **23 transcript files** processed
- **Cron:** Runs daily at 2 AM

---

## What You Should Do

### 1. Read the Documentation
```
Read: ~/.openclaw/skills/memory-system/INSTALLATION-GUIDE.md
```

### 2. Understand Your Heartbeat
```
Read: ~/.openclaw/workspace/HEARTBEAT.md
```
This tells you when to be proactive vs. stay quiet.

### 3. Know the Extraction Files
```
List: ~/.openclaw/workspace/memory/extracts/
```
These are your searchable facts.

### 4. Test the System
```bash
# Check recent extractions
tail -50 ~/.openclaw/logs/memory-extract.log

# Verify cron is running
crontab -l | grep daily-extract
```

---

## Manual Extraction

If you need to extract facts manually (for testing):

```bash
cd ~/.openclaw/skills/memory-system
node batch-process-zai.js --date=2026-03-13
```

---

## The Deduplication

The system automatically avoids storing duplicate facts:
- Compares new facts against last 30 days
- Uses 85% similarity threshold
- Only stores unique facts

---

## SSH Access (if needed)

```bash
ssh -i ~/.ssh/Astra2.pem ubuntu@35.182.7.167
```

---

## Summary

1. **You have a heartbeat** (`HEARTBEAT.md`) - defines proactive behavior
2. **Memory extraction runs daily** at 2 AM
3. **Facts are searchable** via `memorySearch()`
4. **370+ facts already extracted** from Feb 18 - Mar 12
5. **Cron handles automation** - you just need to know it's there

---

## Quick Commands

```bash
# View today's facts
cat ~/.openclaw/workspace/memory/extracts/$(date -I).md

# View all facts
ls ~/.openclaw/workspace/memory/extracts/

# Check extraction log
tail -100 ~/.openclaw/logs/memory-extract.log

# Run extraction manually
node ~/.openclaw/skills/memory-system/batch-process-zai.js
```

---

**Welcome to your new memory system. Take some time to explore the files and understand how the extraction works. This makes your long-term memory much more accessible.**

---
*Installed: 2026-03-13*
*System: SOL Memory Extraction v1.0*