
import React from 'react';
import { motion } from 'framer-motion';
import { QUOTES } from '../constants';

const QuoteTicker: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-24 items-center"
      >
        {[...QUOTES, ...QUOTES, ...QUOTES].map((quote, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-5xl md:text-7xl font-oswald font-black opacity-10 stroke-text">"</span>
            <span className="text-2xl md:text-4xl font-oswald font-bold text-zinc-300 uppercase italic tracking-tighter">
              {quote.text}
            </span>
            <span className="text-zinc-600 font-bold">— {quote.author}</span>
            <span className="w-12 h-px bg-zinc-800"></span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default QuoteTicker;
