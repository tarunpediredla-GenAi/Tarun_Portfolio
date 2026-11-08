import React, { useCallback, useEffect, useState } from 'react';
import { FastForward, Terminal, Cpu, ShieldCheck } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { progress: 18, step: 'Initializing WebGL 2.0 PBR Studio Environment & ACES Tone Mapping' },
  { progress: 42, step: 'Loading Cybernetic Cheetah & Holographic AI Core Geometry' },
  { progress: 68, step: 'Calibrating GSAP ScrollTrigger 6-Chapter Camera Choreography' },
  { progress: 91, step: 'Mounting Verified Case Studies: InsureSphere AI · SLT Culture · Satya’s Education · Alex AI · Voice Planner' },
  { progress: 100, step: 'Command Center Ready — Tarun Pediredla Portfolio' },
];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const finishBoot = useCallback(() => {
    setIsExiting((prev) => {
      if (prev) return prev;
      window.setTimeout(() => {
        onComplete();
      }, 280);
      return true;
    });
  }, [onComplete]);

  useEffect(() => {
    // Respect prefers-reduced-motion immediately
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onComplete();
      return;
    }

    const interval = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= BOOT_SEQUENCE.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(finishBoot, 220);
          return prev;
        }
        return prev + 1;
      });
    }, 260);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        finishBoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishBoot, onComplete]);

  const currentStep = BOOT_SEQUENCE[stepIndex] ?? BOOT_SEQUENCE[0];

  return (
    <div
      role="dialog"
      aria-label="Portfolio loading screen"
      onClick={finishBoot}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#04070f] px-6 py-8 md:px-12 md:py-10 transition-opacity duration-300 cursor-pointer ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 font-display text-sm font-bold text-cyan-300">
            TP
          </div>
          <span className="font-display text-sm font-semibold tracking-wider text-slate-200">
            TARUN PEDIREDLA · PORTFOLIO INITIALIZATION
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finishBoot();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Skip Intro</span>
          <FastForward className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Center Telemetry Readout */}
      <div className="mx-auto w-full max-w-2xl my-auto py-8">
        <p className="font-mono text-xs text-cyan-400 mb-2">
          VISAKHAPATNAM, INDIA · FULL STACK PYTHON &amp; AI ENGINEERING
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Tarun Pediredla
        </h2>

        {/* Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800 mb-6">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-200"
            style={{ width: `${currentStep.progress}%` }}
          />
        </div>

        {/* Step Log */}
        <div className="rounded-xl border border-slate-800/90 bg-[#080d1a] p-5 space-y-2.5 font-mono text-xs">
          {BOOT_SEQUENCE.map((item, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={item.step}
                className={`flex items-center justify-between gap-4 transition-opacity duration-150 ${
                  idx <= stepIndex ? 'opacity-100' : 'opacity-25'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isCompleted ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  ) : isCurrent ? (
                    <Cpu className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <Terminal className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                  )}
                  <span className={`truncate ${isCurrent ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                    {item.step}
                  </span>
                </div>
                <span className="tabular-nums text-slate-500 shrink-0">{item.progress}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Hint */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
        <span>Click anywhere or press Enter / Space / Esc to enter immediately</span>
        <span className="font-mono tabular-nums text-cyan-400">{currentStep.progress}%</span>
      </div>
    </div>
  );
};
