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

The head is a 1.72 × 1.24 rounded rectangular volume and occupies about 38% of the standing silhouette. A separate dark, high-roughness rounded box forms the low-glare face screen. Cyan eyes, brows, and mouth marks use simple unlit geometry with restrained duplicate halo geometry instead of post-processing bloom.

The torso combines an off-white rounded shell with a navy vest panel. White and teal collar strokes, a repeated diamond center strip, a muted gold belt, a layered hexagonal/star emblem, and small gold diamond marks provide the Iranian-inspired identity without textures. Sensor modules use concentric navy, teal, and white rings. Feet use a white rounded shell, navy toe, teal outsole, and small gold mark.

Seven shared materials cover the shell, shaded shell, navy panel, dark joints, teal accents, gold accents, face screen, and cyan face marks. Materials are created once per mascot instance and disposed on unmount. There are no image textures, environment maps, post-processing passes, loaders, physics, or new runtime dependencies.

## Face and emotion system

All face variants are prebuilt in the face rig. Emotion profiles select open, soft, crescent, narrow, or asymmetric eyes; smile, soft smile, open smile, neutral, or worried mouths; and hidden, raised, thinking, warning, or worried brows. State changes also affect head pitch/tilt, eye brightness, torso energy, arm targets, and hand presets.

Blink and gaze modify transform values only. No face geometry is generated per animation frame. Page gaze uses one pointer listener while the character is mounted and visible; `local` attaches the listener to the component frame. Both listeners and the intersection observer are removed on unmount.

## Hands and motion

Each hand contains a dark mechanical palm, white wrist cuff, teal joint ring, one two-visible-segment thumb, and four three-segment fingers. Reusable presets are `relaxed`, `open`, `wave`, `point`, `explain`, `caution`, `thinking`, `support`, and `fist`. Presets are interpolated in the render loop; product pages never set individual phalanx angles.

The greeting is a looping five-part sequence: prepare, raise/open, wave peak, wave down, and return. It combines shoulder elevation, elbow flexion, wrist oscillation, finger curl/spread, head nod, and a small body bounce. Explaining uses restrained open-palm cycles; listening and thinking bring a hand toward the sensor/chin; warning presents a steady open palm; uncertain uses two supportive palms; handoff presents one open hand toward the adjacent interface.

## Portrait, fallback, and accessibility

Portrait mode changes the camera crop while using the same geometry and emotional rig. Avatar sizes from 32–64px use the CSS fallback; 96px uses the canonical head/upper-body WebGL crop. The fallback mirrors the rounded-cube head, inset face, antenna, concentric sensors, navy/teal/gold outfit, and emotional states.

The WebGL canvas is marked hidden from assistive technology. The outer component supplies a concise image label and all critical answers, labels, controls, and state copy remain HTML. Canvas failure leaves the static fallback in place and does not block product interaction.

When `prefers-reduced-motion` is active, pointer gaze is not registered, continuous body/wave motion stops, and the canvas switches to demand rendering. The selected expression and a stable representative pose remain visible.

## Performance and QA

The implementation adds no dependencies and uses moderate sphere/capsule/rounded-box segments. It avoids shadows, bloom, complex PBR textures, and cinematic reflections. The `/showcase#ai` reference includes emotion, hand, gaze, intensity, face, background, and turnaround controls. Direct QA routes cover `/qa/mascot/[state]`, `/qa/mascot/portrait`, and `/qa/mascot/hand/[pose]`.
