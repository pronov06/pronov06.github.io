# `public/models/` — 3D character drop-in guide

This folder holds the assets for the hero 3D character. When you have an **original**
rigged model built to [`../../CHARACTER_MODEL_SPEC.md`](../../CHARACTER_MODEL_SPEC.md),
use the steps below to swap it in.

## Files

| File                  | Purpose                                                              |
|-----------------------|---------------------------------------------------------------------|
| `character.enc`       | The model the app actually loads (AES-encrypted GLB).               |
| `character.glb`       | Plain GLB source. *(In the upstream repo this is a Git LFS pointer, not the real model — the original is proprietary and not reusable.)* |
| `encrypt.cjs`         | Node script that encrypts `character.glb` → `character.enc`.        |
| `char_enviorment.hdr` | Environment/IBL lighting used by the scene + techstack canvas.      |
| `draco/` (in `public`)| Draco decoder; the loader is `GLTFLoader` + `DRACOLoader`.          |

## How the app loads the model

`src/components/Character/utils/character.ts` fetches **`/models/character.enc`**, then
decrypts it in the browser (`utils/decrypt.ts`) with AES-CBC, key = `SHA-256("Character3D#@")`,
IV = first 16 bytes of the file. So whatever you ship as `character.enc` is what renders.

## Swapping in your own model

You have two options — pick one and tell the developer which.

### Option A — keep the encrypted pipeline (no code change)
1. Put your original model here as **`character.glb`** (exact filename).
2. From this folder, run:
   ```bash
   node encrypt.cjs
   ```
   This reads `character.glb` and writes `character.enc` (AES-256-CBC, random IV,
   password `Character3D#@`).
3. Done — the app picks up the new `character.enc` on next load/build.

> To change the password, edit the string in both `encrypt.cjs` and
> `src/components/Character/utils/character.ts` (the `decryptFile(..., "Character3D#@")`
> call) so they match.

### Option B — load a plain `.glb` (skip encryption)
Simpler if you don't care about obfuscating the asset. In
`src/components/Character/utils/character.ts`, replace the `decryptFile(...)` + Blob URL
step with a direct load of `/models/character.glb`, then drop your file in as
`character.glb`. (Ask the developer to make this one-line change.)

## After swapping — what still needs checking

The model must satisfy the naming contract in
[`CHARACTER_MODEL_SPEC.md`](../../CHARACTER_MODEL_SPEC.md). If any bone/object/clip name
differs, the developer remaps the references in:
- `src/components/Character/Scene.tsx` — `spine006` (head), `screenlight`
- `src/components/utils/GsapScroll.ts` — `spine005`, `footL/footR`, `Plane004` / `Material.027`, `screenlight`
- `src/components/Character/utils/animationUtils.ts` — clip names (`introAnimation`, `Blink`, `typing`, `key1/2/5/6`, `browup`)
- `src/data/boneData.ts` — typing & eyebrow bone lists

Then verify: intro plays, blink loops, typing loops, monitor screen lights up, eyebrow
raise on face hover, and the scroll choreography (turn toward viewer, neck bend, camera
moves) all fire. Camera framing is tuned in `Scene.tsx`.

> Reminder: the upstream character/scene assets are proprietary (see the repo `LICENSE`).
> Only ship a character you own or have created originally.
