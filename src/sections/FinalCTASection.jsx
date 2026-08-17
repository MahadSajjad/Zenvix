import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export function FinalCTASection() {
  return (
    <section className="relative w-full pt-24 pb-12 lg:pt-32 lg:pb-20 bg-primary overflow-hidden">
      
      {/* Massive Abstract Brand Typography Background */}
      <div 
        className="absolute right-0 bottom-0 pointer-events-none select-none z-0 translate-x-1/4 translate-y-1/4 lg:translate-y-1/3"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[250px] sm:text-[350px] lg:text-[500px] font-bold text-white/[0.03] leading-none tracking-tighter"
        >
          Z.
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-24">
          
          {/* Content Column */}
          <div className="w-full lg:w-2/3 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-xs font-bold tracking-[0.2em] text-primary-light uppercase">
                  Let's Work Together
                </span>
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
                Ready to scale your digital presence?
              </h2>

              <p className="text-lg lg:text-xl text-white/70 mb-12 leading-relaxed max-w-xl">
                Whether you're looking to rebuild your digital architecture, launch a high-performance marketing campaign, or comprehensively scale your business, we're ready to partner with you.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <Button variant="primary" className="w-full sm:w-auto px-10 py-4 text-lg">
                  Let's Talk
                </Button>
                
                <a 
                  href="/portfolio" 
                  className="group flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm py-1"
                >
                  Explore Our Work
                  <motion.span 
                    className="inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
      
      {/* Subtle Bottom Border to transition into footer if needed, though matching bg-primary is seamless */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
