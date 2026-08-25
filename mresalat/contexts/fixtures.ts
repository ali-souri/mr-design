import type { ChildFixture, CrossServiceJourney, DemoUserFixture, HomePriorityItem, Permission, UserContext, UserRelationship } from './types';

const basePermissions: Permission[] = ['view:self'];

export const demoRelationships: UserRelationship[] = [
  { id: 'rel-parent-arya', type: 'parent-child', parentId: 'person-demo', childId: 'arya', authority: 'manage' },
  { id: 'rel-parent-sara', type: 'parent-child', parentId: 'person-demo', childId: 'sara', authority: 'view' },
  { id: 'rel-employee-sampleco', type: 'organization-member', organizationId: 'sample-co', employeeId: 'emp-demo', role: 'employee' },
  { id: 'rel-manager-sampleco', type: 'organization-member', organizationId: 'sample-co', employeeId: 'manager-demo', role: 'manager' },
  { id: 'rel-seller-booth', type: 'seller-owner', sellerId: 'booth-demo', personId: 'person-demo', role: 'owner' },
];

export function getContextPermissions(type: UserContext['type'], relationships: UserRelationship[], relatedEntityId?: string): Permission[] {
  const permissions = new Set<Permission>(basePermissions);
  if (type === 'parent') {
    const relations = relationships.filter((item) => item.type === 'parent-child');
    if (relations.length) permissions.add('view:child');
    if (relations.some((item) => item.type === 'parent-child' && item.authority === 'manage')) {
      ['manage:child-goals', 'view:child-activity', 'manage:child-allowance', 'approve:child-request'].forEach((item) => permissions.add(item as Permission));
    }
  }
  if (type === 'youth') permissions.add('view:child');
  if (type === 'organization-employee' && relationships.some((item) => item.type === 'organization-member' && item.role === 'employee' && (!relatedEntityId || item.organizationId === relatedEntityId))) permissions.add('view:employee-benefits');
  if (type === 'organization-manager' && relationships.some((item) => item.type === 'organization-member' && item.role === 'manager' && (!relatedEntityId || item.organizationId === relatedEntityId))) {
    ['manage:organization-benefits', 'view:organization-reports', 'view:organization-personnel', 'allocate:organization-credit'].forEach((item) => permissions.add(item as Permission));
  }
  if (type === 'seller' && relationships.some((item) => item.type === 'seller-owner')) {
    permissions.add('manage:seller-products');
    permissions.add('view:seller-orders');
  }
  return [...permissions];
}

function context(input: Omit<UserContext, 'permissions'>, relationships = demoRelationships): UserContext {
  return { ...input, permissions: getContextPermissions(input.type, relationships, input.relatedEntityId) };
}

export const multiRoleUser: DemoUserFixture = {
  id: 'person-demo',
  nameFa: 'حسین محمدی',
  defaultContextId: 'ctx-personal',
  relationships: demoRelationships.filter((item) => item.id !== 'rel-manager-sampleco'),
  contexts: [
    context({ id: 'ctx-personal', type: 'personal', titleFa: 'حساب شخصی', subtitleFa: 'برای خودم', defaultHome: '/segments/individual/home', icon: 'profile' }),
    context({ id: 'ctx-parent', type: 'parent', titleFa: 'والد', subtitleFa: 'آریا و سارا', relatedEntityId: 'family-demo', defaultHome: '/segments/parent/home', icon: 'parent' }),
    context({ id: 'ctx-employee', type: 'organization-employee', titleFa: 'پرسنل سازمان', subtitleFa: 'شرکت نمونه', relatedEntityId: 'sample-co', defaultHome: '/segments/organization-employee/home', icon: 'employee' }),
    context({ id: 'ctx-seller', type: 'seller', titleFa: 'عرضه‌کننده', subtitleFa: 'غرفه من', relatedEntityId: 'booth-demo', defaultHome: '/seller', icon: 'seller' }),
  ],
};

export const managerUser: DemoUserFixture = {
  id: 'manager-demo',
  nameFa: 'نرگس صادقی',
  defaultContextId: 'ctx-manager-personal',
  relationships: demoRelationships.filter((item) => item.id === 'rel-manager-sampleco'),
  contexts: [
    context({ id: 'ctx-manager-personal', type: 'personal', titleFa: 'حساب شخصی', subtitleFa: 'برای خودم', defaultHome: '/segments/individual/home', icon: 'profile' }),
    context({ id: 'ctx-manager', type: 'organization-manager', titleFa: 'مدیر سازمان', subtitleFa: 'شرکت نمونه', relatedEntityId: 'sample-co', defaultHome: '/segments/organization/home', icon: 'organization' }),
  ],
};

export const demoUsers = { multi: multiRoleUser, manager: managerUser } as const;

export const children: ChildFixture[] = [
  { id: 'arya', nameFa: 'آریا', ageFa: '۱۴ ساله', avatarLetter: 'آ', accent: 'violet', goal: { id: 'bike', title: 'دوچرخه', saved: 7_200_000, target: 12_000_000, progress: 60, icon: 'goal' }, allowance: { amount: 750_000, frequencyFa: 'ماهانه', nextDateFa: 'اول شهریور', requestState: 'waiting-parent' } },
  { id: 'sara', nameFa: 'سارا', ageFa: '۱۱ ساله', avatarLetter: 'س', accent: 'cyan', goal: { id: 'course', title: 'دوره نقاشی', saved: 900_000, target: 3_000_000, progress: 30, icon: 'education' }, allowance: { amount: 500_000, frequencyFa: 'ماهانه', nextDateFa: 'اول شهریور', requestState: 'none' } },
];

export const childActivity = {
  arya: [
    { id: 'a1', title: 'پس‌انداز برای دوچرخه', detail: 'مبلغ برای والد قابل مشاهده', amount: '+۴۵۰٬۰۰۰', visibility: 'visible' as const, date: 'امروز' },
    { id: 'a2', title: 'خرید در دسته کتاب', detail: 'نام فروشگاه طبق تنظیمات حریم خصوصی پنهان است', amount: '−۱۸۰٬۰۰۰', visibility: 'masked' as const, date: 'دیروز' },
    { id: 'a3', title: 'فعالیت روزمره', detail: 'فقط دسته فعالیت برای والد نمایش داده می‌شود', amount: 'پنهان', visibility: 'category' as const, date: '۲۲ مرداد' },
  ],
  sara: [
    { id: 's1', title: 'پس‌انداز برای دوره نقاشی', detail: 'مبلغ برای والد قابل مشاهده', amount: '+۲۰۰٬۰۰۰', visibility: 'visible' as const, date: 'امروز' },
    { id: 's2', title: 'خرید آموزشی', detail: 'فقط دسته فعالیت برای والد نمایش داده می‌شود', amount: 'پنهان', visibility: 'category' as const, date: '۲۰ مرداد' },
  ],
};

export const parentApprovals = [
  { id: 'approval-reward', title: 'پاداش مرتب‌کردن فضای مطالعه', source: 'درخواست از فضای نوجوان', childId: 'arya', impact: 'افزودن ۱۲۰ امتیاز نمایشی به پاداش‌های آریا', kind: 'reward' as const },
  { id: 'approval-allowance', title: 'تغییر زمان‌بندی پول توجیبی', source: 'درخواست آریا', childId: 'arya', impact: 'تغییر از ماهانه به دوهفته‌ای؛ بدون جابه‌جایی پول واقعی', kind: 'allowance' as const },
];

export const employeeBenefit = { programId: 'benefit-demo', title: 'اعتبار خرید کارکنان', organization: 'شرکت نمونه', allocated: 18_000_000, used: 6_400_000, remaining: 11_600_000, expiresInDays: 12, accent: 'cyan' as const };

export const organizationApprovalStates = [
  { id: 'alloc-01', state: 'waiting-manager', label: 'در انتظار بررسی مدیر', note: 'مدیر سازمان باید جزئیات تخصیص را مرور کند.' },
  { id: 'alloc-02', state: 'waiting-policy-check', label: 'در حال بررسی ضوابط', note: 'بررسی نمایشی ضوابط برنامه در جریان است.' },
  { id: 'alloc-03', state: 'approved', label: 'تأیید شده', note: 'نتیجه نمایشی آماده مشاهده است.' },
  { id: 'alloc-04', state: 'rejected', label: 'نیازمند اصلاح', note: 'مبلغ یا جمعیت انتخابی باید اصلاح شود.' },
  { id: 'alloc-05', state: 'expired', label: 'مهلت پایان یافته', note: 'برای ادامه، یک درخواست تازه ایجاد کنید.' },
] as const;

export const crossServiceJourneys: CrossServiceJourney[] = [
  { id: 'youth-bike-market', title: 'هدف دوچرخه تا ام‌بازار', sourceService: 'پس‌انداز نوجوان', targetService: 'ام‌بازار', contextType: 'parent', currentStep: 'مقایسه گزینه‌ها', relatedEntityId: 'arya', status: 'active', markerFa: 'از هدف پس‌انداز آریا: دوچرخه', targetHref: '/examples/mbazar/search?q=دوچرخه&source=youth-goal&goal=bike&child=arya' },
  { id: 'employee-credit-market', title: 'اعتبار سازمانی تا ام‌بازار', sourceService: 'مزایای سازمانی', targetService: 'ام‌بازار', contextType: 'organization-employee', currentStep: 'دیدن کالاهای واجد شرایط', relatedEntityId: 'sample-co', status: 'active', markerFa: 'با اعتبار سازمانی شرکت نمونه', targetHref: '/examples/mbazar/search?source=organization-credit&program=benefit-demo' },
  { id: 'parent-course-learning', title: 'دوره تأییدشده تا ام‌آموزش', sourceService: 'فضای والد', targetService: 'ام‌آموزش', contextType: 'parent', currentStep: 'شروع دوره', relatedEntityId: 'sara', status: 'waiting-approval', markerFa: 'برای یادگیری سارا', targetHref: '/segments/under-18/learning' },
];

export function sortHomePriorities<T>(items: HomePriorityItem<T>[]) {
  return [...items].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}

