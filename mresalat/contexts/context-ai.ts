import type { AssistantEmotion } from '@/mresalat/ai/SmartAssistant3D';
import type { SegmentAssistantResponse, SegmentAIResult } from '@/mresalat/segments/phase-two-data';
import type { Permission, UserContextType } from './types';

type ContextAIInput = {
  contextType: UserContextType;
  question: string;
  permissions: Permission[];
  selectedChildName?: string;
  availableContextTypes: UserContextType[];
};

const normalize = (value: string) => value.trim().toLocaleLowerCase('fa-IR').replace(/ي/g, 'ی').replace(/ك/g, 'ک');
const response = (answer: string, emotion: AssistantEmotion, results: SegmentAIResult[], sourceType: SegmentAssistantResponse['sourceType'] = 'ai-explanation'): SegmentAssistantResponse => ({ answer, emotion, results, sourceType });

export function answerContextQuestion(input: ContextAIInput): SegmentAssistantResponse | null {
  const q = normalize(input.question);
  const credit = q.includes('اعتبار');
  const child = q.includes('فرزند') || q.includes('پول توجیبی') || q.includes('آریا') || q.includes('سارا');
  const allocation = q.includes('تخصیص') || q.includes('پرسنل') || q.includes('کارمند');

  if (child && input.contextType === 'personal' && input.availableContextTypes.includes('parent')) return response(
    'این کار در زمینه والد انجام می‌شود. بدون اجازه شما زمینه را تغییر نمی‌دهم.',
    'explaining',
    [{ type: 'context-switch', contextType: 'parent', title: 'رفتن به زمینه والد' }],
  );

  if (credit && input.contextType === 'personal') return response(
    'در زمینه حساب شخصی، اعتبارهای شخصی و مسیرهای مالی خودتان را بررسی می‌کنم. این مقدار با اعتبار سازمانی جداست.',
    'explaining',
    [
      { type: 'status', title: 'اعتبار شخصی نمایشی: در حال ارزیابی', href: '/segments/individual/journeys' },
      ...(input.availableContextTypes.includes('organization-employee') ? [{ type: 'context-switch' as const, contextType: 'organization-employee' as const, title: 'بررسی اعتبار سازمانی' }] : []),
    ],
    'live',
  );

  if (credit && input.contextType === 'organization-employee') return response(
    'در زمینه پرسنل شرکت نمونه، ۱۸ میلیون تومان اعتبار سازمانی تخصیص یافته و ۱۱٫۶ میلیون تومان آن باقی مانده است. این داده ساختگی است.',
    'happy',
    [
      { type: 'status', title: 'جزئیات مزایای من', href: '/segments/organization-employee/benefits' },
      { type: 'service', serviceId: 'mbazar', title: 'کالاهای قابل استفاده با اعتبار سازمانی', href: '/examples/mbazar/search?source=organization-credit&program=benefit-demo' },
    ],
    'live',
  );

  if ((credit || allocation) && input.contextType === 'organization-manager') return response(
    'در زمینه مدیر سازمان، اعتبار در سطح برنامه و تخصیص به پرسنل بررسی می‌شود: سه تخصیص نمونه نیازمند تأیید است.',
    'explaining',
    input.permissions.includes('allocate:organization-credit') ? [
      { type: 'status', title: 'مرور برنامه اعتباری', href: '/segments/organization/benefits' },
      { type: 'journey', journeyId: 'allocation', title: 'شروع تخصیص اعتبار', href: '/segments/organization/credit/allocate' },
    ] : [{ type: 'answer', text: 'تخصیص اعتبار فقط در زمینه مدیر سازمان در دسترس است.' }],
    'live',
  );

  if (credit && input.contextType === 'parent') return response(
    `در زمینه والد، «اعتبار من» می‌تواند مبهم باشد. منظورتان اعتبار شخصی خودتان است یا وضعیت خدمات ${input.selectedChildName ?? 'فرزندتان'}؟`,
    'uncertain',
    [
      { type: 'clarify', question: 'اعتبار شخصی خودم را می‌خواهم' },
      { type: 'status', title: `وضعیت خدمات ${input.selectedChildName ?? 'فرزند'}`, href: '/segments/parent/children' },
    ],
  );

  if ((q.includes('زیاد') || q.includes('تغییر')) && q.includes('توجیبی') && input.contextType === 'youth') return response(
    'تغییر مبلغ پول توجیبی نیاز به تأیید والد دارد. می‌توانی درخواستت را همراه با یک توضیح کوتاه برای والد بفرستی.',
    'explaining',
    [{ type: 'journey', journeyId: 'allowance-request', title: 'ارسال درخواست برای والد', href: '/segments/under-18/allowance' }],
  );

  if (q.includes('پول توجیبی') && input.contextType === 'parent') return response(
    `پول توجیبی ${input.selectedChildName ?? 'فرزند انتخاب‌شده'} ماهانه تنظیم شده است. تغییر زمان‌بندی در نسخه نمایشی ابتدا برای مرور شما آماده می‌شود.`,
    'explaining',
    [{ type: 'status', title: 'مرور پول توجیبی', href: '/segments/parent/child/arya/allowance' }],
    'live',
  );

  if (credit && input.availableContextTypes.includes('organization-employee') && input.contextType !== 'organization-employee') return response(
    'منظورتان اعتبار شخصی است یا اعتبار سازمانی شرکت نمونه؟',
    'uncertain',
    [
      { type: 'clarify', question: 'اعتبار شخصی' },
      { type: 'context-switch', contextType: 'organization-employee', title: 'اعتبار سازمانی' },
    ],
  );

  return null;
}

