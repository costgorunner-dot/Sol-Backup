# TOOLS.md - Local Notes

---
date: 2026-02-18
tags: [reference, environment, tts, cron, tools, config]
---

# OpenClaw Environment Setup

## ⚠️ CRITICAL: DO NOT UPDATE OPENCLAW

**DO NOT RUN:** `openclaw update` or any system updates

**Reason:** Disk space too limited. Current free space (~1.1GB) is insufficient for the latest OpenClaw update. Attempting to update will crash the system.

**Current Version:** 2026.2.17 — **STAY ON THIS VERSION**

**If asked to update:** Decline. The system cannot accommodate larger installations.

**Auto-update DISABLED:** Config has `"checkOnStart": false` set to prevent automatic update checks on restart.

**Added:** February 21, 2026 (after failed update attempt caused system crash)

## Model Configuration (Two Levels)

**IMPORTANT:** Model settings exist in TWO places:

### 1. Global Config
**File:** `~/.openclaw/openclaw.json`
```json
"agents": {
  "defaults": {
    "model": {
      "primary": "zai/glm-5",
      "fallbacks": ["zai/glm-4.7", "openrouter/meta-llama/llama-3.3-70b-instruct:free"]
    }
  }
}
```
**Purpose:** Default model settings for ALL agents and new sessions

### 2. Session Config
**File:** `~/.openclaw/agents/main/sessions/sessions.json`
```json
"modelProvider": "zai",
"model": "glm-5"
```
**Purpose:** Per-session model settings (overrides global)

**Hierarchy:**
1. Session override (highest priority)
2. Agent-level defaults
3. Global defaults (fallback)

**Why this matters:**
- Session config determines which model is CURRENTLY running
- Global config determines FALLBACKS when current model fails
- Both must be correct for fallback chain to work properly

**Current Model Setup:**
- **Primary:** zai/glm-5
- **Fallback 1:** zai/glm-4.7 (same provider, different model)
- **Fallback 2:** openrouter/meta-llama/llama-3.3-70b-instruct:free (different provider)

**API Keys stored in:** `~/.openclaw/credentials/` (NOT in config files)
- `zai-default.json`
- `openrouter-default.json`

### Piper TTS (Self-Hosted)
- Default Voice: Jenny Dioco British English (en_GB-jenny_dioco-medium)
- Model Path: /home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx
- Usage: echo text | piper -m /home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx -f output.wav
- Installed: Feb 18, 2026
- Fully offline - no internet or API key needed
- PATH: Add /home/ubuntu/.local/bin to PATH

### Cron Jobs
- **Daily Weather Report:** Every day at 9:05 AM (PST)
  - Job ID: 4ff4de1e-ea92-4c33-a8ef-c4203e69ee1c
  - Location: Revelstoke, British Columbia, Canada
  - Delivery: Telegram (5083035103) with both text and voice audio
  - Uses Jenny Dioco voice for TTS

- **Dreammode Night Phase:** Every day at 2:00 AM (PST)
  - Job ID: b121c41b-c49b-4d98-99a3-d6758fa5e7f6
  - Processes yesterday's memory log
  - Extracts important items, decisions, patterns
  - Writes to ~/.openclaw/dreammode/dream-candidates-YYYY-MM-DD.md
  - Silent operation (no user notification)

- **Dreammode Morning Debrief:** Every day at 9:10 AM (PST)
  - Job ID: 394a77ab-7d52-4cbe-b142-06bd9b8bab53
  - Sends formatted summary to Telegram (5083035103)
  - Lists extracted items with numbered references
  - Waits for user feedback throughout the day

**Dreammode File Structure:**
```
~/.openclaw/dreammode/
  ├── dream-candidates-YYYY-MM-DD.md (daily staging files)
  ├── dream-state.json (tracking metadata)
  └── pattern-learning.json (keeps track of user feedback patterns)
```

**Active Enhancements:**
- Pattern Learning: Tracks keep/delete decisions to improve extraction accuracy
- Task Continuity: Monitors incomplete tasks and follow-up items

### LLM Timeout Settings
- **Current timeout:** 90 seconds
- **Config location:** `agents.defaults.timeoutSeconds`
- **Why increased:** To handle SSH tunnel latency when using local Ollama (Kimi) through reverse tunnel
- **Added:** February 22, 2026
