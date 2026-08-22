import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Badge } from '@/mresalat/core/primitives';
import type { SegmentConfig, SegmentView } from '@/mresalat/domains/segments';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';
import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer';

function SegmentNav({ segment, view }: { segment: SegmentConfig; view: SegmentView }) {
  return <nav className="segment-tabs" aria-label={`صفحه‌های ${segment.name}`}>{(Object.keys(segment.pages) as SegmentView[]).map((key) => <a className={view === key ? 'active' : ''} href={`/segments/${segment.slug}/${key}`} key={key}>{segment.pages[key].label}</a>)}</nav>;
}

function QuickActions({ segment }: { segment: SegmentConfig }) {
  return <section className="segment-block" aria-labelledby="segment-actions"><div className="segment-block-head"><div><span className="eyebrow">اقدام‌های اصلی</span><h2 id="segment-actions">همین حالا چه کاری دارید؟</h2></div></div><div className="segment-action-grid">{segment.quickActions.map((action) => <a href={action.href ?? `/segments/${segment.slug}/services`} key={action.title}><span className="domain-icon"><MResalatIcon name={action.icon} size={20} /></span><div><strong>{action.title}</strong><small>{action.description}</small></div><MResalatIcon name="next" size={16} /></a>)}</div></section>;
}

function Metrics({ segment }: { segment: SegmentConfig }) {
  return <section className="segment-metrics" aria-label="خلاصه وضعیت">{segment.metrics.map((metric) => <article key={metric.label}><span className={`metric-dot metric-${metric.tone}`} /><small>{metric.label}</small><strong>{metric.value}</strong><p>{metric.detail}</p></article>)}</section>;
}

function Services({ segment }: { segment: SegmentConfig }) {
  return <div className="segment-service-grid">{segment.services.map((service) => <article key={service.title}><div className="service-domain-head"><span className="domain-icon"><MResalatIcon name={service.icon} size={24} /></span><Badge tone="neutral">{service.tag}</Badge></div><h3>{service.title}</h3><p>{service.description}</p><a href={`/segments/${segment.slug}/journey`}>مشاهده مسیر<MResalatIcon name="next" size={16} /></a></article>)}</div>;
}

function ActivityList({ segment }: { segment: SegmentConfig }) {
  return <div className="segment-activity-list">{segment.activities.map((activity, index) => <article key={`${activity.title}-${index}`}><span><MResalatIcon name={index === 0 ? 'time' : index === 1 ? 'evidence' : 'success'} size={20} /></span><div><strong>{activity.title}</strong><small>{activity.meta}</small></div><Badge tone={activity.status.includes('نیاز') || activity.status.includes('انتظار') ? 'warning' : activity.status.includes('زنده') ? 'info' : 'success'}>{activity.status}</Badge></article>)}</div>;
}

export function SegmentExperience({ segment, view, shellActive = 'segments' }: { segment: SegmentConfig; view: SegmentView; shellActive?: string }) {
  const isYoung = segment.mode === 'young';
  const isOperational = segment.mode === 'operational';
  const showCharacter = segment.id === 'general' || isYoung;

  return (
    <AppShell active={shellActive}>
      <div className={`segment-experience segment-mode-${segment.mode}`}>
        <header className="segment-context-head"><div><span className="domain-icon"><MResalatIcon name={segment.icon} size={20} /></span><div><small>تجربه متناسب با نقش</small><strong>{segment.name}</strong></div></div><SegmentNav segment={segment} view={view} /></header>

        {view === 'home' && <>
          <ParallaxLayer className="segment-hero" strength={isYoung ? 22 : 7}>
            <div className="segment-hero-copy"><span className="eyebrow">{segment.home.eyebrow}</span><h1>{segment.home.title}</h1><p>{segment.home.intro}</p>{isYoung && <div className="young-decor" aria-hidden="true"><span /><span /><span /></div>}</div>
            {showCharacter ? <div className={`segment-assistant-stage ${isYoung ? 'segment-assistant-young' : ''}`}><SmartAssistant3D mode="complete" emotion={isYoung ? 'happy' : 'listening'} /><AssistantShell variant={segment.assistantVariant} title="از اینجا شروع کنید" placeholder={segment.home.prompt} /></div> : <AssistantShell variant={segment.assistantVariant} title={isOperational ? 'دستیار عملیات' : 'از اینجا شروع کنید'} placeholder={segment.home.prompt} />}
          </ParallaxLayer>
          {isOperational ? <><QuickActions segment={segment} /><Metrics segment={segment} /></> : <><Metrics segment={segment} /><QuickActions segment={segment} /></>}
          <ProcessReviewWizard title={segment.journey.title} steps={segment.journey.steps} progress={segment.journey.progress} variant={isYoung ? 'featured' : isOperational ? 'compact' : 'standard'} currentAction={{ label: segment.journey.action, href: `/segments/${segment.slug}/journey` }} />
          <section className="segment-block"><div className="segment-block-head"><div><span className="eyebrow">پیشنهاد متناسب</span><h2>خدمات مهم برای شما</h2></div><a href={`/segments/${segment.slug}/services`}>همه خدمات<MResalatIcon name="next" size={16} /></a></div><Services segment={segment} /></section>
        </>}

        {view === 'services' && <>
          <section className="segment-advisor-hero"><div><Badge tone="info">راهنمای متناسب با {segment.shortName}</Badge><h1>{segment.pages.services.title}</h1><p>{segment.description} پیشنهادها، دلیل تناسب و مسیر شروع هر خدمت را پیش از اقدام ببینید.</p><div className="advisor-points"><span><MResalatIcon name="evidence" size={16} />دانش رسمی و به‌روز</span><span><MResalatIcon name="assistant" size={16} />توضیح ساده و کوتاه</span><span><MResalatIcon name="security" size={16} />بدون اقدام خودکار</span></div></div><AssistantShell variant="context" title="نیازتان را دقیق‌تر بگویید" placeholder={segment.home.prompt} /></section>
          <section className="segment-block"><div className="segment-block-head"><div><span className="eyebrow">خدمات منتخب</span><h2>پیشنهادهای مناسب این تجربه</h2></div></div><Services segment={segment} /></section>
          <ProcessReviewWizard title={segment.journey.title} steps={segment.journey.steps} progress={segment.journey.progress} variant="compact" currentAction={{ label: segment.journey.action, href: `/segments/${segment.slug}/journey` }} />
          <section className="clarity-banner"><span><MResalatIcon name="help" size={24} /></span><div><strong>هنوز مطمئن نیستید کدام خدمت مناسب است؟</strong><p>دستیار فقط یک سؤال روشن‌کننده می‌پرسد و بعد گزینه‌ها را محدود می‌کند.</p></div><a href="/rag">گفت‌وگو با دستیار<MResalatIcon name="next" size={16} /></a></section>
        </>}

        {view === 'journey' && <>
          <section className="journey-summary-hero"><div><span className="eyebrow">مسیر فعال</span><h1>{segment.journey.title}</h1><p>{segment.journey.progress}٪ مسیر تکمیل شده؛ اقدام بعدی شما «{segment.journey.action}» است.</p><a className="button button-primary" href="#active-step">ادامه مرحله فعلی<MResalatIcon name="next" size={16} /></a></div><div className="journey-ring" style={{ '--journey-progress': `${segment.journey.progress * 3.6}deg` } as React.CSSProperties}><strong>{segment.journey.progress}٪</strong><small>پیشرفت</small></div></section>
          <div id="active-step"><ProcessReviewWizard title={segment.pages.journey.title} steps={segment.journey.steps} progress={segment.journey.progress} variant="featured" currentAction={{ label: segment.journey.action, href: '#activity' }} /></div>
          <div className="journey-detail-grid" id="activity"><section className="segment-block"><div className="segment-block-head"><div><span className="eyebrow">فعالیت و وضعیت</span><h2>آخرین رویدادها</h2></div></div><ActivityList segment={segment} /></section><aside className="next-action-card"><span className="domain-icon"><MResalatIcon name="next" size={24} /></span><small>اقدام بعدی</small><h2>{segment.journey.action}</h2><p>پیش از ادامه، جزئیات و اثر این مرحله به شما نمایش داده می‌شود.</p><button className="button button-primary" type="button">شروع اقدام</button><span className="safe-note"><MResalatIcon name="security" size={16} />بدون تأیید شما تغییری انجام نمی‌شود.</span></aside></div>
        </>}
      </div>
    </AppShell>
  );
}
