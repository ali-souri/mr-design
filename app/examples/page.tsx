import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Badge } from '@/mresalat/core/primitives';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';

export const metadata: Metadata = { title: 'نمونه‌های اکوسیستم' };

export default function ExamplesPage() {
  return (
    <AppShell active="examples">
      <header className="examples-hero"><span className="eyebrow">نمونه‌های کاربردی</span><h1>یک سیستم، تجربه‌های متناسب با هر خدمت</h1><p>این صفحه نشان می‌دهد زبان مشترک MResalat System چگونه در سرویس‌های واقعی اکوسیستم، با اولویت و محتوای متفاوت، حفظ می‌شود.</p><div><Badge tone="info">۱۰ خدمت</Badge><Badge tone="success">RTL و دوپوسته</Badge><Badge tone="neutral">قراردادهای نمونه</Badge></div></header>
      <div className="ecosystem-grid">
        {ecosystemServices.map((service) => (
          <article className={`ecosystem-card ecosystem-${service.id}`} key={service.id}>
            <header><span className="service-identity"><MResalatIcon name={service.icon} size={24} /></span><div><small>{service.subtitle}</small><h2>{service.name}</h2></div><Badge tone="neutral">نمونه</Badge></header>
            <p className="ecosystem-description">{service.description}</p>
            <div className="ecosystem-prompt"><MResalatIcon name="assistant" size={20} /><div><small>دستیار زمینه‌مند</small><strong>{service.prompt}</strong></div></div>
            <div className="ecosystem-actions">{service.actions.map((action) => <button type="button" key={action.label}><MResalatIcon name={action.icon} size={16} />{action.label}</button>)}</div>
            <div className="ecosystem-status"><span><small>{service.status.label}</small><strong>{service.status.value}</strong></span><p>{service.status.detail}</p></div>
            {service.journey && <ProcessReviewWizard title={service.journey.title} steps={service.journey.steps} progress={service.journey.progress} variant="compact" />}
            <a className="button button-secondary" href={service.id === 'mmoshaver' ? '/rag' : service.id === 'sat' ? '/seller' : '/segments/general/services'}>{service.cta}<MResalatIcon name="next" size={16} /></a>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
