'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import type { Group, Mesh } from 'three';
import type { AssistantCharacterMode, AssistantEmotion, AssistantGaze } from './SmartAssistant3D';

const emotionStyle: Record<AssistantEmotion, { accent: string; eye: string; tilt: number; energy: number; eyeScale: number; mouthWidth: number }> = {
  idle: { accent: '#42c7c8', eye: '#bafcff', tilt: 0, energy: .55, eyeScale: 1, mouthWidth: .15 },
  listening: { accent: '#35d6d0', eye: '#e8ffff', tilt: -.055, energy: .78, eyeScale: 1.14, mouthWidth: .12 },
  thinking: { accent: '#8f7bd1', eye: '#cfc2ff', tilt: .08, energy: .42, eyeScale: .92, mouthWidth: .11 },
  explaining: { accent: '#4fa3ea', eye: '#d8efff', tilt: -.025, energy: .82, eyeScale: 1, mouthWidth: .2 },
  happy: { accent: '#4fc49a', eye: '#effff7', tilt: 0, energy: 1.05, eyeScale: .7, mouthWidth: .25 },
  warning: { accent: '#e6b259', eye: '#ffe3a8', tilt: 0, energy: .18, eyeScale: .86, mouthWidth: .09 },
  uncertain: { accent: '#b6a4ec', eye: '#eee8ff', tilt: .13, energy: .3, eyeScale: .9, mouthWidth: .11 },
  handoff: { accent: '#69b5f2', eye: '#e3f4ff', tilt: -.065, energy: .48, eyeScale: 1, mouthWidth: .16 },
};

function Arm({ side, gestureRef }: { side: -1 | 1; gestureRef?: MutableRefObject<Group | null> }) {
  return (
    <group ref={gestureRef} position={[side * .78, .29, 0]} rotation={[0, 0, side * -.13]}>
      <mesh castShadow><sphereGeometry args={[.2, 24, 18]} /><meshStandardMaterial color="#e7f1f6" roughness={.35} metalness={.2} /></mesh>
      <mesh position={[side * .07, -.31, 0]} castShadow><cylinderGeometry args={[.13, .15, .52, 20]} /><meshStandardMaterial color="#174f74" roughness={.44} metalness={.12} /></mesh>
      <mesh position={[side * .08, -.6, .02]}><sphereGeometry args={[.145, 20, 16]} /><meshStandardMaterial color="#dcecf5" roughness={.38} metalness={.2} /></mesh>
      <mesh position={[side * .08, -.86, .04]} castShadow><cylinderGeometry args={[.1, .125, .38, 20]} /><meshStandardMaterial color="#f2f7f9" roughness={.36} metalness={.18} /></mesh>
      <mesh position={[side * .08, -1.08, .05]} scale={[.88, 1, .7]}><sphereGeometry args={[.16, 20, 16]} /><meshStandardMaterial color="#e7f1f6" roughness={.42} /></mesh>
    </group>
  );
}

function Leg({ side }: { side: -1 | 1 }) {
  return (
    <group position={[side * .29, -.71, 0]}>
      <mesh position={[0, -.3, 0]} castShadow><cylinderGeometry args={[.18, .21, .62, 24]} /><meshStandardMaterial color="#123e5d" roughness={.45} /></mesh>
      <mesh position={[0, -.65, 0]}><sphereGeometry args={[.19, 20, 16]} /><meshStandardMaterial color="#dcecf5" roughness={.38} metalness={.18} /></mesh>
      <mesh position={[0, -.96, 0]} castShadow><cylinderGeometry args={[.145, .175, .52, 22]} /><meshStandardMaterial color="#f1f6f8" roughness={.4} metalness={.15} /></mesh>
      <mesh position={[0, -1.27, .12]} scale={[1.25, .58, 1.65]} castShadow><sphereGeometry args={[.2, 22, 16]} /><meshStandardMaterial color="#123e5d" roughness={.5} /></mesh>
    </group>
  );
}

function Character({ emotion, gazeRef }: { emotion: AssistantEmotion; gazeRef: MutableRefObject<AssistantGaze> }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyeLeft = useRef<Mesh>(null);
  const eyeRight = useRef<Mesh>(null);
  const accent = useRef<Mesh>(null);
  const arm = useRef<Group>(null);
  const look = useRef({ x: 0, y: 0 });
  const style = emotionStyle[emotion];
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useFrame(({ clock }, delta) => {
    if (document.visibilityState !== 'visible') return;
    const t = clock.getElapsedTime();
    const emotionX = emotion === 'thinking' ? -.22 : emotion === 'uncertain' ? .1 : 0;
    const emotionY = emotion === 'thinking' ? .18 : emotion === 'warning' ? -.08 : 0;
    const targetX = reducedMotion ? emotionX : (gazeRef.current.active ? gazeRef.current.x * .72 : 0) + emotionX;
    const targetY = reducedMotion ? emotionY : (gazeRef.current.active ? gazeRef.current.y * .58 : 0) + emotionY;
    const damping = 1 - Math.exp(-delta * (gazeRef.current.active ? 9 : 5));
    look.current.x += (targetX - look.current.x) * damping;
    look.current.y += (targetY - look.current.y) * damping;

    if (eyeLeft.current && eyeRight.current) {
      const eyeX = look.current.x * .045;
      const eyeY = look.current.y * .035;
      eyeLeft.current.position.set(-.205 + eyeX, 1.33 + eyeY, .491);
      eyeRight.current.position.set(.205 + eyeX, 1.33 + eyeY, .491);
      const blink = reducedMotion ? 1 : 1 - Math.max(0, Math.sin(t * .82) - .985) * 55;
      eyeLeft.current.scale.y = style.eyeScale * Math.max(.12, blink);
      eyeRight.current.scale.y = style.eyeScale * Math.max(.12, blink);
    }
    if (head.current) {
      head.current.rotation.y = look.current.x * .11;
      head.current.rotation.x = -look.current.y * .075 + (emotion === 'listening' ? -.045 : 0);
      head.current.rotation.z = style.tilt + (reducedMotion ? 0 : Math.sin(t * .7) * .012);
    }
    if (group.current) {
      group.current.position.y = reducedMotion ? 0 : Math.sin(t * 1.1) * .025 * style.energy;
      group.current.rotation.y = look.current.x * .025 + (reducedMotion ? 0 : Math.sin(t * .38) * .025 * style.energy);
    }
    if (accent.current && !reducedMotion) accent.current.rotation.z = Math.sin(t * .7) * .07;
    if (arm.current) {
      const gesture = !reducedMotion && (emotion === 'explaining' || emotion === 'handoff') ? Math.sin(t * 1.35) * .11 : 0;
      arm.current.rotation.z = -.13 + gesture;
      arm.current.rotation.x = emotion === 'handoff' ? -.28 : emotion === 'explaining' ? -.14 : 0;
    }
  });

  return (
    <group ref={group}>
      <group ref={head} rotation={[0, 0, style.tilt]}>
        <mesh position={[0, 1.31, 0]} scale={[1.02, .9, .82]} castShadow><sphereGeometry args={[.56, 42, 28]} /><meshStandardMaterial color="#edf5f8" roughness={.3} metalness={.2} /></mesh>
        <mesh position={[0, 1.29, .405]} scale={[.84, .54, .21]}><sphereGeometry args={[.52, 36, 24]} /><meshStandardMaterial color="#102b44" roughness={.18} metalness={.12} /></mesh>
        <mesh ref={eyeLeft} position={[-.205, 1.33, .491]} scale={[1, style.eyeScale, .58]}><sphereGeometry args={[.066, 22, 16]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={emotion === 'happy' ? 2.4 : 1.6} /></mesh>
        <mesh ref={eyeRight} position={[.205, 1.33, .491]} scale={[1, style.eyeScale, .58]}><sphereGeometry args={[.066, 22, 16]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={emotion === 'happy' ? 2.4 : 1.6} /></mesh>
        <mesh position={[0, 1.1, .507]} scale={[style.mouthWidth, .025, .018]}><sphereGeometry args={[1, 18, 12]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={.8} /></mesh>
        <mesh ref={accent} position={[0, 1.78, -.02]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.19, .025, 10, 36]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={1.1} /></mesh>
        <mesh position={[0, 1.8, 0]}><sphereGeometry args={[.055, 16, 12]} /><meshStandardMaterial color="#d6b56f" emissive="#d6b56f" emissiveIntensity={.55} /></mesh>
      </group>

      <mesh position={[0, .8, 0]}><cylinderGeometry args={[.14, .18, .28, 24]} /><meshStandardMaterial color="#dcecf5" roughness={.35} metalness={.22} /></mesh>
      <mesh position={[0, .2, 0]} scale={[.78, .82, .48]} castShadow><sphereGeometry args={[.78, 36, 24]} /><meshStandardMaterial color="#f0f6f8" roughness={.38} metalness={.13} /></mesh>
      <mesh position={[-.265, .27, .405]} rotation={[0, .06, -.11]}><boxGeometry args={[.37, .78, .055]} /><meshStandardMaterial color="#123e5d" roughness={.48} /></mesh>
      <mesh position={[.265, .27, .405]} rotation={[0, -.06, .11]}><boxGeometry args={[.37, .78, .055]} /><meshStandardMaterial color="#123e5d" roughness={.48} /></mesh>
      <mesh position={[-.15, .62, .445]} rotation={[0, 0, -.58]}><boxGeometry args={[.32, .045, .045]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.45} /></mesh>
      <mesh position={[.15, .62, .445]} rotation={[0, 0, .58]}><boxGeometry args={[.32, .045, .045]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.45} /></mesh>
      <mesh position={[0, .2, .453]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.18, .18, .035]} /><meshStandardMaterial color="#d6b56f" roughness={.42} metalness={.18} /></mesh>
      <mesh position={[0, .2, .474]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.09, .09, .025]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.45} /></mesh>
      <mesh position={[0, -.5, 0]} scale={[.66, .3, .4]}><sphereGeometry args={[.7, 28, 18]} /><meshStandardMaterial color="#123e5d" roughness={.48} /></mesh>

      <Arm side={-1} />
      <Arm side={1} gestureRef={arm} />
      <Leg side={-1} />
      <Leg side={1} />
      <pointLight position={[0, 1.1, 2]} color={style.accent} intensity={emotion === 'warning' ? .8 : 1.35} distance={4} />
    </group>
  );
}

function CameraRig({ mode }: { mode: AssistantCharacterMode }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    if (mode === 'portrait') {
      camera.position.set(0, 1.16, 3.35);
      camera.lookAt(0, 1.16, 0);
    } else {
      camera.position.set(0, .03, 6.8);
      camera.lookAt(0, -.05, 0);
    }
    camera.updateProjectionMatrix();
  }, [camera, mode]);
  return null;
}

export default function SmartAssistantCanvas({ emotion, mode, gazeRef }: { emotion: AssistantEmotion; mode: AssistantCharacterMode; gazeRef: MutableRefObject<AssistantGaze> }) {
  const camera = mode === 'portrait' ? { position: [0, 1.18, 3.15] as [number, number, number], fov: 31 } : { position: [0, .03, 6.8] as [number, number, number], fov: 34 };
  return (
    <Canvas key={mode} camera={camera} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.55} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#dceeff" />
      <directionalLight position={[-3, 1, 2]} intensity={.72} color="#42c7c8" />
      <CameraRig mode={mode} />
      <Character emotion={emotion} gazeRef={gazeRef} />
    </Canvas>
  );
}
