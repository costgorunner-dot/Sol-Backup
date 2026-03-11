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
- Silent Monitoring: Prefers background tasks without notifications (added Feb 20)
- **Feb 23, 2026** - Timestamp Logging: Wants timestamps logged for each message received → communication.md
- **Feb 23, 2026** - Timestamp Accuracy: Acceptable accuracy is seconds to up to 1 minute off → communication.md

### Workflow Preferences
**File:** `memory/preferences/workflow.md`
**Contents:** How KaMaeron-Tau likes to work
- Testing → Decision: Tests features first, then decides on implementation
- Learning First: Likes understanding capabilities before committing
- "For Now" = Temporary: "For now" means current approach, not permanent
- Proactive Suggestions: Wants improvements suggested when they improve UX
- Silent Automation: Prefers background tasks to run without notifications
- Build History: Wants to keep records of what we've built
- Documentation Appreciation: Values thorough documentation (Feb 20)
- Security-First: Wants control over sensitive files, prefers local backup for credentials (Feb 20)

---

## 📊 Patterns

### Language Patterns
**File:** `memory/patterns/language-patterns.md`
**Contents:** Recurring language patterns and their meanings
- "For Now" Pattern: Means temporary, not permanent (5 occurrences, verified)
- "Leave it for now" = Capability acknowledged, implement later
- **Feb 21, 2026** - Decision style: Makes decisions based on gut/intuition → language-patterns.md

### Decision Workflow
**File:** `memory/patterns/decision-workflow.md`
**Contents:** How KaMaeron-Tau makes decisions
- Phase 1: "Let me see if it works" (testing)
- Phase 2: "I liked that but..." (evaluation)
- Phase 3: "For now" or "Do it" (decision)
- Occurrences: 3+ times (inline buttons, voice button, model config)

### Technical Patterns
**File:** `memory/patterns/technical-patterns.md`
**Contents:** System and implementation patterns
- Three-tier Fallback: Primary → Same-provider → Different-provider (Feb 20)
- Phased Implementation: Large projects broken into testable phases (Feb 20)
- Silent by Default: Monitoring quiet unless problems detected (Feb 20)
- **Feb 21, 2026** - Linux Timezone: Always verify BOTH /etc/timezone AND /etc/localtime → technical-patterns.md
- **Feb 21, 2026** - Immediate Validation: Test defensive systems immediately after setup → technical-patterns.md
- **Feb 23, 2026** - Channel Behavior Divergence: Different channels handle features differently even with same config → technical-patterns.md

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
- Changed from glm-4.7 to glm-5 on Feb 20 (timeout issues)
- **Feb 21, 2026** - Switched back from kimi to glm-5; cron jobs failed with kimi due to missing ollama auth → model-setup.md

### Critical Restrictions
**File:** `TOOLS.md`
**Contents:** System limitations and restrictions
- **CRITICAL: DO NOT UPDATE OPENCLAW** - Disk space (~1.1GB) insufficient; update causes system crash
- Must stay on version 2026.2.17
- Added Feb 21, 2026 after failed update attempt

### Memory Search
**File:** `memory/system-config/memory-search.md`
**Contents:** Semantic search configuration
- Provider: OpenRouter (cloud-based)
- Model: qwen/qwen3-embedding-4b
- Cost: ~$0.001-0.005 per query
- Hybrid search: 70% semantic + 30% keyword
- Temporal decay: 30-day half-life
- Enabled: February 20, 2026

### Cron Jobs
**File:** `memory/system-config/cron-jobs.md`
**Contents:** Automated task configurations
- Daily Weather Report: 9:05 AM PST (Revelstoke BC, text + voice)
- Dreammode Night Phase: 2:00 AM PST (processes memory, extracts items, merges emergency snapshots)
- Dreammode Morning Debrief: 9:10 AM PST (sends debrief for review)
- Daily Backup: 9:30 AM PST (GitHub push with auto-redaction)
- Memory Creation: 11:00 PM PST (daily log creation)
- Weekly Summary: Sunday 6:00 PM PST
- Heartbeat: Every 30 min (silent unless problems)

---

## 🚀 Projects

### Mac Mini Purchase Goal
**Status:** Active
**Contents:** Goal to purchase M1 Mac Mini Studio with 32GB RAM
- Asking price: $1200
- Funding strategies: selling items (DDR5 RAM listed $390), crypto, manifestation
- Would be dedicated AI system running 24/7
- **Feb 21, 2026** - DDR5 RAM listed; keeping fridge and metal detector

### Dreammode Enhancement
**File:** `memory/projects/dreammode.md`
**Contents:** Ongoing Dreammode system improvements
- Phase 1: Compression Detection & Auto-Snapshots (Feb 20, 2026) - ✅ Complete
- Phase 2: Semantic Search with embeddings (Feb 20, 2026) - ✅ Complete
- Phase 3: Index Optimization with tagging schema (Feb 20, 2026) - ✅ Complete
- Phase 4: Pattern Detection (Feb 24 review) - On hold
- Status: Phases 1-3 complete and operational, Phase 4 deferred

### Backup System
**File:** `memory/system-config/backup-system.md`
**Contents:** Automated backup to GitHub repository
- Daily backups at 9:30 AM PST to costgorunner-dot/Sol-Backup
- Automatic API key redaction
- 14-day retention + permanent backups
- Working model backup (Feb 20, 2026) marked permanent
- Weekly summary (Sundays 6:00 PM)
- Status: ✅ Operational

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

**Last Updated:** February 24, 2026 (2:00 AM PST) - Auto-updated by Dreammode Night Phase
**Memory System Version:** 2.1 (Phases 1-3 complete: Compression detection, Semantic search, Index optimization)
**Previous Version:** 2.0 (Categorized structure with index.md) - Phase 1 only

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
