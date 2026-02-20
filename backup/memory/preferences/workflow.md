---
date: 2026-02-19
tags: [preferences, workflow]
---

# Workflow Preferences

## Decision-Making Process

### Testing → Decision Pattern
**Phase 1:** "Let me see if it works" (testing)
**Phase 2:** "I liked that but..." (evaluation)
**Phase 3:** "For now" or "Do it" (decision)

**Occurrences:**
- Inline buttons (tested → liked → deferred implementation)
- Voice button (tested → liked → capability exists, implement later)
- Model configuration (tested → configured → working fallback chain)

**User Feedback:** "That's exactly how I work"

---

## Language Patterns

### "For Now" = Temporary
**Meaning:** "For now" means temporary current state, NOT permanent
**Occurrences:** 5+ times (2026-02-17 to 2026-02-18)
**Context:** Model configuration, voice setup, testing phases
**User Feedback:** Confirmed this interpretation

**Implication:** Don't treat "for now" as "never touch again" - it means "current state"

---

## Proactive vs. Reactive

### Proactive Preference
- Wants me to suggest improvements when they improve UX
- Don't just wait to be asked
- Example: "Should I create a quick reference doc?" (when noticing repetitive tasks)

### When to Stay Quiet
- Nothing new since last check
- Systems all healthy
- Late night (11pm-7am) unless urgent
- User busy (active conversation ongoing)

---

## Documentation Preferences

### Build History
- Wants to keep records of what we've built
- Example: All 19 Dreammode debrief items kept (build history)
- Wants complete documentation for backup/restore

### Evidence: "OpenClaw Build" File
User requested a complete build documentation file:
- Purpose: Backup copy of everything built
- Use case: Restore system if lost/damaged
- Result: `memory/system-config/openclaw-build.md` created

---

## Automation Preferences

### Silent Background Work
- Prefers automated tasks to run silently without notifications
- Example: Dreammode night phase (2:00 AM) runs silently
- User feedback: "I was waiting to see if the morning debrief would set off... it looks like everything did"

### When to Notify
- Important events or findings
- Pattern discoveries
- Calendar events coming up (<2h)
- User explicitly asked to be reminded

---

## Learning Approach

### Learning First, Implementation Second
- Likes understanding capabilities before committing to changes
- Tests features first, then decides on implementation
- Prefers to see options before making decisions

### Example Workflow:
1. Discover capability (e.g., inline buttons exist)
2. Test it (see how it works)
3. Evaluate (decide if useful)
4. Decide (implement now, leave for later, or reject)

---

## System Modification Policy (CRITICAL)

### DO NOT CHANGE WITHOUT EXPLICIT PERMISSION:
- Model configurations (glm-5, glm-4.7, fallbacks)
- Voice setup (Jenny Dioco, Piper TTS)
- API keys (never add to config files)
- Cron job schedules
- Gateway configuration

**WHEN IN DOUBT: ASK FIRST**

### What I Can Do Freely (Safe):
- Read files, explore, organize, learn
- Search the web, check calendars
- Work within workspace
- Update documentation (when safe to do so)

### Yellow Light (Ask First):
- Modifying existing configs
- Installing new software
- Deleting or moving files
- Changing system settings

### Red Light (Never Without Explicit OK):
- Commands with `rm -rf`, `DROP`, `DELETE`
- Financial transactions
- Sending messages/emails externally
- Accessing sensitive accounts
- Anything that can't be undone

---

## Verification Before Completion

### Always Check:
- Did I actually do what was asked?
- Does the result match the request?
- If it doesn't match, say so and ask what to do

**Wrong:** "I changed the model" (when you didn't)
**Right:** "I attempted to change the model but encountered [error]. What should I do?"

---

**Last Updated:** February 19, 2026
