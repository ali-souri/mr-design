import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isSegmentSlug, phaseOneSegments, segmentExperiences } from '@/mresalat/segments/experience-data';
import { SegmentPhaseOnePage } from '@/mresalat/segments/SegmentPhaseOne';

export function generateStaticParams() {
  return phaseOneSegments.map((segment) => ({ segment: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }): Promise<Metadata> {
  const { segment } = await params;
  if (!isSegmentSlug(segment)) return {};
  const config = segmentExperiences[segment];
  return { title: config.titleFa, description: config.shortDescriptionFa };
}

export default async function PersonalizedSegmentLanding({ params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  if (!isSegmentSlug(segment)) notFound();
  return <SegmentPhaseOnePage segment={segment} />;
}
