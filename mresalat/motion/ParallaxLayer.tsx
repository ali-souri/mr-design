'use client';

import { useEffect, useRef } from 'react';

export function ParallaxLayer({ children, strength = 8, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - .5) * strength;
      node.style.setProperty('--parallax-x', `${x}px`);
      node.style.setProperty('--parallax-y', `${y}px`);
    };
    const reset = () => { node.style.setProperty('--parallax-x', '0px'); node.style.setProperty('--parallax-y', '0px'); };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', reset);
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset); };
  }, [strength]);

  return <div ref={ref} className={`parallax-layer ${className}`}>{children}</div>;
}
