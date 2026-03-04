---
date: 2026-02-20
tags: [system, metadata, cross-references]
---

# Cross-Reference System

**Purpose:** Automatically link related items across memory files

---

## 🔗 **How Cross-References Work**

### **Automatic Detection**

Night Phase scans for:
- **Common topics:** If 3+ items mention same topic
- **Related decisions:** Decision → Implementation → Outcome
- **Project connections:** Project A relates to Project B
- **Config dependencies:** Config X requires Config Y

### **Cross-Reference Format**

**In memory files:**
```markdown
## Related Items
- **See also:** memory/projects/voice-button.md
- **Depends on:** memory/system-config/tts-setup.md
- **Related decision:** memory/raw/2026-02-19.md#L45
```

**In index.md:**
```markdown
### Voice Button Project
**File:** `memory/projects/voice-button.md`
**Related:** TTS System, Weather Reports
**Status:** On-hold
```

---

## 📊 **Cross-Reference Types**

### **1. Dependency References**
- **Format:** "Depends on: [file]"
- **Example:** "Voice button depends on: TTS system"
- **Use:** Shows what must be working for item to function

### **2. Related Project References**
- **Format:** "Related: [project names]"
- **Example:** "Voice button related: Dreammode, Weather Reports"
- **Use:** Shows interconnected projects

### **3. Decision History References**
- **Format:** "Decision: [date] → [file#line]"
- **Example:** "Decision: Feb 19 → memory/raw/2026-02-19.md#L45"
- **Use:** Links outcome to original decision

### **4. Pattern References**
- **Format:** "Pattern: [pattern name]"
- **Example:** "Follows pattern: 'For now' temporary marker"
- **Use:** Shows behavioral patterns

---

## 🔍 **Cross-Reference Detection Rules**

### **Automatic Linking Triggers:**

**Topic Co-occurrence:**
- Same topic mentioned 3+ times across days → Link as related

**Project Dependencies:**
- Item A requires Item B → Add dependency reference

**Decision Chains:**
- Decision → Action → Outcome → Link as sequence

**Pattern Matches:**
- New item matches existing pattern → Tag and reference

### **Manual Cross-References:**
- User says "this relates to X" → Add cross-reference
- Agent notices connection → Add to Night Phase candidates

---

## 📚 **Example: Cross-Referenced Memory**

### **voice-button.md**
```markdown
---
tags: [project, voice, on-hold]
---

# Voice Button Project

**Status:** On-hold (deferred Feb 19, 2026)
**Related:** TTS System, Weather Reports, Dreammode

## Cross-References
- **Depends on:** TTS System (Piper + Jenny Dioco)
- **Related to:** Weather Reports (uses voice output)
- **Decision:** Feb 19 - "Leave it for now" → memory/raw/2026-02-19.md#L45
- **Pattern:** Follows "test first, decide later" workflow

## Implementation Details
- Tested: Feb 19, 2026
- Working: Yes (Telegram inline buttons)
- User feedback: Liked concept, wants to defer
```

---

## 🎯 **Benefits**

### **Better Context**
- See related items instantly
- Understand dependencies
- Trace decision history

### **Faster Retrieval**
- Find all related items from one entry
- Follow chains of decisions
- See project connections

### **Pattern Recognition**
- Notice recurring themes
- Identify dependencies early
- Understand user workflows

---

## 🔄 **Maintenance**

**Updated by:** Night Phase (automatic)
**Manual review:** Weekly (check for broken links)
**Cleanup:** Remove outdated cross-references

---

## 📊 **Cross-Reference Statistics**

**File:** `memory/metadata/xref-stats.md`
- Tracks cross-reference count
- Identifies most-connected items
- Shows reference networks

---

**Created:** February 20, 2026
**Purpose:** Phase 3 - Index Optimization
**Status:** Ready for implementation
