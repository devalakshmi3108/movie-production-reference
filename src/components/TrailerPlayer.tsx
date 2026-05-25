/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Play, Pause, RotateCcw, Volume2, VolumeX, Eye, 
  Settings, Maximize, CircleDot, Database, Music, Sliders 
} from 'lucide-react';
import { Movie } from '../types';

interface TrailerPlayerProps {
  movie: Movie;
  onClose: () => void;
  key?: string;
}

const DIALOGUES: Record<string, string[]> = {
  sirai: [
    "[SYSTEM MAINCODE]: Automated penal system online.",
    "Prisoner 4087-X detected in Cell Block Zeta.",
    "The physical environment is morphing.",
    "Is this reality, or just neural node 4 testing our minds?",
    "We have to hack the core server node before the final sequence renders!"
  ],
  'ninety-six': [
    "I haven't seen her in twenty-two autumns...",
    "Everything seems exactly the same as our high-school days.",
    "Except, we are no longer those kids.",
    "If time is a continuous coordinate, why does it feel so static?",
    "Let's walk down this visual memory corridor one last time."
  ],
  'oh-my-kadavule': [
    "You messed up big time, friend.",
    "But what if the golden ticket was absolute?",
    "Rewriting destiny is not a regular ticket.",
    "Initiating second-chance spatial simulation loop...",
    "God operates on real-time neural architecture. Play carefully!"
  ],
  'project-deiva-thirumagal': [
    "Pure human emotion, amplified via AI telemetry.",
    "He doesn't interact with the world like you do.",
    "A journey of a father and daughter.",
    "Singapore central hub processing complete.",
    "The final rendering pipeline has initiated."
  ]
};

export default function TrailerPlayer({ movie, onClose }: TrailerPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeDialogue, setActiveDialogue] = useState('');
  const [fxStrength, setFxStrength] = useState(50);
  const [selectedChannel, setSelectedChannel] = useState<'ATMOS' | 'DTS' | 'STEREO'>('ATMOS');
  
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate through dialogue phrases
  useEffect(() => {
    if (!isPlaying) return;
    const lines = DIALOGUES[movie.id] || DIALOGUES['sirai'];
    let index = 0;
    
    setActiveDialogue(lines[0]);

    const timer = setInterval(() => {
      index = (index + 1) % lines.length;
      setActiveDialogue(lines[index]);
    }, 4500);

    return () => clearInterval(timer);
  }, [movie.id, isPlaying]);

  // Simulate progress playback
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop trailer preview
          }
          return prev + 1;
        });
      }, 700);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none">
      
      {/* Top HUD Stats & Exit */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <CircleDot className="text-red-500 w-3 h-3 animate-pulse" />
          <div className="font-mono text-[10px] tracking-widest text-neutral-400">
            CINEMATIC FEED // STREAM_ID: <span className="text-cyan-400">UNAI-{movie.id.toUpperCase()}</span>
          </div>
          <span className="hidden sm:inline font-mono text-[9px] text-neutral-600 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
            94 TFLOPS RECONSTRUCTION
          </span>
        </div>
        
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/15 transition-all cursor-pointer font-mono text-[11px] tracking-widest"
        >
          <X className="w-4 h-4" /> CLOSE MONITOR
        </button>
      </div>

      {/* Main Immersive Stage */}
      <div className="relative flex-1 my-4 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center bg-zinc-950">
        
        {/* Synthetic Video Shaders and Poster background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={movie.backgroundUrl || movie.posterUrl} 
            alt="Theater stage" 
            className={`w-full h-full object-cover select-none transition-all duration-1000 ${
              isPlaying ? 'scale-110 blur-sm brightness-[0.3]' : 'scale-100 blur-[2px] brightness-[0.2]'
            }`}
          />
          
          {/* Animated Matrix scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.04),_rgba(0,255,0,0.01),_rgba(0,0,255,0.04))] bg-[length:100%_4px,_6px_100%] pointer-events-none opacity-40" />
          
          {/* Radial mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000000_95%)]" />
        </div>

        {/* Center UI Overlay (Dialogue script rendering) */}
        <div className="relative z-10 w-full max-w-2xl text-center px-4 flex flex-col items-center justify-center min-h-[120px] pointer-events-none">
          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div
                key={activeDialogue}
                initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                transition={{ duration: 0.6 }}
                className="font-sans font-medium text-lg md:text-2xl text-white tracking-wide text-glow leading-relaxed"
              >
                {activeDialogue}
              </motion.div>
            )}
          </AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              className="text-neutral-500 font-mono text-xs uppercase tracking-widest"
            >
              PAUSED // PRESS PLAY TO UNSUSPEND SPATIAL FEED
            </motion.div>
          )}

          {/* Futuristic Audio waves / equalizer bars */}
          {isPlaying && (
            <div className="flex justify-center items-end gap-1 mt-8 h-12">
              {Array.from({ length: 24 }).map((_, i) => {
                const randomHeight = Math.floor(Math.random() * (40 - 8 + 1)) + 8;
                return (
                  <motion.div
                    key={i}
                    animate={{ height: [8, randomHeight, 8] }}
                    transition={{
                      duration: 0.4 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{ opacity: (100 - i * 3) / 100 }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* HUD Overlay with active specs */}
        <div className="absolute bottom-6 left-6 hidden md:block z-10 p-4 rounded-lg bg-neutral-950/60 backdrop-blur-md border border-white/5 max-w-xs">
          <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-1">UNAI ENGINE TELEMETRY</span>
          <div className="text-white text-xs font-mono flex items-center gap-2">
            <Sliders className="w-3 h-3 text-cyan-400" />
            FX Depth: {fxStrength}%
          </div>
          <div className="text-white text-xs font-mono flex items-center gap-2 mt-1">
            <Music className="w-3.5 h-3.5 text-blue-400" />
            Channel: <span className="text-blue-400">{selectedChannel} Spatial 7.1</span>
          </div>
          <div className="text-white text-xs font-mono flex items-center gap-2 mt-1">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            Source Bitrate: 450 Mbps
          </div>
        </div>

        {/* Video stream warning bottom-right */}
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-neutral-500 text-right uppercase z-10 leading-normal pointer-events-none">
          <span>FPS: 120 // AUTO-RENDERED ON DEPLOYMENT HOST</span> <br/>
          <span>LATENCY: 0.12ms // SENSORS: CALIBRATED</span>
        </div>
      </div>

      {/* Control Station Panel */}
      <div className="z-10 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 w-full max-w-6xl mx-auto flex flex-col gap-4">
        
        {/* Timeline Slider / Progress */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neutral-400">
            {`0:${progress.toString().padStart(2, '0')}`}
          </span>
          <div 
            className="flex-1 h-1.5 bg-neutral-800 rounded-full relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const nextPercentage = Math.round((clickX / rect.width) * 100);
              setProgress(nextPercentage);
            }}
          >
            {/* Filled timeline */}
            <div 
              style={{ width: `${progress}%` }}
              className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,191,255,0.8)] relative"
            >
              {/* Tracker bulb */}
              <div className="absolute -right-1.5 -top-1 w-3.5 h-3.5 bg-white border border-cyan-400 rounded-full flex items-center justify-center shadow">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
          <span className="font-mono text-xs text-neutral-400">02:30</span>
        </div>

        {/* Buttons and Settings row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Play / Action Suite */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-neutral-950" /> : <Play className="w-5 h-5 fill-neutral-950" />}
            </button>
            
            <button
              onClick={() => setProgress(0)}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 text-white rounded-lg cursor-pointer"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-2 pl-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-neutral-400 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range"
                min="0"
                max="100"
                disabled={isMuted}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20 accent-cyan-400 cursor-pointer h-1.5"
              />
            </div>
          </div>

          {/* FX Slider & Spatial audio switcher (Immersive simulation) */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Post FX Strength:</span>
              <input 
                type="range"
                min="10"
                max="100"
                value={fxStrength}
                onChange={(e) => setFxStrength(Number(e.target.value))}
                className="w-24 accent-blue-500 h-1.5"
              />
              <span className="font-mono text-xs text-neutral-200">{fxStrength}%</span>
            </div>

            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1 gap-1">
              {(['ATMOS', 'DTS', 'STEREO'] as const).map((channel) => (
                <button
                  key={channel}
                  onClick={() => setSelectedChannel(channel)}
                  className={`text-[9px] font-mono px-2 py-1 rounded transition-colors cursor-pointer ${
                    selectedChannel === channel 
                      ? 'bg-cyan-400 text-neutral-950 font-bold' 
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
            
            <button className="p-2 text-neutral-400 hover:text-white cursor-pointer">
              <Maximize className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
