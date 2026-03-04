---
date: 2026-03-02
location: Coffee Shop
topic: ComfyUI + LTX-2 Research
---

# ☕ Coffee Shop Notes — LTX-2 + ComfyUI Research

**Date:** March 2, 2026
**Location:** Coffee shop planning session
**Purpose:** Research what community is building for LTX-2 in ComfyUI

---

## 🎨 SPATIAL UPSCALER (Game-Changer)

**What it does:**
- Works in **latent space** (before pixels are decoded)
- Adds detail intelligently based on semantic understanding
- Specifically trained for LTX-2 output
- NOT a generic upscaler

**Best Practice:**
- Generate at **480p-720p** → Upscale to 4K
- **Two 2x passes** look better than one 4x pass
- Resolution must be divisible by 32
- Frame counts: 9, 17, 25, 33, 41, 49, 57... (must be 8n + 1)

**Why it matters:**
- Face gets face-like detail
- Fabric gets fabric-like texture
- Water gets water-like ripples
- Semantic understanding = better results

---

## ⚡ RTX VIDEO UPSCALER (Fast Alternative)

**What it does:**
- Hardware-accelerated by NVIDIA
- Real-time 4K upscaling (~5 seconds for 5s video)
- Works on decoded video (post-processing)
- 30-60x faster than Spatial Upscaler

**VRAM Requirements:**
- Spatial Upscaler: 12GB minimum (16GB+ recommended)
- RTX Video: 8GB minimum
- **Your 3070 Ti (8GB) = RTX Video friendly**

**Best Use:**
- **90% of iteration work** (fast feedback)
- Batch processing
- Test renders
- Quick previews

---

## 🔄 HYBRID WORKFLOW (Best Results)

**Production Workflow:**

### Phase 1: Generation
- Generate at 480 x 864
- 33 frames (about 2 seconds at 16fps)
- Full quality settings

### Phase 2: First Upscale
- LTX Spatial Upscaler to 960 x 1728
- Check for artifacts
- Regenerate if needed

### Phase 3: Final Upscale
- RTX Video to 3840 x 2160 (4K)
- Quick pass, minimal quality loss

### Phase 4: Post-processing
- Color grading
- Audio sync
- Export

**Result:** Quality benefits of Spatial Upscaler + Speed of RTX Video

---

## 🎯 CONTROLNET + IP-ADAPTER INTEGRATION

**Tools being used:**
- **LineArt** — Edge detection
- **OpenPose** — Pose guidance
- **IP-Adapter** — Style transfer from reference images
- **FreeU** — Detail enhancement

**Why it matters:**
- Can guide LTX-2 with reference images/poses
- Character consistency across scenes
- Style matching

**For Orb Night:**
- Use Astra character reference images with IP-Adapter
- Maintain visual consistency across all scenes

---

## 🎬 KEY PROMPTING DISCOVERIES

**What works:**
- Use **cinematic language** ("dolly shot", "close-up", "slow-motion")
- Specify **camera movements** explicitly
- Use **multi-keyframe** for complex scenes
- Batch iterations at **low resolution first**

**Examples:**
- "Blue-skinned woman, stepping through portal, mystical, close-up, soft ethereal glow, cinematic"
- "Dolly shot, Blue orb floating in living room, ethereal glow, 4K"

---

## 🛠️ TECHNICAL CONSTRAINTS (Important!)

### Resolution Rules:
- Width/height divisible by 32
- Safe resolutions:
  - 480 x 864 (480p widescreen)
  - 544 x 960
  - 640 x 1152
  - 720 x 1280

### Frame Rules:
- Must be 8n + 1
- Valid counts: 9, 17, 25, 33, 41, 49, 57, 65, 73...
- Best results under 257 frames

### VRAM Requirements:
- Spatial Upscaler: 12GB minimum (16GB+ recommended)
- RTX Video: 8GB minimum
- Generation: 8GB+ (your 3070 Ti 8GB works)

---

## 📊 QUALITY VS SPEED TRADE-OFFS

### Spatial Upscaler:
- ✅ Maximum quality
- ✅ Best detail
- ✅ Semantic understanding
- ❌ Slower (2-3 min for 5s video)
- ❌ Higher VRAM (12-16GB)

### RTX Video:
- ✅ 30-60x faster
- ✅ Real-time 4K
- ✅ Lower VRAM (2-4GB)
- ❌ Slightly less quality
- ❌ No semantic understanding

**Recommendation:** Use both — Spatial for final, RTX for iteration

---

## 🎵 AUDIO SYNC NOTES

- Audio doesn't get upscaled
- Must match frame count and timing after upscaling
- 5-second videos stay 5 seconds
- Audio is processed separately

---

## 🎬 FOR ORB NIGHT PROJECT

### Workflow Strategy:

**Scene Planning (VideoBoard):**
1. Plan scene descriptions
2. Write cinematic prompts
3. Organize character references
4. Track status: Draft → Generated → Upscaled → Final

**Generation (ComfyUI):**
1. Load prompt from VideoBoard
2. Generate at 480p (33 frames = 2s at 16fps)
3. Test with RTX Video upscale (fast iteration)
4. Final render with Spatial Upscaler

**Integration Possibilities:**
- IP-Adapter with Astra character reference images
- ControlNet for pose consistency
- FreeU for detail enhancement
- Batch multiple scenes overnight

---

## 🎯 VIDEOBOARD INTEGRATION IDEAS

### Potential Features:

**1. Resolution Calculator**
- Input: Desired final resolution
- Output: Valid generation resolution + upscale path
- Auto-calculate safe values

**2. Frame Count Helper**
- Input: Desired duration
- Output: Valid frame count (9, 17, 25, 33...)
- FPS calculator

**3. Prompt Builder**
- Cinematic language templates
- Camera movement dropdown
- Style presets
- Copy formatted for ComfyUI

**4. Upscale Tracker**
- Status: Generated → Upscaled → Final
- Resolution path: 480p → 1080p → 4K
- Method: Spatial / RTX / Hybrid

**5. Workflow Templates**
- Export different strategies:
  - "Fast Iteration" (RTX only)
  - "Quality Final" (Spatial only)
  - "Production Hybrid" (both)

---

## 📚 RESOURCES FOUND

**Official Docs:**
- https://docs.ltx.video/open-source-model/integration-tools/comfy-ui
- https://github.com/Lightricks/ComfyUI-LTXVideo

**Community:**
- r/comfyui (Reddit)
- r/StableDiffusion (Reddit)
- ComfyUI.org tutorials

**Key Article:**
- "LTX-2 Upsamplers: Complete Guide to 4K Video Upscaling in ComfyUI"
- https://apatero.com/blog/ltx-2-upsamplers-complete-guide-4k-video-upscaling-2025

---

## 🚀 NEXT STEPS

1. **Install ComfyUI** on local machine
2. **Test basic LTX-2 workflow** (generate at 480p)
3. **Test upscalers** (RTX Video vs Spatial)
4. **Test IP-Adapter** with Astra reference images
5. **Then decide** what VideoBoard needs to support

---

## 💡 KEY INSIGHT

**VideoBoard = Planning Hub**
**ComfyUI = Generation Engine**

Don't try to build generation INTO VideoBoard.
Let ComfyUI do what it's best at.
VideoBoard organizes the output.

---

**So it folds, so it flows.** 🌊✨

---

*Notes from coffee shop planning session — March 2, 2026*
