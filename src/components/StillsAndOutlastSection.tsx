import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  size: i % 3 === 0 ? 2.5 : 1.5,
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

  // 3D Coverflow Carousel state
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  // Flagship Projects hover preview state
  const [hoveredFlagship, setHoveredFlagship] =
    useState<FeaturedProject | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const flagshipListRef = useRef<HTMLDivElement>(null);

  // Build 6 gallery stills from Tarun's generated project & command center assets
  const galleryStills = [
    {
      num: '01',
      title: "Satya's Education Platform",
      tag: 'React · TypeScript · Django · Cashfree',
      image: FEATURED_PROJECTS[0].image,
      project: FEATURED_PROJECTS[0],
      side: 'left' as const,
    },
    {
      num: '02',
      title: 'Alex AI Mock Interviewer',
      tag: 'React · Express · Google Gemini · Voice AI',
      image: FEATURED_PROJECTS[1].image,
      project: FEATURED_PROJECTS[1],
      side: 'right' as const,
    },
    {
      num: '03',
      title: 'AI Voice Task Planner',
      tag: 'n8n · Vapi · Gemini · Google Sheets',
      image: FEATURED_PROJECTS[2].image,
      project: FEATURED_PROJECTS[2],
      side: 'left' as const,
    },
    {
      num: '04',
      title: 'AI Command Architecture',
      tag: 'Python · Agentic Workflows · Docker · CI/CD',
      image: COMMAND_BACKDROP_IMAGE,
      project: FEATURED_PROJECTS[1],
      side: 'right' as const,
    },
  ];

  const carouselSlides = [
    {
      project: FEATURED_PROJECTS[0],
      badge: 'E-Commerce & EdTech',
      caption: 'Live production portal on Vercel with Cashfree checkout',
    },
    {
      project: FEATURED_PROJECTS[1],
      badge: 'Conversational Voice AI',
      caption: '50-question bank, system design whiteboard & Hiring Committee',
    },
    {
      project: FEATURED_PROJECTS[2],
      badge: 'Agentic Automation',
      caption: 'Voice request → Vapi → n8n → Gemini → Google Sheets',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PageFoldTransition (top/bottom halves fold open revealing Chapter 03 / DESIGNED WITH INTENT)
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
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
            0.32
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
          SECTION 6A — PageFoldTransition (280vh, Chapter 03 / DESIGNED WITH INTENT)
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
            backgroundColor: '#050505',
            perspective: '1200px',
          }}
        >
          {/* Top Folding Half */}
          <div
            ref={topHalfRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#0a0a0a',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(200,168,130,0.15)',
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.08)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              CRAFT
            </p>
          </div>

          {/* Bottom Folding Half */}
          <div
            ref={bottomHalfRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#0a0a0a',
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(200,168,130,0.15)',
              willChange: 'transform, opacity',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.08)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              PRECISION
            </p>
          </div>

          {/* Gold Horizon Seam Line */}
          <div
            ref={horizonLineRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '2px',
              background:
                'linear-gradient(90deg, transparent, #c8a882, #fff, #c8a882, transparent)',
              transform: 'translateY(-50%) scaleX(0)',
              zIndex: 10,
              boxShadow:
                '0 0 30px rgba(200,168,130,0.6), 0 0 80px rgba(200,168,130,0.3)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Revealed Chapter 03 Centerpiece */}
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
                fontSize: '0.75rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#c8a882',
                fontFamily: 'monospace',
                marginBottom: '1rem',
              }}
            >
              Chapter 03
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              DESIGNED WITH
              <br />
              <span style={{ color: '#c8a882' }}>INTENT</span>
            </h2>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 6B — #gallery ("Ch · 04 — Field of Stills" + 3D Skewed Gallery + Coverflow Carousel)
         ===================================================================== */}
      <section
        id="gallery"
        style={{
          position: 'relative',
          background: '#080808',
          overflow: 'hidden',
          padding: '0 0 4rem',
        }}
      >
        {/* Corner Viewfinder Brackets (#c8a882) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            width: 28,
            height: 28,
            borderTop: '1px solid rgba(200,168,130,0.28)',
            borderLeft: '1px solid rgba(200,168,130,0.28)',
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
            borderTop: '1px solid rgba(200,168,130,0.28)',
            borderRight: '1px solid rgba(200,168,130,0.28)',
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
            borderBottom: '1px solid rgba(200,168,130,0.28)',
            borderLeft: '1px solid rgba(200,168,130,0.28)',
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
            borderBottom: '1px solid rgba(200,168,130,0.28)',
            borderRight: '1px solid rgba(200,168,130,0.28)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* Twinkling Stars */}
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
                  background: '#ffffff',
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
              borderBottom: '1px solid rgba(255,255,255,0.08)',
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
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#c8a882',
                  boxShadow: '0 0 10px rgba(200,168,130,0.8)',
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.68rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#c8a882',
                }}
              >
                Ch · 04 — Field of Stills
              </span>
            </div>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
              }}
            >
              [ Perspective · Depth · Motion ]
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              04 <span style={{ color: 'rgba(200,168,130,0.5)' }}>/</span> 07
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
                  fontSize: '0.68rem',
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.42)',
                  marginBottom: '1rem',
                }}
              >
                — Selected Frames / 2025 — 2026
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 500,
                  fontSize: 'clamp(2.6rem, 6vw, 5.25rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.025em',
                  color: '#f5f1ea',
                  margin: 0,
                }}
              >
                Where Design{' '}
                <em
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 400,
                    background:
                      'linear-gradient(135deg, #f5f1ea 0%, #c8a882 55%, #8a6d4b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
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
                  fontSize: 'clamp(0.92rem, 1.05vw, 1.02rem)',
                  lineHeight: 1.7,
                  color: 'rgba(245,241,234,0.62)',
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
                {galleryStills.map((still) => (
                  <div
                    key={still.num}
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
                      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/15 transition-transform duration-500 group-hover:scale-[1.03]"
                    >
                      <img
                        src={still.image}
                        alt={still.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c8a882] block">
                            Frame {still.num}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {still.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
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
                      className="w-4/5 h-16 mt-2 rounded-xl overflow-hidden opacity-55 pointer-events-none"
                    >
                      <img
                        src={still.image}
                        alt=""
                        className="w-full h-full object-cover transform -scale-y-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Coverflow Carousel with Volumetric Light Rays */}
          <div className="relative mt-20 rounded-3xl border border-white/10 bg-[#050507] py-16 px-6 overflow-hidden">
            <div
              className="light-rays-container"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(200,168,130,0.16), transparent 75%)',
              }}
            />

            <div className="relative z-10 text-center mb-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#c8a882] block mb-2">
                Interactive Deck · 3D Coverflow
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white">
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
                    }}
                    className="cc-card rounded-2xl overflow-hidden border border-white/15 bg-[#111319] shadow-2xl cursor-pointer"
                  >
                    <img
                      src={slide.project.image}
                      alt={slide.project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-6 flex flex-col justify-end">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c8a882] mb-1">
                        {slide.badge}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-white">
                        {slide.project.title}
                      </h4>
                      <p className="text-xs text-neutral-300 mt-1">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="relative z-10 flex items-center justify-center gap-3 mt-6">
              {carouselSlides.map((s, idx) => (
                <button
                  key={s.project.id}
                  type="button"
                  onClick={() => setActiveCarouselIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activeCarouselIdx === idx
                      ? 'bg-[#c8a882] text-black font-semibold'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                >
                  0{idx + 1} · {s.project.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7A — "Built to Outlast the Moment" 7-Panel Zoom Parallax Portal
         ===================================================================== */}
      <div
        ref={zoomPortalWrapRef}
        className="relative h-[260vh] bg-[#09090B]"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* Headline above portal */}
          <div
            className="absolute top-12 inset-x-0 text-center z-20 pointer-events-none px-4 transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - zoomProgress * 2.5) }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#c8a882] mb-2">
              Visual Immersion
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              Built to <em className="italic text-[#c8a882]">Outlast</em> the
              Moment.
            </h2>
          </div>

          {/* Center Portal Scaling to Fullscreen */}
          <div
            style={{
              transform: `scale(${1 + zoomProgress * 2.8})`,
              willChange: 'transform',
            }}
            className="relative w-[34vw] min-w-[260px] h-[34vh] min-h-[200px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl z-10"
          >
            <img
              src={COMMAND_BACKDROP_IMAGE}
              alt="Tarun AI Command Center"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/90 px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/15">
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
            ];
            const scaleFactor = 1 + zoomProgress * (1.8 + idx * 0.4);
            return (
              <div
                key={proj.id}
                style={{
                  transform: `scale(${scaleFactor})`,
                  opacity: Math.max(0, 1 - zoomProgress * 1.35),
                }}
                className={`hidden md:block absolute ${positions[idx]} w-[20vw] h-[20vh] rounded-xl overflow-hidden border border-white/10 shadow-xl pointer-events-none`}
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
          SECTION 7B — Cyan Conic Lamp ("Engineering Reality From Imagination.")
         ===================================================================== */}
      <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0 py-24 px-6">
        {/* Cyan Glow Conic Lamp Beam */}
        <div className="relative flex w-full items-center justify-center mb-10">
          <div className=" h-36 w-[28rem] max-w-full rounded-full bg-cyan-500 opacity-35 blur-3xl" />
          <div className="absolute h-24 w-64 rounded-full bg-cyan-400 opacity-60 blur-2xl" />
          <div className="absolute h-0.5 w-[26rem] max-w-full bg-cyan-400 shadow-[0_0_25px_#22d3ee]" />
        </div>

        <h2 className="bg-gradient-to-br from-slate-200 to-slate-500 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl">
          Engineering Reality <br /> From Imagination.
        </h2>
        <p className="mt-4 text-slate-400 text-center max-w-xl text-sm md:text-base">
          Bridging clean Python &amp; Django backend architecture with modern
          React interfaces and autonomous AI workflows.
        </p>
      </div>

      {/* =====================================================================
          SECTION 7C — #flagship ("Flagship Projects" Interactive Hover-Preview List + Kinetic Role List)
         ===================================================================== */}
      <div id="flagship" className="bg-[#080808] py-20">
        <section
          ref={flagshipListRef}
          onMouseMove={handleFlagshipMouseMove}
          className="relative w-full mx-auto max-w-5xl px-6 py-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-3 font-mono">
            Quick Index · Verified Repositories
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
            Flagship Projects
          </h2>

          <div className="divide-y divide-white/8 border-y border-white/8">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onMouseEnter={() => setHoveredFlagship(proj)}
                onMouseLeave={() => setHoveredFlagship(null)}
                onClick={() => onSelectProject(proj)}
                className="group block py-8 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-6">
                    <span className="text-xs font-mono text-neutral-600 group-hover:text-white transition-colors duration-300">
                      {proj.number}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-semibold text-neutral-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {proj.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-end md:self-center">
                    <span className="text-xs text-neutral-500 font-mono tracking-wider uppercase group-hover:text-neutral-300 transition-colors duration-300">
                      {proj.technologies.slice(0, 4).join(' · ')}
                    </span>
                    <span className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-lg">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
              <div className="relative w-full h-full bg-neutral-950 border border-white/15 rounded-xl overflow-hidden">
                <img
                  src={hoveredFlagship.image}
                  alt={hoveredFlagship.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <p className="text-xs font-bold text-white">
                    {hoveredFlagship.title}
                  </p>
                  <p className="text-[10px] font-mono text-amber-300">
                    Click to open case study
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Kinetic Typography Roles List (ENGINEER, DESIGNER, BUILDER...) */}
        <div className="min-h-[60vh] w-full flex items-center justify-center bg-[#080808] text-white py-16 px-6 md:px-16 overflow-hidden">
          <div className="w-full max-w-6xl">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-500 mb-6">
              Identity · Disciplines
            </p>
            <ul className="flex flex-col">
              {KINETIC_ROLES.map((item) => (
                <li
                  key={item.role}
                  className="group relative border-b border-white/8 py-3 flex items-center justify-between cursor-default"
                >
                  <span className="text-4xl md:text-7xl font-black tracking-tight text-white/25 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                    {item.role}
                  </span>
                  <span className="text-xs md:text-sm font-mono uppercase tracking-[0.22em] text-neutral-500 group-hover:text-[#fd5200] transition-colors">
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
