import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GithubLogo, LinkedinLogo, PaperPlaneTilt } from '@phosphor-icons/react';
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
    <section id="contact" className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="page-shell page-narrow space-y-8">
        <div className="space-y-3">
          <div className="section-kicker">Contact</div>
          <h2 className="section-title max-w-2xl">Get in touch.</h2>
          <p className="section-subtitle mb-0 max-w-2xl">
            If you are building an AI product, automation workflow, or machine learning system, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3">
            {contactChannels.map((channel) => (
              <div key={channel.label} className="minimal-card p-5">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">{channel.label}</p>
                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-2 block text-sm text-foreground/78 transition-colors hover:text-foreground dark:text-zinc-200"
                >
                  {channel.value}
                </a>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-1">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="secondary-cta px-4 py-2 text-sm">
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="minimal-card p-6"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
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
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className="minimal-input"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    spellCheck={false}
                    required
                    className="minimal-input"
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
                    autoComplete="off"
                    required
                    className="minimal-input"
                  />
              </label>

              <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  rows={6}
                  className="minimal-input min-h-[10rem] resize-y"
                />
              </label>

              <button type="submit" disabled={isSubmitting} className="primary-cta w-full sm:w-auto">
                {isSubmitting ? 'Sending message' : 'Send message'}
                <PaperPlaneTilt className="h-4 w-4" weight="bold" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
