import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Folder,
  FileCode2,
  ChevronRight,
  Search,
  Sparkles,
  ExternalLink,
  Briefcase,
  Layers,
  Code2,
  ArrowDown,
} from 'lucide-react';
import { portfolioContent, type ProjectCaseStudy } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface IdeHeroSectionProps {
  onOpenSearch: () => void;
  onSelectProject: (proj: ProjectCaseStudy) => void;
  onOpenResume: () => void;
}

interface ExplorerFile {
  id: string;
  name: string;
  folder: string;
  url: string;
  lines: string[];
}

const EXPLORER_FILES: ExplorerFile[] = [
  {
    id: 'components/Hero.tsx',
    name: 'Hero.tsx',
    folder: 'components',
    url: 'tarunpediredla.dev/developer.ts',
    lines: [
      'const developer = {',
      '  name: "Tarun Pediredla",',
      '  role: "Full Stack Python Developer | Generative AI & Agentic AI",',
      '  location: "Visakhapatnam, India",',
      '  skills: ["Python", "Django", "React.js", "TypeScript", "Gemini", "n8n", "Vapi", "Docker"],',
      '  focus: "Building intelligent web applications & AI-powered automations",',
      '  email: "tarunpediredla9966@gmail.com",',
      '};',
      '',
      "// Let's build something extraordinary",
    ],
  },
  {
    id: 'components/CareerTimeline.tsx',
    name: 'CareerTimeline.tsx',
    folder: 'components',
    url: 'tarunpediredla.dev/experience.ts',
    lines: [
      'export const careerTimeline = [',
      '  { company: "Finite HR & IT Solution", role: "Full Stack Python Developer", period: "1 Apr 2025 – Present" },',
      '  { company: "CP Academy", role: "Full Stack Python Developer", period: "Duration: 9 months" },',
      '  { company: "Saras India Systems Pvt Ltd", role: "Frontend Developer", period: "May 2022 – 10 Jul 2024" },',
      '  { education: "B.Sc. Computer Science — Gayatri Vidya Parishad College (Completed Aug 2021)" },',
      '];',
    ],
  },
  {
    id: 'components/ProjectCard.tsx',
    name: 'ProjectCard.tsx',
    folder: 'components',
    url: 'tarunpediredla.dev/projects.ts',
    lines: [
      'export const featuredProjects = [',
      '  { name: "Satya\'s Education", stack: ["React", "TypeScript", "Django", "Firebase", "Cashfree", "Vercel"] },',
      '  { name: "Alex AI Mock Interviewer", stack: ["React", "TypeScript", "Express", "Gemini", "Firebase"] },',
      '  { name: "AI Voice Task Planner", stack: ["n8n", "Vapi", "Google Gemini", "Google Sheets", "Webhooks"] },',
      '];',
    ],
  },
  {
    id: 'components/Footer.tsx',
    name: 'Footer.tsx',
    folder: 'components',
    url: 'tarunpediredla.dev/contact.ts',
    lines: [
      'export const contactChannels = {',
      '  email: "tarunpediredla9966@gmail.com",',
      '  phone: "+91 8074080773",',
      '  github: "https://github.com/tarunpediredla-GenAi",',
      '  location: "Visakhapatnam, India",',
      '};',
    ],
  },
  {
    id: 'hooks/useScroll.ts',
    name: 'useScroll.ts',
    folder: 'hooks',
    url: 'tarunpediredla.dev/hooks/useScroll.ts',
    lines: [
      'import gsap from "gsap";',
      'import { ScrollTrigger } from "gsap/ScrollTrigger";',
      '// Smooth 60fps scroll-driven 3D perspective & curtain choreography',
      'gsap.registerPlugin(ScrollTrigger);',
    ],
  },
  {
    id: 'hooks/useMouse.ts',
    name: 'useMouse.ts',
    folder: 'hooks',
    url: 'tarunpediredla.dev/hooks/useMouse.ts',
    lines: [
      '// Tracks normalized pointer coordinates for 3D holographic tilt & spotlight',
      'export const updatePointer = (x: number, y: number) => ({ x, y });',
    ],
  },
];

const DAILY_DRIVER_BADGES = [
  { label: 'Python', color: '#3776AB' },
  { label: 'Django', color: '#10b981' },
  { label: 'React.js', color: '#61DAFB' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'Google Gemini', color: '#a78bfa' },
  { label: 'n8n', color: '#EA4B71' },
  { label: 'Vapi Voice AI', color: '#22d3ee' },
  { label: 'PostgreSQL', color: '#60a5fa' },
  { label: 'MySQL', color: '#f59e0b' },
  { label: 'Firestore', color: '#fbbf24' },
  { label: 'Express', color: '#e2e8f0' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'CI/CD', color: '#c084fc' },
  { label: 'Vercel', color: '#ffffff' },
];

export const IdeHeroSection: React.FC<IdeHeroSectionProps> = ({
  onOpenSearch,
  onSelectProject,
  onOpenResume,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const frameOuterRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [activeFileId, setActiveFileId] = useState<string>('components/Hero.tsx');
  const [typedName, setTypedName] = useState<string>('');
  const [clockText, setClockText] = useState<string>('');
  const [macMenuOpen, setMacMenuOpen] = useState<string | null>(null);

  const fullName = portfolioContent.profile.name; // "Tarun Pediredla"
  const activeFile =
    EXPLORER_FILES.find((f) => f.id === activeFileId) ?? EXPLORER_FILES[0];

  // Typewriter effect for "Tarun Pediredla"
  useEffect(() => {
    let idx = 0;
    const timer = window.setInterval(() => {
      idx += 1;
      setTypedName(fullName.slice(0, idx));
      if (idx >= fullName.length) {
        window.clearInterval(timer);
      }
    }, 110);
    return () => window.clearInterval(timer);
  }, [fullName]);

  // Live macOS menu clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    updateClock();
    const id = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(id);
  }, []);

  // GSAP FrameToFullscreen + ScrollFloat "Come Alive" animation matching reference
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const titleWrap = titleWrapRef.current;
    const frameOuter = frameOuterRef.current;
    if (!section || !sticky || !frameOuter || !titleWrap) return;

    const ctx = gsap.context(() => {
      const chars = charsRef.current.filter(Boolean);

      gsap.set(chars, {
        yPercent: 120,
        opacity: 0,
        scaleX: 0.7,
        scaleY: 2.3,
        transformOrigin: '50% 0%',
      });

      gsap.set(frameOuter, {
        scaleX: 0.74,
        scaleY: 0.72,
        yPercent: 18,
        rotateX: 18,
        borderRadius: 24,
        borderWidth: 4,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 -> 0.35): "Come Alive" characters float into place
      tl.to(
        chars,
        {
          yPercent: 0,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          stagger: 0.025,
          duration: 0.35,
          ease: 'back.out(1.6)',
        },
        0
      );

      // Phase 2 (0.25 -> 0.85): Title fades up while 3D VS Code window zooms to fullscreen
      tl.to(
        titleWrap,
        {
          yPercent: -65,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.28
      );

      tl.to(
        frameOuter,
        {
          scaleX: 1,
          scaleY: 1,
          yPercent: 0,
          rotateX: 0,
          borderRadius: 0,
          borderWidth: 0,
          duration: 0.65,
          ease: 'power3.inOut',
        },
        0.22
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const comeAliveChars = 'Come Alive'.split('');
  const { projects, profile } = portfolioContent;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808]"
      style={{ height: '340vh' }}
    >
      <div
        ref={stickyRef}
        className="relative w-full h-screen overflow-hidden flex items-end justify-center"
        style={{
          perspective: '1600px',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top Floating Title ("Crafting digital experiences that Come Alive") */}
        <div
          ref={titleWrapRef}
          className="absolute top-[7vh] left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-4 text-center pointer-events-none"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mt-[2vh]">
            Crafting digital experiences that <br />
            <span
              className="inline-block font-bold tracking-tight text-white mt-4"
              style={{ fontSize: 'clamp(3.8rem, 9.5vw, 9rem)', lineHeight: 1 }}
            >
              {comeAliveChars.map((ch, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    charsRef.current[idx] = el;
                  }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* 3D Tilted Frame -> Fullscreen macOS + VS Code Portfolio IDE */}
        <div
          ref={frameOuterRef}
          className="absolute left-0 bottom-0 bg-[#222222] border-[#6C6C6C] shadow-2xl overflow-hidden"
          style={{
            width: '100vw',
            height: '100vh',
            borderStyle: 'solid',
            boxShadow:
              '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
            willChange: 'transform, borderRadius',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-full h-full bg-[#0a0a0a] text-[#cccccc] flex flex-col overflow-hidden">
            {/* 1. macOS Top Glass Menu Bar */}
            <div
              className="shrink-0 backdrop-blur-md flex items-center justify-between px-4 sm:px-7 relative z-30"
              style={{
                height: '36px',
                background: 'rgba(40, 40, 40, 0.65)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.10)',
              }}
            >
              <div className="flex items-center gap-4 sm:gap-5 text-xs text-white/90">
                {/* Apple Logo */}
                <button
                  type="button"
                  onClick={() =>
                    setMacMenuOpen((prev) => (prev === 'apple' ? null : 'apple'))
                  }
                  className="font-bold text-white hover:opacity-80 cursor-pointer"
                >
                  
                </button>
                <span className="font-semibold text-white">Portfolio</span>
                <div className="hidden md:flex items-center gap-4 text-white/75">
                  {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setMacMenuOpen((prev) => (prev === item ? null : item))
                      }
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* macOS Dropdown Menu */}
              {macMenuOpen && (
                <div
                  onMouseLeave={() => setMacMenuOpen(null)}
                  className="absolute left-6 top-9 z-50 w-56 rounded-xl border border-white/20 bg-[#222222]/95 backdrop-blur-md p-1.5 text-xs text-white shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMacMenuOpen(null);
                      onOpenSearch();
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10"
                  >
                    <span>Command Palette…</span>
                    <span className="font-mono text-white/50">⌘K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMacMenuOpen(null);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10"
                  >
                    <span>Download Resume</span>
                    <span className="font-mono text-white/50">⌘R</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMacMenuOpen(null);
                      document
                        .getElementById('showcase')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10"
                  >
                    <span>Go to Showcase</span>
                    <span className="font-mono text-white/50">⌘P</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4 text-[11px] text-white/80 font-mono">
                <span className="hidden sm:inline text-[#a78bfa]">
                  Visakhapatnam · IST
                </span>
                <span>{clockText}</span>
              </div>
            </div>

            {/* 2. VS Code Window Header & Search Bar */}
            <div className="flex items-center h-[38px] px-4 bg-[#0a0a0a] border-b border-[#1a1a1a] shrink-0 gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="flex-1 max-w-[420px] mx-auto h-[24px] flex items-center">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="w-full h-full flex items-center gap-2 px-3 rounded-[5px] text-[11px] text-[#bdbdbd] bg-[#161616] border border-[#222] hover:border-[#a78bfa]/50 hover:bg-[#1a1424] hover:text-white transition-colors cursor-pointer"
                >
                  <Search className="w-3 h-3 text-[#a78bfa]" />
                  <span className="truncate">Search portfolio… (Tarun Pediredla)</span>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-[#7a7a7a]">
                    <kbd className="px-1 py-px rounded-[3px] bg-[#0d0a14] border border-[#2a2240] font-mono">
                      ⌘
                    </kbd>
                    <kbd className="px-1 py-px rounded-[3px] bg-[#0d0a14] border border-[#2a2240] font-mono">
                      K
                    </kbd>
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#7a7a7a]">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span>3 Repos Verified</span>
              </div>
            </div>

            {/* 3. Main IDE 3-Pane Body */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {/* Left Activity Bar (44px) */}
              <div className="hidden sm:flex w-[44px] bg-[#0a0a0a] border-r border-[#1a1a1a] flex-col items-center py-2 shrink-0 text-[#6f6f6f]">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  title="Explorer"
                  className="relative w-full flex justify-center py-2.5 text-white border-l-2 border-[#a78bfa]"
                >
                  <Folder className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenSearch}
                  title="Search (⌘K)"
                  className="py-2.5 hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('showcase')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  title="Featured Projects"
                  className="py-2.5 text-[#f59e0b] hover:opacity-80 transition-opacity"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenResume}
                  title="Resume"
                  className="py-2.5 hover:text-white transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                </button>

                <div className="mt-auto flex flex-col items-center gap-3 pb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6366f1] flex items-center justify-center text-[10px] font-bold text-white">
                    TP
                  </div>
                </div>
              </div>

              {/* Left File Explorer Sidebar (210px) */}
              <div className="hidden lg:flex w-[210px] bg-[#0a0a0a] border-r border-[#1a1a1a] shrink-0 flex-col">
                <div className="flex items-center justify-between px-3 pt-3 pb-2">
                  <span className="text-[11px] tracking-[0.12em] text-[#9a9a9a]">
                    EXPLORER
                  </span>
                  <span className="text-[#6f6f6f]">⋯</span>
                </div>

                <div className="px-2 flex-1 overflow-y-auto">
                  <div className="flex items-center px-1 py-[3px] text-[11px] text-[#cfcfcf] font-medium">
                    <ChevronRight className="w-3 h-3 mr-1 rotate-90 text-[#9a9a9a]" />
                    <span>PORTFOLIO.TARUN</span>
                  </div>

                  <div
                    role="tree"
                    aria-label="Portfolio file explorer"
                    className="font-mono text-[#cfcfcf] mt-1 pb-2 space-y-0.5"
                  >
                    {['components', 'hooks'].map((folderName) => (
                      <div key={folderName} className="select-none">
                        <div className="flex items-center gap-1.5 py-[3px] px-2 text-[11px] text-[#9a9a9a]">
                          <ChevronRight className="w-3 h-3 rotate-90" />
                          <Folder className="w-3.5 h-3.5 text-[#a78bfa]" />
                          <span>{folderName}</span>
                        </div>
                        <div className="pl-4 space-y-0.5">
                          {EXPLORER_FILES.filter((f) => f.folder === folderName).map(
                            (file) => {
                              const isSelected = activeFileId === file.id;
                              return (
                                <button
                                  key={file.id}
                                  type="button"
                                  onClick={() => setActiveFileId(file.id)}
                                  className={`w-full flex items-center gap-1.5 py-[4px] px-2 rounded-[4px] text-left text-[11.5px] transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#1a1428] text-white shadow-[inset_2px_0_0_0_#a78bfa]'
                                      : 'text-[#bfbfbf] hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <FileCode2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                                  <span className="truncate">{file.name}</span>
                                  {isSelected && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_#a78bfa]" />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-2 border-t border-[#161616] text-[10px] tracking-[0.12em] text-[#9a9a9a] flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  <span>OUTLINE · 6 CHAPTERS</span>
                </div>
                <div className="px-3 py-2 border-t border-[#161616] text-[10px] tracking-[0.12em] text-[#9a9a9a] flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  <span>TIMELINE · 2022–2026</span>
                </div>
              </div>

              {/* Center Welcome & Code Editor Canvas */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0d]">
                {/* Editor Tab Bar */}
                <div className="h-[30px] bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center text-[11px] shrink-0 overflow-x-auto">
                  <div className="h-full flex items-center gap-2 px-3 bg-[#0d0d0d] border-r border-[#1a1a1a] text-white">
                    <Code2 className="w-3.5 h-3.5 text-[#519aba]" />
                    <span>Welcome — {activeFile.name}</span>
                  </div>
                </div>

                {/* Editor Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 pt-10 pb-12 min-w-0">
                  <p className="text-lg sm:text-[22px] text-[#cfcfcf] mb-1">
                    Hi, I&apos;m
                  </p>

                  {/* Giant Gradient Typewriter Name */}
                  <h2
                    className="font-bold tracking-tight leading-[1.05] mb-4"
                    style={{ fontSize: 'clamp(2.6rem, 5.8vw, 5.75rem)' }}
                  >
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, #a78bfa 0%, #c4b5fd 50%, #f0abfc 100%)',
                      }}
                    >
                      {typedName || fullName}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block align-middle animate-pulse"
                      style={{
                        width: '4px',
                        height: '0.78em',
                        marginLeft: '8px',
                        marginBottom: '-0.08em',
                        borderRadius: '2px',
                        background:
                          'linear-gradient(180deg, #f5f0ff 0%, #a78bfa 60%, #7c3aed 100%)',
                        boxShadow:
                          '0 0 18px rgba(167,139,250,0.7), 0 0 38px rgba(167,139,250,0.3)',
                      }}
                    />
                  </h2>

                  <div className="flex flex-wrap items-center text-sm sm:text-[15px] text-[#cfcfcf] gap-2 mb-1">
                    <span className="text-[#a78bfa] font-medium">
                      Full Stack Python Developer
                    </span>
                    <span className="text-[#6f6f6f]">•</span>
                    <span>Generative AI &amp; Agentic AI</span>
                  </div>
                  <p className="text-xs sm:text-[14px] text-[#9a9a9a] max-w-[640px] mb-7">
                    {profile.tagline}
                  </p>

                  {/* Browser / Code Preview Window (`tarunpediredla.dev/developer.ts`) */}
                  <div className="rounded-xl border border-[#222222] bg-[#070707] overflow-hidden mb-8 max-w-[820px] shadow-xl">
                    <div className="h-8 px-3.5 bg-[#121212] border-b border-[#1f1f1f] flex items-center justify-between text-[11px] text-[#8a8a8a] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                      </div>
                      <span className="text-[#bdbdbd]">{activeFile.url}</span>
                      <span className="text-[#a78bfa]">TS</span>
                    </div>
                    <pre className="p-5 sm:p-7 leading-[1.9] overflow-x-auto font-mono text-xs sm:text-[13px] text-[#e2e8f0]">
                      {activeFile.lines.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <span className="text-[#4b5563] select-none w-5 text-right shrink-0 tabular-nums">
                            {idx + 1}
                          </span>
                          <span
                            className={
                              line.startsWith('//')
                                ? 'text-[#6b7280] italic'
                                : line.includes(':')
                                ? 'text-[#c4b5fd]'
                                : 'text-[#f8fafc]'
                            }
                          >
                            {line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </div>

                  {/* Spinning Conic-Gradient Action Buttons matching H() component */}
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById('showcase')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="group relative inline-flex items-center justify-center h-11 px-7 rounded-[11px] overflow-hidden cursor-pointer isolate shadow-[0_10px_30px_-14px_rgba(0,0,0,0.7),0_0_0_1px_rgba(167,139,250,0.2)] hover:shadow-[0_22px_60px_-14px_rgba(167,139,250,0.55)] transition-all"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-[1.5px] rounded-[9.5px] bg-[#120d24] border border-[#a78bfa]/40"
                      />
                      <span className="relative flex items-center gap-2 text-sm font-medium text-[#f5f0ff]">
                        <span>Explore My Work</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#d8b4fe]" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenResume}
                      className="group relative inline-flex items-center justify-center h-11 px-7 rounded-[11px] overflow-hidden cursor-pointer isolate bg-[#141418] border border-white/15 hover:border-[#a78bfa]/50 text-sm font-medium text-white transition-all"
                    >
                      <span>Download Resume</span>
                    </button>

                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[11px] bg-[#0f0f12] border border-white/10 hover:border-white/30 text-xs font-mono text-[#cfcfcf] hover:text-white transition-colors"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Scroll to Explore Shimmer & Beam */}
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <span className="text-[10px] font-semibold tracking-[0.42em] uppercase vp-scroll-shimmer">
                      Scroll to Explore
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative w-px h-8 overflow-hidden bg-[#a78bfa]/15"
                    >
                      <span
                        className="absolute top-0 left-0 w-full h-2/5 vp-scroll-beam"
                        style={{
                          background:
                            'linear-gradient(180deg, transparent 0%, #a78bfa 50%, transparent 100%)',
                        }}
                      />
                    </span>
                    <ArrowDown className="w-3.5 h-3.5 text-[#c4b5fd] vp-scroll-chevron" />
                  </div>
                </div>
              </div>

              {/* Right Dashboard Sidebar (400px) matching reference */}
              <aside
                className="hidden xl:block w-[390px] bg-[#0a0a0a] border-l border-[#1a1a1a] shrink-0 overflow-y-auto"
                style={{ padding: '32px 26px' }}
              >
                <div className="flex flex-col gap-9">
                  {/* CURRENT STATUS */}
                  <section>
                    <div className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase mb-3">
                      CURRENT STATUS
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="group relative block overflow-hidden rounded-[16px] border border-[#1a1a1a] hover:border-[#a78bfa]/35 transition-all p-5"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(20,17,30,0.7) 0%, rgba(10,8,16,0.85) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                          <span className="text-[13px] text-white font-medium">
                            Available for work
                          </span>
                        </div>
                        <span className="text-[9px] tracking-[0.18em] text-[#7a7a7a] uppercase">
                          Online
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#9a9a9a] leading-[1.55] mb-3.5">
                        Full Stack Python Developer @ Finite HR &amp; IT Solution · Open to full-time AI &amp; software engineering roles.
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-[10px]">
                        <span className="text-[#6a6a6a]">
                          {profile.phone}
                        </span>
                        <span className="text-[#a78bfa] flex items-center gap-1">
                          Get in touch →
                        </span>
                      </div>
                    </a>
                  </section>

                  {/* TECH STACK AUTO-SCROLL */}
                  <section>
                    <div className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase mb-3">
                      TECH STACK
                    </div>
                    <div
                      className="relative rounded-[16px] overflow-hidden py-4 border border-white/[0.05]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(20,17,30,0.7) 0%, rgba(10,8,16,0.85) 100%)',
                      }}
                    >
                      <div className="animate-tech-marquee gap-3 px-3">
                        {[...DAILY_DRIVER_BADGES, ...DAILY_DRIVER_BADGES].map(
                          (b, i) => (
                            <span
                              key={`${b.label}-${i}`}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141022] border border-white/10 text-xs font-medium text-white shrink-0"
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: b.color }}
                              />
                              <span>{b.label}</span>
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-1 mt-2 text-[10px]">
                      <span className="text-[#6a6a6a] tracking-[0.12em] uppercase">
                        Daily Drivers
                      </span>
                      <span className="text-[#a78bfa]">auto-scroll</span>
                    </div>
                  </section>

                  {/* FEATURED WORK STACK */}
                  <section>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase shrink-0">
                        FEATURED WORK
                      </span>
                      <span className="flex-1 h-px bg-[#a78bfa]/20" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#c4b5fd] px-2.5 py-1 rounded-full bg-[#181426] border border-[#a78bfa]/25">
                        Click to inspect
                      </span>
                    </div>

                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => onSelectProject(proj)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onSelectProject(proj);
                            }
                          }}
                          className="group relative overflow-hidden rounded-[16px] border border-white/[0.06] hover:border-[#a78bfa]/40 p-4 transition-all cursor-pointer"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(24,20,38,0.75) 0%, rgba(12,10,20,0.92) 100%)',
                          }}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                            <span className="text-[#c4b5fd]">
                              ★ FEATURED · {proj.index}
                            </span>
                            <span className="text-[#7a7a7a]">2025</span>
                          </div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#d8b4fe] transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-[11px] text-[#9a9a9a] line-clamp-2 mt-1 mb-3 leading-relaxed">
                            {proj.description}
                          </p>
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.05]">
                            <div className="flex flex-wrap gap-1">
                              {proj.technologies.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="text-[9.5px] font-mono text-[#cfcfcf] px-2 py-0.5 rounded bg-white/[0.05]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-[#a78bfa] group-hover:translate-x-0.5 transition-transform">
                              View →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* QUICK STATS */}
                  <section>
                    <div className="text-[10px] tracking-[0.22em] text-[#7a7a7a] font-mono uppercase mb-3">
                      QUICK STATS
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { n: '3', suffix: '+', l: 'Flagships' },
                        { n: '3', suffix: ' Roles', l: 'Experience' },
                        { n: '20', suffix: '+', l: 'Tech Skills' },
                      ].map((st) => (
                        <div
                          key={st.l}
                          className="rounded-[14px] p-3.5 border border-white/[0.05]"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(20,17,30,0.6) 0%, rgba(10,8,16,0.85) 100%)',
                          }}
                        >
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-lg font-semibold text-white">
                              {st.n}
                            </span>
                            <span className="text-[11px] text-[#a78bfa]">
                              {st.suffix}
                            </span>
                          </div>
                          <div className="text-[9.5px] text-[#7a7a7a] uppercase tracking-wider mt-1">
                            {st.l}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between text-[10px]">
                      <span className="text-[#5a5a5a] tracking-[0.18em] uppercase">
                        Crafted in
                      </span>
                      <span className="text-[#9a9a9a] font-mono">
                        Visakhapatnam · IST
                      </span>
                    </div>
                  </section>
                </div>
              </aside>
            </div>

            {/* 4. Bottom VS Code Status Bar (26px) */}
            <div className="h-[26px] bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center justify-between text-[11px] text-[#bdbdbd] px-4 shrink-0 font-mono">
              <div className="flex items-center gap-4">
                <span className="text-[#9a9a9a]">main*</span>
                <span className="px-2 py-[1px] rounded-[3px] bg-[#1a1a1a] text-[#cfcfcf]">
                  Tarun Pediredla Workspace
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-[#9a9a9a]">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span>{`{ } Python · TypeScript JSX`}</span>
                <span className="text-[#a78bfa]">⚡ Prettier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
