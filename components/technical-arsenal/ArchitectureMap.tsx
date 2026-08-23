'use client';

import { useMemo } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  architectureEdges,
  getRelatedSet,
  getTechnologyById,
  layers,
  technologies,
} from './arsenal-data';

interface ArchitectureMapProps {
  scrollProgress: MotionValue<number>;
  activeId: string | null;
  onActivate: (id: string | null) => void;
  reducedMotion: boolean;
  mobile: boolean;
}

const ARCH_NODE_IDS = [
  'python',
  'pytorch',
  'rag',
  'llm-agents',
  'nextjs',
  'react',
  'fastapi',
  'node',
  'postgresql',
  'faiss',
  'docker',
  'cloud-run',
  'git',
];

export function ArchitectureMap({
  scrollProgress,
  activeId,
  onActivate,
  reducedMotion,
  mobile,
}: ArchitectureMapProps) {
  const relatedSet = useMemo(() => getRelatedSet(activeId), [activeId]);

  const mapOpacity = useTransform(
    scrollProgress,
    [0.58, 0.68, 0.95, 1],
    reducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 1]
  );

  const lineProgress = useTransform(
    scrollProgress,
    [0.62, 0.85],
    reducedMotion ? [1, 1] : [0, 1]
  );

  const labelOpacity = useTransform(
    scrollProgress,
    [0.82, 0.92],
    reducedMotion ? [1, 1] : [0, 1]
  );

  const displayTechs = mobile
    ? technologies.filter((t) => t.mobile)
    : technologies.filter((t) => ARCH_NODE_IDS.includes(t.id));

  const displayIds = new Set(displayTechs.map((t) => t.id));

  return (
    <motion.div
      style={{ opacity: mapOpacity }}
      className="pointer-events-none absolute inset-0 z-40 [&_.arch-node]:pointer-events-auto"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-8">
        <div className="relative aspect-[4/5] w-full max-w-[720px] md:aspect-[16/11]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            {architectureEdges.map((edge) => {
              if (!displayIds.has(edge.from) || !displayIds.has(edge.to)) return null;

              const from = getTechnologyById(edge.from)!;
              const to = getTechnologyById(edge.to)!;

              const edgeHighlighted =
                activeId !== null &&
                (edge.from === activeId ||
                  edge.to === activeId ||
                  (relatedSet.has(edge.from) && relatedSet.has(edge.to)));

              const edgeDimmed =
                activeId !== null &&
                !edgeHighlighted &&
                !(relatedSet.has(edge.from) || relatedSet.has(edge.to));

              return (
                <AnimatedEdge
                  key={`${edge.from}-${edge.to}`}
                  x1={from.arch.x}
                  y1={from.arch.y}
                  x2={to.arch.x}
                  y2={to.arch.y}
                  progress={lineProgress}
                  highlighted={edgeHighlighted}
                  dimmed={edgeDimmed}
                />
              );
            })}
          </svg>

          {displayTechs.map((tech) => {
            const active = activeId === tech.id;
            const highlighted = relatedSet.has(tech.id);
            const dimmed = activeId !== null && !highlighted;

            return (
              <button
                key={tech.id}
                type="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${tech.name}, architecture node`}
                onMouseEnter={() => onActivate(tech.id)}
                onMouseLeave={() => onActivate(null)}
                onFocus={() => onActivate(tech.id)}
                onBlur={() => onActivate(null)}
                onClick={() => onActivate(active ? null : tech.id)}
                style={{
                  left: `${tech.arch.x}%`,
                  top: `${tech.arch.y}%`,
                }}
                className={cn(
                  'arch-node absolute -translate-x-1/2 -translate-y-1/2 rounded-md border px-2 py-1 text-[9px] font-medium tracking-wide transition-all duration-300 md:px-3 md:py-1.5 md:text-[10px]',
                  highlighted
                    ? 'engine-room-node--active border-accent bg-card text-accent shadow-[0_0_20px_hsl(var(--accent)/0.22)]'
                    : 'border-foreground/15 bg-card text-foreground',
                  dimmed && 'opacity-20'
                )}
              >
                {tech.name}
              </button>
            );
          })}

          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-6 gap-y-2 pb-4 md:gap-x-10"
          >
            {layers.map((layer) => (
              <span
                key={layer.id}
                className="mono-label text-[9px] text-muted-foreground md:text-[10px]"
              >
                {layer.index} / {layer.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedEdge({
  x1,
  y1,
  x2,
  y2,
  progress,
  highlighted,
  dimmed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: MotionValue<number>;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const dashOffset = useTransform(progress, (v) => length * (1 - v));

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(var(--accent))"
      strokeWidth={highlighted ? 1.5 : 1}
      strokeDasharray={length}
      style={{
        strokeDashoffset: dashOffset,
        opacity: dimmed ? 0.15 : highlighted ? 1 : 0.5,
      }}
    />
  );
}
