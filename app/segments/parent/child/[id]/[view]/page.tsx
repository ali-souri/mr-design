import { notFound } from 'next/navigation';
import { ParentChildExperience } from '@/mresalat/contexts/PhaseThreeExperience';
const views = ['goals', 'activity', 'rewards', 'allowance'] as const;
export function generateStaticParams() { return ['arya', 'sara'].flatMap((id) => views.map((view) => ({ id, view }))); }
export default async function Page({ params }: { params: Promise<{ id: string; view: string }> }) { const { id, view } = await params; if (!views.includes(view as (typeof views)[number])) notFound(); return <ParentChildExperience childId={id} view={view as (typeof views)[number]} />; }

