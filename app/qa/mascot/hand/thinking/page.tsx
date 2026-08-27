import type { Metadata } from 'next';
import { HandPoseQa } from '../HandPoseQa';
export const metadata: Metadata = { title: 'Mascot hand QA · thinking' };
export default function Page() { return <HandPoseQa pose="thinking" />; }
