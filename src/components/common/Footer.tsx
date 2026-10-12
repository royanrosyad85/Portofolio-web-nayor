import { Copyright } from '@phosphor-icons/react';
import { siteConfig, socialLinks } from '@/config/site';

const Footer = () => {
  return (
    // Bottom padding keeps the last line clear of the floating dock on every viewport.
    <footer className="pb-32 pt-4 sm:pb-36">
      <div className="container-page">
        <div className="flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.015em] text-foreground">{siteConfig.name}</p>
            <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Copyright size={15} weight="regular" />
              <span className="tabular-nums">{new Date().getFullYear()}</span> {siteConfig.name}
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap text-sm font-medium text-muted-foreground">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex min-h-10 items-center rounded-full px-3 transition-colors duration-200 hover:text-foreground"
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
