
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const tubeImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Entrance
      gsap.from('.hero-content', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.from('.hero-main-img', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: 'expo.out'
      });

      gsap.from('.hero-tube-img', {
        y: 100,
        rotation: 45,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'back.out(1.7)'
      });

      // Scroll-based Parallax
      gsap.to('.hero-bg-text', {
        yPercent: 40,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.hero-main-img', {
        yPercent: -10,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.hero-tube-img', {
        yPercent: -30,
        rotation: 5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Subtle float animation for the tube
      gsap.to('.hero-tube-img', {
        y: '+=20',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-20 pt-24 overflow-hidden bg-zinc-950"
    >
      {/* Background Parallax Layer */}
      <div className="hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[25vw] font-oswald font-black uppercase text-zinc-900/40 tracking-tighter leading-none opacity-30 select-none">
          FORGE
        </h2>
      </div>

      {/* Main Content Info */}
      <div className="hero-content flex-1 z-20 space-y-8 mb-12 md:mb-0">
        <div className="space-y-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-white"
          />
          <h1 className="text-7xl md:text-9xl font-oswald font-bold leading-none tracking-tighter text-white">
            MASTER <br /> YOUR <br /> ARMOR.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-lg leading-relaxed">
            The world is abrasive. Your skin doesn't have to be. 
            Deploy precision-engineered defense.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => handleNavigate('arsenal')}
            className="group relative bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] overflow-hidden"
          >
            <span className="relative z-10">THE ARSENAL</span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <button 
            onClick={() => handleNavigate('advisor')}
            className="border border-zinc-800 text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all"
          >
            AI DIAGNOSIS
          </button>
        </div>
      </div>

      {/* Hero Visuals (The "PNG" cutout aesthetic) */}
      <div className="flex-1 relative w-full h-[600px] md:h-screen flex items-center justify-center">
        {/* Main Macho Portrait - styled to look like a cutout */}
        <div 
          ref={mainImageRef}
          className="hero-main-img relative z-10 w-[85%] md:w-[75%] h-full flex items-center justify-center"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <img 
              src="./hero.png" 
              alt="Elite Male Care"
              className="w-full h-full object-cover grayscale brightness-90 hover:brightness-110 hover:grayscale-0 transition-all duration-1000"
            />
            {/* Gradient Overlay for integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
        
        {/* Floating Product "PNG" Cutout */}
        <div 
          ref={tubeImageRef}
          className="hero-tube-img absolute bottom-10 right-0 md:-right-10 z-30 w-1/2 md:w-2/3 max-w-[350px] pointer-events-none"
        >
          <img 
            src="./hero_product.png" 
            alt="Obsidian Tube"
            className="w-full drop-shadow-[0_50px_60px_rgba(255,255,255,0.1)] rotate-[-12deg]"
          />
          {/* Subtle reflection light effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl -z-10 opacity-30"></div>
        </div>

        {/* Ambient background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-zinc-900/20 blur-[120px] rounded-full -z-10"></div>
      </div>

      {/* Scroll indicator with brand quote */}
      <div className="absolute bottom-10 left-8 md:left-20 flex items-center gap-6 opacity-40">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 italic max-w-[150px]">
          "Refinement is the greatest strength."
        </p>
      </div>
    </section>
  );
};

export default Hero;
