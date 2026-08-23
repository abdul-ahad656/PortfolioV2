'use client';

import { useMemo } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  getRelatedSet,
  getTechnologiesForViewport,
  type Technology,
} from './arsenal-data';

interface TechnologyFieldProps {
  scrollProgress: MotionValue<number>;
  activeId: string | null;
  onActivate: (id: string | null) => void;
  parallaxEnabled: boolean;
  mobile: boolean;
  reducedMotion: boolean;
}

export function TechnologyField({
  scrollProgress,
  activeId,
  onActivate,
  parallaxEnabled,
  mobile,
  reducedMotion,
}: TechnologyFieldProps) {
  const techs = useMemo(() => getTechnologiesForViewport(mobile), [mobile]);
  const relatedSet = useMemo(() => getRelatedSet(activeId), [activeId]);

  const fieldOpacity = useTransform(
    scrollProgress,
    [0.15, 0.28, 0.42, 0.58, 0.68],
    reducedMotion ? [1, 1, 0.3, 0.3, 0] : [0, 1, 1, 0.4, 0]
  );

  const statementOpacity = useTransform(
    scrollProgress,
    [0.4, 0.48, 0.58, 0.66],
    reducedMotion ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const statementY = useTransform(
    scrollProgress,
    [0.42, 0.55],
    reducedMotion ? [0, 0] : [40, 0]
  );

  return (
    <motion.div
      style={{ opacity: fieldOpacity }}
      className="pointer-events-none absolute inset-0 z-30 [&_.engine-room-node]:pointer-events-auto"
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="relative mx-auto h-full w-full max-w-[1400px]">
          {techs.map((tech, i) => (
            <FieldNode
              key={tech.id}
              tech={tech}
              index={i}
              scrollProgress={scrollProgress}
              activeId={activeId}
              relatedSet={relatedSet}
              parallaxEnabled={parallaxEnabled}
              onActivate={onActivate}
              reducedMotion={reducedMotion}
            />
          ))}

          <motion.div
            style={{ opacity: statementOpacity, y: statementY }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-40 -translate-y-1/2 px-6 text-center md:px-12"
          >
            <p className="text-[clamp(1.8rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground">
              I DON&apos;T COLLECT
              <br />
              TECHNOLOGY.
            </p>
            <p className="mt-2 text-[clamp(1.8rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-accent">
              I CONNECT IT.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FieldNode({
  tech,
  index,
  scrollProgress,
  activeId,
  relatedSet,
  parallaxEnabled,
  onActivate,
  reducedMotion,
}: {
  tech: Technology;
  index: number;
  scrollProgress: MotionValue<number>;
  activeId: string | null;
  relatedSet: Set<string>;
  parallaxEnabled: boolean;
  onActivate: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const stagger = index * 0.012;
  const nodeOpacity = useTransform(
    scrollProgress,
    [0.18 + stagger, 0.3 + stagger],
    reducedMotion ? [1, 1] : [0, 1]
  );

  const active = activeId === tech.id;
  const highlighted = relatedSet.has(tech.id);
  const dimmed = activeId !== null && !highlighted;
  const depth = tech.float.depth;

  return (
    <motion.button
      type="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${tech.name}, ${tech.layer} layer`}
      onMouseEnter={() => onActivate(tech.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(tech.id)}
      onBlur={() => onActivate(null)}
      onClick={() => onActivate(active ? null : tech.id)}
      style={{
        opacity: nodeOpacity,
        left: `${tech.float.x}%`,
        top: `${tech.float.y}%`,
        transform: parallaxEnabled
          ? `translate3d(calc(-50% + var(--mx, 0px) * ${depth}), calc(-50% + var(--my, 0px) * ${depth}), 0) scale(${active ? 1.04 : highlighted ? 1.02 : 1})`
          : `translate(-50%, -50%) scale(${active ? 1.04 : highlighted ? 1.02 : 1})`,
      }}
      className={cn(
        'engine-room-node absolute whitespace-nowrap rounded-md border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-[border-color,color,box-shadow] duration-300 md:px-4 md:py-2 md:text-[12px]',
        highlighted
          ? 'engine-room-node--active border-accent text-accent shadow-[0_0_24px_hsl(var(--accent)/0.25)]'
          : 'border-foreground/15 bg-card text-foreground hover:border-foreground/30',
        dimmed && 'opacity-25'
      )}
    >
      {tech.name}
    </motion.button>
  );
}
