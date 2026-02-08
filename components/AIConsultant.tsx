
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkinConsultation } from '../services/geminiService';
import { ConsultationResponse } from '../types';
import { SKIN_SAMPLES } from '../constants';
import { Shield, Target, Activity, Zap, Quote } from 'lucide-react';

const TacticalLoader = () => {
  const steps = ["TARGETING...", "MAPPING...", "ANALYZING...", "FORGING..."];
  const [currentStep, setCurrentStep] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8 p-12 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative">
      <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-px bg-white/20 z-20" />
      <Activity className="text-white animate-pulse" size={64} />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">{steps[currentStep]}</p>
    </div>
  );
};

const AIConsultant: React.FC = () => {
  const [skinType, setSkinType] = useState('Oily');
  const [concerns, setConcerns] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResponse | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const minLoad = new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const [data] = await Promise.all([getSkinConsultation(skinType, concerns), minLoad]);
      setResult(data);
    } catch (err) {
      setResult(SKIN_SAMPLES['Oily']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-32 px-8 md:px-20 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-zinc-900 pb-12">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.8em] text-zinc-600 block">Editorial Vol. 01</span>
            <h2 className="text-7xl md:text-9xl font-oswald font-black tracking-tighter uppercase leading-none">THE ADVISOR</h2>
          </div>
          <div className="max-w-xs text-right">
            <Quote className="ml-auto text-zinc-800 mb-4" size={40} />
            <p className="text-zinc-500 italic text-sm">"The modern man doesn't age; he matures under precision engineering."</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Form Side - Magazine Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 group">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
                alt="Tactical Grooming" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-oswald font-bold text-white uppercase tracking-tighter">INTELLIGENCE HUB</h3>
                <p className="text-zinc-400 text-xs tracking-widest uppercase">System Status: Active</p>
              </div>
            </div>

            <form onSubmit={handleConsult} className="space-y-6 bg-zinc-900/30 p-8 border border-zinc-900 rounded-xl">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Bio Type</label>
                <select value={skinType} onChange={(e) => setSkinType(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white uppercase text-xs font-bold focus:outline-none appearance-none">
                  <option value="Oily">Oily Control</option>
                  <option value="Dry">Maximum Hydration</option>
                  <option value="Combat-Worn (Sensitive)">Sensitive Defense</option>
                  <option value="Normal (Standard)">Elite Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Deployment Concerns</label>
                <textarea value={concerns} onChange={(e) => setConcerns(e.target.value)} placeholder="LIST SPECIFIC ISSUES..." className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white min-h-[100px] text-xs font-bold uppercase focus:outline-none resize-none" />
              </div>
              <button disabled={loading} className="w-full bg-white text-black font-black py-5 uppercase tracking-[0.4em] text-xs hover:bg-zinc-200 transition-all">
                {loading ? 'CALCULATING...' : 'GENERATE STRATEGY'}
              </button>
            </form>
          </div>

          {/* Results Side - The "Magazine Layout" Result */}
          <div className="lg:col-span-7 h-full min-h-[600px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                  <TacticalLoader />
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col justify-between space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-white" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">The Daily Protocol</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {result.routine.map((step, idx) => (
                        <div key={idx} className="group border-l border-zinc-800 pl-6 space-y-2 py-2 hover:border-white transition-colors">
                          <span className="text-zinc-700 font-oswald text-4xl block group-hover:text-white/20 transition-colors">0{idx + 1}</span>
                          <p className="text-zinc-400 text-sm leading-relaxed uppercase font-bold tracking-tight">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Shield size={160} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">STRATEGIST ADVISORY</h4>
                      <p className="text-2xl md:text-3xl font-oswald font-bold text-white uppercase italic tracking-tighter leading-tight">
                        "{result.advice}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">REQUIRED ARSENAL</h5>
                    <div className="flex flex-wrap gap-4">
                      {result.recommendedProducts.map((p, i) => (
                        <span key={i} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{p}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full border-2 border-dashed border-zinc-900 rounded-xl flex items-center justify-center p-20 text-center flex-col gap-6">
                   <Target size={60} className="text-zinc-900" />
                   <p className="text-zinc-800 text-xs font-black uppercase tracking-[0.5em]">Input Parameters To Retrieve Intel</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
