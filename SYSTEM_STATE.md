---
created: 2026-02-25
last-updated: 2026-02-25T09:35:00-08:00
purpose: Track active features, recent changes, and testing status for crash recovery
---

# System State - Sol

**Quick reference for what's running, what changed, and what's being tested.**

---

## 🟢 Currently Active

### Core Systems
- **Model:** zai/glm-5 (fallbacks: glm-4.7, openrouter/llama-3.3-70b-free)
- **Subagents:** zai/glm-4.7 (background tasks, isolated from main chat)
- **Timeout:** 120 seconds (increased from 90s on Feb 25)
- **Version:** OpenClaw 2026.2.23 — **DO NOT UPDATE** (disk space limited)
- **TTS:** Edge TTS (built-in, free) — switched from Piper Feb 25
- **STT:** Faster-Whisper (local, model deleted when not in use)

### Memory Systems
- **MEMORY.md** — Long-term curated memory
- **memory/raw/YYYY-MM-DD.md** — Daily logs (created at 11 PM heartbeat)
- **Dreammode** — Night phase extracts, morning debrief asks questions
- **Topic Tracking** — NEW Feb 25 (tracks ongoing topics, next steps, orphans)

### Cron Schedule
| Time | Job | Status |
|------|-----|--------|
| 9:05 AM | Weather (Revelstoke) | ✅ Active |
| 9:10 AM | Dreammode Morning Debrief | ✅ Active |
| 9:30 AM | Backup to GitHub | ✅ Active |
| 3:15 PM | Backup to GitHub | ✅ Active |
| 9:45 PM | Backup to GitHub | ✅ Active |
| 11:00 PM | Heartbeat creates daily memory file | ✅ Active |
| 11:45 PM | Dreammode Night Phase | ✅ Active |

### Skills Installed
- Tavily Search (AI web search)
- Telegram History (persistent message logger)
- OpenClaw Backup (GitHub backups)
- Faster-Whisper (STT)

---

## 🟡 Recently Added / Testing

### Feb 25, 2026

#### Subagent System (NEW - Ready to Use)
- **What:** Background agents for research/analysis while I stay free to chat
- **Model:** zai/glm-4.7 (separate from my glm-5)
- **Max concurrent:** 8 subagents
- **Status:** Configured, ready to test
- **Doc:** SUBAGENTS.md

#### Topic Tracking System (NEW - Testing)
- **What:** Tracks ongoing topics across days (Astra, RAM sale, hardware fund)
- **Features:**
  - Detects orphaned topics (not discussed in X days)
  - Tracks next steps and reminds when overdue
  - Asks clarifying questions to learn relationships
- **File:** `~/.openclaw/dreammode/topics.json`
- **Status:** First run tonight (11:45 PM)
- **Risk:** New logic, could have extraction issues

#### Triple Daily Backups (NEW)
- **What:** Added 3:15 PM and 9:45 PM backups (was only 9:30 AM)
- **Reason:** More frequent safety with all the new features being built
- **Status:** Active starting today

#### Edge TTS (NEW)
- **What:** Replaced Piper with built-in Edge TTS
- **Reason:** Piper sounded robotic, Edge is better quality
- **Status:** Tested and working

---

## 🔴 Known Issues

### wttr.in Timeouts (Feb 25)
- **Issue:** Weather API slow/unreachable, causing cron timeouts
- **Workaround:** Added --max-time 10, fallback to Open-Meteo
- **Status:** Monitoring

### GLM API Slow Responses
- **Issue:** Occasional timeout errors from GLM
- **Fix:** Increased timeout to 120s
- **Status:** Improved but still happens occasionally

---

## 📝 Change Log

### Feb 25, 2026
- **Added:** Subagent system (glm-4.7 for background tasks)
- **Added:** Topic tracking system with next steps
- **Added:** SYSTEM_STATE.md for crash recovery tracking
- **Added:** 3:15 PM and 9:45 PM backup jobs
- **Changed:** Weather cron to use Edge TTS + 3-day forecast
- **Changed:** Dreammode Night Phase moved from 2 AM → 11:45 PM
- **Changed:** Timeout 90s → 120s
- **Changed:** Added fallback chain to config (glm-5 → glm-4.7 → openrouter)
- **Removed:** Piper TTS (uninstalled)

### Feb 24, 2026
- **Fixed:** Tavily Search auto-loads API key
- **Removed:** Faster-Whisper model (464MB freed)
- **Recovered:** From Feb 24 OpenClaw reinstall

---

## 🚨 Crash Recovery Notes

If system crashes, check:
1. **Last change in this file** — What was added/changed recently?
2. **Disk space:** `df -h /` — Must stay above 500MB free
3. **Recent cron jobs:** `openclaw cron runs --id <job-id> --limit 5`
4. **Memory files exist:** `ls memory/raw/` for yesterday's date

**Restore process:**
1. Fresh OpenClaw install
2. `/backup restore` from GitHub
3. Re-add API keys to `~/.openclaw/credentials/`
4. Check this file for what was being tested

---

## 📊 Disk Space Tracking

| Date | Free Space | Notes |
|------|------------|-------|
| Feb 25 AM | 1.1GB (84%) | After removing Piper + Whisper model |
| Feb 24 PM | 973MB | After reinstall |
| Feb 24 AM | 509MB | Whisper model downloaded |

**Warning threshold:** <500MB free

---

*This file is backed up to GitHub at 9:30 AM, 3:15 PM, and 9:45 PM daily.*
*Manual backup triggered after significant changes.*
