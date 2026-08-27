export type AssistantEmotion =
  | 'greeting'
  | 'idle'
  | 'calm'
  | 'listening'
  | 'thinking'
  | 'explaining'
  | 'happy'
  | 'warning'
  | 'uncertain'
  | 'handoff';

export type AssistantCharacterMode = 'complete' | 'portrait';
export type AssistantMotionIntensity = 'restrained' | 'normal' | 'expressive';
export type AssistantGazeMode = 'none' | 'local' | 'page';
export type AssistantView = 'front' | 'three-quarter' | 'side' | 'opposite-side' | 'back';
export type AssistantDebugView = 'standard' | 'face';
export type AssistantHandPose =
  | 'relaxed'
  | 'open'
  | 'wave'
  | 'point'
  | 'explain'
  | 'caution'
  | 'thinking'
  | 'support'
  | 'fist';

export type AssistantGaze = { x: number; y: number; strength: number; active: boolean };

export const assistantEmotionLabels: Record<AssistantEmotion, string> = {
  greeting: 'سلام و خوش‌آمد',
  idle: 'آماده',
  calm: 'آرام',
  listening: 'در حال شنیدن',
  thinking: 'در حال فکر',
  explaining: 'در حال توضیح',
  happy: 'خوشحال',
  warning: 'هشدار',
  uncertain: 'نامطمئن',
  handoff: 'ارجاع به کارشناس',
};

export const assistantHandPoseLabels: Record<AssistantHandPose, string> = {
  relaxed: 'رها',
  open: 'باز',
  wave: 'دست‌تکان',
  point: 'اشاره',
  explain: 'توضیح',
  caution: 'توجه',
  thinking: 'فکر',
  support: 'حمایت',
  fist: 'مشت نرم',
};

export const mascotPalette = {
  navy: '#0f2742',
  deepBlue: '#123b63',
  darkJoint: '#0a1e32',
  teal: '#2bc3bc',
  cyan: '#80f7f1',
  white: '#f4f7f8',
  whiteShade: '#dbe7eb',
  gold: '#d7b24a',
  face: '#071a2c',
} as const;

export type EyeShape = 'open' | 'soft' | 'crescent' | 'narrow' | 'asymmetric';
export type MouthShape = 'smile' | 'soft-smile' | 'open-smile' | 'neutral' | 'worried';
export type BrowShape = 'hidden' | 'raised' | 'thinking' | 'warning' | 'worried';

export type EmotionProfile = {
  eyeShape: EyeShape;
  mouthShape: MouthShape;
  browShape: BrowShape;
  eyeScale: number;
  eyeBrightness: number;
  headTilt: number;
  headPitch: number;
  energy: number;
  primaryHand: AssistantHandPose;
  secondaryHand: AssistantHandPose;
};

export const emotionProfiles: Record<AssistantEmotion, EmotionProfile> = {
  greeting: { eyeShape: 'open', mouthShape: 'open-smile', browShape: 'raised', eyeScale: 1.06, eyeBrightness: 1.12, headTilt: -.035, headPitch: -.025, energy: 1, primaryHand: 'wave', secondaryHand: 'relaxed' },
  idle: { eyeShape: 'open', mouthShape: 'smile', browShape: 'hidden', eyeScale: 1, eyeBrightness: 1, headTilt: 0, headPitch: 0, energy: .55, primaryHand: 'relaxed', secondaryHand: 'relaxed' },
  calm: { eyeShape: 'soft', mouthShape: 'soft-smile', browShape: 'hidden', eyeScale: .94, eyeBrightness: .88, headTilt: 0, headPitch: .01, energy: .32, primaryHand: 'relaxed', secondaryHand: 'relaxed' },
  listening: { eyeShape: 'open', mouthShape: 'soft-smile', browShape: 'hidden', eyeScale: 1.12, eyeBrightness: 1.14, headTilt: -.045, headPitch: -.065, energy: .48, primaryHand: 'open', secondaryHand: 'relaxed' },
  thinking: { eyeShape: 'asymmetric', mouthShape: 'soft-smile', browShape: 'thinking', eyeScale: .91, eyeBrightness: .9, headTilt: .105, headPitch: .025, energy: .3, primaryHand: 'relaxed', secondaryHand: 'thinking' },
  explaining: { eyeShape: 'open', mouthShape: 'smile', browShape: 'hidden', eyeScale: 1.02, eyeBrightness: 1.02, headTilt: -.025, headPitch: -.02, energy: .7, primaryHand: 'explain', secondaryHand: 'support' },
  happy: { eyeShape: 'crescent', mouthShape: 'open-smile', browShape: 'raised', eyeScale: 1, eyeBrightness: 1.14, headTilt: 0, headPitch: -.015, energy: 1, primaryHand: 'open', secondaryHand: 'open' },
  warning: { eyeShape: 'narrow', mouthShape: 'neutral', browShape: 'warning', eyeScale: .92, eyeBrightness: .92, headTilt: 0, headPitch: .025, energy: .08, primaryHand: 'caution', secondaryHand: 'relaxed' },
  uncertain: { eyeShape: 'asymmetric', mouthShape: 'worried', browShape: 'worried', eyeScale: .9, eyeBrightness: .86, headTilt: .13, headPitch: .02, energy: .24, primaryHand: 'support', secondaryHand: 'support' },
  handoff: { eyeShape: 'soft', mouthShape: 'smile', browShape: 'hidden', eyeScale: 1, eyeBrightness: .96, headTilt: -.05, headPitch: -.025, energy: .46, primaryHand: 'support', secondaryHand: 'relaxed' },
};

export const motionIntensityScale: Record<AssistantMotionIntensity, number> = {
  restrained: .56,
  normal: 1,
  expressive: 1.24,
};

export type FingerPose = {
  mcp: number;
  pip: number;
  dip: number;
  spread: number;
};

export type ThumbPose = {
  base: number;
  mcp: number;
  ip: number;
  opposition: number;
};

export type HandPoseProfile = {
  thumb: ThumbPose;
  index: FingerPose;
  middle: FingerPose;
  ring: FingerPose;
  pinky: FingerPose;
};

const finger = (mcp: number, pip: number, dip: number, spread: number): FingerPose => ({ mcp, pip, dip, spread });
const thumb = (base: number, mcp: number, ip: number, opposition: number): ThumbPose => ({ base, mcp, ip, opposition });

export const handPoseProfiles: Record<AssistantHandPose, HandPoseProfile> = {
  relaxed: {
    thumb: thumb(.18, .28, .22, .42),
    index: finger(.22, .34, .22, .035), middle: finger(.27, .39, .25, .012),
    ring: finger(.33, .45, .3, -.018), pinky: finger(.41, .52, .34, -.045),
  },
  open: {
    thumb: thumb(.06, .1, .08, .72),
    index: finger(.04, .035, .025, .16), middle: finger(.025, .02, .018, .055),
    ring: finger(.035, .03, .025, -.065), pinky: finger(.07, .06, .04, -.19),
  },
  wave: {
    thumb: thumb(.035, .07, .055, .82),
    index: finger(.025, .02, .015, .24), middle: finger(.018, .015, .012, .075),
    ring: finger(.025, .02, .016, -.09), pinky: finger(.055, .045, .035, -.28),
  },
  point: {
    thumb: thumb(.2, .3, .18, .38),
    index: finger(.015, .018, .012, .045), middle: finger(.74, 1.02, .84, .01),
    ring: finger(.82, 1.12, .94, -.018), pinky: finger(.9, 1.18, 1, -.035),
  },
  explain: {
    thumb: thumb(.08, .14, .1, .68),
    index: finger(.1, .16, .11, .12), middle: finger(.13, .2, .14, .04),
    ring: finger(.18, .26, .18, -.055), pinky: finger(.25, .34, .22, -.15),
  },
  caution: {
    thumb: thumb(.05, .09, .065, .76),
    index: finger(.025, .025, .018, .17), middle: finger(.018, .018, .014, .055),
    ring: finger(.024, .022, .018, -.06), pinky: finger(.045, .04, .03, -.19),
  },
  thinking: {
    thumb: thumb(.22, .3, .2, .7),
    index: finger(.12, .2, .12, .06), middle: finger(.48, .66, .48, .008),
    ring: finger(.59, .78, .58, -.018), pinky: finger(.68, .88, .66, -.035),
  },
  support: {
    thumb: thumb(.1, .18, .12, .64),
    index: finger(.12, .2, .14, .1), middle: finger(.15, .24, .17, .032),
    ring: finger(.2, .3, .21, -.045), pinky: finger(.28, .38, .27, -.13),
  },
  fist: {
    thumb: thumb(.48, .72, .54, .34),
    index: finger(.88, 1.16, 1.02, .018), middle: finger(.94, 1.22, 1.08, .006),
    ring: finger(.98, 1.25, 1.1, -.008), pinky: finger(1.02, 1.27, 1.12, -.018),
  },
};

export type JointRotation = readonly [number, number, number];

export type ArmPoseProfile = {
  shoulder: JointRotation;
  elbow: JointRotation;
  wrist: JointRotation;
  hand: AssistantHandPose;
  waveCurl?: number;
};

export type MascotPoseFrame = {
  primaryArm: ArmPoseProfile;
  secondaryArm: ArmPoseProfile;
};

const arm = (
  side: -1 | 1,
  hand: AssistantHandPose = 'relaxed',
  shoulder: JointRotation = [0, 0, side * .12],
  elbow: JointRotation = [0, 0, 0],
  wrist: JointRotation = [0, 0, 0],
): ArmPoseProfile => ({ shoulder, elbow, wrist, hand });

const neutralPose = (): MascotPoseFrame => ({ primaryArm: arm(-1), secondaryArm: arm(1) });

export const emotionPoseProfiles: Record<AssistantEmotion, MascotPoseFrame> = {
  greeting: neutralPose(),
  idle: neutralPose(),
  calm: neutralPose(),
  listening: {
    primaryArm: arm(-1),
    secondaryArm: arm(1, 'relaxed', [-.1, 0, 1.55], [-.34, 0, 1.16], [-.08, .06, -.04]),
  },
  thinking: {
    primaryArm: arm(-1),
    secondaryArm: arm(1, 'thinking', [.24, 0, -.24], [.46, 0, -2.96], [-.18, .1, .08]),
  },
  explaining: {
    primaryArm: arm(-1, 'explain', [-.24, 0, -.72], [-.22, 0, -1.18], [0, -1.2, .48]),
    secondaryArm: arm(1, 'support', [-.04, 0, .18], [-.12, 0, .72], [0, 1.05, -.35]),
  },
  happy: {
    primaryArm: arm(-1, 'open', [-.08, 0, -.86], [-.26, 0, -1.54], [0, -1.45, 0]),
    secondaryArm: arm(1, 'open', [-.08, 0, .86], [-.26, 0, 1.54], [0, 1.45, 0]),
  },
  warning: {
    primaryArm: arm(-1, 'caution', [-.1, 0, -.48], [-.14, 0, -1.58], [0, -1.52, 0]),
    secondaryArm: arm(1),
  },
  uncertain: {
    primaryArm: arm(-1, 'support', [-.3, 0, -.48], [-.28, 0, -1.12], [0, -1.18, .45]),
    secondaryArm: arm(1, 'support', [-.14, 0, .65], [-.22, 0, 1.75], [0, 1.1, -.36]),
  },
  handoff: {
    primaryArm: arm(-1, 'support', [-.28, 0, -.55], [-.26, 0, -1.15], [0, -1.12, .5]),
    secondaryArm: arm(1, 'relaxed', [-.08, 0, .18], [-.16, 0, 0], [0, 0, 0]),
  },
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const copyArm = (pose: ArmPoseProfile): ArmPoseProfile => ({
  shoulder: [...pose.shoulder], elbow: [...pose.elbow], wrist: [...pose.wrist], hand: pose.hand, waveCurl: pose.waveCurl,
});

export function resolveMascotPose(
  emotion: AssistantEmotion,
  elapsed: number,
  intensity: number,
  reducedMotion: boolean,
  debugHandPose?: AssistantHandPose,
): MascotPoseFrame {
  if (debugHandPose) {
    const palmUp = debugHandPose === 'explain' || debugHandPose === 'support';
    const wrist: JointRotation = palmUp ? [0, -1.2, .48] : debugHandPose === 'thinking' ? [-.12, -.45, .08] : [0, -1.5, 0];
    return {
      primaryArm: arm(-1, debugHandPose, [-.18, 0, -1], [-.24, 0, -1.62], wrist),
      secondaryArm: arm(1, 'relaxed', [-.08, 0, .45], [-.28, 0, 0], [0, 0, 0]),
    };
  }

  const source = emotionPoseProfiles[emotion];
  const primaryArm = copyArm(source.primaryArm);
  const secondaryArm = copyArm(source.secondaryArm);

  if (emotion === 'greeting') {
    if (reducedMotion) {
      primaryArm.shoulder = [-.04, 0, -1.02];
      primaryArm.elbow = [-.28, 0, -.28];
      primaryArm.wrist = [0, -1.5, 0];
      primaryArm.hand = 'wave';
      return { primaryArm, secondaryArm };
    }

    const progress = clamp01(elapsed / 2.7);
    const raised = smoothstep(.06, .3, progress) * (1 - smoothstep(.72, .96, progress));
    const waveWindow = smoothstep(.27, .36, progress) * (1 - smoothstep(.65, .76, progress));
    const wave = Math.sin(((progress - .3) / .42) * Math.PI * 5) * waveWindow;
    primaryArm.shoulder = [.12 * raised, 0, lerp(-.12, -2.18, raised)];
    primaryArm.elbow = [-.34 * raised, 0, -.36 * raised];
    primaryArm.wrist = [0, lerp(0, -1.5, raised), wave * .34 * intensity];
    primaryArm.hand = raised > .08 ? 'wave' : 'relaxed';
    primaryArm.waveCurl = (.04 + Math.max(0, wave) * .08) * waveWindow;
  } else if (emotion === 'explaining' && !reducedMotion) {
    const talk = Math.sin(elapsed * 1.55) * .09 * intensity;
    primaryArm.shoulder = [primaryArm.shoulder[0], primaryArm.shoulder[1], primaryArm.shoulder[2] + talk];
    primaryArm.wrist = [primaryArm.wrist[0], primaryArm.wrist[1], primaryArm.wrist[2] - talk];
    secondaryArm.shoulder = [secondaryArm.shoulder[0], secondaryArm.shoulder[1], secondaryArm.shoulder[2] - talk * .45];
  }

  return { primaryArm, secondaryArm };
}
