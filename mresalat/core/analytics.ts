export type AnalyticsEventName =
  | 'assistant_opened' | 'prompt_submitted' | 'quick_action_selected' | 'source_opened'
  | 'service_cta_clicked' | 'clarification_requested' | 'handoff_started'
  | 'action_previewed' | 'action_confirmed' | 'step_up_started' | 'journey_completed'
  | 'answer_positive_feedback' | 'answer_negative_feedback';

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  surface: 'home' | 'service' | 'seller' | 'rag' | 'secure' | 'showcase';
  entityId?: string;
  riskLevel?: 0 | 1 | 2 | 3;
  metadata?: Record<string, string | number | boolean>;
};

export function trackEvent(payload: AnalyticsPayload) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<AnalyticsPayload>('mresalat:analytics', { detail: payload }));
  }
}
