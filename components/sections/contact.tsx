'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/magnetic';
import { SectionHeader } from '@/components/section-header';

const EMAIL = 'buttabdul.ahad029@gmail.com';
const PHONE = '+92 314 4828190';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <SectionHeader index="05" title="Contact" subtitle="Direct Line" />

      <div className="flex flex-col justify-between px-6 py-8 md:px-12 md:py-12">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-tight text-balance"
          >
            Let&apos;s build something
            <span className="block text-accent">that ships.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground"
          >
            Open to global remote roles, contract work, and ambitious AI
            engineering projects. Reply within 24 hours.
          </motion.p>
        </div>

        {/* Terminal-style contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 24, stiffness: 180 }}
          className="mt-10 overflow-hidden rounded-xl border border-foreground/15 bg-foreground/[0.02]"
        >
          <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="mono-label ml-2 text-muted-foreground">
              contact — bash
            </span>
          </div>

          <div className="space-y-px bg-foreground/[0.04]">
            <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={EMAIL}>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy Email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>
            </ContactRow>

            <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={PHONE}>
              <Magnetic strength={0.3} href={`tel:${PHONE.replace(/\s/g, '')}`}>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-foreground/30">
                  Call <ArrowUpRight className="h-3 w-3" />
                </span>
              </Magnetic>
            </ContactRow>

            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value="Lahore, Pakistan — Open to Global Remote"
            />
          </div>
        </motion.div>

        {/* Footer line */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-5">
          <span className="mono-label text-muted-foreground">
            © 2026 Abdul Ahad · All systems shipped
          </span>
          <span className="mono-label text-muted-foreground">
            Built with Next.js · Framer Motion
          </span>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 bg-card px-4 py-4 md:px-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-foreground/10 text-muted-foreground">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="mono-label text-muted-foreground">{label}</div>
        <div className="mt-0.5 truncate text-[15px] font-medium tracking-tight">
          {value}
        </div>
      </div>
      {children}
    </div>
  );
}
