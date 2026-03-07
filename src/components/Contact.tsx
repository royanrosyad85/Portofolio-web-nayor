import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GithubLogo, LinkedinLogo, MapPin, PaperPlaneTilt } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { contactChannels, socialLinks } from '@/data/portfolio';

const encodeFormBody = (values: Record<string, string>) => {
  return new URLSearchParams(values).toString();
};

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
    <section id="contact" className="px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="page-shell grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="editorial-card flex flex-col justify-between gap-8 p-6 sm:p-7 lg:p-8">
          <div className="space-y-5">
            <div className="section-kicker">Contact</div>
            <h2 className="section-title max-w-xl">If you are building an AI workflow or product surface, let’s make it usable.</h2>
            <p className="section-subtitle mb-0 max-w-xl">
              I am interested in roles and collaborations where AI has to operate inside real processes, with useful interfaces, better structure, and measurable operational value.
            </p>
          </div>

          <div className="grid gap-3">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-[1.5rem] border border-foreground/10 bg-background/72 p-4 transition-transform duration-300 hover:-translate-y-[1px] dark:border-white/10 dark:bg-black/10"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">{channel.label}</p>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                  <span>{channel.value}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" weight="bold" />
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="secondary-cta">
                <Icon className="h-4 w-4" weight="bold" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="editorial-card p-6 sm:p-7 lg:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="section-kicker">Start a conversation</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">Share the problem, the workflow, and what the interface needs to do.</h3>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-background/70 dark:border-white/10 dark:bg-white/5">
              <MapPin className="h-5 w-5 text-foreground dark:text-zinc-100" weight="duotone" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
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

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Your name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm font-normal outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/10"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Your email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm font-normal outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/10"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Subject
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm font-normal outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/10"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
              What are you trying to build?
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm font-normal outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/10"
              />
            </label>

            <button type="submit" disabled={isSubmitting} className="primary-cta w-full sm:w-auto">
              {isSubmitting ? 'Sending message' : 'Send message'}
              <PaperPlaneTilt className="h-4 w-4" weight="bold" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
