import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

// Placeholder for future WordPress REST API data structure
const projects = [
  {
    id: "01",
    title: "Global E-Commerce Replatforming",
    category: "Web Development & SEO",
    description: "Architected a headless commerce solution that improved conversion rates by 42% and organic traffic by 150%.",
    slug: "global-ecommerce-replatforming",
    colSpan: "md:col-span-2",
    featured: true,
    accentColor: "bg-primary"
  },
  {
    id: "02",
    title: "FinTech App Interface",
    category: "UI & UX Designing",
    description: "Designed a frictionless, user-centric mobile banking experience for modern millennials.",
    slug: "fintech-app-interface",
    colSpan: "md:col-span-1",
    featured: false,
    accentColor: "bg-primary-light"
  },
  {
    id: "03",
    title: "SaaS Growth Engine",
    category: "Content & SEO",
    description: "Data-driven organic growth campaign scaling inbound enterprise leads.",
    slug: "saas-growth-engine",
    colSpan: "md:col-span-1",
    featured: false,
    accentColor: "bg-gray-800"
  }
];

export function PortfolioPreviewSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  Selected Work
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-[1.15] tracking-tight mb-6">
                Digital experiences crafted for aggressive business growth.
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                We engineer custom digital ecosystems tailored to your specific business goals—combining architectural web development with data-driven marketing strategies to produce real-world results.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block"
          >
            <Button variant="outline" className="px-8">
              View All Work
            </Button>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group cursor-pointer flex flex-col gap-6 ${project.colSpan}`}
            >
              {/* Image / Visual Placeholder Wrapper */}
              <div className={`relative w-full rounded-2xl overflow-hidden ${project.featured ? 'h-[400px] lg:h-[600px]' : 'h-[350px] lg:h-[450px]'} bg-gray-100`}>
                
                {/* Simulated Image Placeholder */}
                <div className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${project.accentColor}`}>
                  {/* Decorative Wireframe Elements inside Placeholder */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-80 mix-blend-overlay">
                    <svg className="w-16 h-16 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white font-mono text-sm tracking-widest uppercase">Project Preview</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-10 mix-blend-multiply" />
                
                {/* Floating Arrow Badge (Appears on hover) */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                   <svg className="w-5 h-5 text-primary transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                </div>
              </div>

              {/* Project Meta */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tracking-wider text-primary-light uppercase">
                    {project.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-sm font-mono text-gray-400">
                    {project.id}
                  </span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-primary transition-colors group-hover:text-cta duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mt-2 max-w-xl">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-12 lg:hidden w-full flex justify-center">
          <Button variant="outline" className="w-full sm:w-auto px-8">
            View All Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
