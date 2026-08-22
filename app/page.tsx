import { segmentBySlug } from '@/mresalat/domains/segments';
import { SegmentExperience } from '@/mresalat/templates/SegmentExperience';

export default function Home() {
  return <SegmentExperience segment={segmentBySlug.general} view="home" shellActive="home" />;
}
