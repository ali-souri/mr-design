import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D';
import { assistantEmotionLabels, type AssistantEmotion } from '@/mresalat/ai/mascot';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

const states: AssistantEmotion[] = ['greeting', 'idle', 'calm', 'listening', 'thinking', 'explaining', 'happy', 'warning', 'uncertain', 'handoff'];
const directStates = [...states, 'portrait'];

export function generateStaticParams() {
  return directStates.map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  return { title: `Mascot QA · ${state}`, description: 'بازبینی مستقل حالت ماسکات ام‌رسالت با پس‌زمینه شفاف و متن HTML.' };
}

export default async function MascotStateQa({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  if (!directStates.includes(state as AssistantEmotion | 'portrait')) notFound();
  const portrait = state === 'portrait';
  const emotion: AssistantEmotion = portrait ? 'idle' : state as AssistantEmotion;
  return <AppShell active="system"><section className="mascot-state-qa"><header><Link href="/qa"><MResalatIcon name="previous" size={16} />بازگشت به QA</Link><span className="eyebrow">Mascot state testing</span><h1>{portrait ? 'پرترهٔ ماسکات' : assistantEmotionLabels[emotion]}</h1><p>متن، عنوان و توضیح این صفحه HTML دسترس‌پذیر است؛ بوم سه‌بعدی فقط نمایش بصری شخصیت را برعهده دارد.</p></header><div className="mascot-state-surfaces"><article className="mascot-surface-gradient"><SmartAssistant3D emotion={emotion} mode={portrait ? 'portrait' : 'complete'} transparent /><strong>{portrait ? 'قاب پرتره' : 'سطح گرادیانی'}</strong></article><article className="mascot-surface-dark"><SmartAssistant3D emotion={emotion} mode="portrait" gaze="none" transparent /><strong>سطح تیره</strong></article></div><nav aria-label="حالت‌های ماسکات">{states.map((item) => <Link className={item === emotion && !portrait ? 'active' : ''} aria-current={item === emotion && !portrait ? 'page' : undefined} href={`/qa/mascot/${item}`} key={item}>{assistantEmotionLabels[item]}</Link>)}<Link className={portrait ? 'active' : ''} aria-current={portrait ? 'page' : undefined} href="/qa/mascot/portrait">پرتره</Link></nav></section></AppShell>;
}
