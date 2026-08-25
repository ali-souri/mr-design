import { ParentChildExperience } from '@/mresalat/contexts/PhaseThreeExperience';
export function generateStaticParams() { return [{ id: 'arya' }, { id: 'sara' }]; }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ParentChildExperience childId={id} />; }

