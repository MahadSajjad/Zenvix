import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FAQItem } from '../components/ui/FAQItem';
import { faqData } from '../data/faqs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function FAQ() {
  // Global active state for the accordion. Only one FAQ can be open at a time.
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // Group FAQs by category for better usability
  const groupedFAQs = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — FAQ HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b border-gray-100">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  FAQ
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Questions, answered.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Find clear answers to common questions about our services, process, and how we engineer digital solutions for our clients.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — FAQ CONTENT (Two-Column Layout) */}
      <section className="w-full py-20 lg:py-32">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* Left Column: Sticky Intro */}
            <div className="lg:w-1/3 shrink-0">
              <motion.div 
                {...fadeIn}
                className="lg:sticky lg:top-32"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                  Need clarity before we start?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe in complete transparency. Review our most frequently asked questions to understand our collaborative framework.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:w-2/3">
              <div className="flex flex-col gap-16">
                {Object.entries(groupedFAQs).map(([category, faqs], index) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col"
                  >
                    <h3 className="text-sm font-bold tracking-[0.15em] text-gray-400 uppercase mb-4 border-b border-gray-100 pb-4">
                      {category}
                    </h3>
                    <div className="flex flex-col">
                      {faqs.map((faq) => (
                        <FAQItem
                          key={faq.id}
                          faq={faq}
                          isOpen={activeId === faq.id}
                          onToggle={() => handleToggle(faq.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* SECTION 3 — STILL HAVE QUESTIONS CTA */}
      <section className="w-full py-20 lg:py-32 bg-gray-50 border-t border-gray-200">
        <Container>
          <motion.div 
            {...fadeIn}
            className="flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-6">
              Still have a question?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Tell us what you're working on and we'll help you figure out the right next step for your digital strategy.
            </p>
            <Link to="/contact">
              <Button variant="primary" className="px-10 py-4 text-lg">
                Let's Talk
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
