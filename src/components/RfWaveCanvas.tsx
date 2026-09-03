import React, { useEffect, useRef } from 'react';

interface RfWaveCanvasProps {
  auraPodActive: boolean;
}

interface Streamline {
  originType: 'top' | 'left';
  seed: number;
  speed: number;
  phase: number;
  amplitude: number;
  opacity: number;
  curvature: number;
  pulseOffset: number;
}

interface GridNode {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isCrosshair: boolean;
}

export const RfWaveCanvas: React.FC<RfWaveCanvasProps> = ({ auraPodActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    activeBlend: auraPodActive ? 1 : 0,
  });

  useEffect(() => {
    stateRef.current.activeBlend = auraPodActive ? 1 : 0;
  }, [auraPodActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    // Interactive cursor tracking for the elastic scatter physics
    const mouse = { x: -9999, y: -9999, active: false };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleWindowMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleWindowMouseLeave);

    // Grid nodes array for physics simulation
    let gridNodes: GridNode[] = [];
    const gridSpacing = 36;

    const buildGrid = (w: number, h: number) => {
      const cols = Math.ceil(w / gridSpacing) + 1;
      const rows = Math.ceil(h / gridSpacing) + 1;
      const nodes: GridNode[] = [];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const gx = c * gridSpacing;
          const gy = r * gridSpacing;
          nodes.push({
            originX: gx,
            originY: gy,
            x: gx,
            y: gy,
            vx: 0,
            vy: 0,
            isCrosshair: c % 6 === 0 && r % 6 === 0,
          });
        }
      }
      return nodes;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = (parent?.clientWidth || window.innerWidth) * dpr;
      height = canvas.height = (parent?.clientHeight || window.innerHeight) * dpr;
      ctx.scale(dpr, dpr);
      gridNodes = buildGrid(width / dpr, height / dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // 16 elegant, distinct, clearly visible streamlines
    const lineCount = 16;
    const streamLines: Streamline[] = Array.from({ length: lineCount }, (_, i) => ({
      originType: i % 2 === 0 ? 'top' : 'left',
      seed: (i + 0.5) / lineCount,
      speed: 0.8 + (i % 4) * 0.15,
      phase: (i * Math.PI) / 4,
      amplitude: 7 + (i % 3) * 3,
      opacity: 0.45 + (i % 3) * 0.2,
      curvature: 0.22 + (i % 3) * 0.12,
      pulseOffset: (i * 0.18) % 1,
    }));

    let currentBlend = auraPodActive ? 1 : 0;
    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth state transition
      const targetBlend = stateRef.current.activeBlend;
      currentBlend += (targetBlend - currentBlend) * 0.05;

      const w = width / dpr;
      const h = height / dpr;

      ctx.clearRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 1. TACTILE ELASTIC DOTTED GRID (Clean, snappy, zero trail)
      // -------------------------------------------------------------
      const gridAlpha = 0.16 * (1 - currentBlend * 0.45);
      const hoverRadius = 105; // Generous, smooth cursor distortion radius
      const hoverRadiusSq = hoverRadius * hoverRadius;
      const springStiffness = 0.28; // Snappy instant recovery
      const damping = 0.62; // High damping: settles immediately without lingering trail

      for (let i = 0; i < gridNodes.length; i++) {
        const node = gridNodes[i];

        // A. Cursor Scatter Repulsion (Smooth & expansive)
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < hoverRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / hoverRadius) * 12;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        // B. Instant Elastic Recovery to Origin
        const homeDx = node.originX - node.x;
        const homeDy = node.originY - node.y;
        node.vx += homeDx * springStiffness;
        node.vy += homeDy * springStiffness;
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;

        // Hard snap threshold to eliminate any lingering tail/trail
        const homeDistSq = homeDx * homeDx + homeDy * homeDy;
        if (homeDistSq < 0.36 && Math.abs(node.vx) < 0.25 && Math.abs(node.vy) < 0.25) {
          node.x = node.originX;
          node.y = node.originY;
          node.vx = 0;
          node.vy = 0;
        }

        // C. Render Dot (Dimmed, subtle disturbance - no bright neon smear)
        if (homeDistSq > 1.5) {
          // Dimmed soft cool blue tint on disturbance
          ctx.fillStyle = `rgba(56, 189, 248, 0.28)`;
          ctx.fillRect(node.x - 0.9, node.y - 0.9, 1.8, 1.8);
        } else {
          // Standard crisp technical dot
          ctx.fillStyle = `rgba(255, 255, 255, ${gridAlpha})`;
          ctx.fillRect(node.x - 0.9, node.y - 0.9, 1.8, 1.8);
        }

        // CAD Crosshair Intersection Markers
        if (node.isCrosshair) {
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.22 * (1 - currentBlend * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x - 4, node.y);
          ctx.lineTo(node.x + 4, node.y);
          ctx.moveTo(node.x, node.y - 4);
          ctx.lineTo(node.x, node.y + 4);
          ctx.stroke();
        }
      }

      // Inactive mode status readout watermark
      if (currentBlend < 0.85) {
        ctx.save();
        ctx.font = '10px monospace';
        ctx.fillStyle = `rgba(148, 163, 184, ${(1 - currentBlend) * 0.35})`;
        ctx.fillText('STATUS: UNASSISTED DEAD ZONE // RF LOSS: -32dB // ELASTIC CAD GRID', 24, h - 30);
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 2. LUMINOUS COHERENT FLOW FIELD (When ON)
      // -------------------------------------------------------------
      if (currentBlend > 0.02) {
        // Optimal focal target in open upper-right hero atmosphere
        const rx = w > 1024 
          ? Math.min(w * 0.82, w - 160) 
          : (w > 640 ? w * 0.78 : w * 0.5);
        const ry = w > 1024 ? 220 : 160;

        ctx.save();

        streamLines.forEach((line) => {
          let startX = 0;
          let startY = 0;

          if (line.originType === 'top') {
            startX = line.seed * (rx * 1.4);
            startY = 0;
          } else {
            startX = 0;
            startY = line.seed * (ry * 2.1);
          }

          const ctrlX = (startX + rx) * 0.5 + (line.originType === 'top' ? -35 : 35) * line.curvature;
          const ctrlY = (startY + ry) * 0.5 + (line.originType === 'top' ? 55 : -35) * line.curvature;

          ctx.beginPath();
          const steps = 60;

          for (let step = 0; step <= steps; step++) {
            const t = step / steps;
            
            const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * rx;
            const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * ry;

            const waveDamping = (1 - t * 0.94);
            const wave = Math.sin(t * 6.5 - time * line.speed * 2.2 + line.phase) * line.amplitude * waveDamping;

            const nx = -(ctrlY - startY) * 0.022 * wave;
            const ny = (ctrlX - startX) * 0.022 * wave;

            const curX = bx + nx;
            const curY = by + ny;

            if (step === 0) {
              ctx.moveTo(curX, curY);
            } else {
              ctx.lineTo(curX, curY);
            }
          }

          const gradient = ctx.createLinearGradient(startX, startY, rx, ry);
          gradient.addColorStop(0, `rgba(56, 189, 248, ${0.15 * currentBlend})`);
          gradient.addColorStop(0.5, `rgba(0, 242, 254, ${line.opacity * currentBlend * 0.85})`);
          gradient.addColorStop(1, `rgba(16, 185, 129, ${0.95 * currentBlend})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(0, 242, 254, ${0.45 * currentBlend})`;
          ctx.stroke();

          // Traveling Energy Packet Pulses
          const pulseProgress = ((time * line.speed * 0.32 + line.pulseOffset) % 1);
          const pt = pulseProgress;
          const pbx = (1 - pt) * (1 - pt) * startX + 2 * (1 - pt) * pt * ctrlX + pt * pt * rx;
          const pby = (1 - pt) * (1 - pt) * startY + 2 * (1 - pt) * pt * ctrlY + pt * pt * ry;
          const pDamping = (1 - pt * 0.94);
          const pWave = Math.sin(pt * 6.5 - time * line.speed * 2.2 + line.phase) * line.amplitude * pDamping;
          const pnx = -(ctrlY - startY) * 0.022 * pWave;
          const pny = (ctrlX - startX) * 0.022 * pWave;

          ctx.beginPath();
          ctx.arc(pbx + pnx, pby + pny, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * currentBlend})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00F2FE';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pbx + pnx, pby + pny, 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.5 * currentBlend})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // -------------------------------------------------------------
        // 3. ARCHITECTURAL RF FOCAL APERTURE STATION
        // -------------------------------------------------------------
        ctx.shadowBlur = 0;

        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate(time * 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.65 * currentBlend})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(rx, ry, 26, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.75 * currentBlend})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const sonarRadius = (time * 26) % 68;
        ctx.beginPath();
        ctx.arc(rx, ry, sonarRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - sonarRadius / 68) * 0.8 * currentBlend})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.strokeStyle = `rgba(0, 242, 254, ${0.75 * currentBlend})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(rx - 28, ry);
        ctx.lineTo(rx - 8, ry);
        ctx.moveTo(rx + 8, ry);
        ctx.lineTo(rx + 28, ry);
        ctx.moveTo(rx, ry - 28);
        ctx.lineTo(rx, ry - 8);
        ctx.moveTo(rx, ry + 8);
        ctx.lineTo(rx, ry + 28);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rx, ry, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.95 * currentBlend})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#10B981';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rx, ry, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * currentBlend})`;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = `rgba(0, 242, 254, ${0.9 * currentBlend})`;
        ctx.textAlign = 'center';
        ctx.fillText('[ RF_CONCENTRATOR // LOCKED ]', rx, ry - 54);

        ctx.font = '9px monospace';
        ctx.fillStyle = `rgba(16, 185, 129, ${0.85 * currentBlend})`;
        ctx.fillText('APERTURE FOCUS: +11.8 dBi • 3.5GHz n78', rx, ry + 62);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseleave', handleWindowMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
