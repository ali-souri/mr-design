'use client';

import { lazy, Suspense, useSyncExternalStore } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export type AssistantEmotion = 'idle' | 'listening' | 'thinking' | 'explaining' | 'happy' | 'warning' | 'uncertain' | 'handoff';

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

function StaticAssistant({ emotion }: { emotion: AssistantEmotion }) {
  return <div className={`assistant-static assistant-static-${emotion}`} role="img" aria-label={`دستیار هوشمند، حالت ${assistantEmotionLabels[emotion]}`}><span className="static-head"><i /><i /></span><span className="static-body"><MResalatIcon name={emotion === 'warning' ? 'warning' : emotion === 'handoff' ? 'support' : 'assistant'} size={24} /></span></div>;
}

export function SmartAssistant3D({ emotion = 'idle', className = '' }: { emotion?: AssistantEmotion; className?: string }) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const supportsWebGL = hydrated && hasWebGL();
  return (
    <div className={`smart-assistant-3d ${className}`} data-emotion={emotion} aria-label={`نمای سه‌بعدی دستیار: ${assistantEmotionLabels[emotion]}`}>
      {supportsWebGL ? <Suspense fallback={<StaticAssistant emotion={emotion} />}><SmartAssistantCanvas emotion={emotion} /></Suspense> : <StaticAssistant emotion={emotion} />}
      <span className="assistant-emotion-label"><MResalatIcon name="assistant" size={16} />{assistantEmotionLabels[emotion]}</span>
    </div>
  );
}
