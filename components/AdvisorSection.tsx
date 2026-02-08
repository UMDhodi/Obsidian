
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Zap, Shield, PackageX, Plus, Minus, Heart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';

interface AdvisorSectionProps {
  onAddToCart: (p: Product) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleWishlist: (id: string) => void;
  cart: CartItem[];
  wishlist: string[];
}

const AdvisorSection: React.FC<AdvisorSectionProps> = ({ 
  onAddToCart, 
  onUpdateQuantity, 
  onToggleWishlist,
  cart,
  wishlist
}) => {
  const categories = [
    { name: 'SKIN DEFENSE', items: PRODUCTS.filter(p => p.category === 'skin') },
    { name: 'HAIR STRUCTURE', items: PRODUCTS.filter(p => p.category === 'hair') },
    { name: 'FRAGRANCE INTEL', items: PRODUCTS.filter(p => p.category === 'fragrance') },
  ];

  const getProductQty = (id: string) => cart.find(item => item.id === id)?.quantity || 0;
  const isInWishlist = (id: string) => wishlist.includes(id);

  return (
    <div className="py-20 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40">
          <div className="lg:col-span-8 space-y-12">
            <span className="text-zinc-600 font-black uppercase tracking-[0.8em] text-[10px]">Edition No. 04 — Obsidian Advisor</span>
            <h2 className="text-8xl md:text-[10rem] font-oswald font-black uppercase tracking-tighter leading-none text-white">
              REFINEMENT <br /> IS <br /> POWER.
            </h2>
            <div className="max-w-xl text-zinc-400 font-medium leading-relaxed text-lg space-y-6">
              <p>The modern man operates in a world of friction. His armor must be precision-engineered. From the follicle to the pore, every detail is a variable in the equation of dominance.</p>
              <div className="h-px w-20 bg-zinc-800" />
              <p className="text-sm uppercase tracking-widest">A manifesto on masculine grooming excellence.</p>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden grayscale group border border-zinc-900 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" alt="Advisor Mood" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
               <div className="absolute bottom-8 left-8 right-8">
                 <Quote size={40} className="text-zinc-600 mb-4" />
                 <p className="font-oswald font-bold text-white text-2xl italic tracking-tighter leading-tight">"Discipline in ritual leads to authority in presence."</p>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-40">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-16">
              <div className="flex items-center gap-12">
                <h3 className="text-4xl md:text-6xl font-oswald font-black uppercase tracking-tighter text-white">{cat.name}</h3>
                <div className="flex-1 h-px bg-zinc-900" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {cat.items.map((item, i) => {
                  const qty = getProductQty(item.id);
                  const wish = isInWishlist(item.id);
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`space-y-8 group ${!item.inStock ? 'opacity-60 grayscale' : ''}`}
                    >
                      <div className="relative aspect-[4/5] bg-zinc-900/40 rounded-3xl overflow-hidden flex items-center justify-center p-12 border border-zinc-900 group-hover:border-zinc-700 transition-colors">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className={`max-h-full object-contain drop-shadow-[0_40px_40px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110 ${!item.inStock ? 'brightness-50' : ''}`}
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="bg-red-600/20 backdrop-blur-md border border-red-600/40 px-6 py-2 rounded-sm rotate-[-8deg] shadow-2xl">
                              <span className="text-red-500 font-oswald font-bold text-xs uppercase tracking-[0.4em]">Unit Depleted</span>
                            </div>
                          </div>
                        )}
                        <button 
                          onClick={() => item.inStock && onToggleWishlist(item.id)}
                          className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all ${
                            wish ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/20 hover:border-white'
                          } ${!item.inStock ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          <Heart size={16} fill={wish ? 'currentColor' : 'none'} strokeWidth={wish ? 0 : 2} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-2xl font-oswald font-bold uppercase tracking-tighter text-white">{item.name}</h4>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.tagline}</p>
                          </div>
                          <span className={`font-oswald font-bold text-xl ${!item.inStock ? 'text-zinc-700' : 'text-white'}`}>
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-zinc-600 text-sm leading-relaxed">{item.description}</p>
                        
                        <div className="flex gap-4">
                          {qty > 0 ? (
                            <div className="flex-1 flex items-center bg-white rounded-full overflow-hidden border border-white">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="flex-1 py-4 text-black hover:bg-zinc-100 transition-colors flex justify-center border-r border-zinc-200"
                              >
                                <Minus size={14} />
                              </button>
                              <div className="flex-[2] text-center text-[10px] font-black text-black uppercase tracking-widest">{qty} IN KIT</div>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="flex-1 py-4 text-black hover:bg-zinc-100 transition-colors flex justify-center border-l border-zinc-200"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => item.inStock && onAddToCart(item)}
                              disabled={!item.inStock}
                              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-full flex items-center justify-center gap-2 ${
                                !item.inStock 
                                ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800' 
                                : 'bg-white text-black hover:bg-zinc-200 shadow-xl'
                              }`}
                            >
                              {item.inStock ? (
                                <>Enlist Item <Zap size={12} /></>
                              ) : (
                                <>Unavailable <PackageX size={12} /></>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 border-t border-zinc-900 pt-24 text-center">
          <div className="inline-flex flex-col items-center max-w-2xl mx-auto space-y-8">
            <Shield size={64} className="text-zinc-800" />
            <p className="text-5xl md:text-7xl font-oswald font-black uppercase tracking-tighter text-white leading-tight italic">
              "NEVER SETTLE FOR THE MEDIOCRE."
            </p>
            <div className="flex items-center gap-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">
              <div className="w-12 h-px bg-zinc-900" />
              Obsidian Philosophy
              <div className="w-12 h-px bg-zinc-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorSection;
