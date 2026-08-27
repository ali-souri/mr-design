export type ServiceComponentDefinition = {
  name: string;
  family: 'catalog-core' | 'membership' | 'support' | 'marketplace' | 'learning' | 'finance' | 'contribution' | 'health' | 'insurance' | 'auxiliary' | 'rahyar' | 'banking' | 'communication';
  descriptionFa: string;
  states: readonly string[];
};

export const serviceComponentRegistry = {
  'service-surface': { name: 'ServiceSurface', family: 'catalog-core', descriptionFa: 'قاب استاندارد هر خدمت ممیزی‌شده', states: ['compact', 'detail', 'light', 'dark'] },
  'service-header': { name: 'ServiceHeader', family: 'catalog-core', descriptionFa: 'عنوان دوزبانه، فصل و سطح ریسک', states: ['FA primary', 'mixed direction'] },
  'status-badge': { name: 'ServiceStatusBadge', family: 'catalog-core', descriptionFa: 'وضعیت شواهد ممیزی همراه متن', states: ['six audit states'] },
  'safe-stop-notice': { name: 'SafeStopNotice', family: 'catalog-core', descriptionFa: 'مرز توقف روشن پیش از اقدام واقعی', states: ['L0', 'L1', 'L2', 'L3'] },
  'external-login-gate': { name: 'ExternalLoginGate', family: 'catalog-core', descriptionFa: 'دروازه ورود جداگانه بدون دریافت اطلاعات ورود', states: ['gated', 'authenticated elsewhere'] },
  'unavailable-state': { name: 'UnavailableServiceState', family: 'catalog-core', descriptionFa: 'وضعیت خطا یا دسترسی‌ناپذیری مشاهده‌شده', states: ['unavailable', '404 evidence'] },
  'sensitive-placeholder': { name: 'SensitiveDataPlaceholder', family: 'catalog-core', descriptionFa: 'جانگهدار امن برای داده شخصی و حساس', states: ['redacted', 'synthetic', 'read only'] },
  'filter-bar': { name: 'ServiceFilterBar', family: 'catalog-core', descriptionFa: 'فیلتر پوشش فصل، دامنه، وضعیت و ریسک', states: ['default', 'filtered', 'no results'] },
  'empty-state': { name: 'EmptyServiceState', family: 'catalog-core', descriptionFa: 'حالت خالی بازیابی‌پذیر', states: ['empty', 'filtered empty'] },
  'form-shell': { name: 'ServiceFormShell', family: 'catalog-core', descriptionFa: 'پوسته فرم نمایشی با راهنما و اعتبارسنجی امن', states: ['idle', 'help', 'error', 'safe stop'] },
  'action-summary': { name: 'ServiceActionSummary', family: 'catalog-core', descriptionFa: 'مرور اثر و مرز تأیید پیش از اقدام', states: ['read only', 'confirmation boundary'] },
  'membership-form': { name: 'MembershipFormSurface', family: 'membership', descriptionFa: 'ترکیب عضویت حقیقی، نوجوان و سازمان', states: ['external gate', 'under 18', 'organization'] },
  'membership-tracking': { name: 'MembershipTrackingSurface', family: 'membership', descriptionFa: 'پیگیری فقط‌خواندنی درخواست عضویت', states: ['authenticated', 'read only'] },
  'supporter-list': { name: 'SupporterListSurface', family: 'support', descriptionFa: 'فهرست و جستجوی حامیان با داده ساختگی', states: ['list', 'empty', 'search'] },
  'supporter-verification': { name: 'SupporterVerificationSurface', family: 'support', descriptionFa: 'فرم کنترل‌شده حامی و مجوز کاروکسب', states: ['form', 'upload placeholder', 'safe stop'] },
  'association-card': { name: 'AssociationCardSurface', family: 'support', descriptionFa: 'عضویت و کارت انجمن با شناسه پوشانده', states: ['gated', 'redacted', 'read only'] },
  'loan-gate': { name: 'ZeroFeeLoanSurface', family: 'support', descriptionFa: 'درخواست و پیگیری وام بدون کارمزد', states: ['OTP boundary', 'tracking', 'read only'] },
  'mbazar-existing': { name: 'MBazarExistingSurface', family: 'marketplace', descriptionFa: 'پیوند پوشش ممیزی به اجزای موجود ام‌بازار', states: ['existing route', 'safe checkout', 'public category'] },
  'provider-search': { name: 'ProviderSearchSurface', family: 'learning', descriptionFa: 'جستجو و فهرست عرضه‌کننده برای آموزش و سلامت', states: ['search', 'results', 'empty'] },
  'transaction-list': { name: 'TransactionListSurface', family: 'finance', descriptionFa: 'تراکنش و خرید فقط‌خواندنی با داده ساختگی', states: ['filtered', 'redacted', 'empty'] },
  'qr-privacy': { name: 'QrPrivacySurface', family: 'finance', descriptionFa: 'قاب QR امن بدون کد قابل استفاده', states: ['masked', 'share blocked'] },
  'credit-summary': { name: 'CreditSummarySurface', family: 'finance', descriptionFa: 'خلاصه اعتبار و بن بدون مانده واقعی', states: ['read only', 'synthetic'] },
  'credit-form': { name: 'CreditActionSurface', family: 'finance', descriptionFa: 'فرم برداشت یا اهدا با توقف پیش از تأیید', states: ['amount', 'recipient', 'confirmation boundary'] },
  'finance-dashboard': { name: 'FinanceDashboardSurface', family: 'finance', descriptionFa: 'ورودی اقساط و نسیه بدون تعهد مالی', states: ['entry', 'read only', 'safe stop'] },
  'contribution-history': { name: 'ContributionHistorySurface', family: 'contribution', descriptionFa: 'سوابق همیاری پوشانده و ساختگی', states: ['read only', 'filtered'] },
  'campaign-card': { name: 'CampaignContributionSurface', family: 'contribution', descriptionFa: 'معرفی پویش و مرز ورود مبلغ', states: ['entry', 'safe stop'] },
  'health-dashboard': { name: 'HealthDashboardSurface', family: 'health', descriptionFa: 'خلاصه عمومی و غیرکلینیکی سلامت', states: ['authenticated', 'synthetic', 'non clinical'] },
  'appointment-list': { name: 'AppointmentListSurface', family: 'health', descriptionFa: 'فهرست نوبت‌های کاملاً ساختگی', states: ['read only', 'empty'] },
  'medical-record-gate': { name: 'MedicalRecordGate', family: 'health', descriptionFa: 'دروازه پرونده پزشکی بدون محتوای بالینی', states: ['gated', 'no clinical content'] },
  'insurance-portal': { name: 'InsurancePortalSurface', family: 'insurance', descriptionFa: 'درگاه عمومی انواع بیمه', states: ['public', 'product list'] },
  'vehicle-quote-form': { name: 'VehicleInsuranceForm', family: 'insurance', descriptionFa: 'فرم مشترک استعلام وسیله نقلیه', states: ['third party', 'comprehensive', 'motorcycle', 'safe stop'] },
  'life-plan-selector': { name: 'LifePlanSelector', family: 'insurance', descriptionFa: 'انتخاب نمایشی طرح عمر بدون محاسبه حق بیمه', states: ['selector', 'safe stop'] },
  'service-entry-card': { name: 'AuxiliaryServiceEntry', family: 'auxiliary', descriptionFa: 'ورودی عمومی سامانه‌های مکمل', states: ['public', 'safe stop'] },
  'form-builder-entry': { name: 'FormBuilderEntry', family: 'auxiliary', descriptionFa: 'ورودی سازنده فرم بدون ذخیره یا انتشار', states: ['blank', 'template', 'safe stop'] },
  'rahyar-unavailable': { name: 'RahyarUnavailableEvidence', family: 'rahyar', descriptionFa: 'بازنمایی صریح خطای مشاهده‌شده رهیار', states: ['404', 'unavailable'] },
  'banking-hub': { name: 'VirtualCounterHub', family: 'banking', descriptionFa: 'هاب عمومی پیشخوان بانکی', states: ['public', 'gated destinations'] },
  'banking-request': { name: 'BankingRequestSurface', family: 'banking', descriptionFa: 'ورودی درخواست بانکی بدون ثبت نهایی', states: ['current account', 'card', 'loan', 'safe stop'] },
  'download-card': { name: 'DownloadInfoCard', family: 'banking', descriptionFa: 'کارت اطلاعات و دریافت نرم‌افزار', states: ['public', 'platform variants'] },
  'conversation-list': { name: 'ConversationListSurface', family: 'communication', descriptionFa: 'فهرست مکالمه پوشانده بدون افشای پیام', states: ['authenticated', 'redacted', 'empty'] },
  'message-gate': { name: 'MessageSafeStopGate', family: 'communication', descriptionFa: 'توقف پیش از ارسال پیام نمایندگی‌کننده', states: ['composer', 'send disabled'] },
  'advisor-entry': { name: 'AdvisorEntrySurface', family: 'communication', descriptionFa: 'ورودی عمومی مشاور با پیام نمایشی', states: ['public', 'safe stop'] },
  'search-entry': { name: 'GlobalSearchSurface', family: 'communication', descriptionFa: 'جستجوی عمومی خدمات', states: ['empty', 'results'] },
  'map-gate': { name: 'MapPermissionGate', family: 'communication', descriptionFa: 'دروازه مجوز مکان بدون دریافت مختصات', states: ['permission', 'denied', 'safe stop'] },
  'support-composer': { name: 'SupportComposerSurface', family: 'communication', descriptionFa: 'نوشتن پیام پشتیبانی بدون ارسال', states: ['draft', 'send disabled'] },
  'not-visible-state': { name: 'NotVisibleEvidenceState', family: 'communication', descriptionFa: 'ثبت صریح مسیر مشاهده‌نشده در حساب ممیزی', states: ['not visible'] },
} as const satisfies Record<string, ServiceComponentDefinition>;

export type ServiceComponentKey = keyof typeof serviceComponentRegistry;
