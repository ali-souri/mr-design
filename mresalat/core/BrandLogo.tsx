/* eslint-disable @next/next/no-img-element */
export function BrandLogo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className={`brand-logo ${compact ? 'brand-logo-compact' : ''} ${light ? 'brand-logo-light' : ''}`}>
      <img src="/brand/mresalat-logo.svg" alt="ام‌رسالت" width={compact ? 64 : 96} height={compact ? 15 : 23} />
      {!compact && <small>MResalat System</small>}
    </span>
  );
}
