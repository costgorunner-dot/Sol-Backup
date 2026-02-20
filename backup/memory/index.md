---
date: 2026-02-19
tags: [index, reference, memory-system]
---

# Memory Index

**Quick Reference for All Memory Files**

---

## 👤 User Info
**File:** `memory/user-info.md`
**Contents:** Basic user information
- Name: KaMaeron-Tau
- Location: Revelstoke, British Columbia, Canada
- Timezone: America/Vancouver
- Telegram ID: 5083035103

---

## 🎯 Preferences

### Communication Preferences
**File:** `memory/preferences/communication.md`
**Contents:** How KaMaeron-Tau likes to communicate
- Values: Being fully heard and understood, being consulted before action
- Voice + Text: Prefers both together (e.g., weather reports)
- TTS Voice: Jenny Dioco (British English) via Piper
- Full Comprehension: Expects careful reading, no skimming
- Consultation First: Ask before taking action if problems foreseen

### Workflow Preferences
**File:** `memory/preferences/workflow.md`
**Contents:** How KaMaeron-Tau likes to work
- Testing → Decision: Tests features first, then decides on implementation
- Learning First: Likes understanding capabilities before committing
- "For Now" = Temporary: "For now" means current approach, not permanent
- Proactive Suggestions: Wants improvements suggested when they improve UX
- Silent Automation: Prefers background tasks to run without notifications
- Build History: Wants to keep records of what we've built

---

## 📊 Patterns

### Language Patterns
**File:** `memory/patterns/language-patterns.md`
**Contents:** Recurring language patterns and their meanings
- "For Now" Pattern: Means temporary, not permanent (5 occurrences, verified)
- "Leave it for now" = Capability acknowledged, implement later

### Decision Workflow
**File:** `memory/patterns/decision-workflow.md`
**Contents:** How KaMaeron-Tau makes decisions
- Phase 1: "Let me see if it works" (testing)
- Phase 2: "I liked that but..." (evaluation)
- Phase 3: "For now" or "Do it" (decision)
- Occurrences: 3+ times (inline buttons, voice button, model config)

---

## ⚙️ System Config

### OpenClaw Build
**File:** `memory/system-config/openclaw-build.md`
**Contents:** Complete build documentation and restoration guide
- System overview (platform, version, location)
- Critical configuration files
- Model fallback chain setup
- TTS system (Piper, Jenny Dioco)
- Cron jobs (weather, dreammode)
- Telegram bot setup
- Memory system structure
- Restoration guide
- Troubleshooting reference
- Build timeline

**Purpose:** Backup copy of everything we've built. Use for restore if system is lost.

### Model Setup
**File:** `memory/system-config/model-setup.md`
**Contents:** Model configuration details
- Three-tier fallback: glm-5 → glm-4.7 → openrouter/llama-3.3
- Global config: `~/.openclaw/openclaw.json`
- Session config: `~/.openclaw/agents/main/sessions/sessions.json`
- API keys location: `~/.openclaw/credentials/*.json` (NEVER in config files)
- Both configs must be correct for fallbacks to work

### Cron Jobs
**File:** `memory/system-config/cron-jobs.md`
**Contents:** Automated task configurations
- Daily Weather Report: 9:05 AM PST (Revelstoke BC, text + voice)
- Dreammode Night Phase: 2:00 AM PST (processes memory, extracts items)
- Dreammode Morning Debrief: 9:10 AM PST (sends debrief for review)

---

## 🚀 Projects

### Dreammode Enhancement
**File:** `memory/projects/dreammode.md`
**Contents:** Ongoing Dreammode system improvements
- Phase 1: Categorized memory with index.md + organized files (Feb 19, 2026)
- Phase 2: Auto-tagging + pattern detection (planned)
- Phase 3: Proactive suggestions based on learned behavior (planned)
- Status: Phase 1 implemented, Phase 2-3 designed

### Voice Button
**File:** `memory/projects/voice-button.md`
**Contents:** Voice button implementation project
- Status: On hold
- Capability: Tested and working (Telegram inline buttons)
- User feedback: Liked concept, decided to defer implementation
- Ready to implement when requested

---

## 📝 Raw Logs

### Daily Entries
**Files:** `memory/raw/YYYY-MM-DD.md`
**Contents:** Raw daily logs of what happened
- Raw conversations and events
- Source material for Dreammode extraction
- Not curated - used as input for memory processing

---

## 🔧 Workspace Core Files

### Identity & Behavior
- `SOUL.md` - Who Sol is (identity, values, boundaries, vibe)
- `USER.md` - Who KaMaeron-Tau is (preferences, what's important)
- `AGENTS.md` - How Sol works (safety rules, file management, workspace procedures)
- `TOOLS.md` - Environment notes (model config, TTS, cron jobs, API keys)

### Proactive Monitoring
- `HEARTBEAT.md` - Proactive intelligence tasks
  - System health checks (disk, memory, errors)
  - Daily memory file creation at 11 PM
  - Pattern recognition and user behavior tracking
  - Smart alerting (only when needed)

---

## 📅 Modification Policy (CRITICAL)

**DO NOT CHANGE WITHOUT EXPLICIT PERMISSION:**
- Model configurations (glm-5, glm-4.7, fallbacks)
- Voice setup (Jenny Dioco, Piper TTS)
- API keys (never add to config files)
- Cron job schedules
- Gateway configuration

**WHEN IN DOUBT: ASK FIRST**

---

## 🔍 How to Find Information

### To Find:
- **User preferences:** Check `memory/preferences/` or search "preferences"
- **System setup:** Check `memory/system-config/openclaw-build.md` (complete guide)
- **Patterns:** Check `memory/patterns/` or search "pattern"
- **Projects:** Check `memory/projects/` or search "project"
- **Daily logs:** Check `memory/raw/` for date-specific entries

### Search Method:
Use `memory_search` to find content across all memory files:
```
memory_search: "model configuration"
→ Returns snippets from multiple files with line references
→ Use memory_get to read specific sections
```

---

## 🔄 Memory System Flow

1. **Daily Activity:** Conversations and events logged to `memory/raw/YYYY-MM-DD.md`
2. **Night Phase (2:00 AM):** Dreammode analyzes raw logs, extracts important items
3. **Morning Phase (9:10 AM):** Debrief shows proposed updates to categorized files
4. **User Review:** Approve, modify, or reject proposed updates
5. **Write Updates:** Approved content written to appropriate categorized files
6. **Index Update:** `index.md` refreshed with new references

---

## 📊 System Rules

### Credential Security
- ✅ API keys only in `~/.openclaw/credentials/`
- ❌ NEVER in `openclaw.json` or `sessions.json`
- ❌ NEVER in GitHub or version control
- Applies to ALL providers (zai, openrouter, etc.)

### File Management
- **Index file** (`index.md`): Quick reference only, stay small
- **Categorized files** (`preferences/`, `patterns/`, etc.): Full details
- **Raw logs** (`raw/YYYY-MM-DD.md`): Daily input for Dreammode
- **Backup file** (`system-config/openclaw-build.md`): Complete build documentation

---

**Last Updated:** February 19, 2026 (9:45 AM PST)
**Memory System Version:** 2.0 (Categorized structure with index.md) - Phase 1 Complete
**Previous Version:** 1.0 (Single MEMORY.md file) - Backed up as MEMORY-old.md

---

## 🚀 Quick Reference Commands

```bash
# Check model configuration
cat ~/.openclaw/openclaw.json
cat ~/.openclaw/agents/main/sessions/sessions.json

# Verify API keys
ls ~/.openclaw/credentials/

# Check cron jobs
openclaw cron list

# View gateway status
openclaw gateway status

# Test TTS
echo "test" | piper -m /path/to/voice.onnx -f test.wav
```
