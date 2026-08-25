import { notFound } from 'next/navigation';
import { OrganizationEmployeeExperience } from '@/mresalat/contexts/PhaseThreeExperience';
const views = ['home', 'benefits', 'credit', 'services'] as const;
export function generateStaticParams() { return views.map((view) => ({ view })); }
export default async function Page({ params }: { params: Promise<{ view: string }> }) { const { view } = await params; if (!views.includes(view as (typeof views)[number])) notFound(); return <OrganizationEmployeeExperience view={view as (typeof views)[number]} />; }

