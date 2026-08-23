'use client';

import {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/magnetic';
import { NavContext } from '@/components/nav-context';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export interface SectionDef {
  id: string;
  index: string;
  label: string;
  title: string;
}

interface DeckShellProps {
  sections: SectionDef[];
  children: (sectionId: string) => ReactNode;
}

const springSoft = { damping: 30, stiffness: 220, mass: 0.8 };

export function DeckShell({ sections, children }: DeckShellProps) {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  }, []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Track active section while scrolling
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id);
        },
        { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <NavContext.Provider
      value={{
        navigate: goTo,
        openSidebar,
        closeSidebar,
        sidebarOpen,
      }}
    >
      <div className="relative min-h-screen w-full bg-background grain">
        <NavPill onOpen={openSidebar} />

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                onClick={closeSidebar}
                aria-hidden
              />
              <Sidebar
                sections={sections}
                activeId={activeId}
                onNavigate={goTo}
                onClose={closeSidebar}
              />
            </>
          )}
        </AnimatePresence>

        <main className="relative w-full">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className={cn(
                s.id === 'hero'
                  ? 'relative min-h-screen'
                  : 'relative min-h-screen px-4 py-16 md:px-8 md:py-20'
              )}
            >
              {s.id === 'hero' ? (
                children(s.id)
              ) : (
                <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1180px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card/60 shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_24px_60px_-24px_hsl(var(--foreground)/0.18)] backdrop-blur-sm">
                  {children(s.id)}
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </NavContext.Provider>
  );
}

/* ---------------- Top Nav Pill ---------------- */

function NavPill({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed left-5 top-5 z-50 md:left-8 md:top-8">
      <div className="flex items-center gap-3 rounded-full border border-foreground/10 bg-background/70 py-1.5 pl-1.5 pr-4 shadow-lg backdrop-blur-xl">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-secondary">
          <Image
            src="/portrait.jpeg"
            alt="Abdul Ahad"
            fill
            className="object-cover"
            priority
          />
        </div>
        <span className="text-[14px] font-semibold tracking-tight">
          Abdul Ahad
        </span>
        <button
          onClick={onOpen}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({
  sections,
  activeId,
  onNavigate,
  onClose,
}: {
  sections: SectionDef[];
  activeId: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.aside
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="fixed left-0 top-0 z-[70] flex h-screen w-[clamp(280px,85vw,360px)] flex-col border-r border-foreground/10 bg-background/95 backdrop-blur-xl"
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 pt-7 pb-4">
        <Magnetic strength={0.2}>
          <button
            onClick={() => onNavigate('hero')}
            className="group text-left"
          >
            <div className="mono-label text-muted-foreground">Portfolio / 2026</div>
            <div className="mt-1.5 font-display text-[26px] leading-none tracking-tight">
              Abdul Ahad
            </div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              AI Engineer · Full Stack
            </div>
          </button>
        </Magnetic>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3">
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

      {/* Footer */}
      <div className="border-t border-foreground/10 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
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
    </motion.aside>
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
    <Magnetic strength={0.4} href={href} cursorLabel={label}>
      <span
        aria-label={label}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-accent"
      >
        {children}
      </span>
    </Magnetic>
  );
}
