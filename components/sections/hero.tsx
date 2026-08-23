'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AIMirrorImage } from '@/components/ai-mirror-image';
import { Magnetic } from '@/components/magnetic';
import { useNav } from '@/components/nav-context';
import type { SectionDef } from '@/components/deck-shell';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 24, stiffness: 180 },
  },
};

export function Hero() {
  const { navigate } = useNav();

  return (
    <div className="relative min-h-screen w-full">
      {/* Center portrait — behind the name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute bottom-0 left-1/2 z-[2] h-[min(88vh,860px)] w-[min(420px,72vw)] -translate-x-1/2 md:w-[min(460px,38vw)] lg:h-[min(92vh,900px)] lg:w-[min(500px,34vw)]"
      >
        <AIMirrorImage
          personImage="/portrait.jpeg"
          robotImage="/robot.jpeg"
          alt="Abdul Ahad portrait"
          className="h-full w-full"
          circleSize={160}
          innerScale={1.07}
          edgeFeather={20}
          priority
          glow={{
            enabled: true,
            color: '120, 200, 255',
            intensity: 0.65,
            ringOpacity: 0.4,
          }}
        />
      </motion.div>

      {/* Giant name — in front of portrait, full width */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] select-none">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full translate-y-[14%] items-end justify-between px-[1.5vw] text-[clamp(3rem,16vw,13rem)] font-bold leading-[0.82] text-foreground"
          aria-label="Abdul Ahad"
        >
          {Array.from('Abdul Ahad').map((char, i) =>
            char === ' ' ? (
              <span key={i} className="flex-[0.6]" aria-hidden />
            ) : (
              <span key={i} aria-hidden="true">
                {char}
              </span>
            )
          )}
        </motion.h1>
      </div>

      {/* Side content overlays */}
      <div className="relative z-[10] flex min-h-screen flex-col px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28 lg:px-16">
        {/* Mobile: stacked layout below portrait area */}
        <div className="flex flex-1 flex-col justify-end gap-10 pb-[42vh] md:pb-[38vh] lg:pb-0 lg:grid lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 lg:max-w-[320px] lg:justify-self-start xl:max-w-[360px]"
          >
            <motion.div
              variants={item}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-foreground/10 bg-background/40 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[13px] font-medium text-foreground/90">
                Available for Work
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-[clamp(1.5rem,3vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance"
            >
              AI Engineer &amp; Full Stack Developer based in Lahore
            </motion.h2>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8 lg:max-w-[320px] lg:justify-self-end xl:max-w-[360px]"
          >
            <motion.p
              variants={item}
              className="text-[15px] leading-[1.7] text-muted-foreground md:text-[16px]"
            >
              Hi, I&apos;m Abdul Ahad — an AI engineer passionate about building
              production-grade RAG pipelines, LLM agents, and scalable systems
              that connect research to real-world impact.
            </motion.p>

            <motion.div variants={item}>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => navigate('projects')}
                  className="group inline-flex items-center gap-4 rounded-full bg-accent py-3 pl-3 pr-7 text-[15px] font-semibold text-accent-foreground shadow-[0_8px_32px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/15 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  See my works
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const heroSection: SectionDef = {
  id: 'hero',
  index: '01',
  label: 'Introduction',
  title: 'Abdul Ahad — AI Engineer & Full Stack Developer',
};
