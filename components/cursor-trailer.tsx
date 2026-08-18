'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorTrailer() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.6 };
  const cx = useSpring(x, springConfig);
  const cy = useSpring(y, springConfig);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-none-desktop');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        'a, button, [role="button"], [data-cursor], input, textarea, [role="tab"]'
      ) as HTMLElement | null;
      if (interactive) {
        setHovering(true);
        setLabel(interactive.getAttribute('data-cursor-label'));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('cursor-none-desktop');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
      style={{ x: cx, y: cy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          backgroundColor: hovering
            ? 'hsl(var(--accent) / 0.12)'
            : 'hsl(var(--foreground) / 0.9)',
          border: hovering
            ? '1px solid hsl(var(--accent) / 0.5)'
            : '1px solid transparent',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {label && (
          <span className="mono-label text-[10px] text-accent">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
