'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import type { Group, Mesh } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
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
  idle: { accent: '#42c7c8', eye: '#dfffff', tilt: 0, energy: .58, eyeScale: 1, smileWidth: .9, smileCurve: .3, browTilt: 0 },
  greeting: { accent: '#4fc49a', eye: '#f2fff8', tilt: -.025, energy: 1, eyeScale: 1.04, smileWidth: 1.12, smileCurve: .58, browTilt: -.04 },
  listening: { accent: '#35d6d0', eye: '#efffff', tilt: -.045, energy: .82, eyeScale: 1.12, smileWidth: .84, smileCurve: .23, browTilt: 0 },
  thinking: { accent: '#8f7bd1', eye: '#e1d9ff', tilt: .085, energy: .45, eyeScale: .9, smileWidth: .7, smileCurve: .13, browTilt: .11 },
  explaining: { accent: '#4fa3ea', eye: '#e8f6ff', tilt: -.02, energy: .88, eyeScale: 1.02, smileWidth: 1, smileCurve: .37, browTilt: 0 },
  happy: { accent: '#4fc49a', eye: '#f2fff8', tilt: 0, energy: 1.12, eyeScale: .62, smileWidth: 1.18, smileCurve: .68, browTilt: -.08 },
  warning: { accent: '#e6b259', eye: '#ffe8b5', tilt: 0, energy: .22, eyeScale: .78, smileWidth: .62, smileCurve: .04, browTilt: .16 },
  uncertain: { accent: '#b6a4ec', eye: '#f1edff', tilt: .14, energy: .34, eyeScale: .86, smileWidth: .66, smileCurve: .1, browTilt: .17 },
  handoff: { accent: '#69b5f2', eye: '#ebf8ff', tilt: -.055, energy: .56, eyeScale: 1, smileWidth: .92, smileCurve: .29, browTilt: 0 },
};

function RoundedBox({ size, radius, smoothness = 5 }: { size: [number, number, number]; radius: number; smoothness?: number }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(size[0], size[1], size[2], smoothness, radius), [radius, size, smoothness]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

function EyeMark({ side, eyeRef, style }: { side: -1 | 1; eyeRef: MutableRefObject<Group | null>; style: EmotionStyle }) {
  return (
    <group ref={eyeRef} position={[side * .28, .075, .635]}>
      <mesh scale={[1.25, 1.5, .34]}>
        <sphereGeometry args={[.078, 24, 18]} />
        <meshBasicMaterial color={style.eye} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -.012]} scale={[1.8, 2.05, .26]}>
        <sphereGeometry args={[.078, 20, 14]} />
        <meshBasicMaterial color={style.accent} transparent opacity={.13} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Hand({ side }: { side: -1 | 1 }) {
  const fingerOffsets = [-.052, 0, .052];
  return (
    <group position={[side * .04, -.72, .055]}>
      <mesh position={[0, .065, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.07, .017, 10, 24]} /><meshStandardMaterial color="#36b8be" emissive="#36b8be" emissiveIntensity={.14} roughness={.42} metalness={.16} /></mesh>
      <mesh scale={[.9, .78, .56]}><sphereGeometry args={[.105, 20, 16]} /><meshStandardMaterial color="#edf5f8" roughness={.5} metalness={.08} /></mesh>
      <mesh position={[0, .006, .067]} scale={[.66, .52, .18]}><sphereGeometry args={[.08, 18, 12]} /><meshStandardMaterial color="#cce1e9" roughness={.46} metalness={.12} /></mesh>
      {fingerOffsets.map((x) => (
        <group key={x} position={[x, -.105, .015]}>
          <mesh scale={[.58, 1, .56]}><sphereGeometry args={[.038, 16, 12]} /><meshStandardMaterial color="#edf5f8" roughness={.52} metalness={.06} /></mesh>
          <mesh position={[0, -.032, .012]} scale={[.48, .28, .46]}><sphereGeometry args={[.038, 14, 10]} /><meshStandardMaterial color="#d5e7ed" roughness={.5} metalness={.08} /></mesh>
        </group>
      ))}
      <mesh position={[side * .095, -.025, .01]} rotation={[0, 0, side * -.52]} scale={[.62, 1, .56]}>
        <sphereGeometry args={[.043, 16, 12]} />
        <meshStandardMaterial color="#d8e9f1" roughness={.5} metalness={.08} />
      </mesh>
    </group>
  );
}

function Arm({ side, armRef }: { side: -1 | 1; armRef: MutableRefObject<Group | null> }) {
  return (
    <group ref={armRef} position={[side * .49, .42, 0]} rotation={[0, 0, side * -.1]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.145, .145, .12, 24]} /><meshStandardMaterial color="#0e3048" roughness={.52} metalness={.18} /></mesh>
      <mesh position={[side * .035, 0, 0]} scale={[.92, 1, .82]} castShadow><sphereGeometry args={[.145, 24, 18]} /><meshStandardMaterial color="#eff6f8" roughness={.42} metalness={.12} /></mesh>
      <mesh position={[side * .035, -.2, 0]} castShadow><cylinderGeometry args={[.09, .11, .28, 20]} /><meshStandardMaterial color="#17577e" roughness={.48} metalness={.1} /></mesh>
      <mesh position={[side * .04, -.36, .012]}><sphereGeometry args={[.105, 20, 16]} /><meshStandardMaterial color="#102f47" roughness={.52} metalness={.16} /></mesh>
      <mesh position={[side * .04, -.36, .012]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.086, .018, 10, 24]} /><meshStandardMaterial color="#36b8be" emissive="#36b8be" emissiveIntensity={.12} roughness={.42} /></mesh>
      <mesh position={[side * .04, -.52, .03]} castShadow><cylinderGeometry args={[.075, .09, .24, 20]} /><meshStandardMaterial color="#edf5f8" roughness={.46} metalness={.1} /></mesh>
      <mesh position={[side * .04, -.58, .082]} rotation={[0, 0, side * .08]}><boxGeometry args={[.11, .025, .02]} /><meshStandardMaterial color="#b8d5df" roughness={.48} /></mesh>
      <mesh position={[side * .04, -.42, .105]} scale={[.62, .48, .35]}><sphereGeometry args={[.06, 16, 12]} /><meshStandardMaterial color="#42c7c8" emissive="#42c7c8" emissiveIntensity={.24} roughness={.5} /></mesh>
      <Hand side={side} />
    </group>
  );
}

function Leg({ side }: { side: -1 | 1 }) {
  return (
    <group position={[side * .18, -.35, 0]}>
      <mesh position={[0, -.17, 0]} castShadow><cylinderGeometry args={[.13, .15, .32, 24]} /><meshStandardMaterial color="#153f5e" roughness={.48} /></mesh>
      <mesh position={[0, -.35, 0]}><sphereGeometry args={[.135, 20, 16]} /><meshStandardMaterial color="#0f3048" roughness={.5} metalness={.16} /></mesh>
      <mesh position={[0, -.52, 0]} castShadow><cylinderGeometry args={[.1, .125, .26, 22]} /><meshStandardMaterial color="#eff6f8" roughness={.44} metalness={.1} /></mesh>
      <mesh position={[0, -.49, .11]} scale={[.58, .42, .32]}><sphereGeometry args={[.065, 16, 12]} /><meshStandardMaterial color="#42c7c8" emissive="#42c7c8" emissiveIntensity={.2} roughness={.48} /></mesh>
      <mesh position={[0, -.7, .09]} scale={[1.14, .54, 1.48]} castShadow><sphereGeometry args={[.165, 22, 16]} /><meshStandardMaterial color="#123e5d" roughness={.5} /></mesh>
      <mesh position={[0, -.7, .205]} scale={[.66, .3, .24]}><sphereGeometry args={[.12, 16, 12]} /><meshStandardMaterial color="#2fb9c0" emissive="#2fb9c0" emissiveIntensity={.18} roughness={.42} /></mesh>
    </group>
  );
}

function Character({ emotion, gazeRef }: { emotion: AssistantEmotion; gazeRef: MutableRefObject<AssistantGaze> }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyeLeft = useRef<Group>(null);
  const eyeRight = useRef<Group>(null);
  const antenna = useRef<Group>(null);
  const torso = useRef<Mesh>(null);
  const armLeft = useRef<Group>(null);
  const armRight = useRef<Group>(null);
  const look = useRef({ x: 0, y: 0 });
  const style = emotionStyle[emotion];
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const showBrows = emotion === 'greeting' || emotion === 'happy' || emotion === 'thinking' || emotion === 'warning' || emotion === 'uncertain';

  useFrame(({ clock }, delta) => {
    if (document.visibilityState !== 'visible') return;
    const t = clock.getElapsedTime();
    const processingShift = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .9) * .15 : 0;
    const emotionX = emotion === 'thinking' ? -.17 + processingShift : emotion === 'uncertain' ? .09 : 0;
    const emotionY = emotion === 'thinking' ? .13 : emotion === 'warning' ? -.065 : emotion === 'listening' ? .04 : 0;
    const gazePower = gazeRef.current.active ? .58 + gazeRef.current.strength * .42 : 0;
    const targetX = reducedMotion ? emotionX : gazeRef.current.x * gazePower + emotionX;
    const targetY = reducedMotion ? emotionY : gazeRef.current.y * gazePower + emotionY;
    const damping = 1 - Math.exp(-delta * (gazeRef.current.active ? 7.5 : 4.2));
    look.current.x += (targetX - look.current.x) * damping;
    look.current.y += (targetY - look.current.y) * damping;

    const blinkWave = Math.sin(t * .78) > .985 ? Math.max(.1, 1 - (Math.sin(t * .78) - .985) * 66) : 1;
    const blink = reducedMotion ? 1 : blinkWave;
    const eyeX = look.current.x * .068;
    const eyeY = look.current.y * .05;
    if (eyeLeft.current && eyeRight.current) {
      const asymmetry = emotion === 'uncertain' ? .017 : 0;
      eyeLeft.current.position.set(-.28 + eyeX - asymmetry, .075 + eyeY + asymmetry, .635);
      eyeRight.current.position.set(.28 + eyeX + asymmetry, .075 + eyeY - asymmetry, .635);
      eyeLeft.current.scale.y = style.eyeScale * blink;
      eyeRight.current.scale.y = style.eyeScale * blink;
    }

    if (head.current) {
      const nod = !reducedMotion && (emotion === 'explaining' || emotion === 'handoff' || emotion === 'greeting') ? Math.sin(t * 1.7) * .035 : 0;
      const thinkTilt = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .58) * .028 : 0;
      const happyWiggle = !reducedMotion && emotion === 'happy' ? Math.sin(t * 1.55) * .024 : 0;
      head.current.rotation.y = look.current.x * .18;
      head.current.rotation.x = -look.current.y * .12 + (emotion === 'listening' ? -.05 : emotion === 'warning' ? .022 : 0) + nod;
      head.current.rotation.z = style.tilt + thinkTilt + happyWiggle;
    }

    if (group.current) {
      const idleFloat = Math.sin(t * 1.05) * .032 * style.energy;
      const happyBounce = emotion === 'happy' || emotion === 'greeting' ? Math.abs(Math.sin(t * 1.65)) * .05 : 0;
      group.current.position.y = reducedMotion ? 0 : idleFloat + happyBounce;
      group.current.rotation.x = emotion === 'listening' ? -.032 : emotion === 'warning' ? .016 : 0;
      group.current.rotation.y = look.current.x * .032 + (reducedMotion ? 0 : Math.sin(t * .35) * .016 * style.energy);
    }

    if (torso.current) {
      const breath = reducedMotion ? 0 : Math.sin(t * 1.35) * .009 * style.energy;
      torso.current.scale.set(1 + breath, 1 + breath, 1 + breath * .5);
    }

    if (antenna.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * (emotion === 'thinking' ? 2.2 : emotion === 'warning' ? 1.25 : 1.5)) * (emotion === 'thinking' ? .08 : .035);
      antenna.current.scale.setScalar(pulse);
    }

    const armDamping = 1 - Math.exp(-delta * 5.5);
    const leftTarget = { x: 0, z: .1 };
    const rightTarget = { x: 0, z: -.1 };
    if (emotion === 'greeting') {
      rightTarget.x = -.38;
      rightTarget.z = -.92 + (reducedMotion ? 0 : Math.sin(t * 7.2) * .18);
    } else if (emotion === 'explaining') {
      rightTarget.x = -.44;
      rightTarget.z = -.72 + (reducedMotion ? 0 : Math.sin(t * 1.45) * .12);
    } else if (emotion === 'handoff') {
      leftTarget.x = -.5;
      leftTarget.z = .86 + (reducedMotion ? 0 : Math.sin(t * 1.15) * .08);
    } else if (emotion === 'happy') {
      leftTarget.z = .38;
      rightTarget.z = -.38;
    } else if (emotion === 'uncertain') {
      rightTarget.x = -.5;
      rightTarget.z = -.45;
    } else if (emotion === 'listening') {
      leftTarget.z = .02;
      rightTarget.z = -.02;
    } else if (emotion === 'warning') {
      leftTarget.z = .01;
      rightTarget.z = -.01;
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
      <group ref={head} position={[0, 1.44, 0]} rotation={[0, 0, style.tilt]}>
        <mesh castShadow>
          <RoundedBox size={[1.52, 1.22, 1.02]} radius={.26} />
          <meshStandardMaterial color="#eef6f9" roughness={.43} metalness={.08} />
        </mesh>
        <mesh position={[0, -.015, .5]}>
          <RoundedBox size={[1.25, .84, .24]} radius={.1} />
          <meshStandardMaterial color="#0d293d" roughness={.74} metalness={.025} />
        </mesh>
        <EyeMark side={-1} eyeRef={eyeLeft} style={style} />
        <EyeMark side={1} eyeRef={eyeRight} style={style} />
        {showBrows && <>
          <mesh position={[-.28, .285, .64]} rotation={[0, 0, style.browTilt]}><boxGeometry args={[.2, .018, .018]} /><meshBasicMaterial color={style.eye} transparent opacity={.82} toneMapped={false} /></mesh>
          <mesh position={[.28, .285, .64]} rotation={[0, 0, -style.browTilt]}><boxGeometry args={[.2, .018, .018]} /><meshBasicMaterial color={style.eye} transparent opacity={.82} toneMapped={false} /></mesh>
        </>}
        {emotion === 'warning' ? (
          <mesh position={[0, -.205, .65]} scale={[style.smileWidth, 1, 1]}><boxGeometry args={[.17, .022, .018]} /><meshBasicMaterial color={style.eye} toneMapped={false} /></mesh>
        ) : (
          <mesh position={[0, -.145, .65]} rotation={[0, 0, Math.PI]} scale={[style.smileWidth, style.smileCurve, .62]}><torusGeometry args={[.18, .022, 10, 32, Math.PI]} /><meshBasicMaterial color={style.eye} toneMapped={false} /></mesh>
        )}

        {([-1, 1] as const).map((side) => <group key={side} position={[side * .79, 0, .015]}>
          <mesh scale={[.58, 1, .72]}><sphereGeometry args={[.18, 28, 22]} /><meshStandardMaterial color="#123e5d" roughness={.52} metalness={.12} /></mesh>
          <mesh position={[0, 0, .095]} scale={[.48, .76, .42]}><sphereGeometry args={[.15, 24, 20]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.28} roughness={.46} /></mesh>
          <mesh position={[0, 0, .145]} scale={[.7, 1, .34]}><sphereGeometry args={[.045, 18, 14]} /><meshStandardMaterial color="#eaf4f7" roughness={.5} /></mesh>
        </group>)}

        <group ref={antenna} position={[.2, .69, 0]} rotation={[0, 0, -.12]}>
          <mesh position={[0, .065, 0]}><cylinderGeometry args={[.016, .02, .13, 14]} /><meshStandardMaterial color="#35576b" roughness={.5} metalness={.22} /></mesh>
          <mesh position={[0, .15, 0]} scale={[.82, 1, .7]}><sphereGeometry args={[.052, 18, 14]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.42} roughness={.42} /></mesh>
        </group>
      </group>

      <mesh position={[0, .75, 0]}><cylinderGeometry args={[.11, .14, .18, 24]} /><meshStandardMaterial color="#123047" roughness={.52} metalness={.16} /></mesh>
      <mesh position={[0, .73, .005]}><torusGeometry args={[.12, .025, 10, 24]} /><meshStandardMaterial color="#dcecf3" roughness={.46} metalness={.1} /></mesh>

      <mesh ref={torso} position={[0, .31, 0]} castShadow>
        <RoundedBox size={[.86, .76, .52]} radius={.16} />
        <meshStandardMaterial color="#eff6f8" roughness={.44} metalness={.08} />
      </mesh>
      <mesh position={[0, .33, .285]}>
        <RoundedBox size={[.45, .28, .075]} radius={.035} smoothness={4} />
        <meshStandardMaterial color="#e3f3f4" emissive={style.accent} emissiveIntensity={.12} roughness={.62} metalness={.02} />
      </mesh>
      <mesh position={[0, .33, .33]} scale={[.78, .55, .28]}><sphereGeometry args={[.09, 18, 14]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.42} roughness={.48} /></mesh>

      <mesh position={[-.22, .25, .305]} rotation={[0, .07, -.025]} scale={[.42, .94, .14]}><sphereGeometry args={[.42, 28, 20]} /><meshStandardMaterial color="#123e5d" roughness={.5} /></mesh>
      <mesh position={[.22, .25, .305]} rotation={[0, -.07, .025]} scale={[.42, .94, .14]}><sphereGeometry args={[.42, 28, 20]} /><meshStandardMaterial color="#123e5d" roughness={.5} /></mesh>
      <mesh position={[-.14, .61, .35]} rotation={[0, 0, -.57]}><boxGeometry args={[.3, .045, .04]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.32} /></mesh>
      <mesh position={[.14, .61, .35]} rotation={[0, 0, .57]}><boxGeometry args={[.3, .045, .04]} /><meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={.32} /></mesh>
      <mesh position={[-.072, .25, .36]}><boxGeometry args={[.028, .48, .03]} /><meshStandardMaterial color="#38bbc0" emissive={style.accent} emissiveIntensity={.22} /></mesh>
      <mesh position={[.072, .25, .36]}><boxGeometry args={[.028, .48, .03]} /><meshStandardMaterial color="#38bbc0" emissive={style.accent} emissiveIntensity={.22} /></mesh>
      <mesh position={[0, -.02, .355]}><boxGeometry args={[.72, .065, .04]} /><meshStandardMaterial color="#d6b56f" roughness={.42} metalness={.14} /></mesh>
      {[.45, .31, .17].map((y, index) => <mesh key={y} position={[0, y, .382]} rotation={[0, 0, Math.PI / 4]} scale={index === 1 ? .96 : .74}><boxGeometry args={[.09, .09, .024]} /><meshStandardMaterial color={index === 1 ? style.accent : '#d6b56f'} emissive={index === 1 ? style.accent : '#000000'} emissiveIntensity={index === 1 ? .36 : 0} roughness={.4} /></mesh>)}
      <mesh position={[0, -.17, 0]}>
        <RoundedBox size={[.56, .24, .38]} radius={.1} />
        <meshStandardMaterial color="#123e5d" roughness={.5} />
      </mesh>
      <mesh position={[0, -.16, .215]}><boxGeometry args={[.26, .035, .025]} /><meshStandardMaterial color="#42c7c8" emissive="#42c7c8" emissiveIntensity={.22} roughness={.5} /></mesh>

      <Arm side={-1} armRef={armLeft} />
      <Arm side={1} armRef={armRight} />
      <Leg side={-1} />
      <Leg side={1} />
      <pointLight position={[0, 1.2, 2]} color={style.accent} intensity={emotion === 'warning' ? .55 : emotion === 'happy' || emotion === 'greeting' ? .95 : .72} distance={3.5} />
    </group>
  );
}

function CameraRig({ mode }: { mode: AssistantCharacterMode }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    if (mode === 'portrait') {
      camera.position.set(0, 1.4, 3.65);
      camera.lookAt(0, 1.4, 0);
    } else {
      camera.position.set(0, .5, 6.05);
      camera.lookAt(0, .5, 0);
    }
    camera.updateProjectionMatrix();
  }, [camera, mode]);
  return null;
}

export default function SmartAssistantCanvas({ emotion, mode, gazeRef }: { emotion: AssistantEmotion; mode: AssistantCharacterMode; gazeRef: MutableRefObject<AssistantGaze> }) {
  const camera = mode === 'portrait' ? { position: [0, 1.4, 3.65] as [number, number, number], fov: 30 } : { position: [0, .5, 6.05] as [number, number, number], fov: 34 };
  return (
    <Canvas key={mode} camera={camera} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.72} />
      <directionalLight position={[3, 4, 5]} intensity={1.45} color="#dceeff" />
      <directionalLight position={[-3, 1, 2]} intensity={.48} color="#42c7c8" />
      <CameraRig mode={mode} />
      <Character emotion={emotion} gazeRef={gazeRef} />
    </Canvas>
  );
}
