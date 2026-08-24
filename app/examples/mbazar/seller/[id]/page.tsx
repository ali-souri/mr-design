import type { Metadata } from 'next';
import { sellerById } from '@/mresalat/mbazar/data';
import { MBazarSellerPage } from '@/mresalat/mbazar/MBazarSeller';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const seller = sellerById((await params).id); return { title: seller.name, description: seller.description }; }
export default async function SellerPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ q?: string; state?: string }> }) { const query = await searchParams; return <MBazarSellerPage id={(await params).id} initialQuery={query.q ?? ''} unavailable={query.state === 'error'} />; }
