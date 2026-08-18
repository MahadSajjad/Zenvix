import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { submitContactForm } from '../services/contactService';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitted_dev'

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Project details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Call structural placeholder service (no artificial delay)
      const response = await submitContactForm(formData);
      
      if (response.status === 'development_ready') {
        setFormState('submitted_dev');
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-32">
      {/* SECTION 1 — CONTACT HERO */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden border-b border-gray-100 bg-gray-50">
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                  Let's Talk
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] tracking-tight mb-8">
                Have a project in mind?
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Tell us what you're building, what you're trying to improve, or where you're stuck. We'll take it from there.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — CONTACT LAYOUT */}
      <section className="w-full pt-16 lg:pt-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* LEFT: Intro & What Happens Next */}
            <div className="lg:w-1/3 shrink-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:sticky lg:top-32"
              >
                <div className="mb-16">
                  <h2 className="text-sm font-bold tracking-[0.15em] text-gray-400 uppercase mb-8">
                    What Happens Next
                  </h2>
                  <ul className="space-y-6">
                    {[
                      { num: "01", text: "We review your inquiry" },
                      { num: "02", text: "We understand your requirements" },
                      { num: "03", text: "We discuss the right approach" },
                      { num: "04", text: "We define the next step" }
                    ].map((step) => (
                      <li key={step.num} className="flex items-start gap-4">
                        <span className="font-bold text-primary-light shrink-0">{step.num}</span>
                        <span className="text-gray-600 font-medium">{step.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold tracking-[0.15em] text-gray-500 uppercase mb-4">
                    Contact Details
                  </h3>
                  <p className="text-gray-600 italic text-sm">
                    Direct contact information will be added upon final business setup.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {formState === 'idle' ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8"
                    noValidate
                  >
                    {/* Personal Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold tracking-wide text-primary">Name *</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-colors ${errors.name ? 'border-cta focus:border-cta text-cta' : 'border-gray-200 focus:border-primary text-gray-900'}`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && <span id="name-error" className="text-xs font-bold text-cta mt-1">{errors.name}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold tracking-wide text-primary">Email *</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-colors ${errors.email ? 'border-cta focus:border-cta text-cta' : 'border-gray-200 focus:border-primary text-gray-900'}`}
                          placeholder="jane@example.com"
                        />
                        {errors.email && <span id="email-error" className="text-xs font-bold text-cta mt-1">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Optional Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-bold tracking-wide text-gray-500">Phone / WhatsApp (Optional)</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors text-gray-900"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="company" className="text-sm font-bold tracking-wide text-gray-500">Company (Optional)</label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors text-gray-900"
                          placeholder="Organization Name"
                        />
                      </div>
                    </div>

                    {/* Service & Budget Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-sm font-bold tracking-wide text-primary">Service *</label>
                        <select 
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          aria-invalid={errors.service ? "true" : "false"}
                          className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-colors appearance-none rounded-none ${errors.service ? 'border-cta focus:border-cta text-cta' : 'border-gray-200 focus:border-primary text-gray-900'}`}
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Web Development">Web Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="SEO">SEO</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Content Marketing">Content Marketing</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.service && <span className="text-xs font-bold text-cta mt-1">{errors.service}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="budget" className="text-sm font-bold tracking-wide text-gray-500">Budget Range (Optional)</label>
                        <select 
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors text-gray-900 appearance-none rounded-none"
                        >
                          <option value="" disabled>Select a range</option>
                          <option value="Not sure yet">Not sure yet</option>
                          <option value="Prefer to discuss">Prefer to discuss</option>
                          <option value="Custom project">Custom project</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-bold tracking-wide text-primary">Project Details *</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={errors.message ? "true" : "false"}
                        className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-colors resize-y min-h-[100px] ${errors.message ? 'border-cta focus:border-cta text-cta' : 'border-gray-200 focus:border-primary text-gray-900'}`}
                        placeholder="Tell us about your goals, current challenges, and what you're trying to achieve..."
                      />
                      {errors.message && <span className="text-xs font-bold text-cta mt-1">{errors.message}</span>}
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <Button type="submit" variant="primary" className="w-full sm:w-auto px-12 py-4">
                        Submit Inquiry
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  // DEVELOPMENT MODE / BACKEND PENDING STATE
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-gray-50 p-10 md:p-16 rounded-[2rem] border border-gray-200 text-center flex flex-col items-center justify-center min-h-[500px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">Frontend Form Architecture Ready</h2>
                    <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                      Your inquiry has <strong>not</strong> been sent. This form is operating in development mode pending backend API / WordPress REST integration.
                    </p>
                    <Button variant="outline" onClick={() => setFormState('idle')}>
                      Reset Form State
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
