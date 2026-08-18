import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';

export function TeamMember({ member, isFeatured }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className={`group flex flex-col ${isFeatured ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1'}`}
    >
      <div className={`relative w-full overflow-hidden rounded-2xl mb-6 bg-gray-100 ${isFeatured ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-square sm:aspect-[4/5]'}`}>
        <motion.div 
          className="w-full h-full bg-gray-200"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          {member.image ? (
            <img 
              src={member.image} 
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
              <span className="text-sm font-bold tracking-widest uppercase">Photo Unavailable</span>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className={`font-bold text-primary tracking-tight mb-1 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
          {member.name}
        </h3>
        <p className="text-cta font-medium text-sm tracking-wide mb-4 uppercase">
          {member.role}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
          {member.bio}
        </p>

        {member.socialLinks && (
          <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100">
            {member.socialLinks.linkedin && (
              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors p-2 -ml-2" aria-label={`${member.name} LinkedIn`}>
                <FaLinkedinIn size={18} />
              </a>
            )}
            {member.socialLinks.twitter && (
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors p-2" aria-label={`${member.name} Twitter`}>
                <FaTwitter size={18} />
              </a>
            )}
            {member.socialLinks.github && (
              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors p-2" aria-label={`${member.name} GitHub`}>
                <FaGithub size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
