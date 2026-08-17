import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <Container className="flex items-center justify-between">
        <div className="font-bold text-2xl text-primary tracking-tight">Zenvix.</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/services" className="hover:text-primary transition-colors">Services</a>
          <a href="/portfolio" className="hover:text-primary transition-colors">Portfolio</a>
        </nav>
        <Button variant="primary" className="hidden sm:inline-flex">Get in touch</Button>
      </Container>
    </header>
  );
}
