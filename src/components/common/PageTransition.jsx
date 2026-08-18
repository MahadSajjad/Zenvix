import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
