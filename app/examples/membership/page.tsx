import type { Metadata } from 'next';
import { MembershipLanding } from '@/mresalat/examples/membership/MembershipExamples';
export const metadata: Metadata = { title: 'نمونه‌های عضویت' };
export default function Page() { return <MembershipLanding />; }
