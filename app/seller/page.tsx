import type { Metadata } from 'next';
import { segmentBySlug } from '@/mresalat/domains/segments';
import { SegmentExperience } from '@/mresalat/templates/SegmentExperience';

export const metadata: Metadata = { title: 'خانه فروشنده' };

export default function SellerPage() {
  return <SegmentExperience segment={segmentBySlug['active-seller']} view="home" />;
}
