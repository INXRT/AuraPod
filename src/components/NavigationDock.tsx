import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Volume2, 
  VolumeX, 
  Wifi,
  WifiOff 
} from 'lucide-react';
import { MagneticDock, DockItemData } from './ui/MagneticDock';
import { sound } from '../utils/audioSynthesizer';

interface NavigationDockProps {
  auraPodActive: boolean;
  onToggleAuraPod: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  auraPodActive,
  onToggleAuraPod,
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollTo = (id: string) => {
    sound.playToggleClick();
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

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundOn(newState);
    if (newState) {
      sound.playSuccessChime();
    }
  };

  const handleToggleBoost = () => {
    sound.playToggleClick();
    onToggleAuraPod();
    if (!auraPodActive) {
      sound.playSuccessChime();
    } else {
      sound.playErrorAlarm();
    }
  };

  const dockItems: DockItemData[] = [
    {
      id: 'home',
      label: 'Home / 3D Pod',
      icon: <Radio className="w-5 h-5 text-cyan-neon" />,
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
      label: '3D Subsystem Anatomy',
      icon: <Radio className="w-5 h-5 text-cyan-neon" />,
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
      label: 'Economics & BOM',
      icon: <Zap className="w-5 h-5 text-amber-300 fill-amber-300/30" />,
      onClick: () => scrollTo('pricing'),
      isActive: activeSection === 'pricing',
    },
    {
      id: 'audio',
      label: soundOn ? 'Mute Audio Synthesizer' : 'Unmute Audio Synthesizer',
      icon: soundOn ? <Volume2 className="w-5 h-5 text-cyan-neon" /> : <VolumeX className="w-5 h-5 text-slate-500" />,
      onClick: handleToggleSound,
    },
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
      iconSize={48}
      maxScale={1.45}
      magneticDistance={120}
      showLabels={true}
      position="bottom"
      variant="glass"
      autoHide={true}
    />
  );
};
