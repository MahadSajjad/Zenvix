import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { PortfolioPreviewSection } from './sections/PortfolioPreviewSection';

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
