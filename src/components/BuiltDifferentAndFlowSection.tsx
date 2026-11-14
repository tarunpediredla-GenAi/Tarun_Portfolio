import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Cpu, Bot, Layers, Database, Cloud, Code2 } from 'lucide-react';
import {
  CAREER_TIMELINE,
  EDUCATION_HISTORY,
  SKILL_CATEGORIES,
  ENTERPRISE_SKILLS_TABLE,
  INSURESPHERE_TECH_STACK,
  CORE_ENGINEERING_STACK,
  AI_VERIFICATION_FEATURES,
  TARUN_PROFILE,
} from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface BuiltDifferentAndFlowSectionProps {
  onOpenResume: () => void;
}

const EDITORIAL_TICKER_ITEMS = [
  'FULL STACK PYTHON DEVELOPER',
  'GENERATIVE AI & AGENTIC AI',
  'HYDERABAD, TELANGANA',
  'DJANGO & REST APIS',
  'REACT & JAVASCRIPT',
  'AWS CLOUD INFRASTRUCTURE',
  'LANGGRAPH · LANGCHAIN · CREWAI',
  'N8N · AWS EC2 · DOCKER · CI/CD',
];

interface RobotHandSkill {
  id: string;
  shortLabel: string;
  badgeSub: string;
  title: string;
  category: string;
  description: string;
  pills: string[];
  accentHex: string;
}

const ROBOT_HAND_SKILLS: RobotHandSkill[] = [
  {
    id: 'python-django',
    shortLabel: 'PYTHON · DJANGO',
    badgeSub: 'BACKEND CORE',
    title: 'Python & Django Backend',
    category: '01 · Core Backend Architecture',
    description:
      'Enterprise REST APIs, quota-share reinsurance logic, authentication & scalable Django server architectures.',
    pills: ['Python', 'Django REST', 'FastAPI', 'PostgreSQL'],
    accentHex: '#5E1726',
  },
  {
    id: 'genai-gemini',
    shortLabel: 'GEN AI · GEMINI',
    badgeSub: 'LLM REASONING',
    title: 'Generative AI, Prompting & RAG',
    category: '02 · AI Intelligence Layer',
    description:
      'LLM APIs, prompt engineering, RAG and Agentic RAG, structured tool calling, grounded answers and citation-focused output review.',
    pills: ['Prompt Engineering', 'RAG', 'Agentic RAG', 'LLM APIs'],
    accentHex: '#751E31',
  },
  {
    id: 'agentic-vapi-n8n',
    shortLabel: 'N8N · VAPI VOICE',
    badgeSub: 'AGENTIC AI',
    title: 'AI Agents & n8n Orchestration',
    category: '03 · Autonomous Orchestration',
    description:
      'AI-agent frameworks (LangChain, LangGraph, CrewAI, Google ADK), multi-agent workflows and n8n voice automation with Vapi.',
    pills: ['LangGraph', 'CrewAI', 'n8n', 'Human-in-the-Loop'],
    accentHex: '#5E1726',
  },
  {
    id: 'react-javascript',
    shortLabel: 'REACT · JAVASCRIPT',
    badgeSub: 'FRONTEND ENGINE',
    title: 'React.js & JavaScript UI',
    category: '04 · Interactive Frontend',
    description:
      'High-contrast editorial interfaces, 3D WebGL stages, and responsive full-stack web apps.',
    pills: ['React.js', 'TypeScript', 'React Hooks', 'Tailwind CSS'],
    accentHex: '#35423C',
  },
  {
    id: 'databases-storage',
    shortLabel: 'POSTGRES · SQL',
    badgeSub: 'DATA LAYER',
    title: 'PostgreSQL, MySQL & Firebase',
    category: '05 · Database & Persistence',
    description:
      'Relational schema design, real-time Firestore collections, and high-integrity data pipelines.',
    pills: ['PostgreSQL', 'MySQL', 'SQL', 'Firestore'],
    accentHex: '#5E1726',
  },
  {
    id: 'devops-cloud',
    shortLabel: 'AWS · DOCKER · CI/CD',
    badgeSub: 'AWS CLOUD & DEVOPS',
    title: 'AWS Cloud, Docker & CI/CD',
    category: '06 · Cloud & Deployment',
    description:
      'AWS EC2 hands-on deployment experience; working knowledge of S3, RDS and IAM, alongside Docker, GitHub, CI/CD and Vercel.',
    pills: ['AWS EC2 (Hands-on)', 'S3/RDS/IAM (Working Knowledge)', 'Docker', 'CI/CD'],
    accentHex: '#35423C',
  },
];

/**
 * Helper to create a crisp retina 3D Canvas Texture for each floating skill holo-chip held in the robot's hands.
 */
function createSkillPlateTexture(
  label: string,
  sublabel: string,
  isPrimary: boolean
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 176;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rounded pill background in Warm Cream Beige or Deep Burgundy
    const radius = 34;
    const x = 12;
    const y = 12;
    const w = canvas.width - 24;
    const h = canvas.height - 24;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = isPrimary
      ? 'rgba(94, 23, 38, 0.96)'
      : 'rgba(250, 247, 242, 0.96)';
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = isPrimary ? '#F6F1E7' : '#5E1726';
    ctx.stroke();

    // Left status dot
    ctx.beginPath();
    ctx.arc(58, canvas.height / 2, 13, 0, Math.PI * 2);
    ctx.fillStyle = isPrimary ? '#F6F1E7' : '#5E1726';
    ctx.fill();

    // Sublabel
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillStyle = isPrimary ? '#EFE8DA' : '#687A70';
    ctx.fillText(sublabel, 90, 68);

    // Main Skill Label
    ctx.font = '800 34px "Outfit", "DM Sans", sans-serif';
    ctx.fillStyle = isPrimary ? '#FAF7F2' : '#232B27';
    ctx.fillText(label, 90, 118);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

interface CyberneticBotCanvasProps {
  activeSkillIdx: number;
  onSelectSkill: (idxOrUpdater: number | ((prev: number) => number)) => void;
  conjureTriggerRef: React.MutableRefObject<number>;
}

/**
 * Interactive 3D WebGL Cybernetic AI Bot & Cinematic Hand-Held Skill Projector
 * Sculpted in Warm Cream Beige ceramic armor, Muted Sage Grey chassis joints, and Deep Burgundy core/visor accents.
 * The robot holds both articulated hands forward, projecting an orbiting 3D hologram of Tarun's skills right in its hands!
 */
function CyberneticBotCanvas({
  activeSkillIdx,
  onSelectSkill,
  conjureTriggerRef,
}: CyberneticBotCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeSkill = ROBOT_HAND_SKILLS[activeSkillIdx];

  // Auto-cycle skills in the robot's hands every 3.0 seconds with a conjuring wave
  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      conjureTriggerRef.current = 1.35;
      onSelectSkill((prev) => (prev + 1) % ROBOT_HAND_SKILLS.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [isPaused, onSelectSkill, conjureTriggerRef]);

  const handleSelectSkill = (idx: number) => {
    conjureTriggerRef.current = 1.5;
    onSelectSkill(idx);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.28, 6.55);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Environment Map for Realistic Ceramic & Brushed Sage Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;

    // Studio & Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xf6f1e7, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfaf7f2, 2.3);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const sageRim = new THREE.PointLight(0x687a70, 3.8, 14);
    sageRim.position.set(-4, 2, 3);
    scene.add(sageRim);

    const burgundyRim = new THREE.PointLight(0x751e31, 4.8, 14);
    burgundyRim.position.set(4, -2.5, 2.5);
    scene.add(burgundyRim);

    // Dedicated PointLight inside the robot's hands to illuminate the skill hologram
    const palmHoloLight = new THREE.PointLight(0x8c253b, 3.5, 5);
    palmHoloLight.position.set(0, 0.1, 1.8);
    scene.add(palmHoloLight);

    // Root Robot Group (raised slightly so head, torso, and extended hands are framed in full cinema view)
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, 0.22, 0);
    scene.add(robotGroup);

    // Materials: Warm Cream Ceramic, Muted Sage Grey, and Deep Burgundy
    const creamCeramicMat = new THREE.MeshStandardMaterial({
      color: 0xf6f1e7,
      metalness: 0.2,
      roughness: 0.18,
    });
    const mutedSageMat = new THREE.MeshStandardMaterial({
      color: 0x687a70,
      metalness: 0.6,
      roughness: 0.28,
    });
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x232b27,
      metalness: 0.92,
      roughness: 0.08,
    });
    const burgundyGlowMat = new THREE.MeshStandardMaterial({
      color: 0x751e31,
      emissive: 0x5e1726,
      emissiveIntensity: 0.75,
      metalness: 0.4,
      roughness: 0.2,
    });
    const creamGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf6f1e7,
    });
    const holoWireMat = new THREE.MeshBasicMaterial({
      color: 0x5e1726,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });

    // Head Group (tracks mouse + glances down slightly at the skills in its hands)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.02, 0);
    robotGroup.add(headGroup);

    // Cranium
    const headGeo = new THREE.BoxGeometry(1.52, 1.12, 1.22);
    const headMesh = new THREE.Mesh(headGeo, creamCeramicMat);
    headGroup.add(headMesh);

    // Beveled Crown Plate
    const crownGeo = new THREE.BoxGeometry(1.28, 0.16, 1.02);
    const crownMesh = new THREE.Mesh(crownGeo, mutedSageMat);
    crownMesh.position.set(0, 0.62, 0);
    headGroup.add(crownMesh);

    // Visor Faceplate
    const visorGeo = new THREE.BoxGeometry(1.34, 0.6, 0.14);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.59);
    headGroup.add(visorMesh);

    // Expressive Cybernetic Eyes
    const leftEyeGeo = new THREE.CapsuleGeometry(0.088, 0.14, 8, 16);
    leftEyeGeo.rotateZ(Math.PI / 2);
    const leftEye = new THREE.Mesh(leftEyeGeo, creamGlowMat);
    leftEye.position.set(-0.31, 0.04, 0.67);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(leftEyeGeo, creamGlowMat);
    rightEye.position.set(0.31, 0.04, 0.67);
    headGroup.add(rightEye);

    // Side Audio/Sensor Pods
    const earGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.18, 24);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, mutedSageMat);
    leftEar.position.set(-0.84, 0.02, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, mutedSageMat);
    rightEar.position.set(0.84, 0.02, 0);
    headGroup.add(rightEar);

    const earRingGeo = new THREE.TorusGeometry(0.19, 0.025, 12, 32);
    earRingGeo.rotateY(Math.PI / 2);
    const leftEarRing = new THREE.Mesh(earRingGeo, burgundyGlowMat);
    leftEarRing.position.set(-0.94, 0.02, 0);
    headGroup.add(leftEarRing);

    const rightEarRing = new THREE.Mesh(earRingGeo, burgundyGlowMat);
    rightEarRing.position.set(0.94, 0.02, 0);
    headGroup.add(rightEarRing);

    // Antenna
    const antennaStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12),
      mutedSageMat
    );
    antennaStem.position.set(0.44, 0.82, -0.1);
    headGroup.add(antennaStem);

    const antennaTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      burgundyGlowMat
    );
    antennaTip.position.set(0.44, 1.06, -0.1);
    headGroup.add(antennaTip);

    // Neck Joint
    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.34, 0.34, 20),
      mutedSageMat
    );
    neckMesh.position.set(0, 0.3, 0);
    robotGroup.add(neckMesh);

    // Torso Chassis
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.55, 0);
    robotGroup.add(torsoGroup);

    const chestMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.4, 1.08),
      creamCeramicMat
    );
    torsoGroup.add(chestMesh);

    // Glowing AI Core Reactor on Chest
    const coreRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.038, 16, 48),
      burgundyGlowMat
    );
    coreRing.position.set(0, 0.14, 0.56);
    torsoGroup.add(coreRing);

    const coreCenter = new THREE.Mesh(
      new THREE.CircleGeometry(0.22, 32),
      visorMat
    );
    coreCenter.position.set(0, 0.14, 0.55);
    torsoGroup.add(coreCenter);

    // =========================================================================
    // ARTICULATED DUAL ARMS & HANDS HOLDING THE HOLOGRAPHIC SKILL CORE FORWARD
    // =========================================================================
    const shoulderGeo = new THREE.SphereGeometry(0.33, 24, 24);
    const leftShoulder = new THREE.Mesh(shoulderGeo, mutedSageMat);
    leftShoulder.position.set(-1.14, 0.36, 0.08);
    torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, mutedSageMat);
    rightShoulder.position.set(1.14, 0.36, 0.08);
    torsoGroup.add(rightShoulder);

    // Left Arm + Forearm + Palm Emitter Group (posed reaching forward to hold hologram)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-1.14, 0.36, 0.08);
    torsoGroup.add(leftArmPivot);

    const upperArmGeo = new THREE.CapsuleGeometry(0.16, 0.48, 12, 20);
    const leftUpperArm = new THREE.Mesh(upperArmGeo, creamCeramicMat);
    leftUpperArm.position.set(0.12, -0.26, 0.36);
    leftUpperArm.rotation.x = -0.82;
    leftUpperArm.rotation.z = -0.25;
    leftArmPivot.add(leftUpperArm);

    const leftElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      mutedSageMat
    );
    leftElbow.position.set(0.24, -0.46, 0.68);
    leftArmPivot.add(leftElbow);

    const forearmGeo = new THREE.CapsuleGeometry(0.15, 0.46, 12, 20);
    const leftForearm = new THREE.Mesh(forearmGeo, creamCeramicMat);
    leftForearm.position.set(0.42, -0.44, 1.05);
    leftForearm.rotation.x = -1.35;
    leftForearm.rotation.z = -0.42;
    leftArmPivot.add(leftForearm);

    // Left Cybernetic Hand & Glowing Palm Projector Disc
    const leftPalmGroup = new THREE.Group();
    leftPalmGroup.position.set(0.56, -0.4, 1.38);
    leftArmPivot.add(leftPalmGroup);

    const palmBaseGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.1, 24);
    const leftPalmBase = new THREE.Mesh(palmBaseGeo, mutedSageMat);
    leftPalmBase.rotation.z = -0.35;
    leftPalmBase.rotation.x = 0.25;
    leftPalmGroup.add(leftPalmBase);

    const leftPalmEmitter = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.028, 12, 32),
      burgundyGlowMat
    );
    leftPalmEmitter.rotation.x = Math.PI / 2 - 0.25;
    leftPalmEmitter.rotation.y = 0.35;
    leftPalmEmitter.position.set(0, 0.06, 0);
    leftPalmGroup.add(leftPalmEmitter);

    // Right Arm + Forearm + Palm Emitter Group (mirror pose reaching forward)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(1.14, 0.36, 0.08);
    torsoGroup.add(rightArmPivot);

    const rightUpperArm = new THREE.Mesh(upperArmGeo, creamCeramicMat);
    rightUpperArm.position.set(-0.12, -0.26, 0.36);
    rightUpperArm.rotation.x = -0.82;
    rightUpperArm.rotation.z = 0.25;
    rightArmPivot.add(rightUpperArm);

    const rightElbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      mutedSageMat
    );
    rightElbow.position.set(-0.24, -0.46, 0.68);
    rightArmPivot.add(rightElbow);

    const rightForearm = new THREE.Mesh(forearmGeo, creamCeramicMat);
    rightForearm.position.set(-0.42, -0.44, 1.05);
    rightForearm.rotation.x = -1.35;
    rightForearm.rotation.z = 0.42;
    rightArmPivot.add(rightForearm);

    // Right Cybernetic Hand & Glowing Palm Projector Disc
    const rightPalmGroup = new THREE.Group();
    rightPalmGroup.position.set(-0.56, -0.4, 1.38);
    rightArmPivot.add(rightPalmGroup);

    const rightPalmBase = new THREE.Mesh(palmBaseGeo, mutedSageMat);
    rightPalmBase.rotation.z = 0.35;
    rightPalmBase.rotation.x = 0.25;
    rightPalmGroup.add(rightPalmBase);

    const rightPalmEmitter = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.028, 12, 32),
      burgundyGlowMat
    );
    rightPalmEmitter.rotation.x = Math.PI / 2 - 0.25;
    rightPalmEmitter.rotation.y = -0.35;
    rightPalmEmitter.position.set(0, 0.06, 0);
    rightPalmGroup.add(rightPalmEmitter);

    // Volumetric Hologram Projection Cones shooting from both palms into the skill core
    const beamConeGeo = new THREE.ConeGeometry(0.42, 0.85, 24, 1, true);
    const beamConeMat = new THREE.MeshBasicMaterial({
      color: 0x5e1726,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const leftHoloBeam = new THREE.Mesh(beamConeGeo, beamConeMat);
    leftHoloBeam.position.set(-0.32, 0.28, 1.48);
    leftHoloBeam.rotation.z = 0.48;
    leftHoloBeam.rotation.x = Math.PI;
    torsoGroup.add(leftHoloBeam);

    const rightHoloBeam = new THREE.Mesh(beamConeGeo, beamConeMat);
    rightHoloBeam.position.set(0.32, 0.28, 1.48);
    rightHoloBeam.rotation.z = -0.48;
    rightHoloBeam.rotation.x = Math.PI;
    torsoGroup.add(rightHoloBeam);

    // =========================================================================
    // 3D SKILL HOLOGRAM CONSTELLATION LEVITATING DIRECTLY IN THE ROBOT'S HANDS
    // =========================================================================
    const handHologramGroup = new THREE.Group();
    // Positioned right above and between the two palms in front of the chest
    handHologramGroup.position.set(0, 0.58, 1.56);
    torsoGroup.add(handHologramGroup);

    // Central Levitating Skill Core Crystal held between the hands
    const holoCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      burgundyGlowMat
    );
    handHologramGroup.add(holoCrystal);

    const holoCrystalWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      new THREE.MeshBasicMaterial({
        color: 0xf6f1e7,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      })
    );
    handHologramGroup.add(holoCrystalWire);

    const palmOrbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.012, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0x5e1726,
        transparent: true,
        opacity: 0.6,
      })
    );
    palmOrbitRing.rotation.x = Math.PI / 2.15;
    handHologramGroup.add(palmOrbitRing);

    // 6 Orbiting 3D Skill Holo-Plates in the Robot's Hands
    const skillCarouselGroup = new THREE.Group();
    handHologramGroup.add(skillCarouselGroup);

    const skillSprites: THREE.Sprite[] = [];
    const skillTextures: THREE.CanvasTexture[] = [];

    ROBOT_HAND_SKILLS.forEach((sk, idx) => {
      const tex = createSkillPlateTexture(
        sk.shortLabel,
        sk.badgeSub,
        idx % 2 === 0
      );
      skillTextures.push(tex);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(mat);
      const angle = (idx / ROBOT_HAND_SKILLS.length) * Math.PI * 2;
      const radiusX = 1.22;
      const radiusZ = 0.92;
      sprite.position.set(
        Math.cos(angle) * radiusX,
        Math.sin(angle * 2) * 0.14,
        Math.sin(angle) * radiusZ
      );
      sprite.scale.set(0.98, 0.34, 1);
      skillCarouselGroup.add(sprite);
      skillSprites.push(sprite);
    });

    // Outer Gyroscope Orbital Rings around the Robot Stage
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.014, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0x5e1726,
        transparent: true,
        opacity: 0.42,
      })
    );
    outerRing.rotation.x = Math.PI / 2.3;
    outerRing.rotation.y = 0.32;
    orbitGroup.add(outerRing);

    const secondaryRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.22, 0.011, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0x687a70,
        transparent: true,
        opacity: 0.38,
      })
    );
    secondaryRing.rotation.x = -Math.PI / 3;
    secondaryRing.rotation.z = 0.5;
    orbitGroup.add(secondaryRing);

    const innerSphereWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 1),
      holoWireMat
    );
    orbitGroup.add(innerSphereWire);

    // Floating Energy Particles rising from the Robot's Hands
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x5e1726,
      size: 0.048,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer, Drag & Conjure Energy Pulse interaction
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let dragOffsetX = 0;
    let prevPointerX = 0;
    let downPointerX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = -((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));

      if (isDragging) {
        dragOffsetX += (e.clientX - prevPointerX) * 0.012;
        prevPointerX = e.clientX;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      downPointerX = e.clientX;
      conjureTriggerRef.current = 1.5;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging && Math.abs(e.clientX - downPointerX) < 8) {
        onSelectSkill((prev) => (prev + 1) % ROBOT_HAND_SKILLS.length);
      }
      isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();
    const worldSpritePos = new THREE.Vector3();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.elapsedTime;

      conjureTriggerRef.current = THREE.MathUtils.damp(
        conjureTriggerRef.current,
        0,
        4.2,
        dt
      );
      const conjureEnergy = conjureTriggerRef.current;

      // Smooth floating hover & gentle breathing
      robotGroup.position.y = 0.22 + Math.sin(t * 2.0) * 0.11;
      robotGroup.rotation.y = THREE.MathUtils.damp(
        robotGroup.rotation.y,
        targetX * 0.38 + dragOffsetX,
        6,
        dt
      );
      robotGroup.rotation.x = THREE.MathUtils.damp(
        robotGroup.rotation.x,
        -targetY * 0.16,
        6,
        dt
      );

      // Expressive head tracking (slightly looking toward the conjured skills in its hands)
      headGroup.rotation.y = THREE.MathUtils.damp(
        headGroup.rotation.y,
        targetX * 0.62,
        8,
        dt
      );
      headGroup.rotation.x = THREE.MathUtils.damp(
        headGroup.rotation.x,
        0.14 - targetY * 0.34,
        8,
        dt
      );
      headGroup.rotation.z = THREE.MathUtils.damp(
        headGroup.rotation.z,
        -targetX * 0.1,
        6,
        dt
      );

      // Cinematic Hand-Conjuring Motion: both arms cradle and pulse the skill hologram
      const handWave = Math.sin(t * 2.6) * 0.06;
      leftArmPivot.rotation.x = handWave - conjureEnergy * 0.24;
      leftArmPivot.rotation.z = Math.cos(t * 2.1) * 0.04 + conjureEnergy * 0.12;
      rightArmPivot.rotation.x = -handWave - conjureEnergy * 0.24;
      rightArmPivot.rotation.z =
        -Math.cos(t * 2.1) * 0.04 - conjureEnergy * 0.12;

      leftPalmEmitter.scale.setScalar(1 + conjureEnergy * 0.28);
      rightPalmEmitter.scale.setScalar(1 + conjureEnergy * 0.28);

      // Levitate & spin the 3D Skill Constellation inside the robot's hands
      handHologramGroup.position.y =
        0.58 + Math.sin(t * 3.0) * 0.07 + conjureEnergy * 0.12;
      holoCrystal.rotation.y += dt * (1.8 + conjureEnergy * 4.5);
      holoCrystal.rotation.x += dt * 1.1;
      holoCrystal.scale.setScalar(1 + conjureEnergy * 0.32);
      holoCrystalWire.rotation.y -= dt * 1.4;
      palmOrbitRing.rotation.z += dt * (0.9 + conjureEnergy * 2.5);

      // Orbit the 6 3D Skill Plates smoothly around the robot's hands
      skillCarouselGroup.rotation.y += dt * (0.55 + conjureEnergy * 1.8);

      skillSprites.forEach((sprite) => {
        sprite.getWorldPosition(worldSpritePos);
        // Scale up and brighten skill plates as they pass in front of the robot's hands toward the viewer
        const depthFactor = THREE.MathUtils.clamp(
          (worldSpritePos.z - 0.5) / 2.2,
          0,
          1
        );
        const s = 0.78 + depthFactor * 0.42;
        sprite.scale.set(s * 1.05, s * 0.36, 1);
        sprite.material.opacity = 0.45 + depthFactor * 0.55;
      });

      // Natural eye blink + conjure excitement
      const blinkWave = Math.sin(t * 0.85);
      const eyeScaleY = blinkWave > 0.985 ? 0.1 : 1 + conjureEnergy * 0.3;
      leftEye.scale.y = eyeScaleY;
      rightEye.scale.y = eyeScaleY;

      // Gyroscope & Core rotations
      const speedBoost = 1 + conjureEnergy * 3.0;
      coreRing.rotation.z += dt * 1.4 * speedBoost;
      outerRing.rotation.z -= dt * 0.38 * speedBoost;
      secondaryRing.rotation.y += dt * 0.48 * speedBoost;
      innerSphereWire.rotation.y += dt * 0.18 * speedBoost;
      innerSphereWire.rotation.x += dt * 0.12 * speedBoost;
      particles.rotation.y += dt * 0.06 * speedBoost;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      skillTextures.forEach((tex) => tex.dispose());
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [conjureTriggerRef, onSelectSkill]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full h-full relative select-none overflow-hidden"
    >
      {/* 3D WebGL Canvas where the Robot holds & orbits the 3D Skill Plates in its hands */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click or drag the robot to conjure the next skill in its hands"
      />

      {/* Cinematic Hand-Projected Skill Hologram HUD Dock (Anchored over the Robot's Hands) */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:bottom-6 z-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 18, scale: 0.94, rotateX: 14 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-full max-w-md rounded-2xl border-2 border-[#5E1726]/65 bg-[#FAF7F2]/94 backdrop-blur-md p-4 shadow-2xl"
          >
            {/* Top Hologram Emitter Bar */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#687A70]/35">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5E1726] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5E1726]" />
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#5E1726]">
                  Palm Holo-Projection · {activeSkill.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSelectSkill(
                    (activeSkillIdx + 1) % ROBOT_HAND_SKILLS.length
                  )
                }
                className="px-2.5 py-0.5 rounded-full bg-[#5E1726] hover:bg-[#751E31] text-[#F6F1E7] text-[9.5px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Conjure Next ↻
              </button>
            </div>

            {/* Active Skill Title & Description */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#232B27] leading-snug">
                  {activeSkill.title}
                </h3>
                <p className="text-xs text-[#35423C] mt-0.5 leading-relaxed font-medium">
                  {activeSkill.description}
                </p>
              </div>
            </div>

            {/* Skill Pills Projected From the Robot's Hands */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {activeSkill.pills.map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 rounded-lg bg-[#EFE8DA] border border-[#5E1726]/35 text-[11px] font-mono font-bold text-[#5E1726]"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Interactive Skill Selector Dots */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#687A70]/25">
              <div className="flex items-center gap-1.5">
                {ROBOT_HAND_SKILLS.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectSkill(idx)}
                    aria-label={`Project ${s.title}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeSkillIdx
                        ? 'w-6 bg-[#5E1726]'
                        : 'w-2 bg-[#687A70]/50 hover:bg-[#5E1726]/70'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-[0.18em] text-[#35423C]">
                Click Robot Hands or Dots
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const BuiltDifferentAndFlowSection: React.FC<
  BuiltDifferentAndFlowSectionProps
> = ({ onOpenResume }) => {
  const flowTriggerRef = useRef<HTMLDivElement>(null);
  const conjureTriggerRef = useRef<number>(0);
  const [activeRobotSkillIdx, setActiveRobotSkillIdx] = useState<number>(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  const handleSelectRobotSkill = React.useCallback(
    (idxOrUpdater: number | ((prev: number) => number)) => {
      conjureTriggerRef.current = 1.5;
      setActiveRobotSkillIdx(idxOrUpdater);
    },
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flow Art Container chapter subtle motion
      if (flowTriggerRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>(
          flowTriggerRef.current.querySelectorAll('.flow-art-section')
        );
        sections.forEach((sec) => {
          const textBlock = sec.querySelector('.flow-art-text');
          if (!textBlock) return;
          gsap.fromTo(
            textBlock,
            {
              scale: 0.96,
              opacity: 1,
              y: 26,
              transformOrigin: 'center center',
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 0.4,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const filteredCategories =
    activeSkillCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeSkillCategory);

  const skillDomainIcons = [Cpu, Bot, Sparkles, Code2, Database, Cloud];

  return (
    <>
      {/* =====================================================================
          KINETIC EDITORIAL MARQUEE RIBBON (Deep Burgundy & Warm Cream Beige)
         ===================================================================== */}
      <div className="w-full bg-[#5E1726] border-y border-[#F6F1E7]/20 py-3 overflow-hidden select-none">
        <div className="animate-editorial-marquee items-center gap-8">
          {[...EDITORIAL_TICKER_ITEMS, ...EDITORIAL_TICKER_ITEMS].map(
            (item, idx) => (
              <div
                key={`${item}-${idx}`}
                className="flex items-center gap-8 shrink-0"
              >
                <span className="text-xs font-mono font-bold tracking-[0.28em] text-[#F6F1E7] uppercase">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#DCE3DF]" />
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================================================
          FLOW-ART CHAPTERS & PAGE 4 INTERACTIVE 3D ROBOT SKILL STAGE
         ===================================================================== */}
      <div ref={flowTriggerRef} className="flow-art-container">
        {/* PAGE 2: CHAPTER 01 — WHO I AM (Deep Burgundy #5E1726 + Warm Cream Beige #F6F1E7) */}
        <section
          id="about"
          className="flow-art-section relative overflow-hidden flex flex-col justify-center"
          style={{
            backgroundColor: '#5E1726',
            color: '#F6F1E7',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          {/* Monumental Centered "Chapter 01 / WHO I AM" Header */}
          <div className="w-full max-w-6xl mx-auto px-6 md:px-14 text-center mb-16 pb-14 border-b border-[#F6F1E7]/25">
            <p
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                color: '#EFE8DA',
              }}
            >
              Chapter 01
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 6.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textTransform: 'uppercase',
                color: '#F6F1E7',
              }}
            >
              Who I Am
            </h2>
          </div>

          <div className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14">
            <div className="flow-art-label text-[#EFE8DA]">
              <span className="flow-art-num">01</span>
              <span className="flow-art-Title">WHO I AM</span>
            </div>
            <h3 className="flow-art-heading mb-10 text-[#F6F1E7]">
              BUILD WITHOUT LIMITS
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-[#F6F1E7]/30">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-[#EFE8DA] font-bold">
                  {TARUN_PROFILE.name} · {TARUN_PROFILE.role}
                </p>
                <p className="text-lg md:text-2xl font-semibold leading-relaxed text-[#F6F1E7]">
                  {TARUN_PROFILE.summary}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-[#EFE8DA]">
                  {TARUN_PROFILE.philosophy}
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  {
                    label: 'Current Role',
                    title: 'Full Stack Python Developer',
                    sub: 'Finite HR & IT Solution',
                  },
                  {
                    label: 'Location',
                    title: 'Hyderabad, Telangana',
                    sub: 'India · Open to Global & Remote',
                  },
                  {
                    label: 'AI Focus',
                    title: 'Gen AI & Agentic AI',
                    sub: 'Gemini · n8n · Vapi',
                  },
                  {
                    label: 'Core Stack',
                    title: 'Python · Django · React',
                    sub: 'AWS Cloud · PostgreSQL · Docker',
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0.9, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.06,
                      ease: 'easeOut',
                    }}
                    className="rounded-2xl bg-[#F6F1E7] text-[#232B27] p-5 shadow-md"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#5E1726] font-bold block mb-1">
                      {card.label}
                    </span>
                    <p className="text-base font-bold text-[#232B27]">
                      {card.title}
                    </p>
                    <p className="text-xs text-[#35423C] font-medium mt-1">
                      {card.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 3: VERIFIED CAREER TIMELINE & EDUCATION (Warm Cream Beige #F6F1E7) */}
        <section
          id="journey"
          className="flow-art-section relative overflow-hidden"
          style={{
            backgroundColor: '#F6F1E7',
            color: '#232B27',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14">
            {/* Verified Career Timeline */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#5E1726] font-bold block mb-2">
                    Chapter 02 · Professional Journey
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#232B27]">
                    Career Experience &amp; Education
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#35423C] font-semibold uppercase tracking-[0.2em]">
                  Verified Resume Record · Hyderabad, Telangana
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CAREER_TIMELINE.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0.9, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.015 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="group relative rounded-2xl border border-[#687A70]/40 bg-[#E6ECE8] hover:border-[#5E1726] transition-colors duration-300 p-6 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726]">
                          0{index + 1}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-[0.12em] ${
                            role.current
                              ? 'bg-[#5E1726] text-[#F6F1E7]'
                              : 'bg-[#FAF7F2] text-[#232B27] border border-[#687A70]/40'
                          }`}
                        >
                          {role.period}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-[#232B27] mb-1">
                        {role.company}
                      </h4>
                      <p className="text-sm font-bold text-[#5E1726] mb-4">
                        {role.role}
                      </p>

                      <ul className="space-y-2 text-xs md:text-sm text-[#232B27] leading-relaxed mb-6">
                        {role.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#5E1726] mt-0.5 font-bold">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#687A70]/30">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#687A70]/35 text-[10.5px] font-mono font-semibold text-[#232B27]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Verified Education Strip */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {EDUCATION_HISTORY.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0.9, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className="rounded-xl border border-[#687A70]/40 hover:border-[#5E1726] bg-[#EFE8DA] px-5 py-4 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#5E1726] block mb-1">
                        Education · {edu.completion}
                      </span>
                      <h5 className="text-sm font-bold text-[#232B27]">
                        {edu.degree}
                      </h5>
                    </div>
                    <p className="text-xs text-[#35423C] font-medium mt-1.5">
                      {edu.institution}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 4: "BUILT DIFFERENT." 3D INTERACTIVE ROBOT SKILL STAGE (Muted Sage Grey #DCE3DF) */}
        <section
          id="skills"
          className="w-full min-h-screen bg-[#DCE3DF] relative overflow-hidden flex items-center border-y border-[#84968B]/40"
        >
          <div className="flex flex-col md:flex-row w-full min-h-screen">
            {/* Left Column: Built Different Editorial Copy + Live Hand-Projected Skill Matrix */}
            <motion.div
              initial={{ opacity: 0.9, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 p-6 sm:p-8 md:p-14 lg:p-16 relative z-10 flex flex-col justify-center"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-[#5E1726] font-bold mb-3 font-mono">
                Interactive 3D · Full Stack Python, Gen AI &amp; Agentic AI
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#232B27] leading-tight tracking-tight">
                Built Different.
              </h2>
              <p className="mt-3.5 text-[#35423C] max-w-lg text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Watch the cybernetic AI core conjure and orbit my core
                engineering skills right in its hands — or click any skill badge
                or its palms to cycle through{' '}
                <span className="text-[#5E1726] font-bold underline decoration-[#5E1726] underline-offset-4">
                  Python, Django, React, AWS Cloud, Generative AI, and Agentic AI
                  workflows
                </span>
                .
              </p>

              {/* Compact Interactive Skill Badges Grid synced with the Robot's Hands */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg">
                {ROBOT_HAND_SKILLS.map((sk, idx) => {
                  const IconComp =
                    skillDomainIcons[idx % skillDomainIcons.length] ||
                    Layers;
                  const isActive = idx === activeRobotSkillIdx;
                  return (
                    <button
                      type="button"
                      key={sk.id}
                      onClick={() => handleSelectRobotSkill(idx)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
                        isActive
                          ? 'bg-[#5E1726] border-[#5E1726] text-[#F6F1E7] scale-[1.02] shadow-md'
                          : 'bg-[#FAF7F2]/90 border-[#687A70]/45 hover:border-[#5E1726]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#F6F1E7] text-[#5E1726]'
                            : 'bg-[#5E1726] text-[#F6F1E7]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`block text-[10px] font-mono font-extrabold truncate ${
                            isActive ? 'text-[#F6F1E7]' : 'text-[#232B27]'
                          }`}
                        >
                          {sk.shortLabel}
                        </span>
                        <span
                          className={`block text-[9px] font-mono font-semibold truncate ${
                            isActive ? 'text-[#EFE8DA]' : 'text-[#5E1726]'
                          }`}
                        >
                          {sk.badgeSub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="#showcase"
                  className="px-6 py-3 rounded-full bg-[#5E1726] text-[#F6F1E7] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#751E31] transition-colors shadow-sm"
                >
                  Explore My Work
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onOpenResume}
                  className="px-6 py-3 rounded-full bg-[#FAF7F2] border border-[#687A70]/50 text-[#232B27] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:border-[#5E1726] transition-colors cursor-pointer"
                >
                  Download Resume
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={TARUN_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-[#687A70]/60 text-[#232B27] text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-[#FAF7F2] transition-colors"
                >
                  View GitHub ↗
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D WebGL Stage with Hand-Held Skill Hologram */}
            <div className="flex-1 relative min-h-[460px] md:min-h-screen">
              <CyberneticBotCanvas
                activeSkillIdx={activeRobotSkillIdx}
                onSelectSkill={handleSelectRobotSkill}
                conjureTriggerRef={conjureTriggerRef}
              />
            </div>
          </div>
        </section>

        {/* CHAPTER 03 — HOW I WORK + TECHNOLOGY UNIVERSE (Muted Sage Grey #DCE3DF) */}
        <section
          className="flow-art-section relative overflow-hidden"
          style={{
            backgroundColor: '#DCE3DF',
            color: '#232B27',
            minHeight: '100vh',
            height: 'auto',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div className="flow-art-text w-full max-w-6xl mx-auto px-6 md:px-14">
            <div className="flow-art-label text-[#5E1726]">
              <span className="flow-art-num">03</span>
              <span className="flow-art-Title">HOW I WORK</span>
            </div>
            <h2 className="flow-art-heading text-[#232B27]">THINK. BUILD. SHIP.</h2>

            {/* Interactive Technology Universe Matrix */}
            <div className="mt-12 pt-10 border-t border-[#687A70]/40">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#5E1726] block mb-2">
                    Chapter 04 · Technology Universe
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#232B27]">
                    Resume-Aligned Engineering Skills
                  </h3>
                  <p className="mt-2 text-sm text-[#35423C] max-w-xl leading-relaxed">
                    Explore {SKILL_CATEGORIES.length} areas and {SKILL_CATEGORIES.reduce((total, category) => total + category.skills.length, 0)} skills from my current resume, including GenAI, multi-agent frameworks, AWS, and full-stack engineering.
                  </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveSkillCategory('all')}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeSkillCategory === 'all'
                        ? 'bg-[#5E1726] text-[#F6F1E7] scale-105 shadow-xs'
                        : 'bg-[#FAF7F2] text-[#232B27] border border-[#687A70]/40 hover:border-[#5E1726]'
                    }`}
                  >
                    All Domains
                  </button>
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveSkillCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeSkillCategory === cat.id
                          ? 'bg-[#5E1726] text-[#F6F1E7] scale-105 shadow-xs'
                          : 'bg-[#FAF7F2] text-[#232B27] border border-[#687A70]/40 hover:border-[#5E1726]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCategories.map((cat) => (
                    <motion.div
                      layout
                      key={cat.id}
                      initial={{ opacity: 0.85, scale: 0.95, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="rounded-2xl border border-[#687A70]/45 hover:border-[#5E1726] bg-[#FAF7F2] p-6 flex flex-col justify-between shadow-xs transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="h-3 w-3 rounded-full bg-[#5E1726]" />
                          <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-[#5E1726]">
                            {cat.skills.length} Technologies
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#232B27] mb-1">
                          {cat.title}
                        </h4>
                        <p className="text-xs text-[#35423C] mb-5 font-medium">
                          {cat.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            key={skill.name}
                            title={skill.purpose ? `${skill.name} — ${skill.purpose}` : skill.name}
                            className="group relative px-3 py-1.5 rounded-lg bg-[#EFE8DA] border border-[#687A70]/35 hover:border-[#5E1726] text-xs font-mono font-bold text-[#232B27] flex items-center gap-1.5 transition-colors cursor-help"
                          >
                            <span>{skill.name}</span>
                            {skill.contextNote && (
                              <span
                                title={skill.contextNote}
                                className="text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#5E1726] text-[#F6F1E7] font-bold"
                              >
                                {skill.contextNote}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Flagship InsureSphere AI Tech Stack & Core Engineering Directory */}
              <div className="mt-8 rounded-2xl border border-[#687A70]/40 bg-[#FAF7F2] p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#687A70]/30 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#5E1726]">
                      Flagship Production Architecture
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#232B27]">
                      InsureSphere AI — Tech Stack &amp; Engineering Foundation
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#EFE8DA] border border-[#687A70]/40 text-[#232B27]">
                    {INSURESPHERE_TECH_STACK.length} Production Technologies
                  </span>
                </div>

                {/* Core Engineering Stack Callout */}
                <div className="p-3.5 rounded-xl bg-[#EFE8DA] border border-[#5E1726]/30 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5E1726] font-bold text-xs font-mono uppercase tracking-wider">
                      ✦ Core Engineering Stack:
                    </span>
                    <span className="text-xs font-mono font-bold text-[#232B27]">
                      React + Python + Django REST Framework + PostgreSQL + AWS Cloud + JWT Authentication
                    </span>
                  </div>
                  <p className="text-xs text-[#35423C] font-medium leading-relaxed">
                    Primary production stack powering authenticated role-based endpoints, policy underwriting state machines, AWS Cloud infrastructure, and relational PostgreSQL persistence.
                  </p>
                </div>

                {/* 12 Core Production Technologies Grid */}
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#5E1726]">
                    Production Application Tech Stack:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {ENTERPRISE_SKILLS_TABLE.filter(
                      (item) =>
                        item.technology !== 'Gemini / GenAI' &&
                        item.technology !== 'RAG'
                    ).map((item) => (
                      <div
                        key={item.technology}
                        className="p-3 rounded-xl bg-[#EFE8DA] border border-[#687A70]/35 hover:border-[#5E1726] transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-[#232B27]">
                            {item.technology}
                          </span>
                          <span className="text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#5E1726] border border-[#687A70]/30">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#35423C] font-medium leading-snug">
                          {item.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Under Integration Verification */}
                <div className="p-4 rounded-xl bg-[#EFE8DA]/80 border border-amber-600/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <span>⚠️</span>
                      <span>Features Under Integration Verification</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                      Integration Verification Ongoing
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {AI_VERIFICATION_FEATURES.map((item) => (
                      <div
                        key={item.name}
                        className="p-2.5 rounded-lg bg-[#FAF7F2] border border-amber-400/40 space-y-1"
                      >
                        <div className="font-mono font-bold text-[#232B27]">
                          {item.name}
                        </div>
                        <p className="text-[#35423C] text-[11.5px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
