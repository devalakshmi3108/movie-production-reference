/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Cpu, RefreshCw, KeyRound, Copy, Check } from 'lucide-react';

interface PreAccessModalProps {
  onClose: () => void;
  key?: string;
}

export default function PreAccessModal({ onClose }: PreAccessModalProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'FORM' | 'GENERATING' | 'SUCCESS'>('FORM');
  const [generatedKey, setGeneratedKey] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Check if they already have an enrollment key in localStorage
  useEffect(() => {
    const existingKey = localStorage.getItem('cinema_prestige_preaccess_key');
    if (existingKey) {
      setGeneratedKey(existingKey);
      setStep('SUCCESS');
    }
  }, []);

  const handleEnroll = (e: FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!email || !email.includes('@')) {
      setErrorText('Please enter a valid neural protocol routing address (email).');
      return;
    }

    setStep('GENERATING');

    // Simulate futuristic cryptographic compilation
    setTimeout(() => {
      const segment1 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const segment2 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const segment3 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const key = `CP-${segment1}-${segment2}-${segment3}-SEC`;
      
      localStorage.setItem('cinema_prestige_preaccess_key', key);
      setGeneratedKey(key);
      setStep('SUCCESS');
    }, 2800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clearEnrollment = () => {
    localStorage.removeItem('cinema_prestige_preaccess_key');
    setGeneratedKey('');
    setEmail('');
    setStep('FORM');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="relative w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 bg-neutral-900 overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Decorative Grid backdrop effects */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle, #00dbe9 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close pre-access panel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Input Enrollment form */}
            {step === 'FORM' && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight mb-2 uppercase">
                  PROJECT DEIVA PRE-ACCESS
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
                  Register your communication signal to reserve a high-priority render block stream when the Project Deiva Thirumagal protocol compilation finishes.
                </p>

                <form onSubmit={handleEnroll} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] text-neutral-500 uppercase tracking-widest mb-1.5">
                      SECURE COMMUNICATION SIGNAL (EMAIL)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. signal@prestige-nodes.io"
                        className="w-full bg-neutral-950 border border-white/10 focus:border-cyan-400 rounded-lg py-3 pl-11 pr-4 text-sm text-white font-mono placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                      />
                    </div>
                    {errorText && (
                      <p className="font-mono text-[10px] text-red-400 mt-2">
                        {errorText}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] transition-transform duration-200"
                  >
                    <Cpu className="w-4 h-4" />
                    ENROLL SECURE CREDENTIALS
                  </button>
                </form>

                <div className="text-[9px] font-mono text-neutral-500 text-center mt-6">
                  SSL-AES-256 SYMMETRIC ENCRYPTION // ENROLL ID: DEIVA-X8
                </div>
              </motion.div>
            )}

            {/* Step 2: Generational compiling splash */}
            {step === 'GENERATING' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-6">
                  <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin" />
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border border-cyan-400/40 opacity-50 blur-sm"
                  />
                </div>
                
                <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold mb-2">
                  GENERATING HOLOGRAPHIC ACCESS PROTOCOL...
                </h4>
                <p className="text-[10px] text-neutral-500 max-w-xs font-mono">
                  Compiling AES cryptographic matrices. Splitting communication threads across Singapore Core Nodes.
                </p>
              </motion.div>
            )}

            {/* Step 3: Success details displaying credentials */}
            {step === 'SUCCESS' && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center justify-center mb-6">
                  <KeyRound className="w-6 h-6 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
                </div>

                <div className="inline-block bg-emerald-950/60 border border-emerald-500/30 rounded-full px-3 py-1 mb-4">
                  <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
                    PLATINUM PRE-ACCESS VERIFIED
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight mb-2 uppercase">
                  ENROLLMENT COMPLETE
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                  Your signal is indexed. Below is your authentic, self-custodied Prestige authentication protocol pass key. Keep this recorded for final launch decrypt.
                </p>

                {/* Key output holder */}
                <div className="p-4 bg-neutral-950 border border-white/5 rounded-lg flex items-center justify-between font-mono text-sm text-neutral-100 mb-6">
                  <span className="text-cyan-400 tracking-wider text-xs md:text-sm font-bold">
                    {generatedKey}
                  </span>
                  
                  <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy access key"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white rounded-lg font-mono text-xs tracking-widest cursor-pointer transition-colors"
                  >
                    DISMISS SCREEN
                  </button>
                  <button
                    onClick={clearEnrollment}
                    className="py-3 px-3 hover:bg-red-950/10 text-neutral-600 hover:text-red-400 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    title="Clear current credential loops"
                  >
                    RESET
                  </button>
                </div>

                <div className="text-[9px] font-mono text-neutral-500 text-center mt-6 uppercase">
                  Awaiting Singapore stream launch // Node: Connected
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
