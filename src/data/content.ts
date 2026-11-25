/**
 * Central typed portfolio content file for Tarun Pediredla.
 * Source of truth: Tarun Pediredla's resume and verified public GitHub repositories.
 */

import satyaEducationImg from '../assets/images/project_satya_education_1793895968852.jpg';
import alexInterviewerImg from '../assets/images/project_alex_interviewer_1793895970870.jpg';
import voiceTaskPlannerImg from '../assets/images/project_voice_task_planner_1793895973106.jpg';
import commandBackdropImg from '../assets/images/tarun_command_backdrop_1793895972254.jpg';
import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROFILE,
  RESUME_SKILL_CATEGORIES,
  RESUME_SUMMARY_PARAGRAPHS,
} from './resumeCatalog';

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'AI & Automation' | 'Dev & Deployment';
  scopeNote: string;
  description: string;
  purpose?: string;
  projectsUsedIn: string[];
  orbitRadius: number;
  orbitAngle: number;
  accentColor: string;
}

export interface EnterpriseSkillPurpose {
  technology: string;
  purpose: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Security & Auth' | 'AI & Automation' | 'Dev & Deployment';
  statusBadge: string;
  primaryProject: string;
}

export interface ProjectScreenView {
  id: string;
  title: string;
  caption: string;
  type: 'showcase' | 'interface' | 'architecture';
  highlights: string[];
}

export interface ProjectArchitectureStep {
  step: string;
  node: string;
  detail: string;
}

export interface ProjectModuleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  role: string;
  description: string;
}

export interface ProjectApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  tag: string;
  description: string;
  detail: string;
}

export interface ProjectTestingHighlight {
  area: string;
  status: 'Automated' | 'Manual Verified' | 'Verification Pending';
  badgeColor: string;
  description: string;
}

export interface ReinsuranceCalculatorDefaults {
  grossLoss: number;
  deductible: number;
  retentionPct: number;
  reinsurerPct: number;
}

export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  githubUrl: string;
  liveUrl?: string;
  liveUrlNote?: string;
  heroImage: string;
  technologies: string[];
  description: string;
  problemStatement: string;
  architectureOverview: string;
  architectureFlow: ProjectArchitectureStep[];
  implementationExplanation: string;
  implementedFeatures: string[];
  plannedOrPartialFeatures: string[];
  screens: ProjectScreenView[];
  isFlagship?: boolean;
  statusBadge?: string;
  flagshipTechStack?: string[];
  coreEngineeringStack?: string[];
  aiVerificationFeatures?: {
    name: string;
    status: string;
    description: string;
  }[];
  modules?: ProjectModuleItem[];
  workflowSteps?: ProjectWorkflowStep[];
  apiEndpoints?: ProjectApiEndpoint[];
  testingHighlights?: ProjectTestingHighlight[];
  reinsuranceCalculatorDefaults?: ReinsuranceCalculatorDefaults;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  completion: string;
  details: string;
}

export interface ChapterItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  cameraLabel: string;
}

export interface PortfolioContent {
  profile: {
    name: string;
    openingHeadline: string;
    role: string;
    secondaryTitle: string;
    professionalTitle: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedinUrl: string;
    linkedinLabel: string;
    portfolioUrl: string;
    portfolioLabel: string;
    fallbackBackdrop: string;
  };
  chapters: ChapterItem[];
  about: {
    heading: string;
    summaryParagraphs: string[];
    philosophyTitle: string;
    philosophyPillars: {
      index: string;
      title: string;
      description: string;
    }[];
  };
  experience: ExperienceItem[];
  skills: {
    note: string;
    categories: ('All' | 'Frontend' | 'Backend' | 'Databases' | 'AI & Automation' | 'Dev & Deployment')[];
    items: SkillItem[];
  };
  projects: ProjectCaseStudy[];
  education: EducationItem[];
}

export const portfolioContent: PortfolioContent = {
  profile: {
    name: RESUME_PROFILE.name,
    openingHeadline: RESUME_PROFILE.openingHeadline,
    role: RESUME_PROFILE.role,
    secondaryTitle: RESUME_PROFILE.secondaryTitle,
    professionalTitle: RESUME_PROFILE.professionalTitle,
    tagline: RESUME_PROFILE.tagline,
    email: RESUME_PROFILE.email,
    phone: RESUME_PROFILE.phone,
    location: RESUME_PROFILE.location,
    github: RESUME_PROFILE.github,
    linkedinUrl: RESUME_PROFILE.linkedinUrl,
    linkedinLabel: RESUME_PROFILE.linkedinLabel,
    portfolioUrl: RESUME_PROFILE.portfolioUrl,
    portfolioLabel: RESUME_PROFILE.portfolioLabel,
    fallbackBackdrop: '/assets/aistudio/Warm_Rim-Lit_Developer_Portrait_3ff9f2c3.png',
  },

  chapters: [
    {
      id: 'hero',
      index: '01',
      title: 'Introduction',
      subtitle: 'Command Center & Holographic Core',
      cameraLabel: 'Wide Command Approach',
    },
    {
      id: 'about',
      index: '02',
      title: 'About',
      subtitle: 'Engineering Summary & Philosophy',
      cameraLabel: 'Lateral Holographic Sweep',
    },
    {
      id: 'journey',
      index: '03',
      title: 'Journey',
      subtitle: 'Professional Experience & Education',
      cameraLabel: 'Corridor Timeline Push',
    },
    {
      id: 'technologies',
      index: '04',
      title: 'Technologies',
      subtitle: 'Interactive Technology Universe',
      cameraLabel: 'Constellation Orbital View',
    },
    {
      id: 'projects',
      index: '05',
      title: 'Projects',
      subtitle: 'Featured Engineering Case Studies',
      cameraLabel: 'Showcase Inspection Matrix',
    },
    {
      id: 'contact',
      index: '06',
      title: 'Contact',
      subtitle: 'Direct Engineering Channel',
      cameraLabel: 'Horizon Pullback',
    },
  ],

  about: {
    heading: 'Full Stack Python, Cloud & Agentic AI Engineering',
    summaryParagraphs: [...RESUME_SUMMARY_PARAGRAPHS],
    philosophyTitle: 'Development Philosophy',
    philosophyPillars: [
      {
        index: '01',
        title: 'End-to-End Ownership',
        description:
          'Connecting component-driven React & TypeScript interfaces directly to Django REST Framework and FastAPI backends, relational PostgreSQL schemas, and verified payment or webhook validations.',
      },
      {
        index: '02',
        title: 'Grounded & Agentic AI',
        description:
          'Designing Generative AI, Agentic RAG, multi-agent systems, and self-hosted n8n workflows with tool calling, citations, guardrails, and human-in-the-loop review.',
      },
      {
        index: '03',
        title: 'Production Discipline',
        description:
          'Enforcing JWT/RBAC security, server-side invariants, automated Pytest & Vitest suites, Docker containerization, AWS EC2 deployments, and reproducible CI/CD pipelines.',
      },
    ],
  },

  experience: RESUME_EXPERIENCE.map((item) => ({
    ...item,
    responsibilities: [...item.responsibilities],
    technologies: [...item.technologies],
  })),

  skills: {
    note: 'Express and Firebase Firestore are used in my portfolio projects (Satya’s Education and Alex AI Mock Technical Interviewer) alongside my core Full Stack Python, Django, JavaScript, and React.js stack.',
    categories: ['All', 'Frontend', 'Backend', 'Databases', 'AI & Automation', 'Dev & Deployment'],
    items: [
      {
        id: 'html',
        name: 'HTML',
        category: 'Frontend',
        scopeNote: 'Professional Role & Projects',
        description: 'Semantic document structure, accessible landmarks, forms, and SEO-ready markup.',
        purpose: 'Defines structured semantic web content and accessibility landmarks',
        projectsUsedIn: ['Saras India Systems', 'Satya’s Education', 'Alex AI Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 0.2,
        accentColor: '#38bdf8',
      },
      {
        id: 'css',
        name: 'CSS',
        category: 'Frontend',
        scopeNote: 'Professional Role & Projects',
        description: 'Responsive grid/flex layouts, modular styling, custom animations, and mobile adaptation.',
        purpose: 'Provides modular styling, grid/flex layouts, and responsive transitions',
        projectsUsedIn: ['Saras India Systems', 'Satya’s Education', 'Alex AI Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 1.4,
        accentColor: '#38bdf8',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Frontend',
        scopeNote: 'Professional Role & Projects',
        purpose: 'Handles user interactions and frontend logic',
        description: 'Handles user interactions and frontend logic. Asynchronous client logic, DOM events, Web Speech & Audio APIs, and REST consumption.',
        projectsUsedIn: ['insure-bazarpolicies', 'Saras India Systems', 'CP Academy', 'Finite HR & IT Solution', 'Satya’s Education', 'Alex AI Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 2.6,
        accentColor: '#38bdf8',
      },
      {
        id: 'react',
        name: 'React.js',
        category: 'Frontend',
        scopeNote: 'Core UI Architecture',
        purpose: 'Builds the frontend website and dashboards',
        description: 'Builds the frontend website and dashboards. Component architecture, custom hooks, state management, and high-performance interactive views.',
        projectsUsedIn: ['insure-bazarpolicies', 'Saras India Systems', 'Finite HR & IT Solution', 'Satya’s Education', 'Alex AI Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 3.8,
        accentColor: '#06b6d4',
      },
      {
        id: 'tailwindcss',
        name: 'Tailwind CSS',
        category: 'Frontend',
        scopeNote: 'Responsive Interface Styling',
        purpose: 'Styles the responsive user interface',
        description: 'Styles the responsive user interface. Utility-first styling, design system tokens, fluid typography, and editorial layouts.',
        projectsUsedIn: ['insure-bazarpolicies', 'Portfolio Platform', 'Modern Web UIs'],
        orbitRadius: 2.3,
        orbitAngle: 5.0,
        accentColor: '#38bdf8',
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Backend',
        scopeNote: 'Core Professional Stack',
        purpose: 'Main backend programming language',
        description: 'Main backend programming language. Primary backend language for full stack web applications, data processing, and AI integration.',
        projectsUsedIn: ['insure-bazarpolicies', 'Finite HR & IT Solution', 'CP Academy', 'AI Workflows'],
        orbitRadius: 3.1,
        orbitAngle: 0.5,
        accentColor: '#22d3ee',
      },
      {
        id: 'django',
        name: 'Django',
        category: 'Backend',
        scopeNote: 'Enterprise Web Framework',
        purpose: 'Backend application framework',
        description: 'Backend application framework. Full-featured Python web framework for ORM modeling, authentication, REST APIs, and admin workflows.',
        projectsUsedIn: ['insure-bazarpolicies', 'Finite HR & IT Solution', 'CP Academy', 'Satya’s Education Architecture'],
        orbitRadius: 3.1,
        orbitAngle: 1.8,
        accentColor: '#22d3ee',
      },
      {
        id: 'drf',
        name: 'Django REST Framework (DRF)',
        category: 'Backend',
        scopeNote: 'RESTful API Layer',
        purpose: 'Creates APIs connecting React to Django',
        description: 'Creates APIs connecting React to Django. Model serializers, validated endpoints, paginated querysets, and viewsets.',
        projectsUsedIn: ['insure-bazarpolicies', 'Enterprise SaaS Backends'],
        orbitRadius: 3.1,
        orbitAngle: 3.0,
        accentColor: '#0ea5e9',
      },
      {
        id: 'jwt-auth',
        name: 'JWT / SimpleJWT',
        category: 'Backend',
        scopeNote: 'Token Authentication',
        purpose: 'User login and API authentication',
        description: 'User login and API authentication. Secure stateless access and refresh tokens with Bearer Authorization headers.',
        projectsUsedIn: ['insure-bazarpolicies', 'Authentication Systems'],
        orbitRadius: 3.1,
        orbitAngle: 4.2,
        accentColor: '#38bdf8',
      },
      {
        id: 'rbac',
        name: 'RBAC',
        category: 'Backend',
        scopeNote: 'Access Control & Permissions',
        purpose: 'Controls Admin, Agent, and Customer permissions',
        description: 'Controls Admin, Agent, and Customer permissions. Role-Based Access Control enforcing granular permissions and domain safety.',
        projectsUsedIn: ['insure-bazarpolicies', 'Multi-Tenant Platforms'],
        orbitRadius: 3.1,
        orbitAngle: 5.4,
        accentColor: '#38bdf8',
      },
      {
        id: 'express',
        name: 'Express',
        category: 'Backend',
        scopeNote: 'Portfolio Project Technology',
        purpose: 'Serves API proxy routes and serverless handlers',
        description: 'Used in portfolio projects to serve API proxy routes, Cashfree checkout endpoints, and Gemini SDK streams.',
        projectsUsedIn: ['Satya’s Education', 'Alex AI Mock Technical Interviewer'],
        orbitRadius: 3.1,
        orbitAngle: 6.0,
        accentColor: '#22d3ee',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        category: 'Databases',
        scopeNote: 'Relational Database',
        purpose: 'Relational schema design and transactional query execution',
        description: 'Relational schema design, indexing, joins, and transactional query execution.',
        projectsUsedIn: ['Backend Application Data Modeling'],
        orbitRadius: 3.8,
        orbitAngle: 1.1,
        accentColor: '#60a5fa',
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Databases',
        scopeNote: 'Relational Database',
        purpose: 'Stores customers, policies, claims, and treaties',
        description: 'Stores customers, policies, claims, and treaties. Relational persistence, transactional integrity, and structured SQL queries.',
        projectsUsedIn: ['insure-bazarpolicies', 'Backend Systems', 'n8n Knowledge-Base Chat Agent'],
        orbitRadius: 3.8,
        orbitAngle: 3.2,
        accentColor: '#60a5fa',
      },
      {
        id: 'firestore',
        name: 'Firebase Firestore',
        category: 'Databases',
        scopeNote: 'Portfolio Project Database',
        purpose: 'Document collections, user entitlements, and interview history',
        description: 'Document collections, security rules (`firestore.rules`), user entitlements, orders, and interview history.',
        projectsUsedIn: ['Satya’s Education', 'Alex AI Mock Technical Interviewer'],
        orbitRadius: 3.8,
        orbitAngle: 5.3,
        accentColor: '#60a5fa',
      },
      {
        id: 'genai',
        name: 'Gemini / GenAI',
        category: 'AI & Automation',
        scopeNote: 'Professional Role & Projects',
        purpose: 'Intended for AI-assisted policy and claims analysis',
        description: 'Intended for AI-assisted policy and claims analysis. Prompt engineering, structured JSON extraction, and conversational reasoning.',
        projectsUsedIn: ['insure-bazarpolicies', 'Finite HR & IT Solution', 'Alex AI Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 0.3,
        accentColor: '#f59e0b',
      },
      {
        id: 'rag',
        name: 'RAG',
        category: 'AI & Automation',
        scopeNote: 'Document Knowledge Retrieval',
        purpose: 'Intended for retrieving information from insurance documents',
        description: 'Intended for retrieving information from insurance documents. Retrieval-Augmented Generation indexing policy schedules and clauses.',
        projectsUsedIn: ['insure-bazarpolicies (Policy & RAG Studio)', 'n8n Knowledge-Base Chat Agent'],
        orbitRadius: 4.5,
        orbitAngle: 1.2,
        accentColor: '#f59e0b',
      },
      {
        id: 'agentic-ai',
        name: 'Agentic AI',
        category: 'AI & Automation',
        scopeNote: 'Professional Role & Projects',
        purpose: 'Tool-calling agents and autonomous execution workflows',
        description: 'Tool-calling agents, multi-step decision workflows, autonomous day planning, and interview evaluation.',
        projectsUsedIn: ['Finite HR & IT Solution', 'Alex AI Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 2.1,
        accentColor: '#f59e0b',
      },
      {
        id: 'gemini',
        name: 'Google Gemini',
        category: 'AI & Automation',
        scopeNote: 'AI Foundation Model SDK',
        purpose: 'Server-side multimodal dialogue, TTS, and transcription',
        description: 'Server-side `@google/genai` integration for technical interview dialogues, TTS, transcription, and task planning.',
        projectsUsedIn: ['Alex AI Mock Technical Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 3.0,
        accentColor: '#f59e0b',
      },
      {
        id: 'n8n',
        name: 'n8n',
        category: 'AI & Automation',
        scopeNote: 'Workflow Automation Engine',
        purpose: 'Webhook-driven orchestration connecting voice and tools',
        description: 'Webhook-driven node workflows connecting voice assistants, Google Gemini, and Google Sheets.',
        projectsUsedIn: ['AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 4.15,
        accentColor: '#f59e0b',
      },
      {
        id: 'vapi',
        name: 'Vapi',
        category: 'AI & Automation',
        scopeNote: 'Voice AI Infrastructure',
        purpose: 'Real-time telephony and voice assistant orchestration',
        description: 'Real-time telephony and voice assistant orchestration triggering backend n8n tool webhooks.',
        projectsUsedIn: ['AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 5.3,
        accentColor: '#f59e0b',
      },
      {
        id: 'vitest',
        name: 'Vitest',
        category: 'Dev & Deployment',
        scopeNote: 'Frontend Automated Testing',
        purpose: 'Tests React application functionality',
        description: 'Tests React application functionality. Unit and component testing verifying user flows, calculations, and UI states.',
        projectsUsedIn: ['insure-bazarpolicies', 'Frontend Quality Assurance'],
        orbitRadius: 5.2,
        orbitAngle: 0.3,
        accentColor: '#a855f7',
      },
      {
        id: 'github',
        name: 'Git and GitHub',
        category: 'Dev & Deployment',
        scopeNote: 'Version Control & Collaboration',
        purpose: 'Saves and manages project source code',
        description: 'Saves and manages project source code. Git branching workflows, pull requests, automated GitHub Actions, and documentation.',
        projectsUsedIn: ['All Repositories', 'insure-bazarpolicies'],
        orbitRadius: 5.2,
        orbitAngle: 1.5,
        accentColor: '#94a3b8',
      },
      {
        id: 'docker',
        name: 'Docker',
        category: 'Dev & Deployment',
        scopeNote: 'Professional Role Workflow',
        purpose: 'Containerizing full stack applications for development & production',
        description: 'Containerizing full stack applications for consistent local development and production environments.',
        projectsUsedIn: ['Finite HR & IT Solution'],
        orbitRadius: 5.2,
        orbitAngle: 2.7,
        accentColor: '#94a3b8',
      },
      {
        id: 'cicd',
        name: 'CI/CD',
        category: 'Dev & Deployment',
        scopeNote: 'Professional Role Workflow',
        purpose: 'Automated test, lint, build, and deployment pipelines',
        description: 'Automated build, lint, test, and deployment pipelines for reliable software delivery.',
        projectsUsedIn: ['Finite HR & IT Solution', 'Alex AI Interviewer'],
        orbitRadius: 5.2,
        orbitAngle: 3.9,
        accentColor: '#94a3b8',
      },
      {
        id: 'aws',
        name: 'AWS Cloud',
        category: 'Dev & Deployment',
        scopeNote: 'Cloud Infrastructure & Services',
        purpose: 'Cloud compute (EC2), S3 storage, RDS databases & IAM security',
        description: 'Cloud infrastructure deployment and management using AWS EC2, S3 object storage, RDS PostgreSQL, IAM access control, and scalable cloud architecture.',
        projectsUsedIn: ['Finite HR & IT Solution', 'insure-bazarpolicies', 'Cloud Deployments'],
        orbitRadius: 5.2,
        orbitAngle: 4.5,
        accentColor: '#f59e0b',
      },
      {
        id: 'vercel',
        name: 'Vercel',
        category: 'Dev & Deployment',
        scopeNote: 'Cloud Hosting & Serverless',
        purpose: 'Production SPA and serverless API route deployment',
        description: 'Production SPA and serverless API route deployment with environment configuration.',
        projectsUsedIn: ['Satya’s Education'],
        orbitRadius: 5.2,
        orbitAngle: 5.5,
        accentColor: '#94a3b8',
      },
    ],
  },

  projects: [
    {
      id: 'insuresphere-ai',
      index: '02',
      isFlagship: true,
      title: 'insure-bazarpolicies',
      subtitle:
        'Enterprise Insurance & Reinsurance Management Platform with AI-Assisted Claims Analysis & Policy RAG Studio',
      statusBadge: '140+ Automated Tests Passing (Pytest & Vitest)',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/insuresphere-ai',
      liveUrlNote:
        'Full-Stack SaaS Platform — 140+ Pytest & Vitest Checks Passing',
      heroImage: '/assets/project_insuresphere_ai_banner.svg',
      technologies: [
        'Python',
        'Django',
        'Django REST Framework',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'PostgreSQL',
        'JWT / RBAC',
        'RAG',
        'Pytest',
        'Vitest',
        'AWS Cloud',
      ],
      flagshipTechStack: [
        'Python',
        'Django',
        'DRF',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'PostgreSQL',
        'AWS Cloud',
        'JWT / RBAC',
        'RAG',
        'Pytest',
        'Vitest',
        'GitHub',
      ],
      coreEngineeringStack: [
        'React & TypeScript',
        'Python',
        'Django REST Framework',
        'PostgreSQL',
        'AWS Cloud',
        'JWT / RBAC',
      ],
      aiVerificationFeatures: [
        {
          name: 'AI-Assisted Claims Analysis',
          status: 'Under Integration Verification',
          description:
            'Advisory claims assessment, coverage & deductible verification, and human-in-the-loop audit logs.',
        },
        {
          name: 'AI Policy & RAG Studio',
          status: 'Under Integration Verification',
          description:
            'Document retrieval workflow for complex commercial policy schedules, reinsurance treaty clauses, and endorsements.',
        },
      ],
      description:
        'insure-bazarpolicies is an enterprise-style insurance and reinsurance management application built with React.js, Python, Django REST Framework, and PostgreSQL. It provides a centralized workspace for managing insurance customers, underwriting policies, processing claims, reviewing audit histories, calculating reinsurance recoveries, and analyzing insurance portfolio performance. The platform also includes AI-assisted claims analysis features and a policy/RAG studio under ongoing integration verification.',
      problemStatement:
        'Commercial insurers must coordinate customer onboarding, policy underwriting terms, claims adjudication, proportional risk-sharing treaties, and portfolio financial metrics across distinct teams. Fragmented legacy spreadsheets and disconnected operational silos lead to duplicated underwriting reviews, delayed claims settlement, inconsistent treaty audit trails, and limited visibility into ceded versus retained loss exposure.',
      architectureOverview:
        'insure-bazarpolicies centralizes mission-critical insurance operations via a component-driven React.js + TypeScript frontend communicating over authenticated REST API contracts with a Python Django REST Framework backend. Django enforces role-based access control (Admin, Adjuster, Agent, Policyholder), serializes underwriting and claim state machines, and commits transactional records into PostgreSQL. A dedicated AI-assisted triage module provides automated coverage checks and deductible validation while keeping final settlement decisions strictly in the hands of human adjusters.',
      architectureFlow: [
        {
          step: '01',
          node: 'React.js Client Workspace',
          detail:
            'Single-page responsive application with dedicated modules for executive analytics, customer onboarding, underwriting, claims workbench, and quota-share treaty management.',
        },
        {
          step: '02',
          node: 'JWT Auth & Role Guard',
          detail:
            'Token-based authentication enforcing organization-level tenancy and segregating Admin, Underwriter, Claims Adjuster, and Customer permissions.',
        },
        {
          step: '03',
          node: 'Django REST Framework Core',
          detail:
            'Business logic layer validating policy deductibles, claims state transitions (Draft → Submitted → Under Review → Approved/Rejected), and audit logging.',
        },
        {
          step: '04',
          node: 'PostgreSQL Relational DB',
          detail:
            'Normalized schemas for Customers, Policies, Claims, Treaty Contracts, and Ceded/Retained Exposure ledgers with foreign key constraints.',
        },
        {
          step: '05',
          node: 'AI Claims Advisory & Triage',
          detail:
            'Automated policy coverage verification, deductible matching, and investigation checklist generation for human adjuster sign-off.',
        },
      ],
      implementationExplanation:
        'Architected a multi-tenant enterprise portal where every insurance lifecycle phase is strictly validated. The backend leverages Django models with custom clean() methods to enforce financial invariants such as quota-share risk percentages (e.g., 60% retained / 40% ceded) and deductible boundaries. The React frontend features interactive treaty calculators, real-time claim status tracking, audit event timelines, and telemetry charts.',
      implementedFeatures: [
        'Executive Dashboard with customer and policy metrics, claim status summaries, premium/claim analytics, and portfolio loss ratios',
        'Customer Management directory with risk tier classification, organization accounts, and verified profile tracking',
        'Policy Underwriting workbench with coverage limits, deductible settings, effective dates, and customer associations',
        'Claims Management with First Notice of Loss (FNOL) registration, evidence uploads, adjuster review, and immutable audit logs',
        'Proportional Reinsurance Treaty engine calculating ceded and retained exposures with downloadable ledger exports',
        'AI-Assisted Claims Analysis generating coverage advisory reports, deductible validations, and recommended adjuster investigation steps',
        'JWT-based role-based access control (RBAC) isolating Admin, Adjuster/Agent, and Policyholder views',
        'Interactive quota-share reinsurance recovery modeling engine with real-time exposure simulation',
      ],
      plannedOrPartialFeatures: [
        'Policy / RAG Studio document retrieval and generative policy-answering pipeline is under active integration verification',
        'Locally functional full-stack application; production-readiness, Docker containerization, and public cloud deployment ongoing',
        'Automated test coverage established for Django models and API serializers; end-to-end integration test expansion in progress',
      ],
      modules: [
        {
          id: 'mod-dashboard',
          title: 'Executive Dashboard',
          category: 'Telemetry & Analytics',
          description:
            'Aggregated telemetry on active customers, policy volumes, gross written premiums, open claims, loss ratios, and reinsurance recovery indicators.',
          highlights: [
            'Gross claims exposure tracking ($14.8M registered)',
            'Real-time loss ratio & recovery gauge calculations',
            'Treaty capacity utilization & ceded risk telemetry',
          ],
        },
        {
          id: 'mod-customers',
          title: 'Customer Management',
          category: 'CRM & Risk Rating',
          description:
            'Centralized customer directory supporting individual policyholders and enterprise commercial entities with risk-tier classification (Low, Medium, High).',
          highlights: [
            'Organization-level account records & verified contacts',
            'Risk-tier classification with underwriting flags',
            'Direct linkage to active policies and claims history',
          ],
        },
        {
          id: 'mod-underwriting',
          title: 'Insurance Policy Underwriting',
          category: 'Policy Issuance',
          description:
            'Structured policy drafting and issuance workbench configuring coverage limits, deductibles, effective/expiration dates, and customer-policy associations.',
          highlights: [
            'Coverage limit & deductible rule validation',
            'Policy term date synchronization & renewal flags',
            'Customer association with multi-policy portfolios',
          ],
        },
        {
          id: 'mod-claims',
          title: 'Claims Management & Adjudication',
          category: 'Claims Operations',
          description:
            'First Notice of Loss (FNOL) intake, document evidence upload, and human adjuster workbench supporting Approve, Hold, and Reject workflows with immutable audit logging.',
          highlights: [
            'FNOL intake & incident date verification',
            'Adjuster review state machine with audit trails',
            'Document upload tracking for incident evidence',
          ],
        },
        {
          id: 'mod-reinsurance',
          title: 'Reinsurance Treaty Management',
          category: 'Capital & Risk Sharing',
          description:
            'Proportional quota-share treaty management calculating insurer retained exposure (60%) versus reinsurer ceded share (40%) with transaction ledgers and CSV export.',
          highlights: [
            'Automated quota-share recovery mathematical engine',
            'Claim-level ceded vs retained exposure ledger',
            'Reinsurance settlement exports for treaty reporting',
          ],
        },
        {
          id: 'mod-ai-triage',
          title: 'AI-Assisted Claims Analysis',
          category: 'Decision Support',
          description:
            'Automated claims advisory report checking policy coverage bounds, verifying deductible thresholds, and proposing investigation checklists while keeping human adjusters in final control.',
          highlights: [
            'Coverage & deductible compliance validation',
            'Suggested adjuster investigation checkpoints',
            'Strict human-in-the-loop decision requirement',
          ],
        },
        {
          id: 'mod-rag-studio',
          title: 'AI Policy & RAG Studio (Verification Ongoing)',
          category: 'GenAI & Retrieval',
          description:
            'Document retrieval and policy clause question-answering studio designed to index insurance wordings and treaty clauses. Note: Under active development and verification.',
          highlights: [
            'Target semantic policy clause retrieval pipeline',
            'Transparent status: under ongoing integration verification',
            'Isolated from core transactional underwriting records',
          ],
        },
        {
          id: 'mod-auth-security',
          title: 'Authentication & Access Control',
          category: 'Security & Governance',
          description:
            'Secure JWT authentication with role-based authorization differentiating Administrator oversight, Claims Adjuster actions, and Customer portal views.',
          highlights: [
            'JWT access & refresh token lifecycle',
            'Role-based view segregation (Admin, Adjuster, Customer)',
            'Tenant isolation preventing cross-organization access',
          ],
        },
      ],
      workflowSteps: [
        {
          step: '01',
          title: 'Customer Registration',
          role: 'Onboarding & Risk Tiering',
          description:
            'Customer account is created with commercial details, verified contact information, and initial risk-tier classification.',
        },
        {
          step: '02',
          title: 'Policy Underwriting',
          role: 'Underwriter Review',
          description:
            'Underwriter configures coverage limits, policy clauses, deductible amounts, and premium terms.',
        },
        {
          step: '03',
          title: 'Policy Issued',
          role: 'System Generation',
          description:
            'Django backend serializes policy record, commits to PostgreSQL, and binds to active reinsurance treaty contracts.',
        },
        {
          step: '04',
          title: 'Incident Reported',
          role: 'Customer / Agent',
          description:
            'Policyholder or servicing agent reports a commercial loss incident with date, location, and loss description.',
        },
        {
          step: '05',
          title: 'Claim Submitted (FNOL)',
          role: 'FNOL Intake',
          description:
            'First Notice of Loss is logged with claim ID, incident evidence documents, and gross estimated damage.',
        },
        {
          step: '06',
          title: 'Coverage & AI-Assisted Review',
          role: 'AI Advisory Engine',
          description:
            'Automated advisory check verifies policy is active, checks deductible eligibility, and flags policy exclusions.',
        },
        {
          step: '07',
          title: 'Human Adjuster Decision',
          role: 'Licensed Adjuster',
          description:
            'Human claims adjuster examines evidence, reviews AI advisory checklist, and executes Approve, Hold, or Reject decision.',
        },
        {
          step: '08',
          title: 'Reinsurance Recovery Calculation',
          role: 'Treaty Engine',
          description:
            'Net eligible loss is calculated and partitioned into Insurer Retention (60%) and Reinsurer Recovery (40%) ledgers.',
        },
        {
          step: '09',
          title: 'Portfolio Analytics Dashboard',
          role: 'Executive Telemetry',
          description:
            'Updated loss ratios, gross claims, and ceded recovery metrics are reflected across executive dashboard charts.',
        },
      ],
      reinsuranceCalculatorDefaults: {
        grossLoss: 150000,
        deductible: 50000,
        retentionPct: 60,
        reinsurerPct: 40,
      },
      apiEndpoints: [
        {
          method: 'POST',
          path: '/api/auth/token/',
          tag: 'Authentication',
          description: 'Obtain JWT token pair',
          detail:
            'Validates user credentials and issues signed access & refresh JWT tokens with user role claims.',
        },
        {
          method: 'GET',
          path: '/api/customers/',
          tag: 'Customers',
          description: 'Customer directory & search',
          detail:
            'Returns paginated customer accounts with risk-tier filter, policy counts, and contact data.',
        },
        {
          method: 'POST',
          path: '/api/policies/',
          tag: 'Underwriting',
          description: 'Underwrite & issue policy',
          detail:
            'Validates coverage limits, deductibles, and dates before creating policy record linked to customer.',
        },
        {
          method: 'POST',
          path: '/api/claims/',
          tag: 'Claims',
          description: 'Register FNOL claim',
          detail:
            'Submits First Notice of Loss with gross estimated damage and initial evidence attachments.',
        },
        {
          method: 'PATCH',
          path: '/api/claims/{id}/adjudicate/',
          tag: 'Claims',
          description: 'Adjuster claim decision',
          detail:
            'Transitions claim state (Approve/Hold/Reject) and records adjuster ID, timestamp, and audit remarks.',
        },
        {
          method: 'GET',
          path: '/api/reinsurance/treaties/',
          tag: 'Reinsurance',
          description: 'Active quota-share treaties',
          detail:
            'Queries proportional treaty parameters, ceded/retained limits, and cumulative recovery ledger.',
        },
        {
          method: 'GET',
          path: '/api/dashboard/metrics/',
          tag: 'Analytics',
          description: 'Executive KPI telemetry',
          detail:
            'Aggregates gross written premium, claim frequency, net loss ratios, and treaty recoveries.',
        },
      ],
      testingHighlights: [
        {
          area: 'Django Backend Unit & Model Tests',
          status: 'Automated',
          badgeColor: '#10B981',
          description:
            'Automated tests for model clean() validation, financial invariant enforcement, and foreign key cascades.',
        },
        {
          area: 'REST API Permissions & Serializers',
          status: 'Automated',
          badgeColor: '#10B981',
          description:
            'Automated status code, JWT authentication, and serializer payload validation across core endpoints.',
        },
        {
          area: 'Reinsurance Quota-Share Math',
          status: 'Automated',
          badgeColor: '#10B981',
          description:
            'Formula test suites verifying max(0, gross - deductible) and 60/40 proportional risk allocations.',
        },
        {
          area: 'Human Adjuster Workflow State Machine',
          status: 'Manual Verified',
          badgeColor: '#38BDF8',
          description:
            'End-to-end verified manual workflows for FNOL submission, adjuster hold/approval, and audit event logs.',
        },
        {
          area: 'React Frontend UI & Form Validation',
          status: 'Manual Verified',
          badgeColor: '#38BDF8',
          description:
            'Verified responsive layout, input bounds checking, and telemetry chart interactions.',
        },
        {
          area: 'AI Policy & RAG Studio Pipeline',
          status: 'Verification Pending',
          badgeColor: '#F59E0B',
          description:
            'Vector retrieval and generative clause question-answering workflow is currently under integration verification.',
        },
      ],
      screens: [
        {
          id: 'insure-dashboard',
          title: 'Executive Dashboard & Telemetry',
          caption:
            'Real-time executive cockpit displaying customer growth, policy underwriting volume, open claims breakdown, and portfolio loss ratio metrics.',
          type: 'showcase',
          highlights: [
            'Portfolio Loss Ratio & Recovery Telemetry',
            'Active Treaty Capacity & Utilization',
            'Claims Volume by Adjudication State',
          ],
        },
        {
          id: 'insure-customers',
          title: 'Customer Directory & Risk Classification',
          caption:
            'Commercial and individual policyholder directory with risk tier grading, active policy counts, and organization-level contact records.',
          type: 'interface',
          highlights: [
            'Risk Tier Classification (Low / Med / High)',
            'Organization Accounts & Multi-Contact Records',
            'Integrated Policy & Claims History Linkage',
          ],
        },
        {
          id: 'insure-underwriting',
          title: 'Policy Underwriting Workbench',
          caption:
            'Structured underwriting workbench for configuring coverage limits, deductible terms, effective dates, and policyholder covenants.',
          type: 'interface',
          highlights: [
            'Coverage Limit & Deductible Rules Engine',
            'Effective & Expiration Date Synchronization',
            'Customer Portfolio Association & Renewal Tracking',
          ],
        },
        {
          id: 'insure-claims',
          title: 'Claims Management & Human Adjuster Workbench',
          caption:
            'First Notice of Loss intake, evidence file review, and adjuster decision panel supporting Approve, Hold, and Reject workflows with audit logging.',
          type: 'interface',
          highlights: [
            'FNOL Incident Intake & Damage Verification',
            'Adjuster Decision Flow with Audit Timestamps',
            'Document Evidence Attachment Explorer',
          ],
        },
        {
          id: 'insure-reinsurance',
          title: 'Reinsurance Treaty & Quota-Share Ledger',
          caption:
            'Proportional risk-sharing ledger calculating ceded vs retained exposure per claim with downloadable CSV settlement reports.',
          type: 'architecture',
          highlights: [
            'Proportional Quota-Share Risk Partitioning',
            'Insurer 60% Retained vs Reinsurer 40% Ceded',
            'Audit-Ready Settlement Ledger & CSV Export',
          ],
        },
        {
          id: 'insure-ai-triage',
          title: 'AI Claims Advisory & Triage Engine',
          caption:
            'AI-driven claims analysis providing coverage eligibility checks, deductible assessments, and adjuster investigation recommendations.',
          type: 'architecture',
          highlights: [
            'Automated Policy Coverage & Deductible Audit',
            'Actionable Adjuster Investigation Checklists',
            'Human-in-the-Loop Adjudication Integrity',
          ],
        },
        {
          id: 'insure-architecture',
          title: 'Full-Stack Django REST & PostgreSQL Architecture',
          caption:
            'End-to-end architecture pipeline showing React client requests, JWT token validation, Django business logic, and PostgreSQL persistence.',
          type: 'architecture',
          highlights: [
            'Clean REST API Contracts & Serializers',
            'Role-Based Authorization & Tenant Isolation',
            'Transactional PostgreSQL Consistency',
          ],
        },
      ],
    },
    {
      id: 'satya-education',
      index: '05',
      title: "Satya's Education",
      subtitle: 'E-Commerce & Learning Platform with Cashfree HMAC Webhook Verification',
      statusBadge: 'Live on Vercel',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/SatyaEducationinstitute',
      liveUrl: 'https://satyaeducationinstitute.vercel.app',
      liveUrlNote: 'Verified live deployment on Vercel',
      heroImage: satyaEducationImg,
      technologies: ['React', 'TypeScript', 'Django', 'Firebase', 'Firestore', 'Cashfree', 'Vercel'],
      description:
        'A course and book storefront featuring shopping cart, orders, and student/admin portals with server-side price and stock validation and Cashfree payments secured by HMAC webhook verification.',
      problemStatement:
        'Educational institutions selling both physical books and recorded video courses often struggle with fragmented tools—using one platform for storefront checkout and another for student course playback and entitlement management. Satya’s Education unifies product browsing, shopping cart checkout, payment verification, student course progress tracking, and administrator catalogue controls in a single platform.',
      architectureOverview:
        'The client application is built with React and JavaScript (`App.jsx`, `ProductDetailView.jsx`, `CartCheckoutView.jsx`, `UserDashboardView.jsx`, `AdminDashboardView.jsx`). Authentication and document persistence use Firebase Authentication and Cloud Firestore with strict role-based security rules (`firestore.rules` and `security_spec.md`). Backend order creation, price recalculation, and Cashfree payment verification are handled through server-side API endpoints (`src/serverApp.js` & Vercel `/api` serverless integration alongside Django backend modeling).',
      architectureFlow: [
        {
          step: '01',
          node: 'React + JavaScript Storefront',
          detail: 'Catalogue filtering across engineering books, storybooks, and recorded courses with cart state management.',
        },
        {
          step: '02',
          node: 'Firebase Auth & Role Guard',
          detail: 'Bearer token verification separating Student learning views from Administrator inventory/order controls.',
        },
        {
          step: '03',
          node: 'Server-Side Order & Price Validation',
          detail: 'Backend validates item prices, GST/shipping rules, and creates verified payment sessions.',
        },
        {
          step: '04',
          node: 'Cashfree Payment Gateway',
          detail: 'Handles checkout transaction lifecycle and server-verified payment status confirmation.',
        },
        {
          step: '05',
          node: 'Firestore Entitlements & Course Player',
          detail: 'Unlocks recorded video lessons and tracks student lesson completion progress in `/users/{userId}`.',
        },
      ],
      implementationExplanation:
        'Implemented a multi-view React + JavaScript storefront with category filtering, custom SVG cover artwork rendering (`CoverArtwork.jsx`), a persistent shopping cart and address management workflow (`CartCheckoutView.jsx`), a dedicated student learning dashboard with lesson completion tracking (`UserDashboardView.jsx`), and an administrator console (`AdminDashboardView.jsx`). Firestore rules enforce owner-only reads on user profiles and admin-only mutations on catalogue products and banners.',
      implementedFeatures: [
        'Product catalogue for technical books, children’s storybooks, and recorded video courses with search and category filtering',
        'Shopping cart, saved shipping address management, and order summary calculation (`commerceRules.js`)',
        'Firebase Authentication modal (`AuthModal.jsx`) with session synchronization and bearer token headers (`apiAuth.js`)',
        'Separate Student Dashboard (purchased course curriculum, video lesson progress) and Admin Dashboard (product, category, banner, and order management)',
        'Server-side API validation (`serverApp.js`) and Cashfree payment gateway integration with order verification',
        'Comprehensive Firestore & Storage security rules (`firestore.rules`, `storage.rules`) with automated rule tests (`firestore.rules.test.js`)',
      ],
      plannedOrPartialFeatures: [
        'Repository ships with a pre-populated initial sample catalogue (`sampleCatalog.js`) as fallback/seed data alongside live Firestore collection syncing',
        'Serverless deployment on Vercel uses the Express/Node API adapter (`api/index.js` + `src/serverApp.js`) to run cleanly in Vercel’s runtime while aligning with Django REST domain conventions',
      ],
      screens: [
        {
          id: 'satya-catalogue',
          title: 'Product Catalogue & Storefront',
          caption: 'Filterable catalogue of engineering books, storybooks, and recorded courses with instant search and category tabs.',
          type: 'showcase',
          highlights: ['Unified Books & Courses Grid', 'Dynamic Cover Artwork Generator', 'Category & Price Filtering'],
        },
        {
          id: 'satya-dashboards',
          title: 'Student & Administrator Experiences',
          caption: 'Role-segregated dashboards: students stream unlocked course lessons while administrators manage inventory, banners, and orders.',
          type: 'interface',
          highlights: ['Student Curriculum & Lesson Progress', 'Admin Catalogue & Order Console', 'Firestore RBAC Enforcement'],
        },
        {
          id: 'satya-checkout',
          title: 'Cashfree Checkout & System Architecture',
          caption: 'Server-validated cart calculation, shipping address book, and Cashfree payment gateway verification pipeline.',
          type: 'architecture',
          highlights: ['Server-Side Price Validation', 'Cashfree PG Session & Webhook Verification', 'Automatic Course Entitlement Unlock'],
        },
      ],
    },
    {
      id: 'alex-interviewer',
      index: '07',
      title: 'Alex AI Mock Technical Interviewer',
      subtitle: 'Conversational Voice & Text AI Technical Interview Practice Platform',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/hiringmanager',
      heroImage: alexInterviewerImg,
      technologies: ['React', 'JavaScript', 'Express', 'Gemini', 'Firebase'],
      description:
        'A conversational AI technical interview practice application featuring spoken and typed interaction, a 50-question Full Stack Python & GenAI curriculum, an interactive system-design whiteboard, and structured hiring-rubric evaluations.',
      problemStatement:
        'Developers preparing for Full Stack Python and Generative AI interviews rarely get realistic practice explaining architecture trade-offs out loud or defending system designs under follow-up questioning. Static flashcard apps cannot probe vague answers or evaluate spoken technical depth.',
      architectureOverview:
        'The frontend is a React 19 and JavaScript workspace combining a live interview studio, dual-channel speech recognition (Web Speech API with raw audio fallback), an interactive system-design architecture whiteboard, and a real-time transcript drawer. The backend Express server (`server.js`) integrates the official `@google/genai` SDK (`GoogleGenAI`) with grounded system instructions across a curated 50-question curriculum (`interviewQuestions.js`) and persists completed interview debriefs to Firebase Firestore.',
      architectureFlow: [
        {
          step: '01',
          node: 'Candidate Voice / Text Input',
          detail: 'Captures spoken answers via Web Speech API or raw audio stream alongside typed responses.',
        },
        {
          step: '02',
          node: 'System-Design Whiteboard Sync',
          detail: 'Serializes candidate architecture nodes and connections into the active interview context.',
        },
        {
          step: '03',
          node: 'Express API (`/api/interview/*`)',
          detail: 'Routes `/chat`, `/transcribe`, `/tts`, and `/evaluate` requests securely on the server.',
        },
        {
          step: '04',
          node: 'Google Gemini Models (`@google/genai`)',
          detail: 'Conducts single-question technical drill-downs, synthesizes spoken responses, and scores performance.',
        },
        {
          step: '05',
          node: 'Firebase Firestore History',
          detail: 'Stores interview transcripts, rubric scores, and actionable feedback for longitudinal review.',
        },
      ],
      implementationExplanation:
        'Engineered `server.js` with dedicated endpoints for conversational turns (`/api/interview/chat`), fallback audio transcription (`/api/interview/transcribe`), high-definition voice synthesis (`/api/interview/tts` supporting Fenrir, Puck, Zephyr, and Kore personas), and structured Hiring Committee evaluation (`/api/interview/evaluate`). Built the client workspace with adjustable speech pacing (0.75x–1.1x), live transcript tracking, and an architecture node whiteboard.',
      implementedFeatures: [
        'AI interview interface with selectable interviewer voice personas (Fenrir, Puck, Zephyr, Kore) and configurable speaking speed',
        'Live conversational transcript experience supporting both spoken (microphone) and typed candidate responses',
        'Interactive system-design architecture whiteboard synchronized with the interviewer prompt context',
        'Curated 50-question Full Stack Python, Django, React, SQL, and GenAI canonical curriculum (`src/data/interviewQuestions.js`)',
        'AI-powered Hiring Committee evaluation generating structured scores, strengths, gaps, and history persistence in Firebase',
      ],
      plannedOrPartialFeatures: [
        'Live Gemini voice/chat synthesis requires a runtime `GEMINI_API_KEY` on the Express server (`server.js`); no public multi-tenant hosted URL is published in the repository to protect API quotas',
        'README illustrates a target enterprise architecture with Django/Celery/pgvector concepts, while the shipped repository implements the server tier via the full-stack Express + Vite server (`server.js`) and Firebase Firestore',
      ],
      screens: [
        {
          id: 'alex-studio',
          title: 'Live AI Interview & Transcript Interface',
          caption: 'Voice-first interview studio with waveform visualizer, persona selector, and real-time synchronized conversation transcript.',
          type: 'showcase',
          highlights: ['One-Question-at-a-Time Drill-Down', 'Spoken & Typed Hybrid Input', 'Multi-Voice Persona & Speed Controls'],
        },
        {
          id: 'alex-whiteboard',
          title: 'System-Design Architecture Whiteboard',
          caption: 'Interactive architecture canvas allowing candidates to sketch client, API gateway, queue, and database nodes during system design rounds.',
          type: 'interface',
          highlights: ['Interactive Component Node Graph', 'Live Context Injection into Gemini', '50-Question Canonical Curriculum'],
        },
        {
          id: 'alex-evaluation',
          title: 'AI Evaluation & Interview History',
          caption: 'Calibrated Hiring Committee debrief scoring technical accuracy, architecture depth, and communication with Firestore history.',
          type: 'architecture',
          highlights: ['Structured Rubric Breakdown', 'Question-by-Question Feedback', 'Firebase Session History'],
        },
      ],
    },
    {
      id: 'voice-task-planner',
      index: '06',
      title: 'AI Voice Task Planner',
      subtitle: 'Self-Hosted n8n Voice Automation Pipeline on AWS EC2',
      statusBadge: 'Self-Hosted on AWS EC2',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/n8n-ai-automations',
      heroImage: voiceTaskPlannerImg,
      technologies: ['n8n Architecture', 'Vapi', 'Gemini', 'Google Sheets', 'Webhooks', 'AWS EC2'],
      description:
        'A voice-driven automation workflow connecting spoken phone instructions to structured Google Sheets task storage and Google Gemini-generated time-blocked daily schedules.',
      problemStatement:
        'Capturing tasks and organizing a time-blocked daily schedule while away from a keyboard is friction-heavy. Traditional voice assistants can set basic timers but struggle to query a live task backlog, append structured metadata (priority, due date), and synthesize a realistic time-blocked day plan on demand.',
      architectureOverview:
        'A caller speaks to a Vapi voice assistant configured with tool definitions pointing to three n8n webhook endpoints (`POST /voice-add-task`, `POST /voice-list-tasks`, and `POST /voice-plan-day`). n8n parses tool arguments, reads or appends rows in a structured Google Sheet (`id | task | priority | due | status`), invokes Google Gemini to construct a prioritized time-blocked schedule when requested, and returns a concise spoken response to Vapi.',
      architectureFlow: [
        {
          step: '01',
          node: 'Voice Request',
          detail: 'User speaks natural commands ("Add a high-priority task due Friday" or "Plan my 8-hour day starting at 7 AM").',
        },
        {
          step: '02',
          node: 'Vapi Voice Assistant',
          detail: 'Handles low-latency speech-to-text, conversational turn-taking, and tool-call webhook dispatch.',
        },
        {
          step: '03',
          node: 'n8n Automation Webhooks',
          detail: 'Exposes `/voice-add-task`, `/voice-list-tasks`, and `/voice-plan-day` workflows with payload parsing.',
        },
        {
          step: '04',
          node: 'Google Gemini Reasoning',
          detail: 'Transforms open tasks, priorities, and available hours into a conflict-free time-blocked daily schedule.',
        },
        {
          step: '05',
          node: 'Google Sheets Persistence',
          detail: 'Appends new tasks and queries open backlog rows (`id | task | priority | due | status`).',
        },
        {
          step: '06',
          node: 'Spoken AI Response',
          detail: 'Returns structured JSON message to Vapi for natural spoken playback to the caller.',
        },
      ],
      implementationExplanation:
        'Built exportable n8n workflow definitions (`workflow.json` in `workflows/voice-agent-task-planner` and `workflows/ai-voice-task-planner-twilio`) alongside complete Vapi tool schemas. Each webhook branch normalizes spoken arguments, synchronizes state with Google Sheets, formats natural spoken summaries, and routes complex scheduling requests through Google Gemini via HTTP Header Auth (`x-goog-api-key`).',
      implementedFeatures: [
        'Three production n8n webhook tool pipelines: `voice-add-task`, `voice-list-tasks`, and `voice-plan-day`',
        'Vapi assistant integration with structured tool-call definitions for hands-free voice task management',
        'Google Sheets persistence schema (`id | task | priority | due | status`) for real-time task storage and retrieval',
        'Google Gemini prompt orchestration that converts open tasks and user wake/work hours into a spoken time-blocked schedule',
        'Additional companion workflows in the repository for Twilio scheduled voice calls, Pinecone + Gemini RAG, and Supabase knowledge-base agents',
      ],
      plannedOrPartialFeatures: [
        'Shipped as self-hostable n8n `workflow.json` blueprints and setup documentation rather than a public web frontend, since execution binds to each user’s personal Vapi phone number, Google Sheet, and Gemini API credentials',
      ],
      screens: [
        {
          id: 'voice-pipeline',
          title: 'n8n Webhook & Vapi Orchestration',
          caption: 'End-to-end visual workflow routing spoken Vapi tool calls into n8n webhook nodes for task creation, retrieval, and AI day planning.',
          type: 'showcase',
          highlights: ['POST /voice-add-task', 'POST /voice-list-tasks', 'POST /voice-plan-day'],
        },
        {
          id: 'voice-architecture',
          title: 'Voice → Vapi → n8n → Gemini → Sheets Flow',
          caption: 'Interactive signal path showing how spoken instructions become structured spreadsheet rows and Gemini-synthesized daily schedules.',
          type: 'architecture',
          highlights: ['Real-Time Voice Tool Calling', 'Google Sheets Task Schema', 'Gemini Time-Blocked Schedule Synthesis'],
        },
        {
          id: 'voice-payloads',
          title: 'Tool Definitions & Spoken Payloads',
          caption: 'Inspection of the Vapi tool schemas, Google Sheets row structure, and Gemini scheduling prompt template.',
          type: 'interface',
          highlights: ['Deterministic JSON Tool Contracts', 'Zero-Code Importable workflow.json', 'Twilio & Vapi Dual-Variant Support'],
        },
      ],
    },
    {
      id: 'currency-exchange-tracker',
      index: '01',
      title: 'Currency Exchange Rate Tracker',
      subtitle: 'Live Forex & Crypto Dashboard · Currency Conversion · 30-Day Trends',
      statusBadge: 'Live Dashboard · CloudFront',
      // Tracker source repository has not been supplied. Do not mislabel portfolio source as tracker source.
      githubUrl: '',
      liveUrl: 'https://d2ywbdz39a2o4v.cloudfront.net/dashboard',
      liveUrlNote: 'Live hosted dashboard on AWS CloudFront',
      heroImage: '/assets/currency-exchange-dashboard.svg',
      technologies: ['React.js', 'JavaScript', 'REST APIs', 'ExchangeRate-API', 'Frankfurter', 'CoinGecko'],
      description:
        'A currency exchange dashboard integrating live forex rates, cryptocurrency prices, and 30-day historical exchange trends with conversion calculations, percentage-change indicators, volatility metrics, configurable rate alerts, offline support, and API-failure fallbacks.',
      problemStatement:
        'Currency exchange decisions require current conversion rates, historical context, and a clear indication of large price movements. Separate live forex, historical, and cryptocurrency data sources make meaningful comparisons difficult, particularly when an upstream service is unavailable.',
      architectureOverview:
        'The dashboard combines live fiat quotes from ExchangeRate-API, 30-day historical series from Frankfurter, and BTC/ETH crypto pricing from CoinGecko behind a resilient React client with caching, offline support, and graceful fallbacks when an upstream provider fails.',
      architectureFlow: [
        { step: '01', node: 'React Currency Dashboard', detail: 'Select base/target currencies, convert amounts, and inspect comparisons, 30-day trends, and alerts.' },
        { step: '02', node: 'Rate Normalization Layer', detail: 'Coordinates live forex, historical series, and crypto quotes with conversion and percentage-change math.' },
        { step: '03', node: 'ExchangeRate-API & CoinGecko', detail: 'Fetches live fiat rates alongside current Bitcoin and Ethereum quotes.' },
        { step: '04', node: 'Frankfurter 30-Day History', detail: 'Queries 30-day date-ranged historical data to compute trends and volatility indicators.' },
        { step: '05', node: 'Rate Alerts & Offline Fallback', detail: 'Evaluates configurable threshold alerts and falls back gracefully during offline or upstream API outages.' },
      ],
      implementationExplanation:
        'Built a responsive multi-currency dashboard computing real-time conversions, 24-hour percentage changes, and 30-day historical volatility indicators alongside configurable rate alerts and resilient offline/API-failure fallbacks.',
      implementedFeatures: [
        'Live forex exchange-rate comparisons across major global currencies',
        'Real-time currency converter with 24-hour percentage-change calculations',
        '30-day historical rate trends and volatility indicators powered by Frankfurter',
        'Integrated cryptocurrency prices (BTC/ETH) via CoinGecko',
        'Configurable threshold rate alerts and responsive UI across devices',
        'Offline support and API-failure fallback handling for continuous usability',
      ],
      plannedOrPartialFeatures: [
        'Hosted live on AWS CloudFront; source repository is maintained separately from this portfolio codebase.',
      ],
      screens: [
        {
          id: 'currency-dashboard-overview',
          title: 'Multi-Currency Exchange Dashboard',
          caption: 'Portfolio architecture overview; open Live Demo to interact with the deployed application.',
          type: 'showcase',
          highlights: ['Multi-Currency Quotes', '24-Hour Movement', 'Currency Converter'],
        },
        {
          id: 'currency-history',
          title: '30-Day Historical Trends & Volatility',
          caption: 'Thirty-day rate comparisons and volatility indicators driven by historical series data.',
          type: 'interface',
          highlights: ['Frankfurter Historical Data', '30-Day Trends', 'Volatility Index'],
        },
        {
          id: 'currency-alerts',
          title: 'Rate Alerts & Fallback Resilience',
          caption: 'Configurable threshold alerts with offline support and upstream API fallback handling.',
          type: 'architecture',
          highlights: ['Configurable Rate Alerts', 'Volatility Thresholds', 'Offline & API Fallbacks'],
        },
      ],
    },
    {
      id: 'cloud-claims-api',
      index: '04',
      title: 'Cloud Claims API',
      subtitle: 'FastAPI & AWS — FNOL Claims Microservice with S3 Presigned Uploads & RDS',
      statusBadge: 'In Development · Nov 2026',
      githubUrl: '',
      liveUrlNote: 'In active development (Nov 2026) — S3 presigned uploads, RDS PostgreSQL & EC2 deployment in progress',
      heroImage: '/assets/cloud-claims-api-banner.svg',
      technologies: [
        'FastAPI',
        'SQLAlchemy',
        'Docker',
        'Pytest',
        'AWS S3',
        'RDS PostgreSQL',
        'AWS EC2',
      ],
      description:
        'A cloud-native insurance claims microservice built with FastAPI and SQLAlchemy implementing a First Notice of Loss (FNOL) status workflow, automated Pytest verification, Docker containerization, and AWS S3 presigned evidence uploads backed by RDS PostgreSQL on EC2.',
      problemStatement:
        'Handling First Notice of Loss (FNOL) claims intake and large incident evidence uploads directly through a monolithic application server creates bottlenecks, brittle status transitions, and poor cloud portability.',
      architectureOverview:
        'FastAPI exposes strongly typed OpenAPI endpoints validated by Pydantic schemas and backed by SQLAlchemy ORM models. Claim status transitions follow a strict FNOL state machine verified by Pytest, while evidence files upload directly to AWS S3 via time-limited presigned URLs, containerized in Docker for EC2 and RDS PostgreSQL deployment.',
      architectureFlow: [
        {
          step: '01',
          node: 'FastAPI OpenAPI Endpoints',
          detail: 'Typed Pydantic request/response contracts for FNOL registration, status updates, and evidence upload requests.',
        },
        {
          step: '02',
          node: 'FNOL Status State Machine',
          detail: 'Enforces deterministic claim transitions (FNOL Logged → Under Review → Approved / Settled) with audit timestamps.',
        },
        {
          step: '03',
          node: 'SQLAlchemy & RDS PostgreSQL',
          detail: 'Transactional ORM persistence modeling claims, status history events, and evidence metadata.',
        },
        {
          step: '04',
          node: 'AWS S3 Presigned Uploads',
          detail: 'Issues scoped, expiring presigned upload URLs so clients upload incident documents straight to S3.',
        },
        {
          step: '05',
          node: 'Docker, Pytest & AWS EC2',
          detail: 'Automated Pytest suite covering endpoints and transitions with Dockerized deployment targeting AWS EC2.',
        },
      ],
      implementationExplanation:
        'Engineered as a focused backend microservice demonstrating FastAPI, SQLAlchemy, Pytest API testing, Docker packaging, and AWS cloud integration patterns (S3 presigned URLs, RDS PostgreSQL, IAM least-privilege access, and EC2 hosting).',
      implementedFeatures: [
        'FastAPI REST microservice with typed Pydantic validation and OpenAPI documentation',
        'FNOL claims intake and deterministic status-transition workflow',
        'SQLAlchemy relational models structured for PostgreSQL persistence',
        'Automated Pytest suite validating endpoints and FNOL state transitions',
        'Docker container setup for reproducible local and cloud runtime environments',
      ],
      plannedOrPartialFeatures: [
        'In Development (Nov 2026): AWS S3 presigned evidence uploads, managed RDS PostgreSQL cutover, and production AWS EC2 deployment are actively in progress.',
      ],
      screens: [
        {
          id: 'cloud-claims-endpoints',
          title: 'FastAPI FNOL Endpoints & OpenAPI Spec',
          caption: 'Typed REST endpoints for FNOL submission, claim status updates, and S3 presigned upload issuance.',
          type: 'showcase',
          highlights: ['POST /api/v1/claims/fnol', 'PATCH /api/v1/claims/{id}/status', 'POST /api/v1/evidence/presign'],
        },
        {
          id: 'cloud-claims-aws',
          title: 'AWS Cloud & Docker Pipeline',
          caption: 'Containerized FastAPI service running on AWS EC2 with RDS PostgreSQL and S3 direct evidence uploads.',
          type: 'architecture',
          highlights: ['Dockerized Uvicorn Runtime', 'AWS RDS PostgreSQL', 'S3 Presigned Uploads & IAM'],
        },
        {
          id: 'cloud-claims-pytest',
          title: 'Pytest Verification Suite',
          caption: 'Automated API contract and FNOL state-machine test coverage running before container builds.',
          type: 'interface',
          highlights: ['FNOL Persistence Tests', 'State Machine Guard Tests', 'Presigned Upload Contract Tests'],
        },
      ],
    },
    {
      id: 'calder-works',
      index: '03',
      title: 'Calder Works',
      subtitle:
        'Multi-Agent Software Delivery Workspace · 8-Agent LangGraph Pipeline & SHA-Bound Review',
      statusBadge: '8-Agent LangGraph · Docker Sandbox',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/calder-work',
      liveUrlNote:
        'Dual-Mode Workspace — Instant Demo Preview + Local FastAPI, LangGraph, PostgreSQL & Docker Sandbox',
      heroImage: '/assets/calder-works-banner.svg',
      technologies: [
        'React',
        'TypeScript',
        'FastAPI',
        'LangGraph',
        'PostgreSQL',
        'Docker',
        'Gemini',
        'Pytest',
        'GitHub API',
      ],
      description:
        'Calder Works is a software delivery workspace built for engineering consultancies maintaining multiple client applications. Engineering managers and technical leads submit feature requests, approve acceptance criteria before code generation, monitor an eight-agent LangGraph delivery pipeline, inspect diffs alongside isolated Docker pytest logs, approve exact commit SHAs, and merge verified pull requests.',
      problemStatement:
        'Engineering consultancies operating across multiple client codebases face unstructured feature intake, unreviewed AI code generation, and risky pull-request merges where approvals drift from the final tested commit SHA.',
      architectureOverview:
        'Pairs a five-screen React 19 + TypeScript + Tailwind CSS v4 workspace (Projects, Work item, Run details, Review, Connections) with a dual-mode backend: an Express + Vite preview server (`server.ts`) backed by atomic JSON persistence (`data/calder-store.json`) and server-side Gemini criteria drafting, plus a local Connected Mode FastAPI + LangGraph `StateGraph` + SQLAlchemy + PostgreSQL 16 backend (`backend/app/main.py`) that runs pytest in a non-root, network-disabled Docker sandbox (`--network=none`) and performs SHA-verified GitHub branch and PR operations.',
      architectureFlow: [
        {
          step: '01',
          node: 'Work Item & Plan Gate',
          detail:
            'Requirements analyst drafts testable acceptance criteria and flags ambiguities; human manager explicitly approves (`interrupt_before=["architect"]`) before code generation begins.',
        },
        {
          step: '02',
          node: 'Architect Agent',
          detail:
            'Reads authorized repository files and defines the PostgreSQL data model, FastAPI contract, and file change plan.',
        },
        {
          step: '03',
          node: 'Parallel Python & React Agents',
          detail:
            'Python engineer (FastAPI, Pydantic, SQLAlchemy) and React engineer (TypeScript UI) implement against the exact same API contract in parallel.',
        },
        {
          step: '04',
          node: 'Test Engineer & Docker Sandbox',
          detail:
            'Writes pytest and UI tests covering every acceptance criterion and executes them inside a non-root, `--network=none` Docker sandbox recording exact exit codes and logs.',
        },
        {
          step: '05',
          node: 'Bug Detection & Code Reviewer',
          detail:
            'Inspects real test failures for up to 2 automatic correction attempts before pausing for human decision, followed by line-scoped code review and documentation generation.',
        },
        {
          step: '06',
          node: 'SHA-Bound Approval & PR Merge',
          detail:
            'Three-column diff & test review; Request Changes generates a new revision SHA invalidating prior approval; Merge requires passing tests and exact commit SHA match.',
        },
      ],
      implementationExplanation:
        'Engineered clean separation between pure workflow governance rules (`src/lib/workflow.ts` with unit tests in `workflow.test.ts`), the Express preview demo engine, and the full FastAPI + LangGraph + PostgreSQL + Docker Compose connected stack. Includes pre-seeded consultancy workspaces (`Campus Operations`, `Harbour Freight Portal`, `Northfield Clinic API`) including a paused-run example (`CW-112`) demonstrating safe human handoff after exhausting both auto-correction attempts.',
      implementedFeatures: [
        'Eight-agent LangGraph StateGraph (Requirements Analyst, Architect, parallel Python & React Engineers, Test Engineer, Bug Detection, Code Reviewer, Documentation Writer)',
        'Explicit human-in-the-loop plan approval gate (`interrupt_before=["architect"]`) before any code generation runs',
        'Three-column engineering Review workspace showing changed files, readable unified diffs, pytest output, and full audit log',
        'Exact commit-SHA approval binding with automatic approval invalidation on requested changes and separate two-step gated PR merge',
        'Isolated non-root, network-disabled Docker pytest sandbox (`backend/Dockerfile.sandbox`) and GitHub REST branch/PR client',
        'Dual-mode runtime: instant zero-credential Demo workspace (`data/calder-store.json`) and local Connected Mode with FastAPI + PostgreSQL 16',
      ],
      plannedOrPartialFeatures: [
        'Demo workspace mode runs out-of-the-box with durable JSON persistence and optional server-side `GEMINI_API_KEY`; live FastAPI, PostgreSQL 16, Docker `--network=none` sandbox, and GitHub PR writes run locally via Docker Compose (`docker compose up --build`).',
      ],
      screens: [
        {
          id: 'calder-pipeline',
          title: 'Eight-Agent LangGraph Delivery Pipeline',
          caption:
            'Live orchestration across Requirements Analyst, Architect, parallel Python & React Engineers, Test Engineer, Bug Detection (2-attempt cap), Code Reviewer, and Documentation Writer.',
          type: 'showcase',
          highlights: [
            'Human Plan Gate (interrupt_before)',
            'Parallel Python & React Tracks',
            '2-Attempt Auto-Fix & Safe Pause',
          ],
        },
        {
          id: 'calder-review',
          title: 'Three-Column Diff & SHA-Bound Merge Review',
          caption:
            'Changed files, readable unified diffs, recorded pytest logs, change-request revisioning, and exact-SHA merge gating.',
          type: 'interface',
          highlights: [
            'Unified Diff + Pytest Results',
            'SHA-Bound Approval Invalidation',
            'Two-Step Gated PR Merge',
          ],
        },
        {
          id: 'calder-architecture',
          title: 'Dual-Mode FastAPI, PostgreSQL & Docker Sandbox',
          caption:
            'Express + Vite Demo workspace paired with full local FastAPI + LangGraph + PostgreSQL 16 + `--network=none` Docker test runner.',
          type: 'architecture',
          highlights: [
            'FastAPI + LangGraph StateGraph',
            'Non-Root --network=none Sandbox',
            'GitHub REST Branch & PR Client',
          ],
        },
      ],
    },
  ],

  education: RESUME_EDUCATION.map((edu) => ({ ...edu })),
};

export const COMMAND_BACKDROP_IMAGE = commandBackdropImg;

export const TARUN_PORTRAIT_IMAGE =
  '/assets/aistudio/Warm_Rim-Lit_Developer_Portrait_3ff9f2c3.png';

export const TARUN_PROFILE = {
  name: RESUME_PROFILE.name,
  displayName: RESUME_PROFILE.openingHeadline,
  role: RESUME_PROFILE.professionalTitle,
  tagline: RESUME_PROFILE.tagline,
  email: RESUME_PROFILE.email,
  phone: RESUME_PROFILE.phone,
  phoneClean: RESUME_PROFILE.phoneClean,
  location: RESUME_PROFILE.location,
  github: RESUME_PROFILE.github,
  linkedinUrl: RESUME_PROFILE.linkedinUrl,
  linkedinLabel: RESUME_PROFILE.linkedinLabel,
  portfolioUrl: RESUME_PROFILE.portfolioUrl,
  portfolioLabel: RESUME_PROFILE.portfolioLabel,
  handle: RESUME_PROFILE.handle,
  status: RESUME_PROFILE.status,
  portraitImage: TARUN_PORTRAIT_IMAGE,
  summary: RESUME_SUMMARY_PARAGRAPHS[0],
  philosophy: RESUME_SUMMARY_PARAGRAPHS[2],
};

export const CAREER_TIMELINE = portfolioContent.experience.map((exp, idx) => ({
  id: exp.id,
  company: exp.company,
  role: exp.role,
  period: exp.period,
  current: idx === 0,
  highlights: exp.responsibilities,
  technologies: exp.technologies,
}));

export const EDUCATION_HISTORY = portfolioContent.education;

/**
 * Resume-aligned technical skill matrix derived directly from src/data/resumeCatalog.ts.
 */
export const SKILL_CATEGORIES = RESUME_SKILL_CATEGORIES;


/**
 * Flagship Enterprise Technology & Purpose Matrix
 * Direct 1:1 mapping of technologies to their specific role in Tarun's stack & insure-bazarpolicies.
 */
export const ENTERPRISE_SKILLS_TABLE: EnterpriseSkillPurpose[] = [
  {
    technology: 'React.js',
    purpose: 'Builds the frontend website and dashboards',
    category: 'Frontend',
    statusBadge: 'Core UI Architecture',
    primaryProject: 'insure-bazarpolicies & Portfolio',
  },
  {
    technology: 'JavaScript',
    purpose: 'Handles user interactions and frontend logic',
    category: 'Frontend',
    statusBadge: 'Interactive Client Logic',
    primaryProject: 'insure-bazarpolicies & Web Apps',
  },
  {
    technology: 'Tailwind CSS',
    purpose: 'Styles the responsive user interface',
    category: 'Frontend',
    statusBadge: 'Design System & Styling',
    primaryProject: 'insure-bazarpolicies & Modern UIs',
  },
  {
    technology: 'Python',
    purpose: 'Main backend programming language',
    category: 'Backend',
    statusBadge: 'Core Backend Language',
    primaryProject: 'insure-bazarpolicies & Full Stack Backends',
  },
  {
    technology: 'Django',
    purpose: 'Backend application framework',
    category: 'Backend',
    statusBadge: 'Enterprise Web Framework',
    primaryProject: 'insure-bazarpolicies & CP Academy',
  },
  {
    technology: 'Django REST Framework (DRF)',
    purpose: 'Creates APIs connecting React to Django',
    category: 'Backend',
    statusBadge: 'RESTful API Services',
    primaryProject: 'insure-bazarpolicies (REST Layer)',
  },
  {
    technology: 'PostgreSQL',
    purpose: 'Stores customers, policies, claims, and treaties',
    category: 'Databases',
    statusBadge: 'Relational ACID Database',
    primaryProject: 'insure-bazarpolicies',
  },
  {
    technology: 'JWT / SimpleJWT',
    purpose: 'User login and API authentication',
    category: 'Security & Auth',
    statusBadge: 'Token Authentication',
    primaryProject: 'insure-bazarpolicies (Auth Subsystem)',
  },
  {
    technology: 'RBAC',
    purpose: 'Controls Admin, Agent, and Customer permissions',
    category: 'Security & Auth',
    statusBadge: 'Role-Based Access Control',
    primaryProject: 'insure-bazarpolicies (Permission Guards)',
  },
  {
    technology: 'Gemini / GenAI',
    purpose: 'Intended for AI-assisted policy and claims analysis',
    category: 'AI & Automation',
    statusBadge: 'AI Claims Advisory',
    primaryProject: 'insure-bazarpolicies & Alex AI',
  },
  {
    technology: 'RAG',
    purpose: 'Intended for retrieving information from insurance documents',
    category: 'AI & Automation',
    statusBadge: 'Document Retrieval Studio',
    primaryProject: 'insure-bazarpolicies (Policy & RAG Studio)',
  },
  {
    technology: 'AWS Cloud',
    purpose: 'Cloud compute (EC2), S3 storage, RDS PostgreSQL & IAM security',
    category: 'Dev & Deployment',
    statusBadge: 'Cloud Infrastructure',
    primaryProject: 'Finite HR & insure-bazarpolicies',
  },
  {
    technology: 'Vitest',
    purpose: 'Tests React application functionality',
    category: 'Dev & Deployment',
    statusBadge: 'Automated Test Suites',
    primaryProject: 'insure-bazarpolicies & Frontend QA',
  },
  {
    technology: 'Git and GitHub',
    purpose: 'Saves and manages project source code',
    category: 'Dev & Deployment',
    statusBadge: 'Version Control & Repos',
    primaryProject: 'All Repositories & CI/CD',
  },
];

/**
 * insure-bazarpolicies — Flagship Tech Stack
 * Core technologies powering the production codebase.
 */
export const INSURESPHERE_TECH_STACK = [
  'Python',
  'Django',
  'DRF',
  'React.js',
  'JavaScript',
  'Tailwind CSS',
  'PostgreSQL',
  'AWS Cloud',
  'JWT',
  'REST APIs',
  'RBAC',
  'Vitest',
  'GitHub',
];

/**
 * Tarun Pediredla — Core Engineering Stack
 * Primary production engineering foundation.
 */
export const CORE_ENGINEERING_STACK = [
  'React',
  'Python',
  'Django REST Framework',
  'PostgreSQL',
  'AWS Cloud',
  'JWT Authentication',
];

/**
 * AI-Assisted Analysis & RAG (Features Under Integration Verification)
 */
export const AI_VERIFICATION_FEATURES = [
  {
    name: 'AI-Assisted Claims Analysis',
    status: 'Under Integration Verification',
    badge: 'Integration Verification',
    description:
      'Advisory claims assessment, coverage checks, deductible validation, and human-in-the-loop review reports.',
  },
  {
    name: 'AI Policy & RAG Studio',
    status: 'Under Integration Verification',
    badge: 'Integration Verification',
    description:
      'Document retrieval workflow for searching commercial insurance policy clauses, reinsurance treaty schedules, and endorsement terms.',
  },
];
export interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  accentColor: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  summary: string;
  features: string[];
  architectureFlow: string[];
  implementationNote: string;
  technologies: string[];
  flagshipTechStack?: string[];
  coreEngineeringStack?: string[];
  aiVerificationFeatures?: {
    name: string;
    status: string;
    description: string;
  }[];
  caseStudy: ProjectCaseStudy;
  isFlagship?: boolean;
}

const PROJECT_CATEGORY_BY_ID: Record<string, string> = {
  'currency-exchange-tracker': 'Live Forex & Crypto Analytics',
  'insuresphere-ai': 'Full-Stack Python & Enterprise SaaS',
  'calder-works': 'Multi-Agent AI & DevOps Workspace',
  'cloud-claims-api': 'FastAPI · AWS Cloud Microservice',
  'satya-education': 'Full Stack EdTech & E-Commerce',
  'voice-task-planner': 'Self-Hosted n8n Voice Automation',
  'alex-interviewer': 'Conversational Voice & Text AI',
};

const PROJECT_ACCENT_BY_ID: Record<string, string> = {
  'currency-exchange-tracker': '#0F766E',
  'insuresphere-ai': '#38BDF8',
  'calder-works': '#6366F1',
  'cloud-claims-api': '#0284C7',
  'satya-education': '#D8CBB8',
  'voice-task-planner': '#B6C2BB',
  'alex-interviewer': '#9E334B',
};

const ORDERED_PROJECTS = [...portfolioContent.projects].sort(
  (a, b) => Number(a.index) - Number(b.index)
);

export const FEATURED_PROJECTS: FeaturedProject[] =
  ORDERED_PROJECTS.map((p) => ({
    id: p.id,
    number: p.index,
    title: p.title,
    subtitle: p.subtitle,
    category: PROJECT_CATEGORY_BY_ID[p.id] || 'Full Stack & AI',
    accentColor: PROJECT_ACCENT_BY_ID[p.id] || '#38BDF8',
    image: p.heroImage,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    summary: p.description,
    features: p.implementedFeatures.slice(0, 4),
    architectureFlow: p.architectureFlow.map((step) => step.node),
    implementationNote: p.plannedOrPartialFeatures[0] || p.implementationExplanation,
    technologies: p.technologies,
    flagshipTechStack: p.flagshipTechStack,
    coreEngineeringStack: p.coreEngineeringStack,
    aiVerificationFeatures: p.aiVerificationFeatures,
    caseStudy: p,
    isFlagship: Boolean(p.isFlagship),
  }));

export const KINETIC_ROLES = [
  { role: 'ENGINEER', caption: 'Python · Django · React · SQL' },
  { role: 'DESIGNER', caption: 'Interactive 3D & Modern Web UI' },
  { role: 'BUILDER', caption: 'End-to-End Full Stack Systems' },
  { role: 'INNOVATOR', caption: 'Generative AI & Agentic Workflows' },
  { role: 'DEVELOPER', caption: 'Clean Code & API Architecture' },
  { role: 'CREATOR', caption: 'Voice AI · Gemini · Vapi · n8n' },
  { role: 'THINKER', caption: 'System Design & Data Modeling' },
  { role: 'SHIPPER', caption: 'AWS Cloud · Docker · CI/CD · Vercel' },
  { role: 'PROBLEM-SOLVER', caption: 'Deterministic AI & Business Logic' },
];

