import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  X,
  ExternalLink,
  GitBranch,
  Mail,
  FileText,
  Layers,
  Sparkles,
  Check,
  Briefcase,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioContent, type ProjectCaseStudy } from '../data/content';

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

  // Custom dual-dot cursor matching reference
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
      label: "Satya's Education (Case Study & Live Demo)",
      description: 'React · TypeScript · Django · Firebase · Cashfree · Vercel',
      category: 'Flagship Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[0]);
      },
    },
    {
      label: 'Alex AI Mock Technical Interviewer',
      description: 'React · TypeScript · Express · Google Gemini · Firebase',
      category: 'Flagship Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[1]);
      },
    },
    {
      label: 'AI Voice Task Planner (n8n + Vapi + Gemini)',
      description: 'Voice request → Vapi → n8n automation → Gemini → Google Sheets',
      category: 'Flagship Project',
      action: () => {
        setSearchOpen(false);
        setActiveProjectModal(projects[2]);
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
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-7 h-7 rounded-full border border-white/80 bg-white/10" />
      </div>
      <div
        ref={cursorInnerRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Cmd+K Search Command Palette Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search portfolio command palette"
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-[9995] flex items-start justify-center bg-black/75 backdrop-blur-md pt-[12vh] px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-[#a78bfa]/30 bg-[#0d0a16] shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-[#a78bfa] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, experience, or actions..."
                className="w-full bg-transparent text-sm text-white placeholder:text-[#7a7a7a] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/70 hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
              {filteredItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="w-full flex items-center justify-between gap-4 px-3.5 py-3 text-left rounded-xl hover:bg-[#1a1428] transition-colors group"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white group-hover:text-[#c4b5fd] truncate">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#8a86a0] truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a78bfa] shrink-0">
                    {item.category} →
                  </span>
                </button>
              ))}
            </div>

            <div className="px-4 py-2.5 bg-[#08060e] border-t border-white/10 flex items-center justify-between text-[11px] text-[#7a7a7a] font-mono">
              <span>Tarun Pediredla · Command Palette</span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Rich Project Case Study Detail Modal (Matching reference project-modal) */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setActiveProjectModal(null)}
          className="fixed inset-0 z-[9992] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-[22px] overflow-hidden border border-[#a78bfa]/30 bg-[#0a0814] shadow-[0_32px_90px_rgba(0,0,0,0.9)] my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveProjectModal(null)}
              aria-label="Close project detail modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 border border-white/15 text-white/80 hover:text-white hover:border-[#a78bfa]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Artwork Banner */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: '220px',
                background: 'linear-gradient(180deg, #1e1b4b 0%, #3b0764 50%, #0a0814 100%)',
                borderBottom: '1px solid rgba(167,139,250,0.15)',
              }}
            >
              <img
                src={activeProjectModal.heroImage}
                alt={activeProjectModal.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,6,18,0.1) 25%, rgba(10,8,20,0.95) 100%)',
                }}
              />
              <span
                className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-[0.22em] text-white/90 rounded-full px-3 py-[5px]"
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                Case Study {activeProjectModal.index}
              </span>
              <span
                className="absolute top-5 right-16 text-[10px] font-mono uppercase tracking-[0.22em] text-[#d8c9ff] rounded-full px-3 py-[5px]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(58,38,108,0.85) 0%, rgba(31,18,58,0.85) 100%)',
                  border: '1px solid rgba(167,139,250,0.45)',
                }}
              >
                ★ Featured
              </span>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-9 space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.26em] text-[#8a86a0] mb-2">
                  <span>Verified Repository</span>
                  <span
                    aria-hidden="true"
                    className="w-1 h-1 rounded-full bg-[#a78bfa]"
                  />
                  <span>{activeProjectModal.subtitle}</span>
                </div>

                <h2
                  id="project-modal-title"
                  className="font-bold tracking-tight text-2xl sm:text-3xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(92deg, #ffffff 0%, #d8c9ff 55%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {activeProjectModal.title}
                </h2>
                <p className="mt-3 text-sm text-[#e8e6f5]/90 leading-relaxed">
                  {activeProjectModal.description}
                </p>
              </div>

              {/* Problem & Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4b5fd]">
                    Problem Statement
                  </div>
                  <p className="text-xs text-[#d4d0e8] leading-relaxed">
                    {activeProjectModal.problemStatement}
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c4b5fd]">
                    Architecture Overview
                  </div>
                  <p className="text-xs text-[#d4d0e8] leading-relaxed">
                    {activeProjectModal.architectureOverview}
                  </p>
                </div>
              </div>

              {/* Visual System Architecture Flow */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-[#a78bfa]/60" />
                  <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-[#8a86a0]">
                    System Architecture Pipeline
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeProjectModal.architectureFlow.map((node) => (
                    <div
                      key={node.step}
                      className="rounded-xl bg-[#130f24] border border-[#a78bfa]/20 p-3 space-y-1"
                    >
                      <div className="text-[10px] font-mono text-[#c4b5fd]">
                        Step {node.step} · {node.node}
                      </div>
                      <p className="text-[11px] text-[#b8b3cc] leading-snug">
                        {node.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implemented Features Checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-[#a78bfa]/60" />
                  <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-[#8a86a0]">
                    Implemented Repository Features
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProjectModal.implementedFeatures.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs text-[#dcd9ee] leading-snug"
                    >
                      <span className="w-4 h-4 rounded-full shrink-0 mt-0.5 bg-[#a78bfa]/20 border border-[#a78bfa]/40 inline-flex items-center justify-center text-[#c4b5fd]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scope Notes */}
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3.5 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300">
                  Repository &amp; Runtime Scope Notes
                </div>
                {activeProjectModal.plannedOrPartialFeatures.map((note) => (
                  <p key={note} className="text-xs text-amber-100/80 leading-relaxed">
                    • {note}
                  </p>
                ))}
              </div>

              {/* Tech Stack & Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium text-[#e8e6f5] px-3 py-1 rounded-full bg-[#1e1736] border border-[#a78bfa]/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeProjectModal.liveUrl && (
                    <a
                      href={activeProjectModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#0a0814] bg-gradient-to-b from-[#fef3c7] to-[#fbbf24] hover:-translate-y-0.5 transition-transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0814]" />
                      <span>Visit Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#0a0814] bg-gradient-to-b from-[#f5f0ff] to-[#c4b5fd] hover:-translate-y-0.5 transition-transform"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
