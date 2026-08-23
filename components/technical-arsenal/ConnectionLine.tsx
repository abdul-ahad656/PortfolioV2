'use client';

import { cn } from '@/lib/utils';

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  highlighted: boolean;
  dimmed: boolean;
}

export function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  progress,
  highlighted,
  dimmed,
}: ConnectionLineProps) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const dashOffset = length * (1 - progress);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth={highlighted ? 1.5 : 1}
      className={cn(
        'engine-room-line transition-[stroke-opacity] duration-300',
        highlighted ? 'engine-room-line--active' : '',
        dimmed && 'opacity-15'
      )}
      strokeDasharray={length}
      strokeDashoffset={dashOffset}
      style={{ opacity: dimmed ? 0.15 : highlighted ? 1 : 0.35 + progress * 0.45 }}
    />
  );
}
