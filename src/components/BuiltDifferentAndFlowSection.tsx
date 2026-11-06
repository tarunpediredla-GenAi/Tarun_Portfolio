import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CAREER_TIMELINE,
  EDUCATION_HISTORY,
  SKILL_CATEGORIES,
  TARUN_PROFILE,
} from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface BuiltDifferentAndFlowSectionProps {
  onOpenResume: () => void;
}

/**
 * Interactive 3D WebGL Cybernetic AI Bot & Orbital Core for the right side of "Built Different."
 * Matches the interactive Spline robot stage from portfolio-cinematic-sage.vercel.app
 * with pointer tracking, drag rotation, and responsive holographic lighting.
 */
function CyberneticBotCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.3, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio & Cybernetic Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 4.5, 14);
    cyanRim.position.set(-4, 2, 3);
    scene.add(cyanRim);

    const orangeRim = new THREE.PointLight(0xfd5200, 4.0, 14);
    orangeRim.position.set(4, -2.5, 2.5);
    scene.add(orangeRim);

    // Root Robot Group
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Materials
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      metalness: 0.88,
      roughness: 0.18,
    });
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x262932,
      metalness: 0.78,
      roughness: 0.25,
    });
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x05070b,
      metalness: 0.95,
      roughness: 0.08,
    });
    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const orangeAccentMat = new THREE.MeshBasicMaterial({
      color: 0xfd5200,
    });
    const holoWireMat = new THREE.MeshBasicMaterial({
      color: 0xc8a882,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    // Head Group (tracks mouse)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.95, 0);
    robotGroup.add(headGroup);

    // Cranium
    const headGeo = new THREE.BoxGeometry(1.55, 1.15, 1.25);
    const headMesh = new THREE.Mesh(headGeo, darkChromeMat);
    headGroup.add(headMesh);

    // Beveled Crown Plate
    const crownGeo = new THREE.BoxGeometry(1.3, 0.16, 1.05);
    const crownMesh = new THREE.Mesh(crownGeo, gunmetalMat);
    crownMesh.position.set(0, 0.64, 0);
    headGroup.add(crownMesh);

    // Visor Faceplate
    const visorGeo = new THREE.BoxGeometry(1.36, 0.62, 0.14);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.6);
    headGroup.add(visorMesh);

    // Expressive Cybernetic Eyes
    const leftEyeGeo = new THREE.CapsuleGeometry(0.09, 0.14, 8, 16);
    leftEyeGeo.rotateZ(Math.PI / 2);
    const leftEye = new THREE.Mesh(leftEyeGeo, eyeGlowMat);
    leftEye.position.set(-0.32, 0.04, 0.68);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(leftEyeGeo, eyeGlowMat);
    rightEye.position.set(0.32, 0.04, 0.68);
    headGroup.add(rightEye);

    // Side Audio/Sensor Pods
    const earGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 24);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, gunmetalMat);
    leftEar.position.set(-0.85, 0.02, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, gunmetalMat);
    rightEar.position.set(0.85, 0.02, 0);
    headGroup.add(rightEar);

    const earRingGeo = new THREE.TorusGeometry(0.2, 0.025, 12, 32);
    earRingGeo.rotateY(Math.PI / 2);
    const leftEarRing = new THREE.Mesh(earRingGeo, orangeAccentMat);
    leftEarRing.position.set(-0.95, 0.02, 0);
    headGroup.add(leftEarRing);

    const rightEarRing = new THREE.Mesh(earRingGeo, orangeAccentMat);
    rightEarRing.position.set(0.95, 0.02, 0);
    headGroup.add(rightEarRing);

    // Antenna
    const antennaStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.45, 12),
      gunmetalMat
    );
    antennaStem.position.set(0.45, 0.85, -0.1);
    headGroup.add(antennaStem);

    const antennaTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      orangeAccentMat
    );
    antennaTip.position.set(0.45, 1.1, -0.1);
    headGroup.add(antennaTip);

    // Neck Joint
    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.36, 0.35, 20),
      gunmetalMat
    );
    neckMesh.position.set(0, 0.22, 0);
    robotGroup.add(neckMesh);

    // Torso Chassis
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.65, 0);
    robotGroup.add(torsoGroup);

    const chestMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.75, 1.45, 1.1),
      darkChromeMat
    );
    torsoGroup.add(chestMesh);

    // Glowing AI Core Reactor on Chest
    const coreRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.035, 16, 48),
      orangeAccentMat
    );
    coreRing.position.set(0, 0.12, 0.57);
    torsoGroup.add(coreRing);

    const coreCenter = new THREE.Mesh(
      new THREE.CircleGeometry(0.24, 32),
      eyeGlowMat
    );
    coreCenter.position.set(0, 0.12, 0.56);
    torsoGroup.add(coreCenter);

    // Floating Shoulder Guards & Arms
    const shoulderGeo = new THREE.SphereGeometry(0.34, 24, 24);
    const leftShoulder = new THREE.Mesh(shoulderGeo, gunmetalMat);
    leftShoulder.position.set(-1.18, 0.38, 0);
    torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, gunmetalMat);
    rightShoulder.position.set(1.18, 0.38, 0);
    torsoGroup.add(rightShoulder);

    const armGeo = new THREE.CapsuleGeometry(0.18, 0.65, 12, 20);
    const leftArm = new THREE.Mesh(armGeo, darkChromeMat);
    leftArm.position.set(-1.25, -0.25, 0.15);
    leftArm.rotation.z = 0.18;
    leftArm.rotation.x = -0.25;
    torsoGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, darkChromeMat);
    rightArm.position.set(1.25, -0.25, 0.15);
    rightArm.rotation.z = -0.18;
    rightArm.rotation.x = -0.25;
    torsoGroup.add(rightArm);

    // Orbital Holographic Rings around the Robot
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.012, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0xc8a882,
        transparent: true,
        opacity: 0.35,
      })
    );
    outerRing.rotation.x = Math.PI / 2.3;
    outerRing.rotation.y = 0.32;
    orbitGroup.add(outerRing);

    const innerSphereWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 1),
      holoWireMat
    );
    orbitGroup.add(innerSphereWire);

    // Floating Particles
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer & Drag interaction
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let dragOffsetX = 0;
    let prevPointerX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = -((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));

      if (isDragging) {
        dragOffsetX += (e.clientX - prevPointerX) * 0.01;
        prevPointerX = e.clientX;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle hover bobbing
      robotGroup.position.y = Math.sin(t * 1.8) * 0.12;
      robotGroup.rotation.y +=
        (targetX * 0.45 + dragOffsetX - robotGroup.rotation.y) * 0.08;
      robotGroup.rotation.x += (-targetY * 0.18 - robotGroup.rotation.x) * 0.08;

      // Head tracks cursor more responsively
      headGroup.rotation.y += (targetX * 0.65 - headGroup.rotation.y) * 0.12;
      headGroup.rotation.x += (-targetY * 0.38 - headGroup.rotation.x) * 0.12;

      // Subtle blink every ~4 seconds
      const blinkWave = Math.sin(t * 0.8);
      const eyeScaleY = blinkWave > 0.985 ? 0.1 : 1;
      leftEye.scale.y = eyeScaleY;
      rightEye.scale.y = eyeScaleY;

      // Core & orbital rotation
      coreRing.rotation.z = t * 1.2;
      outerRing.rotation.z = -t * 0.35;
      innerSphereWire.rotation.y = t * 0.18;
      innerSphereWire.rotation.x = t * 0.11;
      particles.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      title="Move cursor or drag to interact with 3D AI Core"
    >
      <div className="pointer-events-none absolute bottom-5 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
        Interactive 3D Stage · Drag / Move
      </div>
    </div>
  );
}

export const BuiltDifferentAndFlowSection: React.FC<
  BuiltDifferentAndFlowSectionProps
> = ({ onOpenResume }) => {
  const curtainWrapRef = useRef<HTMLDivElement>(null);
  const bgContentRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const flowTriggerRef = useRef<HTMLDivElement>(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ScrollRevealCurtain animation (matches portfolio-cinematic-sage.vercel.app)
      if (curtainWrapRef.current && curtainRef.current && bgContentRef.current) {
        gsap.set(curtainRef.current, { yPercent: 100 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: curtainWrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
        tl.to(curtainRef.current, { yPercent: 0, ease: 'none' }, 0).to(
          bgContentRef.current,
          { scale: 0.92, ease: 'none' },
          0
        );
      }

      // 2. Flow Art Container 5-chapter diagonal rotation/scale sweep
      if (flowTriggerRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>(
          flowTriggerRef.current.querySelectorAll('.flow-art-section')
        );
        sections.forEach((sec) => {
          const textBlock = sec.querySelector('.flow-art-text');
          if (!textBlock) return;
          gsap.fromTo(
            textBlock,
            {
              rotation: 12,
              scale: 0.88,
              opacity: 0,
              y: 80,
              transformOrigin: 'bottom left',
            },
            {
              rotation: 0,
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 82%',
                end: 'top 25%',
                scrub: 0.5,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const filteredCategories =
    activeSkillCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeSkillCategory);

  return (
    <>
      {/* =====================================================================
          SECTION 2 — ScrollRevealCurtain ("Built Different." + 3D Robot Stage + #fd5200 Curtain)
         ===================================================================== */}
      <div
        ref={curtainWrapRef}
        id="about"
        style={{ height: '220vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Background Dark Split Stage */}
          <div
            ref={bgContentRef}
            style={{
              width: '100%',
              height: '100%',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <div className="w-full h-screen bg-[#080808] relative overflow-hidden flex items-center">
              {/* Ambient SVG Spotlight */}
              <svg
                className="animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-100 -top-40 left-0 md:left-60 md:-top-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3787 2842"
                fill="none"
              >
                <g filter="url(#spotlight-filter)">
                  <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill="white"
                    fillOpacity="0.18"
                  />
                </g>
                <defs>
                  <filter
                    id="spotlight-filter"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="151"
                      result="effect1_foregroundBlur"
                    />
                  </filter>
                </defs>
              </svg>

              <div className="flex flex-col md:flex-row w-full h-full">
                {/* Left Column: Built Different Editorial Copy */}
                <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-4 font-mono">
                    Interactive 3D · Full Stack Python &amp; AI
                  </p>
                  <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                    Built Different.
                  </h2>
                  <p className="mt-4 text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed">
                    Every pixel has purpose. Move your cursor to interact with
                    this 3D scene — a taste of the craft behind everything I
                    build across{' '}
                    <span className="text-neutral-200 font-medium">
                      Python, Django, React, Generative AI, and Agentic
                      workflows
                    </span>
                    .
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="#showcase"
                      className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      Explore My Work
                    </a>
                    <button
                      type="button"
                      onClick={onOpenResume}
                      className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Download Resume
                    </button>
                    <a
                      href={TARUN_PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-white/15 text-neutral-300 text-xs font-mono uppercase tracking-[0.2em] hover:border-white/40 hover:text-white transition-colors"
                    >
                      View GitHub ↗
                    </a>
                  </div>
                </div>

                {/* Right Column: Interactive 3D WebGL Stage */}
                <div className="flex-1 relative min-h-[360px] md:min-h-full">
                  <CyberneticBotCanvas />
                </div>
              </div>
            </div>
          </div>

          {/* Rising #fd5200 Orange Curtain */}
          <div
            ref={curtainRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#fd5200',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
            }}
          >
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  marginBottom: '1rem',
                  fontFamily: 'monospace',
                }}
              >
                Chapter 01
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                Who I Am
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 3 — 5 Stacked Full-Screen Flow-Art Editorial Chapters
         ===================================================================== */}
      <div ref={flowTriggerRef} className="flow-art-container">
        {/* CHAPTER 01 — WHO I AM (#fd5200) */}
        <section
          className="flow-art-section relative overflow-hidden"
          style={{
            backgroundColor: '#fd5200',
            color: '#fff',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div
            className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flow-art-label">
              <span className="flow-art-num">01</span>
              <span className="flow-art-Title">WHO I AM</span>
            </div>
            <h2 className="flow-art-heading mb-10">BUILD WITHOUT LIMITS</h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-white/25">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-white/80">
                  {TARUN_PROFILE.name} · {TARUN_PROFILE.role}
                </p>
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-white">
                  {TARUN_PROFILE.summary}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-white/85">
                  {TARUN_PROFILE.philosophy}
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 block mb-1">
                    Current Role
                  </span>
                  <p className="text-base font-bold text-white">
                    Full Stack Python Developer
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Finite HR &amp; IT Solution
                  </p>
                </div>
                <div className="rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 block mb-1">
                    Location
                  </span>
                  <p className="text-base font-bold text-white">
                    Visakhapatnam, India
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Open to Global &amp; Remote
                  </p>
                </div>
                <div className="rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 block mb-1">
                    AI Focus
                  </span>
                  <p className="text-base font-bold text-white">
                    GenAI &amp; Agentic AI
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Gemini · n8n · Vapi
                  </p>
                </div>
                <div className="rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 block mb-1">
                    Core Stack
                  </span>
                  <p className="text-base font-bold text-white">
                    Python · Django · React
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    PostgreSQL · MySQL · Docker
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 02 — THE MISSION + VERIFIED CAREER TIMELINE & EDUCATION (#000) */}
        <section
          id="journey"
          className="flow-art-section relative overflow-hidden"
          style={{
            backgroundColor: '#000',
            color: '#fff',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div
            className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flow-art-label">
              <span className="flow-art-num">02</span>
              <span className="flow-art-Title">The mission</span>
            </div>
            <h2 className="flow-art-heading">IMPACT OVER NOISE</h2>
            <div className="flow-art-sub">
              <span>CURIOSITY</span>
              <span>CRAFT</span>
              <span>IMPACT</span>
            </div>

            {/* Verified Career Timeline */}
            <div className="mt-14 pt-10 border-t border-white/15">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#fd5200] block mb-2">
                    Chapter 03 · Professional Journey
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                    Career Experience &amp; Education
                  </h3>
                </div>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-[0.2em]">
                  Verified Resume Record · Source of Truth
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CAREER_TIMELINE.map((role, index) => (
                  <div
                    key={role.id}
                    className="group relative rounded-2xl border border-white/12 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                          0{index + 1}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] ${
                            role.current
                              ? 'bg-[#fd5200]/20 text-[#fd5200] border border-[#fd5200]/40'
                              : 'bg-white/10 text-neutral-300'
                          }`}
                        >
                          {role.period}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-1">
                        {role.company}
                      </h4>
                      <p className="text-sm font-medium text-sky-400 mb-4">
                        {role.role}
                      </p>

                      <ul className="space-y-2 text-xs md:text-sm text-neutral-300 leading-relaxed mb-6">
                        {role.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#fd5200] mt-1">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Education Strip */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {EDUCATION_HISTORY.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c8a882] block mb-1">
                        Education · {edu.completion}
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        {edu.degree}
                      </h5>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1.5">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 03 — HOW I WORK + TECHNOLOGY UNIVERSE (#F5F0E8) */}
        <section
          id="skills"
          className="flow-art-section relative overflow-hidden"
          style={{
            backgroundColor: '#F5F0E8',
            color: '#000',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div
            className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flow-art-label">
              <span className="flow-art-num">03</span>
              <span className="flow-art-Title">HOW I WORK</span>
            </div>
            <h2 className="flow-art-heading">THINK. BUILD. SHIP.</h2>

            {/* Interactive Technology Universe Matrix */}
            <div className="mt-12 pt-10 border-t border-black/15">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#fd5200] block mb-2">
                    Chapter 04 · Technology Universe
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-black">
                    Full Stack Python, AI &amp; Cloud Ecosystem
                  </h3>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveSkillCategory('all')}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      activeSkillCategory === 'all'
                        ? 'bg-black text-[#F5F0E8]'
                        : 'bg-black/10 text-black hover:bg-black/20'
                    }`}
                  >
                    All Domains
                  </button>
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveSkillCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        activeSkillCategory === cat.id
                          ? 'bg-black text-[#F5F0E8]'
                          : 'bg-black/10 text-black hover:bg-black/20'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-2xl border border-black/15 bg-black/[0.03] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: cat.accent }}
                        />
                        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-black/60">
                          {cat.skills.length} Technologies
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-black mb-1">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-black/70 mb-5">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group relative px-3 py-1.5 rounded-lg bg-white border border-black/12 text-xs font-mono font-medium text-black flex items-center gap-1.5 shadow-xs"
                        >
                          <span>{skill.name}</span>
                          {skill.contextNote && (
                            <span
                              title={skill.contextNote}
                              className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#fd5200]/15 text-[#fd5200] font-semibold"
                            >
                              Project Tech
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 04 — THE VISION (#1A3DE8) */}
        <section
          className="flow-art-section"
          style={{ backgroundColor: '#1A3DE8', color: '#fff' }}
        >
          <div
            className="flow-art-text"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flow-art-label">
              <span className="flow-art-num">04</span>
              <span className="flow-art-Title">The vision</span>
            </div>
            <h2 className="flow-art-heading">BUILT TO LEAD.</h2>
          </div>
        </section>

        {/* CHAPTER 05 — LET'S TALK (#000) */}
        <section
          className="flow-art-section"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          <div
            className="flow-art-text"
            style={{ transformOrigin: 'bottom left' }}
          >
            <div className="flow-art-label">
              <span className="flow-art-num">05</span>
              <span className="flow-art-Title">LET&apos;S TALK</span>
            </div>
            <h2 className="flow-art-heading">GOT AN IDEA? LET&apos;S BUILD.</h2>
          </div>
        </section>
      </div>
    </>
  );
};
