import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';

export type UserContextType =
  | 'personal'
  | 'parent'
  | 'youth'
  | 'organization-manager'
  | 'organization-employee'
  | 'seller';

export type Permission =
  | 'view:self'
  | 'view:child'
  | 'manage:child-goals'
  | 'view:child-activity'
  | 'manage:child-allowance'
  | 'approve:child-request'
  | 'view:employee-benefits'
  | 'manage:organization-benefits'
  | 'view:organization-reports'
  | 'view:organization-personnel'
  | 'allocate:organization-credit'
  | 'manage:seller-products'
  | 'view:seller-orders';

export type UserContext = {
  id: string;
  type: UserContextType;
  titleFa: string;
  subtitleFa?: string;
  relatedEntityId?: string;
  permissions: Permission[];
  defaultHome: string;
  icon: MResalatIconName;
};

export type UserRelationship =
  | { id: string; type: 'parent-child'; parentId: string; childId: string; authority: 'view' | 'manage' }
  | { id: string; type: 'organization-member'; organizationId: string; employeeId: string; role: 'manager' | 'employee' }
  | { id: string; type: 'seller-owner'; sellerId: string; personId: string; role: 'owner' | 'operator' };

export type PermissionStateType =
  | 'allowed'
  | 'view-only'
  | 'approval-required'
  | 'parent-approval-required'
  | 'organization-approval-required'
  | 'step-up-auth-required'
  | 'unavailable';

export type CrossServiceJourney = {
  id: string;
  title: string;
  sourceService: string;
  targetService: string;
  contextType: UserContextType;
  currentStep: string;
  relatedEntityId?: string;
  status: 'active' | 'waiting-approval' | 'completed' | 'expired';
  markerFa: string;
  targetHref: string;
};

export type HomePriorityItem<T = Record<string, unknown>> = {
  id: string;
  priority: number;
  type: 'approval' | 'journey' | 'warning' | 'service' | 'recommendation';
  componentData: T;
};

export type DemoUserFixture = {
  id: string;
  nameFa: string;
  contexts: UserContext[];
  relationships: UserRelationship[];
  defaultContextId: string;
};

export type ChildFixture = {
  id: string;
  nameFa: string;
  ageFa: string;
  avatarLetter: string;
  accent: 'violet' | 'cyan';
  goal: { id: string; title: string; saved: number; target: number; progress: number; icon: MResalatIconName };
  allowance: { amount: number; frequencyFa: string; nextDateFa: string; requestState: 'none' | 'waiting-parent' | 'approved' };
};

