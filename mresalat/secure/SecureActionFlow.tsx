'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Alert, Badge, Button } from '@/mresalat/core/primitives';
import type { SecureAction } from '@/mresalat/domains/contracts';

type Stage = 'explain' | 'confirm' | 'auth' | 'success' | 'failure';

const stages: { key: Stage; label: string }[] = [
  { key: 'explain', label: 'مرور درخواست' }, { key: 'confirm', label: 'تأیید صریح' },
  { key: 'auth', label: 'احراز هویت' }, { key: 'success', label: 'نتیجه و رسید' },
];

export function SecureActionFlow({ action }: { action: SecureAction }) {
  const [stage, setStage] = useState<Stage>('explain');
  const [confirmed, setConfirmed] = useState(false);
  const stageIndex = stage === 'failure' ? 2 : stages.findIndex((item) => item.key === stage);

  const go = (next: Stage) => {
    setStage(next);
    if (next === 'confirm') trackEvent({ event: 'action_previewed', surface: 'secure', entityId: action.id, riskLevel: 3 });
    if (next === 'auth') trackEvent({ event: 'step_up_started', surface: 'secure', entityId: action.id, riskLevel: 3 });
    if (next === 'success') trackEvent({ event: 'action_confirmed', surface: 'secure', entityId: action.id, riskLevel: 3 });
  };

  return (
    <div className="secure-flow">
      <header className="secure-header"><a href="/" aria-label="بازگشت به خانه"><MResalatIcon name="error" size={20} /></a><div><span className="secure-shield"><MResalatIcon name="security" size={20} /></span><span><strong>محیط امن عملیات</strong><small>ارتباط رمزگذاری‌شده · L3</small></span></div><Badge tone="danger">اقدام حساس</Badge></header>
      <div className="secure-progress" aria-label={`مرحله ${stageIndex + 1} از ۴`}>{stages.map((item, index) => <div key={item.key} className={index <= stageIndex ? 'active' : ''}><span>{index < stageIndex ? <MResalatIcon name="success" size={16} /> : index + 1}</span><small>{item.label}</small></div>)}</div>

      <main className="secure-card" aria-live="polite">
        {stage === 'explain' && <section><div className="secure-title-icon"><MResalatIcon name="card" size={24} /></div><Badge tone="danger">درخواست شما</Badge><h1>{action.title}</h1><p className="secure-lead">{action.summary}</p><div className="action-preview"><div><small>کارت انتخاب‌شده</small><strong dir="ltr">{action.maskedResource}</strong><span>کارت خرید · به نام حسین محمدی</span></div><span className="card-chip" aria-hidden="true" /></div><Alert tone="info" title="پس از مسدودسازی چه می‌شود؟"><ul><li>خرید حضوری، اینترنتی و برداشت وجه متوقف می‌شود.</li><li>واریز به حساب متصل همچنان امکان‌پذیر است.</li><li>فعال‌سازی دوباره فقط پس از ورود امن انجام می‌شود.</li></ul></Alert><div className="secure-actions"><Button onClick={() => go('confirm')}>ادامه و مرور نهایی</Button><a className="button button-ghost" href="/">انصراف</a></div></section>}

        {stage === 'confirm' && <section><div className="secure-title-icon warning"><MResalatIcon name="warning" size={24} /></div><Badge tone="warning">تأیید نهایی لازم است</Badge><h1>پیش از ادامه، درخواست را مرور کنید</h1><div className="confirmation-summary"><dl><div><dt>عملیات</dt><dd>{action.title}</dd></div><div><dt>روی کارت</dt><dd dir="ltr">{action.maskedResource}</dd></div><div><dt>اثر</dt><dd>توقف فوری تراکنش‌های جدید</dd></div><div><dt>بازگشت‌پذیری</dt><dd>بله، با احراز هویت مجدد</dd></div></dl></div><label className="explicit-check"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>متوجه اثر این اقدام هستم و مسدودسازی موقت کارت را تأیید می‌کنم.</span></label><div className="secure-actions"><Button disabled={!confirmed} onClick={() => go('auth')}>تأیید و احراز هویت</Button><Button tone="secondary" onClick={() => go('explain')}>بازگشت</Button></div></section>}

        {stage === 'auth' && <section><div className="secure-title-icon"><MResalatIcon name="lock" size={24} /></div><Badge tone="info">تأیید دومرحله‌ای</Badge><h1>کد ارسال‌شده را وارد کنید</h1><p className="secure-lead">کد ۶ رقمی به شماره <bdi>۰۹۱۲•••۳۴۱۲</bdi> ارسال شد. اعتبار کد: ۱:۵۹</p><div className="otp" dir="ltr" aria-label="کد شش رقمی"><input inputMode="numeric" maxLength={1} aria-label="رقم اول" autoFocus /><input inputMode="numeric" maxLength={1} aria-label="رقم دوم" /><input inputMode="numeric" maxLength={1} aria-label="رقم سوم" /><input inputMode="numeric" maxLength={1} aria-label="رقم چهارم" /><input inputMode="numeric" maxLength={1} aria-label="رقم پنجم" /><input inputMode="numeric" maxLength={1} aria-label="رقم ششم" /></div><button className="resend" type="button">ارسال دوباره کد</button><div className="secure-actions"><Button onClick={() => go('success')}>تأیید کد و انجام عملیات</Button><Button tone="secondary" onClick={() => go('failure')}>نمایش سناریوی خطا</Button></div></section>}

        {stage === 'success' && <section className="result-state"><div className="result-icon success"><MResalatIcon name="success" size={24} /></div><Badge tone="success">عملیات موفق</Badge><h1>کارت موقتاً مسدود شد</h1><p>از این لحظه تراکنش جدیدی با این کارت انجام نمی‌شود.</p><div className="receipt"><div><span>شماره پیگیری</span><strong dir="ltr">MR-850822-19462</strong></div><div><span>زمان انجام</span><strong>۲۲ مرداد ۱۴۰۵ · ۱۰:۴۷</strong></div><div><span>کارت</span><strong dir="ltr">{action.maskedResource}</strong></div><div><span>وضعیت</span><strong className="success-text">مسدود موقت</strong></div></div><Alert tone="success" title="رسید در سوابق شما ذخیره شد">برای فعال‌سازی دوباره کارت، از بخش کارت‌های من اقدام کنید.</Alert><div className="secure-actions"><a className="button button-primary" href="/">بازگشت به خانه</a><button className="button button-secondary" type="button" onClick={() => go('explain')}>اجرای دوباره دمو</button></div></section>}

        {stage === 'failure' && <section className="result-state"><div className="result-icon failure"><MResalatIcon name="error" size={24} /></div><Badge tone="danger">عملیات انجام نشد</Badge><h1>تأیید امنیتی ناموفق بود</h1><p>کارت شما مسدود نشده و وضعیت آن تغییری نکرده است.</p><Alert tone="danger" title="هیچ تغییری ثبت نشد">اتصال به سرویس تأیید هویت موقتاً برقرار نیست. چند دقیقه دیگر دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.</Alert><div className="secure-actions"><Button onClick={() => go('auth')}>تلاش دوباره</Button><a className="button button-secondary" href="/rag">ارتباط با پشتیبانی</a></div></section>}
      </main>
      <footer className="secure-footer"><span><MResalatIcon name="security" size={16} />اطلاعات حساس شما در این صفحه ماسک شده‌اند.</span><a href="/showcase">راهنمای امنیت</a></footer>
    </div>
  );
}
