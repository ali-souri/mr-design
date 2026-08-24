import type { Metadata } from 'next';
import { MBazarAddressForm } from '@/mresalat/mbazar/MBazarAccount';
export const metadata: Metadata = { title: 'ویرایش آدرس ام‌بازار' };
export default async function EditAddressPage({ params }: { params: Promise<{ id: string }> }) { return <MBazarAddressForm id={(await params).id} />; }
