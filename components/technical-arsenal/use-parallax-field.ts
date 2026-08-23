'use client';

import { useEffect, useRef, type RefObject } from 'react';

interface ParallaxFieldOptions {
  enabled?: boolean;
  strength?: number;
}

export function useParallaxField(
  containerRef: RefObject<HTMLElement | null>,
  { enabled = true, strength = 1 }: ParallaxFieldOptions = {}
) {
  const motion = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = containerRef.current;
    if (!el) return;

    const apply = () => {
      const m = motion.current;
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      el.style.setProperty('--mx', `${m.x.toFixed(2)}px`);
      el.style.setProperty('--my', `${m.y.toFixed(2)}px`);

      const stillMoving =
        Math.abs(m.targetX - m.x) > 0.05 || Math.abs(m.targetY - m.y) > 0.05;

      if (stillMoving) {
        rafRef.current = requestAnimationFrame(apply);
      } else {
        rafRef.current = null;
      }
    };

    const start = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      motion.current.targetX = ((e.clientX - cx) / rect.width) * 24 * strength;
      motion.current.targetY = ((e.clientY - cy) / rect.height) * 18 * strength;
      start();
    };

    const onLeave = () => {
      motion.current.targetX = 0;
      motion.current.targetY = 0;
      start();
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, enabled, strength]);
}
