import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'MResalat System',
    template: '%s | MResalat System',
  },
  description: 'تجربه هوشمند و یکپارچه خدمات ام‌رسالت',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
