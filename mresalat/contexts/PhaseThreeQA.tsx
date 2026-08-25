'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { useMResalatContext } from './context-state';
import { children } from './fixtures';

export function PhaseThreeQA() {
  const { userKey, user, activeContext, selectedChildId, setDemoUser, setActiveContext, setSelectedChildId } = useMResalatContext();
  const reset = () => { localStorage.removeItem('mresalat.context.v1'); location.reload(); };
  const invalid = () => { localStorage.setItem('mresalat.context.v1', JSON.stringify({ userKey: 'multi', contextId: 'invalid-context', childId: 'invalid-child' })); location.assign('/qa/contexts'); };
  return <div className="phase-three-qa">
    <header><span>Phase 3 QA</span><h1>کنترل سریع زمینه و رابطه</h1><p>کنترل‌ها فقط داده‌های ساختگی و وضعیت UI ایمن را تغییر می‌دهند.</p></header>
    <section><h2>کاربر نمایشی</h2><div className="qa-control-row"><button type="button" className={userKey === 'multi' ? 'active' : ''} onClick={() => setDemoUser('multi')}>چندنقشی: شخصی، والد، پرسنل، فروشنده</button><button type="button" className={userKey === 'manager' ? 'active' : ''} onClick={() => setDemoUser('manager')}>مدیر: شخصی، مدیر سازمان</button></div></section>
    <section><h2>زمینه فعال</h2><div className="qa-context-grid">{user.contexts.map((item) => <button type="button" className={activeContext.id === item.id ? 'active' : ''} onClick={() => setActiveContext(item.id, false)} key={item.id}><MResalatIcon name={item.icon} size={20} /><span><strong>{item.titleFa}</strong><small>{item.subtitleFa}</small></span></button>)}</div></section>
    <section><h2>فرزند انتخاب‌شده</h2><div className="qa-control-row">{children.map((child) => <button type="button" className={selectedChildId === child.id ? 'active' : ''} onClick={() => setSelectedChildId(child.id)} key={child.id}>{child.nameFa}</button>)}</div></section>
    <section><h2>سناریوهای مستقیم</h2><div className="qa-link-grid"><a href="/segments/parent/home?pending=1">والد · تأیید در انتظار</a><a href="/segments/parent/home?pending=0">والد · بدون تأیید</a><a href="/segments/parent/child/arya/activity">حریم خصوصی فعالیت آریا</a><a href="/segments/under-18/allowance">نوجوان · پول توجیبی</a><a href="/segments/organization-employee/home">پرسنل سازمان</a><a href="/segments/organization/home">مدیر سازمان</a><a href="/segments/organization/credit/allocate">تخصیص اعتبار</a><a href="/examples/mbazar/search?q=دوچرخه&source=youth-goal&goal=bike&child=arya">هدف نوجوان ← ام‌بازار</a><a href="/examples/mbazar/search?source=organization-credit&program=benefit-demo">اعتبار سازمان ← ام‌بازار</a><a href="/seller">زمینه فروشنده</a></div></section>
    <section><h2>پایداری امن</h2><div className="qa-control-row"><button type="button" onClick={() => location.reload()}>بارگذاری دوباره و بازیابی</button><button type="button" onClick={invalid}>آزمون زمینه نامعتبر و بازگشت امن</button><button type="button" onClick={reset}>پاک‌سازی QA</button></div><code>{JSON.stringify({ userKey, contextId: activeContext.id, type: activeContext.type, childId: selectedChildId }, null, 2)}</code></section>
  </div>;
}
