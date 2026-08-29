'use client';

import { useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export type CodeExampleProps = {
  title: string;
  code: string;
  language?: string;
  filename?: string;
  description?: string;
  defaultOpen?: boolean;
};

export function CodeExample({ title, code, language, filename, description, defaultOpen = false }: CodeExampleProps) {
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
  return (
    <details className="code-example" open={defaultOpen || undefined}>
      <summary><MResalatIcon name="code" size={16} />کد نمونه: {title}<MResalatIcon name="down" size={16} /></summary>
      {description && <p className="code-example-description">{description}</p>}
      <div className="code-example-panel">
        <div className="code-example-toolbar">
          <div className="code-example-meta">
            {language && <span>{language}</span>}
            {filename && <code>{filename}</code>}
          </div>
          <button className="code-example-copy" type="button" onClick={copy}>
            <MResalatIcon name={copied ? 'success' : 'copy'} size={16} />
            {copied ? 'کپی شد' : 'کپی کد'}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'کد کپی شد' : ''}</span>
        </div>
        <pre dir="ltr"><code>{code}</code></pre>
      </div>
    </details>
  );
}
