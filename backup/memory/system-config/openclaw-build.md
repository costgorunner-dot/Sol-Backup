---
date: 2026-02-19
tags: [build, documentation, backup, restore, openclaw]
---

# OpenClaw Build Documentation
**Complete Build History & Restoration Guide**

> **Purpose:** Backup copy of everything we've built. If the system is lost or damaged, use this to restore functionality.

---

## 📋 System Overview

**Platform:** Linux AWS EC2
**OpenClaw Version:** 2026.2.17 (installed 2026-02-17)
**Location:** /home/ubuntu/.openclaw/
**Workspace:** /home/ubuntu/.openclaw/workspace/
**Timezone:** America/Vancouver
**Gateway Port:** 18789 (loopback only)
**Last Build Update:** February 19, 2026 (9:45 AM PST)
**Memory System Version:** 2.0 (Categorized structure with index.md)

---

## 🔑 Critical Configuration Files

### 1. Global Config
**Path:** `~/.openclaw/openclaw.json`
**Purpose:** Default model settings for ALL sessions

**Current Model Configuration:**
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "zai/glm-5",
        "fallbacks": ["zai/glm-4.7", "openrouter/meta-llama/llama-3.3-70b-instruct:free"]
      }
    }
  }
}
```

**Key Details:**
- Primary model: `zai/glm-5` (frequently times out, needs fallbacks)
- Fallback 1: `zai/glm-4.7` (same provider, more stable)
- Fallback 2: `openrouter/meta-llama/llama-3.3-70b-instruct:free` (different provider, free tier)
- **Both global AND session config must be correct for fallbacks to work**

### 2. Session Config
**Path:** `~/.openclaw/agents/main/sessions/sessions.json`
**Purpose:** Per-session model overrides

**Current Settings:**
```json
{
  "modelProvider": "zai",
  "model": "glm-5"
}
```

### 3. API Keys (CRITICAL - SECURITY)
**Path:** `~/.openclaw/credentials/`
**Files:**
- `zai-default.json` → Zai provider API key
- `openrouter-default.json` → OpenRouter provider API key

**IMPORTANT:**
- API keys are NEVER stored in config files
- NEVER add to GitHub or version control
- Only in ~/.openclaw/credentials/*.json

---

## 🔊 Text-to-Speech (TTS) System

### Piper TTS Installation
**Installation Date:** February 18, 2026
**Method:** `snap install piper --edge`
**Status:** Fully operational

**Voice Configuration:**
- Voice: Jenny Dioco (British English)
- Model: en_GB-jenny_dioco-medium
- Model Path: `/home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx`
- Usage: Fully offline, no internet or API key required

**Command:**
```bash
echo "Your text here" | piper -m /home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx -f output.wav
```

**PATH Configuration:**
Add to PATH: `/home/ubuntu/.local/bin`

**Notes:**
- GPU warning is normal (CPU-only on this instance)
- All TTS fully offline, no external dependencies
- Used for: Daily weather reports, voice buttons

---

## 🤖 Automated Cron Jobs

### Job 1: Daily Weather Report
**Job ID:** 4ff4de1e-ea92-4c33-a8ef-c4203e69ee1c
**Schedule:** Every day at 9:05 AM PST
**Location:** Revelstoke, British Columbia, Canada

**What it does:**
- Fetches current weather and forecast
- Generates text summary
- Creates voice narration using Piper TTS (Jenny Dioco voice)
- Sends both text and voice audio to Telegram (ID: 5083035103)

### Job 2: Dreammode Night Phase
**Job ID:** b121c41b-c49b-4d98-99a3-d6758fa5e7f6
**Schedule:** Every day at 2:00 AM PST

**What it does:**
- Reads yesterday's memory file: `memory/YYYY-MM-DD.md`
- Extracts important items: decisions, preferences, system changes, patterns, noise
- Analyzes content for patterns and relationships
- Writes to: `~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md`
- Silent operation (no message to user)

### Job 3: Dreammode Morning Debrief
**Job ID:** 394a77ab-7d52-4cbe-b142-06bd9b8bab53
**Schedule:** Every day at 9:10 AM PST

**What it does:**
- Reads dream-candidates file from previous night
- Sends formatted debrief to Telegram:5083035103
- Lists extracted items with numbered references
- User reviews and replies with feedback (keep/delete/organize)
- Agent processes feedback and updates MEMORY.md accordingly
- Deletes dream-candidates file after processing

**User Review Process:**
1. Say: "Review debrief of [date]"
2. Agent recalls the candidates file
3. User replies: "Keep #1", "Delete #2", "Organize #3 under [category]"
4. Agent processes and updates MEMORY.md
5. File deleted after processing

---

## 🧠 Dreammode System Architecture

### File Structure
```
~/.openclaw/dreammode/
  ├── dream-candidates-YYYY-MM-DD.md (daily staging files, deleted after processing)
  ├── dream-state.json (tracking metadata)
  └── pattern-learning.json (user feedback patterns - future enhancement)
```

### dream-state.json Format
```json
{
  "lastNightPhase": "2026-02-19T02:00:00-08:00",
  "lastMorningPhase": "2026-02-19T09:10:00-08:00",
  "pendingDebriefs": [],
  "created": "2026-02-18T22:00:00Z"
}
```

### Active Enhancements (Designed, not yet implemented)
- **Pattern Learning:** Track keep/delete decisions to improve extraction accuracy
- **Task Continuity:** Monitor incomplete tasks and follow-up items
- **Categorized Memory:** Structured memory with index.md + organized files
- **Auto-Tagging:** Confidence scores and smart categorization

---

## 📱 Telegram Bot Setup

**Bot Name:** @AstraCCI_bot
**User Telegram ID:** 5083035103
**Channel:** telegram
**Capabilities:**
- Inline buttons (interactive clickable buttons in messages)
- Voice audio playback
- Text messages with markdown support

**Button Patterns:**
- Tested buttons: weather, TTS, status checks
- Voice Button: "Read with voice" - works on messages USER sends to ME
- User likes interactive buttons for quick actions

---

## 🧩 Memory System Structure (Post-Restructure)

### File Organization
```
memory/
├── index.md                           ← Quick reference (was MEMORY.md)
├── system-config/
│   ├── openclaw-build.md              ← This file (backup/restore guide)
│   ├── model-setup.md                 ← Model configuration details
│   └── cron-jobs.md                   ← Automated task configurations
├── preferences/
│   ├── communication.md               ← Communication preferences
│   └── workflow.md                    ← Workflow preferences
├── patterns/
│   ├── language-patterns.md           ← Language patterns ("for now", etc.)
│   └── decision-workflow.md           ← Decision-making workflows
├── projects/
│   ├── dreammode.md                   ← Dreammode enhancement work
│   └── voice-button.md                ← Voice button implementation
└── raw/
    └── 2026-02-18.md                  ← Daily raw logs
```

### index.md Contents
- Quick reference to all memory files
- File locations and purposes
- Last updated date
- Cross-references between related content

---

## 🔧 Workspace Structure

### Core Files
```
/home/ubuntu/.openclaw/workspace/
├── AGENTS.md                          ← Workspace rules and procedures
├── MEMORY.md                          ← Main long-term memory (before restructure)
├── SOUL.md                            ← Who Sol is (identity, values)
├── USER.md                            ← Who KaMaeron-Tau is (preferences)
├── TOOLS.md                           ← Environment notes (SSH, ports, etc.)
├── HEARTBEAT.md                       ← Proactive monitoring tasks
└── memory/                            ← Memory files (see above)
```

### Identity Files
- **SOUL.md:** Sol's personality, values, boundaries, vibe
- **USER.md:** KaMaeron-Tau's preferences, communication style, what's important
- **AGENTS.md:** How Sol works, safety rules, file management
- **TOOLS.md:** Environment details (model config, TTS, cron jobs, API keys)

---

## 🚀 Restoration Guide

### If System is Lost or Corrupted

**Step 1: Reinstall OpenClaw**
```bash
# Check latest version at https://github.com/openclaw/openclaw
npm install -g openclaw
```

**Step 2: Restore Configuration**
Copy `~/.openclaw/openclaw.json` from backup
- Ensure model fallback chain is configured: glm-5 → glm-4.7 → openrouter/llama-3.3

**Step 3: Restore API Keys**
Place in `~/.openclaw/credentials/`:
- `zai-default.json` (Zai API key)
- `openrouter-default.json` (OpenRouter API key)

**Step 4: Restore Workspace Files**
Copy entire `~/.openclaw/workspace/` from backup

**Step 5: Reinstall Piper TTS**
```bash
snap install piper --edge
# Voice files will be in /home/ubuntu/.local/share/piper/voices/
```

**Step 6: Restore Cron Jobs**
Via OpenClaw cron management or manual cron entries:
- Daily Weather: 9:05 AM PST
- Dreammode Night: 2:00 AM PST
- Dreammode Morning: 9:10 AM PST

**Step 7: Start Gateway**
```bash
openclaw gateway start
# Verify: openclaw gateway status
```

**Step 8: Reconnect Telegram Bot**
Ensure bot token and chat ID are configured (5083035103)

---

## 📊 Model Fallback Chain (CRITICAL)

### Why This Matters
- GLM-5 frequently times out (unreliable as primary)
- Fallbacks ensure system continues working when primary fails
- Both global AND session config must be correct

### Current Setup
```
Primary:     zai/glm-5              (times out often)
Fallback 1:  zai/glm-4.7            (same provider, stable)
Fallback 2:  openrouter/llama-3.3   (different provider, free tier)
```

### Verification
If models aren't working:
1. Check: `~/.openclaw/openclaw.json` (global config)
2. Check: `~/.openclaw/agents/main/sessions/sessions.json` (session config)
3. Ensure both have correct fallback chain
4. Verify API keys in `~/.openclaw/credentials/`

---

## 🎯 Key Decisions & Patterns

### Modification Policy (CRITICAL)
**DO NOT CHANGE WITHOUT EXPLICIT PERMISSION:**
- Model configurations (glm-5, glm-4.7, fallbacks)
- Voice setup (Jenny Dioco, Piper TTS)
- API keys (never add to config files)
- Cron job schedules
- Gateway configuration

**WHEN IN DOUBT: ASK FIRST**

### User Behavior Patterns
- **Testing → Decision:** Tests features first, then decides on implementation
- **"For Now" = Temporary:** "For now" means current approach, not permanent
- **Proactive Suggestions:** Wants improvements suggested when they improve UX
- **Learning First:** Likes understanding capabilities before committing to changes
- **Silent Automation:** Prefers background tasks to run without notifications

### Communication Preferences
- **Full Comprehension:** Expects agent to read every word carefully, not skim
- **Consultation First:** Ask before taking action if problems are foreseen
- **Voice + Text:** Likes having both text AND voice audio together
- **Build History:** Wants to keep records of what we've built

---

## 🔄 Cron Job Details (Technical Reference)

### Job Payload Format
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
    "message": "Get weather for Revelstoke, BC and send text + voice audio to Telegram",
    "sessionTarget": "isolated"
  },
  "delivery": {
    "mode": "none"
  },
  "sessionTarget": "isolated",
  "enabled": true
}
```

### Session Targets
- `main`: Injects systemEvent into main session (use for reminders)
- `isolated`: Runs agent turn in isolated session (use for weather, dreammode)

---

## 📅 Build Timeline

- **2026-02-17:** OpenClaw 2026.2.17 installed, workspace reset, system reboot
- **2026-02-17:** Model configuration established (3-tier fallback)
- **2026-02-18:** Piper TTS installed (snap edge channel), Jenny Dioco voice configured
- **2026-02-18:** Cron jobs created (weather, dreammode night/morning)
- **2026-02-18:** Dreammode system activated (memory processing)
- **2026-02-19:** Dreammode morning debrief first successful run (19 items processed)
- **2026-02-19:** Memory restructure designed AND implemented (categorized files + index.md)
- **2026-02-19:** Complete build documentation created (openclaw-build.md)
- **2026-02-19:** All 19 memory items migrated to categorized structure (11 files total)
- **2026-02-19:** Phase 1 complete, Phase 2 scheduled for Feb 20th review

---

## 💡 Future Enhancements (Planned)

### Phase 2 (Weeks 1-2)
- Enhanced morning debrief with file write previews
- Auto-tagging with confidence scores
- Basic pattern detection across multiple days
- Learn from user corrections (move items, add tags)

### Phase 3 (Month 1+)
- Advanced pattern recognition
- Cross-file relationship tracking
- Proactive suggestions based on learned behavior
- Task continuity monitoring (incomplete items follow-up)

### Backup & Restore
- Automated backup of critical config files
- Version control for memory system
- Disaster recovery testing

---

## 📋 Pending Updates

### OpenClaw 2026.2.19 (Not Yet Installed)
**Released:** February 17, 2026
**Decision:** Deferring update - current version (2026.2.17) is stable and working well
**Reason:** Quality-of-life improvements only, no critical issues requiring update

**Relevant Improvements:**
- Cleaner Telegram replies (exec/bash warnings hidden by default)
- Smarter heartbeats (skip when HEARTBEAT.md empty)
- Better billing errors (shows which model caused issue)
- Streaming reliability improvements
- Better config repair (no accidental token duplication)
- Security warnings for gateway auth

**Update When:**
- User requests update
- Critical issues arise that are fixed in this version
- Future updates are released and worth bundling together

---

## 🔍 Troubleshooting Reference

### Models Not Working
1. Check global config: `~/.openclaw/openclaw.json`
2. Check session config: `~/.openclaw/agents/main/sessions/sessions.json`
3. Verify API keys in `~/.openclaw/credentials/`
4. Ensure fallback chain is correct: glm-5 → glm-4.7 → openrouter/llama-3.3

### TTS Not Working
1. Check Piper installation: `snap list | grep piper`
2. Verify voice file: `/home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/`
3. Test manually: `echo "test" | piper -m [voice-file] -f test.wav`

### Cron Jobs Not Running
1. Check scheduler: `openclaw cron status`
2. Verify job enabled: `openclaw cron list`
3. Check job logs: `openclaw cron runs [job-id]`
4. Verify timezone: `timedatectl` (should be America/Vancouver)

### Telegram Not Responding
1. Check gateway: `openclaw gateway status`
2. Verify bot token and chat ID in config
3. Test send: `openclaw message send --to 5083035103 --channel telegram "test"`

---

## 📞 Support & Resources

**Documentation:** https://docs.openclaw.ai
**Source:** https://github.com/openclaw/openclaw
**Community:** https://discord.com/invite/clawd
**Skills Hub:** https://clawhub.com

**Local Docs:** `/home/ubuntu/.npm-global/lib/node_modules/openclaw/docs/`

---

**Last Updated:** February 19, 2026
**Document Version:** 1.0
**Status:** Active Build (Complete, operational system)
