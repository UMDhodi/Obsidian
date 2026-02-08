
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartOverlayProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ items, isOpen, onClose, onRemove }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 12.00;
  const total = subtotal + delivery;

  const handlePay = () => {
    alert("TRANSACTION AUTHORIZED. WELCOME TO THE ELITE.");
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl bg-zinc-950 border-l border-zinc-900 h-full flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {step === 'checkout' && (
                  <button onClick={() => setStep('cart')} className="text-zinc-500 hover:text-white">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-2xl font-oswald font-bold uppercase tracking-widest text-white">
                  {step === 'cart' ? 'YOUR ARSENAL' : 'CHECKOUT PROTOCOL'}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {step === 'cart' ? (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center bg-zinc-900/50 p-4 rounded-lg border border-zinc-900">
                      <div className="w-20 h-20 bg-zinc-950 rounded flex items-center justify-center p-2">
                        <img src={item.imageUrl} alt={item.name} className="max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-oswald font-bold text-lg text-white uppercase">{item.name}</h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest">{item.tagline}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-bold text-white">${item.price.toFixed(2)}</span>
                          <button onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-20 text-zinc-600 uppercase tracking-widest text-sm font-bold">
                      Your arsenal is empty.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Full Name</label>
                      <input type="text" placeholder="COMMANDER NAME" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-white uppercase text-sm font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Mobile Intel</label>
                        <input type="text" placeholder="+1 000 000" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-white uppercase text-sm font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Area Pincode</label>
                        <input type="text" placeholder="90210" className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-white uppercase text-sm font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Deployment Address</label>
                      <textarea placeholder="STREET, BUILDING, FLOOR..." className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-white uppercase text-sm font-bold h-24 resize-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Calculation */}
            <div className="p-8 bg-zinc-900/80 border-t border-zinc-800 space-y-6">
              <div className="space-y-2 text-sm font-bold uppercase tracking-widest">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Logistics Charge</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>
                <div className="h-px bg-zinc-800 my-4"></div>
                <div className="flex justify-between text-xl text-white font-oswald">
                  <span>Total Payload</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                disabled={items.length === 0}
                onClick={() => step === 'cart' ? setStep('checkout') : handlePay()}
                className="w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
              >
                {step === 'cart' ? 'INITIALIZE CHECKOUT' : 'AUTHORIZE PAYMENT'}
                <CreditCard size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartOverlay;
