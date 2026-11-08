import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  X,
  GitBranch,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioContent, type ProjectCaseStudy } from '../data/content';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

interface GlobalOverlaysProps {
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeProjectModal: ProjectCaseStudy | null;
  setActiveProjectModal: (proj: ProjectCaseStudy | null) => void;
  onOpenResume: () => void;
}

export const GlobalOverlays: React.FC<GlobalOverlaysProps> = ({
  searchOpen,
  setSearchOpen,
  activeProjectModal,
  setActiveProjectModal,
  onOpenResume,
}) => {
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');

  // Custom dual-dot cursor
  useEffect(() => {
    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;
    if (!outer || !inner) return;

    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      outerX += (mouseX - outerX) * 0.18;
      outerY += (mouseY - outerY) * 0.18;
      outer.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        if (activeProjectModal) setActiveProjectModal(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, activeProjectModal, setSearchOpen, setActiveProjectModal]);

  const { profile, projects } = portfolioContent;

  const searchItems = [
    {
      label: 'InsureSphere AI (Flagship · Enterprise SaaS & Reinsurance Platform)',
      description:
        'React.js · Python · Django REST Framework · PostgreSQL · Quota-Share Treaties · Claims AI',
      category: '★ Flagship Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[0]);
      },
    },
    {
      label: "Satya's Education (Case Study & Live Demo)",
      description: 'React · JavaScript · Django · Firebase · Cashfree · Vercel',
      category: 'Featured Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[1]);
      },
    },
    {
      label: 'Alex AI Mock Technical Interviewer',
      description: 'React · JavaScript · Express · Google Gemini · Firebase',
      category: 'Featured Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[2]);
      },
    },
    {
      label: 'AI Voice Task Planner (n8n + Vapi + Gemini)',
      description: 'Voice request → Vapi → n8n automation → Gemini → Google Sheets',
      category: 'Featured Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[3]);
      },
    },
    {
      label: 'Who I Am & Engineering Mission',
      description: 'Jump to Chapter 01 Flow Sections',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Professional Journey & Education',
      description: 'Finite HR & IT Solution · CP Academy · Saras India Systems · GVP College',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Chapter 02 — The Showcase',
      description: 'Building products with intelligence',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Ch · 04 — Field of Stills & 3D Carousel',
      description: '3D perspective gallery with floor reflections',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Flagship Projects Directory',
      description: 'Interactive hover-preview project index',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('flagship')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'View & Download Resume (CV)',
      description: 'Tarun Pediredla — Full Stack Python & AI Developer',
      category: 'Action',
      action: () => {
        setSearchOpen(false);
        onOpenResume();
      },
    },
    {
      label: 'GitHub (@tarunpediredla-GenAi)',
      description: profile.github,
      category: 'External',
      action: () => {
        setSearchOpen(false);
        window.open(profile.github, '_blank', 'noopener,noreferrer');
      },
    },
    {
      label: 'Email Tarun Pediredla',
      description: profile.email,
      category: 'Contact',
      action: () => {
        setSearchOpen(false);
        window.location.href = `mailto:${profile.email}`;
      },
    },
    {
      label: 'Holographic Contact Card',
      description: 'Jump to #contact section',
      category: 'Navigation',
      action: () => {
        setSearchOpen(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Film Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom Cursor (Desktop Only) */}
      <div
        ref={cursorOuterRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-7 h-7 rounded-full border border-[#5E1726]/65 bg-[#5E1726]/10" />
      </div>
      <div
        ref={cursorInnerRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#5E1726]" />
      </div>

      {/* Cmd+K Search Command Palette Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio command palette"
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-[9995] flex items-start justify-center bg-[#232B27]/65 backdrop-blur-md pt-[12vh] px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border-2 border-[#687A70]/50 bg-[#FAF7F2] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#687A70]/35 bg-[#EFE8DA]">
              <Search className="w-4 h-4 text-[#5E1726] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, experience, or actions..."
                className="w-full bg-transparent text-sm text-[#232B27] placeholder:text-[#687A70] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#DCE3DF] text-[#232B27] hover:bg-[#5E1726] hover:text-[#F6F1E7]"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#687A70]/20">
              {filteredItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="w-full flex items-center justify-between gap-4 px-3.5 py-3 text-left rounded-xl hover:bg-[#E6ECE8] transition-colors group"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#232B27] group-hover:text-[#5E1726] truncate">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#35423C] truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5E1726] shrink-0">
                    {item.category} →
                  </span>
                </button>
              ))}
            </div>

            <div className="px-4 py-2.5 bg-[#EFE8DA] border-t border-[#687A70]/35 flex items-center justify-between text-[11px] text-[#35423C] font-mono">
              <span>Tarun Pediredla · Command Palette</span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Rich Project Case Study Detail Modal */}
      <ProjectCaseStudyModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </>
  );
};
