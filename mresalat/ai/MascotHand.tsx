'use client';

import type { Material, Group } from 'three';
import type { MutableRefObject } from 'react';
import type { AssistantHandPose } from './mascot';
import { handPoseProfiles } from './mascot';

type DigitName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export type HandRig = {
  hand: Group | null;
  digits: Record<DigitName, { root: Group | null; joints: [Group | null, Group | null, Group | null] }>;
};

export type MascotHandMaterials = {
  darkJoint: Material;
  navy: Material;
  teal: Material;
  white: Material;
};

const digitNames: DigitName[] = ['index', 'middle', 'ring', 'pinky'];

export function createHandRig(): HandRig {
  const digit = () => ({ root: null, joints: [null, null, null] as [Group | null, Group | null, Group | null] });
  return { hand: null, digits: { thumb: digit(), index: digit(), middle: digit(), ring: digit(), pinky: digit() } };
}

function SharedMaterial({ material }: { material: Material }) {
  return <primitive object={material} attach="material" />;
}

function Finger({ name, x, rigRef, materials }: { name: DigitName; x: number; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  return (
    <group ref={(node) => { rigRef.current.digits[name].root = node; }} position={[x, -.105, .008]}>
      <group ref={(node) => { rigRef.current.digits[name].joints[0] = node; }}>
        <mesh position={[0, -.043, 0]}><capsuleGeometry args={[.026, .045, 4, 10]} /><SharedMaterial material={materials.darkJoint} /></mesh>
        <mesh position={[0, -.078, 0]}><cylinderGeometry args={[.027, .027, .015, 12]} /><SharedMaterial material={materials.teal} /></mesh>
        <group ref={(node) => { rigRef.current.digits[name].joints[1] = node; }} position={[0, -.083, 0]}>
          <mesh position={[0, -.038, 0]}><capsuleGeometry args={[.024, .04, 4, 10]} /><SharedMaterial material={materials.navy} /></mesh>
          <mesh position={[0, -.069, 0]}><cylinderGeometry args={[.025, .025, .014, 12]} /><SharedMaterial material={materials.teal} /></mesh>
          <group ref={(node) => { rigRef.current.digits[name].joints[2] = node; }} position={[0, -.073, 0]}>
            <mesh position={[0, -.033, 0]}><capsuleGeometry args={[.022, .036, 4, 10]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Thumb({ side, rigRef, materials }: { side: -1 | 1; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  return (
    <group ref={(node) => { rigRef.current.digits.thumb.root = node; }} position={[side * .13, -.015, .015]} rotation={[0, 0, side * -.72]}>
      <group ref={(node) => { rigRef.current.digits.thumb.joints[0] = node; }}>
        <mesh position={[0, -.043, 0]}><capsuleGeometry args={[.028, .05, 4, 10]} /><SharedMaterial material={materials.darkJoint} /></mesh>
        <mesh position={[0, -.08, 0]}><cylinderGeometry args={[.029, .029, .015, 12]} /><SharedMaterial material={materials.teal} /></mesh>
        <group ref={(node) => { rigRef.current.digits.thumb.joints[1] = node; }} position={[0, -.084, 0]}>
          <mesh position={[0, -.035, 0]}><capsuleGeometry args={[.025, .038, 4, 10]} /><SharedMaterial material={materials.navy} /></mesh>
          <group ref={(node) => { rigRef.current.digits.thumb.joints[2] = node; }} position={[0, -.07, 0]} />
        </group>
      </group>
    </group>
  );
}

export function MascotHand({ side, rigRef, materials }: { side: -1 | 1; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  const offsets = [-.098, -.034, .034, .098];
  return (
    <group ref={(node) => { rigRef.current.hand = node; }} scale={1.12}>
      <mesh position={[0, .065, 0]}><cylinderGeometry args={[.11, .115, .085, 20]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, .022, 0]}><torusGeometry args={[.093, .014, 8, 24]} /><SharedMaterial material={materials.teal} /></mesh>
      <mesh position={[0, -.055, 0]} scale={[1.18, 1, .62]}><capsuleGeometry args={[.09, .06, 6, 16]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh position={[0, -.052, .06]} scale={[.76, .7, .2]}><sphereGeometry args={[.1, 14, 10]} /><SharedMaterial material={materials.navy} /></mesh>
      {digitNames.map((name, index) => <Finger key={name} name={name} x={offsets[index]} rigRef={rigRef} materials={materials} />)}
      <Thumb side={side} rigRef={rigRef} materials={materials} />
    </group>
  );
}

const spreadDirections: Record<DigitName, number> = { thumb: 0, index: 1.35, middle: .42, ring: -.42, pinky: -1.35 };

export function animateHandPose(rig: HandRig, pose: AssistantHandPose, delta: number, side: -1 | 1, waveCurl = 0, snap = false) {
  const profile = handPoseProfiles[pose];
  const names: DigitName[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];
  const damping = snap ? 1 : 1 - Math.exp(-delta * 12);

  names.forEach((name, digitIndex) => {
    const digit = rig.digits[name];
    const curl = profile.curls[digitIndex] + (name === 'thumb' ? 0 : waveCurl);
    digit.joints.forEach((joint, jointIndex) => {
      if (!joint) return;
      const multiplier = jointIndex === 0 ? .58 : jointIndex === 1 ? .76 : .62;
      joint.rotation.x += (curl * multiplier - joint.rotation.x) * damping;
    });
    if (digit.root) {
      const spread = name === 'thumb'
        ? side * (-.72 - profile.thumbLift * .42)
        : spreadDirections[name] * profile.spread;
      digit.root.rotation.z += (spread - digit.root.rotation.z) * damping;
      digit.root.rotation.y += ((name === 'thumb' ? side * profile.thumbLift * .2 : 0) - digit.root.rotation.y) * damping;
    }
  });
}
