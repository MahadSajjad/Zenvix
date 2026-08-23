import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { FaWhatsapp } from 'react-icons/fa';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none flex justify-center">
        <header
          className={`pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 transition-all duration-500 rounded-2xl border ${isScrolled
            ? 'bg-gradient-to-r from-gray-100/80 via-gray-100/80 via-[70%] to-primary/85 backdrop-blur-xl border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
            : 'bg-gradient-to-r from-gray-100/70 via-gray-100/70 via-[70%] to-primary/80 backdrop-blur-lg border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold text-primary tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-opacity hover:opacity-80"
            aria-label="Zenvix Home"
          >
            Zenvix<span className="text-cta">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[14px] font-medium text-gray-700 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/30 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 xl:gap-6">
            <a
              href="https://wa.me/923156360381"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-black hover:text-green-600 transition-colors p-2 -mr-2 md:-mr-0"
              aria-label="Contact on WhatsApp"
            >
              <FaWhatsapp size={28} />
            </a>

            <Link to="/contact" className="hidden md:inline-flex">
              <Button variant="primary" className="text-[14px] px-6 py-2.5 shadow-sm hover:shadow-md">
                Let's Talk
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 -mr-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between relative">
                <span className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-full h-[2px] bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
              </div>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-3xl lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-[100dvh] pt-28 px-6 pb-6">
              <nav className="flex flex-col gap-6 mt-4">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.href}
                      className="text-3xl font-semibold text-primary hover:text-cta transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md inline-block w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
                className="mt-auto pt-12 pb-8 md:hidden shrink-0"
              >
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-lg">
                    Let's Talk
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
