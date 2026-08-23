'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Giant background name */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] select-none overflow-hidden"
        aria-hidden
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap text-[clamp(5rem,22vw,17rem)] font-bold leading-[0.82] tracking-[-0.04em] text-foreground translate-y-[18%] pl-[5vw]"
        >
          Abdul Ahad
        </motion.h1>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-24 md:px-10 md:pb-12 md:pt-28 lg:px-16">
        <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-2 flex flex-col gap-6 lg:order-1 lg:max-w-[340px] lg:self-end lg:pb-32"
          >
            <motion.div
              variants={item}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2 backdrop-blur-sm"
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
              className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance"
            >
              AI Engineer &amp; Full Stack Developer based in Lahore
            </motion.h2>
          </motion.div>

          {/* Center portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 relative mx-auto w-full max-w-[320px] lg:order-2 lg:max-w-[380px] xl:max-w-[420px]"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/portrait.jpeg"
                alt="Abdul Ahad portrait"
                fill
                priority
                className="object-cover object-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-3 flex flex-col gap-8 lg:max-w-[340px] lg:self-end lg:pb-32 lg:justify-self-end"
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
