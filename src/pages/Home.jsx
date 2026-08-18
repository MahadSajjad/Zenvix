import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { ServicesSection } from '../sections/ServicesSection';
import { PortfolioPreviewSection } from '../sections/PortfolioPreviewSection';
import { AboutPreviewSection } from '../sections/AboutPreviewSection';
import { ProcessSection } from '../sections/ProcessSection';
import { FAQSection } from '../sections/FAQSection';
import { ContactPreviewSection } from '../sections/ContactPreviewSection';

export function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioPreviewSection />
      <AboutPreviewSection />
      <ProcessSection />
      <FAQSection />
      <ContactPreviewSection />
    </>
  );
}
