import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { GlobalCTA } from '../ui/GlobalCTA';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function LegalPageLayout({ title, eyebrow, lastUpdated, sections }) {
  // Smooth scroll handler for ToC links
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-32">
      {/* HEADER SECTION */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-gray-100 bg-gray-50">
        <Container>
          <motion.div {...fadeIn} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cta" />
              <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                {eyebrow}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-gray-500 font-medium">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* CONTENT LAYOUT */}
      <section className="w-full pt-16 lg:pt-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* LEFT COLUMN: TABLE OF CONTENTS */}
            <div className="w-full lg:w-1/4 shrink-0">
              <div className="lg:sticky lg:top-32 bg-gray-50 p-6 rounded-xl border border-gray-100 lg:bg-transparent lg:p-0 lg:border-none lg:rounded-none">
                <h2 className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase mb-6 lg:mb-8">
                  Table of Contents
                </h2>
                <nav className="flex flex-col gap-3">
                  {sections.map((section) => (
                    <a 
                      key={`toc-${section.id}`} 
                      href={`#${section.id}`}
                      onClick={(e) => handleScrollTo(e, section.id)}
                      className="text-sm text-gray-600 hover:text-primary transition-colors font-medium leading-snug"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* RIGHT COLUMN: MAIN CONTENT */}
            <div className="w-full lg:w-3/4 max-w-3xl">
              <div className="flex flex-col gap-12 lg:gap-16">
                {sections.map((section) => (
                  <motion.div 
                    key={section.id} 
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-32" // Ensures jump links don't hide behind sticky header
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-6">
                      {section.title}
                    </h2>
                    
                    <div className="flex flex-col gap-4">
                      {section.content.map((block, idx) => {
                        if (block.type === 'paragraph') {
                          return (
                            <p key={idx} className="text-gray-600 text-lg leading-relaxed">
                              {block.text}
                            </p>
                          );
                        }
                        if (block.type === 'list') {
                          return (
                            <ul key={idx} className="list-disc pl-6 text-gray-600 text-lg leading-relaxed space-y-2">
                              {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* MANDATORY LEGAL DISCLAIMER */}
              <div className="mt-20 pt-10 border-t border-gray-200">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    <strong className="font-bold text-gray-700 not-italic">Notice:</strong> These terms are provided as a general business framework and should be reviewed and adapted to Zenvix's actual business practices and applicable local law before being treated as a final legal agreement.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* GLOBAL CTA */}
      <GlobalCTA />
    </div>
  );
}
