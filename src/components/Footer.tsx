import { Copyright } from '@phosphor-icons/react';
import { socialLinks } from '@/data/portfolio';

const Footer = () => {
  return (
    <footer className="px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-10">
      <div className="page-shell page-narrow border-t border-border pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">Royan Rosyad</p>
            <div className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Copyright className="h-4 w-4" weight="duotone" />
              {new Date().getFullYear()} Royan Rosyad
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="transition-colors hover:text-foreground dark:hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
