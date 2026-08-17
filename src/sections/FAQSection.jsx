import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const faqData = [
  {
    id: "faq-1",
    question: "What specific services does Zenvix provide?",
    answer: "We specialize in end-to-end digital solutions, primarily focusing on high-performance web development, technical SEO, UI/UX design, and comprehensive digital marketing strategies designed to increase revenue."
  },
  {
    id: "faq-2",
    question: "Who does Zenvix typically work with?",
    answer: "We partner with ambitious brands, established enterprises, and forward-thinking startups that recognize the value of investing in high-quality digital infrastructure to outpace their competition."
  },
  {
    id: "faq-3",
    question: "How does a typical project begin?",
    answer: "Every engagement starts with a deep-dive discovery phase. We analyze your current digital presence, understand your business objectives, and establish a clear strategic roadmap before any execution begins."
  },
  {
    id: "faq-4",
    question: "Can Zenvix work with an existing website?",
    answer: "Yes. Depending on your current architecture, we can either optimize and scale your existing platform or recommend a complete rebuild if your current foundation limits your growth potential."
  },
  {
    id: "faq-5",
    question: "Do you handle both web development and marketing?",
    answer: "Absolutely. We believe that development and marketing should not exist in silos. We engineer websites specifically designed to perform well in search engines and convert marketing traffic efficiently."
  },
  {
    id: "faq-6",
    question: "How long does a typical project take?",
    answer: "Timelines depend entirely on the project scope and complexity. A focused landing page ecosystem might take a few weeks, while a comprehensive enterprise web platform and SEO campaign spans several months."
  },
  {
    id: "faq-7",
    question: "Are your services customized based on business requirements?",
    answer: "We do not use cookie-cutter templates or generic strategies. Every solution is custom-architected based on your specific market, audience, and revenue goals."
  },
  {
    id: "faq-8",
    question: "How can I start a project with Zenvix?",
    answer: "You can start by reaching out through our contact page. We will schedule an initial consultation to discuss your needs, assess whether we are a good fit, and outline the next steps."
  }
];

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group"
      >
        <span className={`text-lg lg:text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-cta' : 'text-primary group-hover:text-primary-light'}`}>
          {item.question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-cta bg-cta text-white' : 'border-gray-300 text-gray-500 group-hover:border-primary-light group-hover:text-primary-light'}`}>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-content`}
            role="region"
            aria-labelledby={`${item.id}-header`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-gray-600 leading-relaxed text-base lg:text-lg">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  // Only one FAQ open at a time (null means all closed)
  const [openId, setOpenId] = useState(faqData[0].id);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Column: Context (Sticky on Desktop) */}
          <div className="w-full lg:w-[40%] relative">
            <div className="lg:sticky lg:top-32 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-cta" />
                  <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    FAQ
                  </span>
                </div>

                <h2 className="text-4xl lg:text-[2.75rem] font-bold text-primary leading-[1.15] tracking-tight mb-6">
                  Clarity before execution.
                </h2>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
                  Find answers to common questions about our engagement process, methodology, and capabilities. Need something more specific?
                </p>

                <Button variant="primary" className="w-full sm:w-auto px-8 py-3">
                  Contact Zenvix
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full lg:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="border-t border-gray-200 mt-4 lg:mt-0"
            >
              {faqData.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => toggleAccordion(item.id)}
                />
              ))}
            </motion.div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
