'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

interface ArsenalHeroProps {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}

export function ArsenalHero({ scrollProgress, reducedMotion }: ArsenalHeroProps) {
  const opacity = useTransform(scrollProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollProgress, [0, 0.18], reducedMotion ? [0, 0] : [0, -60]);
  const y2 = useTransform(scrollProgress, [0, 0.18], reducedMotion ? [0, 0] : [0, -40]);
  const scale = useTransform(scrollProgress, [0, 0.18], reducedMotion ? [1, 1] : [1, 0.94]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="mono-label text-accent">SYSTEM / 02</span>
          <span className="mono-label text-[hsl(270_6%_38%)]">STACK STATUS / ONLINE</span>
        </div>

        <motion.div style={{ y: y1 }}>
          <h2 className="text-[clamp(3.5rem,14vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em] text-[hsl(270_6%_10.5%)]">
            TECHNICAL
          </h2>
        </motion.div>
        <motion.div style={{ y: y2 }}>
          <h2 className="text-[clamp(3.5rem,14vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em] text-[hsl(270_6%_10.5%/0.85)]">
            ARSENAL
          </h2>
        </motion.div>

        <p className="mt-8 max-w-md text-[14px] leading-relaxed text-[hsl(270_6%_38%)] md:text-[15px]">
          THE STACK BEHIND THE SYSTEMS I BUILD.
        </p>
      </div>
    </motion.div>
  );
}
