import React from 'react';
import { motion } from 'framer-motion';

export function Loader({ text = "Loading..." }) {
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 min-h-[30vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-gray-100 border-t-primary rounded-full mb-4"
      />
      <span className="text-gray-500 font-medium tracking-wide text-sm uppercase">{text}</span>
    </div>
  );
}
