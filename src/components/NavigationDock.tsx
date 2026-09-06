import React, { useState } from 'react';
import { 
  Clock, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Wifi,
  WifiOff,
  Smartphone
} from 'lucide-react';
import { MagneticDock, DockItemData } from './ui/MagneticDock';
import { AuraPodLogo } from './ui/AuraPodLogo';
import { AuraPodEdition } from '../types';

interface NavigationDockProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
  activeEdition?: AuraPodEdition;
  onToggleEdition?: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  auraPodActive,
  onToggleAuraPod,
  activeEdition = 'pocket',
  onToggleEdition,
}) => {
  const [activeSection, setActiveSection] = useState<string>('top');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleBoost = () => {
    onToggleAuraPod();
  };

  const dockItems: DockItemData[] = [
    {
      id: 'home',
      label: 'AuraPod Overview',
      icon: <AuraPodLogo className="w-5 h-5 text-cyan-neon" glow />,
      onClick: () => scrollTo('top'),
      isActive: activeSection === 'top',
    },
    {
      id: 'faraday',
      label: 'Faraday Physics',
      icon: <Layers className="w-5 h-5 text-sky-400" />,
      onClick: () => scrollTo('faraday'),
      isActive: activeSection === 'faraday',
    },
    {
      id: 'hardware-3d',
      label: '3D Anatomy',
      icon: activeEdition === 'pocket' ? <Smartphone className="w-5 h-5 text-cyan-neon" /> : <AuraPodLogo className="w-5 h-5 text-cyan-neon" />,
      onClick: () => scrollTo('hardware-3d'),
      isActive: activeSection === 'hardware-3d',
    },
    {
      id: 'simulator',
      label: '11:59 PM Testbed',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      onClick: () => scrollTo('simulator'),
      isActive: activeSection === 'simulator',
      badge: '!',
    },
    {
      id: 'software',
      label: 'AuraOS Suite',
      icon: <Compass className="w-5 h-5 text-emerald-signal" />,
      onClick: () => scrollTo('software'),
      isActive: activeSection === 'software',
    },
    {
      id: 'matrix',
      label: 'Comparison',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      onClick: () => scrollTo('matrix'),
      isActive: activeSection === 'matrix',
    },
    {
      id: 'pricing',
      label: 'Specs & BOM',
      icon: <Zap className="w-5 h-5 text-amber-300 fill-amber-300/30" />,
      onClick: () => scrollTo('pricing'),
      isActive: activeSection === 'pricing',
    },
    ...(onToggleEdition ? [{
      id: 'edition',
      label: activeEdition === 'pocket' ? 'Switch to Room Edition' : 'Switch to Pocket Edition',
      icon: activeEdition === 'pocket' ? <AuraPodLogo className="w-5 h-5 text-emerald-signal" /> : <Smartphone className="w-5 h-5 text-cyan-neon" />,
      onClick: onToggleEdition,
    }] : []),
    {
      id: 'boost',
      label: auraPodActive ? 'AuraPod Active (4 Bars)' : 'AuraPod Off (1 Bar)',
      icon: auraPodActive ? <Wifi className="w-5 h-5 text-emerald-signal" /> : <WifiOff className="w-5 h-5 text-crimson-hazard" />,
      onClick: handleToggleBoost,
      isActive: auraPodActive,
    },
  ];

  return (
    <MagneticDock
      items={dockItems}
      iconSize={46}
      maxScale={1.3}
      magneticDistance={90}
      showLabels={true}
      position="bottom"
      variant="glass"
      autoHide={true}
    />
  );
};
