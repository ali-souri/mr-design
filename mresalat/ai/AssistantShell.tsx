export type AssistantVariant = 'hero' | 'context' | 'compact';

export function AssistantShell({ variant = 'hero' }: { variant?: AssistantVariant }) {
  return (
    <div className={`assistant-shell assistant-${variant}`}>
      {variant !== 'compact' && (
        <div className="assistant-intro">
          <span className="ai-orb" aria-hidden="true"><i>✦</i></span>
          <div><strong>{variant === 'hero' ? 'از نیازتان برایم بگویید' : 'درباره این خدمت بپرسید'}</strong><small>پاسخ‌ها بر اساس منابع رسمی ام‌رسالت ارائه می‌شوند</small></div>
        </div>
      )}
      <form className="composer" action="/rag">
        <label className="sr-only" htmlFor={`assistant-input-${variant}`}>پیام به دستیار هوشمند</label>
        <input id={`assistant-input-${variant}`} name="q" placeholder={variant === 'compact' ? 'از دستیار بپرسید…' : 'مثلاً: برای دریافت وام چه شرایطی لازم است؟'} />
        <button type="submit" aria-label="ارسال پیام">↑</button>
      </form>
      {variant === 'hero' && <div className="prompt-row"><span>پیشنهاد:</span><a href="/loan">شرایط وام</a><a href="/showcase">افتتاح حساب</a><a href="/seller">خدمات فروشندگان</a></div>}
    </div>
  );
}
