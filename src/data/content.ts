/**
 * Central typed portfolio content file for Tarun Pediredla.
 * Source of truth: Tarun Pediredla's resume and verified public GitHub repositories.
 */

import satyaEducationImg from '../assets/images/project_satya_education_1793895968852.jpg';
import alexInterviewerImg from '../assets/images/project_alex_interviewer_1793895970870.jpg';
import voiceTaskPlannerImg from '../assets/images/project_voice_task_planner_1793895973106.jpg';
import commandBackdropImg from '../assets/images/tarun_command_backdrop_1793895972254.jpg';


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
    name: 'Tarun Pediredla',
    openingHeadline: 'TARUN PEDIREDLA',
    role: 'Python Full Stack Developer | GenAI & Agentic AI',
    secondaryTitle: 'PYTHON FULL STACK · GENAI · AGENTIC AI',
    professionalTitle: 'Python Full Stack Developer | GenAI & Agentic AI',
    tagline: 'Building intelligent, scalable, and visually stunning digital experiences.',
    email: 'tarunpediredla9966@gmail.com',
    phone: '+91 8074080773',
    location: 'Hyderabad, Telangana',
    github: 'https://github.com/tarunpediredla-GenAi',
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
    heading: 'Full Stack Python & AI Systems Engineering',
    summaryParagraphs: [
      'I am a Full Stack Python Developer based in Hyderabad, Telangana, building web applications that connect responsive React interfaces with structured Python and Django backends, relational and document databases, and practical Generative AI workflows.',
      'My career began with solid frontend foundations in HTML, CSS, JavaScript, and React.js at Saras India Systems Private Limited, progressed into end-to-end Python full stack engineering at CP Academy, and now encompasses Full Stack Python, Generative AI, Agentic AI, AWS Cloud, Docker workflows, and CI/CD pipelines at Finite HR & IT Solution.',
      'Across my engineering work and portfolio systems, I focus on reliable state management, clean API contracts, scalable AWS Cloud deployments, voice-first and conversational AI interfaces powered by Google Gemini and Vapi, and automated n8n orchestration pipelines.',
    ],
    philosophyTitle: 'Development Philosophy',
    philosophyPillars: [
      {
        index: '01',
        title: 'End-to-End Ownership',
        description:
          'Connecting component-driven React interfaces directly to clean backend business logic, database schemas, and payment or webhook validations without brittle glue code.',
      },
      {
        index: '02',
        title: 'Practical Agentic AI',
        description:
          'Designing Generative AI and voice workflows where LLM prompts, tool calls, and webhook automations produce deterministic, structured outcomes rather than unverified chat responses.',
      },
      {
        index: '03',
        title: 'Production Discipline',
        description:
          'Prioritizing role-based access rules, server-side verification, AWS Cloud infrastructure, Docker containerization, and reproducible CI/CD deployment workflows.',
      },
    ],
  },

  experience: [
    {
      id: 'finite-hr',
      company: 'Finite HR & IT Solution',
      role: 'Full Stack Python Developer',
      period: '1 April 2025 – Present',
      location: 'Hyderabad, Telangana',
      summary:
        'Developing full stack Python web applications and integrating Generative AI and Agentic AI workflows with AWS Cloud and containerized deployment pipelines.',
      responsibilities: [
        'Full stack Python application development across modern web architectures',
        'Building and maintaining cohesive frontend and backend functionality',
        'Generative AI and agentic AI application development and workflow orchestration',
        'Deploying and managing cloud services on AWS alongside Docker workflows and automated CI/CD pipelines',
      ],
      technologies: ['Python', 'Django', 'React.js', 'Generative AI', 'Agentic AI', 'AWS Cloud', 'Docker', 'CI/CD'],
    },
    {
      id: 'cp-academy',
      company: 'CP Academy',
      role: 'Full Stack Python Developer',
      period: 'Duration: 9 months',
      location: 'Hyderabad, Telangana',
      summary:
        'Focused on Python full stack application development and bridging client-side interfaces with backend service logic.',
      responsibilities: [
        'Python full stack application development',
        'Connecting frontend interfaces to backend logic and database persistence layers',
      ],
      technologies: ['Python', 'Django', 'JavaScript', 'React.js', 'SQL'],
    },
    {
      id: 'saras-india',
      company: 'Saras India Systems Private Limited',
      role: 'Frontend Developer',
      period: 'May 2022 – 10 July 2024',
      location: 'India',
      summary:
        'Built responsive, component-driven web interfaces and reusable UI modules using core web technologies and React.js.',
      responsibilities: [
        'HTML, CSS, JavaScript and React.js application development',
        'Engineering responsive user interfaces across desktop, tablet, and mobile viewports',
        'Designing and maintaining reusable frontend components',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    },
  ],

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
        projectsUsedIn: ['InsureSphere AI', 'Saras India Systems', 'CP Academy', 'Finite HR & IT Solution', 'Satya’s Education', 'Alex AI Interviewer'],
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
        projectsUsedIn: ['InsureSphere AI', 'Saras India Systems', 'Finite HR & IT Solution', 'Satya’s Education', 'Alex AI Interviewer'],
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
        projectsUsedIn: ['InsureSphere AI', 'Portfolio Platform', 'Modern Web UIs'],
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
        projectsUsedIn: ['InsureSphere AI', 'Finite HR & IT Solution', 'CP Academy', 'AI Workflows'],
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
        projectsUsedIn: ['InsureSphere AI', 'Finite HR & IT Solution', 'CP Academy', 'Satya’s Education Architecture'],
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
        projectsUsedIn: ['InsureSphere AI', 'Enterprise SaaS Backends'],
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
        projectsUsedIn: ['InsureSphere AI', 'Authentication Systems'],
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
        projectsUsedIn: ['InsureSphere AI', 'Multi-Tenant Platforms'],
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
        projectsUsedIn: ['InsureSphere AI', 'Backend Systems', 'n8n Knowledge-Base Chat Agent'],
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
        projectsUsedIn: ['InsureSphere AI', 'Finite HR & IT Solution', 'Alex AI Interviewer', 'AI Voice Task Planner'],
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
        projectsUsedIn: ['InsureSphere AI (Policy & RAG Studio)', 'n8n Knowledge-Base Chat Agent'],
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
        projectsUsedIn: ['InsureSphere AI', 'Frontend Quality Assurance'],
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
        projectsUsedIn: ['All Repositories', 'InsureSphere AI'],
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
        projectsUsedIn: ['Finite HR & IT Solution', 'InsureSphere AI', 'Cloud Deployments'],
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
      index: '01',
      isFlagship: true,
      title: 'InsureSphere AI',
      subtitle:
        'Enterprise Insurance & Reinsurance Management Platform with AI-Assisted Claims Analysis',
      statusBadge:
        'Locally functional full-stack application; production-readiness verification ongoing.',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/insuresphere-ai',
      liveUrlNote:
        'Local Full-Stack Application — Cloud Deployment & Production Readiness Verification Ongoing',
      heroImage: '/assets/project_insuresphere_ai_banner.svg',
      technologies: [
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
      ],
      flagshipTechStack: [
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
      ],
      coreEngineeringStack: [
        'React',
        'Python',
        'Django REST Framework',
        'PostgreSQL',
        'AWS Cloud',
        'JWT Authentication',
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
        'InsureSphere AI is an enterprise-style insurance and reinsurance management application built with React.js, Python, Django REST Framework, and PostgreSQL. It provides a centralized workspace for managing insurance customers, underwriting policies, processing claims, reviewing audit histories, calculating reinsurance recoveries, and analyzing insurance portfolio performance. The platform also includes AI-assisted claims analysis features and a policy/RAG studio under ongoing integration verification.',
      problemStatement:
        'Commercial insurers must coordinate customer onboarding, policy underwriting terms, claims adjudication, proportional risk-sharing treaties, and portfolio financial metrics across distinct teams. Fragmented legacy spreadsheets and disconnected operational silos lead to duplicated underwriting reviews, delayed claims settlement, inconsistent treaty audit trails, and limited visibility into ceded versus retained loss exposure.',
      architectureOverview:
        'InsureSphere AI centralizes mission-critical insurance operations via a component-driven React.js + TypeScript frontend communicating over authenticated REST API contracts with a Python Django REST Framework backend. Django enforces role-based access control (Admin, Adjuster, Agent, Policyholder), serializes underwriting and claim state machines, and commits transactional records into PostgreSQL. A dedicated AI-assisted triage module provides automated coverage checks and deductible validation while keeping final settlement decisions strictly in the hands of human adjusters.',
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
      index: '02',
      title: "Satya's Education",
      subtitle: 'E-Commerce & Digital-Learning Platform for Books and Recorded Courses',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/SatyaEducationinstitute',
      liveUrl: 'https://satyaeducationinstitute.vercel.app',
      liveUrlNote: 'Verified live deployment on Vercel (HTTP 200)',
      heroImage: satyaEducationImg,
      technologies: ['React', 'JavaScript', 'Django', 'Firebase', 'Firestore', 'Cashfree', 'Vercel'],
      description:
        'An e-commerce and digital-learning platform supporting physical/digital books, recorded video courses, and separate student and administrator experiences.',
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
      index: '03',
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
      index: '04',
      title: 'AI Voice Task Planner',
      subtitle: 'Voice-Driven Task Management & AI Day-Planning Automation Pipeline',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/n8n-ai-automations',
      heroImage: voiceTaskPlannerImg,
      technologies: ['n8n', 'Vapi', 'Google Gemini', 'Google Sheets', 'Webhooks'],
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
      index: '05',
      title: 'Currency Exchange Rate Tracker',
      subtitle: 'Live Forex & Crypto Dashboard · Currency Conversion · 30-Day Trends',
      statusBadge: 'Live demo supplied · Implementation details based on project brief',
      // Tracker source repository has not been supplied. Do not mislabel portfolio source as tracker source.
      githubUrl: '',
      liveUrl: 'https://d2ywbdz39a2o4v.cloudfront.net/dashboard',
      liveUrlNote: 'Externally hosted interactive dashboard (user-provided demo URL)',
      heroImage: '/assets/currency-exchange-dashboard.svg',
      technologies: ['React.js', 'JavaScript', 'REST APIs', 'ExchangeRate-API', 'Frankfurter', 'CoinGecko'],
      description:
        'A browser-based currency exchange tracking dashboard combining forex and cryptocurrency rate comparisons, amount conversion, 24-hour change indicators, and a 30-day history and volatility view. The product brief also describes configurable exchange alerts and offline/fallback behavior.',
      problemStatement:
        'Currency exchange decisions require current conversion rates, historical context, and a clear indication of large price movements. Separate live forex, historical, and cryptocurrency data sources make meaningful comparisons difficult, particularly when an upstream service is unavailable.',
      architectureOverview:
        'The project specification describes a hybrid REST API architecture: ExchangeRate-API supplies live fiat exchange rates, Frankfurter supplies date-ranged historical series, and CoinGecko supplies Bitcoin and Ethereum quotes. A React dashboard presents conversions, comparisons, trends, and conditional rate messages. API keys should remain on a server-side service and never be embedded in the browser bundle.',
      architectureFlow: [
        { step: '01', node: 'React Currency Dashboard', detail: 'Select a base/target currency, enter an amount, and inspect rate comparisons, historical charts, and alert messages.' },
        { step: '02', node: 'Currency Rate Service', detail: 'A service layer is specified for coordinating upstream APIs, normalization, rate conversions, and fallback decisions.' },
        { step: '03', node: 'ExchangeRate-API & CoinGecko', detail: 'Fetch recent fiat quotes and current BTC/ETH values from separate upstream providers.' },
        { step: '04', node: 'Frankfurter Historical Trends', detail: 'Query a 30-day date range to compare exchange-rate movements and derive volatility indicators.' },
        { step: '05', node: 'Alerts & Resilience', detail: 'Display threshold-based warnings and, where implemented, use cached or mock data when a provider fails.' },
      ],
      implementationExplanation:
        'The specified dashboard accepts a base currency and multiple targets, calculates conversion amounts and rate movements, and evaluates historical volatility using the coefficient of variation (standard deviation divided by mean, expressed as a percentage). Its conditional messages include significant movement above 5% in 24 hours, user-defined favorable thresholds, and volatility above 2%; crypto conversions include a cautionary notice. The original service source and CI/CD configuration were not supplied for independent verification.',
      implementedFeatures: [
        'Live fiat exchange-rate comparisons across multiple target currencies',
        'Amount-based conversion calculator and 24-hour rate-change indicators',
        '30-day historical exchange trends and volatility visualization',
        'CoinGecko-based Bitcoin and Ethereum rate context',
        'User-defined threshold alerts and favorable exchange indicators',
        'Offline-mode and stale/mock fallback behavior described in the project requirements',
      ],
      plannedOrPartialFeatures: [
        'Verification note: the live URL and functional specification were provided, but the underlying tracker source has not been reviewed. Docker, Jenkins, test coverage, cache TTL, and the assignment option (A/B/C) should not be presented as verified until source is available.',
      ],
      screens: [
        {
          id: 'currency-dashboard-overview',
          title: 'Multi-Currency Exchange Dashboard',
          caption: 'Illustrative portfolio visual showing the dashboard concept; open Live Demo for the actual application.',
          type: 'showcase',
          highlights: ['Multi-Currency Quotes', '24-Hour Movement', 'Currency Converter'],
        },
        {
          id: 'currency-history',
          title: 'Historical Trends & Volatility',
          caption: 'Thirty-day rate comparisons and coefficient-of-variation indicator described in the project brief.',
          type: 'interface',
          highlights: ['Frankfurter Historical Data', '30-Day Trends', 'Volatility Index'],
        },
        {
          id: 'currency-alerts',
          title: 'Rate Alerts & Fallback Strategy',
          caption: 'Conditional volatility/favorable-rate messages and API resilience behavior from the supplied specification.',
          type: 'architecture',
          highlights: ['5% Daily Change Alert', '2% Volatility Threshold', 'Offline Fallback'],
        },
      ],
    },
  ],

  education: [
    {
      id: 'bsc-cs',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Gayatri Vidya Parishad College for Degree and PG Courses (Autonomous)',
      completion: 'Completed August 2021',
      details: 'Undergraduate degree in Computer Science in Visakhapatnam, India.',
    },
    {
      id: 'intermediate',
      degree: 'Intermediate',
      institution: 'Narayana Junior College',
      completion: '2018',
      details: 'Pre-university intermediate education completed in 2018.',
    },
    {
      id: 'school',
      degree: 'School',
      institution: 'Bhashyam Public School',
      completion: '2016',
      details: 'Secondary school education completed in 2016.',
    },
  ],
};

export const COMMAND_BACKDROP_IMAGE = commandBackdropImg;

export const TARUN_PORTRAIT_IMAGE =
  '/assets/aistudio/Warm_Rim-Lit_Developer_Portrait_3ff9f2c3.png';

export const TARUN_PROFILE = {
  name: portfolioContent.profile.name,
  displayName: 'TARUN PEDIREDLA',
  role: portfolioContent.profile.professionalTitle,
  tagline: portfolioContent.profile.tagline,
  email: portfolioContent.profile.email,
  phone: portfolioContent.profile.phone,
  phoneClean: '+918074080773',
  location: portfolioContent.profile.location,
  github: portfolioContent.profile.github,
  handle: '@tarunpediredla',
  status: 'Online',
  portraitImage: TARUN_PORTRAIT_IMAGE,
  summary: portfolioContent.about.summaryParagraphs[0],
  philosophy: portfolioContent.about.summaryParagraphs[2],
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

export const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Responsive component architectures & interactive web UIs',
    accent: '#6B1D2F',
    skills: [
      {
        name: 'React.js',
        purpose: 'Builds the frontend website and dashboards',
      },
      {
        name: 'JavaScript',
        purpose: 'Handles user interactions and frontend logic',
      },
      {
        name: 'Tailwind CSS',
        purpose: 'Styles the responsive user interface',
      },
      {
        name: 'HTML',
        purpose: 'Defines structured semantic web content',
      },
      {
        name: 'CSS',
        purpose: 'Modular styling, grid/flex layouts, and responsive transitions',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Python service layers, REST APIs & access security',
    accent: '#4E5E56',
    skills: [
      {
        name: 'Python',
        purpose: 'Main backend programming language',
      },
      {
        name: 'Django',
        purpose: 'Backend application framework',
      },
      {
        name: 'Django REST Framework (DRF)',
        purpose: 'Creates APIs connecting React to Django',
      },
      {
        name: 'JWT / SimpleJWT',
        purpose: 'User login and API authentication',
      },
      {
        name: 'RBAC',
        purpose: 'Controls Admin, Agent, and Customer permissions',
      },
      {
        name: 'Express',
        purpose: 'Used in portfolio project backend (Alex AI Mock Interviewer)',
        contextNote: 'Used in portfolio project backend',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Relational SQL engines & real-time cloud document stores',
    accent: '#85243A',
    skills: [
      {
        name: 'PostgreSQL',
        purpose: 'Stores customers, policies, claims, and treaties',
      },
      {
        name: 'MySQL',
        purpose: 'Relational schema design and transactional query execution',
      },
      {
        name: 'Firebase Firestore',
        purpose: 'Document collections, security rules & interview history',
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Conversational voice agents, LLM reasoning & document RAG',
    accent: '#6B1D2F',
    skills: [
      {
        name: 'Gemini / GenAI',
        purpose: 'Intended for AI-assisted policy and claims analysis',
      },
      {
        name: 'RAG',
        purpose: 'Intended for retrieving information from insurance documents',
      },
      {
        name: 'Agentic AI',
        purpose: 'Tool-calling agents and autonomous execution workflows',
      },
      {
        name: 'Google Gemini',
        purpose: 'Server-side multimodal dialogue, TTS, and task planning',
      },
      {
        name: 'n8n',
        purpose: 'Webhook-driven orchestration connecting voice assistants & sheets',
      },
      {
        name: 'Vapi',
        purpose: 'Real-time telephony and voice assistant orchestration',
      },
    ],
  },
  {
    id: 'dev-deployment',
    title: 'Cloud, Dev & Testing',
    subtitle: 'AWS Cloud infrastructure, Docker containerization, CI/CD & automated testing',
    accent: '#7A8B82',
    skills: [
      {
        name: 'AWS Cloud (EC2, S3, RDS)',
        purpose: 'Cloud compute, S3 document storage, RDS PostgreSQL & IAM security',
      },
      {
        name: 'Docker',
        purpose: 'Containerizing full stack applications for development & production',
      },
      {
        name: 'CI/CD',
        purpose: 'Automated build, lint, test, and deployment pipelines',
      },
      {
        name: 'Git and GitHub',
        purpose: 'Saves and manages project source code',
      },
      {
        name: 'Vitest',
        purpose: 'Tests React application functionality',
      },
      {
        name: 'Vercel',
        purpose: 'Production SPA and serverless API route deployment',
      },
    ],
  },
];

/**
 * Flagship Enterprise Technology & Purpose Matrix
 * Direct 1:1 mapping of technologies to their specific role in Tarun's stack & InsureSphere AI.
 */
export const ENTERPRISE_SKILLS_TABLE: EnterpriseSkillPurpose[] = [
  {
    technology: 'React.js',
    purpose: 'Builds the frontend website and dashboards',
    category: 'Frontend',
    statusBadge: 'Core UI Architecture',
    primaryProject: 'InsureSphere AI & Portfolio',
  },
  {
    technology: 'JavaScript',
    purpose: 'Handles user interactions and frontend logic',
    category: 'Frontend',
    statusBadge: 'Interactive Client Logic',
    primaryProject: 'InsureSphere AI & Web Apps',
  },
  {
    technology: 'Tailwind CSS',
    purpose: 'Styles the responsive user interface',
    category: 'Frontend',
    statusBadge: 'Design System & Styling',
    primaryProject: 'InsureSphere AI & Modern UIs',
  },
  {
    technology: 'Python',
    purpose: 'Main backend programming language',
    category: 'Backend',
    statusBadge: 'Core Backend Language',
    primaryProject: 'InsureSphere AI & Full Stack Backends',
  },
  {
    technology: 'Django',
    purpose: 'Backend application framework',
    category: 'Backend',
    statusBadge: 'Enterprise Web Framework',
    primaryProject: 'InsureSphere AI & CP Academy',
  },
  {
    technology: 'Django REST Framework (DRF)',
    purpose: 'Creates APIs connecting React to Django',
    category: 'Backend',
    statusBadge: 'RESTful API Services',
    primaryProject: 'InsureSphere AI (REST Layer)',
  },
  {
    technology: 'PostgreSQL',
    purpose: 'Stores customers, policies, claims, and treaties',
    category: 'Databases',
    statusBadge: 'Relational ACID Database',
    primaryProject: 'InsureSphere AI',
  },
  {
    technology: 'JWT / SimpleJWT',
    purpose: 'User login and API authentication',
    category: 'Security & Auth',
    statusBadge: 'Token Authentication',
    primaryProject: 'InsureSphere AI (Auth Subsystem)',
  },
  {
    technology: 'RBAC',
    purpose: 'Controls Admin, Agent, and Customer permissions',
    category: 'Security & Auth',
    statusBadge: 'Role-Based Access Control',
    primaryProject: 'InsureSphere AI (Permission Guards)',
  },
  {
    technology: 'Gemini / GenAI',
    purpose: 'Intended for AI-assisted policy and claims analysis',
    category: 'AI & Automation',
    statusBadge: 'AI Claims Advisory',
    primaryProject: 'InsureSphere AI & Alex AI',
  },
  {
    technology: 'RAG',
    purpose: 'Intended for retrieving information from insurance documents',
    category: 'AI & Automation',
    statusBadge: 'Document Retrieval Studio',
    primaryProject: 'InsureSphere AI (Policy & RAG Studio)',
  },
  {
    technology: 'AWS Cloud',
    purpose: 'Cloud compute (EC2), S3 storage, RDS PostgreSQL & IAM security',
    category: 'Dev & Deployment',
    statusBadge: 'Cloud Infrastructure',
    primaryProject: 'Finite HR & InsureSphere AI',
  },
  {
    technology: 'Vitest',
    purpose: 'Tests React application functionality',
    category: 'Dev & Deployment',
    statusBadge: 'Automated Test Suites',
    primaryProject: 'InsureSphere AI & Frontend QA',
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
 * InsureSphere AI — Flagship Tech Stack
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

const ACCENT_COLORS = ['#38BDF8', '#D8CBB8', '#9E334B', '#B6C2BB', '#0F766E'];
const CATEGORIES = [
  'Full-Stack Python & Enterprise SaaS',
  'Full Stack EdTech & E-Commerce',
  'Conversational Voice & Text AI',
  'Agentic Voice Automation',
  'Live Forex & Crypto Analytics',
];

export const FEATURED_PROJECTS: FeaturedProject[] =
  portfolioContent.projects.map((p, idx) => ({
    id: p.id,
    number: p.index,
    title: p.title,
    subtitle: p.subtitle,
    category: CATEGORIES[idx] || 'Full Stack & AI',
    accentColor: ACCENT_COLORS[idx] || '#38BDF8',
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
    isFlagship: p.isFlagship || idx === 0,
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

