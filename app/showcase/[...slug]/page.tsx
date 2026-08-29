import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocumentationPageView } from '@/mresalat/docs/DocumentationPage';
import { documentationPages, getDocumentationPage } from '@/mresalat/docs/registry';

export function generateStaticParams() {
  return documentationPages.map((page) => ({ slug: page.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocumentationPage(slug.join('/'));
  if (!page) return {};
  const title = `${page.titleFa}${page.titleEn ? ` · ${page.titleEn}` : ''}`;
  return {
    title,
    description: page.description,
    openGraph: { title, description: page.description, images: [] },
    twitter: { title, description: page.description, images: [] },
  };
}

export default async function DocumentationRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getDocumentationPage(slug.join('/'));
  if (!page) notFound();
  return <DocumentationPageView page={page} />;
}
