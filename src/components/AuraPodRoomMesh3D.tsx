import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface AuraPodRoomMesh3DProps {
  auraPodActive?: boolean;
  isFolded?: boolean;
  onToggleFold?: () => void;
  scale?: number;
  interactive?: boolean;
  highlightPart?: 'dish' | 'feed' | 'lna' | 'chassis' | null;
  className?: string;
  showBadge?: boolean;
}

export const AuraPodRoomMesh3D: React.FC<AuraPodRoomMesh3DProps> = ({
  auraPodActive = true,
  isFolded = false,
  onToggleFold,
  scale = 0.85,
  interactive = true,
  highlightPart = null,
  className = 'w-full h-full min-h-[420px]',
  showBadge = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    auraPodActive,
    isFolded,
    highlightPart,
    scale,
  });

  // Track state in ref for animation loop
  useEffect(() => {
    stateRef.current.auraPodActive = auraPodActive;
    stateRef.current.isFolded = isFolded;
    stateRef.current.highlightPart = highlightPart;
    stateRef.current.scale = scale;
  }, [auraPodActive, isFolded, highlightPart, scale]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 6.0);
    camera.lookAt(0, 0.3, 0);

    // 3. Renderer setup - Professional Studio Color Science
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32;
    container.appendChild(renderer.domElement);

    // 4. Professional High-CRI Studio Lighting Rig (Multi-Point Photographic Setup)
    // A. Natural Atmospheric Sky/Ground Irradiance Gradient (eliminates milky ambient wash)
    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x080d1a, 0.7);
    scene.add(hemiLight);

    // B. Primary Studio Key Softbox (5600K daylight key with soft physical shadow casting)
    const keyLight = new THREE.DirectionalLight(0xfffbf5, 3.6);
    keyLight.position.set(4.5, 8.0, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -3.5;
    keyLight.shadow.camera.right = 3.5;
    keyLight.shadow.camera.top = 3.5;
    keyLight.shadow.camera.bottom = -3.5;
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.radius = 2.4;
    scene.add(keyLight);

    // C. Top Overhead Specular for Dish Rim & Focal Horn (Direct overhead CNC specular strip)
    const topSpecular = new THREE.DirectionalLight(0xffffff, 2.2);
    topSpecular.position.set(-0.5, 9.0, 1.8);
    scene.add(topSpecular);

    // D. Lateral Soft Fill Softbox (Maintains dark shadow gradients without flattening)
    const fillLight = new THREE.DirectionalLight(0x64748b, 0.95);
    fillLight.position.set(-5.0, 2.5, 3.5);
    scene.add(fillLight);

    // E. Razor-Sharp Cool Silhouette Rim Kicker (Precision edge separation against dark backgrounds)
    const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.4);
    rimLight.position.set(-4.2, 4.0, -4.5);
    scene.add(rimLight);

    // F. Secondary Warm Edge Accent (Back-right contour separation)
    const rimAccent = new THREE.DirectionalLight(0xf8fafc, 1.2);
    rimAccent.position.set(4.5, 3.2, -3.5);
    scene.add(rimAccent);

    // G. Studio Stage Ground Bounce (Upward reflection from matte floor)
    const floorBounce = new THREE.DirectionalLight(0x1e293b, 0.55);
    floorBounce.position.set(0, -6, 1.5);
    scene.add(floorBounce);

    // H. Integrated Physical LED Status Indicator (Calibrated optical intensity)
    const beaconLight = new THREE.PointLight(0x38bdf8, 0.8, 3.5, 1.6);
    beaconLight.position.set(0, 0.4, 0);
    scene.add(beaconLight);

    // 5. Build AuraPod Room Edition 3D Mesh Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Physical Contact Shadow Ground Receiver Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(8, 8);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.3;
    shadowPlane.receiveShadow = true;
    productGroup.add(shadowPlane);

    // -------------------------------------------------------------
    // A. MESH EXTENDER CYLINDRICAL BASE POD
    // -------------------------------------------------------------
    // Base body (Matte anodized space-titanium cylinder)
    const podBodyGeo = new THREE.CylinderGeometry(1.05, 1.15, 1.25, 48);
    const podBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0e1524,
      roughness: 0.28,
      metalness: 0.88,
    });
    const podBody = new THREE.Mesh(podBodyGeo, podBodyMat);
    podBody.position.y = -0.6;
    podBody.castShadow = true;
    podBody.receiveShadow = true;
    productGroup.add(podBody);

    // Pod base chamfer ring (Machined aluminum 6061 foot)
    const footGeo = new THREE.CylinderGeometry(1.2, 1.22, 0.15, 48);
    const footMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.16,
      metalness: 0.94,
    });
    const podFoot = new THREE.Mesh(footGeo, footMat);
    podFoot.position.y = -1.22;
    podFoot.castShadow = true;
    podFoot.receiveShadow = true;
    productGroup.add(podFoot);

    // Top Halo Bezel Ring (Machined CNC collar)
    const topCollarGeo = new THREE.TorusGeometry(1.02, 0.05, 16, 48);
    const topCollarMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.16,
      metalness: 0.94,
    });
    const topCollar = new THREE.Mesh(topCollarGeo, topCollarMat);
    topCollar.rotation.x = Math.PI / 2;
    topCollar.position.y = 0.03;
    topCollar.castShadow = true;
    topCollar.receiveShadow = true;
    productGroup.add(topCollar);

    // Glowing Status Beacon Halo (Emissive LED ring)
    const haloGeo = new THREE.TorusGeometry(0.96, 0.04, 16, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const beaconHalo = new THREE.Mesh(haloGeo, haloMat);
    beaconHalo.rotation.x = Math.PI / 2;
    beaconHalo.position.y = 0.04;
    productGroup.add(beaconHalo);

    // Top concave cap
    const capGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.08, 48);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x080c14,
      roughness: 0.45,
      metalness: 0.7,
    });
    const topCap = new THREE.Mesh(capGeo, capMat);
    topCap.position.y = 0.02;
    topCap.castShadow = true;
    topCap.receiveShadow = true;
    productGroup.add(topCap);

    // Rear USB-C Port Notch
    const usbPortGeo = new THREE.BoxGeometry(0.35, 0.12, 0.15);
    const usbPortMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.8,
    });
    const usbPort = new THREE.Mesh(usbPortGeo, usbPortMat);
    usbPort.position.set(0, -0.9, 1.12);
    productGroup.add(usbPort);

    // -------------------------------------------------------------
    // B. CNC ARTICULATED HINGE ARM ASSEMBLY
    // -------------------------------------------------------------
    const hingeGroup = new THREE.Group();
    hingeGroup.position.set(0, -0.1, -0.85); // Mounted to rear of pod
    productGroup.add(hingeGroup);

    // Base pivot cylinder
    const pivotGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 24);
    const metalHingeMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.16,
      metalness: 0.94,
    });
    const pivot = new THREE.Mesh(pivotGeo, metalHingeMat);
    pivot.rotation.z = Math.PI / 2;
    pivot.castShadow = true;
    pivot.receiveShadow = true;
    hingeGroup.add(pivot);

    // Dual support struts
    const strutGeo = new THREE.BoxGeometry(0.1, 1.35, 0.12);
    const leftStrut = new THREE.Mesh(strutGeo, metalHingeMat);
    leftStrut.position.set(-0.35, 0.65, 0.1);
    leftStrut.castShadow = true;
    leftStrut.receiveShadow = true;
    hingeGroup.add(leftStrut);

    const rightStrut = new THREE.Mesh(strutGeo, metalHingeMat);
    rightStrut.position.set(0.35, 0.65, 0.1);
    rightStrut.castShadow = true;
    rightStrut.receiveShadow = true;
    hingeGroup.add(rightStrut);

    // -------------------------------------------------------------
    // C. PARABOLIC WIREFRAME REFLECTOR DISH ASSEMBLY
    // -------------------------------------------------------------
    const dishAssembly = new THREE.Group();
    dishAssembly.position.set(0, 1.3, 0.1);
    hingeGroup.add(dishAssembly);

    // Mathematical 3D Paraboloid: z = (x^2 + y^2) / (4 * f)
    const dishSegmentsR = 18;
    const dishSegmentsTheta = 36;
    const maxRadius = 1.9;
    const focalDist = 0.65;

    const dishGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];

    for (let rIdx = 0; rIdx <= dishSegmentsR; rIdx++) {
      const r = (rIdx / dishSegmentsR) * maxRadius;
      const z = (r * r) / (4 * focalDist);

      for (let tIdx = 0; tIdx < dishSegmentsTheta; tIdx++) {
        const theta = (tIdx / dishSegmentsTheta) * Math.PI * 2;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        positions.push(x, y, -z);
      }
    }

    for (let rIdx = 0; rIdx < dishSegmentsR; rIdx++) {
      for (let tIdx = 0; tIdx < dishSegmentsTheta; tIdx++) {
        const nextT = (tIdx + 1) % dishSegmentsTheta;
        const p1 = rIdx * dishSegmentsTheta + tIdx;
        const p2 = rIdx * dishSegmentsTheta + nextT;
        const p3 = (rIdx + 1) * dishSegmentsTheta + tIdx;
        const p4 = (rIdx + 1) * dishSegmentsTheta + nextT;

        indices.push(p1, p3, p2);
        indices.push(p2, p3, p4);
      }
    }

    dishGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    dishGeometry.setIndex(indices);
    dishGeometry.computeVertexNormals();

    // Solid semi-transparent back plate
    const dishBackMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.28,
      metalness: 0.9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const dishMesh = new THREE.Mesh(dishGeometry, dishBackMat);
    dishMesh.castShadow = true;
    dishMesh.receiveShadow = true;
    dishAssembly.add(dishMesh);

    // Glowing Metamaterial Wireframe Grid overlay (the parabolic mesh)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireframeDish = new THREE.Mesh(dishGeometry, wireframeMat);
    dishAssembly.add(wireframeDish);

    // Outer rim ring
    const rimGeo = new THREE.TorusGeometry(maxRadius, 0.045, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.92,
      roughness: 0.18,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.z = -((maxRadius * maxRadius) / (4 * focalDist));
    rimMesh.castShadow = true;
    rimMesh.receiveShadow = true;
    dishAssembly.add(rimMesh);

    // -------------------------------------------------------------
    // D. FOCAL FEED RECEIVER NODE (Positioned at focal distance f)
    // -------------------------------------------------------------
    const focalArmGeo = new THREE.CylinderGeometry(0.04, 0.04, focalDist * 1.5, 12);
    const focalArmMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
    });
    const focalArm = new THREE.Mesh(focalArmGeo, focalArmMat);
    focalArm.rotation.x = Math.PI / 2;
    focalArm.position.z = -focalDist * 0.75;
    focalArm.castShadow = true;
    dishAssembly.add(focalArm);

    // Focal receiver horn (Glowing Emerald Sensor Node)
    const focalHornGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const focalHornMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x15803d,
      emissiveIntensity: 0.5,
      metalness: 0.5,
      roughness: 0.2,
    });
    const focalHorn = new THREE.Mesh(focalHornGeo, focalHornMat);
    focalHorn.position.z = -focalDist;
    focalHorn.castShadow = true;
    dishAssembly.add(focalHorn);

    // Small focal halo
    const focalHaloGeo = new THREE.TorusGeometry(0.24, 0.02, 12, 32);
    const focalHaloMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.65,
    });
    const focalHalo = new THREE.Mesh(focalHaloGeo, focalHaloMat);
    focalHalo.position.z = -focalDist;
    dishAssembly.add(focalHalo);

    // -------------------------------------------------------------
    // 6. Interactive Mouse & Touch Drag Controls (Draggy Traction)
    // -------------------------------------------------------------
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let targetRotation = { x: 0.18, y: -0.38 };
    let currentRotation = { x: 0.18, y: -0.38 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      dragVelocity = { x: 0, y: 0 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const vx = deltaX * 0.007;
      const vy = deltaY * 0.007;
      dragVelocity = { x: vx, y: vy };

      targetRotation.y += vx;
      targetRotation.x += vy;
      targetRotation.x = Math.max(-0.6, Math.min(0.8, targetRotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      dragVelocity = { x: 0, y: 0 };
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      const vx = deltaX * 0.008;
      const vy = deltaY * 0.008;
      dragVelocity = { x: vx, y: vy };

      targetRotation.y += vx;
      targetRotation.x += vy;
      targetRotation.x = Math.max(-0.6, Math.min(0.8, targetRotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // -------------------------------------------------------------
    // 7. Animation Loop (Zero Bounce, Snappy Mechanical Response)
    // -------------------------------------------------------------
    let animationId: number;
    let clock = new THREE.Clock();
    let currentFoldAngle = 0; // 0 = Deployed (radar tilt), ~1.45 = Folded flat
    let currentScale = stateRef.current.scale ?? 0.62;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Dynamic scale interpolation
      const targetScale = stateRef.current.scale ?? 0.62;
      currentScale += (targetScale - currentScale) * 0.14;
      productGroup.scale.set(currentScale, currentScale, currentScale);

      // Inertial drag deceleration
      if (!isDragging) {
        dragVelocity.x *= 0.86;
        dragVelocity.y *= 0.86;
        targetRotation.y += dragVelocity.x;
        targetRotation.x += dragVelocity.y;
        targetRotation.x = Math.max(-0.6, Math.min(0.8, targetRotation.x));
      }

      // Snappy, draggy lerp rotation toward target
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.16;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.16;

      // Solid, grounded orientation (no bounce, no float wobble)
      productGroup.rotation.x = currentRotation.x;
      productGroup.rotation.y = currentRotation.y;
      productGroup.position.y = 0;

      // Snappy mechanical folding interpolation
      const targetFold = stateRef.current.isFolded ? 1.45 : 0;
      currentFoldAngle += (targetFold - currentFoldAngle) * 0.18;
      hingeGroup.rotation.x = currentFoldAngle;

      // LED Beacon pulsing state
      const isActive = stateRef.current.auraPodActive;
      if (isActive) {
        const pulse = 0.5 + Math.sin(elapsed * 3) * 0.5;
        beaconHalo.material.color.setHex(0x38bdf8);
        beaconLight.color.setHex(0x38bdf8);
        beaconLight.intensity = 0.5 + pulse * 0.35;
        wireframeMat.color.setHex(0x94a3b8);
        wireframeMat.opacity = 0.55 + pulse * 0.15;
        focalHornMat.emissiveIntensity = 0.4 + pulse * 0.3;
      } else {
        beaconHalo.material.color.setHex(0xef4444);
        beaconLight.color.setHex(0xef4444);
        beaconLight.intensity = 0.25;
        wireframeMat.color.setHex(0x475569);
        wireframeMat.opacity = 0.25;
        focalHornMat.emissiveIntensity = 0.05;
      }

      // Highlight specific subsystem parts
      const part = stateRef.current.highlightPart;
      if (part === 'dish') {
        wireframeMat.color.setHex(0x38bdf8);
        wireframeMat.opacity = 0.9;
        rimMat.color.setHex(0x38bdf8);
      } else if (part === 'feed') {
        focalHornMat.emissiveIntensity = 0.9;
        focalHaloMat.color.setHex(0x38bdf8);
      } else if (part === 'lna') {
        beaconLight.intensity = 1.4;
        beaconHalo.material.color.setHex(0x38bdf8);
      } else if (part === 'chassis') {
        metalHingeMat.color.setHex(0x94a3b8);
      } else {
        rimMat.color.setHex(0x64748b);
        metalHingeMat.color.setHex(0x475569);
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className={`relative ${className} select-none overflow-hidden`}>
      {/* High-End Studio Cyclorama Environment & Pedestal Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Overhead studio softbox cone wash */}
        <div className="w-[85%] max-w-[560px] h-[340px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035)_0%,rgba(56,189,248,0.015)_45%,transparent_75%)] blur-[40px]" />
        {/* Illuminated studio pedestal table wash */}
        <div className="absolute bottom-6 w-[70%] max-w-[420px] h-[55px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,rgba(15,23,42,0.8)_60%,transparent_100%)] blur-[14px]" />
        {/* Physical contact shadow anchor */}
        <div className="absolute bottom-7 w-[48%] max-w-[300px] h-[24px] rounded-[100%] bg-black/85 blur-[12px]" />
      </div>

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
      
      {/* 3D Interactivity Prompt Tag */}
      {showBadge && (
        <div className="absolute bottom-2.5 right-4 px-2.5 py-1 rounded bg-obsidian-900/85 border border-white/12 font-mono text-[10px] text-slate-300 pointer-events-none flex items-center gap-1.5 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Drag to inspect 3D hardware</span>
        </div>
      )}

      {/* Fold / Deploy Toggle Button */}
      {onToggleFold && (
        <button
          onClick={onToggleFold}
          className="absolute top-2 right-4 px-3 py-1 rounded-lg bg-obsidian-900/90 border-2 border-white/20 text-slate-200 hover:text-white font-mono text-[11px] font-bold shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
        >
          {isFolded ? 'Deploy 45° Dish' : 'Fold Flat'}
        </button>
      )}
    </div>
  );
};
