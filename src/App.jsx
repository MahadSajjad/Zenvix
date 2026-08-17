import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { PortfolioPreviewSection } from './sections/PortfolioPreviewSection';
import { AboutPreviewSection } from './sections/AboutPreviewSection';
import { ProcessSection } from './sections/ProcessSection';
import { FAQSection } from './sections/FAQSection';
import { ContactPreviewSection } from './sections/ContactPreviewSection';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <PortfolioPreviewSection />
        <AboutPreviewSection />
        <ProcessSection />
        <FAQSection />
        <ContactPreviewSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
