'use client';

import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D';
import { AppShell } from '@/mresalat/core/AppShell';
import { BrandLogo } from '@/mresalat/core/BrandLogo';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { Button } from '@/mresalat/core/primitives';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { loanJourney } from '@/mresalat/domains/mock-data';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';
import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer';
import { SegmentAIEntry } from '@/mresalat/segments/SegmentAIEntry';

export function ComponentLivePreview({ name }: { name: string }) {
  let content: React.ReactNode;
  switch (name) {
    case 'Button':
      content = <div className="docs-live-row"><Button>اقدام اصلی</Button><Button tone="secondary">اقدام دوم</Button><Button tone="danger">اقدام حساس</Button><Button disabled>غیرفعال</Button></div>;
      break;
    case 'BrandLogo':
      content = <div className="docs-live-row"><BrandLogo /><BrandLogo compact /><span className="docs-dark-sample"><BrandLogo light /></span></div>;
      break;
    case 'MResalatIcon':
      content = <div className="docs-live-row">{(['assistant', 'next', 'previous', 'security', 'success'] as const).map((icon) => <span key={icon}><MResalatIcon name={icon} size={24} /><code>{icon}</code></span>)}</div>;
      break;
    case 'MResalatServiceIcon':
      content = <div className="docs-live-row">{ecosystemServices.slice(0, 5).map((service) => <span key={service.id}><MResalatServiceIcon service={service} size={48} /><small>{service.titleFa}</small></span>)}</div>;
      break;
    case 'SmartAssistant3D':
      content = <div className="docs-mascot-preview"><SmartAssistant3D mode="portrait" emotion="explaining" motionIntensity="restrained" gaze="none" staticOnly /></div>;
      break;
    case 'SegmentAIEntry':
      content = <SegmentAIEntry segment="individual" mascotMode="portrait" staticMascot />;
      break;
    case 'ProcessReviewWizard':
      content = <ProcessReviewWizard title="درخواست وام" steps={loanJourney.steps} progress={48} variant="compact" />;
      break;
    case 'ParallaxLayer':
      content = <ParallaxLayer className="docs-parallax-preview" strength={8}><span><MResalatIcon name="goal" size={24} /></span><strong>عمق محدود</strong><small>با reduced-motion ایستا می‌شود.</small></ParallaxLayer>;
      break;
    case 'AppShell':
      content = <div className="docs-shell-preview"><AppShell active="system" hideMobileNav><p>پیش‌نمایش فشرده AppShell</p></AppShell></div>;
      break;
    case 'SecureActionFlow':
      content = <div className="docs-live-link"><MResalatIcon name="security" size={24} /><div><strong>دموی کامل در route امن</strong><p>جریان چندمرحله‌ای به فضای کامل صفحه نیاز دارد.</p></div><a className="button button-secondary" href="/secure">باز کردن دمو</a></div>;
      break;
    default:
      content = <p>برای این جزء، نمونه تعاملی در Showcase اصلی حفظ شده است.</p>;
  }
  return <div className="docs-live-preview" aria-label={`پیش‌نمایش زنده ${name}`}>{content}</div>;
}
