import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import {
  COMMAND_BACKDROP_IMAGE,
  FEATURED_PROJECTS,
  FeaturedProject,
  KINETIC_ROLES,
} from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface StillsAndOutlastSectionProps {
  onSelectProject: (project: FeaturedProject) => void;
}

const TWINKLE_STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${(i * 37) % 94}%`,
  left: `${(i * 53) % 96}%`,
  size: i % 3 === 0 ? 3 : 2,
  dur: `${2.4 + (i % 5) * 0.6}s`,
  delay: `${(i % 7) * 0.35}s`,
}));

export const StillsAndOutlastSection: React.FC<StillsAndOutlastSectionProps> = ({
  onSelectProject,
}) => {
  const foldWrapRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);
  const revealContentRef = useRef<HTMLDivElement>(null);

  const zoomPortalWrapRef = useRef<HTMLDivElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);

  // 3D Coverflow Carousel state + auto-play
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  // Flagship Projects hover preview state
  const [hoveredFlagship, setHoveredFlagship] =
    useState<FeaturedProject | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const flagshipListRef = useRef<HTMLDivElement>(null);

  const galleryStills = [
    {
      num: '01',
      title: 'InsureSphere AI Platform',
      tag: 'Python · Django REST · PostgreSQL · Reinsurance AI',
      image: FEATURED_PROJECTS[0].image,
      project: FEATURED_PROJECTS[0],
      side: 'left' as const,
    },
    {
      num: '02',
      title: "Satya's Education Platform",
      tag: 'React · JavaScript · Django · Cashfree',
      image: FEATURED_PROJECTS[1].image,
      project: FEATURED_PROJECTS[1],
      side: 'right' as const,
    },
    {
      num: '03',
      title: 'Alex AI Mock Interviewer',
      tag: 'React · Express · Google Gemini · Voice AI',
      image: FEATURED_PROJECTS[2].image,
      project: FEATURED_PROJECTS[2],
      side: 'left' as const,
    },
    {
      num: '04',
      title: 'AI Voice Task Planner',
      tag: 'n8n · Vapi · Gemini · Google Sheets',
      image: FEATURED_PROJECTS[3].image,
      project: FEATURED_PROJECTS[3],
      side: 'right' as const,
    },
  ];

  const carouselSlides = [
    {
      project: FEATURED_PROJECTS[0],
      badge: 'Enterprise SaaS & InsurTech',
      caption: 'Quota-share reinsurance treaties, underwriting workbench & claims AI',
    },
    {
      project: FEATURED_PROJECTS[1],
      badge: 'E-Commerce & EdTech',
      caption: 'Live production portal on Vercel with Cashfree checkout',
    },
    {
      project: FEATURED_PROJECTS[2],
      badge: 'Conversational Voice AI',
      caption: '50-question bank, system design whiteboard & Hiring Committee',
    },
    {
      project: FEATURED_PROJECTS[3],
      badge: 'Agentic Automation',
      caption: 'Voice request → Vapi → n8n → Gemini → Google Sheets',
    },
  ];

  // Auto-advance 3D Coverflow Carousel
  useEffect(() => {
    if (!isAutoPlaying || isHoveringCarousel) return;
    const timer = window.setInterval(() => {
      setActiveCarouselIdx((prev) => (prev + 1) % carouselSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHoveringCarousel, carouselSlides.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PageFoldTransition
      if (
        foldWrapRef.current &&
        topHalfRef.current &&
        bottomHalfRef.current &&
        horizonLineRef.current &&
        revealContentRef.current
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: foldWrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });

        tl.fromTo(
          horizonLineRef.current,
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power2.out' },
          0
        )
          .to(
            topHalfRef.current,
            { rotateX: -92, opacity: 0, duration: 0.75, ease: 'power2.inOut' },
            0.2
          )
          .to(
            bottomHalfRef.current,
            { rotateX: 92, opacity: 0, duration: 0.75, ease: 'power2.inOut' },
            0.2
          )
          .to(
            horizonLineRef.current,
            { opacity: 0, duration: 0.2 },
            0.35
          )
          .fromTo(
            revealContentRef.current,
            { opacity: 0.35, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' },
            0.18
          );
      }

      // 2. "Built to Outlast the Moment" 7-Panel Zoom Parallax Portal
      if (zoomPortalWrapRef.current) {
        ScrollTrigger.create({
          trigger: zoomPortalWrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          onUpdate: (self) => {
            setZoomProgress(self.progress);
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleFlagshipMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!flagshipListRef.current) return;
    const rect = flagshipListRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left + 24,
      y: e.clientY - rect.top - 90,
    });
  };

  return (
    <>
      {/* =====================================================================
          SECTION 6A — PageFoldTransition (260vh, Chapter 03 / DESIGNED WITH INTENT)
         ===================================================================== */}
      <div
        ref={foldWrapRef}
        style={{ height: '260vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#5E1726',
            perspective: '1200px',
          }}
        >
          {/* Top Folding Half (Warm Cream Beige) */}
          <div
            ref={topHalfRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#EFE8DA',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(94, 23, 38, 0.25)',
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
                fontWeight: 900,
                color: '#5E1726',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              CRAFT
            </p>
          </div>

          {/* Bottom Folding Half (Muted Sage Grey) */}
          <div
            ref={bottomHalfRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#DCE3DF',
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(94, 23, 38, 0.25)',
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
                fontWeight: 900,
                color: '#232B27',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              PRECISION
            </p>
          </div>

          {/* Deep Burgundy Horizon Seam Line */}
          <div
            ref={horizonLineRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '3px',
              background:
                'linear-gradient(90deg, transparent, #5E1726, #FAF7F2, #5E1726, transparent)',
              transform: 'translateY(-50%) scaleX(0)',
              zIndex: 10,
              willChange: 'transform, opacity',
            }}
          />

          {/* Revealed Chapter 03 Centerpiece on Deep Burgundy */}
          <div
            ref={revealContentRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: '0.82rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#EFE8DA',
                fontFamily: 'monospace',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Chapter 03
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                fontWeight: 900,
                color: '#F6F1E7',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              DESIGNED WITH
              <br />
              <span style={{ color: '#DCE3DF' }}>INTENT</span>
            </h2>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 6B — #gallery ("Ch · 04 — Field of Stills" on Warm Cream Beige #F6F1E7)
         ===================================================================== */}
      <section
        id="gallery"
        style={{
          position: 'relative',
          background: '#F6F1E7',
          overflow: 'hidden',
          padding: '0 0 4rem',
        }}
      >
        {/* Corner Viewfinder Brackets (#5E1726) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            width: 28,
            height: 28,
            borderTop: '2px solid rgba(94, 23, 38, 0.45)',
            borderLeft: '2px solid rgba(94, 23, 38, 0.45)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            width: 28,
            height: 28,
            borderTop: '2px solid rgba(94, 23, 38, 0.45)',
            borderRight: '2px solid rgba(94, 23, 38, 0.45)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 28,
            left: 28,
            width: 28,
            height: 28,
            borderBottom: '2px solid rgba(94, 23, 38, 0.45)',
            borderLeft: '2px solid rgba(94, 23, 38, 0.45)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 28,
            right: 28,
            width: 28,
            height: 28,
            borderBottom: '2px solid rgba(94, 23, 38, 0.45)',
            borderRight: '2px solid rgba(94, 23, 38, 0.45)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* Subtle Burgundy & Sage Dots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {TWINKLE_STARS.map((star) => (
            <span
              key={star.id}
              className="stg-star-twinkle"
              style={
                {
                  position: 'absolute',
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  borderRadius: '50%',
                  background: '#5E1726',
                  '--dur': star.dur,
                  '--delay': star.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1400,
            margin: '0 auto',
            padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) 0',
          }}
        >
          {/* Editorial Meta Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(104, 122, 112, 0.35)',
              paddingBottom: '1.25rem',
              marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#5E1726',
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#5E1726',
                }}
              >
                Ch · 04 — Field of Stills
              </span>
            </div>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#35423C',
              }}
            >
              [ Perspective · Depth · Motion ]
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                color: '#232B27',
              }}
            >
              04 <span style={{ color: '#5E1726' }}>/</span> 07
            </span>
          </div>

          {/* Where Design Thinks for Itself Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'end',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#5E1726',
                  marginBottom: '1rem',
                }}
              >
                — Selected Frames / 2025 — 2026
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2.8rem, 6vw, 5.25rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.02em',
                  color: '#232B27',
                  margin: 0,
                }}
              >
                Where Design{' '}
                <em
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 700,
                    color: '#5E1726',
                  }}
                >
                  Thinks
                </em>
                <br />
                for Itself
              </h2>
            </div>

            <div style={{ maxWidth: 440, justifySelf: 'end' }}>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                  lineHeight: 1.7,
                  color: '#35423C',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Every interface is a thesis on clarity and restraint. Each frame
                is tilted into 3D space and anchored by its own floor reflection
                — click any still to inspect the full architecture.
              </p>
            </div>
          </div>

          {/* 2-Column 3D Skewed Perspective Gallery with Floor Reflections */}
          <div className="w-full py-8">
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
                {galleryStills.map((still, idx) => (
                  <motion.div
                    key={still.num}
                    initial={{ opacity: 0.9, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    onClick={() => onSelectProject(still.project)}
                    style={{ perspective: '1000px' }}
                    className={`flex flex-col items-center cursor-pointer group ${
                      still.side === 'right' ? 'md:mt-20' : ''
                    }`}
                  >
                    <div
                      style={{
                        transform:
                          still.side === 'left'
                            ? 'rotateY(-14deg) rotateX(4deg)'
                            : 'rotateY(14deg) rotateX(4deg)',
                        transformStyle: 'preserve-3d',
                      }}
                      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-[#5E1726]/35 group-hover:border-[#5E1726] transition-all duration-500 group-hover:scale-[1.04]"
                    >
                      <img
                        src={still.image}
                        alt={still.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#232B27]/90 via-transparent to-transparent flex items-end justify-between p-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#EFE8DA] block">
                            Frame {still.num}
                          </span>
                          <h4 className="text-base font-bold text-[#F6F1E7]">
                            {still.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-[#F6F1E7] bg-[#5E1726] px-2.5 py-1 rounded-full">
                          {still.tag}
                        </span>
                      </div>
                    </div>

                    {/* Blurred Perspective Floor Reflection */}
                    <div
                      style={{
                        transform:
                          still.side === 'left'
                            ? 'rotateX(70deg) skewX(18deg) scaleY(1.4)'
                            : 'rotateX(70deg) skewX(-18deg) scaleY(1.4)',
                        transformOrigin: 'top center',
                        filter: 'blur(6px)',
                        maskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 75%)',
                        WebkitMaskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 75%)',
                      }}
                      className="w-4/5 h-16 mt-2 rounded-xl overflow-hidden opacity-45 pointer-events-none"
                    >
                      <img
                        src={still.image}
                        alt=""
                        className="w-full h-full object-cover transform -scale-y-100"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Coverflow Carousel on Deep Burgundy Stage (#5E1726) */}
          <div
            onMouseEnter={() => setIsHoveringCarousel(true)}
            onMouseLeave={() => setIsHoveringCarousel(false)}
            className="relative mt-20 rounded-3xl border border-[#5E1726] bg-[#5E1726] py-16 px-6 overflow-hidden shadow-xl"
          >
            <div className="relative z-10 text-center mb-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-[#EFE8DA] block mb-2">
                Interactive Deck · 3D Coverflow
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-[#F6F1E7]">
                System Reel &amp; Interactive Architecture
              </h3>
            </div>

            <div
              className="relative z-10 flex items-center justify-center h-[320px] md:h-[380px]"
              style={{ perspective: '1200px' }}
            >
              {carouselSlides.map((slide, idx) => {
                const offset = idx - activeCarouselIdx;
                const isCenter = offset === 0;
                const translateX = offset * 260;
                const translateZ = isCenter ? 60 : -140;
                const rotateY = offset * -28;

                return (
                  <div
                    key={slide.project.id}
                    onClick={() => {
                      if (isCenter) {
                        onSelectProject(slide.project);
                      } else {
                        setActiveCarouselIdx(idx);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      width: 'min(520px, 82vw)',
                      height: '300px',
                      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                      zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                      opacity: isCenter ? 1 : 0.45,
                      transition:
                        'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
                    }}
                    className="cc-card rounded-2xl overflow-hidden border-2 border-[#F6F1E7]/45 bg-[#232B27] shadow-2xl cursor-pointer"
                  >
                    <img
                      src={slide.project.image}
                      alt={slide.project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232B27]/95 via-[#232B27]/35 to-transparent p-6 flex flex-col justify-end">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#EFE8DA] mb-1">
                        {slide.badge}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-[#F6F1E7]">
                        {slide.project.title}
                      </h4>
                      <p className="text-xs text-[#DCE3DF] mt-1">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls + Auto-Play Toggle */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() =>
                  setActiveCarouselIdx(
                    (prev) =>
                      (prev - 1 + carouselSlides.length) % carouselSlides.length
                  )
                }
                className="w-9 h-9 rounded-full bg-[#4A111D] text-[#F6F1E7] border border-[#F6F1E7]/30 hover:bg-[#FAF7F2] hover:text-[#5E1726] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {carouselSlides.map((s, idx) => (
                <button
                  key={s.project.id}
                  type="button"
                  onClick={() => setActiveCarouselIdx(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeCarouselIdx === idx
                      ? 'bg-[#F6F1E7] text-[#5E1726] scale-105 shadow-sm'
                      : 'bg-[#4A111D] text-[#EFE8DA] border border-[#F6F1E7]/25 hover:bg-[#751E31]'
                  }`}
                >
                  0{idx + 1} · {s.project.title.split(' ')[0]}
                </button>
              ))}

              <button
                type="button"
                aria-label="Next slide"
                onClick={() =>
                  setActiveCarouselIdx(
                    (prev) => (prev + 1) % carouselSlides.length
                  )
                }
                className="w-9 h-9 rounded-full bg-[#4A111D] text-[#F6F1E7] border border-[#F6F1E7]/30 hover:bg-[#FAF7F2] hover:text-[#5E1726] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsAutoPlaying((p) => !p)}
                title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4A111D] text-[#EFE8DA] border border-[#F6F1E7]/25 hover:bg-[#FAF7F2] hover:text-[#5E1726] text-[11px] font-mono font-bold transition-colors cursor-pointer"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Auto</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7A — "Built to Outlast the Moment" 7-Panel Zoom Parallax Portal
         ===================================================================== */}
      <div
        ref={zoomPortalWrapRef}
        className="relative h-[260vh] bg-[#DCE3DF] border-t border-[#687A70]/35"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* Headline above portal */}
          <div
            className="absolute top-12 inset-x-0 text-center z-20 pointer-events-none px-4 transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - zoomProgress * 2.5) }}
          >
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-[#5E1726] mb-2">
              Visual Immersion
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#232B27]">
              Built to <em className="italic text-[#5E1726]">Outlast</em> the
              Moment.
            </h2>
          </div>

          {/* Center Portal Scaling to Fullscreen */}
          <div
            style={{
              transform: `scale(${1 + zoomProgress * 2.8})`,
              willChange: 'transform',
            }}
            className="relative w-[34vw] min-w-[260px] h-[34vh] min-h-[200px] rounded-2xl overflow-hidden border-2 border-[#5E1726]/40 shadow-2xl z-10"
          >
            <img
              src={COMMAND_BACKDROP_IMAGE}
              alt="Tarun AI Command Center"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#232B27]/35 flex items-center justify-center">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#F6F1E7] px-3.5 py-1.5 rounded-full bg-[#5E1726] shadow-md">
                Tarun Pediredla · Systems
              </span>
            </div>
          </div>

          {/* Surrounding Satellite Panels */}
          {FEATURED_PROJECTS.map((proj, idx) => {
            const positions = [
              '-top-[18vh] -left-[26vw]',
              '-top-[16vh] left-[26vw]',
              'top-[22vh] -left-[25vw]',
              'top-[20vh] left-[25vw]',
            ];
            const scaleFactor = 1 + zoomProgress * (1.8 + idx * 0.4);
            return (
              <div
                key={proj.id}
                style={{
                  transform: `scale(${scaleFactor})`,
                  opacity: Math.max(0, 1 - zoomProgress * 1.35),
                }}
                className={`hidden md:block absolute ${positions[idx]} w-[20vw] h-[20vh] rounded-xl overflow-hidden border border-[#687A70]/45 shadow-xl pointer-events-none`}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SECTION 7C — #flagship ("Flagship Projects" + Kinetic Role List on Warm Cream Beige)
         ===================================================================== */}
      <div id="flagship" className="bg-[#F6F1E7] py-20">
        <section
          ref={flagshipListRef}
          onMouseMove={handleFlagshipMouseMove}
          className="relative w-full mx-auto max-w-5xl px-6 py-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#5E1726] font-bold mb-3 font-mono">
            Quick Index · Verified Repositories
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#232B27] mb-12 tracking-tight">
            Flagship Projects
          </h2>

          <div className="divide-y divide-[#687A70]/35 border-y border-[#687A70]/35">
            {FEATURED_PROJECTS.map((proj) => {
              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => setHoveredFlagship(proj)}
                  onMouseLeave={() => setHoveredFlagship(null)}
                  onClick={() => onSelectProject(proj)}
                  className="group relative block py-8 px-4 -mx-4 rounded-2xl transition-all duration-300 cursor-pointer hover:bg-[#EFE8DA]"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-6">
                      <span className="text-xs font-mono font-bold text-[#5E1726]">
                        {proj.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-2xl md:text-4xl font-bold tracking-tight transition-all duration-300 text-[#232B27] group-hover:text-[#5E1726] group-hover:translate-x-2">
                            {proj.title}
                          </h3>
                        </div>
                        <p className="text-xs md:text-sm text-[#35423C] font-medium mt-1">
                          {proj.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-300 text-[#35423C] group-hover:text-[#5E1726]">
                        {proj.technologies.slice(0, 4).join(' · ')}
                      </span>
                      <span className="group-hover:translate-x-1.5 transition-all duration-300 text-lg font-bold text-[#5E1726]">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Cursor Preview Card */}
          <div
            className={`pointer-events-none hidden md:block absolute z-50 overflow-hidden rounded-xl shadow-2xl transition-opacity duration-200 ${
              hoveredFlagship ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: 320,
              height: 200,
              left: cursorPos.x,
              top: cursorPos.y,
            }}
          >
            {hoveredFlagship && (
              <div className="relative w-full h-full bg-[#232B27] border-2 border-[#5E1726] rounded-xl overflow-hidden">
                <img
                  src={hoveredFlagship.image}
                  alt={hoveredFlagship.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#5E1726]/95 to-transparent p-3">
                  <p className="text-xs font-bold text-[#F6F1E7]">
                    {hoveredFlagship.title}
                  </p>
                  <p className="text-[10px] font-mono text-[#EFE8DA]">
                    Click to open case study
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Kinetic Typography Roles List (ENGINEER, DESIGNER, BUILDER...) with Burgundy Sweep Fill */}
        <div className="min-h-[60vh] w-full flex items-center justify-center bg-[#F6F1E7] text-[#232B27] py-16 px-6 md:px-16 overflow-hidden">
          <div className="w-full max-w-6xl">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-[#5E1726] mb-6">
              Identity · Disciplines (Hover to activate)
            </p>
            <ul className="flex flex-col border-t border-[#687A70]/35">
              {KINETIC_ROLES.map((item) => (
                <li
                  key={item.role}
                  className="group relative overflow-hidden border-b border-[#687A70]/35 py-4 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-default"
                >
                  {/* Animated Deep Burgundy Sweep Background */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#5E1726] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0"
                  />

                  <span className="relative z-10 text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-[#232B27] group-hover:text-[#F6F1E7] group-hover:translate-x-4 transition-all duration-300">
                    {item.role}
                  </span>
                  <span className="relative z-10 text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#5E1726] group-hover:text-[#EFE8DA] group-hover:-translate-x-2 transition-all duration-300">
                    {item.caption}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
