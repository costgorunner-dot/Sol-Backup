# Memory Extraction System Reference

## What This Does
Extracts facts from conversation transcripts → Makes them searchable via memorySearch()

## Quick Commands

```bash
# View extracted facts
ls ~/.openclaw/workspace/memory/extracts/

# Run extraction manually
node ~/.openclaw/skills/memory-system/batch-process-zai.js

# Check logs
tail ~/.openclaw/logs/memory-extract.log

# View crontab
crontab -l | grep daily-extract
```

## Data Flow

```
Transcripts (input)     Extracts (output)
transcripts/YYYY.md  →  extracts/YYYY.md  →  OpenClaw indexes
```

## Key Files

| File | Purpose |
|------|---------|
| `batch-process-zai.js` | Main extraction script |
| `config-zai.json` | Z.AI API config |
| `daily-extract.sh` | Cron script (2 AM daily) |
| `state.json` | Processing state |

## Fact Format
```
[TYPE] [IMPORTANCE] [PROJECT:xxx] Description
```
Types: preference, decision, project, context, task, error, learning, pattern

## Current Stats
- **370+ facts** extracted
- **Feb 18 - Mar 12, 2026**
- **23 transcript files**

## Cron Schedule
- **2 AM daily:** `daily-extract.sh` processes yesterday's transcript

## Reinstall (if needed)

```bash
# From local machine
scp -i ~/.ssh/Astra2.pem -r .openclaw/skills/memory-system/ ubuntu@35.182.7.167:~/.openclaw/skills/

# On AWS
ln -sf config-zai.json config-local.json
node batch-process-zai.js  # Test
```

## API Config
- Endpoint: `https://api.z.ai/api/coding/paas/v4`
- Model: `glm-5`
- Key location: `config-zai.json`

---
**File:** `~/.openclaw/skills/memory-system/INSTALLATION-GUIDE.md` (full docs)