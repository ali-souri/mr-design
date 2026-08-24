import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { segmentBySlug, segments, segmentViews, type SegmentView } from '@/mresalat/domains/segments';
import { SegmentExperience } from '@/mresalat/templates/SegmentExperience';
import { isPhaseOneView, isSegmentSlug, phaseOneViews, segmentExperiences } from '@/mresalat/segments/experience-data';
import { SegmentPhaseOnePage } from '@/mresalat/segments/SegmentPhaseOne';
import { SegmentPhaseTwoPage } from '@/mresalat/segments/SegmentPhaseTwo';
import { isPhaseTwoView, phaseTwoViews } from '@/mresalat/segments/phase-two-data';

export function generateStaticParams() {
  return [
    ...segments.flatMap((segment) => segmentViews.map((view) => ({ segment: segment.slug, view }))),
    ...Object.entries(phaseOneViews).flatMap(([segment, views]) => views.map((view) => ({ segment, view }))),
    ...Object.entries(phaseTwoViews).flatMap(([segment, views]) => views.map((view) => ({ segment, view }))),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string; view: string }> }): Promise<Metadata> {
  const values = await params;
  if (isSegmentSlug(values.segment) && isPhaseTwoView(values.segment, values.view)) {
    const labels: Record<string, string> = { home: 'خانه شخصی‌سازی‌شده', services: 'خدمات متناسب', journeys: 'مسیرها', goals: 'هدف‌های پس‌انداز', rewards: 'پاداش‌ها', activity: 'فعالیت مالی', learning: 'یادگیری', benefits: 'مزایا و اعتبار', personnel: 'پرسنل', reports: 'گزارش‌ها' };
    return { title: `${labels[values.view]} · ${segmentExperiences[values.segment].titleFa}`, description: `تجربه پس از ثبت‌نام برای ${segmentExperiences[values.segment].titleFa}` };
  }
  if (isSegmentSlug(values.segment) && isPhaseOneView(values.segment, values.view)) {
    const labels: Record<string, string> = { membership: 'شروع عضویت', identity: 'احراز هویت', otp: 'کد تأیید', status: 'وضعیت درخواست', request: 'شروع فرایند', 'child-info': 'اطلاعات نوجوان', 'account-request': 'درخواست حساب', owners: 'صاحبان امضاء', 'add-owner': 'افزودن صاحب امضاء' };
    return { title: `${labels[values.view]} · ${segmentExperiences[values.segment].titleFa}`, description: segmentExperiences[values.segment].shortDescriptionFa };
  }
  const segment = segmentBySlug[values.segment];
  const view = values.view as SegmentView;
  if (!segment || !segmentViews.includes(view)) return {};
  return { title: `${segment.name} · ${segment.pages[view].label}`, description: segment.description };
}

export default async function SegmentPage({ params }: { params: Promise<{ segment: string; view: string }> }) {
  const values = await params;
  if (isSegmentSlug(values.segment) && isPhaseTwoView(values.segment, values.view)) {
    return <SegmentPhaseTwoPage segment={values.segment} view={values.view} />;
  }
  if (isSegmentSlug(values.segment) && isPhaseOneView(values.segment, values.view)) {
    return <SegmentPhaseOnePage segment={values.segment} view={values.view} />;
  }
  const segment = segmentBySlug[values.segment];
  const view = values.view as SegmentView;
  if (!segment || !segmentViews.includes(view)) notFound();
  return <SegmentExperience segment={segment} view={view} />;
}
