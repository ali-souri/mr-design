import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { loanJourney } from '@/mresalat/domains/mock-data';
import { ServicePageTemplate } from '@/mresalat/journeys/ServicePageTemplate';

export const metadata: Metadata = { title: 'وام قرض‌الحسنه', description: 'شرایط، مدارک و مسیر وام قرض‌الحسنه ام‌رسالت' };

export default function LoanPage() {
  return <AppShell active="services"><ServicePageTemplate journey={loanJourney} /></AppShell>;
}
