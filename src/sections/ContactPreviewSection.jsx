import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { useServices } from '../hooks/useServices';
import { submitContactForm } from '../services/contactService';

export function ContactPreviewSection() {
  const { services } = useServices();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    service: [],
    message: '',
    _honey_pot_field: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (id) => {
    setFormState(prev => {
      const isSelected = prev.service.includes(id);
      return {
        ...prev,
        service: isSelected
          ? prev.service.filter(s => s !== id)
          : [...prev.service, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setFieldErrors({});

    if (formState.service.length === 0) {
      setFieldErrors({ service: 'Please select at least one service.' });
      return;
    }

    setIsSubmitting(true);

    const selectedServices = formState.service.map(id => {
      const s = services.find(srv => srv.id === id);
      return s ? s.title : id;
    });

    const payload = {
      ...formState,
      service: selectedServices
    };

    const response = await submitContactForm(payload);

    setIsSubmitting(false);

    if (response.status === 'success') {
      setIsSuccess(true);
    } else {
      setApiError(response.message);
      if (response.errors) {
        setFieldErrors(response.errors);
      }
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-white/80 mb-2";

  return (
    <section className="relative w-full pt-24 lg:pt-32 pb-16 lg:pb-24 bg-primary overflow-hidden">

      {/* Background subtle accent */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-light/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column: Context */}
          <div className="w-full lg:w-[45%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cta" />
                <span className="text-xs font-bold tracking-[0.2em] text-primary-light uppercase">
                  Let's Work Together
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
                Have a project in mind?
              </h2>

              <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-md">
                Whether you need a high-performance digital platform, an aggressive SEO strategy, or a complete digital transformation—we are ready to architect your solution.
              </p>

              {/* Optional Contact Info */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-primary-light font-medium mb-1">Email Us</span>
                  <a href="mailto:info@zenvix.net" className="text-white text-lg hover:text-cta transition-colors duration-300">
                    info@zenvix.net
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="w-full lg:w-[55%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClasses}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`${inputClasses} ${fieldErrors.name ? 'border-red-500/50 focus:border-red-500/80 focus:ring-red-500/30' : ''}`}
                    />
                    {fieldErrors.name && <p className="mt-2 text-sm text-red-400">{fieldErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className={`${inputClasses} ${fieldErrors.email ? 'border-red-500/50 focus:border-red-500/80 focus:ring-red-500/30' : ''}`}
                    />
                    {fieldErrors.email && <p className="mt-2 text-sm text-red-400">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className={inputClasses}
                    />
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label htmlFor="budget" className={labelClasses}>Budget in Mind (Optional)</label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleInputChange}
                        className={`${inputClasses} appearance-none pr-12 rounded-md [&>option]:bg-gray-900 [&>option]:text-white`}
                      >
                        <option value="" disabled className="text-gray-500">Select a budget...</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                        <option value="$2,000 - $3,000">$2,000 - $3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {fieldErrors.budget && <p className="mt-2 text-sm text-red-400">{fieldErrors.budget}</p>}
                  </div>
                </div>

                {/* Service Selection (Pill UI) */}
                <div>
                  <label className={labelClasses}>Service Interested In *</label>
                  <div className="flex flex-wrap gap-2.5">
                    {[...services, { id: 'other', shortTitle: 'Other' }].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 focus:ring-offset-[#004B64] ${formState.service.includes(s.id)
                          ? 'bg-cta border-cta text-white shadow-md'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {s.shortTitle || s.title}
                      </button>
                    ))}
                  </div>
                  {/* Hidden input to enforce HTML5 'required' validation if no service is selected */}
                  <input type="text" className="sr-only" required value={formState.service.join(',')} onChange={() => { }} tabIndex={-1} />
                  {fieldErrors.service && <p className="mt-2 text-sm text-red-400">{fieldErrors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>Project Details / Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project goals, timeline, or current challenges..."
                    className={`${inputClasses} resize-none ${fieldErrors.message ? 'border-red-500/50 focus:border-red-500/80 focus:ring-red-500/30' : ''}`}
                  />
                  {fieldErrors.message && <p className="mt-2 text-sm text-red-400">{fieldErrors.message}</p>}
                </div>

                {/* Honeypot field (hidden from users, stops automated bots) */}
                <input
                  type="text"
                  name="_honey_pot_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState._honey_pot_field}
                  onChange={handleInputChange}
                  className="sr-only"
                  aria-hidden="true"
                />

                {apiError && (
                  <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400 font-medium">{apiError}</p>
                  </div>
                )}

                {/* Submit Area */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-xs text-white/50 w-full sm:w-auto">
                    * Required fields
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`w-full sm:w-auto px-10 py-4 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-primary flex justify-center items-center ${isSuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-cta text-white hover:bg-[#c94124]'
                      } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : isSuccess ? (
                      "Backend Pending"
                    ) : (
                      "Send Inquiry"
                    )}
                  </motion.button>
                </div>

              </form>
            </motion.div>
          </div>

        </div>
      </Container>

    </section>
  );
}
