'use client';

import { lazy, Suspense, useEffect, useRef, useSyncExternalStore, type CSSProperties } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import {
  assistantEmotionLabels,
  type AssistantCharacterMode,
  type AssistantDebugView,
  type AssistantEmotion,
  type AssistantGaze,
  type AssistantGazeMode,
  type AssistantHandPose,
  type AssistantMotionIntensity,
  type AssistantView,
} from './mascot';
import { detectWebGLSupport } from './webgl-capability';

export {
  assistantEmotionLabels,
  assistantHandPoseLabels,
  type AssistantCharacterMode,
  type AssistantDebugView,
  type AssistantEmotion,
  type AssistantGaze,
  type AssistantGazeMode,
  type AssistantHandPose,
  type AssistantMotionIntensity,
  type AssistantView,
} from './mascot';

const SmartAssistantCanvas = lazy(() => import('./SmartAssistantCanvas'));
const subscribeHydration = () => () => undefined;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function StaticAssistant({ emotion, mode, compact = false }: { emotion: AssistantEmotion; mode: AssistantCharacterMode; compact?: boolean }) {
  return (
    <div className={`assistant-static assistant-static-${emotion} assistant-static-${mode}${compact ? ' assistant-static-compact' : ''}`} aria-hidden="true">
      <span className="static-android-head">
        <span className="static-head-accent"><i /></span><span className="static-antenna" />
        <span className="static-ear static-ear-right"><i /></span><span className="static-ear static-ear-left"><i /></span>
        <span className="static-face"><i className="static-eye static-eye-right" /><i className="static-eye static-eye-left" /><b className="static-smile" /><span className="static-brows"><i /><i /></span></span>
      </span>
      <span className="static-neck" />
      <span className="static-android-body">
        <span className="static-collar" /><span className="static-chest-panel" /><span className="static-vest-trim" /><span className="static-pattern" /><span className="static-sash" />
        <span className="static-vest-mark"><MResalatIcon name={emotion === 'warning' ? 'warning' : emotion === 'handoff' ? 'support' : 'assistant'} size={compact ? 16 : 20} /></span>
        <i className="static-shoulder static-shoulder-right" /><i className="static-shoulder static-shoulder-left" />
        <i className="static-arm static-arm-right"><b /></i><i className="static-arm static-arm-left"><b /></i>
      </span>
      <span className="static-hips" />
      <span className="static-leg static-leg-right"><i /></span><span className="static-leg static-leg-left"><i /></span>
    </div>
  );
}

export type SmartAssistant3DProps = {
  emotion?: AssistantEmotion;
  mode?: AssistantCharacterMode;
  motionIntensity?: AssistantMotionIntensity;
  gaze?: AssistantGazeMode;
  transparent?: boolean;
  handPose?: AssistantHandPose;
  view?: AssistantView;
  debugView?: AssistantDebugView;
  animationKey?: number;
  staticOnly?: boolean;
  className?: string;
};

export function SmartAssistantAvatar({ size = 48, emotion = 'idle', className = '' }: { size?: 32 | 40 | 48 | 64 | 96; emotion?: AssistantEmotion; className?: string }) {
  return (
    <span className={`smart-assistant-avatar ${className}`} style={{ '--assistant-avatar-size': `${size}px` } as CSSProperties} aria-label={`دستیار ام‌رسالت، ${assistantEmotionLabels[emotion]}`}>
      <StaticAssistant emotion={emotion} mode="portrait" compact />
    </span>
  );
}

export function SmartAssistant3D({
  emotion = 'idle',
  mode = 'complete',
  motionIntensity = 'normal',
  gaze = 'page',
  transparent = false,
  handPose,
  view = 'front',
  debugView = 'standard',
  animationKey = 0,
  staticOnly = false,
  className = '',
}: SmartAssistant3DProps) {
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const supportsWebGL = hydrated && !staticOnly && detectWebGLSupport();
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const gazeRef = useRef<AssistantGaze>({ x: 0, y: 0, strength: 0, active: false });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    const resetGaze = () => {
      gazeRef.current = { x: 0, y: 0, strength: 0, active: false };
      root.dataset.gazeActive = 'false';
      root.style.setProperty('--assistant-gaze-x', '0');
      root.style.setProperty('--assistant-gaze-y', '0');
    };
    let pointerFrame = 0;
    let pendingPointer: { clientX: number; clientY: number } | undefined;
    const applyGaze = () => {
      pointerFrame = 0;
      if (!pendingPointer || reducedMotion || !visibleRef.current || gaze === 'none' || view !== 'front') return;
      const bounds = root.getBoundingClientRect();
      const dx = pendingPointer.clientX - (bounds.left + bounds.width / 2);
      const dy = bounds.top + bounds.height * .38 - pendingPointer.clientY;
      const x = clamp(dx / Math.max((gaze === 'page' ? window.innerWidth : bounds.width) * .48, bounds.width * 1.1));
      const y = clamp(dy / Math.max((gaze === 'page' ? window.innerHeight : bounds.height) * .46, bounds.height * 1.1));
      const distance = Math.hypot(dx, dy);
      const reach = gaze === 'page' ? Math.hypot(window.innerWidth, window.innerHeight) * .72 : Math.hypot(bounds.width, bounds.height);
      const proximity = 1 - Math.min(1, distance / reach);
      const strength = .42 + proximity * .58;
      gazeRef.current = { x, y, strength, active: true };
      root.dataset.gazeActive = 'true';
      root.style.setProperty('--assistant-gaze-x', x.toFixed(3));
      root.style.setProperty('--assistant-gaze-y', y.toFixed(3));
    };
    const setGaze = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pendingPointer = { clientX: event.clientX, clientY: event.clientY };
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(applyGaze);
    };
    const handlePageLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) resetGaze();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) resetGaze();
    }, { threshold: .05 });

    observer.observe(root);
    const pointerTarget: Window | HTMLDivElement = gaze === 'local' ? root : window;
    if (gaze !== 'none' && !reducedMotion && view === 'front') pointerTarget.addEventListener('pointermove', setGaze as EventListener, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePageLeave);
    window.addEventListener('blur', resetGaze);
    document.addEventListener('visibilitychange', resetGaze);
    return () => {
      observer.disconnect();
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerTarget.removeEventListener('pointermove', setGaze as EventListener);
      document.documentElement.removeEventListener('mouseleave', handlePageLeave);
      window.removeEventListener('blur', resetGaze);
      document.removeEventListener('visibilitychange', resetGaze);
    };
  }, [gaze, reducedMotion, view]);

  return (
    <div
      ref={rootRef}
      className={`smart-assistant-3d smart-assistant-mode-${mode}${transparent ? ' smart-assistant-transparent' : ''} ${className}`}
      data-emotion={emotion}
      data-mode={mode}
      data-gaze-active="false"
      data-hand-pose={handPose ?? ''}
      data-view={view}
      role="img"
      aria-label={`نمای سه‌بعدی دستیار ام‌رسالت: ${assistantEmotionLabels[emotion]}`}
    >
      {supportsWebGL ? (
        <Suspense fallback={<StaticAssistant emotion={emotion} mode={mode} />}>
          <SmartAssistantCanvas
            emotion={emotion}
            mode={mode}
            motionIntensity={motionIntensity}
            gazeRef={gazeRef}
            handPose={handPose}
            view={view}
            debugView={debugView}
            animationKey={animationKey}
            reducedMotion={reducedMotion}
            visibleRef={visibleRef}
          />
        </Suspense>
      ) : <StaticAssistant emotion={emotion} mode={mode} />}
      <span className="assistant-emotion-label"><MResalatIcon name="assistant" size={16} />{assistantEmotionLabels[emotion]}</span>
    </div>
  );
}
