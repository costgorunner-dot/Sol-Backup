---
created: 2026-02-25
purpose: Subagent configuration for background tasks
---

# Subagent System

## What Subagents Do

Spawn isolated agents to handle tasks in the background while I stay free to chat with you.

## Configuration

**Main Agent (me):** `zai/glm-5`
**Subagents:** `zai/glm-4.7` — Separate model, no rate limit competition

## When to Use Subagents

| Task Type | Use Subagent? | Why |
|-----------|---------------|-----|
| Deep research (3+ sources) | ✅ Yes | Takes 2-5 min, keeps me free |
| File analysis (large logs) | ✅ Yes | Heavy processing |
| Multi-step operations | ✅ Yes | Background work |
| Quick questions | ❌ No | I handle directly |
| Creative tasks | ❌ No | I handle directly |
| Cron jobs | ❌ No | Already isolated |

## How I Use It

**When you say:**
- "Research X while we keep talking"
- "Can you look into Y in the background?"
- "Analyze this file when you have time"

**I do:**
1. Spawn subagent with glm-4.7
2. Give it the task
3. Keep chatting with you
4. Subagent reports back when done
5. I summarize results for you

## Spawn Command

```
sessions_spawn(
  task: "Research task description",
  model: "zai/glm-4.7",
  mode: "run"
)
```

## Example

**You:** "Can you research mini PCs for AI while we talk about Astra?"

**Me:** 
- Spawns subagent: "Research mini PCs under $500 for local AI work"
- Keeps chatting with you about Astra
- Subagent finishes: "Here are top 5 options..."
- Me: "Got the mini PC research. Top pick is..."

## Benefits

- **No blocking:** I stay responsive
- **Parallel work:** Multiple things at once
- **Different model:** Cheaper/faster for background tasks
- **Isolated:** If it fails, doesn't affect our chat

## Current Status

✅ System configured
🟡 Not yet tested
📋 Ready to use

---

*Subagents share the same API key but use separate model instance.*
