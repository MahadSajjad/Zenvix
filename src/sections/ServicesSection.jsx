import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';

const getColSpan = (idx) => {
  return idx === 0 ? "md:col-span-2" : "md:col-span-1";
};

export function ServicesSection() {
  const { services } = useServices();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full pt-16 pb-24 lg:pt-24 lg:pb-32 bg-primary">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* PART 1: ZENVIX INTRODUCTION (Sticky on Desktop) */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-cta" />
                  <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                    What We Do
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight mb-6">
                  Turning search into growth.
                </h2>

                <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-md">
                  We don't just build websites or run ads. We combine architectural web development with data-driven marketing strategies to create digital engines that systematically grow your brand.
                </p>

                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 rounded-md border-[1.5px] border-white/30 text-white font-medium transition-all duration-500 hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Explore Services
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* PART 2: SERVICES PREVIEW */}
          <div className="w-full lg:w-[60%]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className={getColSpan(idx)}
                >
                  <Link
                    to={`/services#${service.id}`}
                    className="group relative bg-slate-100 border border-slate-200 rounded-2xl p-8 lg:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-slate-300 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 block h-full"
                  >
                    {/* Subtle Background Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                    {/* Top: Number & Arrow */}
                    <div className="relative z-10 flex justify-between items-start mb-16 sm:mb-24">
                      <span className="text-4xl lg:text-5xl font-light text-gray-200 tracking-tighter transition-colors duration-500 group-hover:text-primary/20">
                        {service.number}
                      </span>

                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110">
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-500 group-hover:-rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom: Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-[15px] leading-relaxed max-w-sm">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
