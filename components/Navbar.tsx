
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, onCartClick, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'arsenal', label: 'Arsenal' },
    { id: 'advisor', label: 'The Advisor' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-900">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-oswald font-bold tracking-tighter text-white cursor-pointer"
          onClick={() => handleNav('home')}
        >
          OBSIDIAN <span className="text-zinc-600 font-light hidden sm:inline">PRO SERIES</span>
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${currentPage === item.id ? 'border-white text-white' : 'border-transparent'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-1 text-zinc-500"
                >
                  <Heart size={18} fill="currentColor" className="text-white" />
                  <span className="text-[10px] font-black text-white">{wishlistCount}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={onCartClick}
                  className="relative p-2 text-white hover:text-zinc-400 transition-colors"
                >
                  <ShoppingBag size={24} />
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <motion.button 
            onClick={() => handleNav('advisor')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full cursor-pointer hidden sm:block"
          >
            Advisor
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 p-8 flex flex-col gap-6"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-left font-oswald text-2xl font-bold uppercase tracking-tighter ${currentPage === item.id ? 'text-white' : 'text-zinc-600'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
