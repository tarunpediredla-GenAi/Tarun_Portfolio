import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  TARUN_PORTRAIT_IMAGE,
  FEATURED_PROJECTS,
  TARUN_PROFILE,
} from '../data/content';

interface ProfileCardAndFooterProps {
  onOpenResume: () => void;
}

export const ProfileCardAndFooter: React.FC<ProfileCardAndFooterProps> = ({
  onOpenResume,
}) => {
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(
    null
  );
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [mailTriggered, setMailTriggered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrapper = cardWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = Math.max(0, Math.min(100, (x / Math.max(rect.width, 1)) * 100));
    const py = Math.max(0, Math.min(100, (y / Math.max(rect.height, 1)) * 100));

    const centerX = px - 50;
    const centerY = py - 50;
    const distFromCenter = Math.min(
      1,
      Math.hypot(centerX, centerY) / 50
    );

    const rotateX = -(centerY / 3.5);
    const rotateY = centerX / 3.5;

    wrapper.style.setProperty('--pointer-x', `${px.toFixed(1)}%`);
    wrapper.style.setProperty('--pointer-y', `${py.toFixed(1)}%`);
    wrapper.style.setProperty(
      '--pointer-from-center',
      distFromCenter.toFixed(2)
    );
    wrapper.style.setProperty('--pointer-from-top', (py / 100).toFixed(2));
    wrapper.style.setProperty('--pointer-from-left', (px / 100).toFixed(2));
    wrapper.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
    wrapper.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
    wrapper.style.setProperty('--card-opacity', '0.85');
  };

  const handlePointerLeave = () => {
    const wrapper = cardWrapperRef.current;
    if (!wrapper) return;
    wrapper.style.setProperty('--pointer-x', '50%');
    wrapper.style.setProperty('--pointer-y', '50%');
    wrapper.style.setProperty('--pointer-from-center', '0');
    wrapper.style.setProperty('--rotate-x', '0deg');
    wrapper.style.setProperty('--rotate-y', '0deg');
    wrapper.style.setProperty('--card-opacity', '0');
  };

  const copyToClipboard = (value: string, field: 'email' | 'phone') => {
    navigator.clipboard?.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName || 'Hiring Team'}`
    );
    const body = encodeURIComponent(
      `Hi Tarun,\n\n${senderMessage || 'I would love to connect regarding a Full Stack Python / AI opportunity.'}\n\nFrom: ${senderName}\nReply Email: ${senderEmail}`
    );
    window.location.href = `mailto:${TARUN_PROFILE.email}?subject=${subject}&body=${body}`;
    setMailTriggered(true);
  };

  return (
    <>
      {/* =====================================================================
          SECTION 8A — #contact (Muted Sage Grey Stage + Holographic Card + Warm Cream Composer)
         ===================================================================== */}
      <div
        id="contact"
        className="w-full py-24 px-6 flex flex-col items-center justify-center bg-[#DCE3DF] border-t border-[#687A70]/40"
      >
        <motion.div
          initial={{ opacity: 0.9, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#5E1726] font-bold mb-3 font-mono">
            Chapter 06 · Behind the Code
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#232B27] mb-4 text-center">
            Let&apos;s Connect
          </h2>
          <p className="text-[#35423C] font-medium text-sm md:text-base max-w-md text-center mb-12">
            Hover the holographic developer card to see it come alive — or reach
            out directly via email, phone, or GitHub.
          </p>
        </motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: .pc-card-wrapper Holographic 3D Tilt Profile Card */}
          <motion.div
            initial={{ opacity: 0.9, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              ref={cardWrapperRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="pc-card-wrapper animate-float-slow"
            >
              <div className="pc-behind" />
              <section className="pc-card">
                <div className="pc-inside">
                  <div className="pc-shine" />
                  <div className="pc-glare" />
                  <div className="pc-content">
                    <div className="pc-details">
                      <h3>{TARUN_PROFILE.name}</h3>
                      <p>Python Full Stack Developer | GenAI &amp; Agentic AI</p>
                    </div>
                  </div>
                  <div className="pc-content pc-avatar-content">
                    <img
                      className="avatar object-cover object-top"
                      alt="Tarun Pediredla"
                      src={TARUN_PORTRAIT_IMAGE}
                      loading="lazy"
                    />
                    <div className="pc-user-info">
                      <div className="pc-user-details">
                        <div className="pc-mini-avatar">
                          <img
                            alt="Tarun Pediredla Mini Avatar"
                            src={TARUN_PORTRAIT_IMAGE}
                            loading="lazy"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="pc-user-text">
                          <div className="pc-handle">
                            {TARUN_PROFILE.handle}
                          </div>
                          <div className="pc-status">
                            {TARUN_PROFILE.status} · Hyderabad, Telangana
                          </div>
                        </div>
                      </div>
                      <a
                        href={`mailto:${TARUN_PROFILE.email}`}
                        className="pc-contact-btn no-underline"
                      >
                        Contact Me
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Right: Direct Verified Contact Channels & Quick Message Composer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Verified Email Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-[#687A70]/45 hover:border-[#5E1726] bg-[#FAF7F2] p-5 flex flex-col justify-between shadow-xs transition-colors"
              >
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726] block mb-1">
                    Direct Email
                  </span>
                  <p className="text-sm font-mono font-bold text-[#232B27] break-all">
                    {TARUN_PROFILE.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={`mailto:${TARUN_PROFILE.email}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#5E1726] text-[#F6F1E7] text-xs font-mono font-bold hover:bg-[#751E31] transition-colors"
                  >
                    Send Email ↗
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() =>
                      copyToClipboard(TARUN_PROFILE.email, 'email')
                    }
                    className="px-3.5 py-1.5 rounded-lg border border-[#687A70]/50 bg-[#EFE8DA] text-xs font-mono font-bold text-[#232B27] hover:border-[#5E1726] transition-colors cursor-pointer"
                  >
                    {copiedField === 'email' ? '✓ Copied' : 'Copy'}
                  </motion.button>
                </div>
              </motion.div>

              {/* Verified Phone Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-[#687A70]/45 hover:border-[#5E1726] bg-[#FAF7F2] p-5 flex flex-col justify-between shadow-xs transition-colors"
              >
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726] block mb-1">
                    Direct Phone · India
                  </span>
                  <p className="text-base font-mono font-bold text-[#232B27]">
                    {TARUN_PROFILE.phone}
                  </p>
                  <p className="text-xs text-[#35423C] mt-0.5 font-semibold">
                    {TARUN_PROFILE.location}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={`tel:${TARUN_PROFILE.phoneClean}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#5E1726] text-[#F6F1E7] text-xs font-mono font-bold hover:bg-[#751E31] transition-colors"
                  >
                    Call Now
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() =>
                      copyToClipboard(TARUN_PROFILE.phone, 'phone')
                    }
                    className="px-3.5 py-1.5 rounded-lg border border-[#687A70]/50 bg-[#EFE8DA] text-xs font-mono font-bold text-[#232B27] hover:border-[#5E1726] transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? '✓ Copied' : 'Copy'}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Interactive Message Composer */}
            <motion.form
              initial={{ opacity: 0.92, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              onSubmit={handleContactSubmit}
              className="rounded-2xl border border-[#687A70]/45 bg-[#FAF7F2] p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#232B27]">
                  Send a Direct Message
                </h3>
                <span className="text-[11px] font-mono font-semibold text-[#5E1726]">
                  Opens your mail client pre-filled
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#35423C] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full rounded-xl border border-[#687A70]/50 bg-[#F6F1E7] px-3.5 py-2.5 text-sm text-[#232B27] placeholder:text-[#687A70] focus:border-[#5E1726] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#35423C] mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-[#687A70]/50 bg-[#F6F1E7] px-3.5 py-2.5 text-sm text-[#232B27] placeholder:text-[#687A70] focus:border-[#5E1726] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#35423C] mb-1.5">
                  Project or Opportunity Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Tell Tarun about your Full Stack Python, Django, React, Gen AI, or Agentic AI role or project..."
                  className="w-full rounded-xl border border-[#687A70]/50 bg-[#F6F1E7] px-3.5 py-2.5 text-sm text-[#232B27] placeholder:text-[#687A70] focus:border-[#5E1726] focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#5E1726] text-[#F6F1E7] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#751E31] transition-colors cursor-pointer shadow-xs"
                  >
                    Compose &amp; Send ↗
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={onOpenResume}
                    className="px-4 py-2.5 rounded-full border border-[#687A70]/55 bg-[#EFE8DA] text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#232B27] hover:border-[#5E1726] transition-colors cursor-pointer"
                  >
                    View / Download Resume
                  </motion.button>
                </div>

                {mailTriggered && (
                  <span className="text-xs font-mono font-bold text-[#5E1726]">
                    ✓ Mail composer opened for {TARUN_PROFILE.email}
                  </span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 8B — Monumental Full-Screen Footer (Deep Burgundy #4A111D + Warm Cream Beige #F6F1E7)
         ===================================================================== */}
      <section className="relative w-full mt-0 overflow-hidden">
        <footer className="border-t border-[#F6F1E7]/20 bg-[#4A111D] text-[#EFE8DA] relative">
          <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[34rem] sm:min-h-[36rem] md:min-h-[40rem] relative p-6 py-12">
            {/* Top Footer Content */}
            <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full z-10">
              <div className="w-full flex flex-col items-center">
                <div className="space-y-2 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F6F1E7] text-3xl font-bold tracking-tight">
                      {TARUN_PROFILE.name}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[#DCE3DF] font-bold">
                    Full Stack Python Developer with Gen AI &amp; Agentic AI ·{' '}
                    {TARUN_PROFILE.location}
                  </p>
                  <p className="text-[#EFE8DA] font-medium text-center w-full max-w-md sm:w-96 px-4 sm:px-0">
                    {TARUN_PROFILE.tagline}
                  </p>
                </div>

                {/* Social & Contact Icons */}
                <div className="flex mb-8 mt-5 gap-5">
                  <a
                    href={TARUN_PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EFE8DA] hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-6 h-6 hover:scale-110 duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-1.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${TARUN_PROFILE.email}`}
                    className="text-[#EFE8DA] hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <svg
                      className="w-6 h-6 hover:scale-110 duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>

                  <a
                    href={`tel:${TARUN_PROFILE.phoneClean}`}
                    className="text-[#EFE8DA] hover:text-white transition-colors"
                    aria-label="Phone"
                  >
                    <svg
                      className="w-6 h-6 hover:scale-110 duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </a>
                </div>

                {/* Section Navigation Links */}
                <div className="flex flex-wrap gap-5 text-sm font-semibold text-[#F6F1E7] justify-center mt-2">
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#about"
                  >
                    About
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#journey"
                  >
                    Experience
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#skills"
                  >
                    Skills
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#showcase"
                  >
                    Projects
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#gallery"
                  >
                    Gallery
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#flagship"
                  >
                    Flagship
                  </a>
                  <a
                    className="hover:text-[#DCE3DF] duration-300"
                    href="#contact"
                  >
                    Contact
                  </a>
                </div>

                {/* Verified Project Repository Direct Links */}
                <div className="flex flex-wrap gap-3 justify-center mt-5">
                  {FEATURED_PROJECTS.map((proj) => (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      key={proj.id}
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-[#5E1726] bg-[#F6F1E7] hover:bg-[#EFE8DA] px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      {proj.title} ↗
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright Row */}
            <div className="mt-20 md:mt-24 flex flex-col gap-2 md:flex-row items-center justify-between px-4 md:px-0 z-10">
              <p className="text-sm text-[#EFE8DA] text-center md:text-left">
                ©2026 {TARUN_PROFILE.name}. All rights reserved.
              </p>
              <nav className="flex gap-4">
                <a
                  href={TARUN_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#EFE8DA] hover:text-white transition-colors duration-300"
                >
                  Crafted with precision by {TARUN_PROFILE.name} ·{' '}
                  {TARUN_PROFILE.location}
                </a>
              </nav>
            </div>
          </div>

          {/* Monumental Background Name Display (Warm Cream Beige) */}
          <div
            className="text-[#F6F1E7]/25 leading-none absolute left-1/2 -translate-x-1/2 bottom-32 md:bottom-28 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
            style={{
              fontSize: 'clamp(2.5rem, 10.5vw, 9rem)',
              maxWidth: '96vw',
              whiteSpace: 'nowrap',
            }}
          >
            TARUN PEDIREDLA
          </div>

          {/* Centered Emblem Badge */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            className="absolute bottom-16 md:bottom-14 rounded-3xl bg-[#F6F1E7] left-1/2 border-2 border-[#DCE3DF] flex items-center justify-center p-3 -translate-x-1/2 z-10 shadow-xl"
          >
            <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-[#5E1726] rounded-2xl flex items-center justify-center shadow-inner">
              <span className="font-mono font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-[#F6F1E7]">
                TP
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-28 sm:bottom-26 h-px bg-gradient-to-r from-transparent via-[#F6F1E7]/30 to-transparent w-full left-1/2 -translate-x-1/2" />
        </footer>
      </section>
    </>
  );
};
