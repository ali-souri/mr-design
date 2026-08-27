import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D';
import { assistantHandPoseLabels, type AssistantHandPose } from '@/mresalat/ai/mascot';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

const poses: AssistantHandPose[] = ['relaxed', 'open', 'wave', 'point', 'explain', 'caution', 'thinking', 'support', 'fist'];

export function HandPoseQa({ pose }: { pose: AssistantHandPose }) {
  return <AppShell active="system"><section className="mascot-state-qa"><header><a href="/qa"><MResalatIcon name="previous" size={16} />بازگشت به QA</a><span className="eyebrow">Articulated hand testing</span><h1>{assistantHandPoseLabels[pose]}</h1><p>این مسیر، شانه، آرنج، مچ، شست و چهار انگشت سه‌بندی را در یک preset ثابت برای بررسی مستقیم نمایش می‌دهد.</p></header><div className="mascot-state-surfaces"><article className="mascot-surface-gradient"><SmartAssistant3D emotion="idle" mode="complete" handPose={pose} gaze="none" transparent /><strong>نمای کامل rig</strong></article><article className="mascot-surface-dark"><SmartAssistant3D emotion="idle" mode="portrait" handPose={pose} gaze="none" transparent /><strong>برش پرتره</strong></article></div><nav aria-label="ژست‌های دست">{poses.map((item) => <a className={item === pose ? 'active' : ''} aria-current={item === pose ? 'page' : undefined} href={`/qa/mascot/hand/${item}`} key={item}>{assistantHandPoseLabels[item]}</a>)}</nav></section></AppShell>;
}
