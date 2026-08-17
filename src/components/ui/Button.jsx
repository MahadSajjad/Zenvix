import React from 'react';
import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-cta text-cta-text hover:bg-[#c94124] focus:ring-cta transition-all duration-500',
    secondary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary transition-all duration-500',
    outline: 'border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary transition-all duration-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes.md} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
