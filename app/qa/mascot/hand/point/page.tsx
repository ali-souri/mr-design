import type { Metadata } from 'next';
import { HandPoseQa } from '../HandPoseQa';
export const metadata: Metadata = { title: 'Mascot hand QA · point' };
export default function Page() { return <HandPoseQa pose="point" />; }
