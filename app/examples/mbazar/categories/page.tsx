import type { Metadata } from 'next';
import { MBazarCategoriesPage } from '@/mresalat/mbazar/MBazarComponents';

export const metadata: Metadata = { title: 'دسته‌بندی‌های ام‌بازار' };

export default function CategoriesPage() {
  return <MBazarCategoriesPage />;
}
