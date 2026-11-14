import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Calculator,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  ArrowRight,
  TrendingUp,
  Sliders,
  DollarSign,
  Maximize2,
  Zap,
} from 'lucide-react';
import {
  type ProjectCaseStudy,
  ENTERPRISE_SKILLS_TABLE,
  INSURESPHERE_TECH_STACK,
  CORE_ENGINEERING_STACK,
  AI_VERIFICATION_FEATURES,
} from '../data/content';

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

type TabType =
  | 'overview'
  | 'modules'
  | 'techstack'
  | 'architecture'
  | 'workflow'
  | 'calculator'
  | 'api'
  | 'testing'
  | 'gallery';

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [selectedArchitectureNode, setSelectedArchitectureNode] = useState(0);
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);

  // Interactive Reinsurance Quota-Share Calculator State
  const [grossLoss, setGrossLoss] = useState<number>(150000);
  const [deductible, setDeductible] = useState<number>(50000);
  const [retentionPct, setRetentionPct] = useState<number>(60);

  // Reset tab and sub-selections whenever a different project is opened
  React.useEffect(() => {
    setActiveTab('overview');
    setSelectedModuleIdx(0);
    setSelectedArchitectureNode(0);
    setActiveScreenIdx(0);
    if (project?.reinsuranceCalculatorDefaults) {
      setGrossLoss(project.reinsuranceCalculatorDefaults.grossLoss);
      setDeductible(project.reinsuranceCalculatorDefaults.deductible);
      setRetentionPct(project.reinsuranceCalculatorDefaults.retentionPct);
    }
  }, [project?.id]);

  if (!project) return null;

  const isFlagship = project.id === 'insuresphere-ai' || project.isFlagship;

  // Reinsurance Calculations based on required formula:
  // Net eligible loss = max(0, Gross loss - Deductible)
  // Insurer retained = Net eligible loss * (retentionPct / 100)
  // Reinsurer share = Net eligible loss * ((100 - retentionPct) / 100)
  const netEligibleLoss = Math.max(0, grossLoss - deductible);
  const reinsurerPct = Math.max(0, 100 - retentionPct);
  const insurerRetained = netEligibleLoss * (retentionPct / 100);
  const reinsurerShare = netEligibleLoss * (reinsurerPct / 100);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const tabBtnClass = (tab: TabType) => {
    const isActive = activeTab === tab;
    if (isFlagship) {
      return isActive
        ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_16px_rgba(56,189,248,0.45)]'
        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60';
    }
    return isActive
      ? 'bg-[#FAF7F2] text-[#5E1726] font-bold shadow-sm'
      : 'bg-black/20 text-[#F6F1E7]/90 hover:bg-black/35';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#030614]/85 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col border ${
          isFlagship
            ? 'bg-[#09122C] text-slate-100 border-sky-500/40 shadow-[0_0_80px_rgba(56,189,248,0.22)]'
            : 'bg-[#FAF7F2] text-[#232B27] border-[#687A70]/50'
        }`}
      >
        {/* Top Header & Sticky Navigation Bar */}
        <div
          className={`shrink-0 border-b ${
            isFlagship
              ? 'bg-[#060D22]/95 border-sky-500/25'
              : 'bg-[#5E1726] text-[#F6F1E7] border-black/10'
          } px-5 sm:px-8 pt-5 pb-4`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full ${
                    isFlagship
                      ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                      : 'bg-[#FAF7F2] text-[#5E1726]'
                  }`}
                >
                  Project {project.index}
                </span>

                <span
                  className={`text-[10px] font-mono font-medium tracking-wider px-2.5 py-0.5 rounded-full ${
                    isFlagship
                      ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-400/30'
                      : 'bg-black/20 text-white/90'
                  }`}
                >
                  {isFlagship
                    ? 'Full-Stack Python · Enterprise SaaS'
                    : project.technologies.slice(0, 3).join(' · ')}
                </span>

                {project.statusBadge && (
                  <span
                    className={`hidden sm:inline-flex text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full ${
                      isFlagship
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                        : 'bg-emerald-800 text-white'
                    }`}
                  >
                    ● {project.statusBadge}
                  </span>
                )}
              </div>

              <h1
                id="case-study-title"
                className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight ${
                  isFlagship ? 'text-white' : 'text-[#F6F1E7]'
                }`}
              >
                {project.title}
              </h1>
              <p
                className={`text-xs sm:text-sm font-medium mt-1 max-w-3xl ${
                  isFlagship ? 'text-slate-300' : 'text-[#FAF7F2]/90'
                }`}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project case study modal"
              className={`p-2 rounded-full shrink-0 transition-colors cursor-pointer ${
                isFlagship
                  ? 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-sky-500/30 border border-slate-700'
                  : 'bg-[#FAF7F2]/20 text-[#F6F1E7] hover:bg-[#FAF7F2] hover:text-[#5E1726]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Navigation Tabs for All Projects */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 mt-4 pt-3 border-t overflow-x-auto scrollbar-none ${
              isFlagship ? 'border-slate-800/80' : 'border-[#F6F1E7]/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('overview')}`}
            >
              Overview &amp; Problem
            </button>

            {isFlagship && project.modules && (
              <button
                type="button"
                onClick={() => setActiveTab('modules')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('modules')}`}
              >
                8 Core Modules
              </button>
            )}

            {isFlagship && (
              <button
                type="button"
                onClick={() => setActiveTab('techstack')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${tabBtnClass('techstack')}`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>InsureSphere AI — Tech Stack</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('architecture')}`}
            >
              System Architecture
            </button>

            {isFlagship && project.workflowSteps && (
              <button
                type="button"
                onClick={() => setActiveTab('workflow')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('workflow')}`}
              >
                9-Step Workflow
              </button>
            )}

            {isFlagship && (
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'calculator'
                    ? 'bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 font-bold shadow-[0_0_16px_rgba(56,189,248,0.5)]'
                    : 'bg-sky-500/10 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Reinsurance Calculator</span>
              </button>
            )}

            {isFlagship && project.apiEndpoints && (
              <button
                type="button"
                onClick={() => setActiveTab('api')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('api')}`}
              >
                REST API Specs
              </button>
            )}

            {isFlagship && project.testingHighlights && (
              <button
                type="button"
                onClick={() => setActiveTab('testing')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('testing')}`}
              >
                QA &amp; Verification
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${tabBtnClass('gallery')}`}
            >
              Blueprint &amp; Gallery
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* TAB 1: EXECUTIVE OVERVIEW & PROBLEM STATEMENT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Banner Graphic */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden border ${
                  isFlagship
                    ? 'border-sky-500/40 bg-slate-950 aspect-[21/9]'
                    : 'border-[#687A70]/40 aspect-[16/7]'
                }`}
              >
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className={`absolute inset-0 ${
                    isFlagship
                      ? 'bg-gradient-to-t from-[#09122C] via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent'
                  }`}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      isFlagship
                        ? 'bg-slate-950/90 text-sky-300 border border-sky-400/40'
                        : 'bg-[#5E1726] text-[#F6F1E7]'
                    }`}
                  >
                    Interactive Case Study Analysis
                  </span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                      <span>Live App</span>
                    </a>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                        isFlagship
                          ? 'bg-slate-900/90 text-slate-300 border border-slate-700'
                          : 'bg-[#FAF7F2] text-[#232B27] border border-[#687A70]/40'
                      }`}
                    >
                      {project.liveUrlNote || 'Repository Case Study'}
                    </span>
                  )}
                </div>
              </div>

              {/* Executive Summary */}
              <div
                className={`p-5 sm:p-6 rounded-2xl border ${
                  isFlagship
                    ? 'bg-[#0E1A3C]/80 border-sky-500/30 text-slate-200'
                    : 'bg-[#EFE8DA] border-[#687A70]/35 text-[#232B27]'
                }`}
              >
                <h3
                  className={`text-xs font-mono font-bold uppercase tracking-[0.25em] mb-2 ${
                    isFlagship ? 'text-sky-300' : 'text-[#5E1726]'
                  }`}
                >
                  Executive Project Summary
                </h3>
                <p className="text-sm sm:text-base leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isFlagship
                      ? 'bg-rose-950/20 border-rose-500/30 text-slate-200'
                      : 'bg-[#FAF7F2] border-[#687A70]/40 text-[#232B27]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle
                      className={`w-4 h-4 ${
                        isFlagship ? 'text-rose-400' : 'text-[#5E1726]'
                      }`}
                    />
                    <h4
                      className={`text-xs font-mono font-bold uppercase tracking-[0.2em] ${
                        isFlagship ? 'text-rose-300' : 'text-[#5E1726]'
                      }`}
                    >
                      {isFlagship
                        ? 'The Commercial Insurance Problem'
                        : 'The Engineering Problem'}
                    </h4>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isFlagship ? 'text-slate-300/90' : 'text-[#35423C]'
                    }`}
                  >
                    {project.problemStatement}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isFlagship
                      ? 'bg-sky-950/20 border-sky-500/30 text-slate-200'
                      : 'bg-[#E6ECE8] border-[#687A70]/40 text-[#232B27]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                      }`}
                    />
                    <h4
                      className={`text-xs font-mono font-bold uppercase tracking-[0.2em] ${
                        isFlagship ? 'text-sky-300' : 'text-[#5E1726]'
                      }`}
                    >
                      {isFlagship
                        ? 'The InsureSphere Architectural Solution'
                        : 'The Architectural Solution'}
                    </h4>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isFlagship ? 'text-slate-300/90' : 'text-[#35423C]'
                    }`}
                  >
                    {project.architectureOverview}
                  </p>
                </div>
              </div>

              {/* Implemented Features Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-px ${
                      isFlagship ? 'bg-sky-400' : 'bg-[#5E1726]'
                    }`}
                  />
                  <h4
                    className={`text-xs font-mono font-bold uppercase tracking-[0.25em] ${
                      isFlagship ? 'text-sky-300' : 'text-[#5E1726]'
                    }`}
                  >
                    Implemented Repository Capabilities
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.implementedFeatures.map((feat) => (
                    <div
                      key={feat}
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm leading-snug ${
                        isFlagship
                          ? 'bg-[#0B1536] border-slate-800 text-slate-200'
                          : 'bg-[#FAF7F2] border-[#687A70]/35 text-[#232B27]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Implementation Architecture (Flagship vs Non-Flagship) */}
              {isFlagship ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-px bg-sky-400" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-300">
                        InsureSphere AI — Tech Stack
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('techstack')}
                      className="text-xs font-mono text-sky-400 hover:text-sky-300 underline cursor-pointer"
                    >
                      Inspect Detailed Roles &amp; Matrix →
                    </button>
                  </div>

                  {/* Core Engineering Stack Highlight Callout */}
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-400/40 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
                        Core Engineering Foundation
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono">
                      React + Python + Django REST Framework + PostgreSQL + AWS Cloud + JWT Authentication
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      The deterministic full-stack backbone: customer onboarding, policy underwriting, claims lifecycle states, quota-share reinsurance treaties, and ACID ledger guarantees.
                    </p>
                  </div>

                  {/* Core Production Technologies Chips */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Production Application Tech Stack ({INSURESPHERE_TECH_STACK.length} Technologies):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {INSURESPHERE_TECH_STACK.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-xl bg-[#0B1536] border border-sky-500/30 text-sky-200 text-xs font-mono font-bold shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Under Integration Verification */}
                  <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/35 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">⚠️</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                          Features Under Integration Verification
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-semibold">
                        Verification Ongoing
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {AI_VERIFICATION_FEATURES.map((item) => (
                        <div
                          key={item.name}
                          className="p-3 rounded-lg bg-amber-900/20 border border-amber-500/25 space-y-1"
                        >
                          <div className="font-mono font-bold text-amber-200">
                            {item.name}
                          </div>
                          <p className="text-amber-100/80 leading-relaxed font-sans">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#EFE8DA] border border-[#687A70]/40 space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#5E1726]">
                      Implementation Breakdown
                    </h4>
                    <p className="text-xs sm:text-sm text-[#232B27] leading-relaxed">
                      {project.implementationExplanation}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5E1726]">
                      Technologies &amp; Stack ({project.technologies.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-xl bg-[#DCE3DF] border border-[#687A70]/45 text-[#232B27] text-xs font-mono font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Transparent Scope Notes */}
              <div
                className={`p-4 rounded-xl border ${
                  isFlagship
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    : 'bg-[#E6ECE8] border-[#5E1726]/30 text-[#232B27]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle
                    className={`w-4 h-4 ${
                      isFlagship ? 'text-amber-400' : 'text-[#5E1726]'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-wider ${
                      isFlagship ? 'text-amber-300' : 'text-[#5E1726]'
                    }`}
                  >
                    Production-Readiness &amp; Verification Scope
                  </span>
                </div>
                <ul
                  className={`space-y-1.5 text-xs ${
                    isFlagship ? 'text-slate-300' : 'text-[#232B27]'
                  }`}
                >
                  {project.plannedOrPartialFeatures.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span
                        className={`font-bold mt-0.5 ${
                          isFlagship ? 'text-amber-400' : 'text-[#5E1726]'
                        }`}
                      >
                        •
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: 8 CORE APPLICATION MODULES */}
          {isFlagship && activeTab === 'modules' && project.modules && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Core Application Modules
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Select a module to inspect operational responsibilities,
                    schemas, and workflows
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/30">
                  8 Verified Modules
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Module Selector List */}
                <div className="lg:col-span-5 space-y-2">
                  {project.modules.map((mod, idx) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setSelectedModuleIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedModuleIdx === idx
                          ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] text-white'
                          : 'bg-[#0B1536] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-400 block mb-0.5">
                          {mod.category}
                        </span>
                        <span className="text-sm font-bold block">{mod.title}</span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          selectedModuleIdx === idx
                            ? 'text-sky-300 translate-x-1'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Selected Module Detail Panel */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B1536] border border-sky-500/30 shadow-xl space-y-5">
                  {project.modules[selectedModuleIdx] && (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                            {project.modules[selectedModuleIdx].category}
                          </span>
                          <h4 className="text-xl font-bold text-white mt-1">
                            {project.modules[selectedModuleIdx].title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-lg">
                          Module {selectedModuleIdx + 1} of 8
                        </span>
                      </div>

                      <p className="text-sm text-slate-200 leading-relaxed">
                        {project.modules[selectedModuleIdx].description}
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Key Capabilities &amp; Invariants:
                        </span>
                        <div className="space-y-2">
                          {project.modules[selectedModuleIdx].highlights.map(
                            (hl) => (
                              <div
                                key={hl}
                                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                                <span>{hl}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {project.modules[selectedModuleIdx].id === 'mod-rag-studio' && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                          ⚠️ <strong>Integration Status:</strong> This module represents the
                          target RAG workflow for indexing complex commercial insurance
                          clauses. Implementation is under active verification and is
                          isolated from transactional policy underwriting.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: INSURESPHERE AI — TECH STACK & ARCHITECTURE SCOPE */}
          {isFlagship && activeTab === 'techstack' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-sky-400" />
                    <span>InsureSphere AI — Tech Stack</span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {
                      ENTERPRISE_SKILLS_TABLE.filter(
                        (item) =>
                          item.technology !== 'Gemini / GenAI' &&
                          item.technology !== 'RAG'
                      ).length
                    }{' '}
                    production technologies powering the core insurance &amp; reinsurance management platform
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/30">
                  {
                    ENTERPRISE_SKILLS_TABLE.filter(
                      (item) =>
                        item.technology !== 'Gemini / GenAI' &&
                        item.technology !== 'RAG'
                    ).length
                  }{' '}
                  Production Technologies
                </span>
              </div>

              {/* Core Engineering Stack Highlight Callout */}
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-400/40 space-y-1.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
                    Core Engineering Stack
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white font-mono">
                  React + Python + Django REST Framework + PostgreSQL + AWS Cloud + JWT Authentication
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The primary architectural foundation delivering stateless JWT authentication, model-level role enforcement, AWS Cloud infrastructure, transactional quota-share reinsurance mathematics, and an interactive SPA client interface.
                </p>
              </div>

              {/* 12 Core Production Technologies Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    Production Application Tech Stack
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Core Codebase Dependencies
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ENTERPRISE_SKILLS_TABLE.filter(
                    (item) =>
                      item.technology !== 'Gemini / GenAI' &&
                      item.technology !== 'RAG'
                  ).map((item, idx) => (
                    <div
                      key={item.technology}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-sky-400">
                          0{idx + 1} · {item.category}
                        </span>
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/25">
                          {item.statusBadge}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white font-mono">
                        {item.technology}
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Under Integration Verification */}
              <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/35 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-sm font-bold">⚠️</span>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                      Features Under Integration Verification
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/35 font-semibold">
                    Integration Verification Ongoing
                  </span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                  The following AI-assisted capabilities are under active integration testing and verification. They are architecturally decoupled from the transactional policy and treaty ledger to ensure deterministic auditability:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {AI_VERIFICATION_FEATURES.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-amber-900/20 border border-amber-500/25 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-amber-200 text-xs">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE DIAGRAM */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-lg font-display font-bold ${
                      isFlagship ? 'text-white' : 'text-[#232B27]'
                    }`}
                  >
                    End-to-End System Architecture
                  </h3>
                  <p
                    className={`text-xs font-mono mt-0.5 ${
                      isFlagship ? 'text-slate-400' : 'text-[#35423C]'
                    }`}
                  >
                    Interactive signal flow across all {project.architectureFlow.length} architectural stages of {project.title}
                  </p>
                </div>
                <span
                  className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
                    isFlagship
                      ? 'text-sky-400 bg-sky-400/10 border-sky-400/30'
                      : 'text-[#5E1726] bg-[#EFE8DA] border-[#5E1726]/30'
                  }`}
                >
                  {project.architectureFlow.length} Architecture Stages
                </span>
              </div>

              {/* Interactive Architecture Flow Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {project.architectureFlow.map((node, idx) => (
                  <button
                    key={node.step}
                    type="button"
                    onClick={() => setSelectedArchitectureNode(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      selectedArchitectureNode === idx
                        ? isFlagship
                          ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.3)]'
                          : 'bg-[#EFE8DA] border-[#5E1726] shadow-md'
                        : isFlagship
                        ? 'bg-[#0B1536] border-slate-800 hover:border-slate-700'
                        : 'bg-[#FAF7F2] border-[#687A70]/40 hover:border-[#5E1726]'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-mono font-bold mb-1 ${
                        isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                      }`}
                    >
                      STAGE {node.step}
                    </div>
                    <div
                      className={`text-sm font-bold leading-tight mb-2 ${
                        isFlagship ? 'text-white' : 'text-[#232B27]'
                      }`}
                    >
                      {node.node}
                    </div>
                    <div
                      className={`text-[11px] line-clamp-3 ${
                        isFlagship ? 'text-slate-400' : 'text-[#35423C]'
                      }`}
                    >
                      {node.detail}
                    </div>

                    {idx < project.architectureFlow.length - 1 && (
                      <span
                        className={`hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sm font-bold ${
                          isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                        }`}
                      >
                        →
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Deep Architecture Layer Breakdown */}
              <div
                className={`p-6 rounded-2xl border shadow-xl space-y-4 ${
                  isFlagship
                    ? 'bg-[#0B1536] border-sky-500/30'
                    : 'bg-[#EFE8DA] border-[#687A70]/45'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isFlagship
                        ? 'bg-sky-400/20 text-sky-300 border-sky-400/30'
                        : 'bg-[#5E1726] text-[#F6F1E7] border-[#5E1726]'
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                      }`}
                    >
                      Layer Inspection · Stage{' '}
                      {project.architectureFlow[selectedArchitectureNode]?.step}
                    </span>
                    <h4
                      className={`text-lg font-bold ${
                        isFlagship ? 'text-white' : 'text-[#232B27]'
                      }`}
                    >
                      {project.architectureFlow[selectedArchitectureNode]?.node}
                    </h4>
                  </div>
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    isFlagship ? 'text-slate-200' : 'text-[#232B27]'
                  }`}
                >
                  {project.architectureFlow[selectedArchitectureNode]?.detail}
                </p>

                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isFlagship
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-[#FAF7F2] border-[#687A70]/35 text-[#35423C]'
                  }`}
                >
                  <span
                    className={`font-mono font-bold uppercase tracking-wider block mb-1 ${
                      isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                    }`}
                  >
                    Architectural Overview:
                  </span>
                  {project.architectureOverview}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 9-STEP REAL-WORLD INSURANCE WORKFLOW */}
          {isFlagship && activeTab === 'workflow' && project.workflowSteps && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Real-World Commercial Insurance Workflow
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Step-by-step lifecycle from Customer Onboarding to Reinsurance
                    Recovery &amp; Telemetry
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/30">
                  9 Sequential Phases
                </span>
              </div>

              <div className="relative border-l-2 border-sky-500/30 ml-4 pl-6 space-y-6">
                {project.workflowSteps.map((step) => (
                  <div key={step.step} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#060D22] border-2 border-sky-400 flex items-center justify-center text-[10px] font-mono font-bold text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                      {step.step}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0B1536] border border-slate-800 hover:border-sky-500/50 transition-colors space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-white">
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-mono font-semibold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                          Role: {step.role}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INTERACTIVE REINSURANCE CALCULATOR */}
          {isFlagship && activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-sky-400" />
                    <span>Interactive Quota-Share Reinsurance Calculator</span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Real-time mathematical illustration of proportional risk
                    retention and reinsurer recovery
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/30">
                  Live Mathematical Engine
                </span>
              </div>

              {/* Interactive Controls & Live Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inputs Column */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1536] border border-sky-500/30 shadow-xl space-y-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    Adjust Claim &amp; Treaty Inputs
                  </h4>

                  {/* Gross Claim Loss Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="gross-loss-input"
                        className="font-medium text-slate-300"
                      >
                        Gross Claim Loss ($)
                      </label>
                      <span className="font-mono font-bold text-sky-300">
                        {formatCurrency(grossLoss)}
                      </span>
                    </div>
                    <input
                      id="gross-loss-input"
                      type="number"
                      min={0}
                      step={5000}
                      value={grossLoss}
                      onChange={(e) => setGrossLoss(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-400"
                    />
                    <div className="flex gap-2">
                      {[75000, 150000, 300000, 500000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setGrossLoss(preset)}
                          className="px-2 py-1 rounded-lg bg-slate-800 text-[10px] font-mono text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                        >
                          ${preset / 1000}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deductible Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="deductible-input"
                        className="font-medium text-slate-300"
                      >
                        Policy Deductible ($)
                      </label>
                      <span className="font-mono font-bold text-slate-300">
                        {formatCurrency(deductible)}
                      </span>
                    </div>
                    <input
                      id="deductible-input"
                      type="number"
                      min={0}
                      step={5000}
                      value={deductible}
                      onChange={(e) =>
                        setDeductible(Math.max(0, Number(e.target.value)))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-400"
                    />
                    <div className="flex gap-2">
                      {[10000, 25000, 50000, 75000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setDeductible(preset)}
                          className="px-2 py-1 rounded-lg bg-slate-800 text-[10px] font-mono text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                        >
                          ${preset / 1000}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Proportional Risk Partition Slider */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="retention-slider"
                        className="font-medium text-slate-300"
                      >
                        Insurer Retention vs Reinsurer Share
                      </label>
                      <span className="font-mono font-bold text-sky-400">
                        {retentionPct}% / {reinsurerPct}%
                      </span>
                    </div>
                    <input
                      id="retention-slider"
                      type="range"
                      min={10}
                      max={90}
                      step={5}
                      value={retentionPct}
                      onChange={(e) => setRetentionPct(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>10% Retained</span>
                      <span className="text-sky-300">Default 60% / 40%</span>
                      <span>90% Retained</span>
                    </div>
                  </div>
                </div>

                {/* Live Output Telemetry Column */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B1536] border border-sky-500/30 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                      Calculated Exposure Ledger
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Formula: Net = max(0, Gross - Deductible)
                    </span>
                  </div>

                  {/* Key Output Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Net Eligible Loss
                      </span>
                      <div className="text-xl font-bold font-mono text-white">
                        {formatCurrency(netEligibleLoss)}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        After deductible absorption
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-indigo-300 uppercase block">
                        Insurer Retained ({retentionPct}%)
                      </span>
                      <div className="text-xl font-bold font-mono text-indigo-200">
                        {formatCurrency(insurerRetained)}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Net insurer obligation
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-sky-950/50 border border-sky-400/40 space-y-1 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                      <span className="text-[10px] font-mono text-sky-300 uppercase block">
                        Reinsurer Recovery ({reinsurerPct}%)
                      </span>
                      <div className="text-xl font-bold font-mono text-sky-300">
                        {formatCurrency(reinsurerShare)}
                      </div>
                      <span className="text-[10px] text-emerald-400">
                        Ceded treaty recovery
                      </span>
                    </div>
                  </div>

                  {/* Visual Proportion Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-indigo-300 font-semibold">
                        Insurer: {retentionPct}%
                      </span>
                      <span className="text-sky-300 font-semibold">
                        Reinsurer: {reinsurerPct}%
                      </span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-slate-900 overflow-hidden flex border border-slate-700">
                      <div
                        style={{ width: `${retentionPct}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"
                      />
                      <div
                        style={{ width: `${reinsurerPct}%` }}
                        className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Mandatory Legal & Business Disclaimer */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                    <span className="text-amber-400 font-bold">DISCLAIMER:</span>{' '}
                    Illustrative calculation subject to actual policy and
                    reinsurance treaty terms. Keep this calculator separate from the
                    real backend and financial records.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DJANGO REST API ARCHITECTURE */}
          {isFlagship && activeTab === 'api' && project.apiEndpoints && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Django REST API Architecture &amp; Endpoints
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Authenticated Django endpoints with JWT security, serializer
                    validation, and PostgreSQL commits
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/30">
                  DRF v1.4 REST Spec
                </span>
              </div>

              <div className="space-y-3">
                {project.apiEndpoints.map((ep) => (
                  <div
                    key={ep.path}
                    className="p-4 rounded-2xl bg-[#0B1536] border border-slate-800 hover:border-sky-500/40 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                            ep.method === 'GET'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                              : ep.method === 'POST'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <code className="text-sm font-mono font-bold text-white">
                          {ep.path}
                        </code>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full">
                        {ep.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-200">
                      {ep.description}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {ep.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: QA & ENGINEERING QUALITY */}
          {isFlagship && activeTab === 'testing' && project.testingHighlights && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Engineering Quality &amp; Verification Rigor
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Transparent distinction between automated test suites, manual
                    verified flows, and pending verification
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/30">
                  Continuous QA
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.testingHighlights.map((test) => (
                  <div
                    key={test.area}
                    className="p-4 rounded-2xl bg-[#0B1536] border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {test.area}
                      </span>
                      <span
                        style={{
                          backgroundColor: `${test.badgeColor}18`,
                          color: test.badgeColor,
                          borderColor: `${test.badgeColor}40`,
                        }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                      >
                        {test.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {test.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SCREENSHOT BLUEPRINT & GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-lg font-display font-bold ${
                      isFlagship ? 'text-white' : 'text-[#232B27]'
                    }`}
                  >
                    Interface Blueprint &amp; Feature Gallery
                  </h3>
                  <p
                    className={`text-xs font-mono mt-0.5 ${
                      isFlagship ? 'text-slate-400' : 'text-[#35423C]'
                    }`}
                  >
                    Explore high-fidelity blueprints across all {project.screens.length} core subsystems
                  </p>
                </div>
                <span
                  className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
                    isFlagship
                      ? 'text-sky-400 bg-sky-400/10 border-sky-400/30'
                      : 'text-[#5E1726] bg-[#EFE8DA] border-[#5E1726]/30'
                  }`}
                >
                  {project.screens.length} Blueprint Views
                </span>
              </div>

              {/* Screen selector chips */}
              <div className="flex flex-wrap gap-2">
                {project.screens.map((screen, sIdx) => (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveScreenIdx(sIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeScreenIdx === sIdx
                        ? isFlagship
                          ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_16px_rgba(56,189,248,0.35)]'
                          : 'bg-[#5E1726] text-[#F6F1E7] font-bold shadow-sm'
                        : isFlagship
                        ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                        : 'bg-[#EFE8DA] text-[#232B27] hover:bg-[#DCE3DF]'
                    }`}
                  >
                    {screen.title}
                  </button>
                ))}
              </div>

              {/* Active Screen Inspection Box */}
              {project.screens[activeScreenIdx] && (
                <div
                  className={`p-6 rounded-2xl border shadow-xl space-y-4 ${
                    isFlagship
                      ? 'bg-[#0B1536] border-sky-500/30'
                      : 'bg-[#EFE8DA] border-[#687A70]/45'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b pb-3 ${
                      isFlagship ? 'border-slate-800' : 'border-[#687A70]/35'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isFlagship ? 'text-sky-400' : 'text-[#5E1726]'
                        }`}
                      >
                        Category: {project.screens[activeScreenIdx].type}
                      </span>
                      <h4
                        className={`text-xl font-bold mt-0.5 ${
                          isFlagship ? 'text-white' : 'text-[#232B27]'
                        }`}
                      >
                        {project.screens[activeScreenIdx].title}
                      </h4>
                    </div>
                    <span
                      className={`text-xs font-mono ${
                        isFlagship ? 'text-slate-400' : 'text-[#35423C]'
                      }`}
                    >
                      View {activeScreenIdx + 1} of {project.screens.length}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      isFlagship ? 'text-slate-200' : 'text-[#232B27]'
                    }`}
                  >
                    {project.screens[activeScreenIdx].caption}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                        isFlagship ? 'text-slate-400' : 'text-[#5E1726]'
                      }`}
                    >
                      Feature Highlights in this View:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {project.screens[activeScreenIdx].highlights.map((hl) => (
                        <div
                          key={hl}
                          className={`p-3 rounded-xl border text-xs font-medium ${
                            isFlagship
                              ? 'bg-slate-900 border-slate-800 text-slate-200'
                              : 'bg-[#FAF7F2] border-[#687A70]/35 text-[#232B27]'
                          }`}
                        >
                          ✦ {hl}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div
          className={`shrink-0 p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-4 ${
            isFlagship
              ? 'bg-[#060D22] border-sky-500/25'
              : 'bg-[#EFE8DA] border-[#687A70]/40'
          }`}
        >
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-1.5 max-w-xl">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg ${
                  isFlagship
                    ? 'bg-slate-900 text-slate-300 border border-slate-800'
                    : 'bg-[#FAF7F2] text-[#232B27] border border-[#687A70]/40'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl || project.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer shadow-md ${
                isFlagship
                  ? 'bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300 text-slate-950 hover:shadow-[0_0_24px_rgba(56,189,248,0.5)]'
                  : 'bg-[#5E1726] text-[#F6F1E7] hover:bg-[#751E31]'
              }`}
            >
              {project.githubUrl ? <GitBranch className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              <span>{project.githubUrl ? 'View Source Code' : 'Open Live Demo'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-mono text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-full font-mono text-xs font-semibold transition-colors cursor-pointer ${
                isFlagship
                  ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-[#DCE3DF] text-[#232B27] hover:bg-[#687A70] hover:text-white'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
