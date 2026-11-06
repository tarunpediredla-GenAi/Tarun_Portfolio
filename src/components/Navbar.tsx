import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioContent } from '../data/content';
import {
  stageStore,
  subscribeStageStore,
  setManualChapterOverride,
} from '../hero/v2/beat';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About', chapterIdx: 1 },
  { id: 'journey', label: 'Journey', chapterIdx: 2 },
  { id: 'technologies', label: 'Technologies', chapterIdx: 3 },
  { id: 'projects', label: 'Projects', chapterIdx: 4 },
  { id: 'contact', label: 'Contact', chapterIdx: 5 },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [activeId, setActiveId] = useState<string>(stageStore.activeChapterId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return subscribeStageStore(() => {
      setActiveId(stageStore.activeChapterId);
    });
  }, []);

  const handleNavClick = (id: string) => {
    setManualChapterOverride(null);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-800/80 bg-[#050811]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-display text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          {portfolioContent.profile.name}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-cyan-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            Download Resume
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-200 hover:border-cyan-400"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-800 bg-[#070c18] px-6 py-4 space-y-2"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
};
