'use client';

import { useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export function CodeExample({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return <details className="code-example"><summary><MResalatIcon name="code" size={16} />کد نمونه: {title}<MResalatIcon name="down" size={16} /></summary><div className="code-example-panel"><button type="button" onClick={copy}><MResalatIcon name={copied ? 'success' : 'copy'} size={16} />{copied ? 'کپی شد' : 'کپی کد'}</button><pre dir="ltr"><code>{code}</code></pre></div></details>;
}
