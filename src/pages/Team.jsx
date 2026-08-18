import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { Link } from 'react-router-dom';
import { TeamMember } from '../components/ui/TeamMember';
import { useTeam } from '../hooks/useTeam';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Team() {
  const { team: teamData } = useTeam();
  return (
    <>
      {/* SECTION 1 — TEAM HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  The Team
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                The people behind the work.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                We believe that premium digital experiences are born from the intersection of strategy, design, technology, and collaborative thinking.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — TEAM PHILOSOPHY */}
      <section className="w-full py-16 lg:py-24 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="lg:w-1/3">
              <motion.h2 
                {...fadeIn}
                className="text-3xl lg:text-4xl font-bold text-primary tracking-tight"
              >
                Our Philosophy
              </motion.h2>
            </div>
            
            <div className="lg:w-2/3">
              <motion.div {...fadeIn} className="prose prose-lg text-gray-600 max-w-3xl">
                <p>
                  At Zenvix, we don't operate in silos. Every digital solution we engineer is the result of shared responsibility and rigorous collaboration across multiple disciplines. 
                </p>
                <p className="mt-4">
                  By bringing together diverse perspectives from strategic planning, creative direction, and technical architecture, we ensure that every project is conceptually sound, visually striking, and technologically robust.
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — TEAM PROFILES */}
      <section className="w-full py-20 lg:py-32 bg-white">
        <Container>
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">Meet the Zenvix Team</h2>
          </motion.div>

          {teamData && teamData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {teamData.map((member, index) => (
                <TeamMember 
                  key={member.id} 
                  member={member} 
                  isFeatured={index === 0} 
                />
              ))}
            </div>
          ) : (
            /* Premium Empty State Presentation */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[4/3] lg:aspect-[21/9] bg-primary flex flex-col items-center justify-center p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
            >
              {/* Abstract decorative element */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 text-center max-w-2xl">
                <div className="w-16 h-1 bg-cta mx-auto mb-8" />
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                  Team profiles will be introduced here as the agency grows.
                </h3>
                <p className="text-white/70 text-lg md:text-xl font-light">
                  Structural architecture is ready for future CMS integration.
                </p>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* SECTION 4 — HOW WE WORK TOGETHER */}
      <section className="w-full py-20 lg:py-32 bg-gray-50 border-t border-gray-100">
        <Container>
          <motion.div {...fadeIn} className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">How We Collaborate</h2>
            <p className="text-gray-600 text-lg">Our internal workflow is designed to break down barriers between strategy and execution.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Understand",
                desc: "We begin by establishing a shared understanding of the business objective across all disciplines."
              },
              {
                num: "02",
                title: "Collaborate",
                desc: "Design, development, and marketing perspectives are brought together early to identify blind spots."
              },
              {
                num: "03",
                title: "Build",
                desc: "We execute the strategy cohesively, ensuring technical architecture supports creative vision."
              },
              {
                num: "04",
                title: "Refine",
                desc: "The entire team reviews the output, rigorously testing and polishing before final deployment."
              }
            ].map((step, idx) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-6 sm:pl-8 border-l border-gray-200"
              >
                <div className="absolute top-0 left-0 -translate-x-[1px] w-[2px] h-12 bg-primary-light" />
                <span className="block text-4xl font-bold text-gray-200 mb-3 tracking-tighter">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-primary mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5 — OPEN CTA */}
      <GlobalCTA />
    </>
  );
}
