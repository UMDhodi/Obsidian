
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdvisorSection from './components/AdvisorSection';
import ArsenalSection from './components/ArsenalSection';
import QuoteTicker from './components/QuoteTicker';
import AIConsultant from './components/AIConsultant';
import CartOverlay from './components/CartOverlay';
import { MACHO_IMAGES } from './constants';
import { Product, CartItem } from './types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Timer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // GSAP for non-Framer elements
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });
    return () => ctx.revert();
  }, [currentPage]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onNavigate={setCurrentPage} />
            <QuoteTicker />
            <section className="py-40 px-8 bg-zinc-950">
              <div className="mb-24 text-center space-y-4 max-w-5xl mx-auto flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-700">Visual Aesthetic</span>
                <h3 className="section-reveal text-6xl md:text-9xl font-oswald font-black uppercase tracking-tighter text-white">MACHO MOOD.</h3>
                <p className="text-zinc-600 text-sm font-medium uppercase tracking-widest mt-8">Obsidian is not a product. It's an identity.</p>
              </div>

              {/* Macho Imagery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-32">
                {MACHO_IMAGES.map((img, idx) => (
                  <div key={idx} className="section-reveal relative overflow-hidden group aspect-[3/4] rounded-3xl border border-zinc-900 shadow-2xl">
                    <img src={img} alt="Macho Mood" className="w-full h-full object-cover grayscale transition-all duration-[3000ms] group-hover:scale-125 group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">TACTICAL ARCHIVE — 00{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic Discount Banner (Reliable Visibility Fix) */}
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-7xl mx-auto group w-full z-20"
              >
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-white/[0.03] blur-[150px] rounded-full scale-90 pointer-events-none" />
                
                <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] flex flex-col md:flex-row items-center p-6 md:p-14 gap-12 backdrop-blur-md">
                  
                  {/* Floating Product Cutout */}
                  <div className="relative w-full md:w-1/3 aspect-square flex items-center justify-center">
                     <motion.div
                       animate={{ 
                         y: [0, -25, 0],
                         rotate: [-2, 2, -2]
                       }}
                       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                       className="relative w-full h-full"
                     >
                        <img 
                          src="./product_skin_2.png" 
                          alt="Titan Skin Cream" 
                          className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(255,255,255,0.1)] scale-110"
                        />
                     </motion.div>
                     <div className="absolute top-0 right-0 md:-top-4 md:-right-4 bg-red-600 text-white font-black px-6 py-2 text-[9px] uppercase tracking-[0.4em] rounded-bl-2xl shadow-2xl z-30 animate-pulse">
                       LIVE DEPLOYMENT
                     </div>
                  </div>

                  <div className="flex-1 text-left space-y-10">
                    <div className="flex items-center gap-4 text-zinc-600">
                      <div className="w-12 h-px bg-zinc-800" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] flex items-center gap-3">
                         <Timer size={14} className="text-red-500" /> Strategic Window: 24H Remaining
                      </span>
                    </div>
                    
                    <h4 className="text-5xl md:text-8xl font-oswald font-black text-white uppercase tracking-tighter leading-[0.85]">
                      CLAIM <br /> 30% DISCOUNT <br /> <span className="text-zinc-700">ON FIRST SHIPMENT.</span>
                    </h4>
                    
                    <div className="flex flex-wrap gap-6 pt-6">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigator.clipboard.writeText("FORGED30");
                          alert("CODE COPIED: FORGED30");
                        }}
                        className="bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl tracking-tighter flex items-center gap-6 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-all border-b-4 border-zinc-400 active:border-b-0 active:translate-y-1"
                      >
                        <Zap size={24} fill="black" />
                        CODE: FORGED30
                      </motion.button>
                      
                      <div className="bg-zinc-950/80 text-zinc-500 px-10 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 border border-zinc-800 shadow-inner">
                        <ShieldCheck size={20} className="text-zinc-600" />
                        ENCRYPTED CHECKOUT
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="text-center mt-32">
                 <p className="text-zinc-800 text-[10px] font-black uppercase tracking-[1em]">Archive End — Strategic Deployment Active</p>
              </div>
            </section>
            
            <section className="py-20 text-center">
              <button onClick={() => setCurrentPage('arsenal')} className="text-zinc-600 font-black uppercase tracking-[0.5em] text-[10px] hover:text-white transition-colors">ENTER THE ARMORY</button>
            </section>
          </motion.div>
        );
      case 'arsenal':
        return (
          <motion.div key="arsenal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArsenalSection 
              onAddToCart={addToCart} 
              onUpdateQuantity={updateQuantity}
              onToggleWishlist={toggleWishlist}
              cart={cart}
              wishlist={wishlist}
            />
          </motion.div>
        );
      case 'advisor':
        return (
          <motion.div key="advisor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="pt-24 bg-zinc-950">
              <AdvisorSection 
                onAddToCart={addToCart} 
                onUpdateQuantity={updateQuantity}
                onToggleWishlist={toggleWishlist}
                cart={cart}
                wishlist={wishlist}
              />
              <AIConsultant />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black font-inter">
      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <CartOverlay isOpen={isCartOpen} items={cart} onClose={() => setIsCartOpen(false)} onRemove={removeFromCart} />
      <main className="min-h-[80vh]">
        <AnimatePresence mode="wait">
          {renderPageContent()}
        </AnimatePresence>
      </main>
      <footer className="py-24 px-8 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          <div className="text-4xl font-oswald font-black tracking-tighter text-white cursor-pointer" onClick={() => setCurrentPage('home')}>OBSIDIAN</div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
            <button onClick={() => setCurrentPage('arsenal')} className="hover:text-white transition-colors">Arsenal</button>
            <button onClick={() => setCurrentPage('advisor')} className="hover:text-white transition-colors">Advisor</button>
          </div>
          <div className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.8em] text-center">
            &copy; 2024 OBSIDIAN GLOBAL ARMORY. FORGED IN TRUTH.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
