'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Category = 'llm' | 'backend' | 'data' | 'cloud';

interface Skill {
  name: string;
  cat: Category;
  level: number; // 1-5
  related: string[];
}

const skills: Skill[] = [
  { name: 'Python', cat: 'llm', level: 5, related: ['FastAPI', 'PyTorch', 'LangChain'] },
  { name: 'PyTorch', cat: 'llm', level: 4, related: ['Python', 'Hugging Face', 'FAISS'] },
  { name: 'LangChain', cat: 'llm', level: 4, related: ['OpenAI', 'ChromaDB', 'RAG'] },
  { name: 'OpenAI API', cat: 'llm', level: 5, related: ['LangChain', 'RAG', 'Agents'] },
  { name: 'Hugging Face', cat: 'llm', level: 4, related: ['BERT', 'PyTorch', 'Fine-tuning'] },
  { name: 'RAG Pipelines', cat: 'llm', level: 5, related: ['FAISS', 'ChromaDB', 'LangChain'] },
  { name: 'LLM Agents', cat: 'llm', level: 4, related: ['OpenAI', 'LangChain', 'Tool use'] },

  { name: 'FastAPI', cat: 'backend', level: 5, related: ['Python', 'PostgreSQL', 'JWT'] },
  { name: 'Flask', cat: 'backend', level: 4, related: ['Python', 'REST'] },
  { name: 'Node.js', cat: 'backend', level: 4, related: ['Express', 'REST'] },
  { name: 'Express', cat: 'backend', level: 4, related: ['Node.js', 'REST'] },
  { name: 'REST APIs', cat: 'backend', level: 5, related: ['FastAPI', 'JWT'] },
  { name: 'JWT Auth', cat: 'backend', level: 4, related: ['FastAPI', 'REST'] },
  { name: 'React', cat: 'backend', level: 4, related: ['Next.js', 'TypeScript'] },

  { name: 'PostgreSQL', cat: 'data', level: 5, related: ['FastAPI', 'pgvector'] },
  { name: 'MongoDB', cat: 'data', level: 4, related: ['Node.js'] },
  { name: 'FAISS', cat: 'data', level: 4, related: ['RAG', 'PyTorch'] },
  { name: 'ChromaDB', cat: 'data', level: 4, related: ['LangChain', 'RAG'] },
  { name: 'pgvector', cat: 'data', level: 3, related: ['PostgreSQL', 'RAG'] },
  { name: 'Redis', cat: 'data', level: 3, related: ['FastAPI', 'Caching'] },

  { name: 'Docker', cat: 'cloud', level: 4, related: ['GCP', 'CI/CD'] },
  { name: 'Google Cloud Run', cat: 'cloud', level: 4, related: ['Docker', 'CI/CD'] },
  { name: 'CI/CD', cat: 'cloud', level: 4, related: ['Docker', 'GCP'] },
  { name: 'AWS', cat: 'cloud', level: 3, related: ['Docker', 'EC2'] },
  { name: 'Linux', cat: 'cloud', level: 4, related: ['Docker', 'Bash'] },
  { name: 'Git', cat: 'cloud', level: 5, related: ['CI/CD'] },
];

const categories: { id: Category; label: string; count: string }[] = [
  { id: 'llm', label: 'Generative AI & LLMs', count: '07' },
  { id: 'backend', label: 'Backend & APIs', count: '07' },
  { id: 'data', label: 'Databases & Vectors', count: '06' },
  { id: 'cloud', label: 'Cloud & DevOps', count: '06' },
];

export function Arsenal() {
  const [activeCat, setActiveCat] = useState<Category | 'all'>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCat === 'all' ? skills : skills.filter((s) => s.cat === activeCat)),
    [activeCat]
  );

  const relatedSet = useMemo(() => {
    if (!hovered) return new Set<string>();
    const s = skills.find((x) => x.name === hovered);
    return new Set(s?.related ?? []);
  }, [hovered]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <SectionHeader index="02" title="Technical Arsenal" subtitle="Interactive Matrix" />

      <div className="px-6 py-8 md:px-12 md:py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={activeCat === 'all'}
            onClick={() => setActiveCat('all')}
            label="All"
            count={String(skills.length).padStart(2, '0')}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
              label={c.label}
              count={c.count}
            />
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => {
              const dimmed = hovered !== null && hovered !== skill.name && !relatedSet.has(skill.name);
              const highlighted = hovered === skill.name || relatedSet.has(skill.name);
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: dimmed ? 0.25 : 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'group relative cursor-pointer bg-card px-4 py-5 transition-colors',
                    highlighted && 'bg-accent/[0.06]'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[15px] font-medium tracking-tight">
                      {skill.name}
                    </span>
                    <span className="mono-label text-[9px] text-muted-foreground">
                      L{skill.level}
                    </span>
                  </div>
                  {/* Level bars */}
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-colors',
                          i < skill.level
                            ? highlighted
                              ? 'bg-accent'
                              : 'bg-foreground/70'
                            : 'bg-foreground/10'
                        )}
                      />
                    ))}
                  </div>
                  {highlighted && skill.related.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 overflow-hidden"
                    >
                      <span className="mono-label text-[9px] text-muted-foreground">
                        ↳ {skill.related.slice(0, 3).join(' · ')}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-[13px] text-muted-foreground">
          Hover a skill to highlight connected technologies across the stack.
        </p>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-foreground/15 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
      )}
    >
      {label}
      <span
        className={cn(
          'mono-label text-[9px]',
          active ? 'text-background/60' : 'text-muted-foreground/60'
        )}
      >
        {count}
      </span>
    </button>
  );
}

export function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-3 md:px-10">
      <div className="flex items-center gap-3">
        <span className="mono-label text-accent">{index}</span>
        <span className="mono-label text-muted-foreground">{subtitle ?? title}</span>
      </div>
      <span className="mono-label hidden text-muted-foreground md:inline">
        {title}
      </span>
    </div>
  );
}
