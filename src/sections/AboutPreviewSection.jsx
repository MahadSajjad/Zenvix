import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const principles = [
  {
    id: "01",
    title: "Strategy First",
    description: "We dive deep into your business objectives, market positioning, and target audience before writing a single line of code or running a campaign."
  },
  {
    id: "02",
    title: "Built With Purpose",
    description: "No arbitrary decisions. Every design element, user flow, and marketing tactic is engineered to drive measurable growth."
  },
  {
    id: "03",
    title: "Creative + Technical",
    description: "We bridge the gap between stunning visual communication and rock-solid backend architecture for a flawless digital experience."
  },
  {
    id: "04",
    title: "Engineered to Scale",
    description: "We don't build temporary solutions. We construct digital foundations designed to adapt, perform, and scale seamlessly as your business evolves."
  }
];

export function AboutPreviewSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 bg-primary-light overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border-[1px] border-white/10 opacity-30 mix-blend-overlay"
        />
        <motion.div 
          animate={{ rotate: [0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full border-[1px] border-white/10 opacity-30 mix-blend-overlay"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: About Intro */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                  Why Zenvix
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                We build with purpose, not just pixels.
              </h2>
              
              <div className="flex flex-col gap-6 text-white/80 text-lg leading-relaxed max-w-lg mb-12">
                <p>
                  Most agencies simply execute a list of deliverables. We act as strategic partners to engineer comprehensive digital solutions that directly impact your bottom line.
                </p>
                <p>
                  By fusing high-end creative design with rigorous technical architecture, we ensure your brand doesn't just look incredible—it operates as a highly efficient growth engine.
                </p>
              </div>

              <div className="hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-md border-[1.5px] border-white/30 text-white font-medium transition-all duration-500 hover:bg-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  More About Zenvix
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Principles (Editorial List) */}
          <div className="w-full lg:w-[55%]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col"
            >
              <div className="w-full h-px bg-white/20 mb-8" />
              
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.id}
                  variants={itemVariants}
                  className="group relative w-full border-b border-white/20 pb-8 mb-8 last:mb-0 last:border-b-0 cursor-pointer"
                >
                  {/* Hover Highlight (Background slide) */}
                  <div className="absolute inset-0 -mx-6 px-6 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
                  
                  <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 items-start">
                    <span className="text-2xl lg:text-3xl font-light text-white/40 font-mono tracking-tighter pt-1 transition-colors duration-500 group-hover:text-white">
                      {principle.id}
                    </span>
                    
                    <div className="flex flex-col gap-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl lg:text-2xl font-bold text-white transition-colors duration-300">
                          {principle.title}
                        </h3>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 bg-white/10">
                           <svg className="w-4 h-4 text-white transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                           </svg>
                        </div>
                      </div>
                      
                      <p className="text-white/70 leading-relaxed max-w-md transition-colors duration-500 group-hover:text-white/90">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile CTA */}
            <div className="mt-12 lg:hidden w-full flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 rounded-md border-[1.5px] border-white/30 text-white font-medium transition-all duration-500 hover:bg-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                More About Zenvix
              </motion.button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
