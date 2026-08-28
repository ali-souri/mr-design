import type { Metadata } from 'next';
import { InsurancePortal } from '@/mresalat/examples/insurance/InsuranceExamples';
export const metadata: Metadata = { title: 'ام‌بیمه' };
export default function Page() { return <InsurancePortal />; }
