import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn } from 'react-icons/fa';
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
    { name: 'Web Development', href: '/services' },
    { name: 'On-Page SEO', href: '/services' },
    { name: 'Off-Page SEO', href: '/services' },
    { name: 'Content Marketing', href: '/services' },
    { name: 'Social Media Marketing', href: '/services' },
    { name: 'Keyword Research', href: '/services' },
    { name: 'UI/UX Designing', href: '/services' },
    { name: 'Graphic Designing', href: '/services' },
    { name: 'Guest Posting & Link Building', href: '/services' },
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
    <footer className="bg-gradient-to-b from-primary from-[30%] to-cta text-white pt-20 pb-8 sm:pt-28 overflow-hidden mt-auto">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12"
        >
          {/* Brand Info */}
          <div className="lg:col-span-2 sm:pr-8 flex flex-col h-full">
            <Link
              to="/"
              className="inline-block text-3xl font-bold tracking-tight mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm hover:opacity-90 transition-opacity w-fit"
            >
              Zenvix<span className="text-cta">.</span>
            </Link>
            <p className="text-white/80 hover:text-white transition-colors duration-500 max-w-sm text-[15px] leading-relaxed mb-6">
              A premium digital agency crafting sophisticated digital experiences and driving measurable business growth.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cta hover:text-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cta hover:text-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cta hover:text-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cta hover:text-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta" aria-label="TikTok">
                <FaTiktok size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cta hover:text-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Groups */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-500 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Services</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-500 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-white tracking-wide">Resources</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-500 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm inline-block"
                  >
                    {link.name}
                  </Link>
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
          className="pt-8 border-t border-black/40 flex flex-col sm:flex-row justify-between items-center gap-6 text-[14px]"
        >
          <div className="text-white/80">
            &copy; 2026 Zenvix. Developed By <a href="https://mahadsajjad.vercel.app" target='_blank' rel='noopener noreferrer'><b>Mahad Sajjad</b></a>
          </div>
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-500 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded-sm py-0.5 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </footer>
  );
}
