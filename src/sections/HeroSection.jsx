import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

function MagneticCard({ children, className, depth = 15 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  // Ultra-smooth spring configuration to prevent jittering on fast movements
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 20, mass: 0.8 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 20, mass: 0.8 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    if (!ref.current) return;

    // Simplify/disable on mobile devices by checking width
    if (window.innerWidth < 1024) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized distance from center (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const translateX = useTransform(mouseXSpring, [-1, 1], [-depth, depth]);
  const translateY = useTransform(mouseYSpring, [-1, 1], [-depth, depth]);
  const rotateX = useTransform(mouseYSpring, [-1, 1], [depth / 2, -depth / 2]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-depth / 2, depth / 2]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    <section className="relative w-full min-h-[100svh] lg:min-h-[100dvh] flex items-center py-20 lg:py-28 overflow-hidden bg-white">
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-4">

          {/* Left Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[60%] xl:w-[65%] flex flex-col items-start order-1"
          >

            <motion.h1
              variants={itemVariants}
              className="text-[2.75rem] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold text-primary leading-[1.05] tracking-tight mb-8"
            >
              Architecting <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Digital Growth<span className="text-cta">.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="flex flex-col items-start text-lg sm:text-xl text-gray-600 max-w-xl mb-2 lg:mb-10 leading-relaxed"
            >
              <span className="w-10 h-[2px] bg-cta"></span>
              We engineer sophisticated digital experiences and data-driven marketing strategies that translate into measurable business growth for ambitious brands.
            </motion.p>

            {/* Desktop CTA (Hidden on mobile) */}
            <motion.div variants={itemVariants} className="hidden lg:flex flex-row items-center gap-4">
              <Button variant="outline" className="px-8 py-4 text-[15px]">
                About Zenvix
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-[40%] xl:w-[35%] flex justify-center lg:justify-end relative items-center order-2 py-0"
          >
            {/* Architectural Geometric Composition (Scaled down for balance) */}
            <div className="relative w-full max-w-[320px] lg:max-w-[340px] xl:max-w-[380px] h-[280px] sm:h-[320px] lg:h-[360px] flex items-center justify-center mx-auto lg:mx-0">
              {/* Main Dark Block (Code / Development) */}
              <MagneticCard depth={12} className="absolute z-20 w-[65%] h-[65%] right-[5%] top-[5%]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full rounded-3xl bg-primary shadow-2xl overflow-hidden border border-white/10 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0" />

                  {/* Browser/Editor Top Bar */}
                  <div className="relative z-10 w-full px-4 py-3 flex items-center gap-1.5 border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-cta/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>

                  {/* Code Mockup Lines */}
                  <div className="relative z-10 p-5 flex flex-col gap-3">
                    <div className="w-[80%] h-2 rounded bg-white/20" />
                    <div className="w-[60%] h-2 rounded bg-primary-light/60 ml-4" />
                    <div className="w-[70%] h-2 rounded bg-white/20 ml-4" />
                    <div className="w-[40%] h-2 rounded bg-cta/60 ml-8" />
                    <div className="w-[50%] h-2 rounded bg-white/20 ml-4" />
                  </div>
                </motion.div>
              </MagneticCard>

              {/* Secondary Light Block (Design / Layout) */}
              <MagneticCard depth={8} className="absolute z-10 w-[60%] h-[55%] left-[5%] bottom-[10%]">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-full h-full rounded-3xl bg-primary-light/95 shadow-xl overflow-hidden backdrop-blur-md flex flex-col p-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-0" />

                  {/* Wireframe Layout Graphic */}
                  <div className="relative z-10 w-full h-full flex flex-col gap-3">
                    {/* Header */}
                    <div className="w-full h-4 rounded bg-white/40" />
                    {/* Split Content */}
                    <div className="w-full flex-grow flex gap-3">
                      <div className="w-1/3 h-full rounded bg-white/30" />
                      <div className="w-2/3 h-full flex flex-col gap-2">
                        <div className="w-full h-8 rounded bg-white/50" />
                        <div className="w-full flex-grow rounded bg-white/20" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </MagneticCard>

              {/* Coral Accent Element */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cta shadow-lg shadow-cta/30 right-[15%] bottom-[15%] flex items-center justify-center border-2 border-white/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile CTA (Visible on mobile only, positioned after visual) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row lg:hidden items-center gap-4 w-full order-3 mt-0"
          >
            <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-[15px]">
              About Zenvix
            </Button>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
