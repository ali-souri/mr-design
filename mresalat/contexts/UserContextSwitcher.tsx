'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { useMResalatContext } from './context-state';

export function UserContextSwitcher() {
  const { user, activeContext, setActiveContext } = useMResalatContext();
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const menuId = 'mresalat-context-switcher-menu';
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    requestAnimationFrame(() => rootRef.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"][aria-checked="true"]')?.focus());
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onPointer); };
  }, [open]);

  const choose = (id: string) => {
    const next = user.contexts.find((item) => item.id === id);
    if (!next || next.id === activeContext.id) { setOpen(false); return; }
    setAnnouncement(`زمینه فعالیت به ${next.titleFa} تغییر کرد`);
    setOpen(false);
    setActiveContext(id);
  };

  return <div className="context-switcher" ref={rootRef}>
    <button
      ref={triggerRef}
      type="button"
      className="context-switcher-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={() => { setOpen((value) => !value); trackEvent({ event: 'context_switch_opened', surface: 'segment', entityId: activeContext.id }); }}
    >
      <span className={`context-avatar type-${activeContext.type}`}><MResalatIcon name={activeContext.icon} size={20} /></span>
      <span><small>زمینه فعالیت</small><strong>{activeContext.titleFa}</strong></span>
      <MResalatIcon name="down" size={16} />
    </button>
    {open && <>
      <button className="context-switcher-backdrop" type="button" aria-label="بستن انتخاب زمینه" onClick={() => setOpen(false)} />
      <div className="context-switcher-menu" id={menuId} role="menu" aria-label="تغییر زمینه فعالیت">
        <header><div><strong>در چه نقشی فعالیت می‌کنید؟</strong><small>همان هویت، با زمینه و دسترسی متناسب</small></div><button type="button" aria-label="بستن" onClick={() => { setOpen(false); triggerRef.current?.focus(); }}><MResalatIcon name="close" size={20} /></button></header>
        <div>
          {user.contexts.map((item) => <button
            type="button"
            role="menuitemradio"
            aria-checked={item.id === activeContext.id}
            className={item.id === activeContext.id ? 'selected' : ''}
            onClick={() => choose(item.id)}
            key={item.id}
          ><span className={`context-avatar type-${item.type}`}><MResalatIcon name={item.icon} size={20} /></span><span><strong>{item.titleFa}</strong><small>{item.subtitleFa}</small></span>{item.id === activeContext.id && <MResalatIcon name="success" size={20} />}</button>)}
        </div>
        <footer><MResalatIcon name="security" size={16} />این انتخاب فقط زمینه فعالیت را تغییر می‌دهد، نه حساب کاربری شما را.</footer>
      </div>
    </>}
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </div>;
}
