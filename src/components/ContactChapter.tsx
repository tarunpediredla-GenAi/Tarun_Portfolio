import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Send,
  Download,
} from 'lucide-react';
import { portfolioContent } from '../data/content';

interface ContactChapterProps {
  onOpenResumeModal: () => void;
}

export const ContactChapter: React.FC<ContactChapterProps> = ({ onOpenResumeModal }) => {
  const { profile } = portfolioContent;
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderSubject, setSenderSubject] = useState(
    'Full Stack Python / AI Engineering Opportunity'
  );
  const [senderMessage, setSenderMessage] = useState('');

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(field);
    }
  };

  const handleComposeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      senderSubject.trim() || 'Inquiry from Portfolio Website'
    );
    const bodyLines = [
      senderName.trim() ? `Hello Tarun,\n\nMy name is ${senderName.trim()}.` : 'Hello Tarun,',
      '',
      senderMessage.trim() ||
        'I reviewed your Full Stack Python and Generative AI portfolio and would like to connect.',
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      data-chapter-index="5"
      className="relative z-10 min-h-screen w-full flex flex-col justify-between pt-28 pb-24 px-6 md:px-12 lg:px-20 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl my-auto space-y-12 pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 6 Columns: Direct Contact Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                <span>06. Contact</span>
                <span aria-hidden="true">·</span>
                <span>Direct Engineering Communication</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Let’s Build Intelligent Software Together
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Available for Full Stack Python, Django, React, Generative AI, and Agentic AI engineering roles and technical collaborations.
              </p>
            </div>

            {/* Verified Contact Details Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-[#070c18]/92 p-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#050811] text-cyan-400 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-slate-400">Email Address</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-mono text-sm font-medium text-white hover:text-cyan-300 truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-[#070c18]/92 p-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#050811] text-amber-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-slate-400">Phone</p>
                    <a
                      href="tel:+918074080773"
                      className="font-mono text-sm font-medium text-white hover:text-cyan-300 tabular-nums"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3.5 rounded-xl border border-slate-800/90 bg-[#070c18]/92 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#050811] text-cyan-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-400">Location</p>
                    <p className="text-sm font-medium text-white">{profile.location}</p>
                  </div>
                </div>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-[#070c18]/92 p-4 hover:border-cyan-500/60 transition-colors"
                >
                  <div>
                    <p className="font-mono text-xs text-slate-400">GitHub Profile</p>
                    <p className="text-sm font-medium text-cyan-300">
                      tarunpediredla-GenAi
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 shrink-0" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-[#091224] px-5 py-3 text-xs font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                <span>View &amp; Download Full Resume</span>
              </button>
            </div>
          </div>

          {/* Right 6 Columns: Direct Email Action Composer */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleComposeEmail}
              className="rounded-2xl border border-slate-800/90 bg-[#070c18]/94 p-6 sm:p-8 space-y-5"
            >
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  Send a Direct Email
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Opens your default email client pre-addressed to {profile.email}.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono text-slate-300"
                >
                  Your Name / Organization
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Hiring Manager / Recruiter Name"
                  className="w-full rounded-lg border border-slate-800 bg-[#050811] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono text-slate-300"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={senderSubject}
                  onChange={(e) => setSenderSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-[#050811] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Hi Tarun, we'd love to discuss a Full Stack Python & GenAI role..."
                  className="w-full rounded-lg border border-slate-800 bg-[#050811] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors whitespace-nowrap shrink-0"
              >
                <Send className="h-4 w-4" />
                <span>Compose Email to Tarun Pediredla</span>
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Quiet Footer */}
        <footer className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-200">{profile.name}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.professionalTitle}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-cyan-300 transition-colors"
            >
              Email
            </a>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="hover:text-cyan-300 transition-colors"
            >
              Resume
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};
