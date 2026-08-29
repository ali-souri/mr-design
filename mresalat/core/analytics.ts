export const analyticsEventNames = [
  'assistant_opened', 'prompt_submitted', 'quick_action_selected', 'source_opened',
  'service_cta_clicked', 'clarification_requested', 'handoff_started',
  'action_previewed', 'action_confirmed', 'step_up_started', 'journey_completed',
  'answer_positive_feedback', 'answer_negative_feedback',
  'mbazar_order_opened', 'mbazar_order_support_started',
  'mbazar_favorite_added', 'mbazar_favorite_removed',
  'mbazar_address_added', 'mbazar_address_updated',
  'mbazar_review_started', 'mbazar_review_submitted',
  'mbazar_seller_opened', 'mbazar_support_case_created',
  'segment_selected', 'segment_landing_opened', 'segment_procedure_started',
  'identity_verification_started', 'otp_submitted', 'youth_child_lookup_started',
  'organization_owner_add_started', 'request_status_opened',
  'segment_ai_query_submitted', 'segment_ai_result_opened',
  'individual_journey_opened', 'youth_goal_opened', 'youth_reward_opened',
  'organization_program_opened', 'organization_personnel_opened', 'organization_report_opened',
  'mascot_greeting_shown', 'mascot_assistant_answered',
  'context_switch_opened', 'context_switched', 'child_context_selected',
  'approval_request_opened', 'approval_request_approved', 'approval_request_rejected',
  'permission_blocked_action', 'cross_service_journey_opened',
  'organization_credit_allocation_started', 'organization_employee_opened',
  'parent_child_opened', 'context_ai_clarification_requested',
] as const;

export type AnalyticsEventName = typeof analyticsEventNames[number];

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  surface: 'home' | 'service' | 'seller' | 'rag' | 'secure' | 'showcase' | 'marketplace' | 'segment';
  entityId?: string;
  riskLevel?: 0 | 1 | 2 | 3;
  metadata?: Record<string, string | number | boolean>;
};

export function trackEvent(payload: AnalyticsPayload) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<AnalyticsPayload>('mresalat:analytics', { detail: payload }));
  }
}
