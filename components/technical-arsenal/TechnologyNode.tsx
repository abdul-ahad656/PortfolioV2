'use client';

import { cn } from '@/lib/utils';
import type { Technology } from './arsenal-data';

interface TechnologyNodeProps {
  tech: Technology;
  active: boolean;
  highlighted: boolean;
  dimmed: boolean;
  enterProgress: number;
  floatOpacity: number;
  parallaxEnabled: boolean;
  onActivate: (id: string | null) => void;
}

export function TechnologyNode({
  tech,
  active,
  highlighted,
  dimmed,
  enterProgress,
  floatOpacity,
  parallaxEnabled,
  onActivate,
}: TechnologyNodeProps) {
  const depth = tech.float.depth;
  const parallaxStyle = parallaxEnabled
    ? {
        transform: `translate3d(calc(var(--mx, 0px) * ${depth}), calc(var(--my, 0px) * ${depth}), 0) scale(${active ? 1.04 : highlighted ? 1.02 : 1})`,
      }
    : {
        transform: `scale(${active ? 1.04 : highlighted ? 1.02 : 1})`,
      };

  return (
    <button
      type="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${tech.name}, ${tech.layer} layer`}
      onMouseEnter={() => onActivate(tech.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(tech.id)}
      onBlur={() => onActivate(null)}
      onClick={() => onActivate(active ? null : tech.id)}
      className={cn(
        'engine-room-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-[border-color,color,box-shadow,opacity] duration-300 md:px-4 md:py-2 md:text-[12px]',
        highlighted
          ? 'engine-room-node--active border-accent text-accent shadow-[0_0_24px_hsl(var(--accent)/0.25)]'
          : 'border-foreground/15 bg-card text-foreground hover:border-foreground/30',
        dimmed && 'opacity-25'
      )}
      style={{
        left: `${tech.float.x}%`,
        top: `${tech.float.y}%`,
        opacity: floatOpacity * enterProgress,
        ...parallaxStyle,
      }}
    >
      {tech.name}
    </button>
  );
}
