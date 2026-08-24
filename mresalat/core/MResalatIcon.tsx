import {
  ArrowLeft, ArrowRight, BadgeDollarSign, Baby, Bell, BookOpenCheck, BriefcaseBusiness,
  Building2, CalendarDays, ChartNoAxesCombined, ChevronDown, CircleCheck, CircleHelp,
  CircleX, ClipboardCheck, Clock3, CreditCard, FileSearch, Gift, GraduationCap,
  Code2, Copy, Grid3X3, HandCoins, HeartHandshake, HeartPulse, Home, Landmark, LifeBuoy, LockKeyhole, Menu, MessageCircleMore,
  MonitorCog, Moon, Package, PanelsTopLeft, Plus, Search, ShieldCheck, ShoppingBag, Sparkles,
  Settings, Stethoscope, Store, Sun, Target, TriangleAlert, UserPlus, UserRound, UsersRound, WalletCards,
  MapPin, Mic, Heart, Share2, SlidersHorizontal, ArrowUpDown, ShoppingCart, X, Eye, Trash2,
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
  profile: UserRound,
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
  code: Code2,
  copy: Copy,
  grid: Grid3X3,
  settings: Settings,
  bank: Landmark,
  examples: PanelsTopLeft,
  insurance: ShieldCheck,
  advocacy: HeartHandshake,
  location: MapPin,
  voice: Mic,
  favorite: Heart,
  share: Share2,
  filters: SlidersHorizontal,
  sort: ArrowUpDown,
  cart: ShoppingCart,
  close: X,
  view: Eye,
  remove: Trash2,
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
  return <Icon data-mresalat-icon={name} aria-hidden={label ? undefined : true} aria-label={label} className={className} size={size} strokeWidth={strokeWidth} />;
}
