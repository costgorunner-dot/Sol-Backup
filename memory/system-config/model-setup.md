---
date: 2026-02-19
tags: [config, model, critical]
---

# Model Configuration

## Overview

**Status:** Operational
**Last Updated:** February 19, 2026
**Criticality:** HIGH - fallback chain essential for reliability

---

## Model Fallback Chain

### Primary Model
**Provider:** Zai
**Model:** glm-5
**Status:** Frequently times out, unreliable as sole model
**Role:** Preferred when stable, but needs fallbacks

### Fallback 1
**Provider:** Zai
**Model:** glm-4.7
**Status:** More stable, same provider
**Role:** First fallback when glm-5 times out

### Fallback 2
**Provider:** OpenRouter
**Model:** meta-llama/llama-3.3-70b-instruct:free
**Status:** Different provider, free tier, highly reliable
**Role:** Last resort fallback, ensures system always works

**Why This Chain Matters:**
- GLM-5 is powerful but unstable (frequent timeouts)
- GLM-4.7 provides similar capability with better stability
- OpenRouter Llama 3.3 ensures system never completely fails
- Both global AND session config must be correct for fallbacks to work

---

## Configuration Files

### Global Config
**Path:** `~/.openclaw/openclaw.json`
**Purpose:** Default model settings for ALL sessions and agents

**Current Configuration:**
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

**Purpose:**
- Controls default model for ALL agents
- Sets the fallback chain
- Applies to new sessions automatically

### Session Config
**Path:** `~/.openclaw/agents/main/sessions/sessions.json`
**Purpose:** Per-session model overrides

**Current Configuration:**
```json
{
  "modelProvider": "zai",
  "model": "glm-5"
}
```

**Purpose:**
- Overrides global config for specific sessions
- Main session currently using glm-5
- **Both must be correct for fallbacks to work**

---

## API Keys (CRITICAL - SECURITY)

### Key Storage Location
**Path:** `~/.openclaw/credentials/`

### Key Files
- `zai-default.json` → Zai provider API key
- `openrouter-default.json` → OpenRouter provider API key

### Security Rules
- ✅ API keys ONLY in `~/.openclaw/credentials/`
- ❌ NEVER in `openclaw.json`
- ❌ NEVER in `sessions.json`
- ❌ NEVER in GitHub or version control
- This applies to ALL providers (zai, openrouter, etc.)

### Key Format Example
```json
{
  "apiKey": "your-api-key-here"
}
```

---

## Hierarchy and Priority

### Model Selection Order
1. **Session override** (highest priority) - If session config specifies a model
2. **Agent-level defaults** - Agent-specific model settings
3. **Global defaults** (fallback) - openclaw.json defaults

### Why Both Levels Matter
- **Session config** determines which model is CURRENTLY running
- **Global config** determines FALLBACKS when current model fails
- Both must be correct for fallback chain to work properly

---

## Troubleshooting

### Models Not Working

**Step 1: Check Global Config**
```bash
cat ~/.openclaw/openclaw.json
```
Verify fallback chain is configured correctly.

**Step 2: Check Session Config**
```bash
cat ~/.openclaw/agents/main/sessions/sessions.json
```
Verify session is using correct model.

**Step 3: Verify API Keys**
```bash
ls ~/.openclaw/credentials/
```
Ensure key files exist and contain valid keys.

**Step 4: Test Model**
```bash
openclaw status
# Check model in use
```

### Common Issues

**Issue: Model timing out frequently**
- **Solution:** Fallback chain should switch to glm-4.7 or openrouter automatically
- **Check:** Both global AND session config have correct fallbacks

**Issue: Fallback not working**
- **Solution:** Ensure fallback chain is in openclaw.json (global config)
- **Check:** Session config has correct provider/model references

**Issue: API key errors**
- **Solution:** Verify keys in ~/.openclaw/credentials/ are valid
- **Check:** Keys are NOT in config files

---

## Model Capabilities

### Zai GLM-5 (Primary)
- **Strengths:** Most capable, best responses
- **Weaknesses:** Frequent timeouts, unreliable
- **Best For:** Complex tasks when stable

### Zai GLM-4.7 (Fallback 1)
- **Strengths:** Good capability, more stable
- **Weaknesses:** Less powerful than glm-5
- **Best For:** Most tasks, reliable fallback

### OpenRouter Llama 3.3 (Fallback 2)
- **Strengths:** Highly reliable, free tier
- **Weaknesses:** Different provider context
- **Best For:** Emergency fallback, ensures system never fails

---

## Modification Policy

**DO NOT CHANGE WITHOUT EXPLICIT PERMISSION:**
- Model configurations (glm-5, glm-4.7, fallbacks)
- API keys (never add to config files)

**WHEN IN DOUBT: ASK FIRST**

---

## References

- **Complete Build Documentation:** `memory/system-config/openclaw-build.md`
- **Cron Jobs:** `memory/system-config/cron-jobs.md`
- **OpenClaw Docs:** `/home/ubuntu/.npm-global/lib/node_modules/openclaw/docs/`

---

**Last Updated:** February 19, 2026
**Status:** Operational with fallback chain
**Next Review:** As needed
