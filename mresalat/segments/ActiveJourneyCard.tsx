'use client';

import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Badge } from '@/mresalat/core/primitives';
import type { SegmentSlug } from './experience-data';
import type { ActiveJourney } from './phase-two-data';

const stateLabels = { active: 'در حال انجام', waiting: 'در انتظار', completed: 'تکمیل‌شده' } as const;

export function ActiveJourneyCard({ journey, segment, compact = false }: { journey: ActiveJourney; segment: SegmentSlug; compact?: boolean }) {
  const event = segment === 'individual' ? 'individual_journey_opened' : segment === 'organization' ? 'organization_program_opened' : 'youth_goal_opened';
  return (
    <article className={`active-journey-card journey-${journey.state} ${compact ? 'is-compact' : ''}`} id={journey.id}>
      <header>
        <span className="journey-card-icon"><MResalatIcon name={journey.state === 'completed' ? 'success' : journey.state === 'waiting' ? 'time' : 'assessment'} size={24} /></span>
        <div><small>مسیر {stateLabels[journey.state]}</small><h3>{journey.title}</h3></div>
        <Badge tone={journey.state === 'completed' ? 'success' : journey.state === 'waiting' ? 'warning' : 'info'}>{stateLabels[journey.state]}</Badge>
      </header>
      <div className="journey-current-step"><span>مرحله فعلی</span><strong>{journey.currentStep}</strong></div>
      <div className="journey-card-progress" role="progressbar" aria-label={`پیشرفت ${journey.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={journey.progress}><span style={{ width: `${journey.progress}%` }} /></div>
      <footer><small>{journey.progress}٪ پیشرفت</small><a href={journey.href} onClick={() => trackEvent({ event, surface: 'segment', entityId: journey.id, metadata: { segment } })}>{journey.nextAction}<MResalatIcon name="next" size={16} /></a></footer>
    </article>
  );
}
