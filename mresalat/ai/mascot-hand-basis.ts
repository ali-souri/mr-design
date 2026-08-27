// Canonical anatomical coordinates shared by both hands. A pose is never allowed to redefine
// these axes; chirality is the only mirrored quantity.
export const mascotHandBasis = {
  acrossPalm: [1, 0, 0],
  wristToFingertips: [0, 1, 0],
  palmNormal: [0, 0, 1],
} as const;

// Pre-pose wrist attachment bases. At zero wrist rotation both hands have fingers down, palms
// inward toward the thighs, and thumbs forward. The columns are canonical +X, +Y, and +Z.
export const mascotHandMountBasis = {
  right: { acrossPalm: [0, 0, 1], wristToFingertips: [0, -1, 0], palmNormal: [1, 0, 0] },
  left: { acrossPalm: [0, 0, -1], wristToFingertips: [0, -1, 0], palmNormal: [-1, 0, 0] },
} as const;

// Geometry is authored as a complete right hand. Mirroring its local X once produces a true
// anatomical left hand, including thumb side and index-to-pinky ordering.
export const mascotHandChiralityScaleX = { right: 1, left: -1 } as const;
