/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Film, Play, Cpu, Target, Clock, Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
  onPlayTrailer: (movie: Movie) => void;
  onOpenSandbox: (movie: Movie) => void;
  key?: string;
}

export default function MovieDetailsModal({
  movie,
  onClose,
  onPlayTrailer,
  onOpenSandbox,
}: MovieDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        className="relative w-full max-w-4xl glass-panel rounded-2xl overflow-hidden shadow-2xl bg-neutral-900/90 max-h-[90vh] overflow-y-auto"
      >
        {/* Absolute Background image layer */}
        <div className="absolute inset-0 z-0 h-80 opacity-20 filter blur-sm">
          <img
            src={movie.backgroundUrl || movie.posterUrl}
            alt="backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-950" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 pointer-events-auto"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 mt-12 md:mt-6">
          {/* Left Column: Poster & Action Cards */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="aspect-[2/3] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg group relative">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => onPlayTrailer(movie)}
                  className="p-4 bg-cyan-400 text-neutral-950 rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-neutral-950" />
                </button>
              </div>
            </div>

            <button
              onClick={() => onPlayTrailer(movie)}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-mono text-xs tracking-widest rounded-lg flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-neutral-950" />
              PLAY IMPRESSIVE TRAILER
            </button>

            <button
              onClick={() => onOpenSandbox(movie)}
              className="w-full py-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              NEURAL SANDBOX
            </button>
          </div>

          {/* Right Column: Detailed info & Pipeline specs */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              {/* Header metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-xs text-cyan-400 border border-cyan-400/30 px-2.5 py-0.5 roundedbg-cyan-950/20">
                  {movie.genre}
                </span>
                <span className="text-neutral-500 text-sm">{movie.year}</span>
                {movie.duration && (
                  <span className="text-neutral-500 text-sm">• {movie.duration}</span>
                )}
                {movie.rating && (
                  <span className="text-neutral-500 text-sm border border-neutral-700 px-1.5 py-0.2 rounded text-[10px]">
                    {movie.rating}
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tighter mb-4">
                {movie.title}
              </h2>

              <p className="text-neutral-400 font-mono text-xs tracking-wider uppercase mb-4 italic text-glow">
                "{movie.tagline}"
              </p>

              <div className="h-px bg-white/10 my-4" />

              {/* Synopsis */}
              <div className="mb-6">
                <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-2">
                  Project Synopsis
                </span>
                <p className="text-neutral-200 text-sm md:text-base leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Director info */}
              <div className="mb-6 flex gap-12 text-sm">
                <div>
                  <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-1">
                    Director
                  </span>
                  <span className="text-neutral-200 font-medium">{movie.director}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-1">
                    Production Engine
                  </span>
                  <span className="text-cyan-400 font-medium font-mono text-xs">UNAI TECH v6</span>
                </div>
              </div>

              <div className="h-px bg-white/10 my-4" />

              {/* Pipeline Specs HUD stats */}
              {movie.pipelineSpecs && (
                <div className="mb-4">
                  <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-3">
                    Hyper-Fidelity Pipeline Telemetry
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex gap-3 items-start">
                      <Film className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">
                          Imaging Sensor
                        </span>
                        <span className="text-neutral-200 text-xs font-medium">
                          {movie.pipelineSpecs.camera}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex gap-3 items-start">
                      <Cpu className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">
                          Denoise & Grade Frame
                        </span>
                        <span className="text-neutral-200 text-xs font-medium">
                          {movie.pipelineSpecs.unaiVersion}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex gap-3 items-start">
                      <Clock className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">
                          Cluster Render Time
                        </span>
                        <span className="text-cyan-400 text-xs font-mono">
                          {movie.pipelineSpecs.renderTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex gap-3 items-start">
                      <Target className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">
                          Output Capture target
                        </span>
                        <span className="text-neutral-200 text-xs font-medium">
                          {movie.pipelineSpecs.fpsTarget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[10px] text-neutral-500 mt-6 font-mono border-t border-neutral-800/60 pt-4 flex justify-between">
              <span>SECURITY PROTOCOL: SSL-AES-256</span>
              <span>RENDER ID: UNAI-{movie.id.toUpperCase()}-X90</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
