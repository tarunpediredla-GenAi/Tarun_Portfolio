/**
 * Scroll-driven camera beat store & chapter keyframes.
 * Inspired by Reference A (letshackit/Portfolio src/hero/v2/beat.ts & store.ts).
 * Coordinates GSAP ScrollTrigger progress across the 6 storytelling chapters
 * with the Three.js CameraRig and 3D stage elements.
 */

export interface CameraKeyframe {
  chapterId: string;
  chapterIndex: number;
  /** Camera position in 3D world space */
  pos: [number, number, number];
  /** Camera lookAt target in 3D world space */
  target: [number, number, number];
  /** Core group rotation Y offset */
  coreRotationY: number;
  /** Core group position X offset to make room for chapter panels */
  stageOffsetX: number;
  /** Core scale multiplier */
  coreScale: number;
  /** Constellation ring expansion factor */
  constellationSpread: number;
  /** Timeline corridor illumination factor */
  corridorGlow: number;
}

export const CHAPTER_KEYFRAMES: CameraKeyframe[] = [
  // Chapter 01 — Introduction: Wide atmospheric view approaching central 3D Cyber Cheetah / AI Core
  {
    chapterId: 'hero',
    chapterIndex: 0,
    pos: [0.0, 0.55, 6.6],
    target: [-0.85, 0.15, 0.0],
    coreRotationY: -0.35,
    stageOffsetX: 1.55,
    coreScale: 1.0,
    constellationSpread: 1.0,
    corridorGlow: 0.25,
  },
  // Chapter 02 — About Me: Camera moves sideways, revealing holographic information panels
  {
    chapterId: 'about',
    chapterIndex: 1,
    pos: [-2.4, 0.85, 5.2],
    target: [0.6, 0.2, -0.4],
    coreRotationY: 0.65,
    stageOffsetX: -1.65,
    coreScale: 0.95,
    constellationSpread: 1.15,
    corridorGlow: 0.4,
  },
  // Chapter 03 — Professional Journey: Camera pushes into illuminated 3D timeline corridor
  {
    chapterId: 'journey',
    chapterIndex: 2,
    pos: [0.0, 1.35, 3.8],
    target: [0.0, 0.1, -2.5],
    coreRotationY: 1.57,
    stageOffsetX: 1.8,
    coreScale: 0.82,
    constellationSpread: 1.35,
    corridorGlow: 1.0,
  },
  // Chapter 04 — Technology Universe: Orbiting constellation expands into full view
  {
    chapterId: 'technologies',
    chapterIndex: 3,
    pos: [0.3, 2.1, 6.0],
    target: [0.0, 0.0, 0.0],
    coreRotationY: 2.8,
    stageOffsetX: 0.0,
    coreScale: 1.08,
    constellationSpread: 1.65,
    corridorGlow: 0.55,
  },
  // Chapter 05 — Featured Projects: Deep ambient showcase matrix framing
  {
    chapterId: 'projects',
    chapterIndex: 4,
    pos: [2.2, 0.9, 6.8],
    target: [-0.6, 0.1, -0.8],
    coreRotationY: 4.1,
    stageOffsetX: 1.9,
    coreScale: 0.85,
    constellationSpread: 1.25,
    corridorGlow: 0.35,
  },
  // Chapter 06 — Contact: Camera pulls backward to reveal minimal closing horizon
  {
    chapterId: 'contact',
    chapterIndex: 5,
    pos: [0.0, 1.1, 8.8],
    target: [0.0, 0.2, 0.0],
    coreRotationY: 5.4,
    stageOffsetX: 0.0,
    coreScale: 0.9,
    constellationSpread: 1.4,
    corridorGlow: 0.6,
  },
];

export type HeroVisualMode = 'cheetah' | 'core';

export interface StageBeatState {
  /** Overall page scroll progress 0..1 */
  scrollProgress: number;
  /** Continuous chapter index 0..5 */
  chapterFloat: number;
  /** Active discrete chapter index 0..5 */
  activeChapterIndex: number;
  /** Active chapter ID */
  activeChapterId: string;
  /** Normalized mouse parallax -1..1 */
  pointerX: number;
  pointerY: number;
  /** User drag-to-rotate turntable offset in radians */
  userYaw: number;
  userPitch: number;
  isDragging: boolean;
  /** Selected skill ID in Technology Universe */
  highlightedSkillId: string | null;
  /** Visual sculpture mode: Cybernetic Cheetah motif or Holographic AI Core */
  visualMode: HeroVisualMode;
  /** Orbit speed multiplier */
  orbitSpeed: number;
  /** Manual camera preset override (null = scroll-driven) */
  manualChapterOverride: number | null;
}

export const stageStore: StageBeatState = {
  scrollProgress: 0,
  chapterFloat: 0,
  activeChapterIndex: 0,
  activeChapterId: 'hero',
  pointerX: 0,
  pointerY: 0,
  userYaw: 0,
  userPitch: 0,
  isDragging: false,
  highlightedSkillId: null,
  visualMode: 'cheetah',
  orbitSpeed: 1.0,
  manualChapterOverride: null,
};

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeStageStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyStageStore(): void {
  listeners.forEach((fn) => fn());
}

export function setActiveChapter(index: number, id: string): void {
  if (stageStore.activeChapterIndex !== index || stageStore.activeChapterId !== id) {
    stageStore.activeChapterIndex = index;
    stageStore.activeChapterId = id;
    notifyStageStore();
  }
}

export function setVisualMode(mode: HeroVisualMode): void {
  stageStore.visualMode = mode;
  notifyStageStore();
}

export function setOrbitSpeed(speed: number): void {
  stageStore.orbitSpeed = speed;
  notifyStageStore();
}

export function setManualChapterOverride(chapterIndex: number | null): void {
  stageStore.manualChapterOverride = chapterIndex;
  if (chapterIndex !== null && CHAPTER_KEYFRAMES[chapterIndex]) {
    stageStore.chapterFloat = chapterIndex;
    stageStore.activeChapterIndex = chapterIndex;
    stageStore.activeChapterId = CHAPTER_KEYFRAMES[chapterIndex].chapterId;
  }
  notifyStageStore();
}
