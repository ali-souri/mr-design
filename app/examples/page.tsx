import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { ProductGallery } from '@/mresalat/examples/product/ProductGallery';

export const metadata: Metadata = { title: 'نمونه‌های خدمات واقعی ام‌رسالت' };

export default function ExamplesPage() {
  return (
    <AppShell active="examples">
      <ProductGallery />
    </AppShell>
  );
}
