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
    '- **Frontend**: HTML, CSS, JavaScript, TypeScript, React.js, Recharts, Responsive Design',
    '- **Backend**: Python, Django, Django REST Framework, Express, REST APIs, Webhooks',
    '- **Databases**: MySQL, PostgreSQL, Firebase Firestore',
    '- **AI & Automation**: Generative AI, Agentic AI, Google Gemini, Policy RAG, n8n, Vapi',
    '- **Development & Deployment**: GitHub, Docker, CI/CD, Google Maps Platform, Vercel',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141A17]/85 backdrop-blur-md p-4 sm:p-8 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl rounded-2xl border border-[#7A8B82]/40 bg-[#F5EFE6] p-6 sm:p-10 text-[#1B231F] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7A8B82]/30 pb-5 mb-6 print:hidden">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#6B1D2F] font-semibold">
              Verified Curriculum Vitae
            </p>
            <h2 className="font-display text-xl font-bold text-[#1B231F]">
              {profile.name} — Resume
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
            <h1 className="font-display text-3xl font-bold text-[#1B231F]">{profile.name}</h1>
            <p className="text-base font-semibold text-[#6B1D2F] mt-1">
              {profile.professionalTitle}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#2D3933]">
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
                className="text-[#6B1D2F] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>github.com/tarunpediredla-GenAi</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Professional Experience
            </h3>
            {experience.map((job) => (
              <div key={job.id} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-[#1B231F]">
                    {job.role} · <span className="text-[#4E5E56]">{job.company}</span>
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

          {/* Technical Skills */}
          <div className="space-y-2 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#232D28]">
              <div>
                <span className="font-semibold text-[#1B231F]">Frontend: </span>
                HTML, CSS, JavaScript, TypeScript, React.js, Recharts
              </div>
              <div>
                <span className="font-semibold text-[#1B231F]">Backend: </span>
                Python, Django, Django REST Framework, Express
              </div>
              <div>
                <span className="font-semibold text-[#1B231F]">Databases: </span>
                MySQL, PostgreSQL, Firebase Firestore
              </div>
              <div>
                <span className="font-semibold text-[#1B231F]">AI &amp; Automation: </span>
                Generative AI, Agentic AI, Google Gemini, Policy RAG, n8n, Vapi
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-[#1B231F]">Development &amp; Deployment: </span>
                GitHub, Docker, CI/CD, Google Maps Platform, Vercel
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Featured Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-[#1B231F]">
                    {proj.title}
                  </h4>
                  <span className="font-mono text-xs text-[#4E5E56] font-semibold">
                    {proj.technologies.join(' · ')}
                  </span>
                </div>
                <p className="text-xs text-[#232D28]">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-[#7A8B82]/30 pt-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B1D2F]">
              Education
            </h3>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-[#1B231F]">{edu.degree}</span>
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
