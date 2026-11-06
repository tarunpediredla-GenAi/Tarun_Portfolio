import React, { useState } from 'react';
import { Cpu, Layers, Sparkles } from 'lucide-react';
import { portfolioContent, type SkillItem } from '../data/content';
import { stageStore, notifyStageStore } from '../hero/v2/beat';

export const TechUniverseChapter: React.FC = () => {
  const { skills } = portfolioContent;
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof skills.categories)[number]>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(skills.items[5] ?? skills.items[0]);

  const filteredSkills =
    selectedCategory === 'All'
      ? skills.items
      : skills.items.filter((item) => item.category === selectedCategory);

  const handleSelectSkill = (skill: SkillItem) => {
    setActiveSkill(skill);
    stageStore.highlightedSkillId = skill.id;
    notifyStageStore();
  };

  return (
    <section
      id="technologies"
      data-chapter-index="3"
      className="relative z-10 min-h-screen w-full py-28 px-6 md:px-12 lg:px-20 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 pointer-events-auto">
        {/* Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span>04. Technology Universe</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Orbital Stack &amp; Capabilities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Technical Skills &amp; Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {skills.note}
            </p>
          </div>

          {/* Interactive Filter Controls (Functional Buttons) */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-[#070c18]/95 p-1.5 self-start"
          >
            {skills.categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Constellation Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Orbital SVG Map + Node Selector */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800/90 bg-[#070c18]/90 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <span className="font-mono text-xs text-slate-300">
                Interactive Orbital Constellation
              </span>
              <span className="font-mono text-xs text-cyan-400 tabular-nums">
                {filteredSkills.length} Nodes Active
              </span>
            </div>

            {/* Interactive SVG Orbital Diagram */}
            <div className="relative mx-auto my-auto w-full max-w-[340px] aspect-square flex items-center justify-center">
              <svg
                viewBox="-140 -140 280 280"
                className="w-full h-full overflow-visible"
                aria-label="Technology Orbital Map"
              >
                {/* Concentric Orbit Rings */}
                {[52, 74, 96, 118].map((r) => (
                  <circle
                    key={r}
                    cx="0"
                    cy="0"
                    r={r}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Center Core Node */}
                <circle cx="0" cy="0" r="20" fill="#0891b2" fillOpacity="0.25" stroke="#06b6d4" strokeWidth="1.5" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="fill-cyan-300 font-mono text-[9px] font-semibold"
                >
                  CORE
                </text>

                {/* Skill Nodes */}
                {skills.items.map((item) => {
                  const isVisible =
                    selectedCategory === 'All' || item.category === selectedCategory;
                  const isCurrent = activeSkill.id === item.id;
                  const r = item.orbitRadius * 22;
                  const x = Math.cos(item.orbitAngle) * r;
                  const y = Math.sin(item.orbitAngle) * r;

                  return (
                    <g
                      key={item.id}
                      onClick={() => handleSelectSkill(item)}
                      className={`cursor-pointer transition-opacity duration-200 ${
                        isVisible ? 'opacity-100' : 'opacity-20'
                      }`}
                    >
                      {isCurrent && (
                        <>
                          <line
                            x1="0"
                            y1="0"
                            x2={x}
                            y2={y}
                            stroke={item.accentColor}
                            strokeWidth="1.2"
                            strokeOpacity="0.6"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="12"
                            fill={item.accentColor}
                            fillOpacity="0.2"
                            stroke={item.accentColor}
                            strokeWidth="1.5"
                          />
                        </>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 6 : 4.5}
                        fill={isCurrent ? '#ffffff' : item.accentColor}
                      />
                      <text
                        x={x}
                        y={y - 9}
                        textAnchor="middle"
                        className={`font-mono text-[8px] select-none ${
                          isCurrent ? 'fill-white font-bold' : 'fill-slate-400'
                        }`}
                      >
                        {item.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Node Detail Readout */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-cyan-400">{activeSkill.category}</span>
                <span className="text-amber-400">{activeSkill.scopeNote}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {activeSkill.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSkill.description}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                Applied in: {activeSkill.projectsUsedIn.join(' · ')}
              </div>
            </div>
          </div>

          {/* Right: Structured Readable Skills Directory */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => handleSelectSkill(skill)}
                  className={`text-left rounded-xl border p-5 transition-colors flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-cyan-500/70 bg-[#0a1428]/95'
                      : 'border-slate-800/90 bg-[#070c18]/90 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400">
                      <span>{skill.category}</span>
                      <span className="text-amber-400/90">{skill.scopeNote}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-white">
                        {skill.name}
                      </h3>
                      {skill.category === 'AI & Automation' ? (
                        <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                      ) : skill.category === 'Backend' ? (
                        <Cpu className="h-4 w-4 text-cyan-400 shrink-0" />
                      ) : (
                        <Layers className="h-4 w-4 text-slate-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/70 text-[11px] font-mono text-slate-400 truncate">
                    {skill.projectsUsedIn.join(' · ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
