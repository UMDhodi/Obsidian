
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { Plus, Minus, X, ChevronDown, ZoomIn, PackageX, CheckCircle2, ShieldCheck, Heart, BookmarkPlus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (p: Product) => void;
  onUpdateQuantity?: (id: string, delta: number) => void;
  onToggleWishlist?: (id: string) => void;
  quantity?: number;
  isInWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  index, 
  onAddToCart, 
  onUpdateQuantity, 
  onToggleWishlist,
  quantity = 0,
  isInWishlist = false 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [wishlistTooltip, setWishlistTooltip] = useState(false);
  const [cartTooltip, setCartTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    setCartTooltip(true);
    setTimeout(() => setCartTooltip(false), 2000);
  };

  const handleUpdateQty = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    if (onUpdateQuantity) onUpdateQuantity(product.id, delta);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    if (onToggleWishlist) onToggleWishlist(product.id);
    if (!isInWishlist) {
      setWishlistTooltip(true);
      setTimeout(() => setWishlistTooltip(false), 2000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current) return;
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`group relative bg-zinc-900/30 border border-zinc-900 p-8 flex flex-col gap-6 overflow-hidden rounded-2xl transition-all duration-500 ${product.inStock ? 'hover:border-zinc-700' : 'opacity-60 grayscale border-zinc-950'}`}
      >
        {/* Out of Stock Corner Ribbon */}
        {!product.inStock && (
          <div className="absolute top-0 right-0 z-30 overflow-hidden w-32 h-32 pointer-events-none">
            <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 w-[170%] text-center absolute top-6 right-[-45px] rotate-45 shadow-[0_5px_15px_rgba(220,38,38,0.4)]">
              OUT OF STOCK
            </div>
          </div>
        )}

        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
            {product.category}
          </span>
          {/* Top Right Wishlist Quick Toggle */}
          <button 
            onClick={handleWishlist}
            disabled={!product.inStock}
            className={`transition-colors ${isInWishlist ? 'text-white' : 'text-zinc-700 hover:text-white'} ${!product.inStock ? 'cursor-not-allowed opacity-30' : ''}`}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={isInWishlist ? 0 : 2} />
          </button>
        </div>
        
        <div 
          className="relative w-full aspect-square flex items-center justify-center cursor-zoom-in"
          onClick={() => setShowModal(true)}
        >
          <motion.img 
            whileHover={product.inStock ? { scale: 1.05, rotate: 2 } : {}}
            src={product.imageUrl} 
            alt={product.name}
            className={`max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ${!product.inStock ? 'brightness-50' : ''}`}
          />
          
          {/* Out of Stock Overlay Text */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="bg-red-600/10 backdrop-blur-md border border-red-600/30 px-6 py-3 rounded-full">
                <p className="text-red-500 font-oswald font-bold text-sm tracking-widest uppercase">Currently Depleted</p>
              </div>
            </div>
          )}

          {product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                <ZoomIn size={24} className="text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className={`text-2xl font-oswald font-bold uppercase tracking-tighter leading-none transition-colors ${!product.inStock ? 'text-zinc-600' : 'text-white'}`}>
              {product.name}
            </h3>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-2">{product.tagline}</p>
          </div>
          
          <div className="pt-6 flex flex-col gap-4 border-t border-zinc-800/50">
            <div className="flex items-center justify-between">
              <span className={`text-xl font-oswald font-bold ${!product.inStock ? 'text-zinc-700' : 'text-white'}`}>
                ${product.price.toFixed(2)}
              </span>
              
              {/* Wishlist Button */}
              <div className="relative">
                <AnimatePresence>
                  {wishlistTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: 10, x: '-50%' }}
                      className="absolute bottom-full left-1/2 mb-4 bg-zinc-100 text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter whitespace-nowrap z-50 shadow-2xl flex items-center gap-2 border border-white"
                    >
                      <BookmarkPlus size={12} />
                      Archived
                    </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  onClick={handleWishlist}
                  disabled={!product.inStock}
                  className={`p-2.5 rounded-full border transition-all ${
                    !product.inStock 
                      ? 'bg-zinc-950 text-zinc-800 border-zinc-900 cursor-not-allowed' 
                      : isInWishlist 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-white hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={isInWishlist ? 0 : 2} />
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Add to Kit / Quantity Selector */}
              <AnimatePresence>
                {cartTooltip && quantity === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                    className="absolute bottom-full left-1/2 mb-4 bg-white text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter whitespace-nowrap z-50 shadow-2xl flex items-center gap-2 border border-white"
                  >
                    <ShieldCheck size={12} />
                    Secured
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {quantity > 0 ? (
                  <motion.div 
                    key="qty-selector"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center bg-white rounded-full overflow-hidden"
                  >
                    <button 
                      onClick={(e) => handleUpdateQty(e, -1)}
                      className="flex-1 py-3 text-black hover:bg-zinc-100 transition-colors flex justify-center border-r border-zinc-200"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="flex-[2] text-center text-[10px] font-black text-black uppercase tracking-widest">
                      {quantity} IN KIT
                    </div>
                    <button 
                      onClick={(e) => handleUpdateQty(e, 1)}
                      className="flex-1 py-3 text-black hover:bg-zinc-100 transition-colors flex justify-center border-l border-zinc-200"
                    >
                      <Plus size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button 
                    key="add-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all py-3 rounded-full border ${
                      !product.inStock 
                        ? 'bg-zinc-950 text-zinc-800 border-zinc-900 cursor-not-allowed' 
                        : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-white hover:text-white active:scale-95'
                    }`}
                  >
                    {!product.inStock ? (
                      <>
                        <PackageX size={14} />
                        <span>Unavailable</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Add to Kit</span>
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                ref={zoomRef}
                onMouseMove={handleMouseMove}
                className="relative flex-1 bg-zinc-900/30 h-[400px] md:h-auto overflow-hidden group cursor-crosshair border-b md:border-b-0 md:border-r border-zinc-900"
              >
                <div 
                  className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ 
                    backgroundImage: `url(${product.imageUrl})`,
                    transform: `scale(3)`,
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }}
                />
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className={`absolute inset-0 w-full h-full object-contain p-16 transition-opacity duration-300 group-hover:opacity-0 ${!product.inStock ? 'grayscale opacity-50' : ''}`}
                />
                <div className="absolute top-10 left-10 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${!product.inStock ? 'bg-red-500' : 'bg-white animate-pulse'}`} />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
                    {product.inStock ? 'High Definition Feed' : 'Offline Mode'}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-8 md:p-24 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-10 right-10 text-zinc-600 hover:text-white transition-all hover:rotate-90 p-2"
                >
                  <X size={32} strokeWidth={1} />
                </button>

                <div className="space-y-16">
                  <div className="space-y-8">
                    <div className="flex items-center gap-8">
                      <span className="text-[12px] font-black text-white/20 uppercase tracking-[0.8em]">{product.category}</span>
                      <div className="h-px flex-1 bg-zinc-900" />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <h2 className={`text-6xl md:text-8xl font-oswald font-black uppercase tracking-tighter leading-[0.85] ${!product.inStock ? 'text-zinc-600' : 'text-white'}`}>
                        {product.name}
                      </h2>
                      <button 
                        onClick={handleWishlist}
                        disabled={!product.inStock}
                        className={`p-4 rounded-full border transition-all ${
                          !product.inStock 
                            ? 'bg-zinc-950 text-zinc-800 border-zinc-900 cursor-not-allowed opacity-30' 
                            : isInWishlist 
                              ? 'bg-white text-black border-white' 
                              : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-white hover:text-white'
                        }`}
                      >
                        <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={isInWishlist ? 0 : 2} />
                      </button>
                    </div>
                    <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="border-y border-zinc-900 py-10">
                    <button 
                      onClick={() => setShowBenefits(!showBenefits)}
                      className="w-full flex items-center justify-between group"
                    >
                      <span className="text-sm font-black uppercase tracking-[0.5em] text-white group-hover:text-zinc-400 transition-colors">See All Benefits</span>
                      <motion.div
                        animate={{ rotate: showBenefits ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      >
                        <ChevronDown size={24} className="text-zinc-700" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {showBenefits && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
                            {product.benefits.map((benefit, i) => (
                              <motion.div 
                                key={i} 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-5 border-l border-zinc-900 pl-6 group/benefit"
                              >
                                <CheckCircle2 size={20} className="text-zinc-700 mt-1 shrink-0 group-hover/benefit:text-white transition-colors" />
                                <div className="space-y-2">
                                  <p className="text-sm text-zinc-300 font-bold uppercase tracking-wider leading-none">{benefit}</p>
                                  <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-black">Tactical Certification 00{i + 1}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 pt-4">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">Premium Valuation</span>
                      <p className={`text-6xl font-oswald font-bold tracking-tighter ${!product.inStock ? 'text-zinc-700' : 'text-white'}`}>
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="relative w-full sm:w-auto">
                      <AnimatePresence mode="wait">
                        {quantity > 0 ? (
                          <motion.div 
                            key="modal-qty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center bg-white rounded-full overflow-hidden w-full sm:min-w-[280px]"
                          >
                            <button 
                              onClick={(e) => handleUpdateQty(e, -1)}
                              className="flex-1 py-7 text-black hover:bg-zinc-100 transition-colors flex justify-center border-r border-zinc-200"
                            >
                              <Minus size={20} />
                            </button>
                            <div className="flex-[2] text-center text-[12px] font-black text-black uppercase tracking-widest">
                              {quantity} DEPLOYED
                            </div>
                            <button 
                              onClick={(e) => handleUpdateQty(e, 1)}
                              className="flex-1 py-7 text-black hover:bg-zinc-100 transition-colors flex justify-center border-l border-zinc-200"
                            >
                              <Plus size={20} />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button 
                            key="modal-add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={handleAdd}
                            disabled={!product.inStock}
                            className={`px-20 py-7 text-[12px] font-black uppercase tracking-[0.6em] rounded-full transition-all flex items-center justify-center shadow-2xl w-full sm:w-auto ${
                              !product.inStock 
                                ? 'bg-zinc-900 text-zinc-800 cursor-not-allowed border border-zinc-800' 
                                : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
                            }`}
                          >
                            {product.inStock ? 'PROCURE ITEM' : 'INVENTORY DEPLETED'}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="mt-24 pt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 text-[10px] font-black">OB</div>
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em]">
                      Obsidian Pro Series — Strategic Logistics
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em]">ISO-9001 COMPLIANT</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
