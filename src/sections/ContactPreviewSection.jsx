import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';

export function ContactPreviewSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    service: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request for frontend demo purposes
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: '', email: '', phone: '', budget: '', service: [], message: '' });
      }, 5000);
    }, 1500);
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
                  <a href="mailto:hello@zenvix.com" className="text-white text-lg hover:text-cta transition-colors duration-300">
                    hello@zenvix.com
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
                      className={inputClasses}
                    />
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
                      className={inputClasses}
                    />
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
                    <label htmlFor="budget" className={labelClasses}>Budget in Mind *</label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formState.budget}
                        onChange={handleInputChange}
                        className={`${inputClasses} appearance-none pr-12 [&>option]:bg-gray-900 [&>option]:text-white`}
                      >
                        <option value="" disabled className="text-gray-500">Select a budget...</option>
                        <option value="<5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Selection (Pill UI) */}
                <div>
                  <label className={labelClasses}>Service Interested In *</label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'web-development', label: 'Web Development' },
                      { id: 'seo', label: 'SEO' },
                      { id: 'link-building', label: 'Link Building' },
                      { id: 'content-marketing', label: 'Content' },
                      { id: 'social-media', label: 'Social Media' },
                      { id: 'paid-advertising', label: 'Paid Ads' },
                      { id: 'other', label: 'Other' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 focus:ring-offset-[#004B64] ${
                          formState.service.includes(s.id)
                            ? 'bg-cta border-cta text-white shadow-md'
                            : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  {/* Hidden input to enforce HTML5 'required' validation if no service is selected */}
                  <input type="text" className="sr-only" required value={formState.service.join(',')} onChange={() => {}} tabIndex={-1} />
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
                    className={`${inputClasses} resize-none`}
                  />
                </div>

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
                    className={`w-full sm:w-auto px-10 py-4 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta focus:ring-offset-primary flex justify-center items-center ${
                      isSuccess 
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
                      "Inquiry Sent!"
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
