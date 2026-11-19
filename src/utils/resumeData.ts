/**
 * Pure, decoupled portfolio helper utilities for skill filtering,
 * command-palette search, reinsurance math, and resume Markdown export.
 */

export interface SkillEntry {
  name: string;
  purpose: string;
  contextNote?: string;
}

export interface SkillCategoryEntry {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  skills: SkillEntry[];
}

export interface SearchableCommandItem {
  label: string;
  description: string;
  category: string;
}

export interface ReinsuranceSplitResult {
  netEligibleLoss: number;
  retentionPct: number;
  reinsurerPct: number;
  insurerRetained: number;
  reinsurerShare: number;
}

export function filterSkillCategories<T extends { id: string }>(
  categories: T[],
  activeCategoryId: string
): T[] {
  if (!activeCategoryId || activeCategoryId === 'all') {
    return categories;
  }
  return categories.filter((category) => category.id === activeCategoryId);
}

export function countTotalSkills(categories: { skills: unknown[] }[]): number {
  return categories.reduce((sum, category) => sum + category.skills.length, 0);
}

export function filterCommandItems<T extends SearchableCommandItem>(
  items: T[],
  query: string
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized)
  );
}

export function calculateReinsuranceSplit(
  grossLoss: number,
  deductible: number,
  retentionPct: number
): ReinsuranceSplitResult {
  const safeGross = Number.isFinite(grossLoss) ? Math.max(0, grossLoss) : 0;
  const safeDeductible = Number.isFinite(deductible) ? Math.max(0, deductible) : 0;
  const safeRetention = Number.isFinite(retentionPct)
    ? Math.max(0, Math.min(100, retentionPct))
    : 0;
  const reinsurerPct = Math.max(0, 100 - safeRetention);
  const netEligibleLoss = Math.max(0, safeGross - safeDeductible);
  const insurerRetained = netEligibleLoss * (safeRetention / 100);
  const reinsurerShare = netEligibleLoss * (reinsurerPct / 100);

  return {
    netEligibleLoss,
    retentionPct: safeRetention,
    reinsurerPct,
    insurerRetained,
    reinsurerShare,
  };
}

export interface ResumeMarkdownInput {
  profile: {
    name: string;
    professionalTitle: string;
    location: string;
    phone: string;
    email: string;
    portfolioUrl: string;
    linkedinUrl: string;
    github: string;
  };
  summaryParagraphs: string[];
  skillCategories: SkillCategoryEntry[];
  experience: {
    company: string;
    role: string;
    period: string;
    responsibilities: string[];
  }[];
  projects: {
    title: string;
    subtitle: string;
    statusLabel?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    resumeBullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    completion: string;
  }[];
}

export function buildResumeMarkdown(data: ResumeMarkdownInput): string {
  const {
    profile,
    summaryParagraphs,
    skillCategories,
    experience,
    projects,
    education,
  } = data;

  const lines: string[] = [
    `# ${profile.name}`,
    `**${profile.professionalTitle}**`,
    `${profile.location} | ${profile.phone} | ${profile.email}`,
    `Portfolio: ${profile.portfolioUrl} | LinkedIn: ${profile.linkedinUrl} | GitHub: ${profile.github}`,
    '',
    '## Professional Summary',
    ...summaryParagraphs,
    '',
    '## Technical Skills',
    ...skillCategories.map(
      (cat) =>
        `- **${cat.title}**: ${cat.skills.map((s) => s.name).join(', ')}`
    ),
    '',
    '## Professional Experience',
    ...experience.flatMap((exp) => [
      `### ${exp.company} — ${exp.role} (${exp.period})`,
      ...exp.responsibilities.map((r) => `- ${r}`),
      '',
    ]),
    '## Selected Projects',
    ...projects.flatMap((p) => {
      const links: string[] = [];
      if (p.liveUrl) links.push(`Live: ${p.liveUrl}`);
      if (p.githubUrl) links.push(`GitHub: ${p.githubUrl}`);
      return [
        `### ${p.title} — ${p.subtitle}${p.statusLabel ? ` [${p.statusLabel}]` : ''}`,
        `*${p.technologies.join(', ')}*`,
        ...(links.length > 0 ? [links.join(' | ')] : []),
        ...p.resumeBullets.map((b) => `- ${b}`),
        '',
      ];
    }),
    '## Education',
    ...education.map(
      (e) => `- **${e.degree}** — ${e.institution} (${e.completion})`
    ),
  ];

  return lines.join('\n');
}
