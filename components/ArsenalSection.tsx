
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';
import ProductCard from './ProductCard';
import { ChevronDown, ListFilter } from 'lucide-react';

interface ArsenalSectionProps {
  onAddToCart: (p: Product) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleWishlist: (id: string) => void;
  cart: CartItem[];
  wishlist: string[];
}

type FilterType = 'all' | 'skin' | 'hair' | 'fragrance';
type SortType = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const ArsenalSection: React.FC<ArsenalSectionProps> = ({ 
  onAddToCart, 
  onUpdateQuantity, 
  onToggleWishlist,
  cart,
  wishlist
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions: { id: SortType; label: string }[] = [
    { id: 'default', label: 'STRATEGIC ORDER' },
    { id: 'price-asc', label: 'PRICE: LOW TO HIGH' },
    { id: 'price-desc', label: 'PRICE: HIGH TO LOW' },
    { id: 'name-asc', label: 'ALPHABETICAL (A-Z)' },
  ];

  const processedProducts = useMemo(() => {
    let filtered = activeFilter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeFilter);

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return sorted;
  }, [activeFilter, sortBy]);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'FULL PAYLOAD' },
    { id: 'skin', label: 'SKIN DEFENSE' },
    { id: 'hair', label: 'HAIR STRUCTURE' },
    { id: 'fragrance', label: 'FRAGRANCE INTEL' },
  ];

  return (
    <div className="pt-32 pb-40 px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 flex flex-col lg:flex-row items-end justify-between gap-12">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-[1em] text-zinc-600 block">Strategic Inventory</span>
            <h2 className="text-7xl md:text-9xl font-oswald font-black uppercase tracking-tighter leading-none text-white">THE ARSENAL.</h2>
          </div>
          <p className="max-w-xs text-zinc-500 uppercase text-[10px] font-black tracking-[0.4em] leading-relaxed">
            Engineered precision across all grooming modalities. Select your tactical focus and organization below.
          </p>
        </div>

        <div className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-zinc-900 pb-12">
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 rounded-full border ${
                  activeFilter === filter.id 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white'
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative z-50">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white hover:border-zinc-600 transition-all min-w-[240px] justify-between"
            >
              <div className="flex items-center gap-3">
                <ListFilter size={14} />
                <span>Sort: {sortOptions.find(o => o.id === sortBy)?.label}</span>
              </div>
              <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                <ChevronDown size={14} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 backdrop-blur-xl"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
                        sortBy === option.id 
                          ? 'bg-white text-black' 
                          : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {processedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <ProductCard 
                  product={product} 
                  index={idx} 
                  onAddToCart={onAddToCart}
                  onUpdateQuantity={onUpdateQuantity}
                  onToggleWishlist={onToggleWishlist}
                  quantity={cart.find(item => item.id === product.id)?.quantity || 0}
                  isInWishlist={wishlist.includes(product.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {processedProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-zinc-700 font-oswald text-4xl uppercase tracking-tighter italic">Intelligence Expired. No items found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArsenalSection;
