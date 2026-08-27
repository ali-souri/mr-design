import assert from 'node:assert/strict';
import test from 'node:test';
import {
  emotionPoseProfiles,
  handPoseProfiles,
  resolveMascotPose,
} from '../mresalat/ai/mascot.ts';
import {
  mascotHandBasis,
  mascotHandChiralityScaleX,
  mascotHandMountBasis,
} from '../mresalat/ai/mascot-hand-basis.ts';
import {
  detectWebGLSupport,
  getWebGLDetectionCount,
  resetWebGLCapabilityCacheForTests,
} from '../mresalat/ai/webgl-capability.ts';

test('hand presets define independent anatomical targets for every digit', () => {
  for (const [name, pose] of Object.entries(handPoseProfiles)) {
    assert.deepEqual(Object.keys(pose).sort(), ['index', 'middle', 'pinky', 'ring', 'thumb']);
    for (const digit of ['index', 'middle', 'ring', 'pinky']) {
      assert.equal(typeof pose[digit].mcp, 'number', `${name}.${digit}.mcp`);
      assert.equal(typeof pose[digit].pip, 'number', `${name}.${digit}.pip`);
      assert.equal(typeof pose[digit].dip, 'number', `${name}.${digit}.dip`);
      assert.equal(typeof pose[digit].spread, 'number', `${name}.${digit}.spread`);
    }
    assert.equal(typeof pose.thumb.opposition, 'number', `${name}.thumb.opposition`);
  }
  assert.ok(handPoseProfiles.wave.index.spread > handPoseProfiles.open.index.spread);
  assert.ok(handPoseProfiles.point.index.pip < handPoseProfiles.point.middle.pip);
});

test('hand attachment bases preserve palm normal and mirrored chirality before poses', () => {
  assert.deepEqual(mascotHandBasis, {
    acrossPalm: [1, 0, 0],
    wristToFingertips: [0, 1, 0],
    palmNormal: [0, 0, 1],
  });
  assert.deepEqual(mascotHandMountBasis.right.wristToFingertips, [0, -1, 0]);
  assert.deepEqual(mascotHandMountBasis.left.wristToFingertips, [0, -1, 0]);
  assert.deepEqual(mascotHandMountBasis.right.palmNormal, [1, 0, 0]);
  assert.deepEqual(mascotHandMountBasis.left.palmNormal, [-1, 0, 0]);
  assert.deepEqual(mascotHandMountBasis.right.acrossPalm, [0, 0, 1]);
  assert.deepEqual(mascotHandMountBasis.left.acrossPalm, [0, 0, -1]);
  assert.deepEqual(mascotHandChiralityScaleX, { right: 1, left: -1 });
});

test('emotion poses are explicit, distinct, and idle is drift-free', () => {
  const idleBefore = resolveMascotPose('idle', 0, 1, false);
  const listening = resolveMascotPose('listening', .4, 1, false);
  const thinking = resolveMascotPose('thinking', .4, 1, false);
  const warning = resolveMascotPose('warning', .4, 1, false);
  const handoff = resolveMascotPose('handoff', .4, 1, false);
  const idleAfter = resolveMascotPose('idle', 99, 1, false);

  assert.deepEqual(idleAfter, idleBefore);
  assert.notDeepEqual(listening, thinking);
  assert.notDeepEqual(thinking, warning);
  assert.notDeepEqual(warning, handoff);
  assert.equal(emotionPoseProfiles.listening.secondaryArm.hand, 'relaxed');
  assert.equal(emotionPoseProfiles.warning.primaryArm.hand, 'caution');
  assert.deepEqual(idleBefore.primaryArm.wrist, [0, 0, 0], 'robot-right mount owns the neutral anatomical basis');
  assert.deepEqual(idleBefore.secondaryArm.wrist, [0, 0, 0], 'robot-left mount owns the mirrored neutral anatomical basis');
  assert.ok(warning.primaryArm.wrist[1] < -1.4, 'warning rotates the anatomical right palm normal toward the viewer');
  assert.ok(Math.abs(emotionPoseProfiles.explaining.secondaryArm.shoulder[2]) < Math.abs(emotionPoseProfiles.explaining.primaryArm.shoulder[2]), 'explaining support arm stays lower and subtler');
  assert.ok(emotionPoseProfiles.listening.secondaryArm.elbow[2] < 1.3, 'listening hand remains outside the head silhouette');
});

test('debug hand override has precedence and greeting replay is deterministic', () => {
  const debug = resolveMascotPose('warning', .5, 1, false, 'point');
  assert.equal(debug.primaryArm.hand, 'point');
  assert.equal(debug.secondaryArm.hand, 'relaxed');

  const waveA = resolveMascotPose('greeting', 1.35, 1, false);
  const waveB = resolveMascotPose('greeting', 1.35, 1, false);
  const finished = resolveMascotPose('greeting', 2.7, 1, false);
  assert.deepEqual(waveA, waveB);
  assert.equal(finished.primaryArm.hand, 'relaxed');
  assert.deepEqual(finished.primaryArm.shoulder, [0, 0, -.12]);
  assert.deepEqual(finished.primaryArm.wrist, [0, 0, 0], 'greeting returns to the pre-pose inward palm basis');
});

test('WebGL capability detection is cached and releases its temporary context', () => {
  resetWebGLCapabilityCacheForTests();
  let canvases = 0;
  let releases = 0;
  const context = {
    getExtension(name) {
      return name === 'WEBGL_lose_context' ? { loseContext: () => { releases += 1; } } : null;
    },
  };
  const fakeDocument = {
    createElement() {
      canvases += 1;
      return { width: 0, height: 0, getContext: () => context, remove() {} };
    },
  };

  assert.equal(detectWebGLSupport(fakeDocument), true);
  assert.equal(detectWebGLSupport(fakeDocument), true);
  assert.equal(canvases, 1);
  assert.equal(releases, 1);
  assert.equal(getWebGLDetectionCount(), 1);
  resetWebGLCapabilityCacheForTests();
});
