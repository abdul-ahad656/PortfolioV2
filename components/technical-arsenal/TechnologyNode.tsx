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
        'engine-room-node engine-room-pill absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-wide md:px-4 md:py-2.5 md:text-[12px]',
        active && 'engine-room-pill--active',
        !active && highlighted && 'engine-room-pill--related',
        dimmed && '!opacity-30'
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
