import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'MResalat System',
    template: '%s | MResalat System',
  },
  description: 'تجربه هوشمند و یکپارچه خدمات ام‌رسالت',
  icons: { icon: '/brand/mresalat-logo.svg' },
};

const themeScript = `(function(){try{var p=localStorage.getItem('mresalat-theme')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
