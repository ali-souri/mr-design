'use client';

import { useState } from 'react';
import { SmartAssistant3D, SmartAssistantAvatar, assistantEmotionLabels, type AssistantCharacterMode, type AssistantEmotion } from './SmartAssistant3D';

const emotions = Object.keys(assistantEmotionLabels) as AssistantEmotion[];
const modes: { value: AssistantCharacterMode; label: string }[] = [{ value: 'complete', label: 'کامل' }, { value: 'portrait', label: 'پرتره' }];
const avatarSizes = [32, 40, 48, 64, 96] as const;

export function Assistant3DDemo() {
  const [emotion, setEmotion] = useState<AssistantEmotion>('idle');
  const [mode, setMode] = useState<AssistantCharacterMode>('complete');
  return (
    <div className="assistant-3d-demo">
      <SmartAssistant3D emotion={emotion} mode={mode} />
      <div className="assistant-demo-controls">
        <div className="mode-controls" aria-label="قاب نمایش دستیار">{modes.map((item) => <button className={item.value === mode ? 'active' : ''} type="button" aria-pressed={item.value === mode} onClick={() => setMode(item.value)} key={item.value}>{item.label}</button>)}</div>
        <div className="emotion-controls" aria-label="حالت‌های دستیار">{emotions.map((item) => <button className={item === emotion ? 'active' : ''} type="button" aria-pressed={item === emotion} onClick={() => setEmotion(item)} key={item}>{assistantEmotionLabels[item]}</button>)}</div>
      </div>
      <div className="assistant-tracking-note"><strong>نگاه آگاه از کل صفحه</strong><p>تا وقتی شخصیت دیده می‌شود، چشم‌ها و سر جای نشانگر را در سراسر صفحه با نرمی دنبال می‌کنند؛ حرکت نزدیک مستقیم‌تر است و پس از خروج نشانگر، نگاه آرام به حالت خنثی برمی‌گردد.</p></div>
      <div className="assistant-avatar-sizes"><strong>پرتره و هویت ایرانی در اندازه‌های رابط</strong><div>{avatarSizes.map((size) => <span key={size}><SmartAssistantAvatar size={size} emotion={emotion} /><small>{size}</small></span>)}</div><p>یقهٔ زاویه‌دار، لبه‌های فیروزه‌ای جلیقه، نوار میانی و کمربند طلایی، برداشت معاصر و ساده‌شده‌ای از پوشش ایرانی می‌سازند.</p></div>
    </div>
  );
}
