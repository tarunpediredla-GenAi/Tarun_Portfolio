/**
 * Pure resume data module (zero binary/image imports) so both the React app
 * and fast Node unit tests share a single verified source of truth.
 * Source: Tarun_Pediredla_resume_67d6cf36.pdf
 */

import type { SkillCategoryEntry } from '../utils/resumeData';

export const RESUME_PDF_URL =
  '/assets/aistudio/Tarun_Pediredla_resume_67d6cf36.pdf';

export const RESUME_PROFILE = {
  name: 'Tarun Pediredla',
  openingHeadline: 'TARUN PEDIREDLA',
  role: 'Full Stack Python Developer | Generative AI & Agentic AI Engineer | AWS Cloud',
  secondaryTitle: 'FULL STACK PYTHON · GENERATIVE AI & AGENTIC AI · AWS CLOUD',
  professionalTitle:
    'Full Stack Python Developer | Generative AI & Agentic AI Engineer | AWS Cloud',
  tagline:
    'Full Stack Python Developer with 4+ years building web and SaaS applications in Python, Django, FastAPI, React, TypeScript, AWS, and Agentic AI.',
  email: 'tarunpediredla9966@gmail.com',
  phone: '+91 8074080773',
  phoneClean: '+918074080773',
  location: 'Hyderabad, Telangana, India',
  portfolioUrl: 'https://tarun-portfolio-iota-gray.vercel.app',
  portfolioLabel: 'tarun-portfolio-iota-gray.vercel.app',
  linkedinUrl: 'https://www.linkedin.com/in/tarun-pediredla-16a66523b',
  linkedinLabel: 'linkedin.com/in/tarun-pediredla-16a66523b',
  github: 'https://github.com/tarunpediredla-GenAi',
  handle: '@tarunpediredla',
  status: 'Available · 4+ Years Exp',
  resumePdfUrl: RESUME_PDF_URL,
} as const;

export const RESUME_SUMMARY_PARAGRAPHS = [
  'Full Stack Python Developer with 4+ years building web and SaaS applications in Python, Django, FastAPI, React and TypeScript. Skilled in REST APIs, AWS, Generative AI, LLMs, RAG, agentic workflows and multi-agent systems, and AI-powered IDEs, CLI tools and coding agents. Builder of insure-bazarpolicies, an insurance and reinsurance platform.',
  'Across roles at Saras India Systems Private Limited, CP Academy, and Finite HR & IT Solution, I have progressed from responsive React frontend engineering to end-to-end Python full-stack systems, REST APIs, PostgreSQL/MySQL data modeling, self-hosted n8n workflow architecture on AWS EC2, Docker containerization, and CI/CD delivery.',
  'My engineering focus combines deterministic backend invariants—JWT/RBAC security, server-side payment and stock validation, automated Pytest and Vitest suites—with grounded Generative AI, Agentic RAG, multi-agent orchestration, and human-in-the-loop review.',
];

export const RESUME_EXPERIENCE = [
  {
    id: 'finite-hr',
    company: 'Finite HR & IT Solution',
    role: 'Full Stack Python Developer | Generative AI & Agentic AI',
    period: 'Apr 2025 – Present',
    location: 'Hyderabad, Telangana, India',
    summary:
      'Developing full-stack applications and REST APIs with Python, Django REST Framework, FastAPI, React and TypeScript, while integrating LLMs, AI agents, and self-hosted n8n automations on AWS EC2.',
    responsibilities: [
      'Develop full-stack applications and REST APIs using Python, Django REST Framework, FastAPI, React and TypeScript.',
      'Integrate LLMs and AI agents; build automations on n8n with a strong understanding of its architecture — triggers, nodes, webhooks, data mapping and execution flow.',
      'Deploy applications and self-host n8n on AWS EC2, working with PostgreSQL, MySQL, Docker and CI/CD.',
    ],
    technologies: [
      'Python',
      'Django REST Framework',
      'FastAPI',
      'React',
      'TypeScript',
      'LLMs & AI Agents',
      'n8n',
      'AWS EC2',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'CI/CD',
    ],
  },
  {
    id: 'cp-academy',
    company: 'CP Academy',
    role: 'Full Stack Python Developer | AWS Cloud',
    period: 'Aug 2024 – 2025',
    location: 'Hyderabad, Telangana, India',
    summary:
      'Built full-stack web applications using Python, Django, and React with PostgreSQL/MySQL REST APIs and AWS deployment support.',
    responsibilities: [
      'Built full-stack applications with Python, Django and React; integrated REST APIs with PostgreSQL / MySQL.',
      'Supported web application deployments on AWS.',
    ],
    technologies: [
      'Python',
      'Django',
      'React',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'AWS',
    ],
  },
  {
    id: 'saras-india',
    company: 'Saras India Systems Private Limited',
    role: 'Frontend Developer',
    period: 'May 2022 – Jul 2024',
    location: 'India',
    summary:
      'Developed responsive React user interfaces, reusable component libraries, and REST API integrations across web applications.',
    responsibilities: [
      'Developed responsive React interfaces and reusable components; integrated REST APIs.',
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'HTML5',
      'CSS3',
      'REST APIs',
      'Responsive UI',
    ],
  },
];

export const RESUME_EDUCATION = [
  {
    id: 'bsc-cs',
    degree: 'B.Sc. Computer Science',
    institution:
      'Gayatri Vidya Parishad College for Degree and PG Courses (Autonomous)',
    completion: '2021',
    details:
      'Bachelor of Science in Computer Science (Autonomous) — Graduated 2021.',
  },
];

export const RESUME_SKILL_CATEGORIES: SkillCategoryEntry[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core programming, typed web development & relational SQL',
    accent: '#6B1D2F',
    skills: [
      {
        name: 'Python',
        purpose:
          'Primary backend language for Django, FastAPI, Flask, automation and AI systems',
      },
      {
        name: 'JavaScript',
        purpose:
          'Browser interactivity, asynchronous flows and REST API integrations',
      },
      {
        name: 'TypeScript',
        purpose:
          'Type-safe React interfaces and full-stack SaaS application development',
      },
      {
        name: 'SQL',
        purpose: 'Relational schema design, joins and transactional querying',
      },
      {
        name: 'HTML5',
        purpose: 'Semantic structure and accessible document markup',
      },
      {
        name: 'CSS3',
        purpose: 'Responsive layouts, typography and modern web styling',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Python frameworks, REST services, JWT & role-based access control',
    accent: '#4E5E56',
    skills: [
      {
        name: 'Django',
        purpose:
          'Full-featured Python web framework for ORM modeling, auth and business logic',
      },
      {
        name: 'Django REST Framework',
        purpose:
          'Serialized, authenticated REST APIs powering React and TypeScript clients',
      },
      {
        name: 'FastAPI',
        purpose:
          'High-performance typed Python APIs with SQLAlchemy and OpenAPI validation',
      },
      {
        name: 'Flask',
        purpose: 'Lightweight Python web services and microservice endpoints',
      },
      {
        name: 'REST APIs',
        purpose: 'Clean HTTP resource design, validation and client integration',
      },
      {
        name: 'JWT',
        purpose: 'Stateless access and refresh token API authentication',
      },
      {
        name: 'RBAC',
        purpose:
          'Role-based access control segregating customer, adjuster and admin permissions',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'React component architecture, hooks & responsive interfaces',
    accent: '#85243A',
    skills: [
      {
        name: 'React.js',
        purpose: 'Component-based SPA dashboards, storefronts and SaaS workspaces',
      },
      {
        name: 'React Hooks',
        purpose: 'Composable state management, effects and reusable UI logic',
      },
      {
        name: 'Tailwind CSS',
        purpose: 'Utility-first styling and consistent responsive design systems',
      },
      {
        name: 'Responsive UI',
        purpose: 'Adaptive layouts engineered for mobile, tablet and desktop viewports',
      },
    ],
  },
  {
    id: 'genai',
    title: 'GenAI',
    subtitle: 'LLM APIs, prompt frameworks, RAG, grounding & citations',
    accent: '#8C3449',
    skills: [
      {
        name: 'LLM APIs',
        purpose: 'Integrating foundation models into full-stack apps and workflows',
      },
      {
        name: 'Prompt Engineering (RCTC, CO-STAR, RTF)',
        purpose: 'Structured prompt frameworks for deterministic, high-signal responses',
      },
      {
        name: 'Zero-Shot · Few-Shot · CoT',
        purpose: 'Zero-shot, few-shot and Chain-of-Thought reasoning strategies',
      },
      {
        name: 'RAG',
        purpose: 'Document ingestion and retrieval-augmented generation pipelines',
      },
      {
        name: 'Agentic RAG',
        purpose: 'Agent-directed iterative retrieval and policy question answering',
      },
      {
        name: 'Tool / Function Calling',
        purpose: 'Structured JSON tool execution bridging LLMs to backend APIs',
      },
      {
        name: 'Grounding',
        purpose: 'Anchoring generated outputs to verified source documents',
      },
      {
        name: 'Fact-Checking & Citations',
        purpose: 'Evidence verification and inline source citations for human review',
      },
    ],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    subtitle: 'Multi-agent frameworks, guardrails, debugging & LLM evaluation',
    accent: '#6B1D2F',
    skills: [
      {
        name: 'LangChain',
        purpose: 'Modular chains, retrievers and tool-connected LLM pipelines',
      },
      {
        name: 'LangGraph',
        purpose: 'Stateful graph-based orchestration for complex agent workflows',
      },
      {
        name: 'CrewAI',
        purpose: 'Role-based collaborative multi-agent task execution',
      },
      {
        name: 'Google ADK',
        purpose: 'Agent Development Kit for structured AI assistant workflows',
      },
      {
        name: 'Multi-Agent Systems',
        purpose: 'Coordinated specialized agents sharing tools and state',
      },
      {
        name: 'Chatbots',
        purpose: 'Conversational interfaces with context memory and structured actions',
      },
      {
        name: 'Agentic Workflow Debugging',
        purpose: 'Tracing tool calls, state transitions and webhook execution flows',
      },
      {
        name: 'Guardrails',
        purpose: 'Schema validation and safety constraints on model outputs',
      },
      {
        name: 'Human-in-the-Loop',
        purpose: 'Human approval checkpoints for high-stakes underwriting and claims decisions',
      },
      {
        name: 'LLM Evaluation',
        purpose: 'Systematic quality, grounding and accuracy checks on AI outputs',
      },
      {
        name: 'Hugging Face',
        purpose: 'Open-weight model discovery, embeddings and AI ecosystem tooling',
      },
      {
        name: 'Ollama',
        purpose: 'Local open-source LLM inference and rapid offline prototyping',
      },
    ],
  },
  {
    id: 'cloud-automation',
    title: 'Cloud & Automation',
    subtitle: 'n8n workflow architecture, AWS EC2/S3/RDS/IAM, Docker & CI/CD',
    accent: '#7A8B82',
    skills: [
      {
        name: 'n8n Architecture & Automation',
        purpose: 'Triggers, nodes, webhooks, data mapping and execution flow — self-hosted on AWS EC2',
      },
      {
        name: 'AWS EC2',
        purpose: 'Hands-on compute provisioning, app deployment and self-hosted n8n',
        contextNote: 'Hands-on',
      },
      {
        name: 'AWS S3 / RDS / IAM',
        purpose: 'Presigned object uploads, managed PostgreSQL and access policies',
        contextNote: 'Working Knowledge',
      },
      {
        name: 'AWS CLI',
        purpose: 'Command-line cloud resource operations and deployment scripting',
      },
      {
        name: 'Google Cloud Console',
        purpose: 'Cloud API credentials, OAuth/webhook setup and project configuration',
      },
      {
        name: 'Docker',
        purpose: 'Containerized full-stack services and reproducible environments',
      },
      {
        name: 'CI/CD',
        purpose: 'Automated testing, build validation and continuous deployment',
      },
      {
        name: 'Git & GitHub',
        purpose: 'Version control, branching workflows and repository management',
      },
      {
        name: 'Vercel',
        purpose: 'Production frontend and serverless web deployments',
      },
    ],
  },
  {
    id: 'databases-testing',
    title: 'Databases & Testing',
    subtitle: 'Relational SQL, Firebase Firestore/Auth & automated test suites',
    accent: '#356C70',
    skills: [
      {
        name: 'PostgreSQL',
        purpose: 'ACID relational storage for customers, policies, claims and treaties',
      },
      {
        name: 'MySQL',
        purpose: 'Relational schema design, indexing and transactional backend persistence',
      },
      {
        name: 'Firebase (Firestore & Authentication)',
        purpose: 'Cloud document collections, security rules and user authentication',
      },
      {
        name: 'Pytest',
        purpose: 'Automated Python backend unit, API and state-machine testing',
      },
      {
        name: 'Vitest',
        purpose: 'Automated React and TypeScript frontend unit and component tests',
      },
    ],
  },
  {
    id: 'ai-development',
    title: 'AI Development',
    subtitle: 'AI-powered IDEs, CLI tools & coding agents across the SDLC',
    accent: '#80634B',
    skills: [
      {
        name: 'AI-Powered IDEs',
        purpose: 'Accelerated system design, refactoring and full-stack implementation',
      },
      {
        name: 'CLI Tools',
        purpose: 'Terminal-driven AI workflows, automation scripts and diagnostics',
      },
      {
        name: 'Coding Agents',
        purpose: 'Agent-assisted design, development, debugging and deployment',
      },
    ],
  },
];

export const RESUME_PROJECTS_META = [
  {
    id: 'currency-exchange-tracker',
    index: '01',
    title: 'Currency Exchange Rate Tracker',
    subtitle: 'Full Stack — Live Forex, Crypto & 30-Day Trends Dashboard',
    statusLabel: 'Live',
    technologies: [
      'React.js',
      'JavaScript',
      'REST APIs',
      'ExchangeRate-API',
      'Frankfurter',
      'CoinGecko',
    ],
    liveUrl: 'https://d2ywbdz39a2o4v.cloudfront.net/dashboard',
    githubUrl: '',
    resumeBullets: [
      'Developed a currency exchange dashboard integrating live forex rates, cryptocurrency prices and 30-day historical exchange trends.',
      'Implemented currency conversion, percentage-change calculations, volatility indicators and configurable rate alerts, with a responsive interface, offline support and API-failure fallbacks.',
    ],
  },
  {
    id: 'insuresphere-ai',
    index: '02',
    title: 'insure-bazarpolicies',
    subtitle: 'Enterprise Insurance & Reinsurance Platform',
    statusLabel: '140+ Tests Passing',
    technologies: [
      'React',
      'TypeScript',
      'Django REST Framework',
      'PostgreSQL',
      'JWT / RBAC',
      'Python',
      'Django',
      'RAG',
      'Pytest',
      'Vitest',
      'AWS Cloud',
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/tarunpediredla-GenAi/insuresphere-ai',
    resumeBullets: [
      'Built an insurance SaaS platform for customers, underwriting, claims (FNOL, evidence uploads, adjuster reviews, immutable audit logs), reinsurance recovery and portfolio analytics.',
      'Developed AI-assisted claims analysis and a Policy & RAG Studio with document ingestion, grounded retrieval, cited answers and human review.',
    ],
  },
  {
    id: 'calder-works',
    index: '03',
    title: 'Calder Works',
    subtitle: 'Multi-Agent Software Delivery Workspace · 8-Agent LangGraph Pipeline',
    statusLabel: '8-Agent LangGraph · Docker Sandbox',
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
    liveUrl: undefined,
    githubUrl: 'https://github.com/tarunpediredla-GenAi/calder-work',
    resumeBullets: [
      'Built a five-screen software delivery workspace coordinating an 8-agent LangGraph StateGraph (Requirements Analyst, Architect, parallel Python & React Engineers, Test Engineer, Bug Detection, Code Reviewer, Documentation Writer) with an explicit human plan-approval gate.',
      'Implemented three-column diff and test review with exact commit-SHA approval binding, automatic approval invalidation on change requests, two-step gated pull-request merges, and an isolated non-root --network=none Docker pytest sandbox.',
    ],
  },
  {
    id: 'panel-desk',
    index: '04',
    title: 'PanelDesk',
    subtitle: 'Voice & Text Interview PDF Q&A · Private Browser Indexing & Page Citations',
    statusLabel: 'Voice + PDF RAG · Page Citations',
    technologies: [
      'React',
      'TypeScript',
      'Express',
      'Gemini',
      'PDF.js',
      'IndexedDB',
      'Web Speech API',
      'Tailwind CSS',
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/tarunpediredla-GenAi/Panel-desk',
    resumeBullets: [
      'Built a voice-and-text interview PDF Q&A workspace that parses and indexes private interview PDFs client-side with PDF.js and IndexedDB—extracting coordinate-ordered lines, stripping repeated headers/footers, and linking multi-page answers to exact page citations.',
      'Implemented deterministic local token/bigram ranking, exact question-ID lookup, Web Speech API voice input/TTS playback, a DPR-aware slide-over PDF citation drawer, and a server-side Express + Gemini /api/answer proxy enforcing strict grounded answers and off-topic refusal.',
    ],
  },
  {
    id: 'release-desk',
    index: '05',
    title: 'ReleaseDesk',
    subtitle: 'API Testing, Contract Validation & Failure Debugging Workspace',
    statusLabel: 'Contract Engine · JWT + Gemini',
    technologies: [
      'React',
      'TypeScript',
      'Express',
      'REST APIs',
      'JSONPath',
      'JWT (HS256)',
      'Gemini',
      'Tailwind CSS',
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/tarunpediredla-GenAi/Release-desk',
    resumeBullets: [
      'Built a full-stack API testing, contract validation, and failure debugging workspace executing real HTTP suites against versioned Orders APIs (v1/v2) with deterministic JSONPath type/field assertions and server-managed HS256 JWT fixtures (200/201, 400, 401, 403, 500).',
      'Implemented request correlation IDs linking failed assertions to masked logs, serializer code excerpts, captured stack traces, sanitized server-side Gemini root-cause analysis, side-by-side v1→v2 run comparisons, and credential-free Markdown bug reports with linked passing retests.',
    ],
  },
  {
    id: 'cloud-claims-api',
    index: '06',
    title: 'Cloud Claims API',
    subtitle: 'FastAPI & AWS — FNOL Claims Microservice',
    statusLabel: 'In Development, Nov 2026',
    technologies: [
      'FastAPI',
      'SQLAlchemy',
      'Docker',
      'Pytest',
      'AWS S3',
      'RDS PostgreSQL',
      'AWS EC2',
    ],
    liveUrl: undefined,
    githubUrl: '',
    resumeBullets: [
      'Developing a claims API with FNOL status flow and automated tests; S3 presigned uploads, RDS PostgreSQL and EC2 deployment in progress.',
    ],
  },
  {
    id: 'satya-education',
    index: '07',
    title: "Satya's Education",
    subtitle: 'E-Commerce & Learning Platform',
    statusLabel: 'Live',
    technologies: ['React', 'TypeScript', 'Django', 'Firebase', 'Cashfree'],
    liveUrl: 'https://satyaeducationinstitute.vercel.app',
    githubUrl: 'https://github.com/tarunpediredla-GenAi/SatyaEducationinstitute',
    resumeBullets: [
      'Built a course / book storefront with cart, orders and student / admin portals; implemented server-side price and stock validation and Cashfree payments with HMAC webhook verification.',
    ],
  },
  {
    id: 'voice-task-planner',
    index: '08',
    title: 'AI Voice Task Planner',
    subtitle: 'Self-Hosted n8n Voice Automation on AWS EC2',
    statusLabel: 'AWS EC2',
    technologies: [
      'n8n Architecture',
      'Vapi',
      'Gemini',
      'Google Sheets',
      'Webhooks',
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/tarunpediredla-GenAi/n8n-ai-automations',
    resumeBullets: [
      'Designed node-based n8n flows integrating Vapi, Gemini and Google Sheets through webhooks; self-hosted n8n on AWS EC2.',
    ],
  },
] as const;
