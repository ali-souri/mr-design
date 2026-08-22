'use client';

import { useEffect, useState } from 'react';
import { MResalatIcon } from './MResalatIcon';

export type ThemePreference = 'light' | 'dark' | 'system';
const order: ThemePreference[] = ['light', 'dark', 'system'];

function resolvedTheme(preference: ThemePreference) {
  if (preference !== 'system') return preference;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('mresalat-theme') as ThemePreference | null) ?? 'system';
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = resolvedTheme(preference);
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [preference]);

  const changeTheme = () => {
    const next = order[(order.indexOf(preference) + 1) % order.length];
    setPreference(next);
    localStorage.setItem('mresalat-theme', next);
    document.documentElement.dataset.theme = resolvedTheme(next);
  };

  const label = preference === 'light' ? 'روشن' : preference === 'dark' ? 'تیره' : 'سیستم';
  return <button suppressHydrationWarning className="theme-toggle" type="button" onClick={changeTheme} aria-label={`پوسته: ${label}. تغییر پوسته`} title={`پوسته ${label}`}><MResalatIcon name={preference === 'light' ? 'themeLight' : preference === 'dark' ? 'themeDark' : 'themeSystem'} size={20} /><span suppressHydrationWarning>{label}</span></button>;
}
