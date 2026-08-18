import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export const renderBlogPlaceholderVisual = (post) => {
  const { placeholderColors, placeholderType, title } = post;
  
  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center p-8 ${placeholderColors}`}>
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-sm border border-current opacity-70">
          Editorial Concept
        </span>
      </div>

      {placeholderType === 'technical' && (
        <div className="w-full h-full border border-current opacity-20 rounded flex flex-col p-4 gap-2">
          <div className="w-full h-4 border-b border-current" />
          <div className="w-full flex-grow flex gap-2">
            <div className="w-1/4 h-full bg-current opacity-20" />
            <div className="w-3/4 h-full bg-current opacity-20" />
          </div>
        </div>
      )}

      {placeholderType === 'typography' && (
        <div className="text-center opacity-40">
          <span className="text-5xl font-bold tracking-tighter leading-none block uppercase">
            {title.substring(0, 4)}
          </span>
        </div>
      )}

      {placeholderType === 'chart' && (
        <div className="w-full h-full max-w-[120px] aspect-square border-l-2 border-b-2 border-current opacity-30 flex items-end justify-between p-2 gap-1">
          <div className="w-1/4 h-1/3 bg-current" />
          <div className="w-1/4 h-2/3 bg-current" />
          <div className="w-1/4 h-1/2 bg-current" />
          <div className="w-1/4 h-full bg-current" />
        </div>
      )}

      {placeholderType === 'wireframe' && (
        <div className="w-full h-full border border-current opacity-20 flex flex-col justify-between p-2 gap-2">
          <div className="w-full h-1/2 bg-current opacity-30" />
          <div className="w-full h-1/2 flex gap-2">
             <div className="w-1/2 h-full bg-current opacity-30" />
             <div className="w-1/2 h-full bg-current opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
};

export function BlogCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link 
        to={`/blog/${post.slug}`} 
        className="flex flex-col md:flex-row gap-6 md:gap-10 py-10 border-b border-gray-100 group-last:border-none"
      >
        {/* Visual Column */}
        <div className="md:w-1/3 lg:w-1/4 shrink-0">
          <div className="w-full aspect-[16/9] md:aspect-square overflow-hidden rounded-xl bg-gray-100">
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              {post.image ? (
                <img src={post.image} alt={post.imageAlt || post.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
              ) : (
                renderBlogPlaceholderVisual(post)
              )}
            </motion.div>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex flex-col flex-grow justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-[0.15em] text-cta uppercase">
              {post.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm font-medium text-gray-500">
              {post.readTime}
            </span>
          </div>
          
          <h3 className="font-bold text-primary tracking-tight mb-4 text-2xl lg:text-3xl group-hover:text-cta transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-cta transition-colors">
              Read Article
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
