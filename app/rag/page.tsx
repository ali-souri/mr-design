import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { Badge } from '@/mresalat/core/primitives';
import { HumanHandoff, SourceCitation, TrustLegend, UncertainAnswer } from '@/mresalat/ai/StructuredAnswer';
import { loanSources } from '@/mresalat/domains/mock-data';

export const metadata: Metadata = { title: 'پاسخ هوشمند و مستند' };

export default function RagPage() {
  return (
    <AppShell active="assistant">
      <div className="rag-layout">
        <section className="conversation" aria-labelledby="conversation-title">
          <header className="conversation-header"><div><span className="ai-orb" aria-hidden="true"><i>✦</i></span><div><h1 id="conversation-title">دستیار هوشمند ام‌رسالت</h1><small><span className="status-dot" /> پاسخ‌گو بر اساس منابع رسمی</small></div></div><button className="icon-button" type="button" aria-label="گفت‌وگوی جدید">＋</button></header>
          <TrustLegend />
          <div className="message-stream">
            <div className="user-message"><p>برای گرفتن وام قرض‌الحسنه حتماً باید ضامن داشته باشم؟</p><time>۱۰:۳۲</time></div>
            <article className="assistant-message">
              <div className="message-avatar" aria-hidden="true">✦</div>
              <div className="answer-body">
                <div className="answer-label ai-label">✦ توضیح هوش مصنوعی</div>
                <p className="answer-lead">نه، همیشه ضامن لازم نیست. نوع تضمین به نتیجه اعتبارسنجی، مبلغ درخواستی و توان بازپرداخت شما بستگی دارد.</p>
                <section><h2>چه چیزی تعیین‌کننده است؟</h2><ul><li><strong>اعتبارسنجی:</strong> سابقه تعهدات و توان بازپرداخت بررسی می‌شود.</li><li><strong>مبلغ و دوره بازپرداخت:</strong> برای مبالغ بالاتر ممکن است تضمین بیشتری لازم باشد.</li><li><strong>امتیاز حساب:</strong> امتیاز قابل استفاده روی گزینه‌های پیشنهادی اثر دارد.</li></ul></section>
                <div className="personalized-block"><span>◎ پیشنهاد شخصی‌سازی‌شده</span><p>بهتر است ابتدا نتیجه اعتبارسنجی خودتان را ببینید؛ این پیشنهاد به معنی تأیید یا تضمین دریافت وام نیست.</p><a href="/loan">بررسی شرایط من ←</a></div>
                <div className="sources-block"><h3>منابع این پاسخ <Badge tone="success">۲ منبع رسمی</Badge></h3>{loanSources.map((source) => <SourceCitation key={source.id} source={source} />)}</div>
                <div className="answer-actions"><span>این پاسخ مفید بود؟</span><button type="button" aria-label="پاسخ مفید بود">♡ بله</button><button type="button" aria-label="پاسخ مفید نبود">× خیر</button><span className="freshness">به‌روز تا ۱۸ تیر ۱۴۰۵</span></div>
              </div>
            </article>
            <UncertainAnswer />
            <HumanHandoff />
          </div>
          <div className="rag-composer"><div className="followups"><span>می‌توانید بپرسید:</span><button type="button">اعتبارسنجی چطور انجام می‌شود؟</button><button type="button">چه مدارکی لازم است؟</button></div><form className="composer"><label className="sr-only" htmlFor="rag-input">سؤال بعدی</label><input id="rag-input" placeholder="سؤال بعدی‌تان را بنویسید…" /><button type="submit" aria-label="ارسال">↑</button></form><small>پاسخ‌های هوشمند ممکن است کامل نباشند؛ منابع را بررسی کنید.</small></div>
        </section>
        <aside className="rag-aside"><div className="aside-card"><span className="eyebrow">موضوع گفت‌وگو</span><h2>وام قرض‌الحسنه</h2><p>شرایط، مدارک، تضمین و مراحل ثبت درخواست</p><a className="button button-secondary button-block" href="/loan">صفحه کامل خدمت</a></div><div className="aside-card risk-card"><Badge tone="info">L0 · دانش عمومی</Badge><h3>این پاسخ داده مالی شما را نمی‌بیند</h3><p>برای مشاهده وضعیت یا گزینه‌های مخصوص حساب، ورود امن لازم است.</p></div></aside>
      </div>
    </AppShell>
  );
}
