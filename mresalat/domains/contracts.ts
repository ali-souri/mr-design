export type SourceKind = 'official-knowledge' | 'live-data';

export type AssistantSource = {
  id: string;
  title: string;
  section?: string;
  version?: string;
  updatedAt?: string;
  kind: SourceKind;
  excerpt?: string;
};

export type JourneyStep = {
  id: string;
  title: string;
  description?: string;
  status?: 'upcoming' | 'current' | 'completed';
};

export type ServiceJourney = {
  serviceCode: string;
  title: string;
  summary: string;
  benefits: string[];
  requirements: string[];
  documents: string[];
  steps: JourneyStep[];
  faqs: { question: string; answer: string }[];
  source: AssistantSource;
};

export type RiskLevel = 0 | 1 | 2 | 3;

export type SecureAction = {
  id: string;
  riskLevel: RiskLevel;
  title: string;
  summary: string;
  requiresConfirmation: boolean;
  requiresStepUpAuth: boolean;
  maskedResource: string;
};

export const riskLevelLabels: Record<RiskLevel, string> = {
  0: 'L0 · دانش عمومی',
  1: 'L1 · مشاهده احراز‌شده',
  2: 'L2 · اقدام کنترل‌شده',
  3: 'L3 · اقدام حساس',
};
