'use client';

import { useRef, type ReactNode, type MouseEvent, type ElementType } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  cursorLabel?: string;
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
  href,
  onClick,
  cursorLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const motionStyle = { x: sx, y: sy };
  const cls = cn('inline-flex', className);

  const Tag: ElementType = href ? motion.a : motion.div;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={motionStyle}
      data-cursor-label={cursorLabel}
      className={cls}
    >
      {children}
    </Tag>
  );
}
