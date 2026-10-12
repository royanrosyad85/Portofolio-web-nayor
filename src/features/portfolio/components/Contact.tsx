import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CircleNotch, GithubLogo, LinkedinLogo, PaperPlaneTilt } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { contactChannels, socialLinks } from '@/config/site';
import SectionHeader from '@/features/portfolio/components/SectionHeader';
import { revealDelay } from '@/hooks/use-scroll-reveal';

const encodeFormBody = (values: Record<string, string>) => new URLSearchParams(values).toString();

const iconSwap = { type: 'spring', bounce: 0, duration: 0.3 } as const;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormBody({
          'form-name': 'contact',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      toast.success('Message sent successfully. I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Message failed to send. Please try again or reach out directly by email.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = useMemo(
    () => [
      {
        label: 'LinkedIn',
        href: socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? 'https://www.linkedin.com/in/royanrosyad/',
        icon: LinkedinLogo,
      },
      {
        label: 'GitHub',
        href: socialLinks.find((link) => link.label === 'GitHub')?.href ?? 'https://github.com/royanrosyad85',
        icon: GithubLogo,
      },
    ],
    [],
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <SectionHeader
          label="Contact"
          title="Get in touch."
          description="If you are building an AI product, automation workflow, or machine learning system, feel free to reach out."
          titleId="contact-title"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-5 lg:col-span-5" data-reveal>
            <div className="grouped-list">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="grouped-row group"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.8125rem] font-medium text-muted-foreground">{channel.label}</span>
                    <span className="mt-0.5 block break-words text-[0.9375rem] font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                      {channel.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="shrink-0 text-foreground/30 transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Icon size={17} weight="regular" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="surface p-5 sm:p-8 lg:col-span-7" data-reveal style={revealDelay(80)}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: 'none' }}>
                <label htmlFor="bot-field">
                  Do not fill this out if you are human.
                  <input id="bot-field" name="bot-field" />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="field-label">
                  Name
                  <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required className="field" />
                </label>
                <label className="field-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    spellCheck={false}
                    required
                    className="field"
                  />
                </label>
              </div>

              <label className="field-label">
                Subject
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} autoComplete="off" required className="field" />
              </label>

              <label className="field-label">
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  rows={6}
                  className="field min-h-[10rem] resize-y py-3 leading-relaxed"
                />
              </label>

              <div className="pt-1">
                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="btn btn-primary w-full sm:w-auto">
                  {isSubmitting ? 'Sending message' : 'Send message'}
                  <span className="relative inline-flex h-4 w-4" aria-hidden="true">
                    <AnimatePresence initial={false}>
                      <motion.span
                        key={isSubmitting ? 'sending' : 'idle'}
                        initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                        transition={iconSwap}
                        className="absolute inset-0"
                      >
                        {isSubmitting ? (
                          <CircleNotch size={16} weight="bold" className="animate-spin" />
                        ) : (
                          <PaperPlaneTilt size={16} weight="bold" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
