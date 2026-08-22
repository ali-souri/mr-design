'use client';

import { useRef } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import type { JourneyStep } from '@/mresalat/domains/contracts';

export type ProcessReviewVariant = 'compact' | 'standard' | 'featured';

export function ProcessReviewWizard({ title, steps, progress, variant = 'standard', currentAction }: {
  title: string;
  steps: JourneyStep[];
  progress: number;
  variant?: ProcessReviewVariant;
  currentAction?: { label: string; href: string };
}) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: 'next' | 'previous') => {
    const amount = (track.current?.clientWidth ?? 320) * .72;
    track.current?.scrollBy({ left: direction === 'next' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={`process-review process-review-${variant}`} aria-labelledby={`process-${title}`}>
      <header className="process-review-head">
        <div><span className="eyebrow">مرور مسیر</span><h2 id={`process-${title}`}>{title}</h2></div>
        <div className="process-review-controls"><span>{progress}٪ پیشرفت</span><button type="button" onClick={() => move('previous')} aria-label="مرحله قبلی"><MResalatIcon name="previous" size={16} /></button><button type="button" onClick={() => move('next')} aria-label="مرحله بعدی"><MResalatIcon name="next" size={16} /></button></div>
      </header>
      <div className="process-progress" aria-label={`${progress} درصد تکمیل شده`}><span style={{ width: `${progress}%` }} /></div>
      <div className="process-track" ref={track} tabIndex={0} aria-label={`مراحل ${title}`}>
        {steps.map((step, index) => (
          <article className={`process-step process-step-${step.status ?? 'upcoming'}`} key={step.id} aria-current={step.status === 'current' ? 'step' : undefined}>
            <span className="process-step-index">{step.status === 'completed' ? <MResalatIcon name="success" size={16} /> : index + 1}</span>
            <div><small>{step.status === 'completed' ? 'تکمیل شده' : step.status === 'current' ? 'مرحله فعلی' : 'در ادامه'}</small><strong>{step.title}</strong>{step.description && <p>{step.description}</p>}</div>
            {step.status === 'current' && currentAction && <a href={currentAction.href}>{currentAction.label}<MResalatIcon name="next" size={16} /></a>}
          </article>
        ))}
      </div>
    </section>
  );
}
