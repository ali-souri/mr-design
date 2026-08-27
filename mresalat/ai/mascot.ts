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
export type AssistantView = 'front' | 'three-quarter' | 'side' | 'back';
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
  thinking: { eyeShape: 'asymmetric', mouthShape: 'soft-smile', browShape: 'thinking', eyeScale: .91, eyeBrightness: .9, headTilt: .105, headPitch: .025, energy: .3, primaryHand: 'thinking', secondaryHand: 'relaxed' },
  explaining: { eyeShape: 'open', mouthShape: 'smile', browShape: 'hidden', eyeScale: 1.02, eyeBrightness: 1.02, headTilt: -.025, headPitch: -.02, energy: .7, primaryHand: 'explain', secondaryHand: 'support' },
  happy: { eyeShape: 'crescent', mouthShape: 'open-smile', browShape: 'raised', eyeScale: 1, eyeBrightness: 1.14, headTilt: 0, headPitch: -.015, energy: 1, primaryHand: 'open', secondaryHand: 'open' },
  warning: { eyeShape: 'narrow', mouthShape: 'neutral', browShape: 'warning', eyeScale: .92, eyeBrightness: .92, headTilt: 0, headPitch: .025, energy: .12, primaryHand: 'caution', secondaryHand: 'relaxed' },
  uncertain: { eyeShape: 'asymmetric', mouthShape: 'worried', browShape: 'worried', eyeScale: .9, eyeBrightness: .86, headTilt: .13, headPitch: .02, energy: .24, primaryHand: 'support', secondaryHand: 'support' },
  handoff: { eyeShape: 'soft', mouthShape: 'smile', browShape: 'hidden', eyeScale: 1, eyeBrightness: .96, headTilt: -.05, headPitch: -.025, energy: .46, primaryHand: 'support', secondaryHand: 'relaxed' },
};

export const motionIntensityScale: Record<AssistantMotionIntensity, number> = {
  restrained: .56,
  normal: 1,
  expressive: 1.24,
};

export type FingerPose = {
  curls: [number, number, number, number, number];
  spread: number;
  thumbLift: number;
};

export const handPoseProfiles: Record<AssistantHandPose, FingerPose> = {
  relaxed: { curls: [.48, .36, .42, .48, .56], spread: .04, thumbLift: .18 },
  open: { curls: [.08, .05, .04, .06, .1], spread: .2, thumbLift: .42 },
  wave: { curls: [.08, .04, .04, .06, .1], spread: .28, thumbLift: .5 },
  point: { curls: [.42, .02, .92, 1, 1.05], spread: .05, thumbLift: .24 },
  explain: { curls: [.12, .12, .16, .2, .28], spread: .14, thumbLift: .38 },
  caution: { curls: [.06, .02, .02, .04, .08], spread: .18, thumbLift: .44 },
  thinking: { curls: [.58, .46, .58, .7, .82], spread: .03, thumbLift: .1 },
  support: { curls: [.18, .16, .18, .23, .3], spread: .12, thumbLift: .34 },
  fist: { curls: [1.05, 1.18, 1.22, 1.24, 1.2], spread: 0, thumbLift: -.08 },
};
