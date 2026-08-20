import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// A helper to generate premium abstract visuals based on placeholderType
const renderPlaceholderVisual = (project) => {
  const { placeholderColors, placeholderType, title, image } = project;
  
  if (image) {
    return (
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center p-8 ${placeholderColors}`}>
      {/* Concept Label */}
      <div className="absolute top-6 left-6 z-20">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-current opacity-70">
          Concept Project
        </span>
      </div>

      {placeholderType === 'wireframe' && (
        <div className="w-full max-w-sm aspect-[4/3] border border-current opacity-20 rounded-lg flex flex-col p-4 gap-4">
          <div className="w-full h-8 border-b border-current flex items-center justify-between">
            <div className="w-16 h-3 rounded-sm bg-current opacity-50" />
            <div className="w-8 h-3 rounded-sm bg-current opacity-50" />
          </div>
          <div className="w-full flex-grow flex gap-4">
            <div className="w-1/3 h-full rounded-sm bg-current opacity-20" />
            <div className="w-2/3 h-full rounded-sm bg-current opacity-20" />
          </div>
        </div>
      )}

      {placeholderType === 'typography' && (
        <div className="text-center opacity-40">
          <span className="text-6xl font-bold tracking-tighter leading-none block">
            {title.split(' ')[0]}
          </span>
          <span className="text-4xl font-light italic tracking-tight block mt-2">
            {title.split(' ')[1] || 'Concept'}
          </span>
        </div>
      )}

      {placeholderType === 'chart' && (
        <div className="w-full max-w-xs aspect-square border-l-2 border-b-2 border-current opacity-30 flex items-end justify-between p-4 gap-2">
          <div className="w-1/4 h-1/3 bg-current" />
          <div className="w-1/4 h-2/3 bg-current" />
          <div className="w-1/4 h-1/2 bg-current" />
          <div className="w-1/4 h-full bg-current" />
        </div>
      )}
    </div>
  );
};

export function PortfolioCard({ project, index }) {
  // Determine layout based on index for the asymmetrical grid
  const isLarge = index === 0 || index === 3;

  const Wrapper = project.link ? 'a' : Link;
  const linkProps = project.link 
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : { to: `/portfolio/${project.slug}` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`group flex flex-col ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      <Wrapper {...linkProps} className="block relative w-full overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-[4/3] sm:aspect-[16/9]">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {renderPlaceholderVisual(project)}
        </motion.div>
      </Wrapper>
      
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cta" />
          <span className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
            {project.category}
          </span>
        </div>
        
        <Wrapper {...linkProps} className="group-hover:text-primary transition-colors">
          <h3 className={`font-bold text-primary tracking-tight mb-3 ${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
            {project.title}
          </h3>
        </Wrapper>
        
        <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <ul className="flex flex-wrap gap-2">
            {project.services.map(service => (
              <li key={service} className="text-xs font-medium text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                {service}
              </li>
            ))}
          </ul>
          
          <Wrapper 
            {...linkProps}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-cta transition-colors group/link shrink-0"
          >
            {project.link ? 'Visit Website' : 'View Case Study'}
            <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Wrapper>
        </div>
      </div>
    </motion.div>
  );
}
