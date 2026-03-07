import { ArrowUpRight, Copyright, Sparkle } from '@phosphor-icons/react';
import { socialLinks } from '@/data/portfolio';

const footerLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'Projects', href: '/#projects' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Education', href: '/#education' },
  { name: 'Contact', href: '/#contact' },
];

const Footer = () => {
  return (
    <footer className="px-4 pb-28 sm:px-6 lg:px-8 lg:pb-12">
      <div className="page-shell editorial-card grid gap-8 p-6 sm:p-7 lg:grid-cols-[0.88fr_1.12fr] lg:p-8">
        <div className="space-y-4">
          <div className="section-kicker">
            <Sparkle className="h-4 w-4" weight="duotone" />
            Portfolio redesign 2026
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50">Royan Rosyad</h2>
          <p className="max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            AI engineer focused on applied systems, operational automation, and interfaces that turn complex workflows into something teams can actually use.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Copyright className="h-4 w-4" weight="duotone" />
            {new Date().getFullYear()} Royan Rosyad
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
            <div className="mt-4 grid gap-3">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.href} className="group flex items-center justify-between rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm text-zinc-700 transition-transform duration-300 hover:-translate-y-[1px] dark:border-white/10 dark:bg-black/10 dark:text-zinc-200">
                  <span>{link.name}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" weight="bold" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">Elsewhere</p>
            <div className="mt-4 grid gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between rounded-[1.2rem] border border-foreground/10 bg-background/72 px-4 py-3 text-sm text-zinc-700 transition-transform duration-300 hover:-translate-y-[1px] dark:border-white/10 dark:bg-black/10 dark:text-zinc-200"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
