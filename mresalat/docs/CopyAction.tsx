'use client';

import { useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';

export function CopyAction({ value, label = 'کپی', copiedLabel = 'کپی شد', className = '' }: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1700);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button className={`docs-copy-action ${className}`} type="button" onClick={copy} aria-label={`${label}: ${value}`}>
      <MResalatIcon name={copied ? 'success' : 'copy'} size={14} />
      <span>{copied ? copiedLabel : label}</span>
      <span className="sr-only" aria-live="polite">{copied ? copiedLabel : ''}</span>
    </button>
  );
}

export function CopyPageLink() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1700);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button className="docs-page-link" type="button" onClick={copy}>
      <MResalatIcon name={copied ? 'success' : 'copy'} size={16} />
      {copied ? 'پیوند کپی شد' : 'کپی پیوند صفحه'}
      <span className="sr-only" aria-live="polite">{copied ? 'پیوند صفحه کپی شد' : ''}</span>
    </button>
  );
}
