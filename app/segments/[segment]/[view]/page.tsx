import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { segmentBySlug, segments, segmentViews, type SegmentView } from '@/mresalat/domains/segments';
import { SegmentExperience } from '@/mresalat/templates/SegmentExperience';

export function generateStaticParams() {
  return segments.flatMap((segment) => segmentViews.map((view) => ({ segment: segment.slug, view })));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string; view: string }> }): Promise<Metadata> {
  const values = await params;
  const segment = segmentBySlug[values.segment];
  const view = values.view as SegmentView;
  if (!segment || !segmentViews.includes(view)) return {};
  return { title: `${segment.name} · ${segment.pages[view].label}`, description: segment.description };
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string; view: string }> }) {
  const values = await params;
  const segment = segmentBySlug[values.segment];
  const view = values.view as SegmentView;
  if (!segment || !segmentViews.includes(view)) notFound();
  return <SegmentExperience segment={segment} view={view} />;
}
