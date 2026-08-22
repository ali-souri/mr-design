'use client';

import { useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export function GridLayoutDemo() {
  const [visible, setVisible] = useState(true);
  return <div className="grid-layout-demo"><div className="grid-demo-toolbar"><div><strong>نمونه کانتینر ۱۲ ستونه</strong><span>عرض بیشینه ۱۱۸۰px · فاصله ستون‌ها ۱۶px</span></div><button type="button" aria-pressed={visible} onClick={() => setVisible((value) => !value)}><MResalatIcon name="grid" size={20} />{visible ? 'پنهان‌کردن شبکه' : 'نمایش شبکه'}</button></div><div className={`grid-overlay-canvas ${visible ? 'is-visible' : ''}`}><div className="grid-overlay-columns">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div><article><span>۸ ستون</span><strong>محتوای اصلی</strong><p>شبکه به‌عنوان راهنمای ترکیب‌بندی استفاده می‌شود؛ محتوا همیشه مجبور به پرکردن همه ستون‌ها نیست.</p></article><aside><span>۴ ستون</span><strong>زمینه یا اقدام بعدی</strong></aside></div></div>;
}
