import { OrganizationPersonnelDetail } from '@/mresalat/contexts/PhaseThreeExperience';
export function generateStaticParams() { return ['p-01', 'p-02', 'p-03', 'p-04', 'p-05'].map((id) => ({ id })); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <OrganizationPersonnelDetail id={id} />; }

