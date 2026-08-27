'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Shape,
  ShapeGeometry,
  type Group,
  type Material,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { MascotHand, animateHandPose, createHandRig, type HandRig, type MascotHandMaterials } from './MascotHand';
import {
  emotionProfiles,
  mascotPalette,
  motionIntensityScale,
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
  glowHalo: Material;
};

type ArmRig = {
  shoulder: Group | null;
  elbow: Group | null;
  wrist: Group | null;
};

type ArmTarget = {
  shoulderX: number;
  shoulderY: number;
  shoulderZ: number;
  elbowX: number;
  elbowZ: number;
  wristX: number;
  wristY: number;
  wristZ: number;
  pose: AssistantHandPose;
  waveCurl?: number;
};

function SharedMaterial({ material }: { material: Material }) {
  return <primitive object={material} attach="material" />;
}

function RoundedBox({ size, radius, smoothness = 5 }: { size: [number, number, number]; radius: number; smoothness?: number }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(size[0], size[1], size[2], smoothness, radius), [radius, size, smoothness]);
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
    glowHalo: new MeshBasicMaterial({ color: mascotPalette.teal, transparent: true, opacity: .11, depthWrite: false, toneMapped: false }),
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
        <mesh position={[0, 0, -.012]} scale={[1.62, 1.94, .2]}><sphereGeometry args={[.09, 16, 12]} /><SharedMaterial material={materials.glowHalo} /></mesh>
      </group>
      <group visible={crescent} position={[0, -.015, 0]}>
        <mesh rotation={[0, 0, 0]}><torusGeometry args={[.09, .022, 8, 26, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, 0, -.01]} scale={[1.28, 1.28, .4]}><torusGeometry args={[.09, .025, 8, 22, Math.PI]} /><SharedMaterial material={materials.glowHalo} /></mesh>
      </group>
    </group>
  );
}

function FaceMouth({ profile, materials }: { profile: EmotionProfile; materials: MascotMaterials }) {
  return (
    <group position={[0, -.19, .62]}>
      <group visible={profile.mouthShape === 'smile'} rotation={[0, 0, Math.PI]} scale={[1, .52, .8]}>
        <mesh><torusGeometry args={[.19, .022, 8, 32, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'soft-smile'} rotation={[0, 0, Math.PI]} scale={[.82, .36, .8]}>
        <mesh><torusGeometry args={[.18, .021, 8, 30, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'open-smile'}>
        <mesh scale={[1.5, .72, .25]}><sphereGeometry args={[.105, 20, 14]} /><SharedMaterial material={materials.faceGlow} /></mesh>
        <mesh position={[0, .028, .005]} scale={[1.15, .5, .25]}><sphereGeometry args={[.105, 18, 12]} /><SharedMaterial material={materials.face} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'neutral'}>
        <mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.016, .17, 4, 12]} /><SharedMaterial material={materials.faceGlow} /></mesh>
      </group>
      <group visible={profile.mouthShape === 'worried'} scale={[.84, .42, .8]}>
        <mesh><torusGeometry args={[.18, .022, 8, 30, Math.PI]} /><SharedMaterial material={materials.faceGlow} /></mesh>
      </group>
    </group>
  );
}

function FaceBrows({ profile, materials }: { profile: EmotionProfile; materials: MascotMaterials }) {
  if (profile.browShape === 'hidden') return null;
  const rotations: Record<Exclude<EmotionProfile['browShape'], 'hidden'>, [number, number]> = {
    raised: [-.08, .08],
    thinking: [-.13, -.02],
    warning: [.18, -.18],
    worried: [-.2, .12],
  };
  const [left, right] = rotations[profile.browShape];
  return <>{([-1, 1] as const).map((side) => (
    <mesh key={side} position={[side * .3, .29 + (profile.browShape === 'worried' && side === -1 ? .035 : 0), .62]} rotation={[0, 0, Math.PI / 2 + (side === -1 ? left : right)]}>
      <capsuleGeometry args={[.012, .15, 4, 10]} /><SharedMaterial material={materials.faceGlow} />
    </mesh>
  ))}</>;
}

function EarModule({ side, materials, pulseRef }: { side: -1 | 1; materials: MascotMaterials; pulseRef: MutableRefObject<Group | null> }) {
  return (
    <group position={[side * .89, .02, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.205, .205, .12, 28]} /><SharedMaterial material={materials.navy} /></mesh>
      <mesh position={[side * .065, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.158, .158, .055, 28]} /><SharedMaterial material={materials.teal} /></mesh>
      <mesh position={[side * .098, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.105, .105, .028, 24]} /><SharedMaterial material={materials.whiteShade} /></mesh>
      <group ref={pulseRef} position={[side * .116, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[.118, .012, 8, 24]} /><SharedMaterial material={materials.teal} /></mesh>
        <StarMark size={.055} material={materials.gold} position={[side * .016, 0, 0]} rotation={[0, side * Math.PI / 2, 0]} />
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
    <group ref={headRef} position={[0, 1.31, 0]}>
      <RoundedMesh size={[1.72, 1.24, 1]} radius={.28} material={materials.white} />
      <RoundedMesh size={[1.43, .91, .18]} radius={.23} material={materials.face} position={[0, -.035, .49]} />
      <RoundedMesh size={[.54, .23, .07]} radius={.085} material={materials.teal} position={[0, .5, .52]} />
      <StarMark size={.07} material={materials.gold} position={[0, .47, .566]} />
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
    <group position={[0, -.1, .385]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.145, .145, .055, 6]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, 0, .032]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.105, .105, .045, 8]} /><SharedMaterial material={materials.teal} /></mesh>
      <StarMark size={.073} material={materials.white} position={[0, 0, .06]} />
      <StarMark size={.036} material={materials.gold} position={[0, 0, .066]} rotation={[0, 0, Math.PI / 4]} />
    </group>
  );
}

function Torso({ materials, torsoRef }: { materials: MascotMaterials; torsoRef: MutableRefObject<Group | null> }) {
  return (
    <group ref={torsoRef}>
      <mesh position={[0, .69, 0]}><cylinderGeometry args={[.115, .145, .16, 24]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh position={[0, .67, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.125, .022, 8, 24]} /><SharedMaterial material={materials.teal} /></mesh>
      <RoundedMesh size={[.94, .82, .6]} radius={.2} material={materials.white} position={[0, .27, 0]} />
      <RoundedMesh size={[.78, .68, .095]} radius={.15} material={materials.navy} position={[0, .29, .31]} />
      <mesh position={[-.17, .55, .37]} rotation={[0, 0, -.66]}><capsuleGeometry args={[.018, .31, 4, 12]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[.17, .55, .37]} rotation={[0, 0, .66]}><capsuleGeometry args={[.018, .31, 4, 12]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[-.13, .54, .385]} rotation={[0, 0, -.66]}><capsuleGeometry args={[.012, .27, 4, 12]} /><SharedMaterial material={materials.teal} /></mesh>
      <mesh position={[.13, .54, .385]} rotation={[0, 0, .66]}><capsuleGeometry args={[.012, .27, 4, 12]} /><SharedMaterial material={materials.teal} /></mesh>
      <RoundedMesh size={[.12, .47, .035]} radius={.025} material={materials.white} position={[0, .25, .375]} />
      {[.41, .28, .15].map((y, index) => <mesh key={y} position={[0, y, .4]} rotation={[0, 0, Math.PI / 4]} scale={index === 1 ? [1, 1, 1] : [.72, .72, .72]}><boxGeometry args={[.072, .072, .02]} /><SharedMaterial material={index === 1 ? materials.teal : materials.gold} /></mesh>)}
      <RoundedMesh size={[.84, .07, .055]} radius={.025} material={materials.gold} position={[0, -.1, .335]} />
      <BeltEmblem materials={materials} />
      <RoundedMesh size={[.65, .25, .44]} radius={.11} material={materials.navy} position={[0, -.23, 0]} />
      <mesh position={[0, -.21, .24]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.22, .018, 8, 28, Math.PI]} /><SharedMaterial material={materials.teal} /></mesh>
    </group>
  );
}

function createArmRig(): ArmRig {
  return { shoulder: null, elbow: null, wrist: null };
}

function Arm({ side, materials, rigRef, handRigRef }: { side: -1 | 1; materials: MascotMaterials; rigRef: MutableRefObject<ArmRig>; handRigRef: MutableRefObject<HandRig> }) {
  return (
    <group position={[side * .57, .48, 0]}>
      <mesh scale={[.96, 1, .82]}><sphereGeometry args={[.17, 22, 16]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, 0, .03]} scale={[.68, .72, .66]}><sphereGeometry args={[.16, 20, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <group ref={(node) => { rigRef.current.shoulder = node; }}>
        <mesh position={[0, -.2, 0]}><capsuleGeometry args={[.095, .21, 6, 16]} /><SharedMaterial material={materials.navy} /></mesh>
        <RoundedMesh size={[.22, .25, .2]} radius={.075} material={materials.white} position={[0, -.18, .01]} />
        <group ref={(node) => { rigRef.current.elbow = node; }} position={[0, -.4, 0]}>
          <mesh><sphereGeometry args={[.105, 18, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.088, .014, 8, 20]} /><SharedMaterial material={materials.teal} /></mesh>
          <mesh position={[0, -.19, 0]}><capsuleGeometry args={[.088, .23, 6, 16]} /><SharedMaterial material={materials.white} /></mesh>
          <RoundedMesh size={[.23, .28, .2]} radius={.07} material={materials.whiteShade} position={[0, -.18, .015]} />
          <StarMark size={.033} material={materials.gold} position={[0, -.17, .12]} />
          <group ref={(node) => { rigRef.current.wrist = node; }} position={[0, -.4, 0]}>
            <MascotHand side={side} rigRef={handRigRef} materials={materials} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({ side, materials }: { side: -1 | 1; materials: MascotMaterials }) {
  return (
    <group position={[side * .2, -.28, 0]}>
      <group>
        <mesh position={[0, -.16, 0]}><capsuleGeometry args={[.13, .2, 6, 18]} /><SharedMaterial material={materials.white} /></mesh>
        <mesh position={[0, -.1, .08]} scale={[.72, 1, .42]}><sphereGeometry args={[.11, 16, 12]} /><SharedMaterial material={materials.navy} /></mesh>
        <group position={[0, -.36, 0]}>
          <mesh><sphereGeometry args={[.14, 20, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          <mesh position={[side * .11, 0, 0]} rotation={[0, Math.PI / 2, 0]}><cylinderGeometry args={[.055, .055, .035, 18]} /><SharedMaterial material={materials.teal} /></mesh>
          <group position={[0, -.16, 0]}>
            <RoundedMesh size={[.27, .34, .24]} radius={.085} material={materials.white} position={[0, -.12, 0]} />
            <StarMark size={.04} material={materials.gold} position={[0, -.1, .135]} />
            <group position={[0, -.31, .04]}>
              <mesh><sphereGeometry args={[.09, 16, 12]} /><SharedMaterial material={materials.darkJoint} /></mesh>
              <RoundedMesh size={[.38, .22, .52]} radius={.105} material={materials.white} position={[0, -.09, .1]} />
              <RoundedMesh size={[.34, .13, .42]} radius={.075} material={materials.navy} position={[0, -.055, .18]} />
              <RoundedMesh size={[.4, .045, .54]} radius={.018} material={materials.teal} position={[0, -.205, .1]} />
              <StarMark size={.032} material={materials.gold} position={[0, -.04, .405]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
}

function baseArm(side: -1 | 1, pose: AssistantHandPose = 'relaxed'): ArmTarget {
  return { shoulderX: 0, shoulderY: 0, shoulderZ: side * .12, elbowX: 0, elbowZ: 0, wristX: 0, wristY: 0, wristZ: 0, pose };
}

function armTargets(emotion: AssistantEmotion, t: number, intensity: number, reducedMotion: boolean, handPose?: AssistantHandPose) {
  const primary = baseArm(-1, handPose ?? emotionProfiles[emotion].primaryHand);
  const secondary = baseArm(1, handPose ?? emotionProfiles[emotion].secondaryHand);
  const gesture = reducedMotion ? 0 : 1;

  if (handPose) {
    primary.shoulderX = -.2;
    primary.shoulderZ = -2.15;
    primary.elbowX = -.88;
    primary.wristX = -.34;
    primary.wristY = .18;
    primary.wristZ = 0;
    secondary.shoulderX = -.14;
    secondary.shoulderZ = .72;
    secondary.elbowX = -.5;
    secondary.wristX = -.26;
    secondary.wristZ = 0;
    return { primary, secondary };
  }

  if (emotion === 'greeting') {
    const cycle = reducedMotion ? .42 : (t % 4.8) / 4.8;
    const raised = reducedMotion ? 1 : smoothstep(.06, .25, cycle) * (1 - smoothstep(.78, .96, cycle));
    const wave = gesture * Math.sin((cycle - .25) * Math.PI * 8) * raised;
    primary.shoulderX = .16 * raised;
    primary.shoulderZ = -.12 + (-2.36 + .12) * raised;
    primary.elbowX = -.58 * raised;
    primary.wristY = .18 * raised;
    primary.wristZ = wave * .32 * intensity;
    primary.waveCurl = Math.max(0, wave) * .12;
  } else if (emotion === 'listening') {
    secondary.shoulderX = -.1;
    secondary.shoulderZ = 2.03;
    secondary.elbowX = -1.08;
    secondary.wristY = -.28;
    secondary.wristZ = -.12;
  } else if (emotion === 'thinking') {
    secondary.shoulderX = -.16;
    secondary.shoulderZ = 1.75;
    secondary.elbowX = -1.28;
    secondary.wristY = -.35;
    secondary.wristZ = .12;
  } else if (emotion === 'explaining') {
    const talk = gesture * Math.sin(t * 1.55) * .1 * intensity;
    primary.shoulderX = -.32;
    primary.shoulderZ = -1.05 + talk;
    primary.elbowX = -.82;
    primary.wristX = -.3;
    primary.wristY = .28;
    primary.wristZ = -.08 - talk;
    secondary.shoulderX = -.18;
    secondary.shoulderZ = .58 - talk * .5;
    secondary.elbowX = -.48;
    secondary.wristX = -.22;
    secondary.wristZ = .08;
  } else if (emotion === 'happy') {
    primary.shoulderZ = -1.02;
    secondary.shoulderZ = 1.02;
    primary.elbowX = secondary.elbowX = -.48;
    primary.wristZ = -.08;
    secondary.wristZ = .08;
  } else if (emotion === 'warning') {
    primary.shoulderX = -.28;
    primary.shoulderZ = -1.58;
    primary.elbowX = -.82;
    primary.wristX = -.35;
    primary.wristZ = 0;
  } else if (emotion === 'uncertain') {
    primary.shoulderX = secondary.shoulderX = -.28;
    primary.shoulderZ = -.84;
    secondary.shoulderZ = .84;
    primary.elbowX = secondary.elbowX = -.56;
    primary.wristX = secondary.wristX = -.48;
    primary.wristZ = -.06;
    secondary.wristZ = .06;
  } else if (emotion === 'handoff') {
    primary.shoulderX = -.32;
    primary.shoulderZ = -1.18;
    primary.elbowX = -.76;
    primary.wristX = -.36;
    primary.wristY = .22;
    primary.wristZ = -.06;
  }
  return { primary, secondary };
}

function animateArm(rig: ArmRig, handRig: HandRig, target: ArmTarget, delta: number, side: -1 | 1, snap = false) {
  const damping = snap ? 1 : 1 - Math.exp(-delta * 7.5);
  if (rig.shoulder) {
    rig.shoulder.rotation.x += (target.shoulderX - rig.shoulder.rotation.x) * damping;
    rig.shoulder.rotation.y += (target.shoulderY - rig.shoulder.rotation.y) * damping;
    rig.shoulder.rotation.z += (target.shoulderZ - rig.shoulder.rotation.z) * damping;
  }
  if (rig.elbow) {
    rig.elbow.rotation.x += (target.elbowX - rig.elbow.rotation.x) * damping;
    rig.elbow.rotation.z += (target.elbowZ - rig.elbow.rotation.z) * damping;
  }
  if (rig.wrist) {
    rig.wrist.rotation.x += (target.wristX - rig.wrist.rotation.x) * damping;
    rig.wrist.rotation.y += (target.wristY - rig.wrist.rotation.y) * damping;
    rig.wrist.rotation.z += (target.wristZ - rig.wrist.rotation.z) * damping;
  }
  animateHandPose(handRig, target.pose, delta, side, target.waveCurl ?? 0, snap);
}

function Character({
  emotion,
  gazeRef,
  motionIntensity,
  handPose,
  animationKey,
  reducedMotion,
}: {
  emotion: AssistantEmotion;
  gazeRef: MutableRefObject<AssistantGaze>;
  motionIntensity: AssistantMotionIntensity;
  handPose?: AssistantHandPose;
  animationKey: number;
  reducedMotion: boolean;
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
  const profile = emotionProfiles[emotion];
  const intensity = motionIntensityScale[motionIntensity];

  useFrame(({ clock }, delta) => {
    if (document.visibilityState !== 'visible') return;
    const elapsed = clock.getElapsedTime();
    if (lastAnimationKey.current !== animationKey) {
      lastAnimationKey.current = animationKey;
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
      eyeLeft.current.position.set(-.3 + eyeX - asymmetry, .07 + eyeY + asymmetry, .61);
      eyeRight.current.position.set(.3 + eyeX + asymmetry, .07 + eyeY - asymmetry, .61);
      eyeLeft.current.scale.set(profile.eyeScale, profile.eyeScale * blink, profile.eyeBrightness);
      eyeRight.current.scale.set(profile.eyeScale, profile.eyeScale * blink, profile.eyeBrightness);
    }

    if (head.current) {
      const nod = !reducedMotion && (emotion === 'explaining' || emotion === 'handoff') ? Math.sin(t * 1.55) * .03 * intensity : 0;
      const thinkTilt = !reducedMotion && emotion === 'thinking' ? Math.sin(t * .55) * .025 * intensity : 0;
      head.current.rotation.y = look.current.x * .19;
      head.current.rotation.x = -look.current.y * .13 + profile.headPitch + nod;
      head.current.rotation.z = profile.headTilt + thinkTilt;
    }

    if (root.current) {
      const idleFloat = reducedMotion ? 0 : Math.sin(t * 1.02) * .023 * profile.energy * intensity;
      const happyBounce = !reducedMotion && (emotion === 'happy' || emotion === 'greeting') ? Math.abs(Math.sin(t * 1.5)) * .035 * intensity : 0;
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

    const earPulse = !reducedMotion && emotion === 'listening' ? 1 + Math.sin(t * 2.2) * .12 : 1;
    earLeft.current?.scale.setScalar(earPulse);
    earRight.current?.scale.setScalar(earPulse);

    const targets = armTargets(emotion, t, intensity, reducedMotion, handPose);
    animateArm(primaryArm.current, primaryHand.current, targets.primary, delta, -1, reducedMotion);
    animateArm(secondaryArm.current, secondaryHand.current, targets.secondary, delta, 1, reducedMotion);
  });

  return (
    <group ref={root}>
      <Head profile={profile} materials={materials} headRef={head} eyeLeft={eyeLeft} eyeRight={eyeRight} antennaRef={antenna} earLeftRef={earLeft} earRightRef={earRight} />
      <Torso materials={materials} torsoRef={torso} />
      <Arm side={-1} materials={materials} rigRef={primaryArm} handRigRef={primaryHand} />
      <Arm side={1} materials={materials} rigRef={secondaryArm} handRigRef={secondaryHand} />
      <Leg side={-1} materials={materials} />
      <Leg side={1} materials={materials} />
      <pointLight position={[0, 1.25, 2]} color={mascotPalette.cyan} intensity={.5 + profile.eyeBrightness * .32} distance={3.7} />
    </group>
  );
}

function CameraRig({ mode, view, debugView }: { mode: AssistantCharacterMode; view: AssistantView; debugView: AssistantDebugView }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    const faceOnly = debugView === 'face';
    const radius = faceOnly ? 3.15 : mode === 'portrait' ? 4.05 : 6.35;
    const targetY = faceOnly ? 1.3 : mode === 'portrait' ? 1.15 : .32;
    const angle = view === 'front' ? 0 : view === 'three-quarter' ? Math.PI / 4 : view === 'side' ? Math.PI / 2 : Math.PI;
    camera.position.set(Math.sin(angle) * radius, targetY + (faceOnly ? .03 : .15), Math.cos(angle) * radius);
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
}) {
  const faceOnly = debugView === 'face';
  const camera = { position: [0, faceOnly ? 1.33 : mode === 'portrait' ? 1.3 : .48, faceOnly ? 3.15 : mode === 'portrait' ? 4.05 : 6.35] as [number, number, number], fov: faceOnly ? 28 : mode === 'portrait' ? 30 : 33 };
  return (
    <Canvas
      key={`${mode}-${debugView}`}
      aria-hidden="true"
      camera={camera}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={1.45} />
      <directionalLight position={[3.5, 4.5, 5]} intensity={1.7} color="#e8f5ff" />
      <directionalLight position={[-3, 1.5, 2.5]} intensity={.5} color={mascotPalette.teal} />
      <directionalLight position={[1, 2, -4]} intensity={.65} color="#cbdcff" />
      <CameraRig mode={mode} view={view} debugView={debugView} />
      <Character emotion={emotion} gazeRef={gazeRef} motionIntensity={motionIntensity} handPose={handPose} animationKey={animationKey} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
