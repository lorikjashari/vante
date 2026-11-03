import { useState } from 'react';
import { Mail, Phone, Send, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import AmbientBackground from './AmbientBackground';
import SectionHeader from './ui/SectionHeader';
import { Input, Textarea } from './ui/Input';
import Button from './ui/Button';
import Toast from './Toast';
import Reveal from './Reveal';
import SeoFaq from './SeoFaq';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('access_key', 'bbe792a4-187b-4d9e-82d6-c9fbfb859275');
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        setToast({ message: 'Received. We\'ll be in touch within 24 hours.', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({ message: 'Something went wrong. Email us at contact@vanteagency.dev', type: 'error' });
      }
    } catch {
      setToast({ message: 'Something went wrong. Email us at contact@vanteagency.dev', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();

  const links = [
    { icon: Phone, label: 'Phone', value: '+383 44 296 750', href: 'tel:+38344296750' },
    { icon: Mail, label: 'Email', value: 'contact@vanteagency.dev', href: 'mailto:contact@vanteagency.dev' },
    { icon: MapPin, label: 'Based in', value: 'Kosovo · Worldwide', href: undefined },
  ];

  return (
    <section id="contact" className="section-shell bg-cream overflow-hidden">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AmbientBackground variant="light" />
      <div className="section-shell-inner gap-3 md:gap-0 flex-1 min-h-0 overflow-y-auto scrollbar-hide md:overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeader
                label="Contact"
                title="What's your vision?"
                description="Tell us what you're building. We respond within 24 hours — with clarity, not filler."
                align="left"
                className="!mb-0 md:!mb-10 [&_h2]:text-[2.6rem] [&_h2]:md:text-[4.2rem] [&_p]:hidden [&_p]:md:block"
              />
            </Reveal>

            <div className="space-y-2 mt-4 md:mt-8 md:space-y-3">
              {links.map((link, index) => {
                const Icon = link.icon;
                const inner = (
                  <>
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-charcoal/40 flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-charcoal/35 mb-0.5">{link.label}</p>
                      <p className="text-xs md:text-base text-charcoal truncate">{link.value}</p>
                    </div>
                    {link.href && <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-charcoal/25 group-hover:text-charcoal/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </>
                );

                return (
                  <Reveal key={link.label} delay={80 + index * 70}>
                    {link.href ? (
                      <a
                        href={link.href}
                        data-cursor-magnetic="strong"
                        className="contact-link group flex items-center gap-3 md:gap-4 py-3 md:py-4 border-b border-charcoal/12 hover:border-charcoal/45 transition-all duration-300"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4 border-b border-charcoal/12">
                        {inner}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="border-t border-charcoal/20 bg-charcoal p-5 md:p-8 lg:p-10 space-y-4 md:space-y-5 self-start transition-transform duration-500 hover:-translate-y-1"
            >
              <p className="text-cream/50 text-xs md:text-sm mb-1 md:mb-2">Start here</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  dark
                />
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  dark
                />
              </div>
              <Textarea
                label="Message"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                placeholder="What are you looking to build?"
                dark
              />
              <Button
                type="submit"
                variant="inverse"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
                icon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <SeoFaq />
        </Reveal>

        <Reveal delay={200}>
          <footer className="hidden md:flex mt-14 md:mt-20 pt-6 border-t border-charcoal/8 flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/task_01kcac84xvf3srayqjx46je6a4_1765580016_img_0.webp"
                alt="Vanté Agency"
                className="h-7 w-7 rounded-md object-cover"
              />
              <span className="text-sm tracking-tight text-charcoal">Vanté Agency</span>
            </div>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/40 hover:text-charcoal transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>

            <p className="text-[11px] text-charcoal/35 tracking-wide">
              © {currentYear} Vanté Agency
            </p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
