import type { Metadata } from 'next';
import { HealthProviders } from '@/mresalat/examples/health/HealthExamples';
export const metadata: Metadata = { title: 'ام‌سلامت' };
export default function Page() { return <HealthProviders />; }
