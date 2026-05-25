/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutGrid, Cpu } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  key?: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-40 bg-neutral-950/40 backdrop-blur-[40px] border-b border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between h-20">
        <button 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="relative flex items-center justify-center">
            <Cpu className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(0,219,233,0.5)] transition-transform duration-500 group-hover:rotate-180" />
            <span className="absolute w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-tighter text-cyan-400 drop-shadow-[0_0_12px_rgba(0,219,233,0.4)]">
            CINEMA PRESTIGE
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'hero', label: 'UNIVERSE' },
            { id: 'productions', label: 'PRODUCTIONS' },
            { id: 'services', label: 'PIPELINES' },
            { id: 'labs', label: 'TECH LABS' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-mono text-xs tracking-widest pb-1 transition-all duration-300 relative border-b-2 hover:text-cyan-300 ${
                  isActive 
                    ? 'text-cyan-400 border-cyan-400 drop-shadow-[0_0_8px_rgba(0,219,233,0.6)]' 
                    : 'text-neutral-400 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button 
          onClick={() => onNavigate('labs')}
          className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 rounded-lg hover:bg-white/5 cursor-pointer"
          title="Open Tech Labs Render Sandbox"
        >
          <LayoutGrid className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
