/**
 * Site-wide configuration: author identity, contact channels, and social links.
 * Shared across features and common components (e.g. Footer, Contact) so none of
 * them need to reach into a specific feature's data module.
 */

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'Royan Rosyad',
  role: 'AI Engineer & Data Scientist',
  resumeUrl: '/img/Royanrosyad CV AI Engineering July 2026.pdf',
} as const;

export const contactChannels: ContactChannel[] = [
  {
    label: 'Email',
    value: 'royanrosyad313@gmail.com',
    href: 'mailto:royanrosyad313@gmail.com',
  },
  {
    label: 'Location',
    value: 'Depok, West Java, Indonesia',
    href: 'https://maps.app.goo.gl/UeqsgmLB5k8URqeL8',
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/royanrosyad/' },
  { label: 'GitHub', href: 'https://github.com/royanrosyad85' },
  { label: 'Blog', href: '/blog' },
];
