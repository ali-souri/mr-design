import type { Metadata } from 'next';
import { cardLockAction } from '@/mresalat/domains/mock-data';
import { SecureActionFlow } from '@/mresalat/secure/SecureActionFlow';

export const metadata: Metadata = { title: 'عملیات امن', description: 'نمونه فرایند امن مسدودسازی موقت کارت' };

export default function SecurePage() { return <SecureActionFlow action={cardLockAction} />; }
