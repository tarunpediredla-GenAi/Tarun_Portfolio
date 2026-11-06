import React from 'react';
import { X, Printer, Download, ExternalLink } from 'lucide-react';
import { portfolioContent } from '../data/content';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function generateResumeMarkdown(): string {
  const { profile, experience, skills, projects, education } = portfolioContent;
  const lines: string[] = [
    `# ${profile.name}`,
    `**${profile.professionalTitle}**`,
    `${profile.location} | ${profile.phone} | ${profile.email}`,
    `GitHub: ${profile.github}`,
    '',
    '## Professional Summary',
    ...portfolioContent.about.summaryParagraphs,
    '',
    '## Professional Experience',
    ...experience.flatMap((exp) => [
      `### ${exp.role} — ${exp.company}`,
      `${exp.period}`,
      ...exp.responsibilities.map((r) => `- ${r}`),
      '',
    ]),
    '## Technical Skills',
    '- **Frontend**: HTML, CSS, JavaScript, React.js, TypeScript (Portfolio Projects)',
    '- **Backend**: Python, Django, Express (Portfolio Projects)',
    '- **Databases**: MySQL, PostgreSQL, Firebase Firestore',
    '- **AI & Automation**: Generative AI, Agentic AI, Google Gemini, n8n, Vapi',
    '- **Development & Deployment**: GitHub, Docker, CI/CD, Vercel',
    `> Note: ${skills.note}`,
    '',
    '## Featured Projects',
    ...projects.flatMap((p) => [
      `### ${p.title} (${p.technologies.join(', ')})`,
      `GitHub: ${p.githubUrl}${p.liveUrl ? ` | Live: ${p.liveUrl}` : ''}`,
      p.description,
      ...p.implementedFeatures.map((f) => `- ${f}`),
      '',
    ]),
    '## Education',
    ...education.map((e) => `- **${e.degree}** — ${e.institution} (${e.completion})`),
  ];
  return lines.join('\n');
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { profile, experience, projects, education } = portfolioContent;

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#070c18] p-6 sm:p-10 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 print:hidden">
          <div>
            <p className="font-mono text-xs text-cyan-400">Verified Curriculum Vitae</p>
            <h2 className="font-display text-xl font-bold text-white">
              {profile.name} — Resume
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Save as PDF / Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadResumeFile}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Download Resume (.md)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 text-sm">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <h1 className="font-display text-3xl font-bold text-white">{profile.name}</h1>
            <p className="text-base font-medium text-cyan-300 mt-1">
              {profile.professionalTitle}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              <span>{profile.location}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.phone}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.email}</span>
              <span aria-hidden="true">·</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                <span>github.com/tarunpediredla-GenAi</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Professional Experience
            </h3>
            {experience.map((job) => (
              <div key={job.id} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-white">
                    {job.role} · <span className="text-cyan-300">{job.company}</span>
                  </h4>
                  <span className="font-mono text-xs text-amber-400 tabular-nums">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                  {job.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2 border-t border-slate-800 pt-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div>
                <span className="font-semibold text-white">Frontend: </span>
                HTML, CSS, JavaScript, React.js, TypeScript (Portfolio Projects)
              </div>
              <div>
                <span className="font-semibold text-white">Backend: </span>
                Python, Django, Express (Portfolio Projects)
              </div>
              <div>
                <span className="font-semibold text-white">Databases: </span>
                MySQL, PostgreSQL, Firebase Firestore
              </div>
              <div>
                <span className="font-semibold text-white">AI &amp; Automation: </span>
                Generative AI, Agentic AI, Google Gemini, n8n, Vapi
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-white">Development &amp; Deployment: </span>
                GitHub, Docker, CI/CD, Vercel
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4 border-t border-slate-800 pt-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Featured Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-white">
                    {proj.title}
                  </h4>
                  <span className="font-mono text-xs text-slate-400">
                    {proj.technologies.join(' · ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-slate-800 pt-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Education
            </h3>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-white">{edu.degree}</span>
                    <span className="text-slate-400"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-amber-400 tabular-nums">
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
