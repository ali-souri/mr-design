import type { Metadata } from 'next';
import { LearningLanding } from '@/mresalat/examples/learning/LearningExamples';
export const metadata: Metadata = { title: 'نمونه‌های یادگیری' };
export default function Page() { return <LearningLanding />; }
