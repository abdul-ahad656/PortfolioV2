'use client';

import { DeckShell, type SectionDef } from '@/components/deck-shell';
import { CursorTrailer } from '@/components/cursor-trailer';
import { Hero } from '@/components/sections/hero';
import { Arsenal } from '@/components/sections/arsenal';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';

const sections: SectionDef[] = [
  { id: 'hero', index: '01', label: 'Introduction', title: 'Abdul Ahad' },
  { id: 'arsenal', index: '02', label: 'Technical Arsenal', title: 'Skills Matrix' },
  { id: 'projects', index: '03', label: 'Featured Projects', title: 'Selected Work' },
  { id: 'experience', index: '04', label: 'Experience', title: 'Timeline' },
  { id: 'contact', index: '05', label: 'Contact', title: 'Direct Line' },
];

export default function Home() {
  return (
    <>
      <CursorTrailer />
      <DeckShell sections={sections}>
        {(activeId) => {
          switch (activeId) {
            case 'hero':
              return <Hero />;
            case 'arsenal':
              return <Arsenal />;
            case 'projects':
              return <Projects />;
            case 'experience':
              return <Experience />;
            case 'contact':
              return <Contact />;
            default:
              return null;
          }
        }}
      </DeckShell>
    </>
  );
}
