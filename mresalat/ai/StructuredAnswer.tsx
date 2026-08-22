import type { AssistantSource } from '@/mresalat/domains/contracts';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export function SourceCitation({ source }: { source: AssistantSource }) {
  const isOfficial = source.kind === 'official-knowledge';
  return (
    <details className={`source-citation source-${isOfficial ? 'official' : 'live'}`}>
      <summary><span className="source-kind-icon"><MResalatIcon name={isOfficial ? 'evidence' : 'reports'} size={20} /></span><span><small>{isOfficial ? 'منبع رسمی' : 'داده زنده سامانه'}</small><strong>{source.title}</strong><i>{source.section}{source.version ? ` · نسخه ${source.version}` : ''}</i></span><b>مشاهده شواهد <MResalatIcon name="down" size={16} /></b></summary>
      <div className="evidence-panel"><p>{source.excerpt}</p><dl><div><dt>بخش منبع</dt><dd>{source.section ?? '—'}</dd></div><div><dt>نسخه</dt><dd>{source.version ?? 'برخط'}</dd></div><div><dt>آخرین به‌روزرسانی</dt><dd>{source.updatedAt ?? 'همین حالا'}</dd></div></dl></div>
    </details>
  );
}

export function TrustLegend() {
  return <div className="trust-legend" aria-label="راهنمای انواع اطلاعات"><span className="trust-official"><MResalatIcon name="evidence" size={16} />دانش رسمی</span><span className="trust-live"><MResalatIcon name="reports" size={16} />داده زنده</span><span className="trust-ai"><MResalatIcon name="assistant" size={16} />توضیح هوش مصنوعی</span><span className="trust-personal"><MResalatIcon name="goal" size={16} />پیشنهاد شخصی</span></div>;
}

export function UncertainAnswer() {
  return <article className="uncertain-card"><span><MResalatIcon name="help" size={20} /></span><div><strong>برای پاسخ قطعی، اطلاعات کافی ندارم</strong><p>منبع رسمی درباره اثر «تغییر شغل در میانه بررسی» جزئیات مشخصی ندارد. نمی‌خواهم بر اساس حدس راهنمایی‌تان کنم.</p><div><button type="button" className="button button-secondary">یک سؤال روشن‌کننده</button><button type="button" className="button button-ghost">گفت‌وگو با پشتیبان</button></div></div></article>;
}

export function HumanHandoff() {
  return <article className="handoff-card"><div className="handoff-people" aria-hidden="true"><span>پ</span><span><MResalatIcon name="assistant" size={16} /></span></div><div><strong>نیاز به بررسی انسانی دارید؟</strong><p>خلاصه گفت‌وگو و منابع دیده‌شده را با اجازه شما برای کارشناس می‌فرستیم تا لازم نباشد دوباره توضیح بدهید.</p></div><button className="button button-primary" type="button">شروع ارتباط با کارشناس</button></article>;
}
