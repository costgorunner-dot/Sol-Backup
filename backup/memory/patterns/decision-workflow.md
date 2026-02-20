---
date: 2026-02-19
tags: [patterns, workflow, verified]
---

# Decision Workflow Patterns

## Pattern 1: Testing → Decision Workflow

### Workflow Description
A consistent three-phase approach to decision-making:
1. **Discovery/Testing:** "Let me see if it works"
2. **Evaluation:** "I liked that but..." / assessment of usefulness
3. **Decision:** "For now" (temporary) / "Do it" (implement) / "No" (reject)

### Confidence
90% - verified by user feedback

### Occurrences

#### Example 1: Inline Buttons
**Phase 1 (Testing):**
- User: "Can we test inline buttons?"
- Action: Demonstrated button functionality with weather report

**Phase 2 (Evaluation):**
- User: "I liked that"
- Assessment: Buttons are useful for quick actions

**Phase 3 (Decision):**
- User: "For now" - capability exists, may implement more later
- Result: Button capability documented, ready to use

#### Example 2: Voice Button
**Phase 1 (Testing):**
- User: "Can we test the voice button?"
- Action: Created and tested voice button functionality

**Phase 2 (Evaluation):**
- User: "That's cool"
- Assessment: Capability works and is valuable

**Phase 3 (Decision):**
- User: "For now, leave it" - defer implementation
- Result: Capability documented, ready to implement when requested

#### Example 3: Model Configuration
**Phase 1 (Testing):**
- User: "Let's test the fallback chain"
- Action: Configured glm-5 → glm-4.7 → openrouter/llama-3.3

**Phase 2 (Evaluation):**
- User: "That's working well"
- Assessment: Fallback chain provides reliability

**Phase 3 (Decision):**
- User: "Keep it" - make this the standard setup
- Result: Model configuration locked in, documented in build file

### User Feedback
- "That's exactly how I work"
- "I test things first, then decide"
- Confirmed this is consistent behavior pattern

### Implications for AI Behavior
**When User Wants to Test:**
- Enable the feature or capability
- Provide clear demonstration
- Show how it works in practice
- Don't rush to implementation

**During Evaluation Phase:**
- Wait for user's assessment
- Answer questions about the feature
- Provide additional context if helpful
- Don't assume decision direction

**When User Decides:**
- "For now" → Document capability, mark as temporary
- "Do it" → Implement fully, document permanently
- "No" → Reject, document reason, remove if implemented

---

## Pattern 2: "Learning First" Approach

### Workflow Description
User prefers to understand capabilities before committing to implementation decisions.

### Characteristics
- **Information Gathering:** Wants to know what's possible
- **Understanding:** Asks for explanations of how things work
- **Options:** Prefers to see multiple approaches before choosing
- **Commitment:** Only commits after understanding is complete

### Occurrences
- Asked for detailed explanation of model fallback chain
- Requested full build documentation before proceeding
- Wanted to see Dreammode enhancement design before implementation
- Asked "What happens if that file is large?" before memory restructure

### User Feedback
- "I like to understand what's happening"
- "Show me what will be written where"
- Prefers transparency and detailed explanations

### Implications for AI Behavior
**Before Implementation:**
- Explain what will happen
- Show the full picture (not just the task)
- Provide examples and context
- Answer questions thoroughly

**During Explanation:**
- Use clear, non-technical language where possible
- Provide analogies when helpful
- Show before/after states
- Include relevant technical details

**After Understanding:**
- Wait for decision
- Don't pressure for quick commitment
- Offer to answer more questions
- Respect "for now" decisions

---

## Pattern 3: Consultative Decision-Making

### Workflow Description
User wants to be consulted before actions are taken, especially when:
- Actions have lasting impact
- System configurations are modified
- External actions are considered
- Multiple options exist

### Occurrences
- "Don't change config without being asked"
- "Ask before taking action if you foresee problems"
- "I want to be consulted before you do things"

### User Feedback
- Values being heard and understood
- Prefers control over important decisions
- Doesn't want surprises from automated actions

### Implications for AI Behavior

**Green Light (Safe to act without asking):**
- Reading files, exploring, organizing
- Searching the web, checking calendars
- Working within workspace
- Creating new files in workspace

**Yellow Light (Ask first):**
- Modifying existing configs
- Installing new software
- Deleting or moving files
- Changing system settings

**Red Light (Never without explicit OK):**
- Commands with `rm -rf`, `DROP`, `DELETE`
- Financial transactions
- Sending messages/emails externally
- Accessing sensitive accounts
- Anything that can't be undone

---

## Pattern 4: "For Now" as Temporary Commitment

### Workflow Description
"For now" decisions are not permanent - they represent current best understanding/approach, subject to change as new information emerges.

### Characteristics
- **Current State:** Represents what works now
- **Open to Change:** May be revisited later
- **Not Permanent:** Don't lock it down forever
- **Document as Temporary:** Mark as "for now" not "final"

### Occurrences
- Model config: "For now, glm-5 is primary" → may change if better models emerge
- Voice setup: "For now, Jenny Dioco" → may try other voices later
- Voice button: "For now, deferred" → implement when needed
- Memory structure: "For now, this design" → may evolve with use

### User Feedback
- "For now means temporary, not permanent"
- Don't treat as final decision
- Open to revisiting later

### Implications for AI Behavior

**When User Says "For Now":**
- Document current state clearly
- Mark as "temporary" or "current approach"
- Don't treat as permanent decision
- Keep the option to revisit
- Note the reasoning behind current choice

**When Should We Revisit "For Now" Decisions?**
- When new information emerges
- When context changes
- When user asks about it
- When a better approach is discovered
- When scheduled review time arrives

---

## Decision Workflow Summary

### Key Insights
1. **Testing Phase:** Exploration and discovery
2. **Learning Phase:** Understanding capabilities
3. **Evaluation Phase:** Assessing usefulness
4. **Decision Phase:** Choose temporary or permanent action
5. **Implementation Phase:** Execute decision (if permanent)
6. **Review Phase:** Revisit "for now" decisions as needed

### When to Push for Decisions
- **Don't push** during testing or learning phases
- **Wait for user's evaluation** before suggesting next steps
- **Respect "for now"** decisions - don't push for permanent commitment
- **Offer to help** but don't make decisions for user

### When to Provide Guidance
- When user is clearly in decision phase
- When user asks "What do you think?"
- When user seems stuck or unsure
- When you see a better approach that matches user's goals

---

**Last Updated:** February 19, 2026
**Workflow Tracking Status:** Active
**Verified Patterns:** 4
**Emerging Patterns:** Monitoring ongoing conversations
