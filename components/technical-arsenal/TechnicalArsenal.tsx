'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArsenalHero } from './ArsenalHero';
import { TechnologyField } from './TechnologyField';
import { ArchitectureMap } from './ArchitectureMap';
import { useParallaxField } from './use-parallax-field';
import { useReducedMotion } from './use-reduced-motion';
import { getStackIndexFromProgress, getTechnologyById, layers } from './arsenal-data';

export function TechnicalArsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [stackLabel, setStackLabel] = useState('00');
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useParallaxField(fieldRef, {
    enabled: !reducedMotion && !mobile,
    strength: 1,
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = getStackIndexFromProgress(v);
    setStackLabel((prev) => (prev === next ? prev : next));
  });

  const onActivate = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  const stackLayer =
    stackLabel === '00'
      ? 'INTRO'
      : layers.find((l) => l.index === stackLabel)?.label ?? 'INTRO';

  return (
    <div
      ref={sectionRef}
      className={cn(
        'engine-room relative w-full',
        reducedMotion ? 'min-h-[200vh]' : mobile ? 'min-h-[320vh]' : 'min-h-[450vh]'
      )}
    >
      <div
        ref={fieldRef}
        className={cn(
          'relative',
          reducedMotion ? 'min-h-[200vh]' : mobile ? 'min-h-[320vh]' : 'min-h-[450vh]'
        )}
      >
        <div className="pointer-events-none absolute right-6 top-24 z-50 hidden md:block">
          <span className="mono-label text-[10px] text-[hsl(270_6%_38%)]">
            STACK / {stackLabel}
          </span>
          <span className="mono-label mt-1 block text-[9px] text-accent">
            {stackLayer}
          </span>
          {activeId && (
            <ActiveTechDetail activeId={activeId} />
          )}
        </div>

        <ArsenalHero scrollProgress={scrollYProgress} reducedMotion={reducedMotion} />

        <TechnologyField
          scrollProgress={scrollYProgress}
          activeId={activeId}
          onActivate={onActivate}
          parallaxEnabled={!reducedMotion && !mobile}
          mobile={mobile}
          reducedMotion={reducedMotion}
        />

        <ArchitectureMap
          scrollProgress={scrollYProgress}
          activeId={activeId}
          onActivate={onActivate}
          reducedMotion={reducedMotion}
          mobile={mobile}
        />

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-50 -translate-x-1/2 md:hidden">
          <span className="mono-label text-[9px] text-[hsl(270_6%_38%)]">
            STACK / {stackLabel} · {stackLayer}
          </span>
        </div>
      </div>
    </div>
  );
}

function ActiveTechDetail({ activeId }: { activeId: string }) {
  const tech = getTechnologyById(activeId);
  if (!tech) return null;

  const relatedNames = tech.related
    .map((id) => getTechnologyById(id)?.name)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="mt-4 max-w-[160px] border-t border-[hsl(270_6%_10.5%/0.12)] pt-3">
      <span className="mono-label block text-[9px] text-accent">
        {tech.name.toUpperCase()}
      </span>
      {relatedNames.length > 0 && (
        <span className="mono-label mt-2 block text-[8px] leading-relaxed text-[hsl(270_6%_38%)]">
          → {relatedNames.join(' · ')}
        </span>
      )}
    </div>
  );
}
