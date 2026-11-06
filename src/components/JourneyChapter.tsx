import React, { useState } from 'react';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { portfolioContent } from '../data/content';

export const JourneyChapter: React.FC = () => {
  const { experience, education } = portfolioContent;
  const [selectedExpId, setSelectedExpId] = useState<string>(experience[0]?.id ?? 'finite-hr');

  return (
    <section
      id="journey"
      data-chapter-index="2"
      className="relative z-10 min-h-screen w-full py-28 px-6 md:px-12 lg:px-20 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl space-y-12 pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            <span>03. Professional Journey</span>
            <span aria-hidden="true">·</span>
            <span>Career Timeline &amp; Academic Foundation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Professional Experience &amp; Education
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A factual record of my progression from Frontend Developer in React.js and modern web interfaces to Full Stack Python Developer building Generative AI and Agentic AI systems.
          </p>
        </div>

        {/* Career Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Timeline Stepper */}
          <div className="lg:col-span-7 space-y-6">
            {experience.map((job, idx) => {
              const isSelected = selectedExpId === job.id;
              return (
                <article
                  key={job.id}
                  onClick={() => setSelectedExpId(job.id)}
                  className={`cursor-pointer rounded-2xl border p-6 sm:p-8 transition-colors ${
                    isSelected
                      ? 'border-cyan-500/60 bg-[#091224]/95'
                      : 'border-slate-800/90 bg-[#070c18]/90 hover:border-slate-700'
                  }`}
                >
                  {/* Unboxed Metadata Kicker */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-cyan-400 font-semibold tabular-nums">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400 tabular-nums">{job.period}</span>
                    </div>
                    <span>{job.location}</span>
                  </div>

                  {/* Role & Company */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                        {job.role}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-cyan-300 mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    <Briefcase className="h-5 w-5 text-slate-500 shrink-0 mt-1" />
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {job.summary}
                  </p>

                  {/* Responsibilities from Resume */}
                  <ul className="space-y-2.5 border-t border-slate-800/80 pt-4 mb-5">
                    {job.responsibilities.map((resp) => (
                      <li
                        key={resp}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                      >
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Unboxed Technology Metadata List */}
                  <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Stack:</span>
                    {job.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-200">{tech}</span>
                        {tIdx < job.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Column: Concise Education Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800/90 bg-[#070c18]/92 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <p className="font-mono text-xs text-cyan-400">Academic Credentials</p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                    Education
                  </h3>
                </div>
                <GraduationCap className="h-6 w-6 text-amber-400 shrink-0" />
              </div>

              <div className="divide-y divide-slate-800/80">
                {education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className={`${idx === 0 ? 'pb-5' : idx === education.length - 1 ? 'pt-5' : 'py-5'} space-y-1.5`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400 tabular-nums">
                      <span>{edu.completion}</span>
                    </div>
                    <h4 className="font-display text-base sm:text-lg font-semibold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-cyan-300">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
