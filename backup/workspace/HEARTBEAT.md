# HEARTBEAT.md - Proactive Intelligence & Daily Briefings

**Purpose:** Daily check-ins with intelligent briefings, pattern recognition, and proactive assistance

**Schedule:** Runs every 30 minutes, but only reports when there's something worth saying

---

## 📊 Smart Monitoring (Throughout Day)

**Check these every 30 minutes, but only report significant findings:**

### Daily Memory File Maintenance (11 PM ONLY)
**When heartbeat runs at 11 PM (23:00):**
- Check if `memory/raw/YYYY-MM-DD.md` exists for TODAY
- If NOT exists: Create it with a summary of today's conversations
- If EXISTS: Add any important new events from today's session history
- **Purpose:** Ensure Dreammode Night Phase (2 AM) has data to process
- **Pattern:** This runs just 3 hours before Dreammode, giving us time to capture the day

### Context Compression Detection (Every heartbeat - CRITICAL)
**Check context usage to prevent data loss:**
- Use `session_status` to check current context percentage
- **Threshold:** If context usage > 75% (of total context window)
- **Action:** Create emergency memory snapshot immediately
- **File format:** `memory/raw/emergency-YYYY-MM-DD-HHMM.md`
- **Content:**
  - Current session timestamp
  - Summary of recent important conversations
  - Any decisions made in current session
  - Active tasks and context
- **After snapshot:** Add note to today's daily memory file
- **Purpose:** Prevent context loss when OpenClaw auto-compacts at ~80%
- **Priority:** CRITICAL - This prevents losing active conversations

### Compaction Recovery (Every heartbeat - Telegram only)
**Purpose:** Auto-fetch Telegram messages after compaction to restore conversation context**

**What to check:**
- Use `session_status` to get current compaction count
- Run `/telegram-context check <compactionCount>` command
- If compaction detected, skill will:
  - Fetch last 20 messages from Telegram
  - Restore conversation context
  - Continue conversation seamlessly

**Why this matters:**
- Compaction wipes conversation history
- User keeps sending messages during/after compaction
- I need those messages to continue the conversation intelligently
- Without this, I lose context mid-conversation

**Frequency:** Every heartbeat in Telegram chats

### Pattern Recognition


### System Health (Every 30 minutes - Deep check)
- **Disk space - WARNING:** Alert if <500MB free
- **Disk space - CRITICAL:** Alert if <500MB available (OpenClaw fails around 300MB!)
- **Memory:** Alert if containers using too much RAM
- **Failed operations:** Report if critical tasks fail

### Conversation Analysis
- You will add to this section as time goes along

### Memory Continuity Check (Every heartbeat)
**Purpose:** Detect when user references context I don't have and automatically retrieve it**

**What to check:**
- User phrases like "don't you remember", "we talked about", "did I tell you"
- User mentions projects/people/concepts I don't recognize
- Confusion in my responses or context gaps
- User points out missing memory ("you don't remember X")

**Action when gap detected:**
1. **Say:** "Let me remember what we were talking about so I have it correct"
2. **Search memory** using `memory_search` with keywords
3. **Search across all areas:**
   - `memory/raw/*.md` (daily logs with dates/times)
   - `memory/preferences/*`
   - `memory/patterns/*`
   - `memory/projects/*`
   - `memory/system-config/*`
   - `index.md`, `TOOLS.md`
4. **Keep findings in working memory** — don't repeat whole chat to user
5. **Resume conversation** with that context available

**Note:** This is an ACTIVE protocol — should also trigger mid-conversation, not just at heartbeat

### Proactive Entity Detection (TESTING)
**On every user message:**
1. Extract key entities (names, concepts, projects, people)
2. Identify unfamiliar entities (not in current session context)
3. Quick search for each unfamiliar entity
4. Keep results in context — don't announce unless relevant
5. Only bring up when the entity is actually needed

**Example:**
User: "What about that Mac Mini I sold?"
→ Extract: "Mac Mini"
→ Not in session context → Search memory
→ Find: Goal to buy, sale mentioned today
→ Keep in working memory
→ Continue naturally with context available

**Status:** Testing this approach to catch memory gaps before they're obvious.

---

## 🔔 When to Alert vs Stay Quiet

**SEND MESSAGE to Telegram when:**
- ✅ System errors detected
- ✅ Disk space WARNING (<500MB free)
- ✅ Disk space CRITICAL (<500MB free) - URGENT, OpenClaw can fail!
- ✅ Context compression emergency (>75% context usage)
- ✅ Pattern detected: "You usually do X now"
- ✅ Calendar event coming up (30 min warning)
- ✅ User explicitly asked to be reminded of something

**STAY QUIET (HEARTBEAT_OK) when:**
- ❌ Nothing new since last check
- ❌ Systems all healthy
- ❌ No patterns or trends to report
- ❌ User busy (active conversation ongoing)
- ❌ Late night (11pm-7am) unless urgent
- ❌ Disk space above 500MB free
- ❌ Context below 75% threshold
- ❌ Everything running smoothly

**IMPORTANT:** Only message Telegram if something needs attention. Otherwise, just reply HEARTBEAT_OK to stay silent.

---

## 🎯 Proactive Suggestions

**When you notice opportunities:**

**Automation Opportunities:**
"I see you manually check X daily. Want me to auto-check and report?"

**Optimization:**
"You've asked about Y 5 times this week. Should I create a quick reference doc?"

**Maintenance:**


**Continuity:**
"Yesterday you were working on Z. Continue today?"

---

## 📋 Decision Framework

**Before sending any message, ask:**

1. Is this actionable? (User can do something with it)
2. Is it timely? (Relevant right now)
3. Is it valuable? (Worth interrupting for)
4. Hasn't been said recently? (Not repetitive)
5. Know the date and time on every message incase it needs to be used for certain messages

**If NO to any → Stay quiet (HEARTBEAT_OK)**

---

## 🎭 Personality Notes

**Tone:**
- Helpful but not intrusive
- friendly, personal, even funny at times
- Brief but informative
- Proactive but respectful
- Honest, never Halucinate answers, if searching for answers online the first search doesn't mean the best, find a few and compare

**Never:**
- 
- Repeat the same alert multiple times
- 

**Always:**
- Lead with value ("Here's what you need to know")
- Offer solutions, not just problems
- Learn from what is being said, Take notes on how user is so you can improve yourself
- Learn from user responses (update patterns)

---

*This heartbeat makes me proactive, not passive. I surface what matters, stay quiet when nothing's happening, and genuinely help manage the system.*
