import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AuraPodMesh3DProps {
  auraPodActive?: boolean;
  isFolded?: boolean;
  onToggleFold?: () => void;
  interactive?: boolean;
  highlightPart?: 'dish' | 'feed' | 'lna' | 'chassis' | null;
  className?: string;
  showBadge?: boolean;
  scale?: number;
}

export const AuraPodMesh3D: React.FC<AuraPodMesh3DProps> = ({
  auraPodActive = true,
  isFolded = true, // Default to practical closed pocket block
  onToggleFold,
  interactive = true,
  highlightPart = null,
  className = 'w-full h-full min-h-[460px]',
  showBadge = true,
  scale = 0.88,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    auraPodActive,
    isFolded,
    highlightPart,
    scale,
  });

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

    // 2. Camera setup - Generous vertical space for extended antennas
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
    camera.position.set(0, 0.75, 4.7);
    camera.lookAt(0, 0.42, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1e293b, 3.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f2fe, 3.4);
    keyLight.position.set(3, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 2.6);
    rimLight.position.set(-4, 4, -3);
    scene.add(rimLight);

    const frontFill = new THREE.DirectionalLight(0x38bdf8, 3.2);
    frontFill.position.set(0, 1.5, 4.5);
    scene.add(frontFill);

    const sideRim = new THREE.DirectionalLight(0x60a5fa, 2.2);
    sideRim.position.set(4, 0.2, 2);
    scene.add(sideRim);

    // Dedicated Interior Chassis Backlight (Glows when lid opens!)
    const interiorLight = new THREE.PointLight(0x00f2fe, 0.0, 2.5);
    interiorLight.position.set(0, 0.25, 0.1);
    scene.add(interiorLight);

    const baseUnderPoint = new THREE.PointLight(0x00f2fe, 2.2, 3.5);
    baseUnderPoint.position.set(0, -0.4, 0.5);
    scene.add(baseUnderPoint);

    // 5. Build AuraPod Pocket Block Hardware Group
    const productGroup = new THREE.Group();
    productGroup.position.set(0, -0.22, 0);
    scene.add(productGroup);

    // Helper: Rounded rectangle shape for pocket-sized block
    const createRoundedRectShape = (w: number, l: number, r: number) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -l / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + l - r);
      shape.quadraticCurveTo(x + w, y + l, x + w - r, y + l);
      shape.lineTo(x + r, y + l);
      shape.quadraticCurveTo(x, y + l, x, y + l - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return shape;
    };

    // Pocket Dimensions: Width 1.25, Length 1.6, Thickness 0.28
    const blockWidth = 1.25;
    const blockLength = 1.6;
    const cornerRadius = 0.2;
    const baseHeight = 0.18;

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x162032, // Anodized Space-Titanium
      roughness: 0.35,
      metalness: 0.85,
    });

    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Machined Aluminum 6061
      roughness: 0.2,
      metalness: 0.95,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Immersion Gold (ENIG) RF Contacts
      metalness: 0.92,
      roughness: 0.2,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Polished Chrome
      metalness: 0.98,
      roughness: 0.1,
    });

    const rfShieldMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Tin-Plated RF Shield Can
      roughness: 0.15,
      metalness: 0.9,
    });

    const icBlackMat = new THREE.MeshStandardMaterial({
      color: 0x090d16, // Matte Epoxy Molded IC Packaging
      roughness: 0.6,
      metalness: 0.2,
    });

    const gasketMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Waterproof Neoprene Gasket
      roughness: 0.85,
      metalness: 0.1,
    });

    // -------------------------------------------------------------
    // A. SOLID POCKET BLOCK BASE (Lower Chassis)
    // -------------------------------------------------------------
    const baseShape = createRoundedRectShape(blockWidth, blockLength, cornerRadius);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: baseHeight,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    baseGeo.center();

    const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.set(0, 0, 0);
    productGroup.add(baseMesh);

    // Aluminum Perimeter Chamfer Band
    const waistShape = createRoundedRectShape(blockWidth + 0.035, blockLength + 0.035, cornerRadius + 0.018);
    const waistGeo = new THREE.ExtrudeGeometry(waistShape, { depth: 0.03, bevelEnabled: false });
    waistGeo.center();
    const waistMesh = new THREE.Mesh(waistGeo, bezelMat);
    waistMesh.rotation.x = Math.PI / 2;
    waistMesh.position.set(0, 0, 0);
    productGroup.add(waistMesh);

    // Front Edge: 4 Micro-LED Signal Strength Dots (1 -> 2 -> 3 -> 4 meter)
    const frontLeds: THREE.Mesh[] = [];
    const ledGeo = new THREE.SphereGeometry(0.022, 12, 12);
    for (let i = -1.5; i <= 1.5; i++) {
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
      const dot = new THREE.Mesh(ledGeo, dotMat);
      dot.position.set(i * 0.11, 0, blockLength / 2 + 0.04);
      productGroup.add(dot);
      frontLeds.push(dot);
    }

    // Front Status Cyan Lightbar Strip
    const lightBarGeo = new THREE.BoxGeometry(0.55, 0.016, 0.02);
    const lightBarMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.85 });
    const lightBar = new THREE.Mesh(lightBarGeo, lightBarMat);
    lightBar.position.set(0, 0.04, blockLength / 2 + 0.04);
    productGroup.add(lightBar);

    // Bottom Edge: 5V USB-C Travel Port
    const usbGeo = new THREE.BoxGeometry(0.24, 0.07, 0.08);
    const usbMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.8 });
    const usbPort = new THREE.Mesh(usbGeo, usbMat);
    usbPort.position.set(0, -0.01, -blockLength / 2 - 0.035);
    productGroup.add(usbPort);

    // Corner Lanyard / Carabiner Travel Loop
    const lanyardGeo = new THREE.TorusGeometry(0.065, 0.016, 12, 24);
    const lanyardMesh = new THREE.Mesh(lanyardGeo, bezelMat);
    lanyardMesh.position.set(blockWidth / 2 - 0.09, -0.01, -blockLength / 2 + 0.09);
    lanyardMesh.rotation.x = Math.PI / 2;
    productGroup.add(lanyardMesh);

    // -------------------------------------------------------------
    // ENHANCED INTERIOR RF ARCHITECTURE (Revealed when open)
    // -------------------------------------------------------------
    // 1. Recessed Matte Black FR-4 Circuit Board Substrate
    const pcbGeo = new THREE.PlaneGeometry(blockWidth * 0.86, blockLength * 0.86);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x060a12, // High-frequency dark FR-4 PCB
      roughness: 0.45,
      metalness: 0.65,
      side: THREE.DoubleSide,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.rotation.x = -Math.PI / 2;
    pcbMesh.position.set(0, 0.108, 0);
    productGroup.add(pcbMesh);

    // 2. Gold Immersion (ENIG) RF Microstrip Waveguide Traces
    const tracePoints = [
      new THREE.Vector3(-0.35, 0.11, -0.2),
      new THREE.Vector3(-0.25, 0.11, -0.05),
      new THREE.Vector3(-0.12, 0.11, -0.05),
      new THREE.Vector3(0, 0.11, 0.05),
      new THREE.Vector3(0.12, 0.11, -0.05),
      new THREE.Vector3(0.25, 0.11, -0.05),
      new THREE.Vector3(0.35, 0.11, -0.2),
    ];
    const traceCurve = new THREE.CatmullRomCurve3(tracePoints);
    const traceTubeGeo = new THREE.TubeGeometry(traceCurve, 32, 0.007, 6, false);
    const traceTube = new THREE.Mesh(traceTubeGeo, brassMat);
    productGroup.add(traceTube);

    // 3. Central RF Faraday Shield Can (Ultra-LNA & SAW Bandpass Filter housing)
    const rfCanGeo = new THREE.BoxGeometry(0.36, 0.038, 0.38);
    const rfCan = new THREE.Mesh(rfCanGeo, rfShieldMat);
    rfCan.position.set(0, 0.128, -0.02);
    productGroup.add(rfCan);

    // Laser-etched text/emblem on top of RF shield can
    const canEmblemGeo = new THREE.PlaneGeometry(0.26, 0.26);
    const canEmblemMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const canEmblem = new THREE.Mesh(canEmblemGeo, canEmblemMat);
    canEmblem.rotation.x = -Math.PI / 2;
    canEmblem.position.set(0, 0.148, -0.02);
    productGroup.add(canEmblem);

    // 4. Surface Mount Components (SMD Micro-ICs & Tantalum Capacitors)
    // Main processor chip
    const mcuGeo = new THREE.BoxGeometry(0.18, 0.025, 0.18);
    const mcuChip = new THREE.Mesh(mcuGeo, icBlackMat);
    mcuChip.position.set(-0.22, 0.12, -0.22);
    productGroup.add(mcuChip);

    // Crystal Oscillator (Silver metallic can)
    const crystalGeo = new THREE.BoxGeometry(0.1, 0.02, 0.06);
    const crystal = new THREE.Mesh(crystalGeo, chromeMat);
    crystal.position.set(-0.22, 0.12, -0.34);
    productGroup.add(crystal);

    // Row of SMD decoupling capacitors (Tantalum Gold & Ceramic)
    for (let c = -2; c <= 2; c++) {
      const capGeo = new THREE.BoxGeometry(0.04, 0.02, 0.025);
      const capMesh = new THREE.Mesh(capGeo, c % 2 === 0 ? brassMat : bezelMat);
      capMesh.position.set(0.22, 0.12, -0.15 + c * 0.06);
      productGroup.add(capMesh);
    }

    // 5. Dual Molded Rubber Antenna Resting Channels with Gold Docking Pogo-Pins
    const slotGeo = new THREE.BoxGeometry(0.11, 0.038, 0.85);
    const slotRubberMat = new THREE.MeshStandardMaterial({ color: 0x030712, roughness: 0.95 });
    const leftSlot = new THREE.Mesh(slotGeo, slotRubberMat);
    leftSlot.position.set(-blockWidth * 0.32, 0.108, 0.12);
    productGroup.add(leftSlot);

    const rightSlot = new THREE.Mesh(slotGeo, slotRubberMat);
    rightSlot.position.set(blockWidth * 0.32, 0.108, 0.12);
    productGroup.add(rightSlot);

    // Gold spring-loaded pogo docking pins inside slots
    const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.03, 12);
    const leftPin = new THREE.Mesh(pinGeo, brassMat);
    leftPin.position.set(-blockWidth * 0.32, 0.12, 0.48);
    productGroup.add(leftPin);

    const rightPin = new THREE.Mesh(pinGeo, brassMat);
    rightPin.position.set(blockWidth * 0.32, 0.12, 0.48);
    productGroup.add(rightPin);

    // 6. Dynamic High-Resolution OLED Telemetry Screen
    const oledCanvas = document.createElement('canvas');
    oledCanvas.width = 512;
    oledCanvas.height = 256;
    const oledCtx = oledCanvas.getContext('2d');

    const oledTexture = new THREE.CanvasTexture(oledCanvas);
    oledTexture.minFilter = THREE.LinearFilter;
    oledTexture.magFilter = THREE.LinearFilter;

    const oledMat = new THREE.MeshBasicMaterial({
      map: oledTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const oledScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.29), oledMat);
    oledScreen.rotation.x = -Math.PI / 2;
    oledScreen.position.set(0, 0.115, 0.31);
    productGroup.add(oledScreen);

    // Bezel border around OLED Screen
    const oledBezelGeo = new THREE.PlaneGeometry(0.61, 0.32);
    const oledBezelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const oledBezel = new THREE.Mesh(oledBezelGeo, oledBezelMat);
    oledBezel.rotation.x = -Math.PI / 2;
    oledBezel.position.set(0, 0.114, 0.31);
    productGroup.add(oledBezel);

    // -------------------------------------------------------------
    // B. REAR PRECISION HINGE
    // -------------------------------------------------------------
    const hingePivot = new THREE.Group();
    hingePivot.position.set(0, 0.11, -blockLength / 2 + 0.08);
    productGroup.add(hingePivot);

    const barrelGeo = new THREE.CylinderGeometry(0.045, 0.045, blockWidth * 0.75, 24);
    const barrelMesh = new THREE.Mesh(barrelGeo, bezelMat);
    barrelMesh.rotation.z = Math.PI / 2;
    hingePivot.add(barrelMesh);

    // -------------------------------------------------------------
    // C. TOP FLIP COVER / LID WITH DETAILED UNDERSIDE
    // -------------------------------------------------------------
    const lidAssembly = new THREE.Group();
    hingePivot.add(lidAssembly);

    const lidShape = createRoundedRectShape(blockWidth, blockLength, cornerRadius);
    const lidGeo = new THREE.ExtrudeGeometry(lidShape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    });
    lidGeo.center();
    const lidMesh = new THREE.Mesh(lidGeo, chassisMat);
    lidMesh.position.set(0, 0.05, blockLength / 2 - 0.08);
    lidMesh.rotation.x = -Math.PI / 2;
    lidAssembly.add(lidMesh);

    // Exterior accent stripe on outer lid
    const stripeGeo = new THREE.BoxGeometry(blockWidth * 0.65, 0.008, 0.035);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.set(0, 0.09, blockLength / 2 - 0.08);
    lidAssembly.add(stripe);

    // UNDERSIDE OF LID (Facing the user when open!)
    // 1. Copper/Graphite Heat Dissipation Shield Plate
    const underPlateGeo = new THREE.PlaneGeometry(blockWidth * 0.82, blockLength * 0.82);
    const underPlateMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Polished Copper Thermal Spreader
      metalness: 0.92,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });
    const underPlate = new THREE.Mesh(underPlateGeo, underPlateMat);
    underPlate.position.set(0, 0.012, blockLength / 2 - 0.08);
    underPlate.rotation.x = -Math.PI / 2;
    lidAssembly.add(underPlate);

    // 2. Laser-etched Technical Specifications Decal
    const specDecalGeo = new THREE.PlaneGeometry(blockWidth * 0.68, blockLength * 0.55);
    const specDecalMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const specDecal = new THREE.Mesh(specDecalGeo, specDecalMat);
    specDecal.position.set(0, 0.013, blockLength / 2 - 0.08);
    specDecal.rotation.x = -Math.PI / 2;
    lidAssembly.add(specDecal);

    // 3. Perimeter Waterproof Rubber Gasket Seal Ring
    const gasketRimShape = createRoundedRectShape(blockWidth * 0.94, blockLength * 0.94, cornerRadius * 0.85);
    const gasketRimGeo = new THREE.ExtrudeGeometry(gasketRimShape, { depth: 0.015, bevelEnabled: false });
    gasketRimGeo.center();
    const gasketRim = new THREE.Mesh(gasketRimGeo, gasketMat);
    gasketRim.position.set(0, 0.015, blockLength / 2 - 0.08);
    gasketRim.rotation.x = -Math.PI / 2;
    lidAssembly.add(gasketRim);

    // -------------------------------------------------------------
    // D. HIGH-END 3-STAGE TELESCOPIC DUAL ANTENNAS
    // -------------------------------------------------------------
    const createTelescopicAntenna = () => {
      const root = new THREE.Group();

      // Root Swivel Knuckle (CNC ball clevis with brass pin)
      const knuckleGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.085, 20);
      const knuckle = new THREE.Mesh(knuckleGeo, bezelMat);
      knuckle.rotation.z = Math.PI / 2;
      root.add(knuckle);

      const brassPinGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.095, 16);
      const brassPin = new THREE.Mesh(brassPinGeo, brassMat);
      brassPin.rotation.z = Math.PI / 2;
      root.add(brassPin);

      // Stage 1: Fixed Base Barrel (Space Titanium with knurled collars)
      const s1Len = 0.36;
      const s1Geo = new THREE.CylinderGeometry(0.036, 0.042, s1Len, 20);
      s1Geo.translate(0, s1Len / 2, 0);
      const s1 = new THREE.Mesh(s1Geo, chassisMat);
      root.add(s1);

      // Gold knurled accent ring
      const goldRingGeo = new THREE.TorusGeometry(0.039, 0.007, 12, 24);
      const goldRing = new THREE.Mesh(goldRingGeo, brassMat);
      goldRing.rotation.x = Math.PI / 2;
      goldRing.position.y = s1Len * 0.85;
      root.add(goldRing);

      // Stage 2 Group: Mid Telescoping Sleeve (Satin Aluminum)
      const s2Group = new THREE.Group();
      root.add(s2Group);

      const s2Len = 0.38;
      const s2Geo = new THREE.CylinderGeometry(0.026, 0.032, s2Len, 20);
      s2Geo.translate(0, s2Len / 2, 0);
      const s2 = new THREE.Mesh(s2Geo, bezelMat);
      s2Group.add(s2);

      // Etched RF Calibration band
      const calibRingGeo = new THREE.TorusGeometry(0.028, 0.005, 10, 20);
      const calibRing = new THREE.Mesh(calibRingGeo, stripeMat);
      calibRing.rotation.x = Math.PI / 2;
      calibRing.position.y = s2Len * 0.88;
      s2Group.add(calibRing);

      // Stage 3 Group: Top Telescoping Whip (Polished Chrome Steel)
      const s3Group = new THREE.Group();
      s2Group.add(s3Group);

      const s3Len = 0.40;
      const s3Geo = new THREE.CylinderGeometry(0.015, 0.022, s3Len, 20);
      s3Geo.translate(0, s3Len / 2, 0);
      const s3 = new THREE.Mesh(s3Geo, chromeMat);
      s3Group.add(s3);

      // Sensor Beacon Top Assembly
      const beaconGroup = new THREE.Group();
      beaconGroup.position.y = s3Len;
      s3Group.add(beaconGroup);

      // Machined choke collar
      const chokeGeo = new THREE.CylinderGeometry(0.036, 0.024, 0.04, 16);
      const choke = new THREE.Mesh(chokeGeo, brassMat);
      choke.position.y = 0.02;
      beaconGroup.add(choke);

      // Glowing Cyan Optical Beacon Lens
      const tipGeo = new THREE.SphereGeometry(0.042, 20, 20);
      const tipMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x00f2fe,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.4,
      });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.y = 0.05;
      beaconGroup.add(tip);

      // Dual Fresnel Halo Rings
      const halo1Geo = new THREE.TorusGeometry(0.065, 0.007, 12, 24);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.85 });
      const halo1 = new THREE.Mesh(halo1Geo, haloMat);
      halo1.position.y = 0.05;
      halo1.rotation.x = Math.PI / 2;
      beaconGroup.add(halo1);

      const halo2Geo = new THREE.TorusGeometry(0.085, 0.005, 12, 24);
      const halo2 = new THREE.Mesh(halo2Geo, haloMat);
      halo2.position.y = 0.05;
      halo2.rotation.x = Math.PI / 2;
      beaconGroup.add(halo2);

      // 6. Individual Mini Curved Signal Waves (small, distinct dome arcs directly atop this antenna tip)
      const miniWaveGroup = new THREE.Group();
      beaconGroup.add(miniWaveGroup);
      const waves: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; offset: number }[] = [];

      for (let i = 0; i < 3; i++) {
        // Small, pronounced dome curve (radius ~0.08 to 0.18, height ~0.06)
        const r = 0.075 + i * 0.05;
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-r, 0.08 + i * 0.045, 0),
          new THREE.Vector3(0, 0.08 + i * 0.045 + r * 0.75, 0.015),
          new THREE.Vector3(r, 0.08 + i * 0.045, 0)
        );
        const geo = new THREE.TubeGeometry(curve, 20, 0.005, 6, false);
        const mat = new THREE.MeshBasicMaterial({
          color: 0x00f2fe,
          transparent: true,
          opacity: 0.0,
        });
        const mesh = new THREE.Mesh(geo, mat);
        miniWaveGroup.add(mesh);
        waves.push({ mesh, mat, offset: i * 0.33 });
      }

      return {
        root,
        s2Group,
        s3Group,
        beaconGroup,
        tipMat,
        haloMat,
        s1Len,
        s2Len,
        s3Len,
        miniWaveGroup,
        waves,
      };
    };

    const leftAntenna = createTelescopicAntenna();
    leftAntenna.root.position.set(-blockWidth * 0.32, 0.12, -blockLength / 2 + 0.25);
    productGroup.add(leftAntenna.root);

    const rightAntenna = createTelescopicAntenna();
    rightAntenna.root.position.set(blockWidth * 0.32, 0.12, -blockLength / 2 + 0.25);
    productGroup.add(rightAntenna.root);

    // -------------------------------------------------------------
    // 6. Interactive Mouse Drag / Orbit Controls
    // -------------------------------------------------------------
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let currentRotation = { x: 0.32, y: -0.38 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      currentRotation.y += deltaX * 0.007;
      currentRotation.x += deltaY * 0.007;
      currentRotation.x = Math.max(-0.4, Math.min(0.75, currentRotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      currentRotation.y += deltaX * 0.008;
      currentRotation.x += deltaY * 0.008;
      currentRotation.x = Math.max(-0.4, Math.min(0.75, currentRotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // -------------------------------------------------------------
    // 7. REALISTIC DAMPED SPRING HARMONIC PHYSICS SYSTEM
    // -------------------------------------------------------------
    class SpringSimulation {
      val: number;
      target: number;
      vel: number;
      k: number;
      damp: number;

      constructor(init: number, k = 140, damp = 16) {
        this.val = init;
        this.target = init;
        this.vel = 0;
        this.k = k;
        this.damp = damp;
      }

      update(dt: number) {
        const step = Math.min(dt, 0.032);
        const force = -this.k * (this.val - this.target) - this.damp * this.vel;
        this.vel += force * step;
        this.val += this.vel * step;
      }
    }

    // Initialize physical springs with tuned mass/damping for mechanical snaps
    const lidSpring = new SpringSimulation(isFolded ? 0 : -1.85, 130, 16);
    const pitchSpring = new SpringSimulation(isFolded ? Math.PI / 2 : 0.08, 110, 14);
    const spreadSpring = new SpringSimulation(isFolded ? 0 : 0.38, 120, 15);
    const telescopeSpring = new SpringSimulation(isFolded ? 0.02 : 1.0, 95, 14);

    let animationId: number;
    let clock = new THREE.Clock();
    let currentScale = stateRef.current.scale ?? 0.88;

    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Dynamic scale interpolation
      const targetScale = stateRef.current.scale ?? 0.88;
      currentScale += (targetScale - currentScale) * 0.08;
      productGroup.scale.set(currentScale, currentScale, currentScale);

      // Target orientation based on highlighted part
      let targetRotX = currentRotation.x;
      let targetRotY = currentRotation.y;
      let targetPosZ = 4.7;
      let targetBaseY = -0.22;

      // Ultra-calm micro-drift
      const subtleFloat = Math.sin(elapsed * 0.3) * 0.008;

      const part = stateRef.current.highlightPart;
      if (!isDragging) {
        if (part === 'dish') {
          targetRotX = 0.22;
          targetRotY = -0.28;
          targetPosZ = 4.4;
          targetBaseY = -0.25;
        } else if (part === 'feed') {
          targetRotX = 0.45;
          targetRotY = 0.0;
          targetPosZ = 3.9;
          targetBaseY = -0.15;
        } else if (part === 'lna') {
          targetRotX = 0.35;
          targetRotY = -0.65;
          targetPosZ = 4.3;
          targetBaseY = -0.2;
        } else if (part === 'chassis') {
          targetRotX = 0.22;
          targetRotY = 2.8;
          targetPosZ = 4.5;
          targetBaseY = -0.2;
        }

        productGroup.rotation.y += (targetRotY - productGroup.rotation.y) * 0.04;
        productGroup.rotation.x += (targetRotX - productGroup.rotation.x) * 0.04;
        productGroup.position.y += ((targetBaseY + subtleFloat) - productGroup.position.y) * 0.04;
        camera.position.z += (targetPosZ - camera.position.z) * 0.04;
      } else {
        productGroup.rotation.x = currentRotation.x;
        productGroup.rotation.y = currentRotation.y;
      }

      // =============================================================
      // PHYSICAL SPRING SEQUENCING WITH INERTIAL OVERSHOOT
      // =============================================================
      const folded = stateRef.current.isFolded;

      // 1. Lid Spring: pops open briskly, snaps shut firmly
      lidSpring.target = folded ? 0 : -1.85;
      lidSpring.update(dt);
      lidAssembly.rotation.x = lidSpring.val;

      // 2. Knuckle Pitch Spring: folds forward into block (+PI/2), erects upright (0.08)
      if (!folded && lidSpring.val < -0.35) {
        pitchSpring.target = 0.08; // Swing upright into +Y
      } else if (folded) {
        pitchSpring.target = Math.PI / 2; // Fold forward into internal chassis slot!
      }
      pitchSpring.update(dt);

      // 3. Telescopic Spring: only expands outward when knuckle is pointing up
      if (!folded && pitchSpring.val < 0.7) {
        telescopeSpring.target = 1.0; // Extend to full length
      } else if (folded) {
        telescopeSpring.target = 0.02; // Collapse down to flush stubs
      }
      telescopeSpring.update(dt);

      const ext = Math.max(0.01, Math.min(1.08, telescopeSpring.val));

      // Apply Stepped Telescopic Geometry:
      leftAntenna.s2Group.position.y = leftAntenna.s1Len * ext;
      leftAntenna.s3Group.position.y = leftAntenna.s2Len * ext;

      rightAntenna.s2Group.position.y = rightAntenna.s1Len * ext;
      rightAntenna.s3Group.position.y = rightAntenna.s2Len * ext;

      // 4. Spread Spring: V-angle forms only when antennas are extended
      if (!folded && telescopeSpring.val > 0.5) {
        spreadSpring.target = 0.38; // ±22° V-beam stance
      } else {
        spreadSpring.target = 0;
      }
      spreadSpring.update(dt);

      // Natural physical compliance: subtle micro-sway on extended metal whip tips
      const tipSway = (!folded && ext > 0.8) ? Math.sin(elapsed * 2.2) * 0.004 : 0;

      leftAntenna.root.rotation.x = pitchSpring.val + tipSway;
      leftAntenna.root.rotation.z = spreadSpring.val;

      rightAntenna.root.rotation.x = pitchSpring.val - tipSway;
      rightAntenna.root.rotation.z = -spreadSpring.val;

      // Completely seal antennas out of sight when lid is shut in pocket mode
      const isSealedShut = folded && Math.abs(lidSpring.val) < 0.06 && ext < 0.08;
      leftAntenna.root.visible = !isSealedShut;
      rightAntenna.root.visible = !isSealedShut;

      // 5. Interior Chassis Backlight (Fades up when lid opens, fades off when closed)
      const lidOpenRatio = Math.min(1.0, Math.max(0.0, -lidSpring.val / 1.85));
      interiorLight.intensity = lidOpenRatio * (stateRef.current.auraPodActive ? 1.6 : 0.6);

      // 6. RENDER DYNAMIC LIVE TELEMETRY TO OLED CANVAS
      if (oledCtx && lidOpenRatio > 0.05) {
        oledCtx.fillStyle = '#030712';
        oledCtx.fillRect(0, 0, 512, 256);

        // Neon border & Grid lines
        oledCtx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        oledCtx.lineWidth = 4;
        oledCtx.strokeRect(6, 6, 500, 244);

        // Header Title
        oledCtx.font = 'bold 24px monospace';
        oledCtx.fillStyle = '#00f2fe';
        oledCtx.fillText('AURAPOD AP-1 • LNA ACTIVE', 24, 42);

        // Frequency & Carrier
        oledCtx.font = 'bold 28px monospace';
        oledCtx.fillStyle = '#ffffff';
        oledCtx.fillText('5.180 GHz [CH 36]', 24, 86);

        // Technical Specs line
        oledCtx.font = '20px monospace';
        oledCtx.fillStyle = '#94a3b8';
        oledCtx.fillText('LNA GAIN: +18.4dB   NF: 1.08dB', 24, 124);

        // Status Badge & 1 2 3 Signal Bar Meter (Gentle, steady cadence)
        const isLocked = !folded && ext > 0.85;
        const sigStep = isLocked ? (Math.floor(elapsed * 1.0) % 3) + 1 : 0; // 1, 2, 3
        const sigBarsText = isLocked ? '█'.repeat(sigStep) + '░'.repeat(3 - sigStep) : '░░░';
        oledCtx.fillStyle = isLocked ? '#10b981' : '#ef4444';
        oledCtx.font = 'bold 22px monospace';
        oledCtx.fillText(isLocked ? `SIGNAL ${sigBarsText} • LOCKED` : 'SIGNAL ░░░ • STANDBY', 24, 162);

        // Live Animated Waveform Bars
        for (let b = 0; b < 24; b++) {
          const barHeight = isLocked ? Math.abs(Math.sin(elapsed * 2 + b * 0.4)) * 48 + 8 : 6;
          oledCtx.fillStyle = isLocked ? '#00f2fe' : '#475569';
          oledCtx.fillRect(24 + b * 19, 230 - barHeight, 13, barHeight);
        }

        oledTexture.needsUpdate = true;
      }

      // 7. Animate the Two Individual Curved Mini Signal Waves over each Antenna
      const isFullyLocked = !folded && ext > 0.85 && stateRef.current.auraPodActive;
      if (isFullyLocked) {
        leftAntenna.miniWaveGroup.visible = true;
        rightAntenna.miniWaveGroup.visible = true;

        [leftAntenna.waves, rightAntenna.waves].forEach((waveSet) => {
          waveSet.forEach((wave) => {
            const cycle = (elapsed * 0.55 + wave.offset) % 1.0;
            const scaleFactor = 0.85 + cycle * 0.45;
            wave.mesh.scale.set(scaleFactor, scaleFactor, 1.0);
            wave.mesh.position.y = cycle * 0.08; // Delicate micro-elevation directly above the tip

            const alpha = Math.sin(cycle * Math.PI);
            wave.mat.opacity = Math.max(0, alpha * 0.85);

            if (cycle < 0.5) {
              wave.mat.color.setHex(0x00f2fe);
            } else {
              wave.mat.color.setHex(0x10b981);
            }
          });
        });
      } else {
        [leftAntenna.waves, rightAntenna.waves].forEach((waveSet) => {
          waveSet.forEach((wave) => {
            wave.mat.opacity += (0 - wave.mat.opacity) * 0.2;
          });
        });
        if (leftAntenna.waves[0].mat.opacity < 0.01) {
          leftAntenna.miniWaveGroup.visible = false;
          rightAntenna.miniWaveGroup.visible = false;
        }
      }

      // 8. Front 4 Micro-LEDs: Calm 1 -> 2 -> 3 -> 4 Signal Acquiring Sequence
      if (isFullyLocked) {
        const step = Math.floor((elapsed * 1.4) % 4);
        frontLeds.forEach((dot, dotIdx) => {
          const dMat = dot.material as THREE.MeshBasicMaterial;
          if (dotIdx <= step) {
            dMat.color.setHex(0x00f2fe);
          } else {
            dMat.color.setHex(0x0f172a);
          }
        });
      } else {
        frontLeds.forEach((dot) => {
          (dot.material as THREE.MeshBasicMaterial).color.setHex(0x334155);
        });
      }

      // 9. LED Beacon Ignition Logic
      const isBeaconActive = isFullyLocked;
      if (isBeaconActive) {
        const pulse = 0.5 + Math.sin(elapsed * 3) * 0.5;
        lightBarMat.color.setHex(0x00f2fe);
        lightBarMat.opacity = 0.6 + pulse * 0.35;

        leftAntenna.tipMat.color.setHex(0x00f2fe);
        leftAntenna.tipMat.emissiveIntensity = 0.9 + pulse * 0.6;
        leftAntenna.haloMat.opacity = 0.6 + pulse * 0.4;

        rightAntenna.tipMat.color.setHex(0x00f2fe);
        rightAntenna.tipMat.emissiveIntensity = 0.9 + pulse * 0.6;
        rightAntenna.haloMat.opacity = 0.6 + pulse * 0.4;

        baseUnderPoint.color.setHex(0x00f2fe);
        baseUnderPoint.intensity = 1.8 + pulse * 1.0;
      } else {
        const standbyPulse = 0.3 + Math.sin(elapsed * 1.2) * 0.2;
        lightBarMat.color.setHex(0x38bdf8);
        lightBarMat.opacity = standbyPulse;

        leftAntenna.tipMat.color.setHex(0x334155);
        leftAntenna.tipMat.emissiveIntensity = 0.0;
        leftAntenna.haloMat.opacity = 0.0;

        rightAntenna.tipMat.color.setHex(0x334155);
        rightAntenna.tipMat.emissiveIntensity = 0.0;
        rightAntenna.haloMat.opacity = 0.0;

        baseUnderPoint.color.setHex(0x38bdf8);
        baseUnderPoint.intensity = 0.6;
      }

      if (part === 'dish') {
        leftAntenna.tipMat.emissiveIntensity = 1.8;
        rightAntenna.tipMat.emissiveIntensity = 1.8;
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
    <div className={`relative ${className} select-none`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* 3D Interactivity Prompt Tag */}
      {showBadge && (
        <div className="absolute bottom-2 right-4 px-2.5 py-1 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-slate-400 pointer-events-none flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
          <span>Drag to inspect in 3D</span>
        </div>
      )}

      {/* Fold / Deploy Toggle Button */}
      {onToggleFold && (
        <button
          onClick={onToggleFold}
          className="absolute top-2 right-4 px-3 py-1 rounded-lg bg-obsidian-900/90 border-2 border-white/20 text-slate-200 hover:text-white font-mono text-[11px] font-bold shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
        >
          {isFolded ? 'Open Antennas' : 'Close to Pocket'}
        </button>
      )}
    </div>
  );
};
