import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function About() {
  return (
    <>
      {/* SECTION 1 — ABOUT HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden">
        {/* Subtle branded abstract element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  About Zenvix
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Building purposeful digital experiences that drive measurable growth.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                We are a premium digital agency that partners with ambitious businesses to engineer sophisticated, high-performance digital solutions designed to scale.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — OUR STORY / POSITIONING */}
      <section className="w-full py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="w-full lg:w-1/3">
              <motion.h2 
                {...fadeIn}
                className="text-3xl lg:text-4xl font-bold text-primary tracking-tight sticky top-32"
              >
                Strategy, Design, <br/>& Technology.
              </motion.h2>
            </div>
            
            <div className="w-full lg:w-2/3">
              <motion.div {...fadeIn} className="prose prose-lg text-gray-600 max-w-3xl">
                <p className="mb-6">
                  At Zenvix, we believe that effective digital solutions require more than just writing code or pushing pixels. It requires a fundamental understanding of your business objectives, your target audience, and the technological landscape.
                </p>
                <p className="mb-6">
                  We bring together expert strategy, high-end visual design, robust technological architecture, and aggressive digital marketing. This multidisciplinary approach ensures that every project we deliver is not only aesthetically breathtaking, but structurally sound and optimized for maximum conversion.
                </p>
                <p>
                  We don't build generic templates. We build highly customized, premium digital assets that serve as the foundation for your long-term business growth.
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — OUR APPROACH */}
      <section className="w-full py-20 lg:py-32 bg-white">
        <Container>
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-4xl font-bold text-primary tracking-tight">Our Approach</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
            {[
              {
                num: "01",
                title: "Strategy First",
                desc: "We rigorously analyze your business, target audience, and objectives before a single line of code is written or pixel is placed."
              },
              {
                num: "02",
                title: "Built With Purpose",
                desc: "Every technical architecture choice and design detail has a distinct reason. Nothing is arbitrary; everything serves your core objective."
              },
              {
                num: "03",
                title: "Creative + Technical",
                desc: "We combine world-class visual communication and typography with highly reliable, secure, and modern engineering practices."
              },
              {
                num: "04",
                title: "Built to Grow",
                desc: "We engineer scalable digital foundations that evolve rapidly alongside your business, adapting to new challenges seamlessly."
              }
            ].map((principle, idx) => (
              <motion.div 
                key={principle.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-6 sm:pl-8 border-l border-gray-200"
              >
                <div className="absolute top-0 left-0 -translate-x-[1px] w-[2px] h-12 bg-cta" />
                <span className="block text-5xl font-bold text-gray-200 mb-4 tracking-tighter">
                  {principle.num}
                </span>
                <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — WHAT WE DO */}
      <section className="w-full py-20 lg:py-32 bg-primary text-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <motion.div {...fadeIn} className="w-full lg:w-1/3">
              <h2 className="text-4xl font-bold tracking-tight mb-6">What We Do</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                A comprehensive suite of digital services designed to architect, launch, and aggressively scale your brand.
              </p>
              <Link to="/services">
                <Button variant="primary" className="px-8 py-3">
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>

            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 border-t border-white/10 pt-8">
                {[
                  "Web Development",
                  "Search Engine Optimization (SEO)",
                  "Technical Link Building",
                  "Content Marketing",
                  "Social Media Marketing",
                  "Paid Advertising (PPC)"
                ].map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cta group-hover:scale-150 transition-transform" />
                    <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — WHY WORK WITH ZENVIX */}
      <section className="w-full py-20 lg:py-32 bg-white">
        <Container>
          <motion.div {...fadeIn} className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 text-lg">We operate as a true extension of your team, driven by clarity and deep structural alignment.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Clear Communication",
                desc: "No technical jargon or confusing agency speak. We maintain absolute transparency regarding timelines, deliverables, and strategies."
              },
              {
                title: "Purposeful Execution",
                desc: "We don't waste time on features that don't drive value. Everything we produce is relentlessly focused on solving your core problems."
              },
              {
                title: "Long-Term Thinking",
                desc: "We don't build disposable assets. We architect solutions meant to endure, scale, and generate compounding value over the years."
              }
            ].map((theme, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary-light" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{theme.title}</h3>
                <p className="text-gray-600 leading-relaxed">{theme.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <GlobalCTA />
    </>
  );
}
