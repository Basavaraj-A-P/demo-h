import React from 'react';
import { BreathingPhase } from '../hooks/useBreathingSession';

interface BreathingCoreProps {
  phase: BreathingPhase;
  isPaused: boolean;
}

export const BreathingCore: React.FC<BreathingCoreProps> = ({ phase, isPaused }) => {
  
  const getPhaseClass = () => {
    switch (phase) {
      case 'Inhale': return 'anim-inhale';
      case 'Hold': return 'anim-hold';
      case 'Exhale': return 'anim-exhale';
      default: return 'anim-inhale';
    }
  };

  return (
    <div className={`relative w-[min(80vw,45vh,320px)] aspect-square flex items-center justify-center ${isPaused ? 'paused' : ''} ${getPhaseClass()}`}>
      

      {/* Flowing Organic Energy Ribbons */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rings-wrapper">
        <div className="organic-ring border-[1.5px]" style={{ width: '95%', height: '100%', borderColor: 'rgba(255,255,255,0.8)', borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%', animation: 'spin-slow 20s linear infinite' }}></div>
        <div className="organic-ring border-[1.5px]" style={{ width: '102%', height: '94%', borderColor: 'rgba(156,119,255,0.7)', borderRadius: '50% 50% 40% 60% / 60% 40% 55% 45%', animation: 'spin-slow-reverse 25s linear infinite' }}></div>
        <div className="organic-ring border-[1px]" style={{ width: '92%', height: '105%', borderColor: 'rgba(255,255,255,0.6)', borderRadius: '40% 60% 55% 45% / 50% 50% 40% 60%', animation: 'spin-slow 30s linear infinite' }}></div>
        <div className="organic-ring border-[1px]" style={{ width: '106%', height: '98%', borderColor: 'rgba(209,197,232,0.8)', borderRadius: '60% 40% 50% 50% / 45% 55% 60% 40%', animation: 'spin-slow-reverse 35s linear infinite' }}></div>
        <div className="organic-ring border-[2px]" style={{ width: '100%', height: '100%', borderColor: 'rgba(156,119,255,0.5)', borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%', animation: 'spin-slow 40s linear infinite' }}></div>
        <div className="organic-ring border-[1px]" style={{ width: '108%', height: '92%', borderColor: 'rgba(255,255,255,0.5)', borderRadius: '42% 58% 48% 52% / 52% 48% 58% 42%', animation: 'spin-slow-reverse 45s linear infinite' }}></div>
      </div>

      {/* Main Orb Image */}
      <div className="anim-layer main-orb absolute w-[70%] h-[70%] rounded-full flex items-center justify-center pointer-events-none">
        <img 
          src="/assets/breathing/orb.webp" 
          alt="Breathing Orb" 
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        />
      </div>

      {/* Smiling Face Overlay (Stable, not scaled) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg viewBox="0 0 80 40" fill="none" className="w-[30%] mt-[10%] opacity-90">
          {/* Left Eye */}
          <path d="M18 18C22 23 28 23 32 18" stroke="#321A6B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right Eye */}
          <path d="M48 18C52 23 58 23 62 18" stroke="#321A6B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Smile */}
          <path d="M34 32C37 36 43 36 46 32" stroke="#321A6B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
