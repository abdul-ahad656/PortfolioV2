'use client';

import {
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AIMirrorGlowSettings {
  enabled?: boolean;
  /** Outer glow color */
  color?: string;
  /** 0–1 glow strength */
  intensity?: number;
  /** Ring border highlight */
  ringOpacity?: number;
}

export interface AIMirrorImageProps {
  personImage: string;
  robotImage: string;
  alt?: string;
  className?: string;
  /** Container width — number (px) or CSS string */
  width?: number | string;
  /** Container height — number (px) or CSS string */
  height?: number | string;
  /** Portal circle diameter in px */
  circleSize?: number;
  /** Slight zoom on robot layer inside the portal */
  innerScale?: number;
  /** Soft feather at portal edge in px */
  edgeFeather?: number;
  glow?: AIMirrorGlowSettings;
  imageClassName?: string;
  priority?: boolean;
}

const DEFAULT_GLOW: Required<AIMirrorGlowSettings> = {
  enabled: true,
  color: '120, 200, 255',
  intensity: 0.55,
  ringOpacity: 0.35,
};

function buildPortraitMask(x: number, y: number, radius: number, feather: number): string {
  if (radius <= 0) return 'none';
  const inner = Math.max(0, radius - feather);
  // Hide portrait inside circle so robot shows through
  return `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0px, transparent ${inner}px, black ${radius}px)`;
}

function buildRobotMask(x: number, y: number, radius: number, feather: number): string {
  if (radius <= 0) return 'none';
  const inner = Math.max(0, radius - feather);
  // Robot visible ONLY inside the spotlight circle
  return `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0px, black ${inner}px, transparent ${radius}px)`;
}

export function AIMirrorImage({
  personImage,
  robotImage,
  alt = 'Portrait',
  className,
  width,
  height,
  circleSize = 150,
  innerScale = 1.06,
  edgeFeather = 18,
  glow,
  imageClassName,
  priority = false,
}: AIMirrorImageProps) {
  const glowSettings = { ...DEFAULT_GLOW, ...glow };

  const containerRef = useRef<HTMLDivElement>(null);
  const portraitLayerRef = useRef<HTMLDivElement>(null);
  const robotImageRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const motion = useRef({
    x: 0,
    y: 0,
    radius: 0,
    targetRadius: 0,
    active: false,
    hovering: false,
  });

  const applyFrame = useCallback(() => {
    const m = motion.current;
    const portraitLayer = portraitLayerRef.current;
    const robotImage = robotImageRef.current;
    const glowRing = glowRingRef.current;

    const diff = m.targetRadius - m.radius;
    if (Math.abs(diff) > 0.4) {
      m.radius += diff * 0.18;
    } else {
      m.radius = m.targetRadius;
    }

    const r = m.radius;
    const visible = r > 0.5;

    if (portraitLayer) {
      portraitLayer.style.webkitMaskImage = buildPortraitMask(m.x, m.y, r, edgeFeather);
      portraitLayer.style.maskImage = buildPortraitMask(m.x, m.y, r, edgeFeather);
    }

    if (robotImage) {
      if (visible) {
        robotImage.style.opacity = '1';
        robotImage.style.webkitMaskImage = buildRobotMask(m.x, m.y, r, edgeFeather);
        robotImage.style.maskImage = buildRobotMask(m.x, m.y, r, edgeFeather);
      } else {
        robotImage.style.opacity = '0';
        robotImage.style.webkitMaskImage = 'none';
        robotImage.style.maskImage = 'none';
      }
    }

    if (glowRing && glowSettings.enabled) {
      const size = r * 2;
      glowRing.style.width = `${size}px`;
      glowRing.style.height = `${size}px`;
      glowRing.style.transform = `translate3d(${m.x - r}px, ${m.y - r}px, 0)`;
      glowRing.style.opacity = visible
        ? String(Math.min(1, (r / (circleSize / 2)) * glowSettings.intensity))
        : '0';
    }

    const stillAnimating =
      m.hovering ||
      m.active ||
      Math.abs(m.targetRadius - m.radius) > 0.4 ||
      r > 0.5;

    if (stillAnimating) {
      rafRef.current = requestAnimationFrame(applyFrame);
    } else {
      rafRef.current = null;
    }
  }, [circleSize, edgeFeather, glowSettings.enabled, glowSettings.intensity]);

  const startLoop = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyFrame);
    }
  }, [applyFrame]);

  const setCursor = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      motion.current.x = clientX - rect.left;
      motion.current.y = clientY - rect.top;
    },
    []
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      motion.current.hovering = true;
      motion.current.active = true;
      motion.current.targetRadius = circleSize / 2;
      setCursor(e.clientX, e.clientY);
      startLoop();
    },
    [circleSize, setCursor, startLoop]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setCursor(e.clientX, e.clientY);
      if (!motion.current.active) {
        motion.current.active = true;
        motion.current.targetRadius = circleSize / 2;
      }
      startLoop();
    },
    [circleSize, setCursor, startLoop]
  );

  const handleMouseLeave = useCallback(() => {
    motion.current.hovering = false;
    motion.current.active = false;
    motion.current.targetRadius = 0;
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sizeStyle: CSSProperties = {
    ...(width != null && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height != null && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  const sharedImageClass = cn(
    'object-contain object-bottom drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)]',
    imageClassName
  );

  return (
    <div
      ref={containerRef}
      className={cn('ai-mirror-image relative select-none', className)}
      style={sizeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Robot — hidden until hover, revealed only inside spotlight */}
      <div
        ref={robotImageRef}
        className="ai-mirror-image__robot pointer-events-none absolute inset-0 opacity-0"
      >
        <Image
          src={robotImage}
          alt=""
          fill
          sizes="(max-width: 768px) 72vw, 34vw"
          className={sharedImageClass}
          draggable={false}
        />
      </div>

      {/* Portrait — top layer, circular mask cuts a hole to reveal robot */}
      <div
        ref={portraitLayerRef}
        className="ai-mirror-image__portrait pointer-events-none absolute inset-0 will-change-[mask-image]"
      >
        <Image
          src={personImage}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 72vw, 34vw"
          className={sharedImageClass}
          draggable={false}
        />
      </div>

      {/* Portal ring / lens glow */}
      {glowSettings.enabled && (
        <div
          ref={glowRingRef}
          className="ai-mirror-image__glow pointer-events-none absolute left-0 top-0 rounded-full opacity-0 will-change-[transform,opacity]"
          style={
            {
              '--glow-color': glowSettings.color,
              '--ring-opacity': glowSettings.ringOpacity,
            } as CSSProperties
          }
        />
      )}
    </div>
  );
}
