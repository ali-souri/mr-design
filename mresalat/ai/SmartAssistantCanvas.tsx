'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useId, useMemo, useRef, type MutableRefObject } from 'react';
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Euler,
  ExtrudeGeometry,
  LatheGeometry,
  PerspectiveCamera,
  Quaternion,
  Shape,
  ShapeGeometry,
  Vector2,
  type Group,
  type Material,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { MascotHand, animateHandPose, createHandRig, type HandRig, type MascotHandMaterials } from './MascotHand';
import {
  emotionProfiles,
  mascotPalette,
  motionIntensityScale,
  resolveMascotPose,
  type ArmPoseProfile,
  type AssistantCharacterMode,
  type AssistantDebugView,
  type AssistantEmotion,
  type AssistantGaze,
  type AssistantHandPose,
  type AssistantMotionIntensity,
  type AssistantView,
  type EmotionProfile,
} from './mascot';

type MascotMaterials = MascotHandMaterials & {
  whiteShade: Material;
  gold: Material;
  face: Material;
  faceGlow: Material;
  eyeHaloInner: Material;
  eyeHaloOuter: Material;
  mouthHalo: Material;
};

type ArmRig = {
  shoulder: Group | null;
  elbow: Group | null;
  wrist: Group | null;
};

type MascotRendererStats = { geometries: number; textures: number; programs: number };
type MascotQaState = {
  liveCanvases: number;
  renderers: Record<string, MascotRendererStats>;
  contextLost: number;
  contextRestored: number;
};

declare global {
  interface Window {
    __MRESALAT_MASCOT_QA__?: MascotQaState;
  }
}

const canvasGlOptions = { alpha: true, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: false } as const;
const initialCamera = { position: [0, .48, 6.35] as [number, number, number], fov: 33 };

function SharedMaterial({ material }: { material: Material }) {
  return <primitive object={material} attach="material" />;
}

function RoundedBox({ size, radius, smoothness = 5 }: { size: [number, number, number]; radius: number; smoothness?: number }) {
  const [width, height, depth] = size;
  const geometry = useMemo(() => new RoundedBoxGeometry(width, height, depth, smoothness, radius), [depth, height, radius, smoothness, width]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <primitive object={geometry} attach="geometry" />;
}

function RoundedMesh({
  size,
  radius,
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: {
  size: [number, number, number];
  radius: number;
  material: Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  return <mesh position={position} rotation={rotation} scale={scale}><RoundedBox size={size} radius={radius} /><SharedMaterial material={material} /></mesh>;
}

function StarMark({ size, material, position = [0, 0, 0], rotation = [0, 0, 0] }: { size: number; material: Material; position?: [number, number, number]; rotation?: [number, number, number] }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    for (let index = 0; index < 8; index += 1) {
      const angle = Math.PI / 2 + index * Math.PI / 4;
      const radius = index % 2 === 0 ? size : size * .34;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (index === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();
    return new ShapeGeometry(shape);
  }, [size]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} position={position} rotation={rotation}><SharedMaterial material={material} /></mesh>;
}

function ForeheadAccent({ materials }: { materials: MascotMaterials }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-.34, .66);
    shape.bezierCurveTo(-.2, .72, .2, .72, .34, .66);
    shape.lineTo(.25, .49);
    shape.quadraticCurveTo(.18, .38, 0, .34);
    shape.quadraticCurveTo(-.18, .38, -.25, .49);
    shape.closePath();
    return new ShapeGeometry(shape, 8);
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      <mesh geometry={geometry} position={[0, 0, .574]}><SharedMaterial material={materials.teal} /></mesh>
      <StarMark size={.075} material={materials.gold} position={[0, .51, .584]} />
    </group>
  );
}

function VestPanel({ side, material }: { side: -1 | 1; material: Material }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(.025, .57);
    shape.quadraticCurveTo(.13, .51, .22, .43);
    shape.bezierCurveTo(.32, .45, .44, .43, .48, .35);
    shape.quadraticCurveTo(.51, .16, .44, -.1);
    shape.quadraticCurveTo(.27, -.16, .09, -.12);
    shape.quadraticCurveTo(.055, .08, .025, .31);
    shape.closePath();
    return new ExtrudeGeometry(shape, {
      depth: .045,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: .012,
      bevelThickness: .012,
      curveSegments: 8,
      steps: 1,
    });
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} position={[0, 0, .315]} rotation={[0, side * .08, 0]} scale={[side, 1, 1]}><SharedMaterial material={material} /></mesh>;
}

function TorsoShell({ material }: { material: Material }) {
  const geometry = useMemo(() => new LatheGeometry([
    new Vector2(0, -.39),
    new Vector2(.37, -.4),
    new Vector2(.45, -.34),
    new Vector2(.5, -.18),
    new Vector2(.56, .08),
    new Vector2(.54, .25),
    new Vector2(.47, .39),
    new Vector2(0, .4),
  ], 36), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} scale={[1, 1, .62]}><SharedMaterial material={material} /></mesh>;
}

function SuperellipsePanel({ width, height, exponent = 4, z, material }: { width: number; height: number; exponent?: number; z: number; material: Material }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    const a = width / 2;
    const b = height / 2;
    for (let index = 0; index <= 64; index += 1) {
      const angle = index / 64 * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const x = a * Math.sign(cosine) * Math.pow(Math.abs(cosine), 2 / exponent);
      const y = b * Math.sign(sine) * Math.pow(Math.abs(sine), 2 / exponent);
      if (index === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();
    return new ShapeGeometry(shape, 12);
  }, [exponent, height, width]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} position={[0, -.035, z]}><SharedMaterial material={material} /></mesh>;
}

function useMascotMaterials() {
  const materials = useMemo<MascotMaterials>(() => ({
    white: new MeshPhysicalMaterial({ color: mascotPalette.white, roughness: .48, metalness: .04, clearcoat: .08, clearcoatRoughness: .82 }),
    whiteShade: new MeshStandardMaterial({ color: mascotPalette.whiteShade, roughness: .56, metalness: .04 }),
    navy: new MeshStandardMaterial({ color: mascotPalette.navy, roughness: .54, metalness: .08 }),
    darkJoint: new MeshStandardMaterial({ color: mascotPalette.darkJoint, roughness: .62, metalness: .12 }),
    teal: new MeshStandardMaterial({ color: mascotPalette.teal, roughness: .46, metalness: .08, emissive: mascotPalette.teal, emissiveIntensity: .08 }),
    gold: new MeshStandardMaterial({ color: mascotPalette.gold, roughness: .44, metalness: .24 }),
    face: new MeshPhysicalMaterial({ color: mascotPalette.face, roughness: .82, metalness: .02, clearcoat: .02, clearcoatRoughness: 1 }),
    faceGlow: new MeshBasicMaterial({ color: mascotPalette.cyan, toneMapped: false }),
    eyeHaloInner: new MeshBasicMaterial({ color: mascotPalette.cyan, transparent: true, opacity: .065, depthWrite: false, toneMapped: false }),
    eyeHaloOuter: new MeshBasicMaterial({ color: mascotPalette.cyan, transparent: true, opacity: .024, depthWrite: false, toneMapped: false }),
    mouthHalo: new MeshBasicMaterial({ color: mascotPalette.cyan, transparent: true, opacity: .018, depthWrite: false, toneMapped: false }),
  }), []);
  useEffect(() => () => Object.values(materials).forEach((material) => material.dispose()), [materials]);
  return materials;
}

function EyeMark({ side, eyeRef, profile, materials }: { side: -1 | 1; eyeRef: MutableRefObject<Group | null>; profile: EmotionProfile; materials: MascotMaterials }) {
  const crescent = profile.eyeShape === 'crescent';
  const narrow = profile.eyeShape === 'narrow';
  const soft = profile.eyeShape === 'soft';
  const asymmetric = profile.eyeShape === 'asymmetric';
  const yScale = narrow ? .58 : soft ? .78 : asymmetric && side === 1 ? .76 : 1;
  return (
    <group ref={eyeRef} position={[side * .3, .07, .61]} rotation={[0, 0, narrow ? side * -.12 : 0]}>
      <group visible={!crescent} scale={[1, yScale, 1]}>
        <mesh scale={[1.05, 1.38, .24]}><sphereGeometry args={[.09, 20, 16]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.012]} scale={[1.35, 1.78, .16]}><sphereGeometry args={[.09, 16, 12]} /><SharedMaterial material={materials.eyeHaloInner} /></mesh>
        <mesh position={[0, 0, -.018]} scale={[1.72, 2.2, .12]}><sphereGeometry args={[.09, 16, 12]} /><SharedMaterial material={materials.eyeHaloOuter} /></mesh>
      </group>
      <group visible={crescent} position={[0, -.015, 0]}>
        <mesh rotation={[0, 0, 0]}><torusGeometry args={[.09, .022, 8, 26, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.012]} scale={[1.34, 1.34, .35]}><torusGeometry args={[.09, .019, 8, 22, Math.PI]} /><SharedMaterial material={materials.eyeHaloInner} /></mesh>
        <mesh position={[0, 0, -.018]} scale={[1.7, 1.7, .25]}><torusGeometry args={[.09, .017, 8, 22, Math.PI]} /><SharedMaterial material={materials.eyeHaloOuter} /></mesh>
      </group>
    </group>
  );
}

function FaceMouth({ profile, materials }: { profile: EmotionProfile; materials: MascotMaterials }) {
  return (
    <group position={[0, -.19, .62]}>
      <group visible={profile.mouthShape === 'smile'} rotation={[0, 0, Math.PI]} scale={[1, .52, .8]}>
        <mesh><torusGeometry args={[.19, .022, 8, 32, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.015]} scale={[1.28, 1.28, .5]}><torusGeometry args={[.19, .019, 8, 28, Math.PI]} /><SharedMaterial material={materials.mouthHalo} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'soft-smile'} rotation={[0, 0, Math.PI]} scale={[.82, .36, .8]}>
        <mesh><torusGeometry args={[.18, .021, 8, 30, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.015]} scale={[1.28, 1.28, .5]}><torusGeometry args={[.18, .018, 8, 26, Math.PI]} /><SharedMaterial material={materials.mouthHalo} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'open-smile'}>
        <mesh position={[0, 0, -.018]} scale={[1.88, .98, .16]}><sphereGeometry args={[.105, 18, 12]} /><SharedMaterial material={materials.mouthHalo} /></mesh>
        <mesh scale={[1.5, .72, .25]}><sphereGeometry args={[.105, 20, 14]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, .028, .005]} scale={[1.15, .5, .25]}><sphereGeometry args={[.105, 18, 12]} /><SharedMaterial material={materials.face} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'neutral'}>
        <mesh position={[0, 0, -.015]} scale={[1.45, 1.18, .5]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.016, .17, 4, 12]} /><SharedMaterial material={materials.mouthHalo} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.016, .17, 4, 12]} /><SharedMaterial material={materials.faceGlow} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'worried'} scale={[.84, .42, .8]}>
        <mesh><torusGeometry args={[.18, .022, 8, 30, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.015]} scale={[1.28, 1.28, .5]}><torusGeometry args={[.18, .018, 8, 26, Math.PI]} /><SharedMaterial material={materials.mouthHalo} /></mesh>
      </group>
    </group>
  );
}

function FaceBrows({ profile, materials }: { profile: EmotionProfile; materials: MascotMaterials }) {
  const rotations: Record<EmotionProfile['browShape'], [number, number]> = {
    hidden: [0, 0],
    raised: [-.08, .08],
    thinking: [-.13, -.02],
    warning: [.18, -.18],
    worried: [-.2, .12],
  };
  const [left, right] = rotations[profile.browShape];
  return <>{([-1, 1] as const).map((side) => (
    <mesh key={side} visible={profile.browShape !== 'hidden'} position={[side * .3, .29 + (profile.browShape === 'worried' && side === -1 ? .035 : 0), .62]} rotation={[0, 0, Math.PI / 2 + (side === -1 ? left : right)]}>
      <capsuleGeometry args={[.012, .15, 4, 10]} /><SharedMaterial material={materials.faceGlow} />
    </mesh>
  ))}</>;
}

function EarModule({ side, materials, pulseRef }: { side: -1 | 1; materials: MascotMaterials; pulseRef: MutableRefObject<Group | null> }) {
  return (
    <group position={[side * 1.0, .015, 0]}>
      <mesh position={[side * -.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.085, .085, .16, 22]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.15, .15, .15, 30]} /><SharedMaterial material={materials.navy} /></mesh>
      <mesh position={[side * .082, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.108, .108, .032, 28]} /><SharedMaterial material={materials.whiteShade} /></mesh>
      <mesh position={[side * .103, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.071, .071, .018, 24]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh position={[side * .102, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.11, .018, 8, 28]} /><SharedMaterial material={materials.teal} /></mesh>
      <group ref={pulseRef} position={[side * .117, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[.052, .01, 8, 22]} /><SharedMaterial material={materials.teal} /></mesh>
        <StarMark size={.035} material={materials.gold} position={[side * .012, 0, 0]} rotation={[0, side * Math.PI / 2, 0]} />
      </group>
    </group>
  );
}

function Head({
  profile,
  materials,
  headRef,
  eyeLeft,
  eyeRight,
  antennaRef,
  earLeftRef,
  earRightRef,
}: {
  profile: EmotionProfile;
  materials: MascotMaterials;
  headRef: MutableRefObject<Group | null>;
  eyeLeft: MutableRefObject<Group | null>;
  eyeRight: MutableRefObject<Group | null>;
  antennaRef: MutableRefObject<Group | null>;
  earLeftRef: MutableRefObject<Group | null>;
  earRightRef: MutableRefObject<Group | null>;
}) {
  return (
    <group ref={headRef} position={[0, 1.46, 0]}>
      <RoundedMesh size={[1.88, 1.42, 1.08]} radius={.46} material={materials.white} />
      <SuperellipsePanel width={1.63} height={1.06} exponent={4} z={.548} material={materials.whiteShade} />
      <SuperellipsePanel width={1.5} height={.93} exponent={4} z={.559} material={materials.face} />
      <ForeheadAccent materials={materials} />
      <EyeMark side={-1} eyeRef={eyeLeft} profile={profile} materials={materials} />
      <EyeMark side={1} eyeRef={eyeRight} profile={profile} materials={materials} />
      <FaceBrows profile={profile} materials={materials} />
      <FaceMouth profile={profile} materials={materials} />
      <EarModule side={-1} materials={materials} pulseRef={earLeftRef} />
      <EarModule side={1} materials={materials} pulseRef={earRightRef} />
      <group ref={antennaRef} position={[.16, .68, 0]} rotation={[0, 0, -.08]}>
        <mesh position={[0, .07, 0]}><cylinderGeometry args={[.022, .027, .15, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
        <RoundedMesh size={[.15, .08, .12]} radius={.035} material={materials.teal} position={[0, .17, 0]} />
      </group>
    </group>
  );
}

function BeltEmblem({ materials }: { materials: MascotMaterials }) {
  return (
    <group position={[0, -.1, .395]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.132, .132, .045, 8]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, 0, .027]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.095, .095, .038, 8]} /><SharedMaterial material={materials.teal} /></mesh>
      <StarMark size={.064} material={materials.white} position={[0, 0, .052]} />
      <StarMark size={.033} material={materials.gold} position={[0, 0, .059]} rotation={[0, 0, Math.PI / 4]} />
    </group>
  );
}

function Torso({ materials, torsoRef }: { materials: MascotMaterials; torsoRef: MutableRefObject<Group | null> }) {
  return (
    <group ref={torsoRef}>
      <mesh position={[0, .752, 0]}><cylinderGeometry args={[.12, .145, .235, 24]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh position={[0, .678, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.13, .024, 8, 24]} /><SharedMaterial material={materials.teal} /></mesh>
      <group position={[0, .27, 0]}><TorsoShell material={materials.white} /></group>
      <VestPanel side={-1} material={materials.navy} />
      <VestPanel side={1} material={materials.navy} />
      <mesh position={[-.17, .52, .36]} rotation={[0, 0, -.72]}><capsuleGeometry args={[.028, .27, 5, 14]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[.17, .52, .36]} rotation={[0, 0, .72]}><capsuleGeometry args={[.028, .27, 5, 14]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[-.145, .5, .385]} rotation={[0, 0, -.72]}><capsuleGeometry args={[.015, .235, 5, 14]} /><SharedMaterial material={materials.teal} /></mesh>
      <mesh position={[.145, .5, .385]} rotation={[0, 0, .72]}><capsuleGeometry args={[.015, .235, 5, 14]} /><SharedMaterial material={materials.teal} /></mesh>
      <RoundedMesh size={[.18, .5, .035]} radius={.028} material={materials.white} position={[0, .21, .37]} />
      <RoundedMesh size={[.115, .47, .025]} radius={.022} material={materials.teal} position={[0, .22, .392]} />
      {[.4, .31, .22, .13, .04].map((y, index) => <mesh key={y} position={[0, y, .41]} rotation={[0, 0, Math.PI / 4]} scale={index % 2 === 0 ? [.7, .7, .7] : [.54, .54, .54]}><boxGeometry args={[.068, .068, .018]} /><SharedMaterial material={index % 2 === 0 ? materials.white : materials.gold} /></mesh>)}
      <mesh position={[0, -.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, .83, 1]}><torusGeometry args={[.44, .019, 8, 40]} /><SharedMaterial material={materials.gold} /></mesh>
      <BeltEmblem materials={materials} />
      <RoundedMesh size={[.82, .3, .5]} radius={.135} material={materials.whiteShade} position={[0, -.23, 0]} />
      <RoundedMesh size={[.66, .21, .42]} radius={.095} material={materials.navy} position={[0, -.235, .025]} />
      <mesh position={[0, -.205, .242]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.205, .016, 8, 28, Math.PI]} /><SharedMaterial material={materials.teal} /></mesh>
    </group>
  );
}

function createArmRig(): ArmRig {
  return { shoulder: null, elbow: null, wrist: null };
}

function Arm({ side, materials, rigRef, handRigRef }: { side: -1 | 1; materials: MascotMaterials; rigRef: MutableRefObject<ArmRig>; handRigRef: MutableRefObject<HandRig> }) {
  return (
    <group position={[side * .68, .48, 0]}>
      <mesh scale={[1.04, 1, .88]}><sphereGeometry args={[.205, 24, 18]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, -.012, .028]} scale={[.68, .7, .64]}><sphereGeometry args={[.19, 20, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <group ref={(node) => { rigRef.current.shoulder = node; }}>
        <mesh position={[0, -.19, 0]}><capsuleGeometry args={[.105, .18, 6, 18]} /><SharedMaterial material={materials.navy} /></mesh>
        <RoundedMesh size={[.24, .23, .22]} radius={.085} material={materials.white} position={[0, -.18, .01]} />
        <group ref={(node) => { rigRef.current.elbow = node; }} position={[0, -.4, 0]}>
          <mesh><sphereGeometry args={[.115, 20, 16]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.096, .015, 8, 22]} /><SharedMaterial material={materials.teal} /></mesh>
          <mesh position={[0, -.19, 0]}><capsuleGeometry args={[.1, .24, 6, 18]} /><SharedMaterial material={materials.white} /></mesh>
          <RoundedMesh size={[.27, .31, .235]} radius={.095} material={materials.whiteShade} position={[0, -.18, .015]} />
          <StarMark size={.033} material={materials.gold} position={[0, -.17, .12]} />
          <mesh position={[0, -.37, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.095, .02, 8, 24]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          <group ref={(node) => { rigRef.current.wrist = node; }} position={[0, -.41, 0]}>
            <MascotHand side={side} rigRef={handRigRef} materials={materials} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({ side, materials }: { side: -1 | 1; materials: MascotMaterials }) {
  return (
    <group position={[side * .22, -.28, 0]}>
      <group>
        <mesh position={[0, -.16, 0]}><capsuleGeometry args={[.145, .22, 6, 18]} /><SharedMaterial material={materials.white} /></mesh>
        <mesh position={[0, -.1, .085]} scale={[.76, 1, .44]}><sphereGeometry args={[.125, 18, 14]} /><SharedMaterial material={materials.navy} /></mesh>
        <group position={[0, -.36, 0]}>
          <mesh><sphereGeometry args={[.15, 20, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          <mesh position={[side * .11, 0, 0]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.055, .055, .035, 18]} /><SharedMaterial material={materials.teal} /></mesh>
          <group position={[0, -.16, 0]}>
            <RoundedMesh size={[.3, .36, .27]} radius={.095} material={materials.white} position={[0, -.12, 0]} />
            <StarMark size={.04} material={materials.gold} position={[0, -.1, .135]} />
            <group position={[0, -.31, .04]}>
              <mesh><sphereGeometry args={[.09, 16, 12]} /><SharedMaterial material={materials.darkJoint} /></mesh>
              <mesh position={[side * .087, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.098, .098, .035, 24]} /><SharedMaterial material={materials.white} /></mesh>
              <mesh position={[side * .106, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.077, .077, .028, 22]} /><SharedMaterial material={materials.navy} /></mesh>
              <mesh position={[side * .122, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.052, .052, .018, 20]} /><SharedMaterial material={materials.teal} /></mesh>
              <mesh position={[side * .133, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.019, .019, .012, 16]} /><SharedMaterial material={materials.gold} /></mesh>
              <RoundedMesh size={[.51, .31, .5]} radius={.15} material={materials.white} position={[0, -.105, .085]} />
              <RoundedMesh size={[.45, .18, .4]} radius={.105} material={materials.navy} position={[0, -.045, .18]} />
              <RoundedMesh size={[.53, .058, .52]} radius={.027} material={materials.teal} position={[0, -.252, .085]} />
              <StarMark size={.031} material={materials.gold} position={[0, -.025, .384]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

const jointEuler = new Euler();
const jointQuaternion = new Quaternion();

function convergeRotation(group: Group | null, target: readonly [number, number, number], damping: number) {
  if (!group) return;
  jointEuler.set(target[0], target[1], target[2], 'XYZ');
  jointQuaternion.setFromEuler(jointEuler);
  group.quaternion.slerp(jointQuaternion, damping);
}

function animateArm(rig: ArmRig, handRig: HandRig, target: ArmPoseProfile, delta: number, snap = false) {
  const damping = snap ? 1 : 1 - Math.exp(-delta * 7.5);
  convergeRotation(rig.shoulder, target.shoulder, damping);
  convergeRotation(rig.elbow, target.elbow, damping);
  convergeRotation(rig.wrist, target.wrist, damping);
  animateHandPose(handRig, target.hand, delta, target.waveCurl ?? 0, snap);
}

function Character({
  emotion,
  gazeRef,
  motionIntensity,
  handPose,
  animationKey,
  reducedMotion,
  visibleRef,
}: {
  emotion: AssistantEmotion;
  gazeRef: MutableRefObject<AssistantGaze>;
  motionIntensity: AssistantMotionIntensity;
  handPose?: AssistantHandPose;
  animationKey: number;
  reducedMotion: boolean;
  visibleRef: MutableRefObject<boolean>;
}) {
  const materials = useMascotMaterials();
  const root = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyeLeft = useRef<Group>(null);
  const eyeRight = useRef<Group>(null);
  const antenna = useRef<Group>(null);
  const earLeft = useRef<Group>(null);
  const earRight = useRef<Group>(null);
  const primaryArm = useMemo<MutableRefObject<ArmRig>>(() => ({ current: createArmRig() }), []);
  const secondaryArm = useMemo<MutableRefObject<ArmRig>>(() => ({ current: createArmRig() }), []);
  const primaryHand = useMemo<MutableRefObject<HandRig>>(() => ({ current: createHandRig() }), []);
  const secondaryHand = useMemo<MutableRefObject<HandRig>>(() => ({ current: createHandRig() }), []);
  const look = useRef({ x: 0, y: 0 });
  const animationStart = useRef(0);
  const lastAnimationKey = useRef(animationKey);
  const lastEmotion = useRef(emotion);
  const profile = emotionProfiles[emotion];
  const intensity = motionIntensityScale[motionIntensity];

  useFrame(({ clock }, delta) => {
    if (document.visibilityState !== 'visible' || !visibleRef.current) return;
    const elapsed = clock.getElapsedTime();
    if (lastAnimationKey.current !== animationKey || lastEmotion.current !== emotion) {
      lastAnimationKey.current = animationKey;
      lastEmotion.current = emotion;
      animationStart.current = elapsed;
    }
    const t = elapsed - animationStart.current;
    const processingShift = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .75) * .1 : 0;
    const emotionX = emotion === 'thinking' ? -.14 + processingShift : emotion === 'uncertain' ? .07 : 0;
    const emotionY = emotion === 'thinking' ? .13 : emotion === 'warning' ? -.05 : emotion === 'listening' ? .035 : 0;
    const gazePower = gazeRef.current.active ? .55 + gazeRef.current.strength * .45 : 0;
    const targetX = reducedMotion ? emotionX : gazeRef.current.x * gazePower + emotionX;
    const targetY = reducedMotion ? emotionY : gazeRef.current.y * gazePower + emotionY;
    const gazeDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * (gazeRef.current.active ? 7.5 : 4.2));
    look.current.x += (targetX - look.current.x) * gazeDamping;
    look.current.y += (targetY - look.current.y) * gazeDamping;

    const blinkPhase = Math.sin(t * .73 + .4);
    const blink = reducedMotion || blinkPhase < .988 ? 1 : Math.max(.08, 1 - (blinkPhase - .988) * 78);
    const eyeX = look.current.x * .07;
    const eyeY = look.current.y * .05;
    if (eyeLeft.current && eyeRight.current) {
      const asymmetry = emotion === 'uncertain' ? .02 : 0;
      const faceDamping = reducedMotion ? 1 : 1 - Math.exp(-delta * 11);
      eyeLeft.current.position.x += (-.3 + eyeX - asymmetry - eyeLeft.current.position.x) * faceDamping;
      eyeLeft.current.position.y += (.07 + eyeY + asymmetry - eyeLeft.current.position.y) * faceDamping;
      eyeRight.current.position.x += (.3 + eyeX + asymmetry - eyeRight.current.position.x) * faceDamping;
      eyeRight.current.position.y += (.07 + eyeY - asymmetry - eyeRight.current.position.y) * faceDamping;
      eyeLeft.current.scale.x += (profile.eyeScale - eyeLeft.current.scale.x) * faceDamping;
      eyeLeft.current.scale.y += (profile.eyeScale * blink - eyeLeft.current.scale.y) * faceDamping;
      eyeLeft.current.scale.z += (profile.eyeBrightness - eyeLeft.current.scale.z) * faceDamping;
      eyeRight.current.scale.x += (profile.eyeScale - eyeRight.current.scale.x) * faceDamping;
      eyeRight.current.scale.y += (profile.eyeScale * blink - eyeRight.current.scale.y) * faceDamping;
      eyeRight.current.scale.z += (profile.eyeBrightness - eyeRight.current.scale.z) * faceDamping;
    }

    if (head.current) {
      const nod = !reducedMotion && (emotion === 'explaining' || emotion === 'handoff') ? Math.sin(t * 1.55) * .03 * intensity : 0;
      const thinkTilt = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .55) * .025 * intensity : 0;
      const greetingTilt = !reducedMotion && emotion === 'greeting' && t < 2.7 ? Math.sin(Math.min(1, t / 2.7) * Math.PI) * -.055 : 0;
      convergeRotation(head.current, [
        -look.current.y * .13 + profile.headPitch + nod,
        look.current.x * .19,
        profile.headTilt + thinkTilt + greetingTilt,
      ], reducedMotion ? 1 : 1 - Math.exp(-delta * 8));
    }

    if (root.current) {
      const idleFloat = reducedMotion ? 0 : Math.sin(t * 1.02) * .023 * profile.energy * intensity;
      const happyBounce = !reducedMotion && (emotion === 'happy' || (emotion === 'greeting' && t < 2.7)) ? Math.abs(Math.sin(t * 1.5)) * .035 * intensity : 0;
      root.current.position.y = idleFloat + happyBounce;
      root.current.rotation.x = emotion === 'listening' ? -.025 : emotion === 'warning' ? .012 : 0;
      root.current.rotation.y = reducedMotion ? 0 : Math.sin(t * .32) * .012 * profile.energy * intensity;
    }

    if (torso.current) {
      const breath = reducedMotion ? 0 : Math.sin(t * 1.25) * .008 * profile.energy * intensity;
      torso.current.scale.set(1 + breath, 1 + breath, 1 + breath * .4);
    }

    if (antenna.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * (emotion === 'thinking' ? 1.8 : 1.25)) * (emotion === 'thinking' ? .07 : .025) * intensity;
      antenna.current.scale.setScalar(pulse);
      antenna.current.rotation.z = -.08 + (!reducedMotion && (emotion === 'thinking' || emotion === 'listening') ? Math.sin(t * .85) * .025 : 0);
    }

    const earPulse = !reducedMotion && emotion === 'listening' ? 1 + Math.sin(t * 2.2) * .03 : 1;
    earLeft.current?.scale.setScalar(1);
    earRight.current?.scale.setScalar(earPulse);

    const pose = resolveMascotPose(emotion, t, intensity, reducedMotion, handPose);
    animateArm(primaryArm.current, primaryHand.current, pose.primaryArm, delta, reducedMotion);
    animateArm(secondaryArm.current, secondaryHand.current, pose.secondaryArm, delta, reducedMotion);
  });

  return (
    <group ref={root}>
      <Head profile={profile} materials={materials} headRef={head} eyeLeft={eyeLeft} eyeRight={eyeRight} antennaRef={antenna} earLeftRef={earLeft} earRightRef={earRight} />
      <Torso materials={materials} torsoRef={torso} />
      <Arm side={-1} materials={materials} rigRef={primaryArm} handRigRef={primaryHand} />
      <Arm side={1} materials={materials} rigRef={secondaryArm} handRigRef={secondaryHand} />
      <Leg side={-1} materials={materials} />
      <Leg side={1} materials={materials} />
      <pointLight position={[0, 1.35, 1.75]} color={mascotPalette.cyan} intensity={.22 + profile.eyeBrightness * .16} distance={3.1} />
    </group>
  );
}

function CanvasDiagnostics() {
  const gl = useThree((state) => state.gl);
  const canvas = gl.domElement;
  const id = useId();
  const frames = useRef(0);

  useEffect(() => {
    const rendererId = id;
    const qa = window.__MRESALAT_MASCOT_QA__ ?? { liveCanvases: 0, renderers: {}, contextLost: 0, contextRestored: 0 };
    qa.contextLost ??= 0;
    qa.contextRestored ??= 0;
    window.__MRESALAT_MASCOT_QA__ = qa;
    qa.liveCanvases += 1;
    document.documentElement.dataset.mascotLiveCanvases = String(qa.liveCanvases);
    document.documentElement.dataset.mascotContextLost = String(qa.contextLost);
    document.documentElement.dataset.mascotContextRestored = String(qa.contextRestored);
    const handleContextLost = () => {
      qa.contextLost += 1;
      document.documentElement.dataset.mascotContextLost = String(qa.contextLost);
    };
    const handleContextRestored = () => {
      qa.contextRestored += 1;
      document.documentElement.dataset.mascotContextRestored = String(qa.contextRestored);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      delete qa.renderers[rendererId];
      qa.liveCanvases = Math.max(0, qa.liveCanvases - 1);
      document.documentElement.dataset.mascotLiveCanvases = String(qa.liveCanvases);
    };
  }, [canvas, id]);

  useFrame(() => {
    frames.current += 1;
    if (frames.current % 30 !== 0 || !window.__MRESALAT_MASCOT_QA__) return;
    const stats = {
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
      programs: gl.info.programs?.length ?? 0,
    };
    window.__MRESALAT_MASCOT_QA__.renderers[id] = stats;
    document.documentElement.dataset.mascotRendererGeometries = String(stats.geometries);
    document.documentElement.dataset.mascotRendererTextures = String(stats.textures);
    document.documentElement.dataset.mascotRendererPrograms = String(stats.programs);
  });
  return null;
}

function updatePerspectiveFov(camera: PerspectiveCamera, fov: number) {
  camera.fov = fov;
}

function CameraRig({ mode, view, debugView }: { mode: AssistantCharacterMode; view: AssistantView; debugView: AssistantDebugView }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    const faceOnly = debugView === 'face';
    const radius = faceOnly ? 3.15 : mode === 'portrait' ? 4.05 : 6.35;
    const targetY = faceOnly ? 1.3 : mode === 'portrait' ? 1.15 : .32;
    const angle = view === 'front' ? 0 : view === 'three-quarter' ? Math.PI / 4 : view === 'side' ? Math.PI / 2 : view === 'opposite-side' ? -Math.PI / 2 : Math.PI;
    camera.position.set(Math.sin(angle) * radius, targetY + (faceOnly ? .03 : .15), Math.cos(angle) * radius);
    if (camera instanceof PerspectiveCamera) updatePerspectiveFov(camera, faceOnly ? 28 : mode === 'portrait' ? 30 : 33);
    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
  }, [camera, debugView, mode, view]);
  return null;
}

export default function SmartAssistantCanvas({
  emotion,
  mode,
  gazeRef,
  motionIntensity,
  handPose,
  view,
  debugView,
  animationKey,
  reducedMotion,
  visibleRef,
}: {
  emotion: AssistantEmotion;
  mode: AssistantCharacterMode;
  gazeRef: MutableRefObject<AssistantGaze>;
  motionIntensity: AssistantMotionIntensity;
  handPose?: AssistantHandPose;
  view: AssistantView;
  debugView: AssistantDebugView;
  animationKey: number;
  reducedMotion: boolean;
  visibleRef: MutableRefObject<boolean>;
}) {
  return (
    <Canvas
      aria-hidden="true"
      camera={initialCamera}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={canvasGlOptions}
    >
      <ambientLight intensity={1.45} />
      <directionalLight position={[3.5, 4.5, 5]} intensity={1.7} color="#e8f5ff" />
      <directionalLight position={[-3, 1.5, 2.5]} intensity={.5} color={mascotPalette.teal} />
      <directionalLight position={[1, 2, -4]} intensity={.65} color="#cbdcff" />
      <CameraRig mode={mode} view={view} debugView={debugView} />
      <Character emotion={emotion} gazeRef={gazeRef} motionIntensity={motionIntensity} handPose={handPose} animationKey={animationKey} reducedMotion={reducedMotion} visibleRef={visibleRef} />
      <CanvasDiagnostics />
    </Canvas>
  );
}
