import type { Metadata } from 'next';
import { MBazarHome } from '@/mresalat/mbazar/MBazarComponents';

export const metadata: Metadata = { title: 'ام‌بازار', description: 'تجربه کشف و ارزیابی کالا در ام‌بازار با زبان MResalat System' };

export default function MBazarHomePage() {
  return <MBazarHome />;
}
