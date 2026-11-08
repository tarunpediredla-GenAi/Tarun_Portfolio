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
              Five verified full-stack and AI systems engineered by Tarun
              Pediredla — complete with real repository links, architecture
              flows, and transparent engineering scope.
            </p>
          </motion.div>

          {/* 3 Cinematic Project Showcases */}
          <div className="space-y-16">
            {FEATURED_PROJECTS.map((project, projIdx) => (
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
                className="group relative rounded-3xl border border-[#687A70]/45 bg-[#FAF7F2] overflow-hidden shadow-xl hover:border-[#5E1726] transition-all duration-500"
              >
                {/* Top Window Chrome Bar in Deep Burgundy */}
                <div className="flex items-center justify-between px-6 py-3.5 bg-[#5E1726] text-[#F6F1E7]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F6F1E7]" />
                    <span className="w-3 h-3 rounded-full bg-[#DCE3DF]" />
                    <span className="w-3 h-3 rounded-full bg-[#84968B]" />
                    <span className="ml-3 text-xs font-mono font-bold text-[#F6F1E7]">
                      {project.number} — {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] px-3 py-0.5 rounded-full bg-[#F6F1E7] text-[#5E1726]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Main Split Showcase Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
                  {/* Left: Project Screenshot + Animated Architecture Pipeline */}
                  <div className="lg:col-span-6 space-y-5">
                    <motion.div
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => onSelectProject(project)}
                      className="relative rounded-2xl overflow-hidden border border-[#687A70]/45 cursor-pointer group/img aspect-video bg-[#232B27] shadow-md"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#232B27]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/95 text-[11px] font-mono font-bold text-[#232B27] shadow-sm group-hover/img:bg-[#5E1726] group-hover/img:text-[#F6F1E7] transition-colors">
                          Click to inspect full architecture →
                        </span>
                        {project.liveUrl && (
                          <span className="px-3.5 py-1.5 rounded-full bg-[#5E1726] text-[11px] font-mono font-bold text-[#F6F1E7] shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F6F1E7] animate-ping" />
                            <span>Live Verified</span>
                          </span>
                        )}
                      </div>
                    </motion.div>

                    {/* Visual Architecture Pipeline with Animated Signal Pulse */}
                    <div className="relative rounded-xl border border-[#687A70]/40 bg-[#E6ECE8] p-4 overflow-hidden">
                      {/* Animated signal bar along top edge */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#687A70]/25 overflow-hidden">
                        <div className="w-1/3 h-full bg-[#5E1726] animate-signal-flow" />
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726]">
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
                                  ? 'bg-[#5E1726] border-[#5E1726] text-[#F6F1E7]'
                                  : 'bg-[#FAF7F2] border-[#687A70]/40 text-[#232B27] hover:border-[#5E1726]'
                              }`}
                            >
                              {step}
                            </motion.span>
                            {idx < project.architectureFlow.length - 1 && (
                              <span className="text-xs font-mono font-bold px-0.5 text-[#5E1726]">
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
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726]">
                          Project {project.number}
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
                          className="rounded-lg border border-[#687A70]/35 bg-[#EFE8DA] px-3.5 py-2.5 text-xs font-medium text-[#232B27] flex items-start gap-2"
                        >
                          <span className="mt-0.5 font-bold text-[#5E1726]">
                            ✓
                          </span>
                          <span>{feat}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Honest Implementation & Runtime Scope Note */}
                    <div className="rounded-xl border border-[#5E1726]/30 bg-[#E6ECE8] px-4 py-3 text-xs text-[#232B27] leading-relaxed">
                      <span className="font-mono uppercase tracking-wider text-[10.5px] text-[#5E1726] font-bold block mb-0.5">
                        Engineering &amp; Runtime Scope
                      </span>
                      {project.implementationNote}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#DCE3DF] border border-[#687A70]/45 text-xs font-mono font-bold text-[#232B27]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 rounded-full bg-[#5E1726] text-[#F6F1E7] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#751E31] transition-colors cursor-pointer shadow-xs"
                      >
                        Case Study Modal
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-[#DCE3DF] border border-[#687A70]/50 text-[#232B27] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:border-[#5E1726] transition-colors"
                      >
                        GitHub Repository ↗
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full border border-[#5E1726] bg-[#FAF7F2] text-[#5E1726] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#5E1726] hover:text-[#F6F1E7] transition-colors"
                        >
                          Live Demo ↗
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
