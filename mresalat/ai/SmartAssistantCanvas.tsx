'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import type { Group, Mesh } from 'three';
import type { AssistantCharacterMode, AssistantEmotion, AssistantGaze } from './SmartAssistant3D';

type EmotionStyle = {
  accent: string;
  eye: string;
  tilt: number;
  energy: number;
  eyeScale: number;
  smileWidth: number;
  smileCurve: number;
  browTilt: number;
};

const emotionStyle: Record<AssistantEmotion, EmotionStyle> = {
  idle: { accent: '#42c7c8', eye: '#d9ffff', tilt: 0, energy: .58, eyeScale: 1, smileWidth: .92, smileCurve: .32, browTilt: .02 },
  listening: { accent: '#35d6d0', eye: '#f1ffff', tilt: -.055, energy: .82, eyeScale: 1.16, smileWidth: .86, smileCurve: .24, browTilt: -.03 },
  thinking: { accent: '#8f7bd1', eye: '#ddd4ff', tilt: .09, energy: .45, eyeScale: .94, smileWidth: .72, smileCurve: .15, browTilt: .11 },
  explaining: { accent: '#4fa3ea', eye: '#e7f5ff', tilt: -.025, energy: .88, eyeScale: 1.04, smileWidth: 1.02, smileCurve: .38, browTilt: 0 },
  happy: { accent: '#4fc49a', eye: '#f4fff9', tilt: 0, energy: 1.12, eyeScale: .72, smileWidth: 1.2, smileCurve: .66, browTilt: -.08 },
  warning: { accent: '#e6b259', eye: '#ffe8ba', tilt: 0, energy: .22, eyeScale: .82, smileWidth: .62, smileCurve: .05, browTilt: .14 },
  uncertain: { accent: '#b6a4ec', eye: '#f2eeff', tilt: .15, energy: .34, eyeScale: .9, smileWidth: .67, smileCurve: .11, browTilt: .16 },
  handoff: { accent: '#69b5f2', eye: '#edf8ff', tilt: -.065, energy: .56, eyeScale: 1.02, smileWidth: .94, smileCurve: .3, browTilt: -.015 },
};

function Eye({ side, eyeRef, style }: { side: -1 | 1; eyeRef: MutableRefObject<Group | null>; style: EmotionStyle }) {
  return (
    <group ref={eyeRef} position={[side * .235, .055, .64]}>
      <mesh scale={[1.12, 1.28, .46]}>
        <sphereGeometry args={[.088, 24, 18]} />
        <meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={1.7} roughness={.18} />
      </mesh>
      <mesh position={[0, 0, .045]} scale={[.72, .88, .42]}>
        <sphereGeometry args={[.054, 20, 14]} />
        <meshStandardMaterial color="#176c8f" emissive={style.accent} emissiveIntensity={1.25} roughness={.16} />
      </mesh>
      <mesh position={[-.013, .018, .073]} scale={[.55, .55, .28]}>
        <sphereGeometry args={[.022, 16, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function Arm({ side, armRef }: { side: -1 | 1; armRef: MutableRefObject<Group | null> }) {
  return (
    <group ref={armRef} position={[side * .61, .37, 0]} rotation={[0, 0, side * -.1]}>
      <mesh castShadow><sphereGeometry args={[.16, 24, 18]} /><meshStandardMaterial color="#e9f3f7" roughness={.34} metalness={.18} /></mesh>
      <mesh position={[side * .045, -.25, 0]} castShadow><cylinderGeometry args={[.105, .13, .38, 20]} /><meshStandardMaterial color="#17557d" roughness={.43} metalness={.12} /></mesh>
      <mesh position={[side * .055, -.46, .015]}><sphereGeometry args={[.13, 20, 16]} /><meshStandardMaterial color="#dcecf4" roughness={.37} metalness={.18} /></mesh>
      <mesh position={[side * .055, -.66, .035]} castShadow><cylinderGeometry args={[.085, .105, .3, 20]} /><meshStandardMaterial color="#f4f8fa" roughness={.34} metalness={.16} /></mesh>
      <mesh position={[side * .055, -.86, .055]} scale={[.92, 1.05, .72]}><sphereGeometry args={[.135, 20, 16]} /><meshStandardMaterial color="#e9f3f7" roughness={.4} /></mesh>
    </group>
  );
}

function Leg({ side }: { side: -1 | 1 }) {
  return (
    <group position={[side * .22, -.48, 0]}>
      <mesh position={[0, -.2, 0]} castShadow><cylinderGeometry args={[.145, .17, .42, 24]} /><meshStandardMaterial color="#123e5d" roughness={.45} /></mesh>
      <mesh position={[0, -.44, 0]}><sphereGeometry args={[.155, 20, 16]} /><meshStandardMaterial color="#dcecf5" roughness={.38} metalness={.18} /></mesh>
      <mesh position={[0, -.68, 0]} castShadow><cylinderGeometry args={[.115, .14, .38, 22]} /><meshStandardMaterial color="#f2f7f9" roughness={.4} metalness={.15} /></mesh>
      <mesh position={[0, -.92, .09]} scale={[1.16, .55, 1.5]} castShadow><sphereGeometry args={[.18, 22, 16]} /><meshStandardMaterial color="#123e5d" roughness={.5} /></mesh>
    </group>
  );
}

function Character({ emotion, gazeRef }: { emotion: AssistantEmotion; gazeRef: MutableRefObject<AssistantGaze> }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyeLeft = useRef<Group>(null);
  const eyeRight = useRef<Group>(null);
  const accent = useRef<Group>(null);
  const torso = useRef<Mesh>(null);
  const armLeft = useRef<Group>(null);
  const armRight = useRef<Group>(null);
  const look = useRef({ x: 0, y: 0 });
  const style = emotionStyle[emotion];
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useFrame(({ clock }, delta) => {
    if (document.visibilityState !== 'visible') return;
    const t = clock.getElapsedTime();
    const processingShift = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .9) * .16 : 0;
    const emotionX = emotion === 'thinking' ? -.18 + processingShift : emotion === 'uncertain' ? .1 : 0;
    const emotionY = emotion === 'thinking' ? .14 : emotion === 'warning' ? -.07 : emotion === 'listening' ? .04 : 0;
    const gazePower = gazeRef.current.active ? .58 + gazeRef.current.strength * .42 : 0;
    const targetX = reducedMotion ? emotionX : gazeRef.current.x * gazePower + emotionX;
    const targetY = reducedMotion ? emotionY : gazeRef.current.y * gazePower + emotionY;
    const damping = 1 - Math.exp(-delta * (gazeRef.current.active ? 7.5 : 4.2));
    look.current.x += (targetX - look.current.x) * damping;
    look.current.y += (targetY - look.current.y) * damping;

    const blinkWave = Math.sin(t * .78) > .985 ? Math.max(.12, 1 - (Math.sin(t * .78) - .985) * 64) : 1;
    const blink = reducedMotion ? 1 : blinkWave;
    const eyeX = look.current.x * .072;
    const eyeY = look.current.y * .052;
    if (eyeLeft.current && eyeRight.current) {
      const asymmetry = emotion === 'uncertain' ? .018 : 0;
      eyeLeft.current.position.set(-.235 + eyeX - asymmetry, .055 + eyeY + asymmetry, .64);
      eyeRight.current.position.set(.235 + eyeX + asymmetry, .055 + eyeY - asymmetry, .64);
      eyeLeft.current.scale.y = style.eyeScale * blink;
      eyeRight.current.scale.y = style.eyeScale * blink;
    }

    if (head.current) {
      const nod = !reducedMotion && (emotion === 'explaining' || emotion === 'handoff') ? Math.sin(t * 1.7) * .035 : 0;
      const thinkTilt = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .58) * .03 : 0;
      const happyWiggle = !reducedMotion && emotion === 'happy' ? Math.sin(t * 1.55) * .026 : 0;
      head.current.rotation.y = look.current.x * .18;
      head.current.rotation.x = -look.current.y * .12 + (emotion === 'listening' ? -.055 : emotion === 'warning' ? .025 : 0) + nod;
      head.current.rotation.z = style.tilt + thinkTilt + happyWiggle;
    }

    if (group.current) {
      const idleFloat = Math.sin(t * 1.05) * .035 * style.energy;
      const happyBounce = emotion === 'happy' ? Math.abs(Math.sin(t * 1.65)) * .055 : 0;
      group.current.position.y = reducedMotion ? 0 : idleFloat + happyBounce;
      group.current.rotation.x = emotion === 'listening' ? -.035 : emotion === 'warning' ? .018 : 0;
      group.current.rotation.y = look.current.x * .035 + (reducedMotion ? 0 : Math.sin(t * .35) * .018 * style.energy);
    }

    if (torso.current) {
      const breath = reducedMotion ? 0 : Math.sin(t * 1.35) * .012 * style.energy;
      torso.current.scale.set(.74 + breath, .72 + breath, .45 + breath * .5);
    }

    if (accent.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * (emotion === 'thinking' ? 2.2 : emotion === 'warning' ? 1.25 : 1.55)) * (emotion === 'thinking' ? .09 : .045);
      accent.current.scale.setScalar(pulse);
      accent.current.rotation.z = reducedMotion ? 0 : Math.sin(t * .72) * .07;
    }

    const armDamping = 1 - Math.exp(-delta * 5.5);
    const leftTarget = { x: 0, z: .1 };
    const rightTarget = { x: 0, z: -.1 };
    if (emotion === 'explaining') {
      rightTarget.x = -.42;
      rightTarget.z = -.7 + (reducedMotion ? 0 : Math.sin(t * 1.45) * .12);
    } else if (emotion === 'handoff') {
      leftTarget.x = -.48;
      leftTarget.z = .82 + (reducedMotion ? 0 : Math.sin(t * 1.15) * .08);
    } else if (emotion === 'happy') {
      leftTarget.z = .34;
      rightTarget.z = -.34;
    } else if (emotion === 'uncertain') {
      rightTarget.x = -.48;
      rightTarget.z = -.42;
    } else if (emotion === 'listening') {
      leftTarget.z = .03;
      rightTarget.z = -.03;
    } else if (emotion === 'warning') {
      leftTarget.z = .02;
      rightTarget.z = -.02;
    }
    if (armLeft.current && armRight.current) {
      armLeft.current.rotation.x += (leftTarget.x - armLeft.current.rotation.x) * armDamping;
      armLeft.current.rotation.z += (leftTarget.z - armLeft.current.rotation.z) * armDamping;
      armRight.current.rotation.x += (rightTarget.x - armRight.current.rotation.x) * armDamping;
      armRight.current.rotation.z += (rightTarget.z - armRight.current.rotation.z) * armDamping;
    }
  });

  return (
    <group ref={group}>
      <group ref={head} position={[0, 1.38, 0]} rotation={[0, 0, style.tilt]}>
        <mesh scale={[1.08, .94, .84]} castShadow><sphereGeometry args={[.68, 48, 32]} /><meshStandardMaterial color="#f0f7fa" roughness={.28} metalness={.18} /></mesh>
        <mesh position={[0, -.015, .5]} scale={[.9, .62, .22]}><sphereGeometry args={[.62, 40, 28]} /><meshStandardMaterial color="#102b44" roughness={.16} metalness={.12} /></mesh>
        <Eye side={-1} eyeRef={eyeLeft} style={style} />
        <Eye side={1} eyeRef={eyeRight} style={style} />
        <mesh position={[-.235, .27, .64]} rotation={[0, 0, style.browTilt]}><boxGeometry args={[.19, .022, .025]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={.8} /></mesh>
        <mesh position={[.235, .27, .64]} rotation={[0, 0, -style.browTilt]}><boxGeometry args={[.19, .022, .025]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={.8} /></mesh>
        {emotion === 'warning' ? (
          <mesh position={[0, -.22, .675]} scale={[style.smileWidth, 1, 1]}><boxGeometry args={[.17, .024, .025]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={.8} /></mesh>
        ) : (
          <mesh position={[0, -.16, .665]} rotation={[0, 0, Math.PI]} scale={[style.smileWidth, style.smileCurve, .72]}><torusGeometry args={[.18, .026, 10, 32, Math.PI]} /><meshStandardMaterial color={style.eye} emissive={style.eye} emissiveIntensity={1.05} /></mesh>
        )}
        <mesh position={[-.39, -.12, .575]} scale={[1.35, .55, .38]}><sphereGeometry args={[.048, 18, 12]} /><meshStandardMaterial color="#72d8d4" emissive={style.accent} emissiveIntensity={.35} transparent opacity={.65} /></mesh>
        <mesh position={[.39, -.12, .575]} scale={[1.35, .55, .38]}><sphereGeometry args={[.048, 18, 12]} /><meshStandardMaterial color="#72d8d4" emissive={style.accent} emissiveIntensity={.35} transparent opacity={.65} /></mesh>
        <group ref={accent} position={[0, .68, -.015]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.2, .026, 10, 38]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={1.15} /></mesh>
          <mesh position={[0, .025, 0]}><sphereGeometry args={[.056, 18, 14]} /><meshStandardMaterial color="#d9bb76" emissive="#d9bb76" emissiveIntensity={.65} /></mesh>
        </group>
      </group>

      <mesh position={[0, .73, 0]}><cylinderGeometry args={[.12, .15, .22, 24]} /><meshStandardMaterial color="#dcecf5" roughness={.34} metalness={.22} /></mesh>
      <mesh ref={torso} position={[0, .18, 0]} scale={[.74, .72, .45]} castShadow><sphereGeometry args={[.65, 38, 26]} /><meshStandardMaterial color="#f2f7f9" roughness={.36} metalness={.12} /></mesh>

      <mesh position={[-.22, .21, .37]} rotation={[0, .08, -.025]} scale={[.45, 1, .16]}><sphereGeometry args={[.45, 28, 20]} /><meshStandardMaterial color="#123e5d" roughness={.46} /></mesh>
      <mesh position={[.22, .21, .37]} rotation={[0, -.08, .025]} scale={[.45, 1, .16]}><sphereGeometry args={[.45, 28, 20]} /><meshStandardMaterial color="#123e5d" roughness={.46} /></mesh>
      <mesh position={[-.145, .58, .435]} rotation={[0, 0, -.57]}><boxGeometry args={[.31, .05, .045]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.38} /></mesh>
      <mesh position={[.145, .58, .435]} rotation={[0, 0, .57]}><boxGeometry args={[.31, .05, .045]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.38} /></mesh>
      <mesh position={[-.075, .19, .445]}><boxGeometry args={[.032, .57, .035]} /><meshStandardMaterial color="#38bbc0" emissive={style.accent} emissiveIntensity={.28} /></mesh>
      <mesh position={[.075, .19, .445]}><boxGeometry args={[.032, .57, .035]} /><meshStandardMaterial color="#38bbc0" emissive={style.accent} emissiveIntensity={.28} /></mesh>
      <mesh position={[0, -.14, .445]}><boxGeometry args={[.72, .075, .045]} /><meshStandardMaterial color="#d6b56f" roughness={.38} metalness={.18} /></mesh>
      {[.34, .18, .02].map((y, index) => <mesh key={y} position={[0, y, .477]} rotation={[0, 0, Math.PI / 4]} scale={index === 1 ? 1.05 : .82}><boxGeometry args={[.105, .105, .028]} /><meshStandardMaterial color={index === 1 ? style.accent : '#d6b56f'} emissive={index === 1 ? style.accent : '#000000'} emissiveIntensity={index === 1 ? .42 : 0} roughness={.36} /></mesh>)}
      <mesh position={[0, -.32, 0]} scale={[.66, .25, .38]}><sphereGeometry args={[.5, 28, 18]} /><meshStandardMaterial color="#123e5d" roughness={.48} /></mesh>

      <Arm side={-1} armRef={armLeft} />
      <Arm side={1} armRef={armRight} />
      <Leg side={-1} />
      <Leg side={1} />
      <pointLight position={[0, 1.15, 2]} color={style.accent} intensity={emotion === 'warning' ? .95 : emotion === 'happy' ? 1.7 : 1.4} distance={4} />
    </group>
  );
}

function CameraRig({ mode }: { mode: AssistantCharacterMode }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    if (mode === 'portrait') {
      camera.position.set(0, 1.2, 3.55);
      camera.lookAt(0, 1.2, 0);
    } else {
      camera.position.set(0, .35, 6.25);
      camera.lookAt(0, .35, 0);
    }
    camera.updateProjectionMatrix();
  }, [camera, mode]);
  return null;
}

export default function SmartAssistantCanvas({ emotion, mode, gazeRef }: { emotion: AssistantEmotion; mode: AssistantCharacterMode; gazeRef: MutableRefObject<AssistantGaze> }) {
  const camera = mode === 'portrait' ? { position: [0, 1.2, 3.55] as [number, number, number], fov: 30 } : { position: [0, .35, 6.25] as [number, number, number], fov: 34 };
  return (
    <Canvas key={mode} camera={camera} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.62} />
      <directionalLight position={[3, 4, 5]} intensity={2.05} color="#dceeff" />
      <directionalLight position={[-3, 1, 2]} intensity={.78} color="#42c7c8" />
      <CameraRig mode={mode} />
      <Character emotion={emotion} gazeRef={gazeRef} />
    </Canvas>
  );
}
