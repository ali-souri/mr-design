'use client';

import { useState } from 'react';
import { SmartAssistant3D, assistantEmotionLabels, type AssistantEmotion } from './SmartAssistant3D';

const emotions = Object.keys(assistantEmotionLabels) as AssistantEmotion[];

export function Assistant3DDemo() {
  const [emotion, setEmotion] = useState<AssistantEmotion>('idle');
  return <div className="assistant-3d-demo"><SmartAssistant3D emotion={emotion} /><div className="emotion-controls" aria-label="حالت‌های دستیار">{emotions.map((item) => <button className={item === emotion ? 'active' : ''} type="button" aria-pressed={item === emotion} onClick={() => setEmotion(item)} key={item}>{assistantEmotionLabels[item]}</button>)}</div><p>حالت برنامه می‌تواند مستقیماً به ویژگی <code>emotion</code> متصل شود؛ هیچ اطلاعات ضروری فقط در بوم سه‌بعدی نمایش داده نمی‌شود.</p></div>;
}
