'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SmartAssistant3D, type AssistantCharacterMode, type AssistantEmotion } from '@/mresalat/ai/SmartAssistant3D';
import { trackEvent } from '@/mresalat/core/analytics';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import type { SegmentSlug } from './experience-data';
import { answerSegmentQuestion, segmentPrompts, type SegmentAssistantResponse, type SegmentPrompt } from './phase-two-data';

export type SegmentAIEntryProps = {
  segment: SegmentSlug;
  suggestions?: SegmentPrompt[];
  assistantMode?: 'compact' | 'featured';
  mascotMode?: AssistantCharacterMode | 'none';
  title?: string;
  placeholder?: string;
  greeting?: boolean;
};

const sourceLabels: Record<SegmentAssistantResponse['sourceType'], string> = {
  official: 'راهنمای رسمی',
  live: 'وضعیت نمایشی',
  'ai-explanation': 'توضیح دستیار',
};

const resultLabels = {
  service: 'خدمت پیشنهادی',
  journey: 'مسیر مرتبط',
  status: 'مشاهده وضعیت',
  handoff: 'ارتباط با راهنما',
} as const;

export function SegmentAIEntry({
  segment,
  suggestions = segmentPrompts[segment],
  assistantMode = 'compact',
  mascotMode = 'portrait',
  title,
  placeholder,
  greeting = false,
}: SegmentAIEntryProps) {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<SegmentAssistantResponse | null>(null);
  const [emotion, setEmotion] = useState<AssistantEmotion>(greeting ? 'greeting' : 'idle');
  const [thinking, setThinking] = useState(false);
  const timer = useRef<number | null>(null);
  const resultTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!greeting) return;
    trackEvent({ event: 'mascot_greeting_shown', surface: 'segment', entityId: segment });
    const waveTimer = window.setTimeout(() => setEmotion('idle'), 2600);
    return () => window.clearTimeout(waveTimer);
  }, [greeting, segment]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
    if (resultTimer.current) window.clearTimeout(resultTimer.current);
  }, []);

  const submitQuestion = (question: string) => {
    const clean = question.trim();
    if (!clean || thinking) return;
    if (timer.current) window.clearTimeout(timer.current);
    if (resultTimer.current) window.clearTimeout(resultTimer.current);
    setQuery(clean);
    setAnswer(null);
    setThinking(true);
    setEmotion('thinking');
    trackEvent({ event: 'segment_ai_query_submitted', surface: 'segment', entityId: segment, metadata: { queryLength: clean.length } });
    timer.current = window.setTimeout(() => {
      const next = answerSegmentQuestion(segment, clean);
      setAnswer(next);
      setThinking(false);
      setEmotion(next.emotion === 'uncertain' || next.emotion === 'warning' || next.emotion === 'handoff' ? next.emotion : 'explaining');
      trackEvent({ event: 'mascot_assistant_answered', surface: 'segment', entityId: segment, metadata: { emotion: next.emotion, resultCount: next.results.length } });
      if (!['uncertain', 'warning', 'handoff'].includes(next.emotion)) {
        resultTimer.current = window.setTimeout(() => setEmotion(next.emotion), 1150);
      }
    }, 680);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    submitQuestion(query);
  };

  const chooseSuggestion = (prompt: SegmentPrompt) => {
    setQuery(prompt.query);
    submitQuestion(prompt.query);
  };

  const openResult = (type: string, href: string) => {
    setEmotion(type === 'handoff' ? 'handoff' : 'happy');
    trackEvent({ event: 'segment_ai_result_opened', surface: 'segment', entityId: segment, metadata: { resultType: type, href } });
  };

  const defaultTitle = segment === 'individual'
    ? 'چه کاری می‌خواهید انجام دهید؟'
    : segment === 'under-18'
      ? 'چه چیزی می‌خواهی انجام بدهی؟'
      : 'برای سازمان چه کاری می‌خواهید انجام دهید؟';

  return (
    <section className={`segment-ai-entry ai-entry-${assistantMode} ai-entry-${segment}`} aria-labelledby={`segment-ai-${segment}`}>
      {mascotMode !== 'none' && (
        <div className="segment-ai-mascot" aria-hidden="true">
          <SmartAssistant3D emotion={emotion} mode={mascotMode} />
        </div>
      )}
      <div className="segment-ai-content">
        <header>
          <span className="segment-ai-kicker"><MResalatIcon name="assistant" size={16} />دستیار راه‌یاب ام‌رسالت</span>
          <h1 id={`segment-ai-${segment}`}>{title ?? defaultTitle}</h1>
          <p>سؤال را به فارسی بنویسید؛ پاسخ این نسخه محدود، شفاف و کاملاً نمایشی است.</p>
        </header>
        <form className="segment-ai-composer" onSubmit={submit} aria-busy={thinking}>
          <label className="sr-only" htmlFor={`segment-question-${segment}`}>سؤال فارسی برای دستیار {defaultTitle}</label>
          <input
            ref={inputRef}
            id={`segment-question-${segment}`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submitQuestion(query); } }}
            onFocus={() => !thinking && setEmotion('listening')}
            onBlur={() => !thinking && !answer && setEmotion('idle')}
            placeholder={placeholder ?? (segment === 'individual' ? 'مثلاً: برای گرفتن وام باید از کجا شروع کنم؟' : segment === 'under-18' ? 'مثلاً: چطور برای خرید دوچرخه پس‌انداز کنم؟' : 'مثلاً: چطور برای پرسنل اعتبار خرید تعریف کنم؟')}
            autoComplete="off"
            dir="rtl"
          />
          <button className="segment-ai-voice" type="button" aria-label="ورودی صوتی در نسخه نمایشی فعال نیست" onClick={() => inputRef.current?.focus()} title="ورودی صوتی نمایشی">
            <MResalatIcon name="voice" size={20} />
          </button>
          <button className="segment-ai-send" type="submit" disabled={!query.trim() || thinking} aria-label={thinking ? 'دستیار در حال فکر است' : 'ارسال سؤال'}>
            {thinking ? <span className="segment-ai-spinner" aria-hidden="true" /> : <MResalatIcon name="next" size={20} />}
          </button>
        </form>
        <div className="segment-ai-suggestions" aria-label="پرسش‌های پیشنهادی">
          <span>پیشنهاد:</span>
          {suggestions.map((prompt) => <button type="button" onClick={() => chooseSuggestion(prompt)} key={prompt.label}>{prompt.label}</button>)}
        </div>
        <div className="segment-ai-response" aria-live="polite" aria-atomic="true">
          {thinking && <div className="segment-ai-thinking"><span><i /><i /><i /></span><strong>دارم پاسخ کوتاه و مرتبط را آماده می‌کنم…</strong></div>}
          {answer && <div className={`segment-ai-answer answer-${answer.emotion}`}>
            <header><span><MResalatIcon name={answer.emotion === 'uncertain' ? 'help' : answer.emotion === 'warning' ? 'warning' : 'assistant'} size={20} /></span><div><small>{sourceLabels[answer.sourceType]}</small><strong>{answer.emotion === 'uncertain' ? 'برای پاسخ دقیق‌تر' : 'پاسخ دستیار'}</strong></div></header>
            <p>{answer.answer}</p>
            <div className="segment-ai-results">
              {answer.results.map((result, index) => {
                if (result.type === 'answer') return <span className="segment-ai-note" key={`${result.type}-${index}`}><MResalatIcon name="security" size={16} />{result.text}</span>;
                if (result.type === 'clarify') return <button className="segment-ai-clarify" type="button" onClick={() => { setQuery(result.question); inputRef.current?.focus(); setEmotion('listening'); }} key={`${result.type}-${index}`}><MResalatIcon name="help" size={16} />{result.question}</button>;
                return <a href={result.href} onClick={() => openResult(result.type, result.href)} key={`${result.type}-${index}`}><small>{resultLabels[result.type]}</small><strong>{result.title}</strong><MResalatIcon name="next" size={16} /></a>;
              })}
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
}
