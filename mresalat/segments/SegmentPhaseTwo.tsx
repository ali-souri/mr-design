'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { useMemo, useState, type ReactNode } from 'react';
import { AppShell } from '@/mresalat/core/AppShell';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { Badge } from '@/mresalat/core/primitives';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';
import { ActiveJourneyCard } from './ActiveJourneyCard';
import { SegmentAIEntry } from './SegmentAIEntry';
import { NextBestAction } from '@/mresalat/contexts/RelationshipComponents';
import type { SegmentSlug } from './experience-data';
import {
  formatToman,
  type PhaseTwoView,
  individualJourneys,
  individualServiceGroups,
  organizationJourneys,
  organizationPersonnel,
  organizationPrograms,
  organizationServiceGroups,
  youthActivity,
  youthGoals,
  youthLearning,
  youthRewards,
  type ActiveJourney,
  type ServiceNeedGroup,
} from './phase-two-data';

export const phaseTwoNav: Record<SegmentSlug, { label: string; view: PhaseTwoView; icon: MResalatIconName }[]> = {
  individual: [
    { label: 'خانه من', view: 'home', icon: 'home' }, { label: 'خدمات', view: 'services', icon: 'grid' }, { label: 'مسیرهای من', view: 'journeys', icon: 'assessment' },
  ],
  'under-18': [
    { label: 'خانه من', view: 'home', icon: 'home' }, { label: 'هدف‌ها', view: 'goals', icon: 'goal' }, { label: 'پاداش‌ها', view: 'rewards', icon: 'reward' }, { label: 'فعالیت', view: 'activity', icon: 'finance' }, { label: 'یادگیری', view: 'learning', icon: 'learning' },
  ],
  organization: [
    { label: 'خانه سازمان', view: 'home', icon: 'home' }, { label: 'مزایا و اعتبار', view: 'benefits', icon: 'credit' }, { label: 'پرسنل', view: 'personnel', icon: 'employee' }, { label: 'گزارش‌ها', view: 'reports', icon: 'reports' }, { label: 'خدمات', view: 'services', icon: 'grid' }, { label: 'فرایندها', view: 'journeys', icon: 'assessment' },
  ],
};

const segmentCopy = {
  individual: { label: 'تجربه شخصی', title: 'صبح بخیر؛ مسیر مالی و خدماتی شما آماده است', description: 'عضویت، درخواست‌ها و خدمات پیشنهادی را بدون شلوغی دنبال کنید.', icon: 'profile' as MResalatIconName },
  'under-18': { label: 'فضای نوجوان', title: 'سلام آرین! امروز برای هدفت چه قدمی برمی‌داری؟', description: 'هدف‌ها، پاداش‌ها، خرج‌ها و یادگیری مالی را ساده و امن ببین.', icon: 'child' as MResalatIconName },
  organization: { label: 'پنل سازمانی', title: 'شرکت راهکار نمونه پارس', description: 'فرایندهای سازمان، مزایای کارکنان و گزارش‌های مدیریتی در یک نمای ساختاریافته.', icon: 'organization' as MResalatIconName },
} as const;

function SegmentPhaseTwoFrame({ segment, view, children }: { segment: SegmentSlug; view: PhaseTwoView; children: ReactNode }) {
  const copy = segmentCopy[segment];
  return <AppShell active="segments"><div className={`segment-phase-two phase-two-${segment}`}>
    <header className="phase-two-context">
      <a className="phase-two-identity" href={`/segments/${segment}/home`}><span><MResalatIcon name={copy.icon} size={20} /></span><div><small>{copy.label}</small><strong>{segment === 'individual' ? 'اشخاص حقیقی' : segment === 'under-18' ? 'زیر ۱۸ سال' : 'عضویت سازمانی'}</strong></div></a>
      <nav aria-label={`ناوبری ${copy.label}`}>{phaseTwoNav[segment].map((item) => <a className={item.view === view ? 'active' : ''} aria-current={item.view === view ? 'page' : undefined} href={`/segments/${segment}/${item.view}`} key={item.view}><MResalatIcon name={item.icon} size={16} />{item.label}</a>)}</nav>
      <Badge tone="neutral">داده نمایشی</Badge>
    </header>
    {children}
  </div></AppShell>;
}

export function SegmentHomeShell({ segment, aiEntry, children }: { segment: SegmentSlug; aiEntry: ReactNode; children: ReactNode }) {
  const copy = segmentCopy[segment];
  return <SegmentPhaseTwoFrame segment={segment} view="home">
    <section className="phase-two-welcome"><span className="eyebrow">{copy.label}</span><h1>{copy.title}</h1><p>{copy.description}</p></section>
    {aiEntry}
    <div className="phase-two-home-content">{children}</div>
  </SegmentPhaseTwoFrame>;
}

function SectionHead({ eyebrow, title, href, linkLabel = 'مشاهده همه' }: { eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return <header className="phase-two-section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{href && <a href={href}>{linkLabel}<MResalatIcon name="next" size={16} /></a>}</header>;
}

function ModuleLink({ icon, title, detail, href, tone = 'brand', onClick }: { icon: MResalatIconName; title: string; detail: string; href: string; tone?: string; onClick?: () => void }) {
  return <a className={`phase-two-module tone-${tone}`} href={href} onClick={onClick}><span><MResalatIcon name={icon} size={24} /></span><div><strong>{title}</strong><small>{detail}</small></div><MResalatIcon name="next" size={16} /></a>;
}

function ServiceCard({ serviceId, title, description, href }: { serviceId: string; title: string; description: string; href: string }) {
  const service = ecosystemServices.find((item) => item.id === serviceId);
  if (!service) return null;
  return <a className="phase-two-service-card" href={href}><MResalatServiceIcon service={service} size={48} /><div><small>{service.titleFa}</small><strong>{title}</strong><p>{description}</p></div><MResalatIcon name="next" size={16} /></a>;
}

function ServiceGroups({ groups }: { groups: ServiceNeedGroup[] }) {
  return <div className="phase-two-service-groups">{groups.map((group) => <section key={group.title}><header><h2>{group.title}</h2><p>{group.description}</p></header><div>{group.items.map((item) => <ServiceCard {...item} key={`${group.title}-${item.serviceId}-${item.title}`} />)}</div></section>)}</div>;
}

function RequestStatus({ journeys }: { journeys: ActiveJourney[] }) {
  const groups = [
    { state: 'active', title: 'در حال انجام' },
    { state: 'waiting', title: 'در انتظار' },
    { state: 'completed', title: 'تکمیل‌شده' },
  ] as const;
  return <div className="phase-two-status-groups">{groups.map((group) => <section key={group.state}><SectionHead eyebrow="وضعیت فرایند" title={group.title} /><div className="phase-two-journey-grid">{journeys.filter((journey) => journey.state === group.state).map((journey) => <ActiveJourneyCard journey={journey} segment={journeys === individualJourneys ? 'individual' : 'organization'} key={journey.id} />)}</div></section>)}</div>;
}

function IndividualHome() {
  return <SegmentHomeShell segment="individual" aiEntry={<SegmentAIEntry segment="individual" assistantMode="featured" mascotMode="portrait" />}>
    <section><SectionHead eyebrow="اقدام بعدی" title="مسیرهای فعال شما" href="/segments/individual/journeys" /><div className="phase-two-journey-grid"><ActiveJourneyCard journey={individualJourneys[0]} segment="individual" /><ActiveJourneyCard journey={individualJourneys[1]} segment="individual" compact /></div></section>
    <section><SectionHead eyebrow="دسترسی سریع" title="خدمات پرکاربرد" href="/segments/individual/services" /><div className="phase-two-module-grid individual-modules">
      <ModuleLink icon="loan" title="وام" detail="شرایط و مسیر درخواست" href="/loan" />
      <ModuleLink icon="orders" title="ام‌بازار" detail="خرید و درخواست اقساط" href="/examples/mbazar" />
      <ModuleLink icon="advocacy" title="ام‌حامی" detail="حمایت‌های مناسب اعضا" href="/examples" />
      <ModuleLink icon="insurance" title="ام‌بیمه" detail="پوشش‌های قابل بررسی" href="/examples" />
      <ModuleLink icon="finance" title="حسابداری شخصی" detail="نمونه خلاصه دخل‌وخرج" href="/segments/individual/services" />
    </div></section>
    <div className="phase-two-split"><section className="phase-two-panel"><SectionHead eyebrow="آخرین وضعیت" title="فعالیت اخیر" /><div className="phase-two-activity-list"><span><MResalatIcon name="success" size={20} /><div><strong>شماره همراه تأیید شد</strong><small>امروز · ۱۰:۳۲</small></div></span><span><MResalatIcon name="time" size={20} /><div><strong>احراز هویت آماده ادامه است</strong><small>اقدام پیشنهادی امروز</small></div></span><span><MResalatIcon name="view" size={20} /><div><strong>شرایط وام مشاهده شد</strong><small>دیروز · ۱۸:۴۵</small></div></span></div></section><section className="phase-two-advisor"><span><MResalatIcon name="support" size={24} /></span><div><small>نیاز به همراهی دارید؟</small><h2>مشاور خدمات شخصی</h2><p>پیش از هر اقدام، شرایط و قدم بعدی را با زبان ساده مرور کنید.</p></div><a href="/rag">گفت‌وگو با راهنما</a></section></div>
  </SegmentHomeShell>;
}

function YouthGoalCard({ goal, compact = false }: { goal: (typeof youthGoals)[number]; compact?: boolean }) {
  const href = goal.id === 'bike' ? '/examples/mbazar/search?q=دوچرخه&source=youth-goal&goal=bike&child=arya' : '/segments/under-18/goals';
  return <article className={`youth-goal-card ${compact ? 'is-compact' : ''}`} id={goal.id}><header><span><MResalatIcon name={goal.icon} size={24} /></span><div><small>هدف پس‌انداز</small><h3>{goal.title}</h3></div></header><div className="youth-goal-numbers"><strong>{formatToman(goal.saved)}</strong><span>از {formatToman(goal.target)}</span></div><div className="youth-goal-progress" role="progressbar" aria-label={`پیشرفت هدف ${goal.title}`} aria-valuenow={goal.progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${goal.progress}%` }} /></div><footer><b>{goal.progress}٪ تکمیل شده</b><a href={href} onClick={() => trackEvent({ event: goal.id === 'bike' ? 'cross_service_journey_opened' : 'youth_goal_opened', surface: 'segment', entityId: goal.id })}>{goal.id === 'bike' ? 'مشاهده گزینه‌ها در ام‌بازار' : goal.nextAction}<MResalatIcon name="next" size={16} /></a></footer></article>;
}

function YouthRewardCard({ reward }: { reward: (typeof youthRewards)[number] }) {
  return <article className={`youth-reward-card reward-${reward.status}`}><span><MResalatIcon name={reward.status === 'completed' ? 'success' : 'time'} size={20} /></span><div><strong>{reward.title}</strong><small>{reward.note}</small></div><b>+{reward.points} امتیاز</b><a href="/segments/under-18/rewards" aria-label={`مشاهده ${reward.title}`} onClick={() => trackEvent({ event: 'youth_reward_opened', surface: 'segment', entityId: reward.id })}><MResalatIcon name="next" size={16} /></a></article>;
}

function YouthHome() {
  return <SegmentHomeShell segment="under-18" aiEntry={<SegmentAIEntry segment="under-18" assistantMode="featured" mascotMode="complete" greeting />}>
    <section><SectionHead eyebrow="هدف‌های من" title="برای چیزی که دوست داری پس‌انداز کن" href="/segments/under-18/goals" /><div className="youth-goal-grid"><YouthGoalCard goal={youthGoals[0]} /><YouthGoalCard goal={youthGoals[1]} compact /></div></section>
    <div className="phase-two-split youth-split"><section className="phase-two-panel"><SectionHead eyebrow="مسئولیت و پاداش" title="قدم‌های خوب این هفته" href="/segments/under-18/rewards" /><div className="youth-reward-list">{youthRewards.slice(0, 2).map((reward) => <YouthRewardCard reward={reward} key={reward.id} />)}</div></section><section className="phase-two-panel"><SectionHead eyebrow="پول من" title="فعالیت ساده و روشن" href="/segments/under-18/activity" /><div className="phase-two-activity-list">{youthActivity.slice(0, 3).map((item) => <span key={item.id}><MResalatIcon name={item.icon} size={20} /><div><strong>{item.title}</strong><small>{item.kind} · {item.date}</small></div><b>{item.amount}</b></span>)}</div></section></div>
    <section><SectionHead eyebrow="یادگیری و رشد" title="چیزهای تازه‌ای که می‌توانی یاد بگیری" href="/segments/under-18/learning" /><div className="phase-two-module-grid youth-learning-modules"><ModuleLink icon="finance" title="پول توجیبی من" detail="ماهانه · نیازمند تأیید والد برای تغییر" href="/segments/under-18/allowance" tone="violet" /><ModuleLink icon="learning" title="پس‌انداز برای یک هدف" detail="۲ از ۵ درس · ۴۰٪" href="/segments/under-18/learning" tone="violet" /><ModuleLink icon="assessment" title="سنجش سایا" detail="پیشنهاد اختیاری برای شناخت بهتر" href="/examples" tone="cyan" /><ModuleLink icon="health" title="عادت‌های سالم" detail="راهنمای ساده ام‌سلامت" href="/examples" tone="green" /></div></section>
  </SegmentHomeShell>;
}

function OrganizationProgramCard({ program, compact = false }: { program: (typeof organizationPrograms)[number]; compact?: boolean }) {
  const percent = Math.round(program.used / program.allocated * 100);
  return <article className={`organization-program-card ${compact ? 'is-compact' : ''}`} id={program.id}><header><div><small>برنامه {program.status}</small><h3>{program.title}</h3></div><Badge tone="success">{program.status}</Badge></header><dl><div><dt>تخصیص‌یافته</dt><dd>{formatToman(program.allocated)}</dd></div><div><dt>مصرف‌شده</dt><dd>{formatToman(program.used)}</dd></div><div><dt>باقی‌مانده</dt><dd>{formatToman(program.remaining)}</dd></div><div><dt>افراد واجد شرایط</dt><dd>{program.eligible} نفر</dd></div></dl><div className="organization-program-progress" role="progressbar" aria-label={`مصرف ${program.title}`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%` }} /></div><footer><span>{percent}٪ مصرف شده</span><a href="/segments/organization/benefits" onClick={() => trackEvent({ event: 'organization_program_opened', surface: 'segment', entityId: program.id })}>جزئیات برنامه<MResalatIcon name="next" size={16} /></a></footer></article>;
}

function OrganizationHome() {
  return <SegmentHomeShell segment="organization" aiEntry={<SegmentAIEntry segment="organization" assistantMode="featured" mascotMode="portrait" />}>
    <NextBestAction icon="credit" eyebrow="اقدام مدیر سازمان" title="۳ تخصیص اعتبار نیازمند تأیید است" detail="جزئیات برنامه، پرسنل و مبلغ را پیش از تأیید هویت مرور کنید." href="/segments/organization/credit/allocate" actionLabel="مرور تخصیص‌ها" tone="warning" />
    <section><SectionHead eyebrow="فرایندهای نیازمند توجه" title="اقدام‌های سازمان" href="/segments/organization/journeys" /><div className="phase-two-journey-grid"><ActiveJourneyCard journey={organizationJourneys[0]} segment="organization" /><ActiveJourneyCard journey={organizationJourneys[1]} segment="organization" compact /></div></section>
    <section><SectionHead eyebrow="برنامه‌ها و مزایا" title="اعتبار و حمایت کارکنان" href="/segments/organization/benefits" /><div className="organization-program-grid">{organizationPrograms.map((program) => <OrganizationProgramCard program={program} key={program.id} compact />)}</div></section>
    <section><SectionHead eyebrow="مدیریت ساختاریافته" title="پرسنل، گزارش و خدمات" /><div className="phase-two-module-grid organization-modules"><ModuleLink icon="employee" title="پرسنل" detail="۱۸۶ نفر واجد شرایط نمونه" href="/segments/organization/personnel" onClick={() => trackEvent({ event: 'organization_personnel_opened', surface: 'segment', entityId: 'personnel' })} /><ModuleLink icon="credit" title="تخصیص اعتبار" detail="فرایند بازبینی و تأیید" href="/segments/organization/credit/allocate" /><ModuleLink icon="reports" title="گزارش مصرف" detail="۷۲٪ از اعتبار مصرف شده" href="/segments/organization/reports" onClick={() => trackEvent({ event: 'organization_report_opened', surface: 'segment', entityId: 'credit-usage' })} /><ModuleLink icon="insurance" title="بیمه سازمانی" detail="یک فرایند در انتظار" href="/segments/organization/journeys#insurance" /><ModuleLink icon="assessment" title="ارزیابی و سلامت" detail="سایا و ام‌سلامت" href="/segments/organization/services" /></div></section>
  </SegmentHomeShell>;
}

function PageFrame({ segment, view, eyebrow, title, description, children }: { segment: SegmentSlug; view: PhaseTwoView; eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <SegmentPhaseTwoFrame segment={segment} view={view}><header className="phase-two-page-head"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></header>{children}</SegmentPhaseTwoFrame>;
}

function IndividualServices() {
  return <PageFrame segment="individual" view="services" eyebrow="بر اساس نیاز شما" title="خدمات شخصی ام‌رسالت" description="خدمات به‌جای نام‌های داخلی، بر اساس کاری که می‌خواهید انجام دهید گروه‌بندی شده‌اند."><ServiceGroups groups={individualServiceGroups} /></PageFrame>;
}

function IndividualJourneys() {
  return <PageFrame segment="individual" view="journeys" eyebrow="فرایند، نه فهرست خدمات" title="مسیرها و درخواست‌های من" description="فرایندهای در حال انجام، منتظر و تکمیل‌شده را با اقدام بعدی واضح ببینید."><RequestStatus journeys={individualJourneys} /><section className="phase-two-process-detail"><SectionHead eyebrow="مرور مرحله‌ها" title="تکمیل عضویت" /><ProcessReviewWizard title="تکمیل عضویت" steps={individualJourneys[0].steps} progress={individualJourneys[0].progress} variant="featured" currentAction={{ label: individualJourneys[0].nextAction, href: individualJourneys[0].href }} /></section></PageFrame>;
}

function YouthGoalsPage() {
  return <PageFrame segment="under-18" view="goals" eyebrow="قلک و هدف" title="هدف‌های پس‌انداز من" description="مبلغ هدف، پیشرفت و قدم بعدی را ببین؛ همه عددها ساختگی و بدون جابه‌جایی پول هستند."><div className="youth-goal-grid page-grid">{youthGoals.map((goal) => <YouthGoalCard goal={goal} key={goal.id} />)}<article className="youth-new-goal"><MResalatIcon name="add" size={24} /><h2>یک هدف تازه بساز</h2><p>اسم هدف و مبلغ تقریبی را انتخاب کن؛ این نمونه چیزی از حساب برداشت نمی‌کند.</p><button type="button">ساخت هدف نمایشی</button></article></div></PageFrame>;
}

function YouthRewardsPage() {
  return <PageFrame segment="under-18" view="rewards" eyebrow="مسئولیت و رشد" title="پاداش‌ها و مسئولیت‌های من" description="پاداش برای انجام کارهای مشخص و یادگیری است؛ تأیید سرپرست همیشه واضح نمایش داده می‌شود."><div className="youth-rewards-page"><section><SectionHead eyebrow="نیازمند بررسی" title="منتظر تأیید سرپرست" /><div className="youth-reward-list">{youthRewards.filter((item) => item.status === 'pending').map((reward) => <YouthRewardCard reward={reward} key={reward.id} />)}</div></section><section><SectionHead eyebrow="انجام‌شده" title="قدم‌های تکمیل‌شده" /><div className="youth-reward-list">{youthRewards.filter((item) => item.status === 'completed').map((reward) => <YouthRewardCard reward={reward} key={reward.id} />)}</div></section><aside><MResalatIcon name="parent" size={24} /><h2>نقش سرپرست</h2><p>سرپرست فقط انجام مسئولیت را تأیید می‌کند. این نمونه پاداش مالی واقعی ایجاد نمی‌کند.</p></aside></div></PageFrame>;
}

function YouthActivityPage() {
  const groups = ['همه', 'واریز', 'خرید', 'برداشت', 'پس‌انداز'];
  const [filter, setFilter] = useState('همه');
  const visible = youthActivity.filter((item) => filter === 'همه' || item.kind === filter);
  return <PageFrame segment="under-18" view="activity" eyebrow="ساده و قابل فهم" title="فعالیت مالی من" description="واریز، خرید، برداشت و پس‌انداز را بدون اصطلاحات پیچیده مرور کن."><div className="youth-activity-filters" role="group" aria-label="فیلتر فعالیت">{groups.map((group) => <button type="button" aria-pressed={filter === group} className={filter === group ? 'active' : ''} onClick={() => setFilter(group)} key={group}>{group}</button>)}</div><section className="youth-activity-page" aria-live="polite">{visible.map((item) => <article key={item.id}><span><MResalatIcon name={item.icon} size={24} /></span><div><strong>{item.title}</strong><small>{item.kind} · {item.date}</small></div><b>{item.amount}</b></article>)}</section><div className="youth-safe-banner"><MResalatIcon name="security" size={24} /><div><strong>این فقط یک نمای آموزشی است</strong><p>هیچ تراکنش، مانده یا حساب واقعی نمایش داده نمی‌شود.</p></div></div></PageFrame>;
}

function YouthLearningPage() {
  return <PageFrame segment="under-18" view="learning" eyebrow="یادگیری و رشد" title="درس‌های پیشنهادی برای من" description="دوره‌های کوتاه درباره هدف‌گذاری، خرید آگاهانه و عادت‌های سالم."><div className="youth-learning-grid">{youthLearning.map((course) => { const service = ecosystemServices.find((item) => item.id === course.serviceId); return <article key={course.id}>{service && <MResalatServiceIcon service={service} size={48} />}<div><small>{course.lessons}</small><h2>{course.title}</h2><div role="progressbar" aria-label={`پیشرفت ${course.title}`} aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${course.progress}%` }} /></div><p>{course.progress}٪ پیشرفت</p></div><button type="button">{course.progress ? 'ادامه درس' : 'شروع دوره'}</button></article>; })}</div><section className="youth-secondary-recommendations"><ModuleLink icon="assessment" title="سنجش سایا" detail="پیشنهاد ثانویه و اختیاری" href="/examples" tone="cyan" /><ModuleLink icon="health" title="راهنمای ام‌سلامت" detail="عادت‌های سالم برای نوجوانان" href="/examples" tone="green" /></section></PageFrame>;
}

function OrganizationBenefitsPage() {
  return <PageFrame segment="organization" view="benefits" eyebrow="مزایا و اعتبار سازمانی" title="برنامه‌های فعال کارکنان" description="تخصیص، مصرف، مانده و جمعیت واجد شرایط با داده‌های ساختگی و ایمن."><div className="organization-program-grid page-grid">{organizationPrograms.map((program) => <OrganizationProgramCard program={program} key={program.id} />)}</div><section className="organization-credit-summary"><div><small>کل تخصیص</small><strong>{formatToman(3_380_000_000)}</strong></div><div><small>کل مصرف</small><strong>{formatToman(2_139_600_000)}</strong></div><div><small>کل مانده</small><strong>{formatToman(1_240_400_000)}</strong></div><div><small>پوشش نمونه</small><strong>۲ برنامه فعال</strong></div></section></PageFrame>;
}

function OrganizationPersonnelPage() {
  const [query, setQuery] = useState('');
  const [eligibility, setEligibility] = useState('همه');
  const visible = useMemo(() => organizationPersonnel.filter((person) => (eligibility === 'همه' || person.eligibility === eligibility) && `${person.name} ${person.unit}`.includes(query.trim())), [eligibility, query]);
  return <PageFrame segment="organization" view="personnel" eyebrow="داده ساختگی پرسنل" title="پرسنل و وضعیت مزایا" description="جست‌وجو و فیلتر روی رکوردهای کاملاً خیالی؛ هیچ داده منابع انسانی واقعی وجود ندارد."><div className="organization-personnel-tools"><label><span className="sr-only">جست‌وجوی پرسنل نمونه</span><MResalatIcon name="search" size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی نام یا واحد…" /></label><select value={eligibility} onChange={(event) => setEligibility(event.target.value)} aria-label="فیلتر وضعیت برخورداری"><option>همه</option><option>واجد شرایط</option><option>نیازمند بررسی</option></select></div><div className="organization-personnel-table" role="region" aria-label="فهرست پرسنل نمونه" tabIndex={0}><table><thead><tr><th>نام نمونه</th><th>واحد</th><th>وضعیت مزایا</th><th>وضعیت اعتبار</th><th>مانده نمونه</th></tr></thead><tbody>{visible.map((person) => <tr key={person.id}><td><span>{person.name.slice(0, 1)}</span><strong>{person.name}</strong></td><td>{person.unit}</td><td><Badge tone={person.eligibility === 'واجد شرایط' ? 'success' : 'warning'}>{person.eligibility}</Badge></td><td>{person.credit}</td><td>{person.amount}</td></tr>)}</tbody></table></div><p className="organization-result-count" aria-live="polite">{visible.length} رکورد نمایشی پیدا شد.</p></PageFrame>;
}

function OrganizationReportsPage() {
  const metrics = [{ label: 'اعتبار تخصیصی', value: '۳٫۳۸ میلیارد', percent: 100, tone: 'brand' }, { label: 'اعتبار مصرف‌شده', value: '۲٫۱۴ میلیارد', percent: 63, tone: 'cyan' }, { label: 'اعتبار باقی‌مانده', value: '۱٫۲۴ میلیارد', percent: 37, tone: 'green' }];
  return <PageFrame segment="organization" view="reports" eyebrow="خلاصه مدیریتی" title="گزارش برنامه‌های سازمان" description="نمایش متنی و بصری ساده از اعتبار و استفاده از مزایا؛ بدون کتابخانه نمودار و بدون داده واقعی."><section className="organization-report-metrics">{metrics.map((metric) => <article key={metric.label}><small>{metric.label}</small><strong>{metric.value} تومان</strong><div role="img" aria-label={`${metric.label}: ${metric.value} تومان، ${metric.percent} درصد از کل`}><span className={`tone-${metric.tone}`} style={{ width: `${metric.percent}%` }} /></div><p>{metric.percent}٪ از کل اعتبار نمونه</p></article>)}</section><div className="organization-report-grid"><section><SectionHead eyebrow="استفاده از مزایا" title="سهم برنامه‌ها" /><div className="organization-usage-bars"><div><span>اعتبار خرید کارکنان</span><b>۷۲٪</b><i><em style={{ width: '72%' }} /></i></div><div><span>حمایت سلامت خانواده</span><b>۴۲٪</b><i><em style={{ width: '42%' }} /></i></div><div><span>یادگیری کارکنان</span><b>۳۱٪</b><i><em style={{ width: '31%' }} /></i></div></div></section><aside><MResalatIcon name="reports" size={24} /><h2>۵ گزارش نمونه</h2><p>آخرین به‌روزرسانی نمایشی: امروز، ۱۰:۳۰</p><button type="button" onClick={() => trackEvent({ event: 'organization_report_opened', surface: 'segment', entityId: 'summary' })}>مرور جزئیات متنی</button></aside></div></PageFrame>;
}

function OrganizationServicesPage() {
  return <PageFrame segment="organization" view="services" eyebrow="خدمات متناسب با سازمان" title="حمایت، سلامت و رشد سازمانی" description="هویت‌های رسمی خدمات ام‌رسالت با دسته‌بندی مناسب نیازهای سازمان."><ServiceGroups groups={organizationServiceGroups} /></PageFrame>;
}

function OrganizationJourneysPage() {
  return <PageFrame segment="organization" view="journeys" eyebrow="فرایندهای ساختاریافته" title="مسیرهای سازمان" description="فرایندهای فعال، منتظر و تکمیل‌شده با اقدام بعدی مشخص."><RequestStatus journeys={organizationJourneys} /><section className="phase-two-process-detail"><SectionHead eyebrow="مرور مرحله‌ها" title="عضویت سازمان" /><ProcessReviewWizard title="تکمیل عضویت سازمان" steps={organizationJourneys[0].steps} progress={organizationJourneys[0].progress} variant="featured" currentAction={{ label: organizationJourneys[0].nextAction, href: organizationJourneys[0].href }} /></section></PageFrame>;
}

export function SegmentPhaseTwoPage({ segment, view }: { segment: SegmentSlug; view: PhaseTwoView }) {
  if (segment === 'individual') {
    if (view === 'home') return <IndividualHome />;
    if (view === 'services') return <IndividualServices />;
    return <IndividualJourneys />;
  }
  if (segment === 'under-18') {
    if (view === 'home') return <YouthHome />;
    if (view === 'goals') return <YouthGoalsPage />;
    if (view === 'rewards') return <YouthRewardsPage />;
    if (view === 'activity') return <YouthActivityPage />;
    return <YouthLearningPage />;
  }
  if (view === 'home') return <OrganizationHome />;
  if (view === 'benefits') return <OrganizationBenefitsPage />;
  if (view === 'personnel') return <OrganizationPersonnelPage />;
  if (view === 'reports') return <OrganizationReportsPage />;
  if (view === 'services') return <OrganizationServicesPage />;
  return <OrganizationJourneysPage />;
}

export function SegmentPhaseTwoShowcase() {
  return <div className="phase-two-showcase"><SegmentAIEntry segment="individual" assistantMode="compact" mascotMode="portrait" staticMascot /><div className="phase-two-journey-grid"><ActiveJourneyCard journey={individualJourneys[0]} segment="individual" /><YouthGoalCard goal={youthGoals[0]} /></div><div className="phase-two-split"><YouthRewardCard reward={youthRewards[0]} /><OrganizationProgramCard program={organizationPrograms[0]} compact /></div><section className="organization-report-metrics"><article><small>گزارش مصرف نمونه</small><strong>۷۲٪ مصرف</strong><div role="img" aria-label="۷۲ درصد مصرف شده"><span className="tone-cyan" style={{ width: '72%' }} /></div><p>۲۸٪ باقی‌مانده</p></article></section></div>;
}
