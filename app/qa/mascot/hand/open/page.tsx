import type { Metadata } from 'next';
import { HandPoseQa } from '../HandPoseQa';
export const metadata: Metadata = { title: 'Mascot hand QA · open' };
export default function Page() { return <HandPoseQa pose="open" />; }
