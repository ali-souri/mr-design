import type { Metadata } from 'next';
import { BankingHub } from '@/mresalat/examples/banking/BankingExamples';
export const metadata: Metadata = { title: 'پیشخوان مجازی رسالت' };
export default function Page() { return <BankingHub />; }
