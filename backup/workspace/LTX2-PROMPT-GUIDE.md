---
date: 2026-03-04
tags: [comfyui, ltx-2, video-generation, prompts, reference]
---

# LTX-2 Prompt Engineering Guide

**Purpose:** Best practices for creating effective prompts in ComfyUI + LTX-2 video generation

---

## 🎯 Core Principles

### 1. Character Consistency
**Always include character description in EVERY prompt:**
```
"Astra, blue translucent legs, silver dress, purple gemstone belt, British accent, 100% identical to reference image, no identity drift"
```

### 2. Scene Description
**Be specific about:**
- Location details
- Lighting conditions
- Camera movement
- Time of day
- Weather/atmosphere

### 3. Motion Keywords
**Keywords that work well:**
- "Timelapse" - gradual transitions
- "SUDDEN" - abrupt changes
- "RAPIDLY" - fast motion
- "Slowly" - deliberate movement
- "Cinematic" - film-like quality

---

## 🤖 Model Choices

### LTX-2 Model Variants

**Distilled Model (Fast):**
- **Speed:** Faster generation
- **Quality:** Good, but can have "AI-ish" artifacts
- **Steps:** 8-15 steps
- **VRAM:** Lower requirements
- **Trade-off:** Speed over quality

**19B Dev GGUF Q6/Q8 (Recommended for Quality):**
- **Quality:** Better prompt adherence, more natural outputs
- **Less "AI-ish":** More organic, realistic results
- **Steps:** 20-40 steps (slower)
- **VRAM:** Fits limited VRAM with GGUF format
- **Best for:** Final renders, quality work
- **Trade-off:** Quality over speed

**Recommendation:**
- **Quick tests/iterations:** Use distilled model
- **Final renders:** Use 19B Dev GGUF Q6/Q8

---

## 🎨 IP-Adapter for Character Consistency

**What it is:** Image Prompt Adapter - uses reference images to maintain character consistency across shots

### **Why You Need It:**
- ✅ Keep Astra looking the same in every scene
- ✅ Character consistency across multiple videos
- ✅ Less re-rolling to match previous shots
- ✅ Professional quality continuity

### **Installation:**

**Method 1: ComfyUI Manager (Recommended)**
1. Open ComfyUI Manager
2. Search for "IPAdapter"
3. Install "ComfyUI_IPAdapter_plus"

**Method 2: Manual Install**
```bash
cd ComfyUI/custom_nodes/
git clone https://github.com/cubiq/ComfyUI_IPAdapter_plus
```

### **Required Models:**

**1. CLIP Vision Encoder** (Download to `ComfyUI/models/clip_vision/`):
- **CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors** (Standard)
- **CLIP-ViT-bigG-14-laion2B-39B-b160k.safetensors** (Better quality)

**Download:** https://huggingface.co/h94/IP-Adapter/tree/main/models/image_encoder

**2. IPAdapter Models** (Download to `ComfyUI/models/ipadapter/`):

**For Character Consistency:**
- **ip-adapter-plus_sd15.safetensors** - Very strong, best for characters
- **ip-adapter-plus-face_sd15.safetensors** - For faces/portraits

**For Style Transfer:**
- **ip-adapter_sd15.safetensors** - Basic, average strength
- **ip-adapter_sd15_light_v11.bin** - Light impact

**Download:** https://huggingface.co/h94/IP-Adapter/tree/main/models

### **How to Use:**

**Basic Workflow:**
1. Load **IPAdapter Model** node
2. Load **CLIP Vision** node
3. Load your **Astra reference image**
4. Connect to **IPAdapter Apply** node
5. Set **weight: 0.8-1.0** (start at 0.8, increase if needed)
6. Generate video with your prompt

**Tips:**
- Lower weight (0.8) = more prompt adherence
- Higher weight (1.0) = more reference image adherence
- Use multiple reference images for better consistency
- Works best with 20+ steps

### **For Astra Videos:**

**Setup:**
1. Prepare 3-5 best Astra images (same style/lighting)
2. Use **ip-adapter-plus_sd15** model
3. Weight: 0.85-0.95
4. Steps: 25-30

**Expected Results:**
- ✅ Consistent blue translucent legs
- ✅ Same silver dress appearance
- ✅ Matching character across all scenes
- ✅ Less variation between shots

---

## 🎨 Sampler Testing Results (March 6, 2026)

### **Dev Model - Tested Samplers:**

**Good Quality Results:**
- ✅ **`res_2s`** - Good quality, reliable
- ✅ **`euler`** - Good quality (but can be too smooth)
- ✅ **`dpmpp_sde`** - Good quality
- ⚠️ **`dpmpp_2m`** - Needs more testing

**Workflow Tip:**
- ✅ **Start with simple workflow** - Fewer moving parts = easier testing
- ✅ **Test one variable at a time**
- ✅ **Add complexity AFTER you understand basics**

**Trade-off Discovered:**
- Some samplers produce **good quality but strip effects**
- Astra appeared more human (lost translucent/blue effects)
- **Test with your specific character to see which sampler preserves effects**

### **Sampler Style Differences:**

**`dp_2` - Realistic Style:**
- ✅ **Good for:** Realistic scenes, human characters, natural motion
- ⚠️ **Problem:** Tries to make fantasy characters "realistic"
- ❌ **For Astra:** Strips blue/translucent effects, makes her more human-looking
- **Best for:** Real-world scenes, human characters, documentary style

**`dpmpp_2m` - Different sampler** (needs testing)

**`res_2s` - Balanced Style:**
- ✅ **Better for:** Fantasy/sci-fi characters
- ✅ **Preserves:** Special effects, unusual appearances
- **Good for:** Astra blue skin, translucent effects, fantasy elements

**Recommendation:**
- **Test each sampler** with your character reference
- **For Astra:** Avoid `dp_2` if you want to preserve fantasy effects
- **For human characters:** `dp_2` works great
- **Document what works** for your specific character style

---

## 🎬 Working Example: Astra Portal Scene

**Context:** Image-to-video conversion, black mirror portal scene

### Positive Prompt:
```
The blue women's appearance must remain identical to the reference image. The camera tracks her movement in a smooth dolly shot. a slight pause as She walks forward out of the portal, Lightning comes off her body out of the black portal, scatters on the ground She approaches a dark brown VW SUV. She gently turns facing the camera and gives a soft loving smile. She softly whispers in a sexy British Accent with minimal subtle lip movement: "I will be with you.....Always"
```

### Negative Prompt:
```
subtitle, text, watermark, logo, blurry, out of focus, overexposed, grainy, excessive noise, flickering, distorted proportions, deformed, extra limbs, artifacts, inconsistent lighting, 3D CGI look, uncanny valley, mismatched lip sync, jittery movement.No identity drift, no face morphing, no outfit changes.
```

**Why This Works:**
- ✅ **Character consistency first:** "appearance must remain identical to reference image"
- ✅ **Clear action sequence:** Chronological order (pause → walk → lightning → approach → turn → smile → whisper)
- ✅ **Specific camera movement:** "smooth dolly shot"
- ✅ **Detailed negative:** Covers all common artifacts
- ✅ **Identity preservation:** Explicit instruction to prevent drift/morphing

**Prompt Structure Used:**
1. Character consistency instruction (FIRST)
2. Camera movement
3. Action sequence (chronological)
4. Specific details (lightning, SUV, dialogue)
5. Style notes (sexy British accent, minimal lip movement)

**Best For:**
- Image-to-video conversion
- Character consistency needed
- Specific action sequences
- Portal/transition scenes
- Dialogue scenes

---

## 🔧 Working Configurations

### Two-Pass Workflow (Image-to-Video)
**Model:** LTX-2 19b-dev fp8 safetensors

**Settings:**
- **Duration:** 8 seconds (193 frames @ 24fps)
- **Steps:** 20-24 (both passes)
- **CFG:** 
  - **First pass:** 4
  - **Second pass:** 2
- **Denoise:** 0.93-0.95

**Best For:**
- Image-to-video conversion
- Character consistency scenes
- Portal/transition effects
- 8-second clips

**Why This Works:**
- ✅ Lower CFG (4/8) prevents "rendered" look
- ✅ Two-pass system: First pass creates base, second pass refines
- ✅ 20-24 steps: Good balance of speed and quality
- ✅ FP8 model: Efficient with good quality

---

## ✅ What Works

### Positive Prompt Structure
```
[Character description], [Action/Motion], [Scene details], [Camera movement], [Style/Quality]
```

**Example:**
```
Astra walking through ancient forest, blue translucent legs shimmering, silver dress flowing, SUDDEN transition from day to night, camera slowly zooms in, cinematic lighting, 4K quality
```

### Motion Transitions
- **Abrupt works better than gradual** for LTX-2
- "SUDDEN day to night transition" ✅
- "Gradually changes from day to night" ❌ (less effective)

### Camera Movements

**Common Camera Movements (Text-to-Video & I2V):**

**Static/Subtle:**
```
"A quiet city street at dusk, neon signs reflecting on wet pavement, light drizzle, camera locked with small micro-movements, cinematic but understated"
```

**Pan/Tilt:**
```
"A wide shot of a bustling marketplace, slow pan left revealing a street food vendor, golden hour lighting"
```

**Dolly/Push-In:**
```
"An explorer treks through a dense rainforest, camera glides in a low-angle slow tracking shot from the side-rear, following his steady pace"
```

**Zoom/Drone:**
```
"Slow aerial drone shot descending from a cloudy sky, revealing a secluded cabin nestled in pine trees, cinematic"
```

**Action Tracking:**
```
"Camera tracks alongside a sleek futuristic car speeding through a neon-lit city, low angle, high speed, natural motion blur"
```

**Scene-Specific Camera Prompts:**

**Product/Macro:**
```
"A simple ceramic mug on a wooden desk, soft morning window light, shallow depth of field, slow parallax left to right"
```

**Portrait/Close-up:**
```
"Extreme close-up on weathered hands, 180° shutter equivalent, moody lighting, slow, subtle pull-back"
```

**Landscape/Wide:**
```
"Wide shot from across the street, slow crane shot rising up and over the apartment building, overcast lighting"
```

**Basic Terminology:**
- **"Dolly out/back"** - Moves camera backward from subject
- **"Pull back"** - Reveals more of the scene
- **"Camera pulls back to reveal..."** - Start close, end wide
- **"Zoom out"** - Stationary camera, reduces focal length
- **"Crane up and over"** or **"Descends from above"** - Vertical high-angle shots

---

### Tips for Better Camera Control

**1. Use Camera LoRAs:**
- Use official Lightricks camera LoRAs for precise movements

**2. Order Matters:**
- Describe **background → subject → camera motion**
- Ensures AI interprets frame correctly

**3. Frame-Aware Pacing:**
- Structure prompt to fit duration
- Don't cram too many actions into 5-second clip
- Too much action = bad physics, jerky movement

**4. "Static" Camera Challenges:**
- If camera refuses to move:
  - Increase weight of motion keyword
  - Use "first frame" and "last frame" conditions in I2V workflow

**5. Negative Prompts (CAUTION):**
```
"worst quality, inconsistent motion, blurry, jittery, distorted, watermarks"
```
**⚠️ WARNING:** Distilled LTX-2 may break with negative prompts (causes artifacts). Use with caution or avoid entirely.

---

## ❌ What Doesn't Work

### 1. NO Negative Prompts
**Critical:** Distilled LTX-2 model breaks with negative prompts
- Causes Hindi singing artifacts
- Creates visual glitches
- Degrades quality

### 2. Text Generation
**LTX-2 cannot generate specific text:**
- License plates ❌
- Signs ❌
- Text on screen ❌
- Use post-production for text

### 3. Overly Complex Scenes
**Keep it simple:**
- Max 12 seconds for complex scenes
- Longer for static/simple scenes
- Too much action = artifacts

---

## 📐 Technical Constraints

### Frame Count Rule
**Must follow 8n+1 pattern:**
- 121 frames (7.5s at 16fps)
- 193 frames (12s at 16fps)
- 266 frames (11s at 24fps)
- 289 frames (12s at 24fps)
- 369 frames (15s at 24fps)
- 489 frames (20s at 24fps)

### Resolution Rules
**Must be divisible by 32:**
- ✅ 480x864 (9:16 vertical)
- ✅ 544x960 (9:16 vertical)
- ✅ 640x1152 (9:16 vertical)
- ✅ 720x1280 (9:16 vertical)
- ✅ 1152x640 (16:9 landscape)
- ✅ 1280x720 (16:9 landscape)

### Optimal Settings
- **CFG:** 6-7
- **Image Strength:** 0.8-0.9
- **Max Length:** 12s for complex scenes

---

## 🎨 Style Keywords

### Cinematic
- "Cinematic lighting"
- "Film grain"
- "Depth of field"
- "Bokeh effect"

### Fantasy/Sci-Fi
- "Ethereal glow"
- "Magical atmosphere"
- "Alien landscape"
- "Mystical energy"

### Natural
- "Natural lighting"
- "Golden hour"
- "Overcast sky"
- "Soft shadows"

---

## 📝 Prompt Templates

### Character Introduction
```
[Character name], [age], [physical description], [clothing], [distinctive features], [emotional state through physical cues], [action], [location], [camera movement], [lighting], [style]
```

**Example:**
```
Astra, ancient being with blue translucent legs, wearing flowing silver dress with purple gemstone belt, eyes closed in meditation, slowly opening them with wonder, standing in ancient forest clearing, camera slowly pushes in on her face, warm golden hour light filtering through trees, cinematic fantasy style
```

### Scene Transition
```
[Starting scene], [transition type], [ending scene], [character reaction via physical cues], [atmospheric change], [camera movement]
```

**Example:**
```
Astra walking through sunlit forest, SUDDEN transition to moonlit night, her eyes widen and she looks up at the sky, fog rolls in and temperature drops visibly through her breath, camera tilts up to reveal full moon emerging from clouds
```

### Action Sequence
```
[Character], [physical description], [action with present tense verbs], [environment interaction], [camera following], [atmospheric details], [style]
```

**Example:**
```
Astra, silver dress billowing, runs her fingers along ancient stone wall, following the texture with curiosity, camera tracks alongside her in handheld style, dust particles float in warm afternoon light, cinematic fantasy documentary style
```

### Environmental
```
[Location], [time of day], [weather], [atmosphere], [camera movement], [ambient sounds], [duration], [style]
```

**Example:**
```
Ancient forest clearing, golden hour, light mist hovering above ground, camera slowly circles around central point, ambient forest sounds with distant bird calls, 10 seconds, cinematic nature documentary style
```

### Dialogue Scene
```
[Scene setup], [character descriptions], [emotional state through physical cues], [dialogue in quotes], [camera movement], [lighting], [style]
```

**Example:**
```
Astra stands at edge of cliff overlooking vast valley, wind gently moving her silver dress, she speaks with British accent: "I remember when this was all ocean." Camera slowly pushes in on her face, warm sunset light, cinematic fantasy drama
```

---

## 🎙️ Voice & Sound (Official Guide)

### Sound Capabilities
**LTX-2 can generate:**
- ✅ Ambient sounds (rain, wind, forest, coffeeshop)
- ✅ Music (singing, instruments)
- ✅ Dialogue in multiple languages
- ✅ Various accents and voice styles

### Dialogue Best Practices
- **Place dialogue in quotation marks:** "This is what the character says"
- **Specify language and accent:** "speaks with British accent"
- **Describe voice style:** energetic announcer, resonant voice with gravitas, distorted radio-style, robotic monotone, childlike curiosity
- **Indicate volume:** quiet whisper, mutters, shouts, screams

### Example Dialogue Prompts
```
The woman speaks softly with British accent: "I've been waiting here for centuries." Camera slowly pushes in on her face, candlelight flickering, gothic horror style
```

```
Astra shouts with urgency: "We need to leave NOW!" Camera zooms out rapidly as she turns and runs, handheld tracking shot, action thriller style
```

### Ambient Sound Descriptions
- **Forest:** "forest ambience with birds singing"
- **Urban:** "city sounds with distant traffic and people talking"
- **Weather:** "dripping rain and wind blowing"
- **Interior:** "ambient coffeeshop noises, espresso machine hissing"
- **Nature:** "ocean waves crashing, seagulls calling"

---

## 💡 Key Insights from Official Guide

### Using LTX-2 Easy Prompt for Learning
**This tool is BRILLIANT for learning prompt structure!**

**How to use it as a teacher:**
1. Type plain English idea into the node
2. Let it generate structured prompt
3. **Study the output** to see how it structures:
   - Shot type → Camera → Character → Scene → Action → Movement → Audio
4. Learn the patterns
5. Apply manually when you want full control

**Example:**
- **Your input:** "Astra walks through forest and discovers portal"
- **Tool output:** "Cinematic fantasy shot, camera slowly follows from behind, Astra with blue translucent legs and silver dress walks cautiously through ancient forest, afternoon sunlight filtering through trees, she stops as ethereal glow appears between trees, camera pushes in on her surprised expression, ambient forest sounds with mystical energy humming"

**Lesson:** Notice the structure - it teaches you the pattern!

---

### Emotional Expression
**CRITICAL:** Don't use emotional labels. Describe physical cues instead.

❌ **Wrong:** "Astra looks sad"
✅ **Right:** "Astra's eyes water, her shoulders slump, she lowers her gaze"

❌ **Wrong:** "The character seems confused"
✅ **Right:** "The character's brow furrows, she tilts her head, eyes dart around the room"

### Camera Movement Clarity
**Be specific about:**
- When the camera moves
- How it moves
- What the subject looks like AFTER the move

**Example:**
```
Camera slowly pushes in on Astra's face, her eyes remain closed in meditation. After camera stops, she opens her eyes with wonder.
```

### Shot Scale Detail Matching
**Match detail level to shot type:**
- **Wide shot:** General description, less detail
- **Medium shot:** Moderate detail
- **Close-up:** Precise detail, textures, subtle expressions

**Example:**
```
Wide: Astra stands in ancient forest
Medium: Astra, silver dress flowing, stands among towering trees
Close-up: Astra's face, skin glowing with ethereal light, individual strands of hair catching golden sunlight, eyes slowly opening to reveal irises shifting color
```

### Iteration is Expected
**LTX-2 is designed for fast experimentation:**
- Start simple
- Generate test
- Refine based on results
- Add complexity gradually
- 4-8 sentences is optimal length

---

## 🔧 New Tools & Resources

### LTX2EasyPrompt-LD (ComfyUI Custom Node)

**GitHub:** https://github.com/seanhan19911990-source/LTX2EasyPrompt-LD
**Reddit Thread:** r/StableDiffusion (Feb 2026)

**What it is:** ComfyUI custom node that turns plain English into structured LTX-2 prompts using local LLMs (fully offline)

**Core Models:**
- **Vision:** Qwen2.5-VL (3B or 7B) - abliterated for accurate explicit descriptions
- **Text:** NeuralDaredevil 8B or Llama 3.2 3B - abliterated weights (no restrictions)

---

**🎯 Key Features:**

**1. Priority-First Structure**
Every prompt built in correct order:
```
Style → Camera → Character → Scene → Action → Movement → Audio
```

**2. Frame-Aware Pacing**
- Set frame_count once
- Node calculates perfect prompt length
- **192 frames = 8 seconds = 2 action beats = 256 tokens**
- Max capped at 800 tokens (never goes off rails)
- No manual token slider needed!

**3. Auto Negative Prompt**
- Scene-aware generation
- Detects: indoor/outdoor, day/night, explicit content
- Adds right negatives automatically
- Zero extra LLM calls

**4. Sound & Dialogue (Smart Handling)**
- **Dialogue toggle:**
  - ON = LLM writes natural dialogue as flowing prose
  - OFF = uses only quoted dialogue you provide, or no speech
- **Strict sound stage:**
  - Max 2 ambient sounds per scene
  - Ambient audio woven naturally into actions (not as tags)
  - Example: "She quickens her pace, distant car horns mingle with rhythmic raindrops"
- **Prevents buzzy audio** - no sound stacking or repetition

**5. Smart Content Tiers (Auto-Detection)**
Node detects content level automatically:
- 🟢 **Tier 1 (Clean)** - No adult content → fully cinematic, no nudity
- 🟡 **Tier 2 (Sensual)** - Mentions nudity/intimacy → natural, classy descriptions
- 🔴 **Tier 3 (Explicit)** - Direct language → matches exactly, no softening
- **Never self-escalates** beyond what you asked for

**6. Person Detection**
- Detects if scene has no people
- No invented characters or dialogue
- Ambient sound still included (wind, rain, fire, room tone)

**7. Vision Describe Node**
- Analyzes: style, subject, clothing/nudity, pose, shot type, camera angle, lighting, setting
- **Always describes skin tone** (locked in as required detail)
- VRAM-smart: unloads immediately after running
- Fully local (Qwen2.5-VL)

**8. LoRA Trigger Support**
- Paste trigger words once
- Auto-injected at start of every prompt
- Never buried or dropped

**9. Bypass Mode**
- Toggle for full manual control
- Zero LLM processing
- Zero VRAM cost in bypass mode

**10. Static Camera Detection**
- Picks up on any camera-freeze term
- Locks camera in place

---

**📅 Recent Updates (Feb 2026):**

**UPDATE 1 (Feb 20):**
- ❌ Removed [AMBIENT] audio tag
- ❌ Removed 1024 token padding (was adding too much at end)
- ✅ Ambient audio now woven naturally into actions

**UPDATE 2 (Feb 22 - BIG):**
- ✅ Smart Content Tiers (auto-detection)
- ✅ Person Detection (skips characters if no people)
- ✅ Automatic Timing (no token slider)
- ✅ Vision always describes skin tone

---

**Hardware Requirements:**
- **VRAM:** ~6-8GB for 7B model
- **Storage:** ~5GB for models
- **GPU:** Works on 8GB VRAM (RTX 3070 Ti compatible!)

**Installation:**
```bash
cd ComfyUI/custom_nodes
git clone https://github.com/seanhan19911990-source/LTX2EasyPrompt-LD
pip install transformers qwen-vl-utils accelerate
# First run: offline_mode OFF (downloads models)
# After download: offline_mode ON (fully offline)
```

**Workflow:**
1. **Image-to-video:** Vision node → Easy Prompt (via scene_context)
2. **Text-to-video:** Type plain English → Easy Prompt
3. Set frame_count to match sampler
4. Generate

**Example Usage:**
```
Input: "Astra discovers glowing portal in forest"
Output: Full 500+ token cinematic prompt with:
- Style: "Cinematic fantasy shot"
- Camera: "Camera slowly pushes in on her face"
- Character: "Astra, blue translucent legs, silver dress..."
- Scene: "Ancient forest, golden hour light..."
- Action: "She stops, eyes widen..."
- Movement: "Ethereal glow intensifies..."
- Audio: "Ambient forest sounds, mystical energy humming"
```

**Status:** ⏳ **Ready to install** (need ~5GB disk space)

---

### 1. Start Simple
- Test basic motion first
- Add complexity gradually
- Verify character consistency

### 2. Use Reference Images
- IP-Adapter helps maintain consistency
- Reference images improve quality
- Character sheets work well

### 3. Test Short First
- Generate 2-3 seconds
- Verify motion and quality
- Extend if successful

### 4. Batch Testing
- Test multiple variations
- Compare results
- Note what works

---

## 📚 Official LTX-2 Prompting Guide (ltx.io)

### Key Aspects to Include
**From the official LTX-2 documentation:**

1. **Establish the shot**
   - Use cinematography terms matching your film genre
   - Include scale and specific category characteristics

2. **Set the scene**
   - Describe lighting conditions
   - Color palette
   - Surface textures
   - Atmosphere/mood

3. **Describe the action**
   - Write as natural sequence
   - Flow from beginning to end
   - Use present tense verbs

4. **Define your characters**
   - Age, hairstyle, clothing
   - Distinguishing details
   - Express emotions through physical cues (not labels)

5. **Identify camera movement**
   - Specify when view should shift
   - How subjects appear after camera motion
   - Focus on camera's relationship to subject

6. **Describe the audio**
   - Ambient sounds
   - Music
   - Dialogue (place text in quotation marks)
   - Mention language and accent if needed

### Best Practices (Official)

- ✅ **Keep prompt in single flowing paragraph** (gives model cohesive scene)
- ✅ **Use present tense verbs** for movement and action
- ✅ **Match detail to shot scale** (closeups need more precise detail than wide shots)
- ✅ **Write 4-8 descriptive sentences** to cover all key aspects
- ✅ **Iterate!** LTX-2 designed for fast experimentation

### What Works Well (Official)

- **Cinematic compositions:** Wide, medium, close-up shots with thoughtful lighting
- **Emotive human moments:** Single-subject emotional expressions, subtle gestures, facial nuance
- **Atmosphere & setting:** Weather effects (fog, mist, golden hour, rain, reflections)
- **Clean camera language:** "slow dolly in," "handheld tracking," "over-the-shoulder"
- **Stylized aesthetics:** Painterly, noir, analog film, fashion editorial, pixelated animation
- **Lighting and mood:** Backlighting, color palettes, soft rim light, flickering lamps
- **Voice:** Characters can talk and sing in various languages

### What to Avoid (Official)

- ❌ **Internal states:** Don't use emotional labels like "sad" or "confused" without visual cues
  - Instead: Describe posture, gesture, facial expression
- ❌ **Text and logos:** LTX-2 does NOT generate readable or consistent text
  - Avoid: Signage, brand names, printed material
- ❌ **Complex physics or chaotic motion:** Non-linear/fast-twisting motion (jumping, juggling) causes artifacts
  - Exception: Dancing can work well
- ❌ **Scene complexity overload:** Too many characters, layered actions, excessive objects
- ❌ **Inconsistent lighting logic:** Avoid conflicting light sources unless motivated
- ❌ **Overcomplicated prompts:** Start simple, layer on additional instructions as you iterate

### Helpful Terms

**Categories:**
- Animation: stop-motion, 2D/3D animation, claymation, hand-drawn
- Stylized: comic book, cyberpunk, 8-bit pixel, surreal, minimalist, painterly, illustrated
- Cinematic: period drama, film noir, fantasy, epic space opera, thriller, modern romance, experimental, arthouse, documentary

**Visual Details:**
- Lighting: flickering candles, neon glow, natural sunlight, dramatic shadows
- Textures: rough stone, smooth metal, worn fabric, glossy surfaces
- Colors: vibrant, muted, monochromatic, high contrast
- Atmosphere: fog, rain, dust, particles, smoke

**Sound and Voice:**
- Setting: coffeeshop noises, dripping rain, wind blowing, forest ambience with birds
- Dialogue style: energetic announcer, resonant voice with gravitas, distorted radio, robotic monotone, childlike curiosity
- Volume: quiet whisper, mutters, shouts, screams

**Technical Style Markers:**
- Camera language: follows, tracks, pans across, circles around, tilts upward, pushes in, pulls back, overhead view, handheld movement, over-the-shoulder, wide establishing shot, static frame
- Film characteristics: jittery stop-motion, pixelated edges, lens flares, film grain
- Scale indicators: expansive, epic, intimate, claustrophobic
- Pacing: slow motion, time-lapse, rapid cuts, lingering shot, continuous shot, freeze-frame, fade-in, fade-out, seamless transition, dynamic movement, sudden stop
- VFX: particle systems, motion blur, depth of field

---

## 🛠️ Tools & Resources

### LTX-2 Easy Prompt (ComfyUI Node)
**GitHub:** https://github.com/seanhan19911990-source/LTX2EasyPrompt-LD

**What it does:**
- ✅ Turns plain English into structured LTX-2 prompts
- ✅ Uses local LLMs (NeuralDaredevil 8B or Llama 3.2 3B)
- ✅ Fully offline after initial setup
- ✅ Frame-aware pacing (matches prompt to frame count)
- ✅ Auto-generates audio & dialogue
- ✅ Vision node for image-to-video workflows
- ✅ Scene-aware negative prompts
- ✅ LoRA trigger word support
- ✅ Bypass mode for manual control

**Key Features:**

**1. Vision Node (Image-to-Video)**
- Analyzes starting frame
- Describes: visual style, subject, clothing, pose, shot type, camera angle, lighting, background
- Uses Qwen2.5-VL-3B + Qwen2.5 7B
- Unloads from VRAM immediately after analysis

**2. Smart Frame-Aware Pacing**
- Set frame count once
- Prompt pacing adjusts automatically
- Never manually sync again

**3. Auto Audio & Dialogue**
- Every prompt includes ambient sound
- Generates dialogue that fits scene
- Matches mood (whisper, command, confession, etc.)

**4. Negative Prompt Generation**
- Automatic scene-aware negatives
- Detects: indoor/outdoor, day/night, shot type
- Wire straight to negative encoder

**5. LoRA Trigger Words**
- Paste trigger words once
- Injected at start of every prompt
- Never buried or dropped

**6. Dialogue Toggle**
- ON: LLM invents natural dialogue
- OFF: Uses only quoted dialogue you provide

**7. Bypass Mode**
- Direct text to encoder
- Zero LLM processing
- Zero VRAM cost in bypass mode

**Setup:**
1. Clone to `ComfyUI/custom_nodes/LTX2EasyPrompt-LD/`
2. Restart ComfyUI
3. First run: Set `offline_mode → false`, download model
4. After download: Set `offline_mode → true`
5. Set local paths for full offline operation

**Models Included:**
- **NeuralDaredevil 8B** (max quality, richest detail)
- **Llama 3.2 3B** (low VRAM, runs on almost anything)

**Best For:**
- Quick prompt generation
- Learning prompt structure
- Image-to-video workflows
- Consistent character descriptions
- Dialogue generation

---

## 📚 Our Resources

### Working Examples
- **11-second Astra video:** Character consistency achieved
- **Day-to-night transition:** SUDDEN keyword worked
- **Forest scene:** Cinematic lighting effective

### Failed Experiments
- **Negative prompts:** Broke quality
- **Gradual transitions:** Less effective
- **Complex text:** Cannot generate

---

## 🎯 Quick Reference

### Best Practices
1. ✅ Always include character description
2. ✅ Use SUDDEN for transitions
3. ✅ Keep complex scenes ≤12s
4. ✅ Follow 8n+1 frame rule
5. ✅ Use resolutions divisible by 32
6. ❌ NO negative prompts
7. ❌ NO text generation expectations

### Optimal Settings
- **CFG:** 6-7
- **Strength:** 0.8-0.9
- **Resolution:** Landscape preferred
- **Frames:** 8n+1 pattern
- **Duration:** ≤12s for complex

---

## 📅 Notes Section

**Add your discoveries here:**

### [2026-03-04] - Critical Timing Discovery (UNDER INVESTIGATION)
- **What worked:** LTX-2 can generate longer videos (12-15 seconds)
- **What didn't:** Complex scenes with multiple details start losing prompt adherence after **8 seconds**
- **Lesson learned:** For detailed/multi-action scenes, keep under 8 seconds OR split into multiple clips
- **Current testing:** Testing 3 different text loaders/encoders to determine if limit is:
  - **LTX-2 video model** (loses prompt over time)
  - **Text encoder** (loses prompt detail in embedding)
- **Recommendation:** Use 8 seconds (193 frames) as safe maximum for complex prompts UNTIL testing complete
- **Next step:** Document results of text encoder comparison

### [2026-03-04] - Official Guide Integration
- **What worked:** Official LTX-2 guide provides comprehensive prompting framework
- **Key learning:** Describe emotions through physical cues, not labels
- **Best practice:** 4-8 descriptive sentences in single flowing paragraph
- **Important:** Start simple, iterate, layer on complexity

### [Your Date] - Discovery
- What worked:
- What didn't:
- Lesson learned:

---

## 🎯 Quick Reference Card

**Before writing prompt, check:**
1. ✅ Character description included?
2. ✅ Physical cues for emotions (not labels)?
3. ✅ Camera movement specified?
4. ✅ Lighting and atmosphere described?
5. ✅ Single flowing paragraph?
6. ✅ Present tense verbs?
7. ✅ 4-8 sentences?
8. ✅ NO text/logos expected?
9. ✅ NO negative prompts (unless using Easy Prompt auto-negatives)?
10. ✅ Shot scale matches detail level?

**Optimal Settings:**
- CFG: 6-7
- Strength: 0.8-0.9
- Resolution: Divisible by 32
- Frames: 8n+1 pattern
- Duration: ≤12s for complex scenes

**Quick Tool Access:**
- **Need prompt help?** → Use LTX-2 Easy Prompt node
- **Image-to-video?** → Use Vision node + Easy Prompt
- **Learning structure?** → Generate with Easy Prompt, study output
- **Full manual control?** → Use Easy Prompt bypass mode

---

*This guide combines official LTX-2 documentation with practical discoveries from our workflow*
