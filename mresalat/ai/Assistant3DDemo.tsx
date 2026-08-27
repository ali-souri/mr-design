'use client';

import { useState } from 'react';
import {
  SmartAssistant3D,
  SmartAssistantAvatar,
  assistantEmotionLabels,
  assistantHandPoseLabels,
  type AssistantCharacterMode,
  type AssistantEmotion,
  type AssistantGazeMode,
  type AssistantHandPose,
  type AssistantMotionIntensity,
  type AssistantView,
} from './SmartAssistant3D';

const emotions = Object.keys(assistantEmotionLabels) as AssistantEmotion[];
const handPoses = Object.keys(assistantHandPoseLabels) as AssistantHandPose[];
const modes: { value: AssistantCharacterMode; label: string }[] = [{ value: 'complete', label: 'کامل' }, { value: 'portrait', label: 'پرتره' }];
const gazeModes: { value: AssistantGazeMode; label: string }[] = [{ value: 'page', label: 'کل صفحه' }, { value: 'local', label: 'داخل قاب' }, { value: 'none', label: 'خاموش' }];
const motionLevels: { value: AssistantMotionIntensity; label: string }[] = [{ value: 'restrained', label: 'کنترل‌شده' }, { value: 'normal', label: 'عادی' }, { value: 'expressive', label: 'پرانرژی' }];
const views: { value: AssistantView; label: string }[] = [{ value: 'front', label: 'روبه‌رو' }, { value: 'three-quarter', label: 'سه‌رخ' }, { value: 'side', label: 'کنار' }, { value: 'back', label: 'پشت' }];
const avatarSizes = [32, 40, 48, 64, 96] as const;

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="mascot-control-group"><legend>{label}</legend><div>{children}</div></fieldset>;
}

export function Assistant3DDemo() {
  const [emotion, setEmotion] = useState<AssistantEmotion>('greeting');
  const [mode, setMode] = useState<AssistantCharacterMode>('complete');
  const [gaze, setGaze] = useState<AssistantGazeMode>('page');
  const [motionIntensity, setMotionIntensity] = useState<AssistantMotionIntensity>('normal');
  const [handPose, setHandPose] = useState<AssistantHandPose | undefined>();
  const [view, setView] = useState<AssistantView>('front');
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="assistant-3d-reference">
      <section className="assistant-3d-demo">
        <div className="assistant-main-preview">
          <SmartAssistant3D emotion={emotion} mode={mode} gaze={gaze} motionIntensity={motionIntensity} handPose={handPose} view={view} animationKey={animationKey} />
          <button className="button button-secondary mascot-replay" type="button" onClick={() => { setHandPose(undefined); setEmotion('greeting'); setView('front'); setAnimationKey((value) => value + 1); }}>بازپخش سلام و دست‌تکان</button>
        </div>
        <div className="assistant-demo-controls">
          <ControlGroup label="قاب نمایش"><div className="mode-controls">{modes.map((item) => <button className={item.value === mode ? 'active' : ''} type="button" aria-pressed={item.value === mode} onClick={() => setMode(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="حالت رفتاری"><div className="emotion-controls">{emotions.map((item) => <button className={item === emotion && !handPose ? 'active' : ''} type="button" aria-pressed={item === emotion && !handPose} onClick={() => { setEmotion(item); setHandPose(undefined); setAnimationKey((value) => value + 1); }} key={item}>{assistantEmotionLabels[item]}</button>)}</div></ControlGroup>
          <ControlGroup label="شدت حرکت"><div className="motion-controls">{motionLevels.map((item) => <button className={item.value === motionIntensity ? 'active' : ''} type="button" aria-pressed={item.value === motionIntensity} onClick={() => setMotionIntensity(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="دنبال‌کردن نگاه"><div className="gaze-controls">{gazeModes.map((item) => <button className={item.value === gaze ? 'active' : ''} type="button" aria-pressed={item.value === gaze} onClick={() => setGaze(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
        </div>
      </section>

      <section className="mascot-debug-section">
        <header><span className="eyebrow">Developer rig QA</span><h3>دست‌ها و مفصل‌ها</h3><p>هر ژست از یک preset استفاده می‌کند؛ انگشت اشاره، شست و سه انگشت دیگر مستقل و دارای سه بند قابل‌حرکت‌اند.</p></header>
        <div className="hand-pose-controls">{handPoses.map((item) => <button className={item === handPose ? 'active' : ''} type="button" aria-pressed={item === handPose} onClick={() => { setEmotion('idle'); setMode('complete'); setView('front'); setHandPose(item); }} key={item}>{assistantHandPoseLabels[item]}</button>)}</div>
      </section>

      <section className="mascot-debug-grid">
        <article>
          <header><strong>بازبینی صورت</strong><span>{assistantEmotionLabels[emotion]}</span></header>
          <SmartAssistant3D emotion={emotion} mode="portrait" debugView="face" gaze="local" motionIntensity="restrained" transparent />
          <div className="face-state-controls">{emotions.map((item) => <button className={item === emotion ? 'active' : ''} type="button" onClick={() => setEmotion(item)} key={item}>{assistantEmotionLabels[item]}</button>)}</div>
        </article>
        <article>
          <header><strong>چرخش مدل</strong><span>{views.find((item) => item.value === view)?.label}</span></header>
          <SmartAssistant3D emotion="idle" mode="complete" view={view} gaze="none" motionIntensity="restrained" transparent />
          <div className="turnaround-controls">{views.map((item) => <button className={item.value === view ? 'active' : ''} type="button" aria-pressed={item.value === view} onClick={() => setView(item.value)} key={item.value}>{item.label}</button>)}</div>
        </article>
      </section>

      <section className="mascot-surface-lab" aria-label="نمونه پس‌زمینه‌های شفاف ماسکات">
        <article className="mascot-surface-light"><SmartAssistant3D emotion="calm" mode="portrait" gaze="none" transparent /><strong>سطح روشن</strong></article>
        <article className="mascot-surface-gradient"><SmartAssistant3D emotion="greeting" mode="portrait" gaze="none" transparent /><strong>سطح گرادیانی</strong></article>
        <article className="mascot-surface-dark"><SmartAssistant3D emotion="listening" mode="portrait" gaze="none" transparent /><strong>سطح تیره</strong></article>
      </section>

      <section className="mascot-reference-notes">
        <div className="assistant-physical-note"><strong>فرم نهایی ربات ام‌رسالت</strong><p>سر مکعبی نرم نزدیک به ۳۸٪ قد، نمایشگر مات و فرورفته، ماژول‌های شنیداری حلقه‌ای، آنتن کوتاه و بدن کوچک، سیلوئت مرجع را بازسازی می‌کنند.</p></div>
        <div className="assistant-tracking-note"><strong>نگاه آگاه از کل صفحه</strong><p>حالت page سر و چشم‌ها را به نشانگر متصل می‌کند؛ local فقط داخل قاب فعال است و none برای سطوح ثابت و تست چرخش استفاده می‌شود.</p></div>
        <div className="assistant-avatar-sizes"><strong>پرتره و fallback بهینه</strong><div>{avatarSizes.map((size) => <span key={size}><SmartAssistantAvatar size={size} emotion={emotion} /><small>{size}</small></span>)}</div><p>اندازه‌های ۳۲ تا ۶۴ پیکسل از نسخه ایستای کم‌جزئیات استفاده می‌کنند و ۹۶ پیکسل نسخه سه‌بعدی سر و بالاتنه را نشان می‌دهد.</p></div>
      </section>
    </div>
  );
}
