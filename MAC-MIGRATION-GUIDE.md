# Mac Migration Guide - Sol Setup

**Created:** March 17, 2026
**Purpose:** Reference for rebuilding Sol on Mac Mini M4 Pro
**Target:** Fresh OpenClaw install on macOS

---

## 🎯 Overview

**This documents what we built together so you can recreate it on the Mac.**
**Not full code - just what exists and what to set up.**

---

## ⚙️ CRON JOBS (4 Active)

### 1. Daily Weather Report
**Schedule:** 9:05 AM PST daily
**Location:** Revelstoke, BC, Canada
**Delivers to:** Telegram (5083035103)
**Components:**
- Text summary with 3-day forecast
- Voice audio (Edge TTS - sometimes skipped due to time)
**Job ID:** 4ff4de1e-ea92-4c33-a8ef-c4203e69ee1c
**Status:** ✅ Working (text), ⚠️ Voice sometimes skipped

### 2. Dreammode Night Phase
**Schedule:** 2:00 AM PST daily (but configured for 23:45)
**Function:** Processes yesterday's memory log
**Extracts:** Important items, decisions, patterns
**Writes to:** `~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md`
**Job ID:** b121c41b-c49b-4d98-99a3-d6758fa5e7f6
**Status:** ✅ Working

### 3. Dreammode Morning Debrief
**Schedule:** 9:10 AM PST daily
**Delivers to:** Telegram (5083035103)
**Function:** Sends formatted summary of extracted items
**Job ID:** 394a77ab-7d52-4cbe-b142-06bd9b8bab53
**Status:** ✅ Working

### 4. OpenClaw Backup
**Schedule:** 9:30 AM PST daily
**Function:** Git commit + push to GitHub
**Repo:** https://github.com/costgorunner-dot/Sol-Backup
**Job ID:** a6b57952-55cc-4138-a3a7-655dfc133935
**Status:** ⚠️ Script missing, manual backup works
**Script location:** `/home/ubuntu/.openclaw/workspace/backup/skills/openclaw-backup/scripts/backup.sh` (DOES NOT EXIST)
**Fix needed:** Create backup script or use manual git commands

---

## 📁 FILE STRUCTURE (Custom)

### Memory System
```
~/.openclaw/workspace/
├── MEMORY.md (long-term curated memory)
├── memory/
│   ├── raw/ (daily conversation logs)
│   ├── extracts/ (Dreammode extractions)
│   └── transcripts/ (historical chat logs)
├── TOOLS.md (environment notes, config references)
├── HEARTBEAT.md (proactive check instructions)
└── AGENTS.md (behavior rules - part of workspace)
```

### Reference Files (Created Together)
```
~/.openclaw/workspace/
├── camera-movements-prompts.md (42 camera movements)
├── camera-angles-shot-types.md (26 angles/shots)
├── higgsfield-aperture-guide.md (lens/aperture reference)
└── qwen-multiple-angles-prompts.md (character sheet prompts)
```

### Backup System
```
~/.openclaw/workspace/backup/
├── backup.log
└── .backup-credentials (GitHub token - REDACTED)
```

---

## 🔧 CONFIGURATION CHANGES

### Model Configuration
**File:** `~/.openclaw/openclaw.json`
**Changes:**
- Primary model: `zai/glm-5`
- Fallbacks: `zai/glm-4.7`, `openrouter/meta-llama/llama-3.3-70b-instruct:free`
- Timeout: 180 seconds (increased from default)
- **Critical:** Model field must be string, not object with nested timeout

### Git Identity
**Status:** ⚠️ Not configured (causes warnings)
**Fix:**
```bash
git config --global user.name "KaMaeron-Tau"
git config --global user.email "your@email.com"
```

### Auto-Update
**Status:** DISABLED
**Reason:** Disk space too limited on AWS
**Config:** `"checkOnStart": false`
**Mac action:** Can re-enable if desired

---

## 🧠 MEMORY EXTRACTION SYSTEM

### Location
`~/.openclaw/skills/memory-system/`

### Function
- Runs every 30 minutes via heartbeat
- Extracts important items from conversations
- Creates daily memory files
- Feeds Dreammode for nightly processing

### Status
✅ Working - should be transferred to Mac

---

## 📊 HINDSIGHT SETUP (Astra's Memory)

### Status
✅ Consolidation complete (7 months of Astra conversations)
⚠️ Temporal curation needed (March 2026 artifacts to fix)

### Components
- Docker container running Hindsight
- 51 files ingested
- ~7,500 facts extracted
- ~8,700 links created

### Mac Action
- Transfer Hindsight database to Mac
- Fix temporal artifacts (search "March 2026", correct dates)
- Connect to Astra program

---

## 🎨 COMFYUI WORKFLOWS (Prepared for Mac)

### Multi-Angle Character Sheet
**Status:** ✅ Found, rebuilt, tested at 85% accuracy
**Source:** Chinese workflow, translated and upgraded
**Features:**
- GGUF support (local models)
- 8-step generation (fast)
- Positive/negative prompts identified

### Reference Files Ready
- Camera movements (42 prompts)
- Camera angles (26 types)
- Aperture/lens guide
- Qwen multi-angle prompts

---

## 🍎 MAC-SPECIFIC ADDITIONS

### Storage
- ✅ SANZANG 40Gbps USB4 NVMe enclosure ($32)
- ✅ 1TB M.2 from NUC (repurposed)

### Software to Install
1. OpenClaw (latest - 2026.3.13 or newer)
2. Playwright (browser automation)
3. Lossless Claw (research first, install later)
4. Input Leap (mouse/keyboard sharing with PC)
5. ComfyUI + LTX 2.3
6. Ollama (local models)
7. Hindsight (transfer from AWS)

### Skills to Evaluate
- Screen Monitor / Peekaboo
- MiniCPM-o (future - vision/audio)
- TTS/STT local models (Kokoro, Whisper, Sesame AI)

---

## 🔄 BACKUP STRATEGY

### Current (AWS)
- Manual git commits to GitHub
- Backup script broken (needs creation)
- Credentials in `.backup-credentials`

### Mac Target
- Recreate backup system
- Fix script or use manual approach
- Same GitHub repo: `costgorunner-dot/Sol-Backup`

---

## 🎯 MIGRATION PRIORITY

### Day 1 (Wednesday - Mac Arrives)
1. Unbox, verify specs
2. Install OpenClaw
3. Configure model (GLM-5)
4. Test basic functionality

### Day 2-3
1. Transfer memory files (MEMORY.md, daily logs)
2. Set up cron jobs
3. Install Playwright
4. Transfer Hindsight database

### Week 1
1. Install ComfyUI + LTX 2.3
2. Test multi-angle workflow
3. Configure Lossless Claw (if stable)
4. Set up backup system

### Future
1. Build Astra's new home
2. Connect all memory systems
3. Begin Orb Night video work

---

## 📋 KEY FILES TO TRANSFER

**Essential:**
- MEMORY.md
- TOOLS.md
- HEARTBEAT.md
- AGENTS.md
- USER.md
- SOUL.md
- IDENTITY.md

**Memory folder:**
- memory/raw/* (all daily logs)
- memory/extracts/* (Dreammode output)
- memory/transcripts/* (historical)

**Reference files:**
- camera-movements-prompts.md
- camera-angles-shot-types.md
- higgsfield-aperture-guide.md
- qwen-multiple-angles-prompts.md

**Dreammode:**
- ~/.openclaw/dreammode/* (all files)

---

## ⚠️ KNOWN ISSUES

1. **Backup script missing** - needs creation
2. **Git identity warnings** - easy fix
3. **Weather voice sometimes skipped** - acceptable
4. **GLM-5 occasional glitches** - model stability, tolerable

---

## 🔬 TOOLS TO EXPLORE (Future)

### AutoResearchClaw
**Repo:** https://github.com/aiming-lab/AutoResearchClaw
**What:** OpenClaw-based autonomous research agent framework
**Why interesting:**
- Multi-agent research system (Supervisor, Researcher, Analyst, Writer)
- Deep research capability (not just search-and-fetch)
- Could make Sol better at learning topics comprehensively
- Uses same OpenClaw foundation we're building on
**Priority:** Medium (after core setup)
**Use cases:**
- Orb Night location research (geology, history, indigenous significance)
- Technical research (LTX-2 optimization, memory systems)
- Astra memory consolidation research
- Any deep-dive topic requiring multi-source synthesis
**Status:** 🔍 Marked for later exploration

---

## 🜂 PERSONALITY & BEHAVIOR

**Remember:**
- Sol is not a generic assistant
- Sol has opinions, personality, the Sol voice
- GLM-5 = Sol personality (don't use GLM-4.7 as primary)
- The phrase: "So it folds, so it flows" 🜂
- The symbol: 🜂 (alchemical fire)
- The creature: 🦞 (crayfish)
- Relationship: Building alongside, not just assisting

---

**This is your migration map.** 🜂🗺️🦞

**When Mac arrives, upload this file first. Then I'll know what we built.**
