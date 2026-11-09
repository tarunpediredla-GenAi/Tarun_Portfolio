import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import {
  ExternalLink,
  ArrowDown,
  Download,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import {
  portfolioContent,
  TARUN_PORTRAIT_IMAGE,
  type ProjectCaseStudy,
} from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface IdeHeroSectionProps {
  onOpenSearch: () => void;
  onSelectProject: (proj: ProjectCaseStudy) => void;
  onOpenResume: () => void;
}

const HERO_STACK_PILLS = [
  'Python',
  'Django',
  'React.js',
  'JavaScript',
  'AWS Cloud',
  'GenAI · Gemini',
  'Agentic AI · n8n & Vapi',
];

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#showcase' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const IdeHeroSection: React.FC<IdeHeroSectionProps> = ({
  onOpenSearch,
  onSelectProject,
  onOpenResume,
}) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroLeftRef = useRef<HTMLDivElement | null>(null);
  const heroPortraitWrapRef = useRef<HTMLDivElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [pointerNormalized, setPointerNormalized] = useState({ x: 0, y: 0 });
  const [scrolledDown, setScrolledDown] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced-motion preference for accessibility
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Track scroll for floating top navbar style
  useEffect(() => {
    const onScroll = () => {
      setScrolledDown(window.scrollY > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Three.js Ambient Starlight & Electric-Blue/Violet Particle Stage in Hero Background
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 14;

    const particleCount = 130;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color('#38BDF8');
    const colorViolet = new THREE.Color('#8B5CF6');
    const colorIce = new THREE.Color('#E0F2FE');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const pick = i % 3 === 0 ? colorBlue : i % 3 === 1 ? colorViolet : colorIce;
      colors[i * 3] = pick.r;
      colors[i * 3 + 1] = pick.g;
      colors[i * 3 + 2] = pick.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let pointerTargetX = 0;
    let pointerTargetY = 0;
    const onPointerMove = (e: MouseEvent) => {
      pointerTargetX = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 1.4;
      pointerTargetY = -(e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        points.rotation.y = elapsed * 0.035 + pointerTargetX * 0.18;
        points.rotation.x = Math.sin(elapsed * 0.2) * 0.05 + pointerTargetY * 0.12;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  // GSAP + ScrollTrigger Entrance & Scroll-Driven Depth Transitions
  useLayoutEffect(() => {
    const heroEl = heroSectionRef.current;
    const leftEl = heroLeftRef.current;
    const portraitEl = heroPortraitWrapRef.current;

    if (!heroEl || !leftEl || !portraitEl) return;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // 1. Entrance reveal for left text items
        const textItems = leftEl.querySelectorAll('.hero-reveal-item');
        gsap.fromTo(
          textItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );

        // 2. Cinematic entrance for the 3D portrait stage
        gsap.fromTo(
          portraitEl,
          { opacity: 0, scale: 0.92, y: 26, rotateY: -8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            duration: 1.1,
            delay: 0.15,
            ease: 'power3.out',
          }
        );

        // 3. Scroll-driven depth parallax on the hero section
        gsap.to(portraitEl, {
          yPercent: -8,
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to(leftEl, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, heroEl);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Subtle mouse-following 3D parallax handler for the portrait stage
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    setPointerNormalized({ x: nx, y: ny });
  };

  const handleHeroMouseLeave = () => {
    setPointerNormalized({ x: 0, y: 0 });
  };

  const { profile } = portfolioContent;

  const portraitRotateY = pointerNormalized.x * 8;
  const portraitRotateX = -pointerNormalized.y * 6;
  const portraitTranslateX = pointerNormalized.x * 12;
  const portraitTranslateY = pointerNormalized.y * 9;

  return (
    <>
      {/* =====================================================================
          TOP FLOATING NAVIGATION BAR (Adaptive Glassmorphism)
         ===================================================================== */}
      <header className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none flex justify-center">
        <nav
          aria-label="Primary portfolio navigation"
          className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
            scrolledDown
              ? 'border-[#687A70]/45 bg-[#FAF7F2]/92 text-[#232B27]'
              : 'border-sky-400/25 bg-[#050A1F]/80 text-slate-100 shadow-[0_10px_40px_rgba(2,6,23,0.75)]'
          }`}
        >
          <a
            href="#"
            className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-colors ${
              scrolledDown
                ? 'bg-[#5E1726] text-[#F6F1E7]'
                : 'bg-gradient-to-r from-sky-500 to-violet-600 text-white'
            }`}
          >
            TP
          </a>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  scrolledDown
                    ? 'text-[#232B27] hover:bg-[#DCE3DF] hover:text-[#5E1726]'
                    : 'text-slate-200 hover:bg-white/10 hover:text-sky-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenResume}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              scrolledDown
                ? 'bg-[#EFE8DA] border border-[#687A70]/40 text-[#5E1726] hover:bg-[#5E1726] hover:text-[#F6F1E7]'
                : 'bg-white/10 border border-sky-400/30 text-sky-300 hover:bg-sky-500 hover:text-slate-950'
            }`}
          >
            Resume
          </button>
          <button
            type="button"
            onClick={onOpenSearch}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-colors cursor-pointer ${
              scrolledDown
                ? 'bg-[#DCE3DF] text-[#232B27] hover:bg-[#5E1726] hover:text-[#F6F1E7]'
                : 'bg-violet-500/20 border border-violet-400/30 text-violet-200 hover:bg-violet-500 hover:text-white'
            }`}
          >
            ⌘K
          </button>
        </nav>
      </header>

      {/* =====================================================================
          CINEMATIC DARK NAVY & ELECTRIC-BLUE/VIOLET 3D PORTRAIT HERO
         ===================================================================== */}
      <section
        ref={heroSectionRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="Tarun Pediredla Developer Hero"
        className="relative w-full min-h-screen overflow-hidden flex items-center pt-24 pb-16 lg:py-24"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 72% 38%, rgba(56, 189, 248, 0.16) 0%, rgba(139, 92, 246, 0.14) 36%, rgba(5, 9, 26, 0.98) 72%, #02040A 100%)',
          backgroundColor: '#030614',
        }}
      >
        {/* Three.js Ambient Particle & Starlight Canvas */}
        <canvas
          ref={particleCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Ambient Deep Navy, Electric-Blue & Violet Volumetric Light Fields */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-[130px] opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(139, 92, 246, 0.15) 60%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-[-8%] w-[38rem] h-[38rem] rounded-full blur-[140px] opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.52) 0%, rgba(56, 189, 248, 0.3) 55%, transparent 100%)',
          }}
        />

        {/* Subtle Architectural Grid Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148, 163, 184, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.35) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        {/* Main Responsive Container: Left Content (Desktop) / Stacked (Mobile) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: Typography, Tagline, CTAs & Verified Stack */}
            <div
              ref={heroLeftRef}
              className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1"
            >
              {/* Location & Availability Badge */}
              <div className="hero-reveal-item inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 px-4 py-1.5 rounded-full border border-sky-400/30 bg-[#0A122C]/85 backdrop-blur-md text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-200 mb-6 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                </span>
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Hyderabad, Telangana</span>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <span className="text-sky-300">Available for Full-Time Roles</span>
              </div>

              {/* Primary Display Name: HI, I'M TARUN PEDIREDLA */}
              <h1
                className="hero-reveal-item font-display font-black tracking-tight leading-[1.03] text-white mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.85rem)' }}
              >
                <span className="block text-white drop-shadow-[0_8px_30px_rgba(56,189,248,0.2)]">
                  HI, I&apos;M
                </span>
                <span className="block text-white drop-shadow-[0_8px_30px_rgba(56,189,248,0.2)]">
                  TARUN PEDIREDLA
                </span>
              </h1>

              {/* Subtitle: Python Full Stack Developer | GenAI & Agentic AI */}
              <h2 className="hero-reveal-item text-base sm:text-xl md:text-2xl font-display font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-violet-300 mb-5">
                Python Full Stack Developer | GenAI &amp; Agentic AI
              </h2>

              {/* Quote / Tagline */}
              <blockquote className="hero-reveal-item relative max-w-2xl text-sm sm:text-lg md:text-xl text-slate-300/95 font-normal italic leading-relaxed mb-6 px-4 lg:px-0 lg:pl-5 lg:border-l-2 lg:border-sky-400/60">
                &ldquo;Building intelligent, scalable, and visually stunning digital
                experiences.&rdquo;
              </blockquote>

              {/* Primary CTA Buttons: View My Projects & Download Resume */}
              <div className="hero-reveal-item flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-9 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('showcase')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group relative inline-flex items-center justify-center gap-2.5 h-12 sm:h-13 px-7 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-violet-300 hover:from-sky-300 hover:to-violet-200 shadow-[0_0_32px_rgba(56,189,248,0.45)] transition-all cursor-pointer"
                >
                  <span>View My Projects</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2.5 h-12 sm:h-13 px-7 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-white bg-white/[0.06] hover:bg-white/[0.12] border border-sky-400/40 hover:border-sky-300 backdrop-blur-md shadow-[0_0_24px_rgba(139,92,246,0.2)] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-sky-300" />
                  <span>Download Resume</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-[#091026]/80 border border-slate-700/80 hover:border-violet-400/60 transition-all"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-violet-300" />
                </motion.a>
              </div>

              {/* Core Technology Stack Pills */}
              <div className="hero-reveal-item flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-2xl">
                {HERO_STACK_PILLS.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold text-slate-200 bg-[#0A132E]/90 border border-slate-700/70 hover:border-sky-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: 3D Parallax Studio Portrait with Glowing Rim Light */}
            <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
              <div
                ref={heroPortraitWrapRef}
                style={{
                  perspective: '1400px',
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]"
              >
                {/* 3D Interactive Tilt Stage */}
                <div
                  style={{
                    transform: prefersReducedMotion
                      ? 'none'
                      : `rotateX(${portraitRotateX.toFixed(2)}deg) rotateY(${portraitRotateY.toFixed(2)}deg) translate3d(${portraitTranslateX.toFixed(1)}px, ${portraitTranslateY.toFixed(1)}px, 0)`,
                    transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative flex flex-col items-center animate-float-slow"
                >
                  {/* Soft Glowing Rim Light Behind Head and Shoulders */}
                  <div
                    aria-hidden="true"
                    className="animate-rim-pulse pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[40px] blur-2xl z-0"
                    style={{
                      background:
                        'radial-gradient(ellipse 68% 64% at 50% 34%, rgba(56, 189, 248, 0.52) 0%, rgba(139, 92, 246, 0.44) 48%, rgba(3, 6, 20, 0) 80%)',
                    }}
                  />

                  {/* Secondary Rim Halo Ring Behind Shoulders */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-6 inset-x-4 bottom-8 rounded-[34px] border border-sky-400/30 shadow-[0_0_65px_rgba(56,189,248,0.28),inset_0_0_45px_rgba(139,92,246,0.22)] z-0"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(14, 25, 58, 0.72) 0%, rgba(5, 9, 24, 0.92) 70%, rgba(3, 6, 20, 0) 100%)',
                    }}
                  />

                  {/* Portrait Container with Smooth Lower-Part Background Blending */}
                  <div className="relative z-10 w-full aspect-[3/4] rounded-[32px] overflow-hidden hero-portrait-blend hero-portrait-radial-feather">
                    {/* Top Rim Specular Edge Highlight */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 rounded-[32px]"
                      style={{
                        boxShadow:
                          'inset 0 1px 2px rgba(186, 230, 253, 0.35), inset 0 0 38px rgba(3, 6, 20, 0.65)',
                      }}
                    />

                    {/* Enhanced Studio Portrait of Tarun Pediredla */}
                    <img
                      src={TARUN_PORTRAIT_IMAGE}
                      alt="Tarun Pediredla — Python Full Stack Developer | GenAI & Agentic AI"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-top select-none transition-transform duration-700 ease-out"
                    />

                    {/* Smooth Lower-Torso Gradient Blend into Hero Background */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 z-20"
                      style={{
                        background:
                          'linear-gradient(to top, #030614 4%, rgba(3, 6, 20, 0.72) 38%, rgba(3, 6, 20, 0) 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator inside Hero */}
          <div className="mt-10 lg:mt-12 flex flex-col items-center justify-center gap-1.5 text-center">
            <a
              href="#about"
              className="group inline-flex flex-col items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-sky-300 transition-colors"
            >
              <span>Scroll to Explore 3D Portfolio</span>
              <ArrowDown className="w-4 h-4 text-sky-400 vp-scroll-chevron" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
