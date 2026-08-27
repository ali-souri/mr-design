'use client';

import type { Material, Group } from 'three';
import type { MutableRefObject } from 'react';
import type { AssistantHandPose } from './mascot';
import { handPoseProfiles } from './mascot';

type DigitName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
type FingerName = Exclude<DigitName, 'thumb'>;

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

const digitNames: FingerName[] = ['index', 'middle', 'ring', 'pinky'];

export function createHandRig(): HandRig {
  const digit = () => ({ root: null, joints: [null, null, null] as [Group | null, Group | null, Group | null] });
  return { hand: null, digits: { thumb: digit(), index: digit(), middle: digit(), ring: digit(), pinky: digit() } };
}

function SharedMaterial({ material }: { material: Material }) {
  return <primitive object={material} attach="material" />;
}

function Finger({ name, x, length, rigRef, materials }: { name: DigitName; x: number; length: number; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  const proximal = .052 * length;
  const middle = .044 * length;
  const distal = .038 * length;
  return (
    <group ref={(node) => { rigRef.current.digits[name].root = node; }} position={[x, -.11, .035]}>
      <group ref={(node) => { rigRef.current.digits[name].joints[0] = node; }}>
        <mesh position={[0, -proximal * .55, 0]}><capsuleGeometry args={[.03, proximal, 5, 12]} /><SharedMaterial material={materials.darkJoint} /></mesh>
        <mesh position={[0, -proximal, 0]}><cylinderGeometry args={[.031, .031, .017, 12]} /><SharedMaterial material={materials.teal} /></mesh>
        <group ref={(node) => { rigRef.current.digits[name].joints[1] = node; }} position={[0, -proximal - .006, 0]}>
          <mesh position={[0, -middle * .55, 0]}><capsuleGeometry args={[.027, middle, 5, 12]} /><SharedMaterial material={materials.navy} /></mesh>
          <mesh position={[0, -middle, 0]}><cylinderGeometry args={[.028, .028, .016, 12]} /><SharedMaterial material={materials.teal} /></mesh>
          <group ref={(node) => { rigRef.current.digits[name].joints[2] = node; }} position={[0, -middle - .006, 0]}>
            <mesh position={[0, -distal * .55, .002]}><capsuleGeometry args={[.024, distal, 5, 12]} /><SharedMaterial material={materials.darkJoint} /></mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Thumb({ side, rigRef, materials }: { side: -1 | 1; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  return (
    <group ref={(node) => { rigRef.current.digits.thumb.root = node; }} position={[side * .145, -.015, .04]} rotation={[0, side * .35, side * -.66]}>
      <group ref={(node) => { rigRef.current.digits.thumb.joints[0] = node; }}>
        <mesh position={[0, -.036, 0]}><capsuleGeometry args={[.032, .052, 5, 12]} /><SharedMaterial material={materials.darkJoint} /></mesh>
        <mesh position={[0, -.071, 0]}><cylinderGeometry args={[.032, .032, .017, 12]} /><SharedMaterial material={materials.teal} /></mesh>
        <group ref={(node) => { rigRef.current.digits.thumb.joints[1] = node; }} position={[0, -.078, 0]}>
          <mesh position={[0, -.034, 0]}><capsuleGeometry args={[.028, .043, 5, 12]} /><SharedMaterial material={materials.navy} /></mesh>
          <group ref={(node) => { rigRef.current.digits.thumb.joints[2] = node; }} position={[0, -.068, 0]} />
        </group>
      </group>
    </group>
  );
}

export function MascotHand({ side, rigRef, materials }: { side: -1 | 1; rigRef: MutableRefObject<HandRig>; materials: MascotHandMaterials }) {
  const digits = [
    { name: 'index' as const, x: -.108, length: .98 },
    { name: 'middle' as const, x: -.036, length: 1.08 },
    { name: 'ring' as const, x: .036, length: 1.04 },
    { name: 'pinky' as const, x: .108, length: .88 },
  ];
  return (
    <group ref={(node) => { rigRef.current.hand = node; }} scale={1.16}>
      <mesh position={[0, .07, 0]}><cylinderGeometry args={[.118, .124, .09, 22]} /><SharedMaterial material={materials.white} /></mesh>
      <mesh position={[0, .018, 0]}><torusGeometry args={[.1, .015, 8, 28]} /><SharedMaterial material={materials.teal} /></mesh>
      <mesh position={[0, -.055, .012]} scale={[1.42, 1.12, .68]}><sphereGeometry args={[.102, 20, 14]} /><SharedMaterial material={materials.darkJoint} /></mesh>
      <mesh position={[0, -.052, .075]} scale={[1.02, .78, .22]}><sphereGeometry args={[.1, 18, 12]} /><SharedMaterial material={materials.navy} /></mesh>
      {digits.map((digit) => <Finger key={digit.name} {...digit} rigRef={rigRef} materials={materials} />)}
      <Thumb side={side} rigRef={rigRef} materials={materials} />
    </group>
  );
}

export function animateHandPose(rig: HandRig, pose: AssistantHandPose, delta: number, side: -1 | 1, waveCurl = 0, snap = false) {
  const profile = handPoseProfiles[pose];
  const damping = snap ? 1 : 1 - Math.exp(-delta * 12);
  const setAngle = (current: number, target: number) => current + (target - current) * damping;

  digitNames.forEach((name) => {
    const digit = rig.digits[name];
    const target = profile[name];
    const curls = [target.mcp, target.pip + waveCurl, target.dip + waveCurl * .72];
    digit.joints.forEach((joint, jointIndex) => {
      if (!joint) return;
      joint.rotation.x = setAngle(joint.rotation.x, curls[jointIndex]);
    });
    if (digit.root) {
      digit.root.rotation.z = setAngle(digit.root.rotation.z, target.spread);
    }
  });

  const thumbRig = rig.digits.thumb;
  const thumbTarget = profile.thumb;
  if (thumbRig.root) {
    thumbRig.root.rotation.x = setAngle(thumbRig.root.rotation.x, thumbTarget.base);
    thumbRig.root.rotation.y = setAngle(thumbRig.root.rotation.y, side * thumbTarget.opposition * .46);
    thumbRig.root.rotation.z = setAngle(thumbRig.root.rotation.z, side * (-.58 - thumbTarget.opposition * .34));
  }
  if (thumbRig.joints[0]) thumbRig.joints[0].rotation.x = setAngle(thumbRig.joints[0].rotation.x, thumbTarget.mcp);
  if (thumbRig.joints[1]) thumbRig.joints[1].rotation.x = setAngle(thumbRig.joints[1].rotation.x, thumbTarget.ip);
  if (thumbRig.joints[2]) thumbRig.joints[2].rotation.x = setAngle(thumbRig.joints[2].rotation.x, 0);
}
