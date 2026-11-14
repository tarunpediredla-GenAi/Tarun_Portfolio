# Tarun Pediredla — Cinematic 3D Full Stack Python & AI Portfolio

Production-ready interactive 3D developer portfolio for **Tarun Pediredla** (Full Stack Python Developer | Generative AI & Agentic AI, based in Visakhapatnam, India).

---

## Architecture & Highlights

- **Interactive 3D Command Center (`src/hero/v2/stage/CommandCenterStage.tsx`)**:
  - Built with **Three.js** using a composite 10-part procedural **Cybernetic Cheetah & Holographic AI Core** sculpture (`THREE.Group`), floating `CanvasTexture` code fragment monoliths, `THREE.InstancedMesh` technology constellation nodes, studio PBR reflections (`RoomEnvironment` + `PMREMGenerator`), 3-point warm/cool studio lighting, and grounded contact shadows.
  - Includes automatic software-WebGL detection (`WEBGL_debug_renderer_info`) with fence-synchronized frame pacing and a graceful static fallback when WebGL is unavailable.
- **6-Chapter GSAP ScrollTrigger Choreography (`src/hero/v2/beat.ts`, `src/App.tsx`)**:
  - **Chapter 01 — Introduction**: Wide atmospheric command center approach, interactive 3D motif switcher (`Cyber Cheetah` / `AI Core`), and drag-to-rotate turntable.
  - **Chapter 02 — About Me**: Lateral camera sweep revealing engineering summary and development philosophy pillars.
  - **Chapter 03 — Professional Journey**: Illuminated 3D timeline corridor featuring verified experience at **Finite HR & IT Solution**, **CP Academy**, and **Saras India Systems Private Limited**, alongside academic credentials.
  - **Chapter 04 — Technology Universe**: Synchronized 2D/3D orbital technology constellation with category filtering (`Frontend`, `Backend`, `Databases`, `AI & Automation`, `Dev & Deployment`).
  - **Chapter 05 — Featured Projects**: Five in-portfolio case studies including **Currency Exchange Rate Tracker**, **InsureSphere AI**, **Satya's Education**, **Alex AI Mock Technical Interviewer**, and **AI Voice Task Planner**, with demo links and transparent implementation notes.
  - **Chapter 06 — Contact**: Direct communication channels (`tarunpediredla9966@gmail.com`, `+91 8074080773`, GitHub) and printable/downloadable Resume viewer.
- **Central Typed Data File (`src/data/content.ts`)**:
  - All biography, career timeline, skills, projects, and education content lives in a single typed file for easy maintenance in VS Code.

---

## Newly Featured — Currency Exchange Rate Tracker

**[Open Live Currency Dashboard](https://d2ywbdz39a2o4v.cloudfront.net/dashboard)**

- Portfolio description: currency conversion, live fiat/crypto quote comparisons, 24-hour change indicators, historical rate trends, volatility indicators, and conditional alerts.
- Specified providers: ExchangeRate-API (live forex), Frankfurter (historical data), and CoinGecko (cryptocurrency values).
- The dashboard is highlighted first in the main project showcase and included in the case-study explorer and interactive project reel.
- **Source integrity:** The dashboard URL and requirements were supplied by the portfolio owner. The tracker implementation repository was not provided, so this repository contains the *portfolio presentation*, not the tracker microservice's backend or CI/CD code. The cover illustration is not a screenshot of live rates.

---

## Local Installation & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server** (runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

3. **Type-check / Lint**:
   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## Deploying to Vercel

This project includes a pre-configured `vercel.json` file for zero-configuration deployment on Vercel.

### Option A — Deploy via GitHub Integration
1. Push this repository to GitHub (`https://github.com/tarunpediredla-GenAi/...`).
2. Log in to [Vercel](https://vercel.com) and click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel automatically detects **Vite** (`npm run build`, output directory `dist`).
5. Click **Deploy**.

### Option B — Deploy via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```
