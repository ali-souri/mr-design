'use client';

import { useState } from 'react';
import {
  SmartAssistant3D,
  SmartAssistantAvatar,
  assistantEmotionLabels,
  assistantHandPoseLabels,
  type AssistantCharacterMode,
  type AssistantDebugView,
  type AssistantEmotion,
  type AssistantGazeMode,
  type AssistantHandPose,
  type AssistantMotionIntensity,
  type AssistantView,
} from './SmartAssistant3D';

const emotions = Object.keys(assistantEmotionLabels) as AssistantEmotion[];
const handPoses = Object.keys(assistantHandPoseLabels) as AssistantHandPose[];
const modes: { value: AssistantCharacterMode; label: string }[] = [{ value: 'complete', label: 'کامل' }, { value: 'portrait', label: 'پرتره' }];
const debugViews: { value: AssistantDebugView; label: string }[] = [{ value: 'standard', label: 'بدن کامل' }, { value: 'face', label: 'نمای نزدیک صورت' }];
const gazeModes: { value: AssistantGazeMode; label: string }[] = [{ value: 'page', label: 'کل صفحه' }, { value: 'local', label: 'داخل قاب' }, { value: 'none', label: 'خاموش' }];
const motionLevels: { value: AssistantMotionIntensity; label: string }[] = [{ value: 'restrained', label: 'کنترل‌شده' }, { value: 'normal', label: 'عادی' }, { value: 'expressive', label: 'پرانرژی' }];
const views: { value: AssistantView; label: string }[] = [{ value: 'front', label: 'روبه‌رو' }, { value: 'three-quarter', label: 'سه‌رخ' }, { value: 'side', label: 'کنار' }, { value: 'back', label: 'پشت' }];
const surfaces = [{ value: 'light', label: 'روشن' }, { value: 'gradient', label: 'گرادیانی' }, { value: 'dark', label: 'تیره' }] as const;
const avatarSizes = [32, 40, 48, 64, 96] as const;

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="mascot-control-group"><legend>{label}</legend><div>{children}</div></fieldset>;
}

export function Assistant3DDemo() {
  const [emotion, setEmotion] = useState<AssistantEmotion>('greeting');
  const [mode, setMode] = useState<AssistantCharacterMode>('complete');
  const [debugView, setDebugView] = useState<AssistantDebugView>('standard');
  const [gaze, setGaze] = useState<AssistantGazeMode>('page');
  const [motionIntensity, setMotionIntensity] = useState<AssistantMotionIntensity>('normal');
  const [handPose, setHandPose] = useState<AssistantHandPose | undefined>();
  const [view, setView] = useState<AssistantView>('front');
  const [surface, setSurface] = useState<(typeof surfaces)[number]['value']>('gradient');
  const [animationKey, setAnimationKey] = useState(0);

  const selectEmotion = (nextEmotion: AssistantEmotion) => {
    setEmotion(nextEmotion);
    setHandPose(undefined);
  };

  return (
    <div className="assistant-3d-reference">
      <section className="assistant-3d-demo">
        <div className={`assistant-main-preview mascot-surface-${surface}`} data-testid="mascot-live-preview">
          <SmartAssistant3D
            emotion={emotion}
            mode={mode}
            gaze={gaze}
            motionIntensity={motionIntensity}
            handPose={handPose}
            view={view}
            debugView={debugView}
            animationKey={animationKey}
            transparent
          />
          <div className="assistant-lab-status" aria-live="polite">
            <span>یک بوم زنده</span>
            <strong>{handPose ? assistantHandPoseLabels[handPose] : assistantEmotionLabels[emotion]}</strong>
          </div>
          <button className="button button-secondary mascot-replay" type="button" onClick={() => { setHandPose(undefined); setEmotion('greeting'); setDebugView('standard'); setView('front'); setAnimationKey((value) => value + 1); }}>بازپخش سلام و دست‌تکان</button>
        </div>

        <div className="assistant-demo-controls">
          <ControlGroup label="قاب نمایش"><div className="mode-controls">{modes.map((item) => <button className={item.value === mode ? 'active' : ''} type="button" aria-pressed={item.value === mode} onClick={() => setMode(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="بازبینی"><div className="mode-controls">{debugViews.map((item) => <button className={item.value === debugView ? 'active' : ''} type="button" aria-pressed={item.value === debugView} onClick={() => { setDebugView(item.value); if (item.value === 'face') setHandPose(undefined); }} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="حالت رفتاری"><div className="emotion-controls">{emotions.map((item) => <button className={item === emotion && !handPose ? 'active' : ''} type="button" aria-pressed={item === emotion && !handPose} onClick={() => selectEmotion(item)} key={item}>{assistantEmotionLabels[item]}</button>)}</div></ControlGroup>
          <ControlGroup label="شدت حرکت"><div className="motion-controls">{motionLevels.map((item) => <button className={item.value === motionIntensity ? 'active' : ''} type="button" aria-pressed={item.value === motionIntensity} onClick={() => setMotionIntensity(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="دنبال‌کردن نگاه"><div className="gaze-controls">{gazeModes.map((item) => <button className={item.value === gaze ? 'active' : ''} type="button" aria-pressed={item.value === gaze} onClick={() => setGaze(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="زاویه دوربین"><div className="turnaround-controls">{views.map((item) => <button className={item.value === view ? 'active' : ''} type="button" aria-pressed={item.value === view} onClick={() => { setView(item.value); setDebugView('standard'); }} key={item.value}>{item.label}</button>)}</div></ControlGroup>
          <ControlGroup label="سطح"><div className="surface-controls">{surfaces.map((item) => <button className={item.value === surface ? 'active' : ''} type="button" aria-pressed={item.value === surface} onClick={() => setSurface(item.value)} key={item.value}>{item.label}</button>)}</div></ControlGroup>
        </div>
      </section>

      <section className="mascot-debug-section">
        <header><span className="eyebrow">Developer rig QA</span><h3>دست‌ها و مفصل‌ها</h3><p>هر ژست روی همان پیش‌نمایش زنده اعمال می‌شود؛ شست و چهار انگشت، زاویه‌های مستقل MCP/PIP/DIP و بازشدگی مستقل دارند.</p></header>
        <div className="hand-pose-controls">{handPoses.map((item) => <button className={item === handPose ? 'active' : ''} type="button" aria-pressed={item === handPose} onClick={() => { setEmotion('idle'); setMode('complete'); setDebugView('standard'); setView('front'); setHandPose(item); }} key={item}>{assistantHandPoseLabels[item]}</button>)}</div>
      </section>

      <section className="mascot-reference-notes">
        <div className="assistant-physical-note"><strong>یک صحنه برای تمام آزمایش‌ها</strong><p>صورت، چرخش مدل، ژست دست و سه سطح پس‌زمینه همگی دوربین یا حالت همان صحنه را تغییر می‌دهند و WebGL تازه‌ای نمی‌سازند.</p></div>
        <div className="assistant-tracking-note"><strong>نگاه بدون باز-render React</strong><p>حالت page سر و چشم‌ها را به نشانگر متصل می‌کند؛ local فقط داخل قاب فعال است و رویدادهای اشاره در هر فریم یک‌بار پردازش می‌شوند.</p></div>
        <div className="assistant-avatar-sizes"><strong>نوار مرجع ایستا</strong><div>{avatarSizes.map((size) => <span key={size}><SmartAssistantAvatar size={size} emotion={emotion} /><small>{size}</small></span>)}</div><p>تمام اندازه‌های ۳۲ تا ۹۶ پیکسل از نسخهٔ ایستای بهینه استفاده می‌کنند و هیچ زمینهٔ WebGL اضافه‌ای نمی‌سازند.</p></div>
      </section>
    </div>
  );
}
