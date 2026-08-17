import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'SEO', href: '/services/seo' },
    { name: 'Link Building', href: '/services/link-building' },
    { name: 'Content Marketing', href: '/services/content-marketing' },
    { name: 'PPC', href: '/services/ppc' },
    { name: 'Social Media Marketing', href: '/services/social-media' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Payment Terms & Conditions', href: '/terms' },
  ]
};

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 sm:pt-28 overflow-hidden mt-auto">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12"
        >
          {/* Brand Info */}
          <div className="lg:col-span-2 sm:pr-8">
            <a
              href="/"
              className="inline-block text-3xl font-bold tracking-tight mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm hover:opacity-90 transition-opacity"
            >
              Zenvix<span className="text-cta">.</span>
            </a>
            <p className="text-primary-light max-w-sm text-[15px] leading-relaxed">
              A premium digital agency crafting sophisticated digital experiences and driving measurable business growth.
            </p>
          </div>

          {/* Navigation Groups */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-colors text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Services</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-colors text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Resources</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-light hover:text-white transition-colors text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 3 & 4. Copyright and Legal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t border-primary-light/20 flex flex-col sm:flex-row justify-between items-center gap-6 text-[14px]"
        >
          <div className="text-primary-light/80">
            &copy; 2026 Zenvix. All rights reserved.
          </div>
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-primary-light/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm py-0.5 inline-block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </footer>
  );
}
