/**
 * Central typed portfolio content file for Tarun Pediredla.
 * Source of truth: Tarun Pediredla's resume and verified public GitHub repositories.
 */

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
  projectsUsedIn: string[];
  orbitRadius: number;
  orbitAngle: number;
  accentColor: string;
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
    role: 'FULL STACK PYTHON DEVELOPER',
    secondaryTitle: 'GENERATIVE AI · AGENTIC AI · WEB APPLICATIONS',
    professionalTitle: 'Full Stack Python Developer | Generative AI & Agentic AI',
    tagline: 'Building intelligent applications. From frontend experiences to AI-powered automation.',
    email: 'tarunpediredla9966@gmail.com',
    phone: '+91 8074080773',
    location: 'Visakhapatnam, India',
    github: 'https://github.com/tarunpediredla-GenAi',
    fallbackBackdrop: '/src/assets/images/tarun_command_backdrop_1793895972254.jpg',
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
      'I am a Full Stack Python Developer based in Visakhapatnam, India, building web applications that connect responsive React interfaces with structured Python and Django backends, relational and document databases, and practical Generative AI workflows.',
      'My career began with solid frontend foundations in HTML, CSS, JavaScript, and React.js at Saras India Systems Private Limited, progressed into end-to-end Python full stack engineering at CP Academy, and now encompasses Full Stack Python, Generative AI, Agentic AI, Docker workflows, and CI/CD pipelines at Finite HR & IT Solution.',
      'Across my engineering work and portfolio systems, I focus on reliable state management, clean API contracts, voice-first and conversational AI interfaces powered by Google Gemini and Vapi, and automated n8n orchestration pipelines.',
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
          'Prioritizing role-based access rules, server-side verification, Docker containerization, and reproducible CI/CD deployment workflows.',
      },
    ],
  },

  experience: [
    {
      id: 'finite-hr',
      company: 'Finite HR & IT Solution',
      role: 'Full Stack Python Developer',
      period: '1 April 2025 – Present',
      location: 'India',
      summary:
        'Developing full stack Python web applications and integrating Generative AI and Agentic AI workflows with containerized deployment pipelines.',
      responsibilities: [
        'Full stack Python application development across modern web architectures',
        'Building and maintaining cohesive frontend and backend functionality',
        'Generative AI and agentic AI application development and workflow orchestration',
        'Managing Docker workflows and automated CI/CD pipelines',
      ],
      technologies: ['Python', 'Django', 'React.js', 'Generative AI', 'Agentic AI', 'Docker', 'CI/CD'],
    },
    {
      id: 'cp-academy',
      company: 'CP Academy',
      role: 'Full Stack Python Developer',
      period: 'Duration: 9 months',
      location: 'India',
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
    note: 'TypeScript and Express are used in my portfolio projects (Satya’s Education and Alex AI Mock Technical Interviewer) and are presented here as project technologies rather than technologies claimed across every employment role.',
    categories: ['All', 'Frontend', 'Backend', 'Databases', 'AI & Automation', 'Dev & Deployment'],
    items: [
      {
        id: 'html',
        name: 'HTML',
        category: 'Frontend',
        scopeNote: 'Professional Role & Projects',
        description: 'Semantic document structure, accessible landmarks, forms, and SEO-ready markup.',
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
        description: 'Asynchronous client logic, DOM events, Web Speech & Audio APIs, and REST consumption.',
        projectsUsedIn: ['Saras India Systems', 'CP Academy', 'Finite HR & IT Solution'],
        orbitRadius: 2.3,
        orbitAngle: 2.6,
        accentColor: '#38bdf8',
      },
      {
        id: 'react',
        name: 'React.js',
        category: 'Frontend',
        scopeNote: 'Professional Role & Projects',
        description: 'Component architecture, custom hooks, state management, and interactive client views.',
        projectsUsedIn: ['Saras India Systems', 'Finite HR & IT Solution', 'Satya’s Education', 'Alex AI Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 3.8,
        accentColor: '#06b6d4',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Frontend',
        scopeNote: 'Portfolio Project Technology',
        description: 'Used in portfolio projects for strict data contracts, API payload typing, and component props.',
        projectsUsedIn: ['Satya’s Education', 'Alex AI Mock Technical Interviewer'],
        orbitRadius: 2.3,
        orbitAngle: 5.0,
        accentColor: '#06b6d4',
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Backend',
        scopeNote: 'Core Professional Stack',
        description: 'Primary backend language for full stack web applications, data processing, and AI integration.',
        projectsUsedIn: ['Finite HR & IT Solution', 'CP Academy', 'AI Workflows'],
        orbitRadius: 3.1,
        orbitAngle: 0.7,
        accentColor: '#22d3ee',
      },
      {
        id: 'django',
        name: 'Django',
        category: 'Backend',
        scopeNote: 'Core Professional Stack',
        description: 'Full-featured Python web framework for ORM modeling, authentication, REST APIs, and admin workflows.',
        projectsUsedIn: ['Finite HR & IT Solution', 'CP Academy', 'Satya’s Education Architecture'],
        orbitRadius: 3.1,
        orbitAngle: 2.8,
        accentColor: '#22d3ee',
      },
      {
        id: 'express',
        name: 'Express',
        category: 'Backend',
        scopeNote: 'Portfolio Project Technology',
        description: 'Used in portfolio projects to serve API proxy routes, Cashfree checkout endpoints, and Gemini SDK streams.',
        projectsUsedIn: ['Satya’s Education', 'Alex AI Mock Technical Interviewer'],
        orbitRadius: 3.1,
        orbitAngle: 4.9,
        accentColor: '#22d3ee',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        category: 'Databases',
        scopeNote: 'Relational Database',
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
        description: 'Relational persistence, structured queries, and vector/knowledge-base storage in AI workflows.',
        projectsUsedIn: ['Backend Systems', 'n8n Knowledge-Base Chat Agent'],
        orbitRadius: 3.8,
        orbitAngle: 3.2,
        accentColor: '#60a5fa',
      },
      {
        id: 'firestore',
        name: 'Firebase Firestore',
        category: 'Databases',
        scopeNote: 'Portfolio Project Database',
        description: 'Document collections, security rules (`firestore.rules`), user entitlements, orders, and interview history.',
        projectsUsedIn: ['Satya’s Education', 'Alex AI Mock Technical Interviewer'],
        orbitRadius: 3.8,
        orbitAngle: 5.3,
        accentColor: '#60a5fa',
      },
      {
        id: 'genai',
        name: 'Generative AI',
        category: 'AI & Automation',
        scopeNote: 'Professional Role & Projects',
        description: 'Prompt engineering, structured JSON output generation, conversational persona design, and RAG.',
        projectsUsedIn: ['Finite HR & IT Solution', 'Alex AI Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 0.4,
        accentColor: '#f59e0b',
      },
      {
        id: 'agentic-ai',
        name: 'Agentic AI',
        category: 'AI & Automation',
        scopeNote: 'Professional Role & Projects',
        description: 'Tool-calling agents, multi-step decision workflows, autonomous day planning, and interview evaluation.',
        projectsUsedIn: ['Finite HR & IT Solution', 'Alex AI Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 1.65,
        accentColor: '#f59e0b',
      },
      {
        id: 'gemini',
        name: 'Google Gemini',
        category: 'AI & Automation',
        scopeNote: 'AI Foundation Model SDK',
        description: 'Server-side `@google/genai` integration for technical interview dialogues, TTS, transcription, and task planning.',
        projectsUsedIn: ['Alex AI Mock Technical Interviewer', 'AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 2.9,
        accentColor: '#f59e0b',
      },
      {
        id: 'n8n',
        name: 'n8n',
        category: 'AI & Automation',
        scopeNote: 'Workflow Automation Engine',
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
        description: 'Real-time telephony and voice assistant orchestration triggering backend n8n tool webhooks.',
        projectsUsedIn: ['AI Voice Task Planner'],
        orbitRadius: 4.5,
        orbitAngle: 5.4,
        accentColor: '#f59e0b',
      },
      {
        id: 'github',
        name: 'GitHub',
        category: 'Dev & Deployment',
        scopeNote: 'Version Control & Collaboration',
        description: 'Source control, repository workflows, branch management, and technical documentation.',
        projectsUsedIn: ['All Repositories'],
        orbitRadius: 5.2,
        orbitAngle: 0.9,
        accentColor: '#94a3b8',
      },
      {
        id: 'docker',
        name: 'Docker',
        category: 'Dev & Deployment',
        scopeNote: 'Professional Role Workflow',
        description: 'Containerizing full stack applications for consistent local development and production environments.',
        projectsUsedIn: ['Finite HR & IT Solution'],
        orbitRadius: 5.2,
        orbitAngle: 2.4,
        accentColor: '#94a3b8',
      },
      {
        id: 'cicd',
        name: 'CI/CD',
        category: 'Dev & Deployment',
        scopeNote: 'Professional Role Workflow',
        description: 'Automated build, lint, test, and deployment pipelines for reliable software delivery.',
        projectsUsedIn: ['Finite HR & IT Solution', 'Alex AI Interviewer'],
        orbitRadius: 5.2,
        orbitAngle: 3.9,
        accentColor: '#94a3b8',
      },
      {
        id: 'vercel',
        name: 'Vercel',
        category: 'Dev & Deployment',
        scopeNote: 'Cloud Hosting & Serverless',
        description: 'Production SPA and serverless API route deployment with environment configuration.',
        projectsUsedIn: ['Satya’s Education'],
        orbitRadius: 5.2,
        orbitAngle: 5.4,
        accentColor: '#94a3b8',
      },
    ],
  },

  projects: [
    {
      id: 'satya-education',
      index: '01',
      title: "Satya's Education",
      subtitle: 'E-Commerce & Digital-Learning Platform for Books and Recorded Courses',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/SatyaEducationinstitute',
      liveUrl: 'https://satyaeducationinstitute.vercel.app',
      liveUrlNote: 'Verified live deployment on Vercel (HTTP 200)',
      heroImage: '/src/assets/images/project_satya_education_1793895968852.jpg',
      technologies: ['React', 'TypeScript', 'Django', 'Firebase', 'Firestore', 'Cashfree', 'Vercel'],
      description:
        'An e-commerce and digital-learning platform supporting physical/digital books, recorded video courses, and separate student and administrator experiences.',
      problemStatement:
        'Educational institutions selling both physical books and recorded video courses often struggle with fragmented tools—using one platform for storefront checkout and another for student course playback and entitlement management. Satya’s Education unifies product browsing, shopping cart checkout, payment verification, student course progress tracking, and administrator catalogue controls in a single platform.',
      architectureOverview:
        'The client application is built with React and TypeScript (`App.tsx`, `ProductDetailView.tsx`, `CartCheckoutView.tsx`, `UserDashboardView.tsx`, `AdminDashboardView.tsx`). Authentication and document persistence use Firebase Authentication and Cloud Firestore with strict role-based security rules (`firestore.rules` and `security_spec.md`). Backend order creation, price recalculation, and Cashfree payment verification are handled through server-side API endpoints (`src/serverApp.ts` & Vercel `/api` serverless integration alongside Django backend modeling).',
      architectureFlow: [
        {
          step: '01',
          node: 'React + TypeScript Storefront',
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
        'Implemented a multi-view React + TypeScript storefront with category filtering, custom SVG cover artwork rendering (`CoverArtwork.tsx`), a persistent shopping cart and address management workflow (`CartCheckoutView.tsx`), a dedicated student learning dashboard with lesson completion tracking (`UserDashboardView.tsx`), and an administrator console (`AdminDashboardView.tsx`). Firestore rules enforce owner-only reads on user profiles and admin-only mutations on catalogue products and banners.',
      implementedFeatures: [
        'Product catalogue for technical books, children’s storybooks, and recorded video courses with search and category filtering',
        'Shopping cart, saved shipping address management, and order summary calculation (`commerceRules.ts`)',
        'Firebase Authentication modal (`AuthModal.tsx`) with session synchronization and bearer token headers (`apiAuth.ts`)',
        'Separate Student Dashboard (purchased course curriculum, video lesson progress) and Admin Dashboard (product, category, banner, and order management)',
        'Server-side API validation (`serverApp.ts`) and Cashfree payment gateway integration with order verification',
        'Comprehensive Firestore & Storage security rules (`firestore.rules`, `storage.rules`) with automated rule tests (`firestore.rules.test.ts`)',
      ],
      plannedOrPartialFeatures: [
        'Repository ships with a pre-populated initial sample catalogue (`sampleCatalog.ts`) as fallback/seed data alongside live Firestore collection syncing',
        'Serverless deployment on Vercel uses the Express/Node API adapter (`api/index.js` + `src/serverApp.ts`) to run cleanly in Vercel’s runtime while aligning with Django REST domain conventions',
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
      index: '02',
      title: 'Alex AI Mock Technical Interviewer',
      subtitle: 'Conversational Voice & Text AI Technical Interview Practice Platform',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/hiringmanager',
      heroImage: '/src/assets/images/project_alex_interviewer_1793895970870.jpg',
      technologies: ['React', 'TypeScript', 'Express', 'Gemini', 'Firebase'],
      description:
        'A conversational AI technical interview practice application featuring spoken and typed interaction, a 50-question Full Stack Python & GenAI curriculum, an interactive system-design whiteboard, and structured hiring-rubric evaluations.',
      problemStatement:
        'Developers preparing for Full Stack Python and Generative AI interviews rarely get realistic practice explaining architecture trade-offs out loud or defending system designs under follow-up questioning. Static flashcard apps cannot probe vague answers or evaluate spoken technical depth.',
      architectureOverview:
        'The frontend is a React 19 and TypeScript workspace combining a live interview studio, dual-channel speech recognition (Web Speech API with raw audio fallback), an interactive system-design architecture whiteboard, and a real-time transcript drawer. The backend Express server (`server.ts`) integrates the official `@google/genai` SDK (`GoogleGenAI`) with grounded system instructions across a curated 50-question curriculum (`interviewQuestions.ts`) and persists completed interview debriefs to Firebase Firestore.',
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
        'Engineered `server.ts` with dedicated endpoints for conversational turns (`/api/interview/chat`), fallback audio transcription (`/api/interview/transcribe`), high-definition voice synthesis (`/api/interview/tts` supporting Fenrir, Puck, Zephyr, and Kore personas), and structured Hiring Committee evaluation (`/api/interview/evaluate`). Built the client workspace with adjustable speech pacing (0.75x–1.1x), live transcript tracking, and an architecture node whiteboard.',
      implementedFeatures: [
        'AI interview interface with selectable interviewer voice personas (Fenrir, Puck, Zephyr, Kore) and configurable speaking speed',
        'Live conversational transcript experience supporting both spoken (microphone) and typed candidate responses',
        'Interactive system-design architecture whiteboard synchronized with the interviewer prompt context',
        'Curated 50-question Full Stack Python, Django, React, SQL, and GenAI canonical curriculum (`src/data/interviewQuestions.ts`)',
        'AI-powered Hiring Committee evaluation generating structured scores, strengths, gaps, and history persistence in Firebase',
      ],
      plannedOrPartialFeatures: [
        'Live Gemini voice/chat synthesis requires a runtime `GEMINI_API_KEY` on the Express server (`server.ts`); no public multi-tenant hosted URL is published in the repository to protect API quotas',
        'README illustrates a target enterprise architecture with Django/Celery/pgvector concepts, while the shipped repository implements the server tier via the full-stack Express + Vite server (`server.ts`) and Firebase Firestore',
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
      index: '03',
      title: 'AI Voice Task Planner',
      subtitle: 'Voice-Driven Task Management & AI Day-Planning Automation Pipeline',
      githubUrl: 'https://github.com/tarunpediredla-GenAi/n8n-ai-automations',
      heroImage: '/src/assets/images/project_voice_task_planner_1793895973106.jpg',
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

export const COMMAND_BACKDROP_IMAGE = portfolioContent.profile.fallbackBackdrop;

export const TARUN_PROFILE = {
  name: portfolioContent.profile.name,
  role: portfolioContent.profile.professionalTitle,
  tagline: portfolioContent.profile.tagline,
  email: portfolioContent.profile.email,
  phone: portfolioContent.profile.phone,
  phoneClean: '+918074080773',
  location: portfolioContent.profile.location,
  github: portfolioContent.profile.github,
  handle: '@tarunpediredla',
  status: 'Online',
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
    accent: '#38bdf8',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'React.js' },
      {
        name: 'TypeScript',
        contextNote:
          'Used in portfolio projects (Satya’s Education & Alex AI Mock Interviewer)',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Python service layers, REST APIs & full-stack servers',
    accent: '#fd5200',
    skills: [
      { name: 'Python' },
      { name: 'Django' },
      {
        name: 'Express',
        contextNote:
          'Used in portfolio project backend (Alex AI Mock Technical Interviewer)',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Relational SQL engines & real-time cloud document stores',
    accent: '#10b981',
    skills: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Firebase Firestore' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Conversational voice agents, LLM reasoning & webhook pipelines',
    accent: '#a78bfa',
    skills: [
      { name: 'Generative AI' },
      { name: 'Agentic AI' },
      { name: 'Google Gemini' },
      { name: 'n8n' },
      { name: 'Vapi' },
    ],
  },
  {
    id: 'dev-deployment',
    title: 'Dev & Deployment',
    subtitle: 'Containerized workflows, version control & cloud hosting',
    accent: '#c8a882',
    skills: [
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Vercel' },
    ],
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
  caseStudy: ProjectCaseStudy;
}

const ACCENT_COLORS = ['#38bdf8', '#a78bfa', '#fd5200'];
const CATEGORIES = [
  'Full Stack EdTech & E-Commerce',
  'Conversational Voice & Text AI',
  'Agentic Voice Automation',
];

export const FEATURED_PROJECTS: FeaturedProject[] =
  portfolioContent.projects.map((p, idx) => ({
    id: p.id,
    number: p.index,
    title: p.title,
    subtitle: p.subtitle,
    category: CATEGORIES[idx] || 'Full Stack & AI',
    accentColor: ACCENT_COLORS[idx] || '#38bdf8',
    image: p.heroImage,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    summary: p.description,
    features: p.implementedFeatures.slice(0, 4),
    architectureFlow: p.architectureFlow.map((step) => step.node),
    implementationNote: p.plannedOrPartialFeatures[0] || p.implementationExplanation,
    technologies: p.technologies,
    caseStudy: p,
  }));

export const KINETIC_ROLES = [
  { role: 'ENGINEER', caption: 'Python · Django · React · SQL' },
  { role: 'DESIGNER', caption: 'Interactive 3D & Modern Web UI' },
  { role: 'BUILDER', caption: 'End-to-End Full Stack Systems' },
  { role: 'INNOVATOR', caption: 'Generative AI & Agentic Workflows' },
  { role: 'DEVELOPER', caption: 'Clean Code & API Architecture' },
  { role: 'CREATOR', caption: 'Voice AI · Gemini · Vapi · n8n' },
  { role: 'THINKER', caption: 'System Design & Data Modeling' },
  { role: 'SHIPPER', caption: 'Docker · CI/CD · Vercel Production' },
  { role: 'PROBLEM-SOLVER', caption: 'Deterministic AI & Business Logic' },
];

