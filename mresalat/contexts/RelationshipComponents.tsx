'use client';

import { useState, type ReactNode } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon, type MResalatIconName } from '@/mresalat/core/MResalatIcon';
import { children } from './fixtures';
import { useMResalatContext } from './context-state';
import type { ChildFixture, PermissionStateType } from './types';

const permissionCopy: Record<PermissionStateType, { icon: MResalatIconName; title: string; detail: string }> = {
  allowed: { icon: 'success', title: 'قابل انجام', detail: 'شما اجازه انجام این اقدام را دارید.' },
  'view-only': { icon: 'view', title: 'فقط مشاهده', detail: 'شما اجازه مشاهده این اطلاعات را دارید.' },
  'approval-required': { icon: 'time', title: 'نیازمند تأیید', detail: 'برای ادامه، تأیید مسئول مربوط لازم است.' },
  'parent-approval-required': { icon: 'parent', title: 'نیازمند تأیید والد', detail: 'برای ادامه تأیید والد لازم است.' },
  'organization-approval-required': { icon: 'organization', title: 'نیازمند تأیید سازمان', detail: 'این اقدام پس از تأیید مدیر سازمان انجام می‌شود.' },
  'step-up-auth-required': { icon: 'lock', title: 'تأیید هویت و ادامه', detail: 'برای ادامه احراز هویت مجدد لازم است.' },
  unavailable: { icon: 'warning', title: 'در این زمینه در دسترس نیست', detail: 'این اقدام در زمینه فعلی قابل انجام نیست.' },
};

export function PermissionState({ state, compact = false, detail }: { state: PermissionStateType; compact?: boolean; detail?: string }) {
  const copy = permissionCopy[state];
  return <div className={`permission-state state-${state} ${compact ? 'compact' : ''}`} role="status"><MResalatIcon name={copy.icon} size={compact ? 16 : 20} /><span><strong>{copy.title}</strong>{!compact && <small>{detail ?? copy.detail}</small>}</span></div>;
}

export function PermissionAction({ state, href, children: label, onClick }: { state: PermissionStateType; href?: string; children: ReactNode; onClick?: () => void }) {
  const enabled = state === 'allowed' || state === 'view-only' || state === 'step-up-auth-required' || state.includes('approval');
  const content = <>{state !== 'allowed' && <MResalatIcon name={permissionCopy[state].icon} size={16} />}{label}</>;
  const click = () => {
    if (!enabled) trackEvent({ event: 'permission_blocked_action', surface: 'segment', metadata: { state } });
    onClick?.();
  };
  if (href && enabled) return <a className={`permission-action state-${state}`} href={href} onClick={click}>{content}</a>;
  return <button type="button" className={`permission-action state-${state}`} disabled={!enabled} aria-disabled={!enabled} onClick={click}>{content}</button>;
}

export function ApprovalRequestCard({ id, title, source, childName, impact }: { id: string; title: string; source: string; childName: string; impact: string }) {
  const [state, setState] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const act = (next: 'approved' | 'rejected') => {
    setState(next);
    trackEvent({ event: next === 'approved' ? 'approval_request_approved' : 'approval_request_rejected', surface: 'segment', entityId: id });
  };
  return <article className={`approval-request-card approval-${state}`} onClick={() => trackEvent({ event: 'approval_request_opened', surface: 'segment', entityId: id })}>
    <header><span><MResalatIcon name={state === 'pending' ? 'time' : state === 'approved' ? 'success' : 'close'} size={20} /></span><div><small>{source}</small><h3>{title}</h3></div><b>{state === 'pending' ? 'در انتظار شما' : state === 'approved' ? 'تأیید شد' : 'رد شد'}</b></header>
    <dl><div><dt>برای</dt><dd>{childName}</dd></div><div><dt>اثر این تصمیم</dt><dd>{impact}</dd></div></dl>
    {state === 'pending' ? <footer><button type="button" className="button button-primary" onClick={() => act('approved')}>تأیید درخواست</button><button type="button" className="button button-ghost" onClick={() => act('rejected')}>رد کردن</button></footer> : <footer><button type="button" className="button button-ghost" onClick={() => setState('pending')}>بازگردانی برای QA</button></footer>}
  </article>;
}

export function NextBestAction({ icon, eyebrow = 'اقدام پیشنهادی', title, detail, href, actionLabel, tone = 'info' }: { icon: MResalatIconName; eyebrow?: string; title: string; detail: string; href: string; actionLabel: string; tone?: 'info' | 'warning' | 'success' }) {
  return <article className={`next-best-action tone-${tone}`}><span><MResalatIcon name={icon} size={24} /></span><div><small>{eyebrow}</small><h2>{title}</h2><p>{detail}</p></div><a href={href}>{actionLabel}<MResalatIcon name="next" size={16} /></a></article>;
}

export function CrossServiceContextMarker({ text, source = 'مسیر متصل' }: { text: string; source?: string }) {
  return <div className="cross-service-marker" role="status"><MResalatIcon name="assessment" size={16} /><span><small>{source}</small><strong>{text}</strong></span></div>;
}

export function ChildSelector({ baseHref }: { baseHref?: string }) {
  const { selectedChildId, setSelectedChildId } = useMResalatContext();
  return <div className="child-selector" role="radiogroup" aria-label="انتخاب فرزند">
    {children.map((child) => {
      const selected = child.id === selectedChildId;
      const content = <><span className={`child-avatar accent-${child.accent}`}>{child.avatarLetter}</span><span><strong>{child.nameFa}</strong><small>{child.ageFa}</small></span>{selected && <MResalatIcon name="success" size={16} />}</>;
      return baseHref ? <a href={`${baseHref}/${child.id}`} aria-current={selected ? 'true' : undefined} onClick={() => setSelectedChildId(child.id)} className={selected ? 'selected' : ''} key={child.id}>{content}</a> : <button type="button" role="radio" aria-checked={selected} onClick={() => setSelectedChildId(child.id)} className={selected ? 'selected' : ''} key={child.id}>{content}</button>;
    })}
  </div>;
}

export function ChildIdentity({ child }: { child: ChildFixture }) {
  return <div className="child-identity"><span className={`child-avatar accent-${child.accent}`}>{child.avatarLetter}</span><div><small>فضای مرتبط والد و نوجوان</small><strong>{child.nameFa}</strong><span>{child.ageFa}</span></div></div>;
}

