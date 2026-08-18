import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import { useServices } from '../hooks/useServices';
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Services() {
  const { services: servicesData } = useServices();
  return (
    <>
      {/* SECTION 1 — SERVICES HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  Our Services
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Combining strategy, creativity, technology, and marketing.
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                We engineer premium digital solutions precisely tailored to your business objectives. From structural foundations to aggressive growth campaigns, our capabilities span the entire digital ecosystem.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — SERVICES OVERVIEW CATALOGUE */}
      <section className="w-full pb-20 lg:pb-32 bg-white">
        <Container>
          <div className="flex flex-col border-t border-gray-200">
            {servicesData.map((service, idx) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col lg:flex-row py-12 lg:py-16 border-b border-gray-200 gap-8 lg:gap-16 group scroll-mt-24"
              >
                {/* Number & Title */}
                <div className="lg:w-1/3 flex flex-col">
                  <span className="text-5xl font-bold text-gray-200 tracking-tighter mb-4 group-hover:text-cta transition-colors duration-500">
                    {service.number}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                    {service.title}
                  </h2>
                </div>

                {/* Details */}
                <div className="lg:w-2/3 flex flex-col lg:flex-row gap-8 lg:gap-16">
                  <div className="lg:w-1/2 flex flex-col">
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:text-cta transition-colors w-fit mt-auto group/link">
                      Inquire about {service.title}
                      <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Capabilities List */}
                  <div className="lg:w-1/2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
                      Key Deliverables
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {service.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-light mt-2 shrink-0" />
                          <span className="text-gray-700 font-medium leading-relaxed">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — HOW WE APPROACH SERVICES */}
      <section className="w-full py-20 lg:py-32 bg-primary overflow-hidden">
        <Container>
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
              Our Methodology
            </h2>
            <p className="text-white/70 text-lg max-w-xl">
              We do not treat services as isolated tasks. Every deliverable exists within a holistic ecosystem designed to drive continuous growth.
            </p>
          </motion.div>

          {/* Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Strategy", desc: "Rigorous planning and foundational research before execution begins." },
              { title: "Execution", desc: "Precision implementation driven by premium design and technical standards." },
              { title: "Measurement", desc: "Constant data tracking, analytics integration, and performance monitoring." },
              { title: "Improvement", desc: "Iterative optimization to continuously scale and refine outcomes." }
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                {/* Connector Line (hidden on mobile) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/20 z-0" />
                )}

                <span className="text-sm font-bold text-cta tracking-widest uppercase mb-4 block">
                  Phase 0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <GlobalCTA />
    </>
  );
}
