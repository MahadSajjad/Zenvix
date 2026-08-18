import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { Button } from './Button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function GlobalCTA() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <Container>
        <motion.div 
          {...fadeIn}
          className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-50 p-10 lg:p-16 rounded-[2rem] border border-gray-100"
        >
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
              Have a project in mind?
            </h2>
            <p className="text-lg text-gray-600">
              Let's discuss your requirements and explore how our services can aggressively scale your digital presence.
            </p>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <Link to="/contact">
              <Button variant="cta" className="px-10 py-4 text-lg w-full md:w-auto">
                Let's Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
