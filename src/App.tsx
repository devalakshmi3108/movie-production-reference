/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Play, Cpu, Eye, ArrowUpRight, 
  Info, Sparkles, Volume2, ShieldAlert, Check, X, Code, Star, Heart
} from 'lucide-react';

import { Movie, PipelineService } from './types';
import { MOVIES, UPCOMING_MOVIE, PIPELINE_SERVICES, GALLERY_IMAGES } from './data';

import Header from './components/Header';
import MovieDetailsModal from './components/MovieDetailsModal';
import TrailerPlayer from './components/TrailerPlayer';
import RenderSandbox from './components/RenderSandbox';
import PreAccessModal from './components/PreAccessModal';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [isPreaccessOpen, setIsPreaccessOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activePipelineDetail, setActivePipelineDetail] = useState<PipelineService | null>(null);

  // Dynamic countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 18,
    minutes: 9,
    seconds: 52
  });

  // Dynamic simulation parameters in background HUD
  const [renderNodeTflops, setRenderNodeTflops] = useState(1024);
  const [renderNodeLoad, setRenderNodeLoad] = useState(74);

  const productionsContainerRef = useRef<HTMLDivElement>(null);

  // Live countdown timer execution
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          // Loop default starting state if counter has reached absolute zero
          return { days: 42, hours: 18, minutes: 9, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Simulating small shifts in renderer workloads
  useEffect(() => {
    const workloadInterval = setInterval(() => {
      setRenderNodeTflops((prev) => {
        const offset = Math.floor(Math.random() * 21) - 10; // offset of -10 to +10 TFLOPS
        const current = prev + offset;
        return current > 950 && current < 1150 ? current : 1024;
      });
      setRenderNodeLoad((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2; // offset of -2 to +2%
        const current = prev + offset;
        return current > 50 && current < 95 ? current : 74;
      });
    }, 3000);

    return () => clearInterval(workloadInterval);
  }, []);

  // Page segment scanning section (highlights proper header tab based on scroll coordinate)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      
      const heroSec = document.getElementById('hero');
      const prodSec = document.getElementById('productions');
      const servSec = document.getElementById('services');
      const labsSec = document.getElementById('labs');

      if (labsSec && scrollPos >= labsSec.offsetTop) {
        setActiveSection('labs');
      } else if (servSec && scrollPos >= servSec.offsetTop) {
        setActiveSection('services');
      } else if (prodSec && scrollPos >= prodSec.offsetTop) {
        setActiveSection('productions');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const docElement = document.getElementById(sectionId);
    if (docElement) {
      docElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const scrollProductions = (direction: 'left' | 'right') => {
    if (productionsContainerRef.current) {
      const scrollVal = direction === 'left' ? -360 : 360;
      productionsContainerRef.current.scrollBy({ left: scrollVal, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-sans antialiased overflow-x-hidden min-h-screen relative">
      
      {/* Dynamic Cursor Light Overlay backdrops */}
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" 
        style={{ top: '20vh', left: '70vw' }}
      />
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none translate-x-1/4 translate-y-1/3 z-0" 
        style={{ bottom: '10vh', left: '10vw' }}
      />

      {/* FIXED TopAppBar */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="relative z-10 pt-20">
        
        {/* HERO INSTANCE */}
        <section 
          id="hero" 
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-16"
        >
          {/* Glowing matrix assets */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkpeBB5TLtAkT9EEx_BshAOq8tbm9h6PY0LwwpsgT_kAlic4vNmmSTpIQ4OgDoUaP8ospDRHkTGfjz_s7mkqYMWVF4LOSaxk7GF7Rej0EfUnDazu_xd6kEjOY9sU1-GNW0aVK52BxP8PjvKKiRAdO2kt3UXUMSnNV-WpcldpKD8ddwEbLSut29l1by_3yZpyJI4ijmGDaoSGiHvjYZ-KYfQ68VUYHmIzPoE5oxsdwPJpyTncM_nReYCJcc7BJ3rKURLcI15Dm3T8w" 
              alt="Cinematic hero backdrop" 
              className="w-full h-full object-cover opacity-50 brightness-75 scale-105 pointer-events-none select-none filter contrast-125"
            />
            {/* Soft gradient covers */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-transparent to-[#131313]" />

            {/* Futuristic Tech scan-lines */}
            <div className="absolute top-1/4 -left-1/4 w-full h-[1px] bg-cyan-400/20 blur-sm rotate-12" />
            <div className="absolute bottom-1/3 -right-1/4 w-full h-[1.5px] bg-blue-500/25 blur-md -rotate-6" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Powered Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="hero-powered-badge"
              className="inline-flex items-center gap-2 glass-panel px-6 py-2 rounded-full mb-8 border border-cyan-400/30 shadow-[0_0_15px_rgba(0,219,233,0.15)] bg-neutral-950/45 cursor-help"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-ping" />
              <span className="font-mono text-[10px] md:text-xs text-[#00dbe9] tracking-[0.25em]">
                POWERED BY UNAI TECH
              </span>
            </motion.div>

            {/* Giant display title */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              id="hero-main-title"
              className="font-display font-black text-4xl sm:text-6xl md:text-8xl leading-[1.05] text-white mb-8 tracking-tighter uppercase"
            >
              ENGINEERING{' '}
              <span className="text-[#00dbe9] text-glow select-all relative">
                CINEMATIC
              </span>{' '}
              UNIVERSES
            </motion.h1>

            {/* Mini explanatory description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              id="hero-subtitle"
              className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light"
            >
              Merging high-fidelity film production with near-future AI architecture. We don't just tell stories; we construct immersive digital realities and hyper-reconstructed worlds.
            </motion.p>

            {/* CTAs row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              id="hero-actions-container"
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
            >
              <button
                id="cta-explore"
                onClick={() => handleNavigate('productions')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 font-mono text-xs tracking-widest rounded text-white font-bold transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_25px_rgba(0,71,255,0.4)] cursor-pointer"
              >
                EXPLORE PRODUCTIONS
              </button>
              <button
                id="cta-trailers"
                onClick={() => {
                  setPlayingMovie(MOVIES[0]);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-neutral-900/60 border border-white/10 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest rounded transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                WATCH TRAILERS
              </button>
            </motion.div>
          </div>

          {/* Floating HUD status block on bottom-right - Dynamically changing values */}
          <div 
            id="hero-hud-card"
            className="hidden lg:block absolute bottom-12 right-12 z-10 animate-pulse-slow duration-1000"
          >
            <div className="glass-panel p-5 rounded-xl border-l-4 border-[#00dbe9] bg-neutral-950/80 min-w-[210px] shadow-lg">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block mb-1">
                ACTIVE RENDER SYSTEMS
              </span>
              <div id="hud-flops-tally" className="font-display font-medium text-lg text-[#00dbe9] drop-shadow-[0_0_5px_rgba(0,219,233,0.4)]">
                {renderNodeTflops} TFLOPS
              </div>
              <div className="w-full bg-neutral-850 h-1 mt-3 rounded-full overflow-hidden">
                <div 
                  id="hud-flops-bar"
                  className="h-full bg-[#00dbe9] transition-all duration-1000 shadow-[0_0_8px_rgba(0,219,233,1)]"
                  style={{ width: `${renderNodeLoad}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[8px] text-neutral-500 mt-2 uppercase">
                <span>Load Ratio</span>
                <span id="hud-load-percentage" className="text-white">{renderNodeLoad}%</span>
              </div>
            </div>
          </div>
        </section>


        {/* ABOUT / ACHIEVEMENTS SECTION */}
        <section 
          id="achievements" 
          className="py-24 bg-[#131313]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Studio preview representation (Grid cover cards) */}
              <div id="about-image-card" className="relative group overflow-hidden rounded-xl">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-[#00dbe9] rounded-xl blur opacity-20 group-hover:opacity-35 transition-all duration-700 pointer-events-none" />
                <div className="relative glass-panel rounded-xl overflow-hidden aspect-video border border-white/5 bg-neutral-900/60 shadow-xl">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAXAQvM3oY0x_fd89tqZuKe5u30sp5jBQ3SKxC0eyJFS-5gZUyo334PntJt3XuVFXtUKCAgTT-PbPlpm-kCTkcy7vXQfmVNJ-ywpvg0HBM61HBFmxWX6ifYzDFzUJPk9qzBS2qMlpmi1_DQ8tcJulCSal1ipfQ_zghCBKmv-WPAUSt0pXFadiNsYYu6nhs_-FvT6zIlmNE8Tyx-76V5IpXAq9aSXFxmI4WhnBhrhRiv4zTosd1sy9XufWGyW4kx97a-ObCjvMhM3Q" 
                    alt="Cinema Prestige Labs" 
                    className="w-full h-full object-cover select-none filter contrast-110 saturate-110"
                  />
                  {/* Subtle glass gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text segment & Stats details */}
              <div id="about-text-panel" className="flex flex-col justify-center">
                <span className="font-mono text-xs tracking-widest text-blue-400 block mb-3 uppercase">
                  OUR ACHIEVEMENTS
                </span>
                <h2 id="about-title" className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
                  THE APEX OF DIGITAL STORYTELLING
                </h2>
                <p id="about-descr-1" className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-sans font-light">
                  Since our inception, Cinema Prestige has been at the forefront of the cinematic revolution. Leveraging UNAI Tech's proprietary AI rendering pipelines, we achieve extreme physical light synthesis and visual fidelity once thought impossible. We compress massive post-production workflows into instantaneous real-time computing blocks.
                </p>

                {/* Sub-stats indicators */}
                <div id="about-stats-container" className="grid grid-cols-2 gap-4">
                  
                  <div 
                    id="stats-card-awards"
                    className="p-5 glass-panel rounded-lg border-b-2 border-blue-500/50 hover:border-blue-400 transition-colors duration-300"
                  >
                    <span className="font-display font-black text-3xl text-[#00dbe9] block mb-1 drop-shadow-[0_0_8px_rgba(0,219,233,0.3)]">
                      15+
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">
                      Global Tech Awards
                    </span>
                  </div>

                  <div 
                    id="stats-card-reach"
                    className="p-5 glass-panel rounded-lg border-b-2 border-[#00dbe9]/50 hover:border-[#00dbe9] transition-colors duration-300"
                  >
                    <span className="font-display font-black text-3xl text-[#00dbe9] block mb-1 drop-shadow-[0_0_8px_rgba(0,219,233,0.3)]">
                      200M+
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">
                      Global Audience Reach
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>


        {/* FEATURED PROJECTS COVER CAROUSEL */}
        <section 
          id="productions" 
          className="py-24 bg-neutral-950 border-t border-neutral-900/40"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            
            {/* Header segmentation info */}
            <div id="cur-prod-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="font-mono text-xs text-[#00dbe9] tracking-widest block mb-2 uppercase">
                  FEATURED PROJECTS
                </span>
                <h2 id="cur-prod-title" className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                  CURRENT PRODUCTIONS
                </h2>
              </div>

              {/* Chevron arrows to control slide items index */}
              <div id="carousel-arrows-container" className="flex gap-2">
                <button
                  id="btn-scroll-left"
                  onClick={() => scrollProductions('left')}
                  className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-white/5 hover:border-cyan-400 text-neutral-300 hover:text-white transition-all cursor-pointer bg-neutral-900/60"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="btn-scroll-right"
                  onClick={() => scrollProductions('right')}
                  className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-white/5 hover:border-cyan-400 text-neutral-300 hover:text-white transition-all cursor-pointer bg-neutral-900/60"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Snap horizontal scrolling container */}
            <div 
              id="movie-cards-scroller"
              ref={productionsContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
            >
              {MOVIES.map((movie) => (
                <div 
                  key={movie.id}
                  id={`movie-card-${movie.id}`}
                  className="min-w-[280px] sm:min-w-[360px] md:min-w-[400px] snap-center group relative cursor-pointer"
                >
                  <div className="relative glass-panel rounded-xl overflow-hidden border border-white/5 group-hover:border-[#00dbe9]/50 transition-all duration-500 shadow-lg flex flex-col justify-end min-h-[500px]">
                    
                    {/* Background poster */}
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none select-none filter saturate-75 group-hover:saturate-100"
                    />

                    {/* Shimmer / Vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />

                    {/* Bottom Content Detail card */}
                    <div className="relative z-10 p-6 sm:p-8 w-full">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-none uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                        {movie.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-[#00dbe9]/20 text-[#00dbe9] font-mono text-[9px] uppercase tracking-widest font-medium">
                          {movie.genre}
                        </span>
                        <span className="text-neutral-400 font-mono text-[10px]">{movie.year}</span>
                      </div>

                      {/* Expanding Hover CTA deck */}
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingMovie(movie);
                          }}
                          className="px-5 py-2.5 bg-white text-neutral-950 font-mono text-xs font-bold rounded flex items-center gap-1.5 hover:bg-neutral-200 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-neutral-950" /> PLAY
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMovie(movie);
                          }}
                          className="px-5 py-2.5 glass-panel text-white hover:bg-white/10 font-mono text-xs rounded border border-white/15 cursor-pointer"
                        >
                          DETAILS
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* NEAR FUTURE UPCOMING MOVIE BLOCK */}
        <section 
          id="upcoming" 
          className="py-24 bg-[#131313] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            
            <div id="up-title-header" className="mb-12">
              <span className="font-mono text-xs tracking-widest text-[#00dbe9] block mb-2 uppercase">
                NEAR FUTURE RELEASES
              </span>
              <h2 id="up-title-heading" className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                UPCOMING PROTOCOLS
              </h2>
            </div>

            {/* Glowing billboard card segment design */}
            <div 
              id="upcoming-billboard-card"
              className="relative glass-panel rounded-2xl p-6 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center overflow-hidden border border-white/10 bg-neutral-900/20"
            >
              <div className="absolute inset-0 bg-[#00dbe9]/5 mix-blend-color opacity-10 pointer-events-none" />
              
              {/* Poster frame */}
              <div id="upcoming-poster-pane" className="relative z-10 w-full lg:w-5/12 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-white/5 shadow-blue-900/20 max-w-sm md:max-w-md">
                <img 
                  src={UPCOMING_MOVIE.posterUrl} 
                  alt="Project Deiva" 
                  className="w-full h-full object-cover filter brightness-95 saturate-105 select-none"
                />
              </div>

              {/* Text specifics & Dynamic active timer block */}
              <div id="upcoming-details-pane" className="relative z-10 w-full lg:w-7/12 flex flex-col justify-center items-start">
                
                <h3 id="upcoming-prod-title" className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
                  PROJECT DEIVA <br/>
                  <span className="text-[#00dbe9] text-glow select-all">THIRUMAGAL</span>
                </h3>

                <p id="upcoming-prod-synopsis" className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-sans font-light">
                  A soul-stirring narrative exploring deep parent-child human connections through a futuristic, high-fidelity lens. Combining advanced markerless motion tracking and near-future AI synthesis.
                </p>

                {/* Counter clock HUD columns */}
                <div id="upcoming-countdown-row" className="flex flex-wrap gap-6 md:gap-10 mb-8 border-y border-white/5 py-6 w-full max-w-lg">
                  <div className="flex flex-col items-center">
                    <span id="countdown-days" className="font-display font-bold text-3xl sm:text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-1">
                      Days
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span id="countdown-hours" className="font-display font-bold text-3xl sm:text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-1">
                      Hours
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span id="countdown-minutes" className="font-display font-bold text-3xl sm:text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-1">
                      Mins
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span id="countdown-seconds" className="font-display font-bold text-3xl sm:text-4xl text-cyan-400 drop-shadow-[0_0_10px_rgba(0,219,233,0.3)] min-w-[42px] text-center">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[9px] text-cyan-400/80 uppercase tracking-widest mt-1">
                      Secs
                    </span>
                  </div>
                </div>

                <button
                  id="btn-get-access"
                  onClick={() => setIsPreaccessOpen(true)}
                  className="px-8 py-4 border-2 border-[#00dbe9] text-[#00dbe9] hover:bg-[#00dbe9] hover:text-neutral-950 font-mono text-xs font-semibold tracking-widest rounded transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(0,219,233,0.15)] cursor-pointer"
                >
                  GET PRE-ACCESS
                </button>

              </div>

            </div>

          </div>
        </section>


        {/* SERVICES PIPELINES COMPETENCY GRID */}
        <section 
          id="services" 
          className="py-24 bg-neutral-950 border-t border-neutral-900/30"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
            
            <div id="serv-header-pane" className="mb-16">
              <span className="font-mono text-xs text-blue-400 tracking-widest block mb-2 uppercase">
                OUR CORE COMPETENCIES
              </span>
              <h2 id="serv-header-title" className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                PRODUCTION PIPELINES
              </h2>
            </div>

            {/* 8 GRID pipeline items */}
            <div id="pipelines-competency-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {PIPELINE_SERVICES.map((serv) => (
                <div
                  key={serv.id}
                  id={`pipeline-block-${serv.id}`}
                  onClick={() => {
                    // Clicking displays details instantly
                    setActivePipelineDetail(activePipelineDetail?.id === serv.id ? null : serv);
                  }}
                  className={`p-6 md:p-8 rounded-xl border text-center transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center relative ${
                    activePipelineDetail?.id === serv.id
                      ? 'bg-neutral-900 border-[#00dbe9] shadow-[0_0_25px_rgba(0,219,233,0.15)] scale-[1.02]'
                      : 'glass-panel border-white/5 hover:border-blue-600 hover:scale-[1.01] bg-neutral-900/30'
                  }`}
                >
                  {/* Pipeline icons mapping */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-neutral-950/60 mb-4 group-hover:scale-110 transition-transform">
                    {serv.id === 'film-production' && <span className="font-mono text-cyan-400 text-lg">🎬</span>}
                    {serv.id === 'vfx-architecture' && <span className="font-mono text-blue-400 text-lg">✨</span>}
                    {serv.id === 'ai-visual-effects' && <span className="font-mono text-cyan-400 text-lg">🧠</span>}
                    {serv.id === 'spatial-audio' && <span className="font-mono text-blue-400 text-lg">🔊</span>}
                    {serv.id === 'virtual-scenography' && <span className="font-mono text-cyan-400 text-lg">📐</span>}
                    {serv.id === 'digital-distribution' && <span className="font-mono text-blue-400 text-lg">🕸️</span>}
                    {serv.id === 'motion-capture' && <span className="font-mono text-cyan-400 text-lg">📷</span>}
                    {serv.id === 'audience-data-labs' && <span className="font-mono text-blue-400 text-lg">📊</span>}
                  </div>

                  <h4 className="font-mono text-xs text-white font-bold uppercase tracking-wider mb-2">
                    {serv.title}
                  </h4>

                  <span className="font-mono text-[8px] text-neutral-500 block uppercase">
                    SYS-ID: {serv.systemCode}
                  </span>

                  {/* Active telemetry info expandable inline drawer */}
                  <AnimatePresence>
                    {activePipelineDetail?.id === serv.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-white/10 w-full text-left font-mono"
                      >
                        <p className="text-[10px] text-neutral-400 leading-normal font-sans mb-3">
                          {serv.description}
                        </p>
                        
                        <div className="flex justify-between text-[8px] uppercase text-neutral-500 mb-1">
                          <span>Usage load</span>
                          <span className="text-[#00dbe9]">{serv.utilization}%</span>
                        </div>
                        <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden mb-2">
                          <div className="bg-[#00dbe9] h-full" style={{ width: `${serv.utilization}%` }} />
                        </div>

                        <div className="flex justify-between text-[8px] uppercase text-neutral-500">
                          <span>Signal State</span>
                          <span className={
                            serv.status === 'ACTIVE' 
                              ? 'text-green-400 font-bold' 
                              : serv.status === 'STANDBY' 
                              ? 'text-yellow-400 font-bold' 
                              : 'text-red-400'
                          }>
                            {serv.status}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* RENDER SANDBOX INTERACTIVE LAB COMPONENT */}
        <RenderSandbox initialMovie={MOVIES[0]} />


        {/* MEDIA GALLERY SECTION */}
        <section 
          id="gallery" 
          className="py-24 bg-[#131313]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            
            <div id="gal-header-pane" className="mb-12">
              <span className="font-mono text-xs tracking-widest text-[#00dbe9] block mb-2 uppercase">
                VISUAL ARCHIVE
              </span>
              <h2 id="gal-header-title" className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                CINEMATIC FRAGMENTS
              </h2>
            </div>

            {/* Masonry Columns gallery */}
            <div id="gallery-masonry-grid" className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {GALLERY_IMAGES.map((img, i) => (
                <div 
                  key={i}
                  id={`gallery-item-card-${i}`}
                  onClick={() => {
                    // Find matching movie or show poster closeup details
                    const siraiMatch = MOVIES.find(m => m.id === 'sirai');
                    if (siraiMatch) setSelectedMovie(siraiMatch);
                  }}
                  className="relative overflow-hidden rounded-xl glass-panel border border-white/5 group bg-neutral-905 bg-neutral-950/10 cursor-pointer shadow"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] pointer-events-none select-none filter brightness-95"
                  />
                  
                  {/* Dynamic hover glass trigger overlay */}
                  <div className="absolute inset-0 bg-[#00dbe9]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2.5px] pointer-events-none">
                    <div className="p-3 bg-neutral-950/80 border border-[#00dbe9]/30 rounded-full flex items-center justify-center text-white">
                      <Eye className="w-6 h-6 text-[#00dbe9] shadow" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER INSTANCE */}
      <footer id="app-footer" className="w-full relative bg-neutral-950 border-t-2 border-blue-600 shadow-[0_-4px_30px_rgba(0,71,2x55,0.15)] z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col items-center gap-8">
          
          <div className="flex items-center gap-3">
            <Cpu className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(0,219,233,0.5)]" />
            <span className="font-display text-xl md:text-2xl tracking-widest text-white font-bold uppercase select-none">
              CINEMA PRESTIGE
            </span>
          </div>

          <nav id="footer-navigation" className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { id: 'hero', label: 'UNIVERSE' },
              { id: 'productions', label: 'PRODUCTIONS' },
              { id: 'services', label: 'PIPELINES' },
              { id: 'labs', label: 'TECH LABS' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className="font-mono text-xs tracking-widest text-neutral-400 hover:text-cyan-300 transition-colors pointer-events-auto cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

          {/* Legal references */}
          <div id="footer-legals-container" className="flex flex-col md:flex-row justify-between items-center w-full gap-4 opacity-75 font-mono text-[10px]">
            <p className="text-neutral-500 uppercase tracking-wider">
              © 2026 CINEMA PRESTIGE. POWERED BY UNAI TECH.
            </p>
            <div className="flex gap-6 text-neutral-500">
              <span className="hover:text-neutral-300 cursor-help" title="Active standard layer protocols verified">
                SECURE AES COGNITIVE INTERFACE
              </span>
              <span>PRIVACY PROTOCOLS</span>
            </div>
          </div>

        </div>
      </footer>

      {/* INTERACTIVE POPUP / MODAL FLOATING DECKS */}
      <AnimatePresence>
        
        {/* Detail descriptor info Modal */}
        {selectedMovie && (
          <MovieDetailsModal 
            key="details-modal"
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onPlayTrailer={(m) => {
              setSelectedMovie(null);
              setPlayingMovie(m);
            }}
            onOpenSandbox={(m) => {
              setSelectedMovie(null);
              const element = document.getElementById('labs');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        )}

        {/* Cinematic theater scene trailer simulator */}
        {playingMovie && (
          <TrailerPlayer 
            key="trailer-stage"
            movie={playingMovie}
            onClose={() => setPlayingMovie(null)}
          />
        )}

        {/* Secure key generation Preaccess list */}
        {isPreaccessOpen && (
          <PreAccessModal 
            key="enroll-stage"
            onClose={() => setIsPreaccessOpen(false)}
          />
        )}

      </AnimatePresence>

    </div>
  );
}
