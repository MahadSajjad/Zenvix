import React from 'react';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="font-bold text-2xl tracking-tight mb-2">Zenvix.</div>
          <p className="text-primary-light text-sm">Premium digital experiences.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="/privacy-policy" className="hover:text-white text-primary-light transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white text-primary-light transition-colors">Terms & Conditions</a>
        </div>
      </Container>
    </footer>
  );
}
