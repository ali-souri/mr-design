import Image from 'next/image';
import type { MResalatService } from '@/mresalat/domains/ecosystem';

export function MResalatServiceIcon({ service, size = 48, variant = 'normal', eager = false }: { service: MResalatService; size?: 32 | 40 | 48 | 64; variant?: 'normal' | 'compact' | 'monochrome'; eager?: boolean }) {
  const style = { '--service-accent': service.identity.accent, width: size, height: size } as React.CSSProperties;
  if (service.identity.source === 'official-asset' && service.identity.asset) {
    return <span className={`mresalat-service-icon service-icon-${variant} service-icon-official`} style={style} data-service={service.slug}><Image src={service.identity.asset} alt="" width={size} height={size} unoptimized loading={eager ? 'eager' : 'lazy'} /></span>;
  }
  return <span className={`mresalat-service-icon service-icon-${variant} service-icon-designed`} style={style} data-service={service.slug} aria-hidden="true"><i /><b>{service.identity.glyph ?? 'M'}</b><em /></span>;
}
