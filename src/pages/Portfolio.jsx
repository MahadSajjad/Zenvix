import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { Link } from 'react-router-dom';
import { PortfolioCard } from '../components/ui/PortfolioCard';
import { portfolioData } from '../data/portfolio';

const categories = [
  "All",
  "Web Development",
  "UI/UX",
  "Branding",
  "SEO",
  "Digital Marketing"
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeCategory);

  return (
    <>
      {/* SECTION 1 — PORTFOLIO HERO */}
      <section className="relative w-full pt-32 pb-12 lg:pt-48 lg:pb-16 bg-white overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  Our Work
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Work that turns ideas into digital experiences.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                A curated selection of conceptual digital experiences, sophisticated website architectures, and structural brand identities engineered by Zenvix.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — FILTER */}
      <section className="w-full pb-10 bg-white sticky top-0 z-20 pt-4 -mt-4 border-b border-gray-100">
        <Container>
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — FEATURED CASE STUDIES GRID */}
      <section className="w-full py-16 lg:py-24 bg-white min-h-[50vh]">
        <Container>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {filteredProjects.map((project, index) => (
                <PortfolioCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-500">No conceptual projects found for this category.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-primary font-bold hover:text-cta transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* SECTION 5 — OUR CAPABILITIES */}
      <section className="w-full py-20 lg:py-32 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                From strategy to execution.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every project we undertake is built upon a foundation of comprehensive capabilities including Web Development, UI/UX Design, SEO, Content Marketing, and Digital Strategy.
              </p>
            </div>
            
            <div className="shrink-0">
              <Link to="/services">
                <Button variant="outline" className="px-8 py-3">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <GlobalCTA />
    </>
  );
}
