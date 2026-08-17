import React from 'react';

export function Container({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
}
