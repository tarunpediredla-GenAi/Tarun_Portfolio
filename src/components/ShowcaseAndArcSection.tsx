import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // WarpTransition 3D wireframe frames flying toward camera
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
            { opacity: 0.95, scale: 0.94 },
            { opacity: 1, scale: 1, ease: 'power2.out' },
            0.05
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* =====================================================================
          SECTION 4A — WarpTransition (240vh, Muted Sage Grey & Deep Burgundy 3D Wireframe Tunnel)
         ===================================================================== */}
      <div
        ref={warpWrapRef}
        style={{ height: '240vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#DCE3DF',
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
                  border: '1.5px solid rgba(94, 23, 38, 0.28)',
                  borderRadius: '10px',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  boxShadow:
                    idx === 0
                      ? '0 16px 60px rgba(94, 23, 38, 0.12)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '-1px',
                    width: '14px',
                    height: '14px',
                    borderTop: '2.5px solid #5E1726',
                    borderLeft: '2.5px solid #5E1726',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    width: '14px',
                    height: '14px',
                    borderTop: '2.5px solid #5E1726',
                    borderRight: '2.5px solid #5E1726',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '-1px',
                    width: '14px',
                    height: '14px',
                    borderBottom: '2.5px solid #5E1726',
                    borderLeft: '2.5px solid #5E1726',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '14px',
                    height: '14px',
                    borderBottom: '2.5px solid #5E1726',
                    borderRight: '2.5px solid #5E1726',
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
                fontSize: '0.82rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: '#5E1726',
                fontFamily: 'monospace',
                fontWeight: 700,
                marginBottom: '1.2rem',
              }}
            >
              Chapter 02
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontWeight: 900,
                color: '#232B27',
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
                width: '56px',
                height: '3px',
                background: '#5E1726',
                marginTop: '1.5rem',
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 4B — #showcase ("Building products with intelligence." on Warm Cream Beige)
         ===================================================================== */}
      <div
        id="showcase"
        className="bg-[#F6F1E7] py-24 md:py-32 px-6 md:px-14 border-t border-[#687A70]/35"
      >
        <div className="max-w-7xl mx-auto">
          {/* Editorial Header */}
          <motion.div
            initial={{ opacity: 0.9, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#5E1726] font-bold mb-3 font-mono">
              Selected Work · Chapter 05
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-[#232B27] leading-tight">
              Building products <br />
              <span className="text-5xl md:text-[5.5rem] font-extrabold mt-1 leading-none block text-[#5E1726] italic font-serif">
                with intelligence.
              </span>
            </h2>
            <p className="mt-6 text-[#35423C] font-medium text-base md:text-lg max-w-2xl mx-auto">
              Four verified full-stack and AI systems engineered by Tarun
              Pediredla — led by the InsureSphere AI enterprise flagship,
              complete with real repository links, architecture flows, and
              transparent engineering scope.
            </p>
          </motion.div>

          {/* 4 Cinematic Project Showcases */}
          <div className="space-y-16">
            {FEATURED_PROJECTS.map((project, projIdx) => {
              const isFlagship = project.isFlagship || project.id === 'insuresphere-ai';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0.92, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: projIdx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative rounded-3xl border overflow-hidden shadow-xl transition-all duration-500 ${
                    isFlagship
                      ? 'border-sky-500/50 bg-[#FAF7F2] shadow-[0_12px_45px_rgba(56,189,248,0.18)] hover:border-sky-400'
                      : 'border-[#687A70]/45 bg-[#FAF7F2] hover:border-[#5E1726]'
                  }`}
                >
                  {/* Top Window Chrome Bar */}
                  <div
                    className={`flex items-center justify-between px-6 py-3.5 ${
                      isFlagship
                        ? 'bg-[#060E26] text-white border-b border-sky-500/30'
                        : 'bg-[#5E1726] text-[#F6F1E7]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isFlagship ? 'bg-rose-500' : 'bg-[#F6F1E7]'
                        }`}
                      />
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isFlagship ? 'bg-amber-400' : 'bg-[#DCE3DF]'
                        }`}
                      />
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isFlagship ? 'bg-emerald-400' : 'bg-[#84968B]'
                        }`}
                      />
                      <span className="ml-3 text-xs font-mono font-bold">
                        {isFlagship ? '★ FLAGSHIP 01' : project.number} —{' '}
                        {project.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {isFlagship && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.35)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                          <span>Flagship Spotlight</span>
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] px-3 py-0.5 rounded-full ${
                          isFlagship
                            ? 'bg-slate-900 text-sky-300 border border-slate-700'
                            : 'bg-[#F6F1E7] text-[#5E1726]'
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Flagship Enterprise Telemetry Ribbon */}
                  {isFlagship && (
                    <div className="bg-[#0B1536] border-b border-sky-500/25 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sky-400 font-bold">● Telemetry:</span>
                          <span className="text-white font-semibold">$14.8M Claims Registered</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sky-400 font-bold">● Treaty Structure:</span>
                          <span className="text-white font-semibold">60% Retained / 40% Ceded</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">● AI Adjudication:</span>
                          <span className="text-emerald-300 font-semibold">Automated Coverage &amp; Deductible Triage</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-sky-300 font-bold tracking-wider hidden md:block">
                        POSTGRESQL 16 · DJANGO REST · REACT 19
                      </div>
                    </div>
                  )}

                  {/* Main Split Showcase Body */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
                    {/* Left: Project Screenshot + Animated Architecture Pipeline */}
                    <div className="lg:col-span-6 space-y-5">
                      <motion.div
                        whileHover={{ scale: 1.015 }}
                        transition={{ duration: 0.35 }}
                        onClick={() => onSelectProject(project)}
                        className={`relative rounded-2xl overflow-hidden border cursor-pointer group/img aspect-video shadow-md ${
                          isFlagship
                            ? 'border-sky-500/40 bg-[#070E24]'
                            : 'border-[#687A70]/45 bg-[#232B27]'
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020512]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold shadow-sm transition-colors ${
                              isFlagship
                                ? 'bg-[#0A122C]/90 text-sky-300 border border-sky-400/50 group-hover/img:bg-sky-400 group-hover/img:text-slate-950'
                                : 'bg-[#FAF7F2]/95 text-[#232B27] group-hover/img:bg-[#5E1726] group-hover/img:text-[#F6F1E7]'
                            }`}
                          >
                            Click to inspect full architecture →
                          </span>
                          {project.liveUrl ? (
                            <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-[11px] font-mono font-bold text-white shadow-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>Live Verified</span>
                            </span>
                          ) : isFlagship ? (
                            <span className="px-3 py-1 rounded-full bg-slate-900/90 text-[10.5px] font-mono font-bold text-slate-300 border border-slate-700 shadow-sm">
                              Local Full-Stack App
                            </span>
                          ) : null}
                        </div>
                      </motion.div>

                      {/* Visual Architecture Pipeline with Animated Signal Pulse */}
                      <div
                        className={`relative rounded-xl border p-4 overflow-hidden ${
                          isFlagship
                            ? 'border-sky-500/30 bg-[#0D1838]/20'
                            : 'border-[#687A70]/40 bg-[#E6ECE8]'
                        }`}
                      >
                        {/* Animated signal bar along top edge */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#687A70]/25 overflow-hidden">
                          <div
                            className={`w-1/3 h-full animate-signal-flow ${
                              isFlagship ? 'bg-sky-400' : 'bg-[#5E1726]'
                            }`}
                          />
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] ${
                              isFlagship ? 'text-sky-600' : 'text-[#5E1726]'
                            }`}
                          >
                            System Architecture Flow
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-[#35423C]">
                            {project.architectureFlow.length} Stages
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.architectureFlow.map((step, idx) => (
                            <React.Fragment key={step}>
                              <motion.span
                                whileHover={{ y: -2, scale: 1.04 }}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border transition-colors ${
                                  idx === 0 ||
                                  idx === project.architectureFlow.length - 1
                                    ? isFlagship
                                      ? 'bg-[#08112D] border-sky-400 text-sky-300'
                                      : 'bg-[#5E1726] border-[#5E1726] text-[#F6F1E7]'
                                    : 'bg-[#FAF7F2] border-[#687A70]/40 text-[#232B27] hover:border-sky-500'
                                }`}
                              >
                                {step}
                              </motion.span>
                              {idx < project.architectureFlow.length - 1 && (
                                <span
                                  className={`text-xs font-mono font-bold px-0.5 ${
                                    isFlagship ? 'text-sky-500' : 'text-[#5E1726]'
                                  }`}
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
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <span
                            className={`text-xs font-mono font-bold uppercase tracking-[0.25em] ${
                              isFlagship ? 'text-sky-600' : 'text-[#5E1726]'
                            }`}
                          >
                            {isFlagship
                              ? '★ Flagship Project 01'
                              : `Project ${project.number}`}
                          </span>
                          <span className="text-[#687A70]">•</span>
                          <span className="text-xs font-mono font-semibold text-[#35423C]">
                            {project.subtitle}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-[#232B27] tracking-tight">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm md:text-base text-[#35423C] font-medium leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Key Capabilities */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {project.features.map((feat) => (
                          <motion.div
                            whileHover={{ x: 3 }}
                            key={feat}
                            className={`rounded-lg border px-3.5 py-2.5 text-xs font-medium flex items-start gap-2 ${
                              isFlagship
                                ? 'border-sky-400/30 bg-[#E6ECE8] text-[#1E293B]'
                                : 'border-[#687A70]/35 bg-[#EFE8DA] text-[#232B27]'
                            }`}
                          >
                            <span
                              className={`mt-0.5 font-bold ${
                                isFlagship ? 'text-sky-600' : 'text-[#5E1726]'
                              }`}
                            >
                              ✓
                            </span>
                            <span>{feat}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Implementation & Runtime Scope Note */}
                      <div
                        className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${
                          isFlagship
                            ? 'border-sky-500/35 bg-[#E0F2FE]/50 text-slate-800'
                            : 'border-[#5E1726]/30 bg-[#E6ECE8] text-[#232B27]'
                        }`}
                      >
                        <span
                          className={`font-mono uppercase tracking-wider text-[10.5px] font-bold block mb-0.5 ${
                            isFlagship ? 'text-sky-700' : 'text-[#5E1726]'
                          }`}
                        >
                          Engineering &amp; Runtime Scope
                        </span>
                        {project.implementationNote}
                      </div>

                      {/* Tech Stack Heading & Badges */}
                      <div className="space-y-3 pt-1">
                        {isFlagship ? (
                          <>
                            {/* InsureSphere AI — Tech Stack Heading */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-sky-400">
                                  InsureSphere AI — Tech Stack
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  12 Production Technologies
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => {
                                  const isCorePillar = [
                                    'React.js',
                                    'Python',
                                    'DRF',
                                    'Django',
                                    'PostgreSQL',
                                    'JWT',
                                  ].includes(tech);
                                  return (
                                    <span
                                      key={tech}
                                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-transform hover:scale-105 ${
                                        isCorePillar
                                          ? 'bg-sky-500/20 text-sky-200 border border-sky-400/50 shadow-sm'
                                          : 'bg-[#0E1A3C] text-slate-300 border border-slate-700/60'
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Core Engineering Stack Callout Banner */}
                            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs font-mono text-sky-200 flex flex-wrap items-center gap-2">
                              <span className="font-bold uppercase tracking-wider text-sky-300 shrink-0">
                                ✦ Core Engineering Stack:
                              </span>
                              <span className="text-white font-semibold">
                                React + Python + Django REST Framework + PostgreSQL + JWT Authentication
                              </span>
                            </div>

                            {/* AI-assisted analysis and RAG shown separately as features under integration verification */}
                            <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/35 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                  <span>⚠️</span>
                                  <span>Features Under Integration Verification</span>
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/30">
                                  Verification Ongoing
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-100/90 font-sans">
                                <div className="p-2 rounded-lg bg-amber-900/20 border border-amber-500/20">
                                  <div className="font-mono font-bold text-amber-200 text-xs">
                                    • AI-Assisted Claims Analysis
                                  </div>
                                  <div className="text-[11px] text-amber-200/80 mt-0.5">
                                    Advisory coverage checks, deductible validation, and human-in-the-loop review reports.
                                  </div>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-900/20 border border-amber-500/20">
                                  <div className="font-mono font-bold text-amber-200 text-xs">
                                    • AI Policy &amp; RAG Studio
                                  </div>
                                  <div className="text-[11px] text-amber-200/80 mt-0.5">
                                    Document retrieval workflow for complex commercial policy terms and reinsurance treaties.
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* AI-Assisted Development Tools (Google Antigravity & Google AI Studio) */}
                            <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/30 text-xs font-mono text-violet-200 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-violet-400 font-bold uppercase tracking-wider">
                                  🛠️ AI-Assisted Dev Tools:
                                </span>
                                <span className="text-white font-medium">
                                  Google Antigravity · Google AI Studio
                                </span>
                              </div>
                              <span className="text-[10.5px] text-violet-300/80 italic">
                                (Developer tooling — not runtime application dependencies)
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#DCE3DF] border border-[#687A70]/45 text-[#232B27]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-3">
                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.16em] font-bold transition-all cursor-pointer shadow-md ${
                            isFlagship
                              ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500 text-slate-950 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]'
                              : 'bg-[#5E1726] text-[#F6F1E7] hover:bg-[#751E31]'
                          }`}
                        >
                          Explore Case Study
                        </motion.button>

                        <motion.a
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 sm:px-5 py-2.5 rounded-full bg-[#DCE3DF] border border-[#687A70]/50 text-[#232B27] text-xs font-mono font-bold uppercase tracking-[0.16em] hover:border-sky-500 transition-colors"
                        >
                          View Source Code ↗
                        </motion.a>

                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="px-3.5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#687A70]/40 text-[#35423C] text-xs font-mono font-semibold uppercase tracking-wider hover:border-sky-500 transition-colors cursor-pointer"
                        >
                          System Architecture
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => {
                            document
                              .getElementById('skills')
                              ?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#687A70]/40 text-[#35423C] text-xs font-mono font-semibold uppercase tracking-wider hover:border-sky-500 transition-colors cursor-pointer"
                        >
                          Technology Stack
                        </motion.button>

                        {isFlagship && (
                          <motion.button
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="px-4 py-2.5 rounded-full bg-sky-500/15 border border-sky-400/50 text-sky-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-sky-400/25 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <span>📊 60/40 Calculator</span>
                          </motion.button>
                        )}

                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-full border border-emerald-600 bg-emerald-600 text-white text-xs font-mono font-bold uppercase tracking-[0.16em] hover:bg-emerald-500 transition-colors"
                          >
                            View Demo ↗
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
