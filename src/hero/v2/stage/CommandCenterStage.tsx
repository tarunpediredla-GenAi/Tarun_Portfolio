import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  CHAPTER_KEYFRAMES,
  stageStore,
} from '../beat';
import { portfolioContent } from '../../../data/content';

// Pre-allocated math helpers at module scope to prevent GC in the render loop
const _camTargetPos = new THREE.Vector3();
const _camLookTarget = new THREE.Vector3();
const _currentLookTarget = new THREE.Vector3(-0.85, 0.15, 0);
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

function detectSoftwareWebGL(): { isSoftwareGl: boolean; supported: boolean } {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return { isSoftwareGl: true, supported: false };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { isSoftwareGl, supported: true };
  } catch {
    return { isSoftwareGl: true, supported: false };
  }
}

function createCodePanelTexture(
  renderer: THREE.WebGLRenderer,
  title: string,
  lines: string[],
  accentHex: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(6, 12, 26, 0.92)';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 500, 244);

    ctx.fillStyle = accentHex;
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(title, 26, 46);

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(24, 64);
    ctx.lineTo(488, 64);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '18px "JetBrains Mono", monospace';
    lines.forEach((line, idx) => {
      ctx.fillText(line, 26, 102 + idx * 34);
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.needsUpdate = true;
  return texture;
}

function createRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.42)');
    grad.addColorStop(0.45, 'rgba(2, 6, 23, 0.65)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const CommandCenterStage: React.FC = () => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const { isSoftwareGl, supported } = detectSoftwareWebGL();
    if (!supported) {
      setWebglAvailable(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglAvailable(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth || window.innerWidth, mount.clientHeight || window.innerHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x050811, 1);

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // WebGL context loss/restore listeners
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglAvailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050811);
    scene.fog = new THREE.FogExp2(0x050811, 0.046);

    // Studio PBR Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      (mount.clientWidth || window.innerWidth) / (mount.clientHeight || window.innerHeight),
      0.1,
      120
    );
    camera.position.set(0, 0.55, 6.6);

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x050811, 0.85);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    keyLight.position.set(4.5, 6.5, 5.0);
    keyLight.castShadow = !isSoftwareGl;
    const d = 6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    fillLight.position.set(-5.5, 3.0, 4.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.35);
    rimLight.position.set(0.0, 4.5, -5.5);
    scene.add(rimLight);

    // Disposables tracking
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [envTarget.texture];

    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    // PBR Materials Library (varied roughness >= 0.25 & metalness across adjacent parts)
    const obsidianArmorMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.92,
        roughness: 0.16,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        anisotropy: 0.75,
      })
    );

    const brushedTitaniumMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.44,
      })
    );

    const matteChassisMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.35,
        roughness: 0.72,
      })
    );

    const cyanHologramMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 1.6,
        metalness: 0.2,
        roughness: 0.2,
      })
    );

    const amberCoreMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 1.8,
        metalness: 0.3,
        roughness: 0.25,
      })
    );

    const crystalShellMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        metalness: 0.1,
        roughness: 0.1,
        transmission: isSoftwareGl ? 0 : 0.88,
        transparent: true,
        opacity: isSoftwareGl ? 0.32 : 0.95,
        ior: 1.6,
        thickness: 1.2,
        clearcoat: 1.0,
        depthWrite: false,
      })
    );

    // Root Stage Group (pivoted at ground Y = -1.35)
    const stageRoot = new THREE.Group();
    stageRoot.position.set(1.55, -0.15, 0);
    scene.add(stageRoot);

    // Contact Shadow Grounding Plane + Command Grid at Y = -1.55
    const shadowTex = createRadialShadowTexture();
    textures.push(shadowTex);
    const contactShadowPlane = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(5.6, 5.6)),
      trackMat(
        new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          depthWrite: false,
          opacity: 0.85,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1,
        })
      )
    );
    contactShadowPlane.rotation.x = -Math.PI / 2;
    contactShadowPlane.position.y = -1.52;
    stageRoot.add(contactShadowPlane);

    const floorPedestal = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(1.65, 1.95, 0.18, 48)),
      obsidianArmorMat
    );
    floorPedestal.position.y = -1.43;
    floorPedestal.receiveShadow = true;
    stageRoot.add(floorPedestal);

    const pedestalRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(1.72, 0.022, 16, 64)),
      cyanHologramMat
    );
    pedestalRing.rotation.x = Math.PI / 2;
    pedestalRing.position.y = -1.34;
    stageRoot.add(pedestalRing);

    // =========================================================================
    // COMPOSITE 10-PART HERO SUBJECT: Cybernetic Cheetah & Holographic AI Core
    // =========================================================================
    const heroSculptureGroup = new THREE.Group();
    stageRoot.add(heroSculptureGroup);

    // Sub-group A: Cybernetic Cheetah Bust (10 articulated geometric parts)
    const cheetahGroup = new THREE.Group();
    heroSculptureGroup.add(cheetahGroup);

    // Part 1: Thoracic Armored Chest Base
    const chestGeo = trackGeo(new THREE.CylinderGeometry(0.68, 0.92, 0.88, 8));
    const chestMesh = new THREE.Mesh(chestGeo, obsidianArmorMat);
    chestMesh.position.set(0, -0.82, 0);
    chestMesh.castShadow = true;
    cheetahGroup.add(chestMesh);

    // Part 2: Sculpted Shoulder Blades (Left & Right Beveled Extrusions)
    const shoulderShape = new THREE.Shape();
    shoulderShape.moveTo(0, 0);
    shoulderShape.lineTo(0.45, 0.18);
    shoulderShape.lineTo(0.36, 0.68);
    shoulderShape.lineTo(-0.12, 0.52);
    shoulderShape.closePath();
    const shoulderGeo = trackGeo(
      new THREE.ExtrudeGeometry(shoulderShape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2,
      })
    );
    shoulderGeo.center();

    const leftShoulder = new THREE.Mesh(shoulderGeo, brushedTitaniumMat);
    leftShoulder.position.set(-0.62, -0.66, 0.08);
    leftShoulder.rotation.set(0.15, 0.4, -0.25);
    cheetahGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, brushedTitaniumMat);
    rightShoulder.position.set(0.62, -0.66, 0.08);
    rightShoulder.rotation.set(0.15, -0.4, 0.25);
    cheetahGroup.add(rightShoulder);

    // Part 3: Glowing Amber Reactor Core in Chest
    const chestReactor = new THREE.Mesh(
      trackGeo(new THREE.OctahedronGeometry(0.24, 1)),
      amberCoreMat
    );
    chestReactor.position.set(0, -0.68, 0.58);
    cheetahGroup.add(chestReactor);

    // Part 4: Articulated Cervical Neck Column
    const neckColumn = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.38, 0.52, 0.72, 6)),
      matteChassisMat
    );
    neckColumn.position.set(0, -0.15, -0.05);
    neckColumn.rotation.x = 0.22;
    cheetahGroup.add(neckColumn);

    // Part 5: Cranial Skull Dome (Faceted Low-Poly Predator Head)
    const cranium = new THREE.Mesh(
      trackGeo(new THREE.DodecahedronGeometry(0.56, 0)),
      obsidianArmorMat
    );
    cranium.scale.set(0.95, 0.82, 1.18);
    cranium.position.set(0, 0.38, 0.14);
    cranium.castShadow = true;
    cheetahGroup.add(cranium);

    // Part 6: Angular Predator Muzzle / Snout Bridge
    const muzzle = new THREE.Mesh(
      trackGeo(new THREE.ConeGeometry(0.36, 0.68, 6)),
      brushedTitaniumMat
    );
    muzzle.rotation.x = Math.PI / 2 + 0.18;
    muzzle.position.set(0, 0.28, 0.66);
    cheetahGroup.add(muzzle);

    // Part 7: Lower Mandible Jaw Plate
    const jaw = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.38, 0.14, 0.54)),
      matteChassisMat
    );
    jaw.position.set(0, 0.08, 0.52);
    jaw.rotation.x = 0.14;
    cheetahGroup.add(jaw);

    // Part 8: Holographic Cyan Ocular Visor & Cheetah Tear-Mark Light Strips
    const ocularVisor = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.66, 0.11, 0.28)),
      cyanHologramMat
    );
    ocularVisor.position.set(0, 0.42, 0.54);
    ocularVisor.rotation.x = 0.12;
    cheetahGroup.add(ocularVisor);

    // Signature Cheetah Malar (Tear-Line) Holographic Channels
    const tearStripGeo = trackGeo(new THREE.BoxGeometry(0.045, 0.28, 0.06));
    const leftTear = new THREE.Mesh(tearStripGeo, amberCoreMat);
    leftTear.position.set(-0.24, 0.24, 0.68);
    leftTear.rotation.z = 0.18;
    cheetahGroup.add(leftTear);

    const rightTear = new THREE.Mesh(tearStripGeo, amberCoreMat);
    rightTear.position.set(0.24, 0.24, 0.68);
    rightTear.rotation.z = -0.18;
    cheetahGroup.add(rightTear);

    // Part 9: Swept Cybernetic Predator Ears
    const earGeo = trackGeo(new THREE.ConeGeometry(0.16, 0.42, 4));
    const leftEar = new THREE.Mesh(earGeo, obsidianArmorMat);
    leftEar.position.set(-0.36, 0.78, -0.08);
    leftEar.rotation.set(-0.45, 0, 0.28);
    cheetahGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, obsidianArmorMat);
    rightEar.position.set(0.36, 0.78, -0.08);
    rightEar.rotation.set(-0.45, 0, -0.28);
    cheetahGroup.add(rightEar);

    // Part 10: Dorsal Neural Spine Fin Tubes
    const spineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.55, -0.35),
      new THREE.Vector3(0, 0.1, -0.52),
      new THREE.Vector3(0, -0.45, -0.45),
      new THREE.Vector3(0, -0.95, -0.32),
    ]);
    const spineTube = new THREE.Mesh(
      trackGeo(new THREE.TubeGeometry(spineCurve, 24, 0.045, 8, false)),
      cyanHologramMat
    );
    cheetahGroup.add(spineTube);

    // Encapsulating Translucent Holographic Shield Sphere (outer glass layer)
    const outerCrystalCore = new THREE.Mesh(
      trackGeo(new THREE.IcosahedronGeometry(1.18, 1)),
      crystalShellMat
    );
    outerCrystalCore.position.set(0, -0.1, 0.08);
    outerCrystalCore.renderOrder = 2;
    heroSculptureGroup.add(outerCrystalCore);

    const wireframeCage = new THREE.LineSegments(
      trackGeo(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.22, 1))),
      trackMat(
        new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.35,
        })
      )
    );
    wireframeCage.position.copy(outerCrystalCore.position);
    heroSculptureGroup.add(wireframeCage);

    // Gyroscopic Gimbal Rings (Active in both Cheetah & AI Core modes)
    const ringInner = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(1.52, 0.018, 16, 96)),
      cyanHologramMat
    );
    ringInner.position.set(0, -0.1, 0);
    heroSculptureGroup.add(ringInner);

    const ringMiddle = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(1.88, 0.015, 16, 96)),
      amberCoreMat
    );
    ringMiddle.position.set(0, -0.1, 0);
    ringMiddle.rotation.x = Math.PI / 3;
    heroSculptureGroup.add(ringMiddle);

    const ringOuter = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(2.25, 0.014, 16, 110)),
      brushedTitaniumMat
    );
    ringOuter.position.set(0, -0.1, 0);
    ringOuter.rotation.y = Math.PI / 4;
    heroSculptureGroup.add(ringOuter);

    // =========================================================================
    // FLOATING CODE FRAGMENT MONOLITHS (Procedural CanvasTextures)
    // =========================================================================
    const codePanelsGroup = new THREE.Group();
    stageRoot.add(codePanelsGroup);

    const codeCardConfigs = [
      {
        title: 'insuresphere_treaty.py',
        lines: [
          'class QuotaShareTreaty(models.Model):',
          '  net_loss = max(0, gross - deductible)',
          '  reinsurer_share = net_loss * 0.40',
        ],
        accent: '#38bdf8',
        pos: [-2.15, 0.92, -0.6] as [number, number, number],
        rotY: 0.42,
      },
      {
        title: 'django_commerce.py',
        lines: [
          'class OrderVerifyView(APIView):',
          '  status = cashfree.verify(order_id)',
          '  grant_course_entitlement(user)',
        ],
        accent: '#f59e0b',
        pos: [2.25, 0.65, -0.85] as [number, number, number],
        rotY: -0.48,
      },
      {
        title: 'alex_interviewer.ts',
        lines: [
          'const response = await ai.models',
          '  .generateContent({ model,',
          '    contents: transcript });',
        ],
        accent: '#06b6d4',
        pos: [-1.85, -0.68, 0.95] as [number, number, number],
        rotY: 0.35,
      },
      {
        title: 'agent_workflow.py',
        lines: [
          'async def run_agent(task):',
          '  plan = await gemini.plan(task)',
          '  return await vapi.dispatch(plan)',
        ],
        accent: '#a855f7',
        pos: [1.95, -0.72, 0.9] as [number, number, number],
        rotY: -0.38,
      },
    ];

    const codePanelMeshes: THREE.Mesh[] = [];
    const panelGeo = trackGeo(new THREE.PlaneGeometry(1.38, 0.69));

    codeCardConfigs.forEach((cfg) => {
      const tex = createCodePanelTexture(renderer, cfg.title, cfg.lines, cfg.accent);
      textures.push(tex);
      const mat = trackMat(
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.88,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      const mesh = new THREE.Mesh(panelGeo, mat);
      mesh.position.set(...cfg.pos);
      mesh.rotation.y = cfg.rotY;
      codePanelsGroup.add(mesh);
      codePanelMeshes.push(mesh);
    });

    // =========================================================================
    // INSTANCED TECHNOLOGY CONSTELLATION NODES & NEURAL CONNECTIONS
    // =========================================================================
    const skillsList = portfolioContent.skills.items;
    const nodeCount = skillsList.length;
    const nodeGeo = trackGeo(new THREE.OctahedronGeometry(0.11, 1));
    const nodeMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x0891b2,
        emissiveIntensity: 0.75,
        metalness: 0.5,
        roughness: 0.25,
      })
    );
    const skillNodesMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    skillNodesMesh.frustumCulled = false;
    stageRoot.add(skillNodesMesh);

    skillsList.forEach((skill, i) => {
      _color.set(skill.accentColor);
      skillNodesMesh.setColorAt(i, _color);
    });
    if (skillNodesMesh.instanceColor) {
      skillNodesMesh.instanceColor.needsUpdate = true;
    }

    // Neural Connection Lines between Constellation Nodes and Core
    const linePositions = new Float32Array(nodeCount * 2 * 3);
    const lineGeo = trackGeo(new THREE.BufferGeometry());
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const neuralLines = new THREE.LineSegments(
      lineGeo,
      trackMat(
        new THREE.LineBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.22,
        })
      )
    );
    neuralLines.frustumCulled = false;
    stageRoot.add(neuralLines);

    // =========================================================================
    // ILLUMINATED 3D TIMELINE CORRIDOR ARCHES (Chapter 03 Depth Elements)
    // =========================================================================
    const corridorGroup = new THREE.Group();
    corridorGroup.position.set(0, 0, -2.5);
    scene.add(corridorGroup);

    const archGeo = trackGeo(new THREE.TorusGeometry(2.8, 0.016, 12, 64, Math.PI));
    const archMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.18,
      })
    );

    for (let i = 0; i < 4; i++) {
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, -1.2, -i * 2.2);
      corridorGroup.add(arch);
    }

    // =========================================================================
    // ATMOSPHERIC INSTANCED STARFIELD / NEURAL PARTICLES (60 Instanced Nodes)
    // =========================================================================
    const particleCount = 60;
    const particleGeo = trackGeo(new THREE.IcosahedronGeometry(0.028, 0));
    const particleMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55,
      })
    );
    const particlesMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const particleSeeds = Array.from({ length: particleCount }, (_, idx) => ({
      x: ((idx * 37) % 100 - 50) * 0.22,
      y: ((idx * 53) % 100 - 50) * 0.12,
      z: -((idx * 29) % 100) * 0.14 + 2.0,
      speed: 0.25 + (idx % 7) * 0.06,
      scale: 0.65 + (idx % 5) * 0.22,
    }));

    particleSeeds.forEach((p, i) => {
      _dummy.position.set(p.x, p.y, p.z);
      _dummy.scale.setScalar(p.scale);
      _dummy.updateMatrix();
      particlesMesh.setMatrixAt(i, _dummy.matrix);
    });
    particlesMesh.instanceMatrix.needsUpdate = true;
    particlesMesh.computeBoundingSphere();
    scene.add(particlesMesh);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer & Drag-to-Rotate Interaction Handlers
    let pointerStartX = 0;
    let pointerStartY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stageStore.pointerX = nx;
      stageStore.pointerY = ny;

      if (stageStore.isDragging) {
        const dx = e.clientX - pointerStartX;
        const dy = e.clientY - pointerStartY;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        stageStore.userYaw += dx * 0.0065;
        stageStore.userPitch = THREE.MathUtils.clamp(stageStore.userPitch + dy * 0.004, -0.45, 0.45);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest('button, a, input, textarea, select')) return;
      stageStore.isDragging = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    };

    const onPointerUp = () => {
      stageStore.isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Software WebGL Fence-Synchronized Loop Pacing
    let frameId = 0;
    let isUnmounted = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isUnmounted) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (isUnmounted) return;

      // Pause rendering when browser tab is hidden
      if (document.hidden) {
        frameId = window.setTimeout(tick, 250);
        return;
      }

      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Determine active keyframe interpolation from scroll or manual preset
      const chapterFloat =
        stageStore.manualChapterOverride !== null
          ? stageStore.manualChapterOverride
          : stageStore.chapterFloat;

      const idx0 = Math.max(0, Math.min(CHAPTER_KEYFRAMES.length - 1, Math.floor(chapterFloat)));
      const idx1 = Math.max(0, Math.min(CHAPTER_KEYFRAMES.length - 1, idx0 + 1));
      const alpha = THREE.MathUtils.smoothstep(chapterFloat - idx0, 0, 1);

      const kf0 = CHAPTER_KEYFRAMES[idx0];
      const kf1 = CHAPTER_KEYFRAMES[idx1];

      // Responsive offset reduction on narrower screens so 3D core stays centered
      const isCompact = window.innerWidth < 1024;
      const responsiveOffsetScale = isCompact ? 0.18 : 1.0;

      // Interpolate Camera Position + Subtle Mouse Parallax
      const targetCamX =
        THREE.MathUtils.lerp(kf0.pos[0], kf1.pos[0], alpha) * responsiveOffsetScale +
        stageStore.pointerX * 0.32;
      const targetCamY =
        THREE.MathUtils.lerp(kf0.pos[1], kf1.pos[1], alpha) + stageStore.pointerY * 0.22;
      const targetCamZ = THREE.MathUtils.lerp(kf0.pos[2], kf1.pos[2], alpha);

      _camTargetPos.set(targetCamX, targetCamY, targetCamZ);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTargetPos.x, 3.8, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTargetPos.y, 3.8, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTargetPos.z, 3.8, dt);

      // Interpolate LookAt Target
      const lookX =
        THREE.MathUtils.lerp(kf0.target[0], kf1.target[0], alpha) * responsiveOffsetScale;
      const lookY = THREE.MathUtils.lerp(kf0.target[1], kf1.target[1], alpha);
      const lookZ = THREE.MathUtils.lerp(kf0.target[2], kf1.target[2], alpha);
      _camLookTarget.set(lookX, lookY, lookZ);

      _currentLookTarget.x = THREE.MathUtils.damp(_currentLookTarget.x, _camLookTarget.x, 4.2, dt);
      _currentLookTarget.y = THREE.MathUtils.damp(_currentLookTarget.y, _camLookTarget.y, 4.2, dt);
      _currentLookTarget.z = THREE.MathUtils.damp(_currentLookTarget.z, _camLookTarget.z, 4.2, dt);
      camera.lookAt(_currentLookTarget);

      // Stage Root Offset & Scale
      const desiredStageX =
        THREE.MathUtils.lerp(kf0.stageOffsetX, kf1.stageOffsetX, alpha) * responsiveOffsetScale;
      stageRoot.position.x = THREE.MathUtils.damp(stageRoot.position.x, desiredStageX, 3.5, dt);

      const desiredScale = THREE.MathUtils.lerp(kf0.coreScale, kf1.coreScale, alpha);
      const dampedScale = THREE.MathUtils.damp(heroSculptureGroup.scale.x, desiredScale, 4.0, dt);
      heroSculptureGroup.scale.setScalar(dampedScale);

      // Toggle Cheetah Sculpture vs AI Core prominence smoothly
      const targetCheetahScale = stageStore.visualMode === 'cheetah' ? 1.0 : 0.01;
      const nextCheetahScale = THREE.MathUtils.damp(cheetahGroup.scale.x, targetCheetahScale, 6.0, dt);
      cheetahGroup.scale.setScalar(nextCheetahScale);
      cheetahGroup.visible = nextCheetahScale > 0.03;

      // Rotate Hero Sculpture (Scroll + Idle + User Drag Turntable)
      const desiredRotY =
        THREE.MathUtils.lerp(kf0.coreRotationY, kf1.coreRotationY, alpha) +
        stageStore.userYaw +
        elapsed * 0.14 * stageStore.orbitSpeed;
      heroSculptureGroup.rotation.y = THREE.MathUtils.damp(
        heroSculptureGroup.rotation.y,
        desiredRotY,
        4.5,
        dt
      );
      heroSculptureGroup.rotation.x = THREE.MathUtils.damp(
        heroSculptureGroup.rotation.x,
        stageStore.userPitch + stageStore.pointerY * 0.1,
        4.5,
        dt
      );

      // Gimbal Rings Counter-Rotation
      const speed = stageStore.orbitSpeed;
      ringInner.rotation.z = elapsed * 0.42 * speed;
      ringInner.rotation.x = Math.sin(elapsed * 0.5) * 0.35;
      ringMiddle.rotation.y = -elapsed * 0.32 * speed;
      ringOuter.rotation.z = elapsed * 0.18 * speed;
      outerCrystalCore.rotation.y = -elapsed * 0.22 * speed;
      wireframeCage.rotation.y = outerCrystalCore.rotation.y;

      // Code Fragment Monoliths Gentle Levitation
      codePanelMeshes.forEach((mesh, idx) => {
        const cfg = codeCardConfigs[idx];
        mesh.position.y = cfg.pos[1] + Math.sin(elapsed * 1.3 + idx * 2.1) * 0.09;
      });

      // Update Instanced Technology Constellation Nodes & Neural Lines
      const spread = THREE.MathUtils.lerp(kf0.constellationSpread, kf1.constellationSpread, alpha);
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;

      skillsList.forEach((skill, i) => {
        const isHighlighted = stageStore.highlightedSkillId === skill.id;
        const angle = skill.orbitAngle + elapsed * (0.18 / (skill.orbitRadius * 0.45)) * speed;
        const radius = (skill.orbitRadius * 0.58) * spread;
        const nx = Math.cos(angle) * radius;
        const nz = Math.sin(angle) * radius;
        const ny = Math.sin(angle * 2.0 + i) * 0.48;

        _dummy.position.set(nx, ny, nz);
        _dummy.rotation.set(elapsed * 0.6, angle, 0);
        _dummy.scale.setScalar(isHighlighted ? 2.15 : 1.0);
        _dummy.updateMatrix();
        skillNodesMesh.setMatrixAt(i, _dummy.matrix);

        // Update neural line from center (0, -0.1, 0) to node (nx, ny, nz)
        posAttr.setXYZ(i * 2, 0, -0.1, 0);
        posAttr.setXYZ(i * 2 + 1, nx, ny, nz);
      });
      skillNodesMesh.instanceMatrix.needsUpdate = true;
      posAttr.needsUpdate = true;

      // Timeline Corridor Illumination
      const corridorGlow = THREE.MathUtils.lerp(kf0.corridorGlow, kf1.corridorGlow, alpha);
      archMat.opacity = 0.12 + corridorGlow * 0.28;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isUnmounted = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  if (!webglAvailable) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden bg-[#050811]"
      >
        <img
          src={portfolioContent.profile.fallbackBackdrop}
          alt="Futuristic AI Developer Command Center Backdrop"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/70 to-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      aria-label="Interactive 3D AI Developer Command Center Scene"
      className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-auto"
    />
  );
};
