import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] lg:min-h-[92vh] flex items-center pt-32 pb-16 lg:pt-0 lg:pb-0 overflow-hidden bg-white">
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 0.03, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-primary blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.06, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary-light blur-3xl"
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          {/* Left Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[55%] xl:w-[60%] flex flex-col items-start"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[2.75rem] sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold text-primary leading-[1.05] tracking-tight mb-8"
            >
              Architecting <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Digital Growth.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed"
            ><span>
                We engineer sophisticated digital experiences and data-driven marketing strategies that translate into measurable business growth for ambitious brands.
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-[15px]">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-[45%] xl:w-[40%] flex justify-center lg:justify-end relative h-[400px] sm:h-[500px] lg:h-[600px] items-center"
          >
            {/* Architectural Geometric Composition */}
            <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
              {/* Main Dark Block */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 w-[65%] h-[60%] sm:h-[70%] rounded-3xl bg-primary shadow-2xl overflow-hidden right-[5%] sm:right-[10%] top-[15%] sm:top-[10%] border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                {/* Subtle internal grid/lines for "architecting" feel */}
                <div className="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-white/10 rounded-tl-3xl" />
              </motion.div>

              {/* Secondary Light Block */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute z-10 w-[60%] h-[55%] sm:h-[60%] rounded-3xl bg-primary-light/95 shadow-xl overflow-hidden left-[5%] sm:left-0 bottom-[15%] sm:bottom-[10%] backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              </motion.div>

              {/* Coral Accent Dot */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cta shadow-lg shadow-cta/30 right-[15%] sm:right-[20%] bottom-[25%] sm:bottom-[20%] flex items-center justify-center"
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/70" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
