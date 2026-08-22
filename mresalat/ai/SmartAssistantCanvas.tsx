'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group, Mesh } from 'three';
import type { AssistantEmotion } from './SmartAssistant3D';

const emotionStyle: Record<AssistantEmotion, { accent: string; eye: string; tilt: number; energy: number }> = {
  idle: { accent: '#42c7c8', eye: '#bafcff', tilt: 0, energy: .65 },
  listening: { accent: '#35d6d0', eye: '#e8ffff', tilt: -.04, energy: .9 },
  thinking: { accent: '#8f7bd1', eye: '#cfc2ff', tilt: .08, energy: .5 },
  explaining: { accent: '#4fa3ea', eye: '#d8efff', tilt: -.03, energy: .85 },
  happy: { accent: '#4fc49a', eye: '#effff7', tilt: 0, energy: 1.15 },
  warning: { accent: '#e6b259', eye: '#ffe3a8', tilt: 0, energy: .2 },
  uncertain: { accent: '#b6a4ec', eye: '#eee8ff', tilt: .14, energy: .35 },
  handoff: { accent: '#69b5f2', eye: '#e3f4ff', tilt: -.07, energy: .55 },
};

function Character({ emotion }: { emotion: AssistantEmotion }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const accent = useRef<Mesh>(null);
  const arm = useRef<Group>(null);
  const style = emotionStyle[emotion];
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useFrame(({ clock }) => {
    if (reducedMotion || document.visibilityState !== 'visible') return;
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.15) * .045 * style.energy;
      group.current.rotation.y = Math.sin(t * .42) * .07 * style.energy;
    }
    if (head.current) {
      head.current.rotation.z = style.tilt + Math.sin(t * .7) * .018;
      head.current.rotation.x = emotion === 'listening' ? -.08 : Math.sin(t * .55) * .025;
    }
    if (accent.current) accent.current.rotation.z = t * (emotion === 'thinking' ? .8 : .18);
    if (arm.current) {
      const gesture = emotion === 'explaining' || emotion === 'handoff' ? Math.sin(t * 1.4) * .16 : 0;
      arm.current.rotation.z = -.2 + gesture;
    }
  });

  return (
    <group ref={group} position={[0, -.2, 0]}>
      <group ref={head} position={[0, .72, 0]} rotation={[0, 0, style.tilt]}>
        <mesh castShadow><capsuleGeometry args={[.48, .32, 8, 24]} /><meshStandardMaterial color="#dcecf5" roughness={.34} metalness={.28} /></mesh>
        <mesh position={[0, .03, .43]}><boxGeometry args={[.69, .24, .035]} /><meshStandardMaterial color="#102b44" roughness={.2} /></mesh>
        <mesh position={[-.2, .05, .465]}><sphereGeometry args={[.065, 20, 20]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={emotion === 'happy' ? 2.4 : 1.5} /></mesh>
        <mesh position={[.2, .05, .465]}><sphereGeometry args={[.065, 20, 20]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={emotion === 'happy' ? 2.4 : 1.5} /></mesh>
        <mesh ref={accent} position={[0, .49, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.22, .025, 10, 32]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={1.1} /></mesh>
      </group>
      <mesh position={[0, -.05, 0]} castShadow><capsuleGeometry args={[.58, .62, 8, 24]} /><meshStandardMaterial color="#0f4e78" roughness={.5} /></mesh>
      <mesh position={[0, .11, .53]}><boxGeometry args={[.72, .11, .035]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.55} /></mesh>
      <mesh position={[0, -.12, .54]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.2, .2, .025]} /><meshStandardMaterial color="#d6b56f" roughness={.55} /></mesh>
      <mesh position={[0, -.12, .57]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.1, .1, .02]} /><meshStandardMaterial color="#123e5d" /></mesh>
      <group position={[-.72, .02, 0]} rotation={[0, 0, .2]}><mesh castShadow><capsuleGeometry args={[.14, .48, 6, 16]} /><meshStandardMaterial color="#174f74" roughness={.52} /></mesh></group>
      <group ref={arm} position={[.72, .02, 0]} rotation={[0, 0, -.2]}><mesh castShadow><capsuleGeometry args={[.14, .48, 6, 16]} /><meshStandardMaterial color="#174f74" roughness={.52} /></mesh><mesh position={[.08, -.5, .02]}><sphereGeometry args={[.18, 18, 18]} /><meshStandardMaterial color="#dcecf5" roughness={.4} /></mesh></group>
      <pointLight position={[0, .6, 1.6]} color={style.accent} intensity={emotion === 'warning' ? 1.1 : 1.8} distance={4} />
    </group>
  );
}

export default function SmartAssistantCanvas({ emotion }: { emotion: AssistantEmotion }) {
  return (
    <Canvas camera={{ position: [0, .55, 4.2], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} color="#dceeff" />
      <directionalLight position={[-3, 1, 2]} intensity={.8} color="#42c7c8" />
      <Character emotion={emotion} />
    </Canvas>
  );
}
