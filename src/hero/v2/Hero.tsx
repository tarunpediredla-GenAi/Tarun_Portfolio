import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Compass,
  Sliders,
} from 'lucide-react';
import { portfolioContent } from '../../data/content';
import {
  stageStore,
  subscribeStageStore,
  setVisualMode,
  setOrbitSpeed,
  setManualChapterOverride,
  type HeroVisualMode,
} from './beat';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { profile, chapters } = portfolioContent;
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [visualMode, setLocalVisualMode] = useState<HeroVisualMode>(stageStore.visualMode);
  const [orbitSpeed, setLocalOrbitSpeed] = useState<number>(stageStore.orbitSpeed);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(stageStore.activeChapterIndex);
  const [manualOverride, setLocalManualOverride] = useState<number | null>(
    stageStore.manualChapterOverride
  );

  useEffect(() => {
    const unsubscribe = subscribeStageStore(() => {
      setLocalVisualMode(stageStore.visualMode);
      setLocalOrbitSpeed(stageStore.orbitSpeed);
      setActiveChapterIdx(stageStore.activeChapterIndex);
      setLocalManualOverride(stageStore.manualChapterOverride);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'h' || e.key === 'H') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectVisualMode = (mode: HeroVisualMode) => {
    setVisualMode(mode);
  };

  const handleSpeedChange = (speed: number) => {
    setOrbitSpeed(speed);
  };

  const handleCameraPreset = (idx: number | null) => {
    setManualChapterOverride(idx);
    if (idx !== null && chapters[idx]) {
      const el = document.getElementById(chapters[idx].id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResetTurntable = () => {
    stageStore.userYaw = 0;
    stageStore.userPitch = 0;
    setManualChapterOverride(null);
  };

  const activeChapter = chapters[activeChapterIdx] ?? chapters[0];

  return (
    <>
      {/* CHAPTER 01 — INTRODUCTION */}
      <section
        id="hero"
        data-chapter-index="0"
        className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-24 pb-28 px-6 md:px-12 lg:px-20 pointer-events-none"
      >
        <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Primary Typographic Focal Anchor */}
          <div className="lg:col-span-7 space-y-6 pointer-events-auto">
            {/* Editorial Chapter Indicator (Clean unboxed metadata with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-cyan-400">
              <span>Chapter 01</span>
              <span aria-hidden="true">·</span>
              <span>{profile.location}</span>
              <span aria-hidden="true">·</span>
              <span>Interactive 3D Command Center</span>
            </div>

            {/* Opening Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                {profile.openingHeadline}
              </h1>
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 tracking-wide">
                {profile.role}
              </p>
            </div>

            {/* Secondary Title */}
            <p className="font-mono text-xs sm:text-sm tracking-widest text-amber-400/95">
              {profile.secondaryTitle}
            </p>

            {/* Tagline */}
            <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
              {profile.tagline}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2.5 rounded-lg border border-slate-700 bg-[#0b1224]/90 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg border border-slate-800 bg-[#070c18]/90 px-5 py-3 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>View GitHub</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            {/* Subtle Interaction & Scroll to Explore Cue */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/70 max-w-xl">
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 group-hover:border-cyan-400 transition-colors">
                  <ArrowDown className="h-3 w-3 animate-bounce text-cyan-400" />
                </span>
                <span className="font-medium">Scroll to Explore Chapters 01–06</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Compass className="h-3.5 w-3.5 text-amber-400" />
                <span>Drag background to rotate 3D sculpture</span>
              </span>
            </div>
          </div>

          {/* Right Column: Unobstructed 3D Viewport Space */}
          <div className="hidden lg:block lg:col-span-5 h-[460px]" aria-hidden="true" />
        </div>
      </section>

      {/* UNIFIED COLLAPSIBLE BOTTOM CONTROL DOCK (Zero Viewport Occlusion) */}
      <div
        role="region"
        aria-label="3D Scene Controls Dock"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-[min(920px,94vw)] pointer-events-auto"
      >
        <div className="flex flex-col items-center">
          {/* Collapse / Expand Toggle Tab */}
          <button
            type="button"
            onClick={() => setDockCollapsed((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-t-lg border border-b-0 border-slate-800 bg-[#080d1a] px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
            title="Toggle 3D Scene Controls (Shortcut: H)"
          >
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              {dockCollapsed
                ? `Show Scene Controls · Ch. ${activeChapter.index} ${activeChapter.title}`
                : `Hide Scene Controls (H) · ${activeChapter.cameraLabel}`}
            </span>
            {dockCollapsed ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Collapsible Dock Drawer (Solid dark surface without backdrop-filter over WebGL) */}
          {!dockCollapsed && (
            <div className="w-full rounded-xl border border-slate-800 bg-[#080d1a]/95 px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
              {/* Sculpture Motif Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 mr-1 hidden sm:inline">3D Motif:</span>
                <div className="flex items-center gap-1 rounded-lg bg-[#050811] p-1 border border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleSelectVisualMode('cheetah')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      visualMode === 'cheetah'
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Cyber Cheetah
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectVisualMode('core')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      visualMode === 'core'
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    AI Core
                  </button>
                </div>
              </div>

              {/* Camera Chapter Quick Jump */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {chapters.map((ch, idx) => {
                  const isActive =
                    manualOverride !== null ? manualOverride === idx : activeChapterIdx === idx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleCameraPreset(idx)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      {ch.index}. {ch.title}
                    </button>
                  );
                })}
              </div>

              {/* Orbit Speed & Reset Camera */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="hidden md:flex items-center gap-1 rounded-lg bg-[#050811] p-1 border border-slate-800/80">
                  {[0.5, 1.0, 2.0].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2 py-0.5 text-xs font-mono tabular-nums rounded transition-colors whitespace-nowrap shrink-0 ${
                        orbitSpeed === spd
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleResetTurntable}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#050811] px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
                  title="Reset 3D camera rotation & sync with scroll"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sync Scroll</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
