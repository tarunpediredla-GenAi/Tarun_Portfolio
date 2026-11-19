import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildResumeMarkdown,
  calculateReinsuranceSplit,
  countTotalSkills,
  filterCommandItems,
  filterSkillCategories,
} from './resumeData';
import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROFILE,
  RESUME_PROJECTS_META,
  RESUME_SKILL_CATEGORIES,
  RESUME_SUMMARY_PARAGRAPHS,
} from '../data/resumeCatalog';

test('filterSkillCategories returns all domains for "all" and filters exact domain otherwise', () => {
  const all = filterSkillCategories(RESUME_SKILL_CATEGORIES, 'all');
  assert.equal(all.length, 8);

  const aiAgents = filterSkillCategories(RESUME_SKILL_CATEGORIES, 'ai-agents');
  assert.equal(aiAgents.length, 1);
  assert.equal(aiAgents[0].title, 'AI Agents');

  const empty = filterSkillCategories(RESUME_SKILL_CATEGORIES, 'non-existent');
  assert.equal(empty.length, 0);
});

test('countTotalSkills counts all skills across resume categories accurately', () => {
  const total = countTotalSkills(RESUME_SKILL_CATEGORIES);
  assert.equal(total, 54);
});

test('filterCommandItems performs case-insensitive, trimmed multi-field matching', () => {
  const items = [
    {
      label: 'Cloud Claims API',
      description: 'FastAPI · SQLAlchemy · AWS S3 · RDS PostgreSQL',
      category: 'Featured Project',
    },
    {
      label: 'InsureSphere AI',
      description: 'Django REST Framework · PostgreSQL · RAG',
      category: 'Featured Project',
    },
    {
      label: 'LinkedIn',
      description: RESUME_PROFILE.linkedinLabel,
      category: 'External',
    },
  ];

  assert.equal(filterCommandItems(items, '   ').length, 3);
  assert.equal(filterCommandItems(items, '  fastapi ').length, 1);
  assert.equal(filterCommandItems(items, 'external').length, 1);
  assert.equal(filterCommandItems(items, 'INSURESPHERE')[0].label, 'InsureSphere AI');
  assert.equal(filterCommandItems(items, 'no-match-xyz').length, 0);
});

test('calculateReinsuranceSplit enforces deductible floor and retention bounds', () => {
  const standard = calculateReinsuranceSplit(150000, 50000, 60);
  assert.equal(standard.netEligibleLoss, 100000);
  assert.equal(standard.retentionPct, 60);
  assert.equal(standard.reinsurerPct, 40);
  assert.equal(standard.insurerRetained, 60000);
  assert.equal(standard.reinsurerShare, 40000);

  const belowDeductible = calculateReinsuranceSplit(25000, 50000, 60);
  assert.equal(belowDeductible.netEligibleLoss, 0);
  assert.equal(belowDeductible.insurerRetained, 0);
  assert.equal(belowDeductible.reinsurerShare, 0);

  const clampedRetention = calculateReinsuranceSplit(100000, 0, 140);
  assert.equal(clampedRetention.retentionPct, 100);
  assert.equal(clampedRetention.reinsurerPct, 0);
  assert.equal(clampedRetention.insurerRetained, 100000);
  assert.equal(clampedRetention.reinsurerShare, 0);

  const invalidInputs = calculateReinsuranceSplit(Number.NaN, -100, -25);
  assert.equal(invalidInputs.netEligibleLoss, 0);
  assert.equal(invalidInputs.retentionPct, 0);
  assert.equal(invalidInputs.reinsurerPct, 100);
});

test('buildResumeMarkdown includes verified profile, links, skills, experience, projects, and education', () => {
  const md = buildResumeMarkdown({
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

  assert.match(md, /# Tarun Pediredla/);
  assert.match(md, /linkedin\.com\/in\/tarun-pediredla-16a66523b/);
  assert.match(md, /Finite HR & IT Solution/);
  assert.match(md, /Apr 2025 – Present/);
  assert.match(md, /Cloud Claims API/);
  assert.match(md, /In Development, Nov 2026/);
  assert.match(md, /Currency Exchange Rate Tracker/);
  assert.match(md, /InsureSphere AI/);
  assert.match(md, /140\+ Tests Passing/);
  assert.match(md, /B\.Sc\. Computer Science/);
  for (const cat of RESUME_SKILL_CATEGORIES) {
    assert.ok(md.includes(`**${cat.title}**`), `Missing skill category ${cat.title}`);
  }
});

test('resumeCatalog entries have unique IDs and valid non-empty content', () => {
  const projectIds = new Set(RESUME_PROJECTS_META.map((p) => p.id));
  assert.equal(projectIds.size, RESUME_PROJECTS_META.length);
  assert.equal(RESUME_PROJECTS_META.length, 5);

  const experienceIds = new Set(RESUME_EXPERIENCE.map((e) => e.id));
  assert.equal(experienceIds.size, RESUME_EXPERIENCE.length);
  assert.equal(RESUME_EXPERIENCE.length, 3);
});
