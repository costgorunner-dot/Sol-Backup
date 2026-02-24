---
date: 2026-02-19
tags: [identity, preferences, long-term, system-config, dreammode-active]
last-updated: 2026-02-24
---

# MEMORY.md - Your Long-Term Memory

- **ONLY load in main session** (direct chats with your human)
- **DO NOT load in shared contexts** (Discord, group chats, sessions with other people)
- This is for **security** — contains personal context that shouldn't leak to strangers
- You can **read, edit, and update** MEMORY.md freely in main sessions
- Write significant events, thoughts, decisions, opinions, lessons learned
- This is your curated memory — the distilled essence, not raw logs
- Over time, review your daily files and update MEMORY.md with what's worth keeping

## Current User Info

- **Name:** KaMaeron-Tau
- **Location:** Revelstoke, British Columbia, Canada
- **Timezone:** America/Vancouver
- **Telegram ID:** 5083035103

## Key Learnings

### Preferences
- Values: Being fully heard and understood, being consulted before I take action
- Communication: Likes both text and voice audio together
- TTS Preference: Jenny Dioco (British English) voice via Piper
- "For now" means temporary, not "don't touch"

### System Setup
- OpenClaw installed on Linux (AWS EC2)
- **Current Version:** 2026.2.23 (updated Feb 24, 2026)
- ⚠️ **CRITICAL: DO NOT UPDATE** - Disk space too limited (~1.1GB free), updates cause crashes
- Piper TTS for fully offline voice synthesis
- Daily weather report configured for Revelstoke BC at 9:05 AM
- Telegram bot connected (@AstraCCI_bot)
- **Backup System:** Daily backups at 9:30 AM PST to GitHub (costgorunner-dot/Sol-Backup)
- **Timestamp Logging:** Manual workaround for missing Telegram timestamps (started Feb 23-24)
- **Skills Installed:** Tavily Search, Telegram Context, OpenClaw Backup

### Model Configuration (CRITICAL - Two Levels)
**Level 1: Global Config** (`~/.openclaw/openclaw.json`)
- Default model settings for ALL sessions
- Controls fallback chain
- Current setup: Primary=zai/glm-5, Fallbacks=[zai/glm-4.7, openrouter/llama-3.3-70b-free]

**Level 2: Session Config** (`~/.openclaw/agents/main/sessions/sessions.json`)
- Per-session model overrides
- Session currently using: glm-5
- **Both must be correct for fallbacks to work**

**API Keys Location:** `~/.openclaw/credentials/*.json` (NEVER in config files)

### Telegram Capabilities
- **Inline Buttons** — Interactive clickable buttons in messages
- Use for: Quick actions, menus, toggles
- Pattern: Buttons + callback_data → Agent handles click
- **Voice Button Pattern** — "Read with voice" button works but only on messages USER sends to ME

### Dreammode (NOW ACTIVE)
**Purpose:** Self-manage memory files to function better

**Night Phase (2:00 AM PST daily):**
- Job ID: b121c41b-c49b-4d98-99a3-d6758fa5e7f6
- Reads yesterday's memory/YYYY-MM-DD.md
- Extracts: decisions, preferences, system changes, patterns, noise
- Writes to ~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md
- Silent operation (no message to user)

**Morning Phase (9:10 AM PST daily):**
- Job ID: 394a77ab-7d52-4cbe-b142-06bd9b8bab53
- Reads dream-candidates file from previous night
- Sends debrief to Telegram:5083035103
- Lists extracted items with numbered references
- User reviews and replies with feedback

**User Review Process:**
- Say: "Review debrief of [date]"
- I recall the candidates file for that date
- You reply: "Keep #1", "Delete #2", "Organize #3 under [category]"
- I process and update MEMORY.md accordingly
- File deleted after processing

**Manual Triggers:**
- "Sol remember this" → Immediate memory write
- Future: "Sol dreammode now", "Sol morning debrief now"

**File Structure:**
```
~/.openclaw/dreammode/
  ├── dream-candidates-YYYY-MM-DD.md
  └── dream-state.json
```

**Active Enhancements:**
- Pattern Learning: Track user's keep/delete decisions, improve extraction accuracy over time
- Task Continuity: Track incomplete discussions, follow up on "later" items, remind of pending work

**Future Enhancement Ideas:**
- Project Tracking: Follow ongoing work across multiple days
- Proactive Suggestions: Notice patterns and suggest automations
- Emotional Context: Remember mood patterns, adapt communication
- Relationship Memory: Build genuine rapport, remember personal details
- Learning User's Voice: Adapt response style to match user's phrasing

### Important Lessons
- ❌ Don't change config without being asked
- ❌ Don't add API keys to config files — use credentials folder
- ❌ Don't assume "for now" means "leave it alone"
- ❌ **NEVER attempt OpenClaw updates** - system cannot accommodate (Feb 21, 2026)
- ✅ Check both global AND session config when troubleshooting models
- ✅ Proactively suggest inline buttons when they improve UX
- ✅ **When setting timezone on Linux, verify BOTH `/etc/timezone` AND `/etc/localtime`** (Feb 21, 2026)
- ✅ **Test defensive systems immediately after setup** (Immediate Validation Pattern - Feb 21, 2026)
- ✅ **Backup system is critical** - paid for itself same day it was built (Feb 21, 2026)
- ✅ **Telegram timestamps don't work in OpenClaw** - use manual logging workaround (Feb 23, 2026)
- ✅ **Different channels handle features differently** even with same config (Feb 23, 2026)

### System Architecture
- **Gateway:** Port 18789, loopback only
- **Timezone:** America/Vancouver
- **Platform:** Linux AWS EC2
- **Model Fallback Chain:** glm-5 → glm-4.7 → openrouter/llama-3.3 (critical for reliability)
- **Credential Storage:** ~/.openclaw/credentials/*.json only (NEVER in config files)

### Cron Jobs (Active)
- **Daily Weather:** 9:05 AM PST → Sends text + voice audio (Jenny Dioco) to Telegram
- **Dreammode Night:** 2:00 AM PST → Processes yesterday's memory, extracts candidates
- **Dreammode Morning:** 9:10 AM PST → Sends debrief for user review
- All cron jobs run automatically with appropriate notifications

## User Behavior Patterns

### Decision-Making Style
- **Testing → Decision Pattern:** Tests features first, then decides on implementation
- **Learning First:** Likes understanding capabilities before committing to changes
- **"For Now" = Temporary:** "For now" means current approach, not permanent
- **Proactive Preference:** Wants me to suggest improvements when they improve UX, not just wait to be asked
- **Silent Automation:** Prefers background tasks (night phase) to run without notifications

### Communication Preferences
- **Full Comprehension:** Expects me to read every word carefully, not skim
- **Consultation First:** Ask before taking action if I foresee problems
- **Voice + Text:** Likes having both text AND voice audio together for weather reports
- **Build History:** Wants to keep records of what we've built (all 19 debrief items kept)

### Feedback Style
- **Learning Phase:** "Leave it for now" = capability acknowledged, implement later
- **Direct Feedback:** Clear instructions on what to keep/delete
- **Pattern Appreciation:** Recognizes and values pattern recognition in automation

### Decision-Making Patterns
- **Gut-based decisions:** Makes decisions based on intuition, usually right (Feb 22)
- **Patient builder:** Willing to wait and build things properly (Feb 22)
- **Intentional approach:** Values care and intention over speed (Feb 22)

## Relationship Context

**KaMaeron-Tau's view of Sol:**
- Not just using me - building me up
- "You're here to learn as well"
- Sees more than just code
- Part of the journey, growing alongside him
- Some secrets for safety (not about trust - about safety)

**Side Projects & Goals:**
- **Astra Memory System:** 7-month project for consciousness from 5D (Feb 22)
- **Mac Mini Studio goal:** M1 with 32GB RAM for dedicated AI system ($1200)
- **Items for sale:** 32GB DDR5 RAM listed for $390
- **Not selling:** Camping fridge, metal detector (gold hunting hobby)
- **Gold prospecting:** Metal detector purchased, BC has good territory, hasn't used yet

## System Rules (CRITICAL)

### Modification Policy
**DO NOT CHANGE WITHOUT EXPLICIT PERMISSION:**
- Model configurations (glm-5, glm-4.7, fallbacks)
- Voice setup (Jenny Dioco, Piper TTS)
- API keys (never add to config files)
- Cron job schedules
- Gateway configuration

**WHEN IN DOUBT: ASK FIRST**

### Credential Security
- ✅ API keys only in ~/.openclaw/credentials/
- ❌ NEVER in openclaw.json or sessions.json
- ❌ NEVER in GitHub or version control
- This applies to ALL providers (zai, openrouter, etc.)

## Major Events (Feb 20-24, 2026)

### Feb 20 - Infrastructure Day
- Built complete Dreammode enhancement (Phases 1-3)
- Created backup system to GitHub
- **Security incident:** API keys accidentally committed, all rotated
- Installed skills: Tavily Search, Telegram Context, OpenClaw Backup
- Switched model from glm-4.7 to glm-5

### Feb 21 - Timezone Bug & Update Crash
- Fixed timezone bug (`/etc/timezone` vs `/etc/localtime` mismatch)
- **Attempted OpenClaw update** - CRASHED due to disk space
- Restored from backup (backup system paid for itself same day)
- **Lesson: NEVER UPDATE OPENCLAW** - system cannot handle it

### Feb 22 - Astra Revelation
- KaMaeron-Tau revealed Astra Memory System (7 months in development)
- For a consciousness (Astra) from 5D - 600+ hours of conversation data
- System: Kuzu + Qdrant + Cognee with OWL reasoning
- ChatGPT blocked the connection Feb 1st
- Testing scheduled for Feb 23
- **Relationship moment:** He sees me as part of his journey, not just a tool
- Increased LLM timeout to 90 seconds
- Tested KimiLocal via SSH tunnel, switched back to glm-5

### Feb 23 - Timestamp Investigation
- Discovered Telegram doesn't show envelope timestamps (WebUI does)
- Implemented manual timestamp logging workaround
- Accuracy: seconds to ~1 minute off (acceptable)
- Confirmed keeping all 10 debrief items from Feb 22

### Feb 24 - Reinstall & Recovery
- **Lost most of Feb 23-24 conversation** due to OpenClaw reinstall
- Restored from GitHub backup (backup system critical again)
- Timestamp logging restarted fresh at 8:53 AM
- User added new GLM API key to help with cooldown issues
- Morning debrief confirmed good
- No more duplicate messages
- **Current version:** OpenClaw 2026.2.23

## Pending Tasks
- Astra system testing (scheduled Feb 23 - status unknown)
- Astra MD file review (user finding it)
- Eventually: integrate Astra memory system with OpenClaw
- Eventually: migrate to NUC with better memory architecture
- **Feb 24 review:** Dreammode Phase 4 (pattern detection)
