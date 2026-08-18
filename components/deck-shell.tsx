'use client';

import {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/magnetic';
import { NavContext } from '@/components/nav-context';
import { useTheme } from 'next-themes';

export interface SectionDef {
  id: string;
  index: string;
  label: string;
  title: string;
}

interface DeckShellProps {
  sections: SectionDef[];
  children: (activeId: string, direction: number) => ReactNode;
}

const springSoft = { damping: 30, stiffness: 220, mass: 0.8 };

export function DeckShell({ sections, children }: DeckShellProps) {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [direction, setDirection] = useState(1);
  const activeIndex = sections.findIndex((s) => s.id === activeId);

  const goTo = useCallback(
    (id: string) => {
      const next = sections.findIndex((s) => s.id === id);
      if (next === -1 || id === activeId) return;
      setDirection(next > activeIndex ? 1 : -1);
      setActiveId(id);
    },
    [activeId, activeIndex, sections]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const n = Math.min(activeIndex + 1, sections.length - 1);
        if (n !== activeIndex) {
          setDirection(1);
          setActiveId(sections[n].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const n = Math.max(activeIndex - 1, 0);
        if (n !== activeIndex) {
          setDirection(-1);
          setActiveId(sections[n].id);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, sections]);

  return (
    <NavContext.Provider value={{ navigate: goTo }}>
      <div className="relative min-h-screen w-full overflow-hidden bg-background grain">
        <Sidebar
          sections={sections}
          activeId={activeId}
          onNavigate={goTo}
          activeIndex={activeIndex}
        />
        <DeckArea
          sections={sections}
          activeId={activeId}
          direction={direction}
          activeIndex={activeIndex}
        >
          {children}
        </DeckArea>
      </div>
    </NavContext.Provider>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({
  sections,
  activeId,
  onNavigate,
  activeIndex,
}: {
  sections: SectionDef[];
  activeId: string;
  onNavigate: (id: string) => void;
  activeIndex: number;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[clamp(260px,22vw,340px)] flex-col border-r border-foreground/10 bg-background/80 backdrop-blur-xl">
      {/* Brand */}
      <div className="px-6 pt-7 pb-8">
        <Magnetic strength={0.2}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="group block"
          >
            <div className="mono-label text-muted-foreground">Portfolio / 2026</div>
            <div className="mt-1.5 font-display text-[26px] leading-none tracking-tight">
              Abdul Ahad
            </div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              AI Engineer · Full Stack
            </div>
          </a>
        </Magnetic>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md bg-foreground/[0.04] ring-1 ring-foreground/10"
                      transition={springSoft}
                    />
                  )}
                  <span
                    className={cn(
                      'mono-label relative shrink-0 transition-colors',
                      active ? 'text-accent' : 'text-muted-foreground/60'
                    )}
                  >
                    {s.index}
                  </span>
                  <span className="relative text-[15px] font-medium tracking-tight">
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Status + socials */}
      <div className="border-t border-foreground/10 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="mono-label text-muted-foreground">
            Available · Global Remote
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <SocialIcon href="https://github.com" label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="mailto:buttabdul.ahad029@gmail.com" label="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              ))}
          </button>
        </div>
      </div>
    </aside>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Magnetic
      strength={0.4}
      href={href}
      cursorLabel={label}
    >
      <span
        aria-label={label}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-accent"
      >
        {children}
      </span>
    </Magnetic>
  );
}

/* ---------------- Deck Area ---------------- */

function DeckArea({
  sections,
  activeId,
  direction,
  activeIndex,
  children,
}: {
  sections: SectionDef[];
  activeId: string;
  direction: number;
  activeIndex: number;
  children: (activeId: string, direction: number) => ReactNode;
}) {
  return (
    <main className="relative ml-[clamp(260px,22vw,340px)] min-h-screen">
      <ScrollRail
        sections={sections}
        activeIndex={activeIndex}
        total={sections.length}
      />
      <div className="relative mx-auto h-screen w-full max-w-[1180px] px-6 py-6 md:px-10 md:py-8">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.section
            key={activeId}
            custom={direction}
            initial={{
              x: direction > 0 ? '8%' : '-8%',
              opacity: 0,
              scale: 0.98,
              filter: 'blur(6px)',
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              x: direction > 0 ? '-12%' : '12%',
              opacity: 0,
              scale: 0.94,
              filter: 'blur(8px)',
              transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
            }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 200,
              mass: 0.9,
            }}
            className="absolute inset-0 mx-auto flex max-w-[1180px] flex-col"
            style={{ padding: 'inherit' }}
          >
            <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-foreground/10 bg-card/60 shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_24px_60px_-24px_hsl(var(--foreground)/0.18)] backdrop-blur-sm md:overflow-hidden">
              {children(activeId, direction)}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------------- Scroll Rail (right edge) ---------------- */

function ScrollRail({
  sections,
  activeIndex,
  total,
}: {
  sections: SectionDef[];
  activeIndex: number;
  total: number;
}) {
  const progress = useSpring(activeIndex / (total - 1), {
    damping: 30,
    stiffness: 200,
  });
  useEffect(() => {
    progress.set(activeIndex / (total - 1));
  }, [activeIndex, total, progress]);
  const y = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      <div className="relative h-40 w-px bg-foreground/10">
        <motion.div
          className="absolute left-0 top-0 w-px bg-accent"
          style={{ height: y }}
        />
      </div>
      <span className="mono-label text-[9px] text-muted-foreground [writing-mode:vertical-rl]">
        {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}
