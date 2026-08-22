import {
  ArrowLeft, ArrowRight, BadgeDollarSign, Baby, Bell, BookOpenCheck, BriefcaseBusiness,
  Building2, CalendarDays, ChartNoAxesCombined, ChevronDown, CircleCheck, CircleHelp,
  CircleX, ClipboardCheck, Clock3, CreditCard, FileSearch, Gift, GraduationCap,
  HandCoins, HeartPulse, Home, Landmark, LifeBuoy, LockKeyhole, Menu, MessageCircleMore,
  MonitorCog, Moon, Package, Plus, Search, ShieldCheck, ShoppingBag, Sparkles,
  Stethoscope, Store, Sun, Target, TriangleAlert, UserPlus, UsersRound, WalletCards,
  type LucideIcon,
} from 'lucide-react';

export const iconMap = {
  home: Home,
  assistant: Sparkles,
  membership: UserPlus,
  loan: Landmark,
  finance: WalletCards,
  seller: Store,
  product: Package,
  orders: ShoppingBag,
  settlement: BadgeDollarSign,
  reports: ChartNoAxesCombined,
  organization: Building2,
  employee: BriefcaseBusiness,
  family: UsersRound,
  parent: UsersRound,
  child: Baby,
  education: GraduationCap,
  health: HeartPulse,
  assessment: ClipboardCheck,
  messages: MessageCircleMore,
  support: LifeBuoy,
  security: ShieldCheck,
  card: CreditCard,
  alerts: Bell,
  evidence: FileSearch,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
  search: Search,
  next: ArrowLeft,
  previous: ArrowRight,
  down: ChevronDown,
  menu: Menu,
  themeDark: Moon,
  themeLight: Sun,
  themeSystem: MonitorCog,
  add: Plus,
  lock: LockKeyhole,
  help: CircleHelp,
  time: Clock3,
  goal: Target,
  reward: Gift,
  gift: Gift,
  learning: BookOpenCheck,
  calendar: CalendarDays,
  clinic: Stethoscope,
  credit: HandCoins,
} satisfies Record<string, LucideIcon>;

export type MResalatIconName = keyof typeof iconMap;
export const iconGalleryNames = Object.keys(iconMap) as MResalatIconName[];

export function MResalatIcon({ name, size = 20, strokeWidth = 1.8, className, label }: {
  name: MResalatIconName;
  size?: 16 | 20 | 24 | 32;
  strokeWidth?: number;
  className?: string;
  label?: string;
}) {
  const Icon = iconMap[name];
  return <Icon aria-hidden={label ? undefined : true} aria-label={label} className={className} size={size} strokeWidth={strokeWidth} />;
}
