import React from 'react';
import { X, Printer, Download, ExternalLink } from 'lucide-react';
import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROFILE,
  RESUME_PROJECTS_META,
  RESUME_SKILL_CATEGORIES,
  RESUME_SUMMARY_PARAGRAPHS,
} from '../data/resumeCatalog';
import { buildResumeMarkdown } from '../utils/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function generateResumeMarkdown(): string {
  return buildResumeMarkdown({
    profile: RESUME_PROFILE,
    summaryParagraphs: RESUME_SUMMARY_PARAGRAPHS,
    skillCategories: RESUME_SKILL_CATEGORIES,
    experience: RESUME_EXPERIENCE.map((exp) => ({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      responsibilities: [...exp.responsibilities],
    })),
    projects: RESUME_PROJECTS_META.map((proj) => ({
      title: proj.title,
      subtitle: proj.subtitle,
      statusLabel: proj.statusLabel,
      technologies: [...proj.technologies],
      githubUrl: proj.githubUrl || undefined,
      liveUrl: proj.liveUrl,
      resumeBullets: [...proj.resumeBullets],
    })),
    education: RESUME_EDUCATION.map((edu) => ({
      degree: edu.degree,
      institution: edu.institution,
      completion: edu.completion,
    })),
  });
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadResumeFile = () => {
    const mdContent = generateResumeMarkdown();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tarun_Pediredla_Resume.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tarun Pediredla Resume"
      onClick={onClose}
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#141A17]/85 backdrop-blur-md p-4 sm:p-8 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl rounded-2xl border border-[#7A8B82]/40 bg-[#F5EFE6] p-6 sm:p-10 text-[#1B231F] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7A8B82]/30 pb-5 mb-6 print:hidden">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold">
              Verified Curriculum Vitae · 4+ Years Exp
            </p>
            <h2 className="font-display text-xl font-bold text-[#1B231F]">
              {RESUME_PROFILE.name} — Resume
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 rounded-lg bg-[#6B1D2F] px-4 py-2 text-xs font-semibold text-[#F5EFE6] hover:bg-[#85243A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Save as PDF / Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadResumeFile}
              className="inline-flex items-center gap-2 rounded-lg border border-[#4E5E56]/40 bg-[#EDE3D5] px-4 py-2 text-xs font-semibold text-[#1B231F] hover:border-[#6B1D2F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[#6B1D2F]" />
              <span>Download Resume (.md)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#4E5E56]/40 bg-[#EDE3D5] text-[#1B231F] hover:bg-[#6B1D2F] hover:text-[#F5EFE6] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 text-sm">
          {/* Header */}
          <div className="border-b border-[#7A8B82]/30 pb-5">
            <h1 className="font-display text-3xl font-bold text-[#1B231F]">
              {RESUME_PROFILE.name}
            </h1>
            <p className="text-base font-semibold text-[#6B1D2F] mt-1">
              {RESUME_PROFILE.professionalTitle}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#2D3933]">
              <span>{RESUME_PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <a
                href={`tel:${RESUME_PROFILE.phoneClean}`}
                className="hover:text-[#6B1D2F] hover:underline"
              >
                {RESUME_PROFILE.phone}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`mailto:${RESUME_PROFILE.email}`}
                className="hover:text-[#6B1D2F] hover:underline"
              >
                {RESUME_PROFILE.email}
              </a>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
              <a
                href={RESUME_PROFILE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B1D2F] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>{RESUME_PROFILE.portfolioLabel}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESUME_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B1D2F] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>{RESUME_PROFILE.linkedinLabel}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={RESUME_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B1D2F] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>github.com/tarunpediredla-GenAi</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#232D28]">
              {RESUME_SUMMARY_PARAGRAPHS[0]}
            </p>
          </div>

          {/* Technical Skills (All 8 Resume Categories) */}
          <div className="space-y-3 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Technical Skills ({RESUME_SKILL_CATEGORIES.length} Domains)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#232D28]">
              {RESUME_SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className="rounded-lg bg-[#EFE8DA]/75 border border-[#7A8B82]/25 px-3 py-2"
                >
                  <span className="font-semibold text-[#1B231F]">
                    {category.title}:{' '}
                  </span>
                  <span>
                    {category.skills
                      .map((s) =>
                        s.contextNote ? `${s.name} (${s.contextNote})` : s.name
                      )
                      .join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Professional Experience
            </h3>
            {RESUME_EXPERIENCE.map((job) => (
              <div key={job.id} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-[#1B231F]">
                    {job.company} ·{' '}
                    <span className="text-[#4E5E56] font-semibold">
                      {job.role}
                    </span>
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#6B1D2F] tabular-nums">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs text-[#232D28]">
                  {job.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects (All 5 Resume Projects) */}
          <div className="space-y-4 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Selected Projects
            </h3>
            {RESUME_PROJECTS_META.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-display text-base font-bold text-[#1B231F]">
                      {proj.title}
                    </h4>
                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-[#EFE8DA] border border-[#6B1D2F]/25 text-[#6B1D2F]">
                      {proj.statusLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6B1D2F] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4E5E56] font-semibold hover:text-[#6B1D2F] hover:underline inline-flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="font-mono text-[11px] text-[#4E5E56] font-semibold">
                  {proj.technologies.join(' · ')}
                </p>
                <ul className="space-y-1 pl-4 list-disc text-xs text-[#232D28]">
                  {proj.resumeBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Education
            </h3>
            <div className="space-y-2 text-xs">
              {RESUME_EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-[#1B231F]">
                      {edu.degree}
                    </span>
                    <span className="text-[#4E5E56]"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono font-semibold text-[#6B1D2F] tabular-nums">
                    {edu.completion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
