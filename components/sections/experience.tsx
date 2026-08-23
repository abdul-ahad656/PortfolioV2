'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/sections/arsenal';

interface Role {
  id: string;
  index: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const roles: Role[] = [
  {
    id: 'visionscraft',
    index: '01',
    company: 'VisionsCraft',
    role: 'Full Stack AI Developer',
    period: 'Jan 2026 — Present',
    location: 'Remote',
    bullets: [
      'Built enterprise RAG pipelines and FastAPI backends serving production traffic',
      'Automated workflows cutting manual operations by 80%+',
      'Architected LLM agent systems for document processing',
    ],
  },
  {
    id: 'techohub',
    index: '02',
    company: 'Techohub Systems',
    role: 'Full Stack Developer',
    period: 'Jun 2025 — Dec 2025',
    location: 'Remote',
    bullets: [
      'Built React + Python/Flask full-stack platforms',
      'Optimized PostgreSQL/MongoDB query performance',
      'Delivered responsive client-facing dashboards',
    ],
  },
  {
    id: 'techdots',
    index: '03',
    company: 'Techdots',
    role: 'Software Engineer',
    period: 'Mar 2023 — May 2025',
    location: 'Lahore, PK',
    bullets: [
      'Delivered 6–8 client production web apps',
      'Built scalable Node.js/Express backends',
      'Collaborated across product, design, and QA',
    ],
  },
];

export function Experience() {
  const [open, setOpen] = useState<string | null>(roles[0].id);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <SectionHeader index="04" title="Work Experience" subtitle="Timeline" />

      <div className="px-6 py-8 md:px-12 md:py-10">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight tracking-tight">
            Three years, three teams, shipped.
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10" />

          <div className="space-y-4">
            {roles.map((r) => {
              const isOpen = open === r.id;
              return (
                <motion.div
                  key={r.id}
                  layout
                  className="relative pl-10"
                >
                  {/* Node */}
                  <span
                    className={cn(
                      'absolute left-0 top-5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 transition-colors',
                      isOpen
                        ? 'border-accent bg-accent'
                        : 'border-foreground/30 bg-background'
                    )}
                  >
                    {isOpen && <span className="h-1 w-1 rounded-full bg-accent-foreground" />}
                  </span>

                  <motion.div
                    layout
                    className={cn(
                      'overflow-hidden rounded-xl border bg-card transition-colors',
                      isOpen ? 'border-foreground/20' : 'border-foreground/10 hover:border-foreground/20'
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : r.id)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
                    >
                      <span className="mono-label shrink-0 text-accent">{r.index}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-display text-[clamp(1.2rem,2vw,1.6rem)] leading-tight tracking-tight">
                            {r.role}
                          </span>
                          <span className="text-[14px] text-muted-foreground">
                            @ {r.company}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="mono-label text-muted-foreground">
                            {r.period}
                          </span>
                          <span className="mono-label text-muted-foreground/60">
                            {r.location}
                          </span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-all',
                          isOpen && 'rotate-180 border-accent bg-accent text-accent-foreground'
                        )}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        >
                          <div className="border-t border-foreground/10 px-5 py-5 md:px-6">
                            <ul className="space-y-2.5">
                              {r.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-3 text-[14px]">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                  <span className="text-foreground/85">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
