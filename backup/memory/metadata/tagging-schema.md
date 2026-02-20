---
date: 2026-02-20
tags: [system, metadata, tagging-schema]
---

# Tagging Schema for Memory System

**Purpose:** Standardized tagging system for consistent categorization and search

---

## 📋 **Tag Categories**

### **Priority Tags**
- `#critical` - Must not be changed without permission
- `#important` - High value, should be preserved
- `#reference` - Useful for looking up information
- `#temporary` - For now, likely to change

### **Content Type Tags**
- `#preference` - User preferences and values
- `#pattern` - Recurring behaviors or language patterns
- `#decision` - Choices made, options selected
- `#config` - System configuration
- `#project` - Ongoing work or initiatives
- `#task` - Action items, todos
- `#insight` - Learnings, discoveries

### **Topic Tags**
- `#model` - LLM model configuration
- `#voice` - TTS/STT voice systems
- `#dreammode` - Memory management system
- `#telegram` - Telegram integration
- `#cron` - Scheduled tasks
- `#api` - API keys and external services

### **Status Tags**
- `#active` - Currently in use/development
- `#complete` - Finished, stable
- `#on-hold` - Paused, deferred
- `#testing` - Experimental, being evaluated

### **Time Tags**
- `#daily` - Regular daily activity
- `#weekly` - Weekly pattern
- `#milestone` - Significant event

---

## 🏷️ **Tag Usage Examples**

### **In Memory Files**
```markdown
---
tags: [preference, voice, critical]
---

# Communication Preferences

- Prefers voice + text together (for detailed reports)
- Values: [critical] Being fully heard before action
```

### **In Daily Logs**
```markdown
### 9:15 AM - Dreammode Review [decision, dreammode]
- User: "Keep it all"
- Action: Moved 19 items to categorized memory
```

### **In Projects**
```markdown
---
tags: [project, dreammode, active]
status: #on-hold
---

# Voice Button Project
- Tested: Feb 19, 2026
- Status: #on-hold (user decided to defer)
```

---

## 🔍 **Tag Search Patterns**

### **Find by Tag**
```
memory_search "#voice" → All voice-related items
memory_search "#critical" → All critical items
memory_search "#decision AND #model" → Model decisions
```

### **Find by Status**
```
memory_search "#active" → All active projects/tasks
memory_search "#on-hold" → Deferred items
memory_search "#complete" → Finished work
```

### **Find by Topic**
```
memory_search "#dreammode" → All Dreammode-related
memory_search "#config AND #critical" → Critical configs
```

---

## 📊 **Tag Statistics Tracking**

**File:** `memory/metadata/tag-stats.md`
- Tracks tag usage frequency
- Identifies emerging patterns
- Helps optimize tag schema

**Updated by:** Night Phase (automatically)

---

## 🎯 **Tagging Best Practices**

### **DO:**
- ✅ Use 1-3 content type tags per item
- ✅ Add status tags to projects/tasks
- ✅ Tag priority items as #critical or #important
- ✅ Use consistent tag names from schema

### **DON'T:**
- ❌ Create duplicate tags (e.g., #config and #configuration)
- ❌ Over-tag (limit to 5 tags per item)
- ❌ Use sentence-length tags
- ❌ Tag obvious things (everything in preferences/ doesn't need #preference)

---

## 🔄 **Tag Maintenance**

**Weekly Review:**
- Check for duplicate/similar tags
- Merge underused tags
- Add new tags as needed
- Update tag schema documentation

**Responsible:** Night Phase (automatic) + manual review

---

## 📚 **Related Files**

- `memory/index.md` - Uses tags for categorization
- `memory/metadata/tag-stats.md` - Tag usage statistics
- `memory/patterns/` - Often tagged with #pattern
- `memory/projects/` - Tagged with #project + status

---

**Created:** February 20, 2026
**Purpose:** Phase 3 - Index Optimization
**Status:** Ready for implementation
