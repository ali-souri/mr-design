import { notFound } from 'next/navigation';
import { ParentExperience } from '@/mresalat/contexts/PhaseThreeExperience';

const views = ['home', 'children', 'approvals', 'services'] as const;
export function generateStaticParams() { return views.map((view) => ({ view })); }
export default async function Page({ params, searchParams }: { params: Promise<{ view: string }>; searchParams: Promise<{ pending?: string }> }) {
  const { view } = await params;
  const query = await searchParams;
  if (!views.includes(view as (typeof views)[number])) notFound();
  return <ParentExperience view={view as (typeof views)[number]} pending={query.pending !== '0'} />;
}

