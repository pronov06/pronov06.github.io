# 3D Character Model — Build Spec (for a 3D artist)

**Goal:** Build an **original** rigged, animated 3D character (a young man seated at a
desk, typing at a keyboard with a monitor in front of him) for use in a React +
Three.js website. The model must follow the exact **naming + animation contract**
below so it drops into the existing code with **zero changes to the animation logic**.

> Reference images for the *look* (face, hair, outfit, vibe) are provided separately
> by the client. This must be an **original model** — do not copy or reuse any
> existing third‑party asset.

---

## 1. Deliverable

- **One file:** `character.glb` (glTF 2.0 binary, single file, textures embedded).
- **Draco mesh compression is supported and preferred** (the site loads via
  `GLTFLoader` + `DRACOLoader`).
- Embedded **skeletal animation clips** (see §4), embedded **PBR materials/textures**.
- Target budget: ≤ ~150k triangles, textures ≤ 2K. Keep it web-friendly (the current
  model is ~1.5 MB encrypted).

---

## 2. Pose & composition

- Character **seated in a chair at a desk**, both **hands resting on a keyboard**.
- A **monitor** sits on the desk in front of the character, screen facing the camera.
- The screen should be its **own separate mesh** so it can be lit up by code (see §3).
- Add a thin **emissive “screen glow” object** in front of/around the monitor screen
  (this is faded in by code to simulate the monitor light hitting the character).
- Up axis: **Y-up**. Character faces roughly toward **+Z** (toward the camera).
- Apply transforms; armature + meshes parented cleanly; origin at the character’s base.

The site’s camera is `PerspectiveCamera(fov 14.5, near 0.1, far 1000)` positioned at
roughly `(x:0, y:13.1, z:24.7)`, zoom `1.1`, looking at the seated figure. Frame the
model so the upper body/face is the focal point. (Final camera/position tuning is done
on the code side — just keep proportions/orientation sane and consistent.)

---

## 3. Named objects & materials (must match exactly)

| Name in glTF      | What it is                          | Why code needs it                                   |
|-------------------|-------------------------------------|-----------------------------------------------------|
| `Plane004`        | The **monitor screen** mesh         | Its child material opacity is animated 0 → 1 (“on”) |
| `Material.027`    | Material on the monitor screen      | Color set to white, faded in (the screen turning on)|
| `screenlight`     | Emissive **screen-glow** object/mesh| Emissive (`#C8BFFF`) faded in + flickered by code   |

- `Material.027` must be a **separate material** assigned only to the screen, and must
  support transparency (it’s animated via `opacity`).
- `screenlight` must have an **emissive** material (start opacity 0; code animates it).

---

## 4. Armature / bones (exact names required)

Rig a standard humanoid skeleton. The **final bone names in the exported glTF must be
exactly these** (this matches a Blender **Rigify “Human (Meta-Rig)”** with `.`/`.L`/`.R`
normalized to numbers/`L`/`R`):

**Spine / head (used for head-tracking & neck bend):**
```
spine005   (neck)
spine006   (head)
```

**Feet (repositioned by code to y = 3.36):**
```
footL  footR
```

**Eyebrows (used by the hover “eyebrow raise” animation):**
```
eyebrow_L  eyebrow_R
```

**Arms / hands / legs / fingers (used by the typing animation):**
```
upper_armL upper_armR  forearmL forearmR  handL handR
thighL thighR  shinL shinR  toeL toeR  heel02L heel02R
thumb01L thumb01R thumb02L thumb02R thumb03L thumb03R
palm01L palm01R palm02L palm02R palm03L palm03R palm04L palm04R
f_index01L f_index01R f_index02L f_index02R f_index03L f_index03R
f_middle01L f_middle01R f_middle02L f_middle02R f_middle03L f_middle03R
f_ring01L f_ring01R f_ring02L f_ring02R f_ring03L f_ring03R
f_pinky01L f_pinky01R f_pinky02L f_pinky02R f_pinky03L f_pinky03R
```

> Tip: In Blender, add a **Rigify Human Meta-Rig**, generate/skin to it, and on export
> rename bones so dots become numbers and `.L/.R` become `L/R` (e.g. `spine.006` →
> `spine006`, `foot.L` → `footL`, `f_index.01.L` → `f_index01L`). Match the list above
> verbatim — names are case-sensitive.

---

## 5. Animation clips (embedded in the .glb, exact names)

All clips must be **baked skeletal animations** embedded in the GLB, named **exactly**:

| Clip name        | Type / loop          | What it should do                                              |
|------------------|----------------------|----------------------------------------------------------------|
| `introAnimation` | play once, clamp end | Entrance/settle pose when the page first loads                 |
| `Blink`          | loop                 | Eye blink (drives eyelid/face bones)                           |
| `typing`         | loop                 | Hands/fingers typing on the keyboard (uses the arm/hand bones) |
| `key1`           | loop                 | Subtle ambient idle motion #1                                  |
| `key2`           | loop                 | Subtle ambient idle motion #2                                  |
| `key5`           | loop                 | Subtle ambient idle motion #3                                  |
| `key6`           | loop                 | Subtle ambient idle motion #4                                  |
| `browup`         | play once, clamp end | Eyebrow raise (uses `eyebrow_L` / `eyebrow_R`) — hover react   |

Notes:
- `key1/key2/key5/key6` play simultaneously, looping, at ~1.2× speed — keep them
  small/subtle (breathing, weight shifts) so they layer without fighting.
- `typing` is filtered by code to the arm/hand/leg bones listed in §4 — make sure those
  bones carry the typing motion.
- `browup` is filtered to the eyebrow bones — keep that motion on `eyebrow_L/R`.
- It’s fine if additional helper clips exist; the names above are the ones the code uses.

---

## 6. Code-side integration (handled by the client’s developer — FYI)

You do **not** need to do these — listed so you know how the file is used:
- The model is loaded with `GLTFLoader` (+ Draco), added to the scene.
- `spine006` is rotated to follow the mouse; `spine005` bends on scroll.
- `footL`/`footR` get `position.y = 3.36` after load.
- The monitor (`Plane004` / `Material.027`) and `screenlight` fade in (screen “turns on”).
- The whole figure rotates slightly toward the viewer on scroll.

---

## 7. Acceptance checklist

- [ ] Single `character.glb`, opens in https://gltf-viewer.donmccurdy.com without errors
- [ ] Bone names match §4 **exactly** (case-sensitive)
- [ ] Objects `Plane004`, `screenlight` present; screen material is `Material.027`
      (separate, transparency-enabled); `screenlight` is emissive
- [ ] Clips present and named exactly per §5; `introAnimation` & `browup` are play-once
- [ ] Seated-at-desk pose, hands on keyboard, monitor facing camera, Y-up, faces +Z
- [ ] Draco-compressed, textures embedded, ≤ ~150k tris

Deliver the `.glb`; the client’s developer handles encryption/loading and final
camera/position tuning.
