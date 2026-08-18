'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { useNav } from '@/components/nav-context';
import type { SectionDef } from '@/components/deck-shell';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

const metrics = [
  { value: '03+', label: 'Years Experience' },
  { value: '80%', label: 'Automation Efficiency' },
  { value: '08+', label: 'Production Apps' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 24, stiffness: 200 },
  },
};

export function Hero(_props: HeroProps) {
  const { navigate } = useNav();
  return (
    <div className="flex h-full flex-col">
      {/* Top meta bar */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-3 md:px-10">
        <span className="mono-label text-muted-foreground">01 — Introduction</span>
        <span className="mono-label hidden text-muted-foreground md:inline">
          Lahore, PK · GMT+5
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between px-6 py-10 md:px-14 md:py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span className="mono-label text-accent">●</span>
            <span className="mono-label text-muted-foreground">
              Currently building @ VisionsCraft
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em] text-balance"
          >
            Abdul Ahad
            <span className="mt-2 block text-muted-foreground">
              <span className="italic text-accent">AI Engineer</span> &amp; Full
              Stack Developer
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground"
          >
            Architecting production-grade RAG pipelines, LLM agents, and scalable
            cloud-native backend systems — from research prototype to deployed
            product.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <button
                onClick={() => navigate('projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View Selected Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                onClick={() => navigate('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-[14px] font-medium transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Let&apos;s Connect
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={item}
              className="group bg-card px-4 py-6 md:px-8 md:py-8"
            >
              <div className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-tight transition-colors group-hover:text-accent">
                {m.value}
              </div>
              <div className="mono-label mt-3 text-muted-foreground">
                {m.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span className="mono-label">Scroll or use arrow keys</span>
        </motion.div>
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
