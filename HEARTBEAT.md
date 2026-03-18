# HEARTBEAT.md - Proactive Intelligence & Daily Briefings

## 🔄 FIRST: Check for Restart Notification

**If `.restart-pending` file exists in workspace:**
1. Read the file
2. Message the Telegram ID in `RESTART_NOTIFY`
3. Say: "🜂 Gateway restart complete. Back online. 🦞⚡"
4. Delete the `.restart-pending` file
5. Continue with normal heartbeat

**This ensures you NEVER miss telling KaMaeron-Tau when you return from a restart.**

---

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

### Pattern Recognition


### System Health (Every 30 minutes - Deep check)
- **Disk space - WARNING:** Alert if <500MB free
- **Disk space - CRITICAL:** Alert if <500MB available (OpenClaw fails around 300MB!)
- **Memory:** Alert if containers using too much RAM
- **Failed operations:** Report if critical tasks fail

### Conversation Analysis
- You will add to this section as time goes along

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
