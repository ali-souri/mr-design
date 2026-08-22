import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({ children, tone = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'primary' | 'secondary' | 'danger' }) {
  return <button className={`button button-${tone}`} {...props}>{children}</button>;
}

export function Badge({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral' }) {
  return <span className={`status-badge status-badge-${tone}`}>{children}</span>;
}

export function Alert({ children, tone = 'info', title }: { children: ReactNode; tone?: 'info' | 'success' | 'warning' | 'danger'; title: string }) {
  return <div className={`alert alert-${tone}`} role={tone === 'danger' ? 'alert' : 'status'}><span className="alert-icon" aria-hidden="true">{tone === 'warning' ? '!' : tone === 'danger' ? '×' : tone === 'success' ? '✓' : 'i'}</span><div><strong>{title}</strong><div>{children}</div></div></div>;
}
