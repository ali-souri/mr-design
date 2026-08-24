import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SmartAssistant3D, type AssistantEmotion } from '@/mresalat/ai/SmartAssistant3D';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

const states: AssistantEmotion[] = ['idle', 'greeting', 'listening', 'thinking', 'explaining', 'happy', 'warning', 'uncertain', 'handoff'];
const labels: Record<AssistantEmotion, string> = { idle: 'آرام', greeting: 'سلام و خوش‌آمد', listening: 'در حال شنیدن', thinking: 'در حال فکر', explaining: 'در حال توضیح', happy: 'خوشحال', warning: 'هشدار', uncertain: 'نامطمئن', handoff: 'ارجاع به کارشناس' };

export function generateStaticParams() {
  return states.map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  return { title: `Mascot QA · ${state}`, description: 'بازبینی مستقل حالت ماسکات ام‌رسالت با پس‌زمینه شفاف و متن HTML.' };
}

export default async function MascotStateQa({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  if (!states.includes(state as AssistantEmotion)) notFound();
  const emotion = state as AssistantEmotion;
  return <AppShell active="system"><section className="mascot-state-qa"><header><a href="/qa"><MResalatIcon name="previous" size={16} />بازگشت به QA</a><span className="eyebrow">Mascot state testing</span><h1>{labels[emotion]}</h1><p>متن، عنوان و توضیح این صفحه HTML دسترس‌پذیر است؛ بوم سه‌بعدی فقط نمایش بصری شخصیت را برعهده دارد.</p></header><div className="mascot-state-surfaces"><article className="mascot-surface-gradient"><SmartAssistant3D emotion={emotion} mode="complete" /><strong>سطح گرادیانی</strong></article><article className="mascot-surface-dark"><SmartAssistant3D emotion={emotion} mode="portrait" /><strong>سطح تیره</strong></article></div><nav aria-label="حالت‌های ماسکات">{states.map((item) => <a className={item === emotion ? 'active' : ''} aria-current={item === emotion ? 'page' : undefined} href={`/qa/mascot/${item}`} key={item}>{labels[item]}</a>)}</nav></section></AppShell>;
}
