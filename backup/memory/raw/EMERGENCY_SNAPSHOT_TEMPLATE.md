# Emergency Memory Snapshot Template

**Use this format when creating emergency snapshots:**

```markdown
# Emergency Memory Snapshot - [DATE TIME]

**Trigger:** Context usage exceeded 75% threshold
**Created:** YYYY-MM-DD HH:MM PST
**Context Usage:** X% (Xk/Yk tokens)
**Session:** [Session key or description]

## Recent Conversations Summary

### Important Discussions
- [Topic 1]: [Brief summary]
- [Topic 2]: [Brief summary]

### Decisions Made
- [Decision 1]
- [Decision 2]

### Active Tasks
- [Task 1]: [Status/Context]
- [Task 2]: [Status/Context]

### Context at Time of Snapshot
- What was being worked on
- What was just discussed
- What was about to happen next

## Session History Highlights

### Key Exchanges
1. [User]: [Message]
   [Assistant]: [Response/Action]

2. [User]: [Message]
   [Assistant]: [Response/Action]

### Files Modified
- [File path]: [What changed]
- [File path]: [What changed]

### Tools Used
- [Tool name]: [Purpose]
- [Tool name]: [Purpose]

---

**Note:** This snapshot was created automatically to prevent context loss during OpenClaw compaction. It will be merged into the daily memory file during the next 11 PM heartbeat or 2 AM Night Phase processing.
```

**File naming:** `emergency-YYYY-MM-DD-HHMM.md`

**Example:** `emergency-2026-02-20-1021.md`
