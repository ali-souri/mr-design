import type { Metadata } from 'next';
import { MHamiLanding } from '@/mresalat/examples/mhami/MHamiExamples';
export const metadata: Metadata = { title: 'نمونه‌های ام‌حامی و انجمن' };
export default function Page() { return <MHamiLanding />; }
