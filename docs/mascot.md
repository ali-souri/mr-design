# MResalat mascot

The canonical MResalat assistant is a procedural React Three Fiber character. It intentionally uses nested `THREE.Group` pivots rather than a skinned mesh or GLTF so every pose remains inspectable, lightweight, and editable in TypeScript.

## Public component

```tsx
<SmartAssistant3D
  mode="complete"
  emotion="greeting"
  motionIntensity="normal"
  gaze="page"
  transparent
/>
```

`mode` supports `complete` and `portrait`. `motionIntensity` supports `restrained`, `normal`, and `expressive`; this is one animation system with amplitude scaling rather than segment-specific animation implementations. `gaze` supports `none`, `local`, and `page`. Showcase-only inspection also uses `view`, `debugView`, `handPose`, and `animationKey`.

The supported emotion states are `greeting`, `idle`, `calm`, `listening`, `thinking`, `explaining`, `happy`, `warning`, `uncertain`, and `handoff`. Existing product state mapping remains unchanged: focus maps to listening, submit to thinking, answer to explaining, success to happy, unknown to uncertain, security to warning, and support to handoff.

## Rig hierarchy

```text
Root
├── HeadPivot
│   ├── rounded outer shell
│   ├── inset face screen
│   ├── FaceRig (eyes, brows, mouth variants)
│   ├── left/right sensor modules
│   └── antenna
├── BodyRoot
│   ├── chest shell and vest overlays
│   ├── collar, patterned center strip, belt and emblem
│   └── hip shell
├── LeftArm / RightArm
│   ├── fixed shoulder shell
│   └── ShoulderPivot
│       └── upper arm
│           └── ElbowPivot
│               └── forearm
│                   └── WristPivot
│                       └── HandRoot
│                           ├── palm and thumb
│                           └── four three-segment fingers
└── LeftLeg / RightLeg
    └── hip, thigh, knee, shin, ankle and foot groups
```

## Geometry and visual system

The head is a 1.88 × 1.42 × 1.08 rounded-cube volume with a 0.46 corner radius, so the silhouette reads as an inflated toy-like squircle instead of a monitor. Nested superellipse panels form a thin bezel and recessed low-glare screen. The shallow teal forehead crown follows the front silhouette and carries one restrained gold motif and a short antenna. Cyan eyes, brows, and mouth marks use unlit geometry with a very faint duplicate halo rather than bloom or post-processing.

The compact 1.12-wide torso is narrower than the dominant head and uses a lathed, softly tapered off-white shell with separate curved navy vest panels. Layered white/teal V-collar strokes, a turquoise center strip with alternating white/gold diamonds, a thin wrapping gold belt, and a white/teal/gold geometric medallion provide the Iranian identity through the outfit rather than scattered decoration. A short dark neck joint and teal collar ring remain readable between the head and chest. Rounded shoulder armor overlaps the mechanical joint; short navy upper arms lead into larger white gauntlets, visible dark wrists, and articulated hands. Sensor modules use compact solid navy housings with concentric teal, white, dark, and gold layers. Feet use a broader white rounded boot shell, navy toe, teal outsole, circular ankle module, and one small gold mark.

Eleven shared materials cover the shell, shaded shell, navy panel, dark joints, teal accents, gold accents, face screen, solid cyan face marks, two low-opacity eye halo layers, and a weaker mouth halo. Materials are created once per mascot instance and disposed on unmount. There are no image textures, environment maps, post-processing passes, loaders, physics, or new runtime dependencies.

## Face and emotion system

All face variants are prebuilt in the face rig. Emotion profiles change visibility and transforms to select open, soft, crescent, narrow, or asymmetric eyes; smile, soft smile, open smile, neutral, or worried mouths; and hidden, raised, thinking, warning, or worried brows. State changes also affect head pitch/tilt, eye brightness, torso energy, complete arm targets, and hand presets without mounting new expression geometry.

Blink and gaze modify transform values only. No face geometry is generated per animation frame. Page gaze uses one pointer listener while the character is mounted and visible; `local` attaches the listener to the component frame. Both listeners and the intersection observer are removed on unmount.

## Hands, pose controller, and motion

Each hand contains a broad, flattened mechanical palm, white wrist cuff, teal joint ring, an opposed three-pivot thumb, and four independently spaced three-segment fingers. Its canonical local basis is `+X` across the palm, `+Y` from wrist to fingertips, and `+Z` along the palm/front normal. The complete anatomical right hand is authored once; the left hand mirrors that whole anatomy across local X, so thumb side and index-to-pinky ordering cannot drift apart. Explicit right/left attachment bases are applied before every pose: at zero wrist rotation the fingers point down, palms face inward toward the thighs, and thumbs point forward. Gesture wrist rotations therefore operate on a valid anatomical hand instead of compensating for a shared 180-degree root roll. Flexion, spread, and opposition retain the same anatomical meaning on both sides. A teal/navy palm insert, white finger pads, and a separate pale back plate make palm-versus-back direction visually testable. Every preset defines MCP/PIP/DIP flexion plus spread for each finger and base/MCP/IP flexion plus opposition for the thumb. Reusable presets are `relaxed`, `open`, `wave`, `point`, `explain`, `caution`, `thinking`, `support`, and `fist`. Product pages select presets and never set individual phalanx angles.

`resolveMascotPose` is the central deterministic pose controller. Its precedence is debug-hand override, transient greeting, emotion target, neutral target, then additive gaze/head offsets. Major shoulder, elbow, wrist, and head rotations converge toward absolute quaternion targets, so returning to idle cannot accumulate transform drift. An emotion change resets its own transition clock; `animationKey` exists only to replay the greeting while it is already selected.

The one-shot greeting follows five phases over 2.7 seconds: prepare, raise/open, wave peak, wave down, and return. It combines shoulder elevation, elbow flexion, a camera-facing palm, wrist oscillation, finger curl/reopen, head tilt, and a small body bounce. Explaining uses one dominant upward/outward palm and a smaller support gesture; listening brings a relaxed hand beside the ear while only the inner sensor motif pulses by three percent; thinking tucks the elbow and folds the palm inward toward the chin; happy raises both forearms; warning presents one forward caution palm; uncertain uses unequal supporting palms; and handoff presents one palm toward the adjacent interface.

## Portrait, fallback, and accessibility

Portrait, face debug, hand debug, and front/three-quarter/left-side/right-side/back inspection all change the camera or rig of the same mounted scene. Avatar sizes from 32–96px use the optimized CSS fallback, including the 96px Showcase sample, so the readability strip never allocates another renderer. The fallback mirrors the rounded-cube head, inset face, antenna, concentric sensors, navy/teal/gold outfit, and emotional states.

The WebGL canvas is marked hidden from assistive technology. The outer component supplies a concise image label and all critical answers, labels, controls, and state copy remain HTML. Canvas failure leaves the static fallback in place and does not block product interaction.

When `prefers-reduced-motion` is active, pointer gaze is not registered, continuous body/wave motion stops, and the canvas switches to demand rendering. The selected expression and a stable representative pose remain visible.

## WebGL context and resource policy

`detectWebGLSupport` is a browser-session singleton. The first request is cached; any temporary detection context is explicitly released through `WEBGL_lose_context`, and later mascot renders reuse the cached boolean without allocating probe contexts.

`/showcase#ai` mounts exactly one live transparent Canvas. Complete/portrait, face inspection, hand poses, emotions, turnaround views, and light/gradient/dark surfaces all manipulate that canonical scene. Inactive examples and every avatar-size sample are static DOM/CSS renderings. Normal product pages may keep their single offscreen context allocated, but their pointer and animation work stops while the mascot is outside the viewport.

The canonical renderer uses DPR 1–1.5, alpha, antialiasing, high-performance preference, and `preserveDrawingBuffer: false`. It has no shadows, bloom, post-processing, image textures, environment maps, loaders, or physics.

Rounded-box memoization depends on scalar dimensions, radius, and smoothness rather than tuple identity. Custom shape geometries are memoized and disposed by their owning component. A small per-scene material set is created once and disposed once on scene unmount; state, gaze, crop, and hand changes only alter transforms, visibility, scale, and intensity. The Canvas itself is unkeyed and remains mounted through all Showcase controls.

A quiet internal `window.__MRESALAT_MASCOT_QA__` hook exposes the live Canvas count and `renderer.info` geometry, texture, and program counts without production logging. The `/showcase#ai` reference includes emotion, hand, gaze, intensity, face, surface, and turnaround controls. Direct QA routes cover `/qa/mascot/[state]`, `/qa/mascot/portrait`, and `/qa/mascot/hand/[pose]`.
