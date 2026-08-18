import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQItem({ faq, isOpen, onToggle }) {
  const contentId = `faq-content-${faq.id}`;
  const buttonId = `faq-button-${faq.id}`;

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 sm:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-sm transition-colors group"
      >
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-gray-900 group-hover:text-primary'}`}>
          {faq.question}
        </h3>
        <div className="shrink-0 relative w-6 h-6 flex items-center justify-center text-primary">
          {/* Animated Plus/Minus Icon */}
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="block w-4 h-[2px] bg-current" />
            <span className="block w-[2px] h-4 bg-current absolute" />
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="block w-4 h-[2px] bg-current" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-8 sm:pr-12">
              <p className="text-gray-600 text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
