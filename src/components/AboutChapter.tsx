import React from 'react';
import { portfolioContent } from '../data/content';

export const AboutChapter: React.FC = () => {
  const { about, profile } = portfolioContent;

  return (
    <section
      id="about"
      data-chapter-index="1"
      className="relative z-10 min-h-screen w-full flex items-center py-28 px-6 md:px-12 lg:px-20 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Spacer so the laterally shifted 3D sculpture remains visible on desktop */}
        <div className="hidden lg:block lg:col-span-4" aria-hidden="true" />

        {/* Right Holographic Information Panel */}
        <div className="lg:col-span-8 space-y-8 pointer-events-auto">
          <div className="rounded-2xl border border-slate-800/90 bg-[#070c18]/92 p-7 sm:p-10 space-y-8">
            {/* Editorial Kicker */}
            <div className="space-y-3 border-b border-slate-800/80 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                <span>02. About Me</span>
                <span aria-hidden="true">·</span>
                <span>{profile.professionalTitle}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {about.heading}
              </h2>
            </div>

            {/* Summary Prose */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {about.summaryParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Development Philosophy Pillars */}
            <div className="pt-4 border-t border-slate-800/80 space-y-5">
              <h3 className="font-display text-lg font-semibold text-white">
                {about.philosophyTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {about.philosophyPillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="space-y-2.5 border-t border-slate-800 pt-4"
                  >
                    <div className="font-mono text-xs text-amber-400 tabular-nums">
                      {pillar.index}. {pillar.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Contact & Location Footer Strip */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-200">{profile.name}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.location}</span>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-cyan-400 hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-cyan-300 transition-colors"
              >
                github.com/tarunpediredla-GenAi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
