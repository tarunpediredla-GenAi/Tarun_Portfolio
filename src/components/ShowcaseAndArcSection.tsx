import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PROJECTS, FeaturedProject } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseAndArcSectionProps {
  onSelectProject: (project: FeaturedProject) => void;
}

const WARP_FRAMES = [0, 1, 2, 3, 4, 5, 6];

export const ShowcaseAndArcSection: React.FC<ShowcaseAndArcSectionProps> = ({
  onSelectProject,
}) => {
  const warpWrapRef = useRef<HTMLDivElement>(null);
  const warpFramesRef = useRef<(HTMLDivElement | null)[]>([]);
  const warpContentRef = useRef<HTMLDivElement>(null);
  const arcSectionRef = useRef<HTMLDivElement>(null);
  const [arcProgress, setArcProgress] = useState(0);
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. WarpTransition 3D wireframe frames flying toward camera
      if (warpWrapRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: warpWrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });

        warpFramesRef.current.forEach((frame, idx) => {
          if (!frame) return;
          const startZ = -idx * 180;
          gsap.set(frame, {
            z: startZ,
            opacity: Math.max(0, 1 - idx * 0.14),
            scale: 1 - idx * 0.08,
          });
          tl.to(
            frame,
            {
              z: startZ + 900,
              scale: 1.65,
              opacity: idx < 3 ? 0 : 0.85,
              ease: 'none',
            },
            0
          );
        });

        if (warpContentRef.current) {
          tl.fromTo(
            warpContentRef.current,
            { opacity: 0.25, scale: 0.86 },
            { opacity: 1, scale: 1, ease: 'power2.out' },
            0.15
          );
        }
      }

      // 2. Sticky #FAFAFA 3D Flip-Card Arc Morph progress tracker
      if (arcSectionRef.current) {
        ScrollTrigger.create({
          trigger: arcSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          onUpdate: (self) => {
            setArcProgress(self.progress);
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Build 20 cards cycling through Tarun's 3 verified featured projects and architectural highlights
  const arcCards = Array.from({ length: 20 }, (_, i) => {
    const proj = FEATURED_PROJECTS[i % FEATURED_PROJECTS.length];
    const badgeLabels = [
      'Full Stack System',
      'Architecture Flow',
      'AI Orchestration',
      'Database Layer',
      'Live Interface',
    ];
    return {
      index: i,
      project: proj,
      badge: badgeLabels[i % badgeLabels.length],
    };
  });

  return (
    <>
      {/* =====================================================================
          SECTION 4A — WarpTransition (270vh, 7 #c8a882 3D Wireframe Frames)
         ===================================================================== */}
      <div
        ref={warpWrapRef}
        style={{ height: '270vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#050505',
            perspective: '1000px',
          }}
        >
          {/* 3D Wireframe Tunnel Frames */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {WARP_FRAMES.map((idx) => (
              <div
                key={idx}
                ref={(el) => {
                  warpFramesRef.current[idx] = el;
                }}
                style={{
                  position: 'absolute',
                  width: '70vw',
                  height: '65vh',
                  border: '1px solid rgba(200, 168, 130, 0.28)',
                  borderRadius: '8px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  boxShadow:
                    idx === 0
                      ? '0 0 60px rgba(200, 168, 130, 0.08), inset 0 0 60px rgba(200, 168, 130, 0.04)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '-1px',
                    width: '12px',
                    height: '12px',
                    borderTop: '2px solid #c8a882',
                    borderLeft: '2px solid #c8a882',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    width: '12px',
                    height: '12px',
                    borderTop: '2px solid #c8a882',
                    borderRight: '2px solid #c8a882',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '-1px',
                    width: '12px',
                    height: '12px',
                    borderBottom: '2px solid #c8a882',
                    borderLeft: '2px solid #c8a882',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '12px',
                    height: '12px',
                    borderBottom: '2px solid #c8a882',
                    borderRight: '2px solid #c8a882',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Center Chapter 02 Headline */}
          <div
            ref={warpContentRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#c8a882',
                fontFamily: 'monospace',
                marginBottom: '1.2rem',
              }}
            >
              Chapter 02
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Selected Work
            </h2>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#c8a882',
                marginTop: '1.5rem',
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 4B — #showcase ("Building products with intelligence." + 3 Real Projects)
         ===================================================================== */}
      <div id="showcase" className="bg-[#080808] py-24 md:py-32 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          {/* Editorial Header */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-3 font-mono">
              Selected Work · Chapter 05
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Building products <br />
              <span className="text-5xl md:text-[5.5rem] font-extrabold mt-1 leading-none block bg-gradient-to-r from-[#a78bfa] via-[#38bdf8] to-[#fd5200] bg-clip-text text-transparent italic font-serif">
                with intelligence.
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
              Three verified full-stack and AI systems engineered by Tarun
              Pediredla — complete with real repository links, architecture
              flows, and transparent engineering scope.
            </p>
          </div>

          {/* 3 Cinematic Project Showcases */}
          <div className="space-y-16">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-3xl border border-white/10 bg-[#0d0e12] overflow-hidden shadow-2xl hover:border-white/25 transition-all duration-500"
              >
                {/* Top macOS Window Chrome Bar */}
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#13151b]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-xs font-mono text-neutral-400">
                      {project.number} — {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${project.accentColor}20`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}50`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Main Split Showcase Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
                  {/* Left: Project Screenshot + Architecture Pipeline */}
                  <div className="lg:col-span-6 space-y-5">
                    <div
                      onClick={() => onSelectProject(project)}
                      className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer group/img aspect-video bg-black"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white">
                          Click to inspect full architecture
                        </span>
                        {project.liveUrl && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-mono text-emerald-300">
                            ● Live Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Visual Architecture Pipeline */}
                    <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-3">
                        System Architecture Flow
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.architectureFlow.map((step, idx) => (
                          <React.Fragment key={step}>
                            <span
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.06] border border-white/10 text-neutral-200"
                              style={
                                idx === 0 ||
                                idx === project.architectureFlow.length - 1
                                  ? {
                                      borderColor: `${project.accentColor}66`,
                                      color: '#fff',
                                    }
                                  : undefined
                              }
                            >
                              {step}
                            </span>
                            {idx < project.architectureFlow.length - 1 && (
                              <span
                                className="text-xs font-mono font-bold px-0.5"
                                style={{ color: project.accentColor }}
                              >
                                →
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Detailed Engineering Breakdown */}
                  <div className="lg:col-span-6 space-y-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono uppercase tracking-[0.25em]"
                          style={{ color: project.accentColor }}
                        >
                          Project {project.number}
                        </span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs font-mono text-neutral-400">
                          {project.subtitle}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Key Capabilities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {project.features.map((feat) => (
                        <div
                          key={feat}
                          className="rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-2.5 text-xs text-neutral-300 flex items-start gap-2"
                        >
                          <span
                            className="mt-0.5 font-bold"
                            style={{ color: project.accentColor }}
                          >
                            ✓
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Honest Implementation & Runtime Scope Note */}
                    <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.05] px-4 py-3 text-xs text-amber-200/90 leading-relaxed">
                      <span className="font-mono uppercase tracking-wider text-[10px] text-amber-400 font-semibold block mb-0.5">
                        Engineering &amp; Runtime Scope
                      </span>
                      {project.implementationNote}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/12 text-xs font-mono text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        Case Study Modal
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/15 transition-colors"
                      >
                        GitHub Repository ↗
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 text-xs font-mono uppercase tracking-[0.2em] hover:bg-emerald-500/25 transition-colors"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 5 — Sticky #FAFAFA 20-Card 3D Flip-Card Arc Morph
          ("Every line of code has a story." -> "Explore My Work")
         ===================================================================== */}
      <div
        ref={arcSectionRef}
        style={{ height: '380vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center perspective-1000">
            {/* Phase 1 Headline ("Every line of code has a story.") */}
            <div
              className="flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6 transition-all duration-300"
              style={{
                opacity: Math.max(0, 1 - arcProgress * 3.2),
                transform: `translateY(${-arcProgress * 60}px)`,
              }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
                Every line of code has a story.
              </h2>
              <p className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase">
                Keep scrolling to watch them unfold
              </p>
            </div>

            {/* Phase 2 Headline ("Explore My Work" inside the rotating arc) */}
            <div
              className="absolute flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6 transition-all duration-300"
              style={{
                opacity:
                  arcProgress > 0.25
                    ? Math.min(1, (arcProgress - 0.25) * 3)
                    : 0,
                transform: `translateY(${Math.max(0, (1 - arcProgress) * 20)}px)`,
              }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-2">
                Explore My Work
              </h2>
              <p className="text-sm text-gray-500 max-w-md">
                Hover or click any card in the arc to flip &amp; inspect
                Tarun&apos;s verified engineering systems.
              </p>
            </div>

            {/* 20 Morphing 3D Flip Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {arcCards.map(({ index, project, badge }) => {
                // Morph from horizontal strip at bottom into a wide circular arc
                const total = arcCards.length;
                const normalized = index / (total - 1) - 0.5; // -0.5 to 0.5
                const arcAngleDeg =
                  normalized * 170 + (arcProgress - 0.5) * 55;
                const arcAngleRad = (arcAngleDeg * Math.PI) / 180;
                const radius = 420;

                // Linear position (initial)
                const lineX = normalized * 1150;
                const lineY = 180 + (index % 2 === 0 ? -18 : 18);
                const lineRot = normalized * 16;

                // Arc position (morphed)
                const circleX = Math.sin(arcAngleRad) * radius * 1.35;
                const circleY = -Math.cos(arcAngleRad) * radius * 0.68 + 110;
                const circleRot = arcAngleDeg * 0.75;

                const morphT = Math.min(1, Math.max(0, arcProgress * 1.6));
                const x = lineX * (1 - morphT) + circleX * morphT;
                const y = lineY * (1 - morphT) + circleY * morphT;
                const rot = lineRot * (1 - morphT) + circleRot * morphT;
                const isFlipped = flippedCardIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setFlippedCardIndex(isFlipped ? null : index);
                      onSelectProject(project);
                    }}
                    style={{
                      position: 'absolute',
                      width: 112,
                      height: 158,
                      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${
                        isFlipped ? 1.18 : 0.92
                      })`,
                      transition:
                        'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
                      zIndex: isFlipped ? 40 : 10 + index,
                    }}
                    className="cursor-pointer group"
                  >
                    <div
                      className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-black/10 bg-gray-900 transition-transform duration-500"
                      style={{
                        transform: isFlipped
                          ? 'rotateY(180deg)'
                          : 'rotateY(0deg)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-2.5">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-amber-300">
                          {badge}
                        </span>
                        <p className="text-[10px] font-bold text-white leading-tight truncate">
                          {project.title}
                        </p>
                        <p className="text-[9px] text-white/75 mt-0.5">
                          Click Me ↗
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
