import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import type { MResalatService } from '@/mresalat/domains/ecosystem';

export function ServiceAssistant({ service }: { service: MResalatService }) {
  return (
    <section className="service-assistant" aria-labelledby={`assistant-${service.slug}`}>
      <header>
        <MResalatServiceIcon service={service} size={40} variant="compact" />
        <div><small>دستیار زمینه‌مند</small><strong id={`assistant-${service.slug}`}>دستیار {service.titleFa}</strong></div>
        <span><MResalatIcon name="evidence" size={16} />برگرفته از محصول عمومی</span>
      </header>
      <p>{service.assistantPrompt}</p>
      <form className="service-assistant-composer" action="/rag">
        <label className="sr-only" htmlFor={`service-question-${service.slug}`}>پرسش از دستیار {service.titleFa}</label>
        <input id={`service-question-${service.slug}`} name="q" placeholder={`سؤال خود درباره ${service.titleFa} را بنویسید…`} />
        <button type="submit" aria-label="ارسال پرسش"><MResalatIcon name="next" size={20} /></button>
      </form>
      <div className="service-assistant-prompts"><span>پیشنهاد سریع</span>{service.actions.slice(0, 4).map((action) => <button type="button" key={action.label}>{action.label}</button>)}</div>
    </section>
  );
}
