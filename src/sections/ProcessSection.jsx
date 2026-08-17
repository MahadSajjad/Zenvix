import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const processSteps = [
  {
    id: "01",
    title: "Discover",
    description: "We immerse ourselves in your business, analyzing your audience, goals, and technical requirements to establish a clear baseline."
  },
  {
    id: "02",
    title: "Strategize",
    description: "We define the overarching digital strategy, mapping out the architecture, user journeys, and campaign direction."
  },
  {
    id: "03",
    title: "Build",
    description: "Our engineers and designers execute the strategy, developing robust digital experiences and meticulously crafted assets."
  },
  {
    id: "04",
    title: "Launch & Grow",
    description: "We deploy the final product, continuously monitoring performance data to iterate and optimize for compounding returns."
  }
];

export function ProcessSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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
    <section className="relative w-full py-24 lg:py-32 bg-gray-50 overflow-hidden">
      {/* Infinite Loop / Continuous Iteration Visual Element */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-multiply"
      >
        <style>
          {`
            @keyframes dash-flow {
              to {
                stroke-dashoffset: -3000;
              }
            }
            .animate-flow {
              animation: dash-flow 40s linear infinite;
            }
            @media (prefers-reduced-motion) {
              .animate-flow {
                animation: none;
              }
            }
          `}
        </style>
        <svg 
          viewBox="0 0 1200 600" 
          className="w-full min-w-[800px] max-w-[1400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Base faded track */}
          <path 
            d="M 600,300 C 450,100 150,100 150,300 C 150,500 450,500 600,300 C 750,100 1050,100 1050,300 C 1050,500 750,500 600,300 Z" 
            stroke="#004B64" 
            strokeWidth="3" 
            fill="none" 
            className="opacity-[0.04]"
          />
          {/* Primary brand color flow */}
          <path 
            d="M 600,300 C 450,100 150,100 150,300 C 150,500 450,500 600,300 C 750,100 1050,100 1050,300 C 1050,500 750,500 600,300 Z" 
            stroke="#489BB6" 
            strokeWidth="4" 
            fill="none" 
            strokeDasharray="200 400 50 800"
            className="animate-flow opacity-[0.15]"
          />
          {/* Coral accent flow */}
          <path 
            d="M 600,300 C 450,100 150,100 150,300 C 150,500 450,500 600,300 C 750,100 1050,100 1050,300 C 1050,500 750,500 600,300 Z" 
            stroke="#E04D2E" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray="30 1400"
            className="animate-flow opacity-[0.25]"
            style={{ animationDelay: '-15s', animationDuration: '30s' }}
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cta" />
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                Our Process
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-[1.15] tracking-tight mb-6">
              A structured, collaborative approach to digital growth.
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We operate through a transparent methodology engineered to align perfectly with your business objectives at every single stage of execution.
            </p>
          </motion.div>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full">
          {/* Desktop Horizontal Line */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gray-200 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="w-full h-full bg-primary/20 origin-left"
            />
          </div>

          {/* Mobile Vertical Line */}
          <div className="lg:hidden absolute top-[40px] bottom-[40px] left-[28px] w-[1px] bg-gray-200 z-0">
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="w-full h-full bg-primary/20 origin-top"
            />
          </div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-8 group"
              >
                {/* Node / Number */}
                <div className="relative shrink-0 w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:border-primary group-hover:shadow-md z-10">
                  <span className="text-lg font-bold text-primary font-mono tracking-tighter">
                    {step.id}
                  </span>
                  {/* Subtle pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-full border border-cta opacity-0 scale-50 transition-all duration-500 group-hover:opacity-30 group-hover:scale-150 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pt-2 lg:pt-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-[15px] lg:px-4">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 lg:mt-32 flex justify-center"
        >
          <Button variant="outline" className="px-8 py-3">
            Start a Project
          </Button>
        </motion.div>

      </Container>
    </section>
  );
}
