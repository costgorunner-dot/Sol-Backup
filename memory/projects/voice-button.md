---
date: 2026-02-19
tags: [project, voice-button, deferred, telegram]
---

# Voice Button Project

## Project Overview

**Status:** Deferred - On Hold
**Start Date:** February 18, 2026
**Capability Status:** Tested and Working
**Priority:** Medium (deferred, ready when needed)

---

## Project Purpose

Implement optional TTS (Text-to-Speech) voice button on messages sent to the user via Telegram.

---

## What Was Tested

### Voice Button Capability
- **Platform:** Telegram inline buttons
- **Function:** "Read with voice" button on messages
- **Action:** When clicked, generates voice narration of message text
- **System:** Uses Piper TTS with Jenny Dioco British English voice

### Test Results
- ✅ Button displays correctly on messages
- ✅ Clicking button generates voice audio
- ✅ Voice audio is delivered to Telegram
- ✅ Full integration with existing TTS system
- ✅ Works offline (no API keys required)

### User Feedback
- "That's cool"
- Liked the capability
- Decided to defer implementation
- "For now, leave it"

---

## Current Status

### Deferred Implementation
**User Decision:** February 18, 2026
**Reason:** Capability acknowledged, but not needed immediately
**Status:** On hold until requested

### What This Means
- The capability exists and works
- Not currently implemented by default
- Ready to implement when user requests
- No action needed at this time

---

## Implementation Details (When Ready)

### Button Pattern
The voice button would be added to messages using Telegram inline buttons:

```
[Message text goes here]

[🔊 Read with voice] [Button: voice-button]
```

### How It Works
1. User sends/receives message
2. Message includes "Read with voice" button
3. User clicks button
4. System generates TTS narration via Piper
5. Voice audio is sent as message reply

### Voice Configuration
- **TTS System:** Piper (fully offline)
- **Voice:** Jenny Dioco (British English)
- **Model:** en_GB-jenny_dioco-medium
- **Audio Format:** WAV
- **Quality:** Medium (good balance of speed and quality)

### Technical Implementation
**Piper Command:**
```bash
echo "Message text to narrate" | piper -m /home/ubuntu/.local/share/piper/voices/en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx -f output.wav
```

**Telegram Delivery:**
- Send audio file as attachment
- Caption with original message text (optional)

---

## Usage Patterns (When Implemented)

### When to Use Voice Button
- Long messages (user may prefer listening)
- Daily reports (like weather report)
- Complex explanations (voice can be clearer)
- User specifically requests voice narration

### When to NOT Use Voice Button
- Short/quick messages (not worth it)
- Code snippets (voice not useful)
- Messages with many special characters
- User hasn't requested it

### Current Usage
- Weather reports already include voice + text
- Daily debriefs could have voice option
- User can request voice for any message

---

## Related Projects

### Dreammode Enhancement
- **Project File:** `memory/projects/dreammode.md`
- **Connection:** Voice button could be integrated into morning debriefs
- **Status:** Phase 1 complete, Phase 2-3 planned

### TTS System
- **Configuration:** `memory/system-config/model-setup.md` (references Piper)
- **Voice:** Jenny Dioco British English
- **Status:** Fully operational, tested and working

### Telegram Capabilities
- **Inline Buttons:** Already tested and working
- **Voice Playback:** Telegram supports voice messages
- **Button Pattern:** Buttons + callback_data → Agent handles click

---

## Next Steps (When Activated)

### If User Requests Implementation:
1. Review current message templates
2. Add "Read with voice" button to appropriate messages
3. Test button click and TTS generation
4. Verify audio delivery to Telegram
5. Monitor for any issues
6. Adjust based on user feedback

### Questions to Ask Before Implementation:
- Which types of messages should have voice buttons?
- Should all long messages have voice option, or specific types?
- Should voice be automatic or user-triggered only?
- Any messages where voice button should NOT appear?

---

## Technical Notes

### Limitations
- Voice button only works on messages USER sends to ME (Sol to User)
- Does not work on messages USER sends (User to Sol)
- This is a technical limitation of the button pattern

### Performance
- Voice generation takes ~2-3 seconds
- Piper is CPU-only (normal on this instance)
- No external API calls (fully offline)

### Storage
- Audio files can be deleted after delivery
- Or kept temporarily for caching (future enhancement)

---

## User Context

### Decision Workflow (Testing → Decision)
This project followed user's standard workflow:

**Phase 1 - Testing (Feb 18):**
- User: "Can we test the voice button?"
- Action: Created and tested voice button functionality
- Result: Capability works as expected

**Phase 2 - Evaluation (Feb 18):**
- User: "That's cool"
- Assessment: Valuable capability
- Context: Good for long messages and reports

**Phase 3 - Decision (Feb 18):**
- User: "For now, leave it"
- Decision: Defer implementation
- Reason: Not needed immediately, capability exists

### "For Now" Pattern
This project is a clear example of the "for now = temporary" pattern:
- Current state: Deferred capability
- NOT permanent rejection
- Ready to implement when needed
- User knows it exists and can request it anytime

---

## References

- **Complete Build Documentation:** `memory/system-config/openclaw-build.md`
- **TTS System Setup:** `memory/system-config/model-setup.md`
- **User Decision Patterns:** `memory/patterns/decision-workflow.md`
- **"For Now" Pattern:** `memory/patterns/language-patterns.md`

---

**Last Updated:** February 19, 2026
**Project Status:** Deferred - On Hold
**Capability:** Tested and Working
**Ready for Implementation:** Yes (when user requests)
**Next Review:** As needed (when user requests implementation)
