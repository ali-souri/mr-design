import type { Metadata } from 'next';
import { MBazarInstallmentCenter } from '@/mresalat/mbazar/MBazarPurchase';

export const metadata: Metadata = { title: 'درخواست‌های اقساطی ام‌بازار', description: 'مرکز وضعیت و اقدام بعدی درخواست‌های اقساط ام‌بازار' };
export default function InstallmentsPage() { return <MBazarInstallmentCenter />; }
