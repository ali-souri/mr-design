'use client';

import { lazy, Suspense, useRef, useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export type AssistantEmotion = 'idle' | 'listening' | 'thinking' | 'explaining' | 'happy' | 'warning' | 'uncertain' | 'handoff';
export type AssistantCharacterMode = 'complete' | 'portrait';
export type AssistantGaze = { x: number; y: number; active: boolean };

export const assistantEmotionLabels: Record<AssistantEmotion, string> = {
  idle: 'آرام', listening: 'در حال شنیدن', thinking: 'در حال فکر', explaining: 'در حال توضیح',
  happy: 'خوشحال', warning: 'هشدار', uncertain: 'نامطمئن', handoff: 'ارجاع به کارشناس',
};

const SmartAssistantCanvas = lazy(() => import('./SmartAssistantCanvas'));
const subscribe = () => () => undefined;

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function StaticAssistant({ emotion, mode, compact = false }: { emotion: AssistantEmotion; mode: AssistantCharacterMode; compact?: boolean }) {
  return (
    <div className={`assistant-static assistant-static-${emotion} assistant-static-${mode}${compact ? ' assistant-static-compact' : ''}`} role="img" aria-label={`دستیار هوشمند، حالت ${assistantEmotionLabels[emotion]}`}>
      <span className="static-android-head"><span className="static-face"><i /><i /><b /></span><em /></span>
      <span className="static-neck" />
      <span className="static-android-body"><span className="static-collar" /><span className="static-vest-mark"><MResalatIcon name={emotion === 'warning' ? 'warning' : emotion === 'handoff' ? 'support' : 'assistant'} size={compact ? 16 : 20} /></span><i className="static-arm static-arm-right" /><i className="static-arm static-arm-left" /></span>
      <span className="static-hips" />
      <span className="static-leg static-leg-right"><i /></span><span className="static-leg static-leg-left"><i /></span>
    </div>
  );
}

export function SmartAssistantAvatar({ size = 48, emotion = 'idle', className = '' }: { size?: 32 | 40 | 48 | 64 | 96; emotion?: AssistantEmotion; className?: string }) {
  return (
    <span className={`smart-assistant-avatar ${className}`} style={{ '--assistant-avatar-size': `${size}px` } as CSSProperties}>
      <StaticAssistant emotion={emotion} mode="portrait" compact />
    </span>
  );
}

export function SmartAssistant3D({ emotion = 'idle', mode = 'complete', className = '' }: { emotion?: AssistantEmotion; mode?: AssistantCharacterMode; className?: string }) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const supportsWebGL = hydrated && hasWebGL();
  const gazeRef = useRef<AssistantGaze>({ x: 0, y: 0, active: false });

  const setGaze = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    gazeRef.current.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    gazeRef.current.y = Math.max(-1, Math.min(1, -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)));
    gazeRef.current.active = true;
    event.currentTarget.dataset.gazeActive = 'true';
  };
  const resetGaze = (event: PointerEvent<HTMLDivElement>) => {
    gazeRef.current.active = false;
    event.currentTarget.dataset.gazeActive = 'false';
  };

  return (
    <div className={`smart-assistant-3d smart-assistant-mode-${mode} ${className}`} data-emotion={emotion} data-mode={mode} data-gaze-active="false" onPointerEnter={setGaze} onPointerMove={setGaze} onPointerLeave={resetGaze} onPointerCancel={resetGaze} aria-label={`نمای سه‌بعدی دستیار: ${assistantEmotionLabels[emotion]}`}>
      {supportsWebGL ? <Suspense fallback={<StaticAssistant emotion={emotion} mode={mode} />}><SmartAssistantCanvas emotion={emotion} mode={mode} gazeRef={gazeRef} /></Suspense> : <StaticAssistant emotion={emotion} mode={mode} />}
      <span className="assistant-emotion-label"><MResalatIcon name="assistant" size={16} />{assistantEmotionLabels[emotion]}</span>
    </div>
  );
}
