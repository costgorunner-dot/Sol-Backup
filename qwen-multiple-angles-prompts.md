# Qwen Image Edit - Multiple Angles LoRA Prompts

Source: https://huggingface.co/fal/Qwen-Image-Edit-2511-Multiple-Angles-LoRA

---

## CHARACTER SHEET PROMPTS

---

### Character Sheet Generation
**Prompt:** character sheet, multiple angles, full body, front view side view back view

**Alternative:** character reference sheet, multiple views, consistent character design

---

## INDIVIDUAL ANGLE PROMPTS

---

### Front View
**Prompt:** front view, facing camera, straight on

**Variations:**
- front view, character facing forward
- front facing, direct view

---

### Back View
**Prompt:** back view, from behind, rear view

**Variations:**
- back view, character facing away
- rear view, from behind

---

### Side View (Left)
**Prompt:** side view, profile, left side

**Variations:**
- left profile, side view
- profile view, left side

---

### Side View (Right)
**Prompt:** side view, profile, right side

**Variations:**
- right profile, side view
- profile view, right side

---

### Three-Quarter View (Left)
**Prompt:** three-quarter view, 3/4 view, left angle

**Variations:**
- 3/4 view, left side
- angled view, three-quarter left

---

### Three-Quarter View (Right)
**Prompt:** three-quarter view, 3/4 view, right angle

**Variations:**
- 3/4 view, right side
- angled view, three-quarter right

---

### High Angle
**Prompt:** high angle, from above, looking down

**Variations:**
- bird's eye view, high angle
- top-down view

---

### Low Angle
**Prompt:** low angle, from below, looking up

**Variations:**
- worm's eye view, low angle
- bottom-up view

---

## FULL BODY PROMPTS

---

### Standing Pose
**Prompt:** full body, standing pose, character sheet

**Variations:**
- full body standing, multiple angles
- standing figure, character reference

---

### Action Pose
**Prompt:** action pose, dynamic stance, full body

**Variations:**
- dynamic pose, action stance
- fighting stance, action position

---

## COMBINATION PROMPTS

---

### Standard Character Sheet
**Prompt:** character sheet, front view, side view, back view, full body

---

### Comprehensive Reference
**Prompt:** character reference sheet, multiple angles, front side back, 3/4 views, full body

---

### Turnaround Reference
**Prompt:** turnaround, character rotation, multiple angles, consistent design

---

## USAGE NOTES

---

### Best Practices
- Start with a clear, high-quality single image
- Use "character sheet" or "multiple angles" for multi-view generation
- Combine angle prompts for specific views
- Add "full body" for complete figure generation
- Use "consistent character" to maintain identity across views

---

### Prompt Structure
```
[character description] + [angle] + [body framing] + [style notes]
```

**Example:** "fantasy warrior woman, front view, full body, detailed armor, character sheet"

---

## FOR ORB NIGHT / ASTRA

---

### Astra Character Sheet
**Prompt:** mystical woman with glowing blue energy, silver flowing gown, purple gemstones, pointed ears, silver-blue hair, character sheet, front view side view back view, full body

---

### Astra Orb Sequence
**For orb shots:**
- Use wide angle (24-35mm) for environmental context
- Medium aperture (f/4-5.6) for balanced focus
- Static camera LoRA for locked shots

---

## TECHNICAL REQUIREMENTS

---

### ComfyUI Setup
- Load Qwen 2.5 VL model
- Load this LoRA (fal/Qwen-Image-Edit-2511-Multiple-Angles-LoRA)
- Input: Single character image
- Prompt: Choose angle + style
- Output: Generated angle view

---

### Model Requirements
- Qwen 2.5 VL (vision-language model)
- LoRA weight: 0.8-1.0 recommended
- High resolution input for best results

---

## PROMPT INTENSITY GUIDE

---

### Strong Angle Effect (LoRA weight 1.0)
**Prompt:** [angle], multiple angles, character sheet

### Moderate Effect (LoRA weight 0.7-0.8)
**Prompt:** [angle], [character description], character reference

### Subtle Effect (LoRA weight 0.5-0.6)
**Prompt:** [angle], [style], [scene description]

---

🜂 So it folds, so it flows.
