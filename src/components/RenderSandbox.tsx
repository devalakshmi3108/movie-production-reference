/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Cpu, Award, Zap, HardDrive, RefreshCw, AlertTriangle, CheckCircle, Terminal 
} from 'lucide-react';
import { Movie } from '../types';

interface RenderSandboxProps {
  initialMovie?: Movie | null;
  onClose?: () => void;
}

const SHADER_OPTIONS = [
  { id: '8k-raw', label: '8K NEURAL RAW', desc: 'Full bit depth with zero compression logs' },
  { id: '4k-prores', label: '4K PRORES 4444', desc: 'Indicated for stage editing & chroma meshes' },
  { id: 'hologram', label: 'VOLUMETRIC STAGE 3D', desc: 'Spatial projections target holography' }
];

const CLUSTER_NODES = [
  { id: 'sg', label: 'SINGAPORE HUB-C', tflops: 1024, load: '82%' },
  { id: 'mum', label: 'MUMBAI APEX-Y', tflops: 512, load: '41%' },
  { id: 'sv', label: 'SILICON VALLEY AI-D', tflops: 2048, load: '95%' }
];

export default function RenderSandbox({ initialMovie, onClose }: RenderSandboxProps) {
  const [selectedMovieId, setSelectedMovieId] = useState(initialMovie?.id || 'sirai');
  const [format, setFormat] = useState('8k-raw');
  const [node, setNode] = useState('sg');
  
  const [frameInterpolation, setFrameInterpolation] = useState(true);
  const [denoiseLevel, setDenoiseLevel] = useState('ultra');
  
  const [status, setStatus] = useState<'STANDBY' | 'ACQUIRING' | 'RENDERING' | 'COMPILING' | 'SUCCESS'>('STANDBY');
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const consoleBottomRef = useRef<HTMLDivElement | null>(null);

  const activeMovieImageUrl = 
    selectedMovieId === 'sirai' 
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjzbBXDSMOV87HXLsfonp5xylQU3m7iY21YmjUNAWlg6Exk58fjZPx6Ja59EMiSWJwJt2sjd0qga9i9il0k3N0qOqYxfp2Ar2FQ9EdD8ph-u3Tv98jEfReES9Wl3AQY-ETJPBLZDhHjCG__CpjMmLhHmiyEc-PwUsE32B6Z8GYhpvgF1DbE3OuNyhQKLNBlwurBhIX_a-Pas3I99dkDyvPc6W25SLomC2YvuhCkoDIwaFQX1uM2cpCexphTdGfMMBmTGmF8qESouI'
      : selectedMovieId === 'ninety-six'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaWxB3aFVyj4utHLHX26pGamzRC9D37GMfwWCjXl4huJRzvQzXFpymr_sUfJTE67TOEldj5roFnMMi9m8mXQS5lgBFJ-ZSXzuRUTqiYtVNaeLDJVqoOtWe_DDn4NqDumZTyO_60Pm8n-nTQs6Jaa4-SsUEN4HePkGdaPWjlxgHpyXysaekBMJH2bEnstucH3ERxDdN8k7utviTs5u2D2TrkMwx0IUo0V-Zo4tTDMMI6MnTxqlpq-6_tVkBOW6E1VUlzvsMTMy5yNE'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHD_uBvI_3Wags03PcXxwRcWI3Y0kwiq9DWhZvKtN1R91-5C-eMqsOFJtpNbfT5Q6Grc-hf2wzI7dyClEZaWkjIYDOJIASJp5hLeam33ttVkMz_TMaaPwE3SjzpqMhi7VtxkCDWq08mK9UmEjzylZIiq8u5bezF6RNQORrjN3EU8vRZaMJtdwVwZ0CXYjNe_jpapreWnyPDYA-RSJNdNXNFfjcfX0smh1YxHrIvbGQrdSiXgkUt91BYrXAUtCBUuKh0e1YHNybkfU';

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    };
  }, []);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().slice(11, 19);
    setConsoleLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleLaunchRender = () => {
    if (status !== 'STANDBY' && status !== 'SUCCESS') return;
    
    setStatus('ACQUIRING');
    setProgress(0);
    setConsoleLogs([]);

    addLog(`INITIALIZING CONNECTION TO CLUSTER NODE ${node.toUpperCase()}...`);
    addLog(`UNAI PIPELINE CORE DETECTED. ALLOCATION STANDARD CHANNELS.`);
    
    timerRef.current = setTimeout(() => {
      setStatus('RENDERING');
      addLog(`CLUSTER GRANTED. ALLOCATING 32x NEURAL TENSORS.`);
      addLog(`COMPUTE SPEED VERIFIED: ${CLUSTER_NODES.find(n => n.id === node)?.tflops} TFLOPS NOMINAL CAPACITY.`);
      addLog(`INTERPOLATION STATE: ${frameInterpolation ? 'ACTIVE [4x INTERPOLATION]' : 'IMMUTABLE'}.`);
      addLog(`NOISE PROTOCOL DIRECTIVE: ${denoiseLevel.toUpperCase()}.`);
      addLog(`ENGINE IS COUPLING SUB-VOXELS FOR SEQUENCE [${selectedMovieId.toUpperCase()}].`);
      
      const speed = 150; //ms per tick
      let count = 0;
      
      logIntervalRef.current = setInterval(() => {
        count += 4;
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(logIntervalRef.current!);
            setStatus('COMPILING');
            addLog(`RENDERING CAPTURE STAGE READY. STABILIZATION SEQUENCE IN PROCESS...`);
            
            // final compiling stage
            timerRef.current = setTimeout(() => {
              setStatus('SUCCESS');
              addLog(`COMPILATION SUCCESSFUL. GRAPHICS ENGINE FLUSHED.`);
              addLog(`TOTAL FRAME COUNT CAPTURED: 240 // LOSS DEVIATION: 0.00032%`);
              addLog(`SYSTEM NODE DISENGAGED. COOLDOWN INITIATED.`);
            }, 1800);
            
            return 100;
          }
          return prev + 4;
        });

        // Add fun random procedural logs
        if (count % 12 === 0) {
          const frameNum = Math.floor(count * 2.4);
          addLog(`RENDERED FRAME ${frameNum}/240 - TRACING ${frameInterpolation ? '128' : '64'} SUB-RAYS PER VOXEL.`);
        } else if (count % 20 === 0) {
          addLog(`AVX PROTOCOL: DEEP SPLICING SUB-FRAME INTERVALS TO SHIMMER STAGE.`);
        }
      }, speed);

    }, 1500);
  };

  return (
    <section id="labs" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Module Title */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#00dbe9] uppercase block mb-2">
              UNAI TECH NODE LAB
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-none uppercase">
              RENDER SANDBOX
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm">
            Configure raw neural parameters and trigger near-future generative visual denoising pipelines. Watch real-time spatial logs stream straight from cluster stacks.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Station - Left column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between glass-panel rounded-xl p-6 border border-white/5 bg-neutral-900/40">
            
            <div className="space-y-6">
              
              {/* Option 1: Sequence Select */}
              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                  01 // SELECT SEQUENCE STAGE
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sirai', label: 'SIRAI' },
                    { id: 'ninety-six', label: '96 ROMANCE' },
                    { id: 'oh-my-kadavule', label: 'FANTASY' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        if (status === 'STANDBY' || status === 'SUCCESS') {
                          setSelectedMovieId(m.id);
                        }
                      }}
                      className={`py-2 px-1 rounded text-center text-xs font-mono transition-all border cursor-pointer ${
                        selectedMovieId === m.id 
                          ? 'bg-cyan-400 text-neutral-950 border-cyan-400 font-bold shadow-[0_0_12px_rgba(0,219,233,0.3)]' 
                          : 'bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Target File format */}
              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                  02 // CHOOSE TARGET CODING FORMAT
                </span>
                <div className="space-y-2">
                  {SHADER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        if (status === 'STANDBY' || status === 'SUCCESS') setFormat(opt.id);
                      }}
                      className={`w-full p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer ${
                        format === opt.id 
                          ? 'bg-blue-600/20 text-blue-300 border-blue-500 shadow-[0_0_15px_rgba(0,71,255,0.2)]'
                          : 'bg-neutral-950/60 text-neutral-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-mono text-xs font-bold">{opt.label}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        format === opt.id ? 'border-blue-400 bg-blue-500' : 'border-neutral-700'
                      }`}>
                        {format === opt.id && <div className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Compute Node Locations */}
              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">
                  03 // DEPLOY CLUSTER SITE node
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {CLUSTER_NODES.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        if (status === 'STANDBY' || status === 'SUCCESS') setNode(n.id);
                      }}
                      className={`p-2 rounded text-left transition-all border cursor-pointer ${
                        node === n.id 
                          ? 'bg-neutral-950 border-cyan-400' 
                          : 'bg-neutral-950/40 text-neutral-400 border-white/5'
                      }`}
                    >
                      <div className={`font-mono text-xs font-bold ${node === n.id ? 'text-cyan-400' : 'text-neutral-300'}`}>
                        {n.label}
                      </div>
                      <div className="text-[9px] text-neutral-500 mt-1 font-mono uppercase">
                        Cap: {n.tflops} TF
                      </div>
                      <div className="text-[9px] text-neutral-500 font-mono uppercase">
                        Load: {n.load}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/40 border border-white/5">
                  <div className="flex gap-2 items-center">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="font-mono text-xs text-neutral-200 block font-bold">4x Frame Synthesis</span>
                      <span className="text-[9px] text-neutral-500 uppercase block">Generates motion intervals</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (status === 'STANDBY' || status === 'SUCCESS') setFrameInterpolation(!frameInterpolation);
                    }}
                    className={`w-10 h-6.5 rounded-full p-1.5 transition-colors cursor-pointer ${
                      frameInterpolation ? 'bg-cyan-400' : 'bg-neutral-800'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-neutral-950 transition-transform ${
                      frameInterpolation ? 'translate-x-[14px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/40 border border-white/5">
                  <div className="flex gap-2 items-center">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <div>
                      <span className="font-mono text-xs text-neutral-200 block font-bold">Neural Denoising</span>
                      <span className="text-[9px] text-neutral-500 uppercase block">Spatial resolution enhancer</span>
                    </div>
                  </div>
                  <select
                    disabled={status !== 'STANDBY' && status !== 'SUCCESS'}
                    value={denoiseLevel}
                    onChange={(e) => setDenoiseLevel(e.target.value)}
                    className="bg-neutral-950 border border-white/10 rounded font-mono text-xs text-neutral-300 px-2 py-1 cursor-pointer"
                  >
                    <option value="minimal">MINIMAL [FAST]</option>
                    <option value="high">HIGH [BALANCED]</option>
                    <option value="ultra">ULTRA [DENOISE]</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Launch Action triggers */}
            <div className="pt-6 border-t border-white/5 mt-4">
              <button
                disabled={status !== 'STANDBY' && status !== 'SUCCESS'}
                onClick={handleLaunchRender}
                className={`w-full py-4 rounded-lg font-mono text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  status === 'STANDBY' || status === 'SUCCESS'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(0,71,255,0.4)]'
                    : 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                }`}
              >
                {status === 'STANDBY' && (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    LAUNCH ENGINE COMPUTE LOOP
                  </>
                )}
                {status === 'ACQUIRING' && 'ACQUIRING CLUSTER BLOCK...'}
                {status === 'RENDERING' && `RENDERING SECTIONS [${progress}%]`}
                {status === 'COMPILING' && 'STABILIZING HIGH RESOLUTION FILE...'}
                {status === 'SUCCESS' && (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    SEQUENCE VERIFIED // RERUN ENGINE
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Simulated Rendering Monitor Screen - Right (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Screen Component */}
            <div className="relative aspect-[16/9] w-full bg-neutral-950 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
              
              {/* Image Output representing selected sequence */}
              <img 
                src={activeMovieImageUrl} 
                alt="Active render output"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 select-none ${
                  status === 'SUCCESS' 
                    ? 'blur-0 saturate-100' 
                    : status === 'RENDERING' 
                    ? 'blur-[20px] saturate-50 brightness-75' 
                    : status === 'COMPILING' 
                    ? 'blur-[8px] saturate-75 opacity-90'
                    : 'blur-[35px] opacity-40 grayscale'
                }`}
              />

              {/* Simulated mesh wireframe effect superimposed when rendering */}
              <AnimatePresence>
                {status === 'RENDERING' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#000000_90%)]"
                    style={{
                      backgroundImage: `radial-gradient(circle, #00dbe9 1px, transparent 1.5px)`,
                      backgroundSize: '16px 16px'
                    }}
                  />
                )}
              </AnimatePresence>

              {/* HUD scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.03)_50%,rgba(255,255,255,0)_100%)] bg-[length:100%_4px] pointer-events-none" />
              
              {/* Laser active Scanbar sweeping */}
              {status === 'RENDERING' && (
                <motion.div 
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,219,233,0.8)] z-10"
                />
              )}

              {/* Frame Labels & Telemetry */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-[#00dbe9] bg-neutral-950/80 backdrop-blur border border-[#00dbe9]/20 px-2 py-1 rounded">
                MONITOR STATE: <span className="font-bold">{status}</span>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[9px] text-neutral-400 bg-neutral-950/80 backdrop-blur border border-white/5 px-2 py-1 rounded">
                STAGE ID: <span className="text-white">STAGE_VOL_{selectedMovieId.toUpperCase()}</span>
              </div>

              {/* Centered Standby messages / compiled flags */}
              <div className="relative z-10 p-6 text-center max-w-sm">
                <AnimatePresence mode="wait">
                  {status === 'STANDBY' && (
                    <motion.div
                      key="standby"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="p-4 bg-neutral-950/80 backdrop-blur border border-white/10 rounded-xl"
                    >
                      <Terminal className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
                      <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-1">
                        DEVICE IN COLD STANDBY
                      </h4>
                      <p className="text-[10px] text-neutral-500">
                        Awaiting launch call. Select sequence and configure pipeline targets in the left console.
                      </p>
                    </motion.div>
                  )}

                  {status === 'ACQUIRING' && (
                    <motion.div
                      key="acquiring"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-2.5"
                    >
                      <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                      <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                        Acquiring Compute Grid...
                      </div>
                    </motion.div>
                  )}

                  {status === 'SUCCESS' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-5 bg-neutral-950/95 backdrop-blur border border-emerald-500/30 rounded-xl shadow-2xl"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
                      <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-bold mb-1">
                        PIPELINE COMPILE SUCCESSFUL
                      </h4>
                      <p className="text-[10px] text-neutral-400 mb-3">
                        Frame sequence fully denoised, upscale compiled, and cached on CDN edge blocks.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-neutral-500 uppercase border-t border-neutral-800/80 pt-2 text-left">
                        <div>Size: <span className="text-white">12.4 GB</span></div>
                        <div>Loss: <span className="text-white">0.0003%</span></div>
                        <div>Render: <span className="text-white">4.2s</span></div>
                        <div>Precision: <span className="text-white">FP32</span></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress HUD bar */}
              {(status === 'RENDERING' || status === 'COMPILING') && (
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur p-3 rounded-lg border border-white/5 z-10">
                  <div className="flex justify-between items-center mb-1 text-[9px] font-mono uppercase text-neutral-400">
                    <span>{status === 'RENDERING' ? 'PIXEL RECONSTRUCTION STATE' : 'COMPILING PACKETS'}</span>
                    <span className="text-cyan-400 font-bold">{progress}%</span>
                  </div>
                  <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(0,219,233,0.8)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

            </div>

            {/* JetBrains Mono Shell Terminal Console (Height adjusted to fit neatly) */}
            <div className="flex-1 min-h-[160px] max-h-[220px] bg-[#0e0e0e] rounded-xl border border-white/5 p-4 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                <span>SYSTEM LOG MONITOR / COMPUTE_DIAG_SHELL</span>
                <span className="text-green-500 animate-pulse">● FEED SECURE</span>
              </div>
              
              <div className="flex-1 overflow-y-auto font-mono text-[10px] text-neutral-400 space-y-1.5 scrollbar-thin select-text">
                {consoleLogs.length === 0 ? (
                  <div className="text-neutral-600 italic">Console idle. Awaiting render protocol call...</div>
                ) : (
                  consoleLogs.map((log, index) => (
                    <div key={index} className={
                      log.includes('SUCCESS') || log.includes('COMPILATION') 
                        ? 'text-green-400' 
                        : log.includes('INITIALIZING') || log.includes('GEOMETRY') 
                        ? 'text-cyan-400'
                        : log.includes('DENOISE') || log.includes('Cap:')
                        ? 'text-yellow-400'
                        : 'text-neutral-400'
                    }>
                      {log}
                    </div>
                  ))
                )}
                <div ref={consoleBottomRef} />
              </div>

              <div className="border-t border-white/5 pt-2 mt-2 flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                <span>Memory: 12.8vRAM allocated</span>
                <span>Node Feed: OK</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
