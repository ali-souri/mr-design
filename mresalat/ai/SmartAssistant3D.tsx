'use client';

import { lazy, Suspense, useEffect, useRef, useSyncExternalStore, type CSSProperties } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export type AssistantEmotion = 'idle' | 'greeting' | 'listening' | 'thinking' | 'explaining' | 'happy' | 'warning' | 'uncertain' | 'handoff';
export type AssistantCharacterMode = 'complete' | 'portrait';
export type AssistantGaze = { x: number; y: number; strength: number; active: boolean };

export const assistantEmotionLabels: Record<AssistantEmotion, string> = {
  idle: 'آرام', greeting: 'سلام و خوش‌آمد', listening: 'در حال شنیدن', thinking: 'در حال فکر', explaining: 'در حال توضیح',
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
      <span className="static-android-head">
        <span className="static-antenna" /><span className="static-ear static-ear-right" /><span className="static-ear static-ear-left" />
        <span className="static-face"><i className="static-eye static-eye-right" /><i className="static-eye static-eye-left" /><b className="static-smile" /><span className="static-brows"><i /><i /></span></span>
      </span>
      <span className="static-neck" />
      <span className="static-android-body">
        <span className="static-collar" /><span className="static-chest-panel" /><span className="static-vest-trim" /><span className="static-sash" />
        <span className="static-vest-mark"><MResalatIcon name={emotion === 'warning' ? 'warning' : emotion === 'handoff' ? 'support' : 'assistant'} size={compact ? 16 : 20} /></span>
        <i className="static-arm static-arm-right" /><i className="static-arm static-arm-left" />
      </span>
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
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const gazeRef = useRef<AssistantGaze>({ x: 0, y: 0, strength: 0, active: false });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    const resetGaze = () => {
      gazeRef.current = { x: 0, y: 0, strength: 0, active: false };
      root.dataset.gazeActive = 'false';
      root.style.setProperty('--assistant-gaze-x', '0');
      root.style.setProperty('--assistant-gaze-y', '0');
    };
    const setGaze = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches || !visibleRef.current) return;
      const bounds = root.getBoundingClientRect();
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = bounds.top + bounds.height * .38 - event.clientY;
      const x = clamp(dx / Math.max(window.innerWidth * .48, bounds.width * 1.5));
      const y = clamp(dy / Math.max(window.innerHeight * .46, bounds.height * 1.5));
      const distance = Math.hypot(dx, dy);
      const pageDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
      const proximity = 1 - Math.min(1, distance / (pageDiagonal * .72));
      const strength = .46 + proximity * .54;
      gazeRef.current = { x, y, strength, active: true };
      root.dataset.gazeActive = 'true';
      root.style.setProperty('--assistant-gaze-x', x.toFixed(3));
      root.style.setProperty('--assistant-gaze-y', y.toFixed(3));
    };
    const handlePageLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) resetGaze();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) resetGaze();
    }, { threshold: .05 });

    observer.observe(root);
    window.addEventListener('pointermove', setGaze, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePageLeave);
    window.addEventListener('blur', resetGaze);
    document.addEventListener('visibilitychange', resetGaze);
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', setGaze);
      document.documentElement.removeEventListener('mouseleave', handlePageLeave);
      window.removeEventListener('blur', resetGaze);
      document.removeEventListener('visibilitychange', resetGaze);
    };
  }, []);

  return (
    <div ref={rootRef} className={`smart-assistant-3d smart-assistant-mode-${mode} ${className}`} data-emotion={emotion} data-mode={mode} data-gaze-active="false" aria-label={`نمای سه‌بعدی دستیار: ${assistantEmotionLabels[emotion]}`}>
      {supportsWebGL ? <Suspense fallback={<StaticAssistant emotion={emotion} mode={mode} />}><SmartAssistantCanvas emotion={emotion} mode={mode} gazeRef={gazeRef} /></Suspense> : <StaticAssistant emotion={emotion} mode={mode} />}
      <span className="assistant-emotion-label"><MResalatIcon name="assistant" size={16} />{assistantEmotionLabels[emotion]}</span>
    </div>
  );
}
