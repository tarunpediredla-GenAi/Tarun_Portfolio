import React, { useState } from 'react';
import {
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Info,
  Maximize2,
  X,
  ArrowRight,
  Layers,
  Cpu,
  Monitor,
} from 'lucide-react';
import { portfolioContent, type ProjectCaseStudy } from '../data/content';

export const ProjectsChapter: React.FC = () => {
  const { projects } = portfolioContent;
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, number>>({
    'insuresphere-ai': 0,
    'satya-education': 0,
    'alex-interviewer': 0,
    'voice-task-planner': 0,
  });
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [lightboxProject, setLightboxProject] = useState<ProjectCaseStudy | null>(null);

  const handleSelectScreen = (projectId: string, idx: number) => {
    setActiveTabByProject((prev) => ({ ...prev, [projectId]: idx }));
  };

  return (
    <section
      id="projects"
      data-chapter-index="4"
      className="relative z-10 min-h-screen w-full py-28 px-6 md:px-12 lg:px-20 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl space-y-14 pointer-events-auto">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            <span>05. Featured Projects</span>
            <span aria-hidden="true">·</span>
            <span>Production Case Studies &amp; System Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Featured Real-World Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In-depth technical case studies inspected directly from my public GitHub repositories, detailing system architecture, implemented functionality, and deployment specifics.
          </p>
        </div>

        {/* Three Project Case Studies */}
        <div className="space-y-16">
          {projects.map((project) => {
            const activeScreenIdx = activeTabByProject[project.id] ?? 0;
            const activeScreen = project.screens[activeScreenIdx] ?? project.screens[0];
            const imageFailed = failedImages[project.id];

            return (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-800/90 bg-[#070c18]/94 p-6 sm:p-10 space-y-8"
              >
                {/* Top Project Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-slate-800/80 pb-6">
                  <div className="space-y-2.5 max-w-3xl">
                    {/* Clean Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                      <span className="tabular-nums">Case Study {project.index}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">
                        {project.technologies.join(' · ')}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-amber-400/95">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Links (GitHub + Verified Live URL if available) */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0b1326] px-4 py-2.5 text-xs font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
                      <span>View GitHub Repository</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Interactive Gallery & Architecture Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left 7 Columns: Visual Showcase & Interactive Screen Switcher */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    {/* Interactive Gallery View Switcher Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#050811] p-1 border border-slate-800">
                        {project.screens.map((scr, sIdx) => {
                          const isTabActive = activeScreenIdx === sIdx;
                          return (
                            <button
                              key={scr.id}
                              type="button"
                              onClick={() => handleSelectScreen(project.id, sIdx)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                                isTabActive
                                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                                  : 'text-slate-300 hover:text-white'
                              }`}
                            >
                              0{sIdx + 1}. {scr.title.split(' ')[0]} {scr.title.split(' ')[1]}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#050811] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Inspect Fullscreen</span>
                      </button>
                    </div>

                    {/* Visual Viewport Frame */}
                    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#050811] aspect-video flex flex-col justify-between">
                      {activeScreenIdx === 0 && !imageFailed ? (
                        <div className="relative h-full w-full group">
                          <img
                            src={project.heroImage}
                            alt={`${project.title} — ${activeScreen.title}`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                            }
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                            <p className="font-mono text-xs text-cyan-300">
                              {activeScreen.title}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-200 mt-1">
                              {activeScreen.caption}
                            </p>
                          </div>
                        </div>
                      ) : activeScreenIdx === 1 ? (
                        /* Interactive Module & Component Breakdown View */
                        <div className="h-full w-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#070d1c] via-[#050811] to-[#0a1529]">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-cyan-400" />
                              <span className="font-display text-sm font-bold text-white">
                                {activeScreen.title}
                              </span>
                            </div>
                            <span className="font-mono text-xs text-amber-400">
                              Interactive System Modules
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto py-3">
                            {activeScreen.highlights.map((hl, hIdx) => (
                              <div
                                key={hl}
                                className="rounded-lg border border-slate-800 bg-[#091224] p-4 space-y-2"
                              >
                                <span className="font-mono text-xs text-cyan-400 tabular-nums">
                                  MODULE 0{hIdx + 1}
                                </span>
                                <h4 className="font-display text-sm font-semibold text-white">
                                  {hl}
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  Verified implementation in repository source tree.
                                </p>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-slate-300 border-t border-slate-800 pt-3">
                            {activeScreen.caption}
                          </p>
                        </div>
                      ) : (
                        /* Interactive Visual Architecture Flow Diagram */
                        <div className="h-full w-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#060b17] via-[#050811] to-[#0d182e]">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-amber-400" />
                              <span className="font-display text-sm font-bold text-white">
                                {project.title} — System Signal Flow
                              </span>
                            </div>
                            <span className="font-mono text-xs text-cyan-400">
                              End-to-End Pipeline
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto py-3">
                            {project.architectureFlow.map((node) => (
                              <div
                                key={node.step}
                                className="rounded-lg border border-slate-800/90 bg-[#091224] p-3 space-y-1"
                              >
                                <div className="font-mono text-[11px] text-amber-400 tabular-nums">
                                  Step {node.step}
                                </div>
                                <div className="font-display text-xs font-bold text-white">
                                  {node.node}
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-2">
                                  {node.detail}
                                </p>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-slate-300 border-t border-slate-800 pt-3">
                            {activeScreen.caption}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Screen Highlights Bar */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                      <Layers className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      {activeScreen.highlights.map((item, idx) => (
                        <React.Fragment key={item}>
                          <span className="text-slate-200">{item}</span>
                          {idx < activeScreen.highlights.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Right 5 Columns: Problem Statement, Architecture & Implementation */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="font-mono text-xs text-cyan-400">
                          01. Problem Statement
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {project.problemStatement}
                        </p>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-800/80 pt-4">
                        <h4 className="font-mono text-xs text-cyan-400">
                          02. Architecture Overview
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {project.architectureOverview}
                        </p>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-800/80 pt-4">
                        <h4 className="font-mono text-xs text-cyan-400">
                          03. Implementation Explanation
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {project.implementationExplanation}
                        </p>
                      </div>
                    </div>

                    {project.liveUrlNote && (
                      <div className="rounded-lg border border-slate-800 bg-[#050811] px-3.5 py-2.5 text-xs font-mono text-slate-300">
                        Deployment Status: {project.liveUrlNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Architecture Pipeline Strip */}
                <div className="border-t border-slate-800/80 pt-6 space-y-4">
                  <h4 className="font-display text-sm font-semibold text-white">
                    System Architecture Pipeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {project.architectureFlow.map((flow, fIdx) => (
                      <div
                        key={flow.step}
                        className="relative rounded-xl border border-slate-800/90 bg-[#050811] p-4 flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-amber-400 tabular-nums">{flow.step}</span>
                          {fIdx < project.architectureFlow.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 text-slate-600 hidden lg:block" />
                          )}
                        </div>
                        <div className="font-display text-sm font-bold text-white">
                          {flow.node}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {flow.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Implemented vs. Planned / Partial Functionality Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800/80 pt-6">
                  {/* Implemented in Repository */}
                  <div className="rounded-xl border border-slate-800/90 bg-[#050811]/90 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Implemented Functionality (Verified in Repository)</span>
                    </div>
                    <ul className="space-y-2">
                      {project.implementedFeatures.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                        >
                          <span className="text-cyan-400 font-mono mt-0.5">·</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architectural Scope & Planned / Partial Notes */}
                  <div className="rounded-xl border border-slate-800/90 bg-[#050811]/90 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                      <Info className="h-4 w-4 shrink-0" />
                      <span>Repository Scope &amp; Runtime Notes</span>
                    </div>
                    <ul className="space-y-2">
                      {project.plannedOrPartialFeatures.map((note) => (
                        <li
                          key={note}
                          className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                        >
                          <span className="text-amber-400 font-mono mt-0.5">·</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxProject.title} Fullscreen Preview`}
          onClick={() => setLightboxProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 pointer-events-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-[#070c18] p-6 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="font-mono text-xs text-cyan-400">
                  Case Study {lightboxProject.index} · {lightboxProject.technologies.join(' · ')}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  {lightboxProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProject(null)}
                aria-label="Close modal"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#050811]">
              <img
                src={lightboxProject.heroImage}
                alt={lightboxProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lightboxProject.screens.map((scr, idx) => (
                <div
                  key={scr.id}
                  className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-2"
                >
                  <div className="font-mono text-xs text-cyan-400">
                    0{idx + 1}. {scr.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{scr.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
