import type { Metadata } from 'next';
import { MBazarProductPage } from '@/mresalat/mbazar/MBazarComponents';
import { productById } from '@/mresalat/mbazar/data';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productById(id);
  return { title: product.title, description: product.description, openGraph: { title: product.title, description: product.description, images: [] }, twitter: { title: product.title, description: product.description, images: [] } };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MBazarProductPage product={productById(id)} />;
}
