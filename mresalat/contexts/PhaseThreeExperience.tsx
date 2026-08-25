'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppShell } from '@/mresalat/core/AppShell';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { SegmentAIEntry } from '@/mresalat/segments/SegmentAIEntry';
import { formatToman, organizationPersonnel, organizationPrograms, youthLearning, youthRewards } from '@/mresalat/segments/phase-two-data';
import { ApprovalRequestCard, ChildIdentity, ChildSelector, CrossServiceContextMarker, NextBestAction, PermissionAction, PermissionState } from './RelationshipComponents';
import { useMResalatContext } from './context-state';
import { childActivity, children, crossServiceJourneys, employeeBenefit, organizationApprovalStates, parentApprovals, sortHomePriorities } from './fixtures';
import type { ChildFixture, HomePriorityItem } from './types';

type ParentView = 'home' | 'children' | 'approvals' | 'services';
type ChildView = 'overview' | 'goals' | 'activity' | 'rewards' | 'allowance';
type EmployeeView = 'home' | 'benefits' | 'credit' | 'services';

const parentPrompts = [
  { label: 'تراکنش‌های فرزندم', query: 'تراکنش‌های فرزندم را ببینم' },
  { label: 'قلک فرزندم', query: 'قلک فرزندم چقدر پیشرفت کرده؟' },
  { label: 'پول توجیبی', query: 'پول توجیبی آریا' },
  { label: 'پاداش‌ها', query: 'پاداش‌های فرزندم' },
  { label: 'دوره‌های آموزشی', query: 'دوره مناسب فرزندم' },
];

const employeePrompts = [
  { label: 'اعتبار سازمانی من', query: 'اعتبار سازمانی من چقدره؟' },
  { label: 'چه مزایایی دارم؟', query: 'چه مزایایی دارم؟' },
  { label: 'کجا خرج کنم؟', query: 'کجا می‌توانم اعتبارم را خرج کنم؟' },
  { label: 'بیمه سازمانی', query: 'بیمه سازمانی من' },
  { label: 'خدمات رفاهی', query: 'خدمات رفاهی' },
];

function ContextFrame({ kind, active, children: content }: { kind: 'parent' | 'employee' | 'manager'; active: string; children: ReactNode }) {
  const nav = kind === 'parent' ? [
    ['home', 'خانه', '/segments/parent/home', 'home'], ['children', 'فرزندان', '/segments/parent/children', 'child'], ['approvals', 'تأییدها', '/segments/parent/approvals', 'assessment'], ['services', 'خدمات', '/segments/parent/services', 'grid'],
  ] : kind === 'employee' ? [
    ['home', 'خانه', '/segments/organization-employee/home', 'home'], ['benefits', 'مزایای من', '/segments/organization-employee/benefits', 'gift'], ['credit', 'اعتبار', '/segments/organization-employee/credit', 'credit'], ['services', 'خدمات', '/segments/organization-employee/services', 'grid'],
  ] : [
    ['home', 'خانه', '/segments/organization/home', 'home'], ['personnel', 'پرسنل', '/segments/organization/personnel', 'employee'], ['benefits', 'برنامه‌ها', '/segments/organization/benefits', 'gift'], ['reports', 'گزارش‌ها', '/segments/organization/reports', 'reports'],
  ];
  return <AppShell active="segments"><div className={`phase-three phase-three-${kind}`}>
    <header className="contextual-nav">
      <div><MResalatIcon name={kind === 'parent' ? 'parent' : kind === 'employee' ? 'employee' : 'organization'} size={20} /><span><small>{kind === 'parent' ? 'زمینه والد' : kind === 'employee' ? 'زمینه پرسنل' : 'زمینه مدیر سازمان'}</small><strong>{kind === 'parent' ? 'آریا و سارا' : 'شرکت نمونه'}</strong></span></div>
      <nav aria-label="ناوبری زمینه فعالیت">{nav.map(([id, label, href, icon]) => <a className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined} href={href} key={id}><MResalatIcon name={icon as MResalatIconName} size={16} />{label}</a>)}</nav>
      <a className="all-services-link" href="/examples"><MResalatIcon name="grid" size={16} />همه خدمات</a>
    </header>
    {content}
  </div></AppShell>;
}

function SectionHead({ eyebrow, title, href, action = 'مشاهده همه' }: { eyebrow: string; title: string; href?: string; action?: string }) {
  return <header className="phase-three-section-head"><div><span>{eyebrow}</span><h2>{title}</h2></div>{href && <a href={href}>{action}<MResalatIcon name="next" size={16} /></a>}</header>;
}

function GoalCard({ child, parentView = true }: { child: ChildFixture; parentView?: boolean }) {
  const journey = crossServiceJourneys[0];
  return <article className={`linked-goal-card accent-${child.accent}`}><header><span><MResalatIcon name={child.goal.icon} size={24} /></span><div><small>{parentView ? `هدف فعال ${child.nameFa}` : 'هدف من'}</small><h3>{child.goal.title}</h3></div><b>{child.goal.progress.toLocaleString('fa-IR')}٪</b></header><div className="linked-progress"><span style={{ width: `${child.goal.progress}%` }} /></div><div className="linked-goal-values"><span><small>پس‌انداز</small><strong>{formatToman(child.goal.saved)}</strong></span><span><small>هدف</small><strong>{formatToman(child.goal.target)}</strong></span></div>{child.id === 'arya' && <footer><a href={journey.targetHref} onClick={() => trackEvent({ event: 'cross_service_journey_opened', surface: 'segment', entityId: journey.id })}>مشاهده گزینه‌ها در ام‌بازار<MResalatIcon name="next" size={16} /></a></footer>}</article>;
}

function ParentActivity({ childId, limit }: { childId: keyof typeof childActivity; limit?: number }) {
  const rows = childActivity[childId].slice(0, limit);
  return <div className="privacy-activity-list">{rows.map((row) => <article key={row.id}><span><MResalatIcon name={row.visibility === 'visible' ? 'finance' : row.visibility === 'masked' ? 'lock' : 'view'} size={20} /></span><div><strong>{row.title}</strong><small>{row.detail} · {row.date}</small></div><b>{row.amount}</b><PermissionState state={row.visibility === 'visible' ? 'allowed' : 'view-only'} compact /></article>)}</div>;
}

export function ParentExperience({ view = 'home', pending = true }: { view?: ParentView; pending?: boolean }) {
  const { selectedChildId } = useMResalatContext();
  const child = children.find((item) => item.id === selectedChildId) ?? children[0];
  const priorities = useMemo(() => sortHomePriorities<HomePriorityItem['componentData']>([
    ...(pending ? [{ id: 'approval', priority: 100, type: 'approval' as const, componentData: {} }] : []),
    { id: 'goal', priority: 80, type: 'journey', componentData: {} },
    { id: 'activity', priority: 60, type: 'service', componentData: {} },
    { id: 'learning', priority: 40, type: 'recommendation', componentData: {} },
  ]), [pending]);

  return <ContextFrame kind="parent" active={view}>
    {view === 'home' && <>
      <section className="phase-three-hero"><span>فضای والد</span><h1>همراهی با رشد، بدون ورود بیش از حد به حریم شخصی</h1><p>هدف‌ها، درخواست‌های تأیید و بخش مجاز فعالیت فرزندتان را در یک زمینه روشن دنبال کنید.</p></section>
      <SegmentAIEntry segment="individual" suggestions={parentPrompts} title="برای فرزندتان چه کاری می‌خواهید انجام دهید؟" placeholder="مثلاً: پول توجیبی آریا چه زمانی واریز می‌شود؟" assistantMode="featured" />
      <section><SectionHead eyebrow="زیرزمینه والد" title="کدام فرزند؟" /><ChildSelector /></section>
      <div className="priority-stack">
        {priorities.map((item) => item.id === 'approval' ? <NextBestAction key={item.id} icon="assessment" eyebrow="۱ درخواست تأیید جدید" title={`تأیید پاداش ${child.nameFa}`} detail="پیش از تصمیم، درخواست و اثر آن را مرور کنید." href="/segments/parent/approvals" actionLabel="مرور درخواست" tone="warning" /> : item.id === 'goal' ? <section key={item.id}><SectionHead eyebrow="مسیر فعال" title={`هدف فعلی ${child.nameFa}`} href={`/segments/parent/child/${child.id}/goals`} /><GoalCard child={child} /></section> : item.id === 'activity' ? <section key={item.id}><SectionHead eyebrow="فقط بخش مجاز" title="فعالیت اخیر" href={`/segments/parent/child/${child.id}/activity`} /><ParentActivity childId={child.id as keyof typeof childActivity} limit={2} /></section> : <section key={item.id}><SectionHead eyebrow="پیشنهاد متناسب" title="یادگیری و خدمات" /><div className="relationship-service-grid"><a href="/segments/under-18/learning"><MResalatIcon name="learning" size={24} /><span><strong>پس‌انداز برای یک هدف واقعی</strong><small>برای فرزند قابل استفاده · نیازمند همراهی والد</small></span></a><a href="/segments/parent/services"><MResalatIcon name="health" size={24} /><span><strong>خدمات متناسب سن</strong><small>وضعیت دسترسی پیش از اقدام نمایش داده می‌شود</small></span></a></div></section>)}
      </div>
    </>}
    {view === 'children' && <><PageTitle eyebrow="رابطه والد و فرزند" title="فرزندان" description="فقط داده‌های ضروری و مجاز هر فرزند نمایش داده می‌شود." /><ChildSelector baseHref="/segments/parent/child" /><div className="children-overview-grid">{children.map((item) => <a href={`/segments/parent/child/${item.id}`} key={item.id}><ChildIdentity child={item} /><GoalCard child={item} /><span>مشاهده نمای فرزند<MResalatIcon name="next" size={16} /></span></a>)}</div></>}
    {view === 'approvals' && <><PageTitle eyebrow="تصمیم‌های قابل مرور" title="درخواست‌های تأیید" description="هر درخواست، منبع و اثر تصمیم را پیش از انتخاب نشان می‌دهد." /><div className="approval-grid">{parentApprovals.map((item) => <ApprovalRequestCard id={item.id} title={item.title} source={item.source} childName={children.find((childItem) => childItem.id === item.childId)?.nameFa ?? 'فرزند'} impact={item.impact} key={item.id} />)}</div></>}
    {view === 'services' && <><PageTitle eyebrow="اکوسیستم ام‌رسالت" title="خدمات متناسب با رابطه" description="دسترسی هر خدمت پیش از ورود، با زبان روشن مشخص است." /><div className="relationship-service-cards"><ServicePermissionCard icon="learning" title="ام‌آموزش" detail="دوره‌های مناسب سن برای فرزند" label="برای فرزند قابل استفاده" state="allowed" href="/segments/under-18/learning" /><ServicePermissionCard icon="health" title="ام‌سلامت" detail="پیشنهادهای عمومی و غیرتشخیصی" label="نیازمند همراهی والد" state="parent-approval-required" /><ServicePermissionCard icon="finance" title="خدمات مالی" detail="فقط وضعیت‌های مجاز و متناسب سن" label="فقط مشاهده" state="view-only" /></div></>}
  </ContextFrame>;
}

function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <header className="phase-three-page-title"><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></header>; }

function ServicePermissionCard({ icon, title, detail, label, state, href }: { icon: MResalatIconName; title: string; detail: string; label: string; state: Parameters<typeof PermissionState>[0]['state']; href?: string }) {
  return <article><span><MResalatIcon name={icon} size={24} /></span><h2>{title}</h2><p>{detail}</p><PermissionState state={state} detail={label} />{href && <a href={href}>مشاهده خدمت<MResalatIcon name="next" size={16} /></a>}</article>;
}

export function ParentChildExperience({ childId, view = 'overview' }: { childId: string; view?: ChildView }) {
  const { setSelectedChildId } = useMResalatContext();
  const child = children.find((item) => item.id === childId) ?? children[0];
  useEffect(() => { setSelectedChildId(child.id); trackEvent({ event: 'parent_child_opened', surface: 'segment', entityId: child.id }); }, [child.id, setSelectedChildId]);
  const nav: [ChildView, string][] = [['overview', 'نمای کلی'], ['goals', 'هدف‌ها'], ['activity', 'فعالیت'], ['rewards', 'پاداش‌ها'], ['allowance', 'پول توجیبی']];
  return <ContextFrame kind="parent" active="children"><div className="child-detail-header"><ChildIdentity child={child} /><nav aria-label={`بخش‌های ${child.nameFa}`}>{nav.map(([id, label]) => <a href={id === 'overview' ? `/segments/parent/child/${child.id}` : `/segments/parent/child/${child.id}/${id}`} className={view === id ? 'active' : ''} aria-current={view === id ? 'page' : undefined} key={id}>{label}</a>)}</nav></div>
    {view === 'overview' && <><NextBestAction icon="goal" title={`قدم بعدی هدف ${child.goal.title}`} detail={`${child.goal.progress.toLocaleString('fa-IR')}٪ مسیر نمونه تکمیل شده؛ گزینه‌های بعدی را می‌توانید با هم مرور کنید.`} href={`/segments/parent/child/${child.id}/goals`} actionLabel="مشاهده هدف" /><div className="child-detail-grid"><GoalCard child={child} /><section><SectionHead eyebrow="فعالیت مجاز" title="خلاصه اخیر" href={`/segments/parent/child/${child.id}/activity`} /><ParentActivity childId={child.id as keyof typeof childActivity} limit={2} /></section><section className="child-status-panel"><h2>وضعیت خدمات</h2><PermissionState state="view-only" detail="وضعیت کلی خدمات برای والد قابل مشاهده است؛ جزئیات حساس نمایش داده نمی‌شود." /><dl><div><dt>پول توجیبی</dt><dd>{child.allowance.frequencyFa}</dd></div><div><dt>یادگیری</dt><dd>۲ مسیر فعال</dd></div><div><dt>درخواست تأیید</dt><dd>{child.allowance.requestState === 'waiting-parent' ? '۱ درخواست' : 'بدون درخواست'}</dd></div></dl></section><section className="learning-mini"><SectionHead eyebrow="پیشنهاد یادگیری" title="متناسب با هدف" />{youthLearning.slice(0, 2).map((item) => <a href="/segments/under-18/learning" key={item.id}><MResalatIcon name="learning" size={20} /><span><strong>{item.title}</strong><small>{item.lessons}</small></span></a>)}</section></div></>}
    {view === 'goals' && <><PageTitle eyebrow="هدف مشترک، نمایش متناسب" title={`هدف‌های ${child.nameFa}`} description="شما اطلاعات برنامه و تأیید را می‌بینید؛ فرزندتان پیشرفت و تشویق را." /><GoalCard child={child} /><CrossServiceContextMarker text={`برای هدف ${child.goal.title} ${child.nameFa}`} source="تداوم تا ام‌بازار" /></>}
    {view === 'activity' && <><PageTitle eyebrow="حریم خصوصی سیاست‌محور" title={`فعالیت مجاز ${child.nameFa}`} description="نمایش مبلغ، فروشگاه یا فقط دسته فعالیت بر اساس سیاست هر ردیف متفاوت است." /><ParentActivity childId={child.id as keyof typeof childActivity} /><div className="privacy-note"><MResalatIcon name="security" size={20} /><span><strong>همه‌چیز خودکار برای والد قابل مشاهده نیست</strong><small>این نسخه عمداً سطوح مختلف نمایش را با داده ساختگی نشان می‌دهد.</small></span></div></>}
    {view === 'rewards' && <><PageTitle eyebrow="پاداش و مسئولیت" title={`پاداش‌های ${child.nameFa}`} description="نام پاداش بین فضای والد و نوجوان مشترک است، اما کنترل‌ها متناسب با نقش شما هستند." /><div className="reward-linked-list">{youthRewards.map((item) => <article key={item.id}><MResalatIcon name="reward" size={20} /><span><strong>{item.title}</strong><small>{item.note}</small></span><PermissionAction state={item.status === 'pending' ? 'parent-approval-required' : 'view-only'}>{item.status === 'pending' ? 'مرور و تأیید' : 'مشاهده'}</PermissionAction></article>)}</div></>}
    {view === 'allowance' && <AllowancePanel child={child} parent />}
  </ContextFrame>;
}

function AllowancePanel({ child, parent = false }: { child: ChildFixture; parent?: boolean }) {
  return <><PageTitle eyebrow="برنامه نمایشی" title={`پول توجیبی ${parent ? child.nameFa : 'من'}`} description="این تجربه فقط زمان‌بندی و وضعیت درخواست را نشان می‌دهد و هیچ جابه‌جایی پولی انجام نمی‌دهد." /><div className="allowance-layout"><article className="allowance-summary"><span><MResalatIcon name="wallet" size={24} /></span><small>مبلغ فعلی</small><strong>{formatToman(child.allowance.amount)}</strong><dl><div><dt>تکرار</dt><dd>{child.allowance.frequencyFa}</dd></div><div><dt>نوبت بعد</dt><dd>{child.allowance.nextDateFa}</dd></div></dl></article><section><h2>سه نوبت اخیر</h2>{['مرداد ۱۴۰۵', 'تیر ۱۴۰۵', 'خرداد ۱۴۰۵'].map((date) => <div className="allowance-row" key={date}><MResalatIcon name="calendar" size={16} /><span>{date}</span><strong>{formatToman(child.allowance.amount)}</strong><b>ثبت نمایشی</b></div>)}</section><aside><PermissionState state={parent ? 'step-up-auth-required' : 'parent-approval-required'} detail={parent ? 'برای تغییر مبلغ، تأیید هویت مجدد لازم است.' : 'درخواست تغییر برای والد ارسال می‌شود و خودکار اعمال نمی‌شود.'} /><PermissionAction state={parent ? 'step-up-auth-required' : 'parent-approval-required'}>{parent ? 'تأیید هویت و ادامه' : 'ارسال درخواست برای والد'}</PermissionAction></aside></div></>;
}

export function YouthAllowanceExperience() { return <AppShell active="segments"><div className="phase-three phase-three-youth"><div className="youth-relationship-marker"><MResalatIcon name="parent" size={20} /><span><strong>والد همراه شماست</strong><small>درخواست‌های نیازمند تأیید با زبان روشن مشخص می‌شوند.</small></span></div><AllowancePanel child={children[0]} /><section className="youth-approval-history"><h2>وضعیت درخواست‌ها</h2><div><PermissionState state="parent-approval-required" detail="درخواست تغییر زمان‌بندی در انتظار تأیید والد است." /><PermissionState state="allowed" detail="والد پاداش مرتب‌کردن فضای مطالعه را تأیید کرد." /></div></section></div></AppShell>; }

export function OrganizationEmployeeExperience({ view = 'home' }: { view?: EmployeeView }) {
  useEffect(() => { trackEvent({ event: 'organization_employee_opened', surface: 'segment', entityId: 'sample-co' }); }, []);
  const marketJourney = crossServiceJourneys[1];
  return <ContextFrame kind="employee" active={view}><section className="phase-three-hero organization"><span>پرسنل · شرکت نمونه</span><h1>مزایا و اعتبار من، جدا از ابزارهای مدیریتی سازمان</h1><p>فقط سهم، شرایط استفاده و خدمات واجد شرایط خودتان را می‌بینید.</p></section>
    {view === 'home' && <><SegmentAIEntry segment="organization" suggestions={employeePrompts} title="درباره مزایا یا اعتبار سازمانی چه می‌خواهید بدانید؟" placeholder="مثلاً: اعتبار سازمانی من چقدره؟" assistantMode="featured" /><NextBestAction icon="time" title="اعتبار شما ۱۲ روز دیگر منقضی می‌شود" detail="۱۱٫۶ میلیون تومان اعتبار نمایشی برای کالاهای واجد شرایط باقی مانده است." href={marketJourney.targetHref} actionLabel="مشاهده کالاها" tone="warning" /><EmployeeCreditCard /><div className="employee-module-grid"><EmployeeModule icon="gift" title="مزایای فعال" value="۳ برنامه" detail="خرید، بیمه و آموزش" href="/segments/organization-employee/benefits" /><EmployeeModule icon="insurance" title="بیمه سازمانی" value="فعال" detail="پوشش پایه خانواده" href="/segments/organization-employee/services" /><EmployeeModule icon="learning" title="آموزش" value="۲ دوره" detail="تحت پوشش سازمان" href="/segments/under-18/learning" /><EmployeeModule icon="reports" title="مصرف من" value="۳۶٪" detail="فقط مصرف شخصی شما" href="/segments/organization-employee/credit" /></div></>}
    {view === 'benefits' && <><PageTitle eyebrow="سهم شخصی من" title="مزایای سازمانی" description="برنامه یکسان است؛ مدیر خلاصه تخصیص را می‌بیند و شما سهم و مانده خودتان را." /><div className="benefit-linked-card"><header><span><MResalatIcon name="credit" size={24} /></span><div><small>برنامه شرکت نمونه</small><h2>{employeeBenefit.title}</h2></div><PermissionState state="allowed" compact /></header><EmployeeCreditCard /><div className="relationship-service-grid"><a href="/examples/mbazar/search?source=organization-credit&program=benefit-demo"><MResalatIcon name="product" size={24} /><span><strong>ام‌بازار</strong><small>تحت پوشش برنامه سازمان</small></span></a><a href="/examples"><MResalatIcon name="insurance" size={24} /><span><strong>ام‌بیمه</strong><small>پوشش پایه فعال</small></span></a></div></div></>}
    {view === 'credit' && <><PageTitle eyebrow="اعتبار سازمانی" title="مانده و استفاده من" description="اعتبار سازمانی با خرید اقساطی متفاوت است و برچسب‌های جداگانه دارد." /><EmployeeCreditCard /><CrossServiceContextMarker text="با اعتبار سازمانی شرکت نمونه" /><a className="employee-market-cta" href={marketJourney.targetHref} onClick={() => trackEvent({ event: 'cross_service_journey_opened', surface: 'segment', entityId: marketJourney.id })}><MResalatIcon name="product" size={24} /><span><strong>مشاهده کالاهای قابل استفاده با اعتبار سازمانی</strong><small>واجد شرایط بودن کالا پیش از اقدام مشخص است.</small></span><MResalatIcon name="next" size={20} /></a></>}
    {view === 'services' && <><PageTitle eyebrow="خدمات واجد شرایط" title="خدمات من" description="هر خدمت نشان می‌دهد تحت پوشش سازمان است یا نیاز به تأیید دارد." /><div className="relationship-service-cards"><ServicePermissionCard icon="product" title="ام‌بازار" detail="کالاهای منتخب برنامه خرید" label="تحت پوشش سازمان" state="allowed" href={marketJourney.targetHref} /><ServicePermissionCard icon="insurance" title="ام‌بیمه" detail="پوشش پایه سازمانی" label="فقط مشاهده" state="view-only" href="/examples" /><ServicePermissionCard icon="health" title="ام‌سلامت" detail="خدمات تکمیلی سلامت" label="نیازمند تأیید سازمان" state="organization-approval-required" /></div></>}
  </ContextFrame>;
}

function EmployeeCreditCard() { const percent = Math.round(employeeBenefit.used / employeeBenefit.allocated * 100); return <article className="employee-credit-card"><header><span><MResalatIcon name="credit" size={24} /></span><div><small>{employeeBenefit.organization}</small><h2>{employeeBenefit.title}</h2></div><b>اعتبار سازمانی</b></header><div className="employee-credit-value"><small>مانده قابل استفاده</small><strong>{formatToman(employeeBenefit.remaining)}</strong></div><div className="linked-progress"><span style={{ width: `${percent}%` }} /></div><footer><span>مصرف‌شده: {formatToman(employeeBenefit.used)}</span><span>کل: {formatToman(employeeBenefit.allocated)}</span></footer></article>; }

function EmployeeModule({ icon, title, value, detail, href }: { icon: MResalatIconName; title: string; value: string; detail: string; href: string }) { return <a href={href}><span><MResalatIcon name={icon} size={24} /></span><small>{title}</small><strong>{value}</strong><p>{detail}</p><MResalatIcon name="next" size={16} /></a>; }

export function OrganizationPersonnelDetail({ id }: { id: string }) {
  const person = organizationPersonnel.find((item) => item.id === id) ?? organizationPersonnel[0];
  return <ContextFrame kind="manager" active="personnel"><nav className="page-breadcrumb"><a href="/segments/organization/personnel">پرسنل</a><MResalatIcon name="next" size={16} /><span>{person.name}</span></nav><PageTitle eyebrow="اطلاعات حداقلی و ساختگی" title={person.name} description="این صفحه عمداً اطلاعات محرمانه منابع انسانی، بانکی و شناسه‌های واقعی را نمایش نمی‌دهد." /><div className="personnel-detail-grid"><article className="personnel-identity-card"><span>{person.name.slice(0, 1)}</span><h2>{person.name}</h2><p>{person.unit} · شناسه نمایشی {person.id}</p><PermissionState state="view-only" detail="فقط اطلاعات لازم برای برنامه مزایا قابل مشاهده است." /></article><section><h2>واجد شرایط بودن</h2><dl><div><dt>برنامه خرید</dt><dd>{person.eligibility}</dd></div><div><dt>وضعیت اعتبار</dt><dd>{person.credit}</dd></div><div><dt>مانده نمایشی</dt><dd>{person.amount}</dd></div></dl></section><section><h2>برنامه‌های مرتبط</h2>{organizationPrograms.map((program) => <div className="personnel-program-row" key={program.id}><MResalatIcon name="gift" size={20} /><span><strong>{program.title}</strong><small>{program.status} · شرکت نمونه</small></span><PermissionAction state={program.id === 'purchase-credit' ? 'step-up-auth-required' : 'view-only'}>{program.id === 'purchase-credit' ? 'تأیید هویت و تغییر' : 'مشاهده'}</PermissionAction></div>)}</section></div></ContextFrame>;
}

export function CreditAllocationFlow() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(['p-01']);
  const [amount, setAmount] = useState('12000000');
  const steps = ['برنامه', 'پرسنل', 'مبلغ', 'بازبینی', 'تأیید هویت', 'نتیجه'];
  const validAmount = Number(amount) >= 1_000_000 && Number(amount) <= 50_000_000;
  useEffect(() => { trackEvent({ event: 'organization_credit_allocation_started', surface: 'segment', entityId: 'benefit-demo' }); }, []);
  const nextDisabled = (step === 1 && !selected.length) || (step === 2 && !validAmount);
  return <ContextFrame kind="manager" active="benefits"><PageTitle eyebrow="دموی فرایند، بدون اجرای مالی" title="تخصیص اعتبار سازمانی" description="برنامه، پرسنل و مبلغ را مرور کنید؛ مرحله تأیید هویت نیز کاملاً ساختگی است." /><ol className="allocation-steps">{steps.map((label, index) => <li className={index < step ? 'done' : index === step ? 'current' : ''} aria-current={index === step ? 'step' : undefined} key={label}><span>{index < step ? <MResalatIcon name="success" size={16} /> : (index + 1).toLocaleString('fa-IR')}</span><small>{label}</small></li>)}</ol><section className="allocation-panel" aria-live="polite">
    {step === 0 && <><h2>برنامه اعتباری</h2><label className="allocation-program selected"><input type="radio" checked readOnly /><MResalatIcon name="credit" size={24} /><span><strong>اعتبار خرید کارکنان</strong><small>مانده برنامه: {formatToman(organizationPrograms[0].remaining)}</small></span></label></>}
    {step === 1 && <><h2>انتخاب پرسنل</h2><p>فقط نام، واحد و وضعیت واجد شرایط بودن نمایش داده می‌شود.</p><div className="allocation-personnel">{organizationPersonnel.slice(0, 4).map((item) => <label key={item.id}><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((current) => current.includes(item.id) ? current.filter((value) => value !== item.id) : [...current, item.id])} /><span>{item.name.slice(0, 1)}</span><strong>{item.name}</strong><small>{item.unit} · {item.eligibility}</small></label>)}</div></>}
    {step === 2 && <><h2>مبلغ برای هر نفر</h2><label className="amount-input"><span>تومان</span><input value={amount} inputMode="numeric" onChange={(event) => setAmount(event.target.value.replace(/\D/g, ''))} aria-describedby="amount-help" /></label><p id="amount-help" className={validAmount ? 'validation-ok' : 'validation-error'}>{validAmount ? `مبلغ معتبر: ${formatToman(Number(amount))}` : 'مبلغ باید بین ۱ تا ۵۰ میلیون تومان باشد.'}</p></>}
    {step === 3 && <><h2>بازبینی پیش از تأیید</h2><dl className="allocation-review"><div><dt>برنامه</dt><dd>اعتبار خرید کارکنان</dd></div><div><dt>تعداد پرسنل</dt><dd>{selected.length.toLocaleString('fa-IR')} نفر</dd></div><div><dt>مبلغ هر نفر</dt><dd>{formatToman(Number(amount))}</dd></div><div><dt>جمع</dt><dd>{formatToman(Number(amount) * selected.length)}</dd></div></dl><PermissionState state="step-up-auth-required" /></>}
    {step === 4 && <><div className="mock-step-up"><MResalatIcon name="lock" size={32} /><h2>تأیید هویت مجدد نمایشی</h2><p>در نسخه واقعی، این مرحله از مسیر امن استفاده می‌کند. اینجا هیچ رمز یا کدی دریافت نمی‌شود.</p><PermissionState state="step-up-auth-required" /></div></>}
    {step === 5 && <><div className="allocation-result"><MResalatIcon name="success" size={32} /><h2>درخواست نمونه ثبت شد</h2><p>وضعیت: در انتظار بررسی مدیر. هیچ اعتبار واقعی تخصیص داده نشده است.</p><span>شناسه نمایشی: ALLOC-DEMO-03</span></div><div className="organization-state-list">{organizationApprovalStates.slice(0, 3).map((item) => <div key={item.id}><strong>{item.label}</strong><small>{item.note}</small></div>)}</div></>}
    <footer><button className="button button-ghost" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>مرحله قبل</button>{step < 5 ? <button className="button button-primary" type="button" disabled={nextDisabled} onClick={() => setStep((value) => Math.min(5, value + 1))}>{step === 4 ? 'تأیید نمایشی و ثبت' : 'ادامه'}</button> : <a className="button button-primary" href="/segments/organization/home">بازگشت به خانه مدیر</a>}</footer>
  </section></ContextFrame>;
}

