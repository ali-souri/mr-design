'use client';

import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { ApprovalRequestCard, CrossServiceContextMarker, NextBestAction, PermissionState } from './RelationshipComponents';
import { children, employeeBenefit } from './fixtures';
import { UserContextSwitcher } from './UserContextSwitcher';

const states = ['allowed', 'view-only', 'approval-required', 'parent-approval-required', 'organization-approval-required', 'step-up-auth-required', 'unavailable'] as const;
const matrix = [
  ['مشاهده داده خود', 'بله', 'بله', 'بله', 'بله', 'بله'],
  ['مشاهده هدف فرزند', 'خیر', 'بله', 'هدف خود', 'خیر', 'خیر'],
  ['تأیید پاداش فرزند', 'خیر', 'بله', 'درخواست', 'خیر', 'خیر'],
  ['مشاهده مزایای خود', 'خیر', 'خیر', 'خیر', 'بله', 'نمای کلی'],
  ['تخصیص اعتبار', 'خیر', 'خیر', 'خیر', 'خیر', 'بله'],
  ['مدیریت محصولات فروشنده', 'خیر', 'خیر', 'خیر', 'خیر', 'خیر'],
] as const;

export function PhaseThreeShowcase() {
  return <div className="phase-three-showcase">
    <section><h3>UserContextSwitcher</h3><p>همان هویت، زمینه‌های معتبر متفاوت؛ نسخه موبایل به شیت پایین صفحه تبدیل می‌شود.</p><div className="showcase-context-switcher"><UserContextSwitcher /></div></section>
    <section><h3>PermissionState variants</h3><div className="showcase-permission-grid">{states.map((state) => <PermissionState state={state} key={state} />)}</div></section>
    <section><h3>ApprovalRequestCard</h3><ApprovalRequestCard id="showcase-approval" title="پاداش مرتب‌کردن فضای مطالعه" source="درخواست از فضای نوجوان" childName="آریا" impact="افزودن ۱۲۰ امتیاز نمایشی" /></section>
    <section><h3>NextBestAction + context marker</h3><div className="showcase-action-stack"><NextBestAction icon="assessment" title="تأیید پاداش آریا" detail="درخواست و اثر آن آماده مرور است." href="/segments/parent/approvals" actionLabel="مرور" tone="warning" /><CrossServiceContextMarker text="از هدف پس‌انداز آریا: دوچرخه" /></div></section>
    <section><h3>Parent ↔ Youth</h3><div className="showcase-linked-pair"><article><span>نمای والد</span><header><b>{children[0].avatarLetter}</b><div><small>هدف فعال آریا</small><strong>{children[0].goal.title}</strong></div></header><PermissionState state="parent-approval-required" detail="پاداش نیازمند تصمیم والد است." /></article><article><span>نمای نوجوان</span><header><b>{children[0].avatarLetter}</b><div><small>هدف من</small><strong>{children[0].goal.title}</strong></div></header><PermissionState state="approval-required" detail="پاداش در انتظار تأیید والد است؛ لازم نیست کاری انجام بدهی." /></article></div></section>
    <section><h3>Manager ↔ Employee program</h3><div className="showcase-linked-pair organization"><article><span>نمای مدیر</span><header><MResalatIcon name="organization" size={24} /><div><small>برنامه شرکت نمونه</small><strong>{employeeBenefit.title}</strong></div></header><p>۱۸۶ نفر واجد شرایط · ۳ تخصیص نیازمند بررسی</p></article><article><span>نمای کارمند</span><header><MResalatIcon name="employee" size={24} /><div><small>مزیت من</small><strong>{employeeBenefit.title}</strong></div></header><p>مانده شخصی: ۱۱٫۶ میلیون تومان</p></article></div></section>
    <section className="permission-matrix"><h3>ماتریس دسترسی توسعه‌دهنده</h3><div><table><thead><tr><th>اقدام</th><th>شخصی</th><th>والد</th><th>نوجوان</th><th>پرسنل</th><th>مدیر</th></tr></thead><tbody>{matrix.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
    <details className="phase-three-code-view"><summary>مشاهده نمونه کد</summary><pre><code>{`const permissions = getContextPermissions(context.type, relationships)\n\n<UserContextSwitcher />\n<PermissionState state="parent-approval-required" />\n<NextBestAction title="تأیید پاداش آریا" />`}</code></pre></details>
  </div>;
}

