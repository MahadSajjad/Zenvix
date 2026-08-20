import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { GlobalCTA } from '../components/ui/GlobalCTA';
import { usePortfolio } from '../hooks/usePortfolio';
import { Loader } from '../components/ui/Loader';

export function CaseStudy() {
  const { slug } = useParams();
  const { portfolio, loading } = usePortfolio();
  const project = portfolio.find(p => p.slug === slug);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center py-32 bg-white min-h-[70vh]">
        <Loader text="Loading case study..." />
      </div>
    );
  }

  // 404 State
  if (!project) {
    return (
      <div className="flex-grow flex items-center justify-center py-32 bg-white">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The conceptual project you are looking for does not exist or has been removed.
          </p>
          <Link to="/portfolio">
            <Button variant="primary">Return to Portfolio</Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="w-full pb-20 bg-white">
      {/* HEADER */}
      <header className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-50 border-b border-gray-200">
        <Container>
          <motion.div {...fadeIn} className="max-w-4xl">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-gray-500 hover:text-primary transition-colors mb-8"
            >
              <FiArrowLeft /> Back to Portfolio
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cta" />
              <span className="text-sm font-bold tracking-[0.15em] text-gray-500 uppercase">
                {project.category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </motion.div>
        </Container>
      </header>

      {/* FEATURED VISUAL */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 -mt-8 lg:-mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center ${!project.image ? project.placeholderColors : 'bg-gray-100'}`}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={`${project.title} Case Study`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Abstract representation fallback */}
              <div className="absolute top-8 left-8 z-20">
                <span className="text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-current opacity-70">
                  Concept Project Visual
                </span>
              </div>
              
              <div className="text-center opacity-30">
                <span className="text-5xl md:text-8xl font-bold tracking-tighter block mb-4">
                  {project.title.split(' ')[0]}
                </span>
                <div className="w-32 h-1 bg-current mx-auto mb-4 opacity-50" />
                <span className="text-2xl md:text-4xl font-light italic">
                  Zenvix Structural Demo
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* OVERVIEW & SERVICES */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-primary mb-6">Project Overview</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  This conceptual case study demonstrates how Zenvix approaches digital problem-solving within the <strong>{project.category}</strong> sector. The primary objective was to {project.challenge.toLowerCase()}
                </p>
                <p>
                  By prioritizing architectural integrity and user-centric design principles, we architected a solution that eliminates friction and establishes a premium digital presence.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold tracking-[0.15em] text-gray-500 uppercase mb-6">
                  Services Applied
                </h3>
                <ul className="flex flex-col gap-3">
                  {project.services.map(service => (
                    <li key={service} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cta" />
                      <span className="font-medium text-primary">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* THE PROCESS */}
      <section className="py-16 border-t border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <h3 className="text-xl font-bold text-primary w-48 shrink-0">The Challenge</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{project.challenge}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <h3 className="text-xl font-bold text-primary w-48 shrink-0">Our Approach</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{project.approach}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <h3 className="text-xl font-bold text-primary w-48 shrink-0">The Solution</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{project.solution}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <h3 className="text-xl font-bold text-primary w-48 shrink-0">The Outcome</h3>
                <div className="bg-primary-light/5 p-6 rounded-xl border border-primary-light/20 w-full">
                  <p className="text-lg text-primary-dark font-medium leading-relaxed">{project.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* NEXT PROJECT / CTA */}
      <GlobalCTA />
    </article>
  );
}
