'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/sections/arsenal';

interface Project {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  tags: string[];
  impact: string[];
  meta: string;
}

const projects: Project[] = [
  {
    id: 'healwise',
    index: 'P01',
    name: 'HealWise',
    subtitle: 'AI-Powered Digital Health SaaS — fine-tuned ClinicalBERT for natural language symptom classification.',
    tags: ['Python', 'FastAPI/Flask', 'BERT', 'Docker', 'Google Cloud Run'],
    impact: [
      'End-to-end inference APIs serving real-time symptom classification',
      'JWT authentication and patient management workflows',
      'Automated GCP CI/CD deployment via Cloud Run',
    ],
    meta: 'Healthcare · SaaS · 2025',
  },
  {
    id: 'docintel',
    index: 'P02',
    name: 'AI Document Intelligence',
    subtitle: 'Zero-hallucination RAG workflow for complex enterprise documents with modular architecture.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'FAISS', 'ChromaDB', 'LangChain', 'PostgreSQL'],
    impact: [
      'Modular architecture allowing dynamic swapping of embedding models',
      'Pluggable vector indexing strategies (FAISS / ChromaDB)',
      'Strict citation grounding to eliminate hallucination',
    ],
    meta: 'Enterprise · RAG · 2025',
  },
  {
    id: 'schmoozzer',
    index: 'P03',
    name: 'Schmoozzer 10X',
    subtitle: 'Multi-channel automated lead outreach engine extending ActiveCampaign.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'ActiveCampaign API', 'LinkedIn API'],
    impact: [
      'Orchestrated personalized outreach across Email, WhatsApp, LinkedIn',
      'Rate-limiting controls to respect platform quotas',
      'AI-generated message variants per prospect segment',
    ],
    meta: 'SaaS · Automation · 2024',
  },
];

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id);

  return (
    <div className="flex h-full flex-col">
      <SectionHeader index="03" title="Featured Projects" subtitle="Selected Work" />

      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight tracking-tight">
            Three systems, shipped to production.
          </h2>
        </div>

        <div className="space-y-3">
          {projects.map((p) => {
            const isOpen = open === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                className={cn(
                  'overflow-hidden rounded-xl border bg-card transition-colors',
                  isOpen ? 'border-foreground/20' : 'border-foreground/10 hover:border-foreground/20'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
                >
                  <span className="mono-label shrink-0 text-accent">{p.index}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-tight">
                        {p.name}
                      </h3>
                      <span className="mono-label hidden text-muted-foreground md:inline">
                        {p.meta}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] text-muted-foreground">
                      {p.subtitle}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 transition-all',
                      isOpen && 'rotate-180 border-accent bg-accent text-accent-foreground'
                    )}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
                      <div className="border-t border-foreground/10 px-5 py-6 md:px-7">
                        <div className="mb-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="mono-label rounded-md border border-foreground/15 bg-foreground/[0.03] px-2.5 py-1 text-[10px] text-foreground/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-2.5">
                          {p.impact.map((i) => (
                            <li key={i} className="flex items-start gap-3 text-[14px]">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span className="text-foreground/85">{i}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
