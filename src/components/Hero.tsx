import { ArrowDownRight, DownloadSimple } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  return (
    <section id="hero" className="relative px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50">
      {/* Background dot pattern */}
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />

      <div className="page-shell page-narrow relative z-10">
        <div className="flex flex-col-reverse md:grid items-center gap-12 md:gap-8 md:grid-cols-[1.3fr_0.7fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-6">
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-[4rem]">
                Hi, I'm Royan 👋
              </h1>
              <div className="space-y-4">
                <p className="mx-auto md:mx-0 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[1.1rem]">
                  AI Engineer and Data Scientist. I build practical AI solutions with agentic systems, large language models, and applied machine learning. I enjoy exploring new technology and turning complex problems into useful products.
                </p>
                <p className="mx-auto md:mx-0 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[1.1rem]">
                  Most recently, I built multi-agent and deep-agents solutions for company research and Excel claim processing, helping teams reduce manual workflows and improve operational efficiency.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a href="#projects" className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-zinc-950 px-6 font-medium text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                <span>View selected projects</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" weight="bold" />
              </a>
              <a
                href="/img/[Resume] ATS Royanrosyad Updated Apr 26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 font-medium text-zinc-950 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                <span>Download resume</span>
                <DownloadSimple className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" weight="bold" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[22rem] md:max-w-full"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2.5rem] z-10" />
              <OptimizedImage
                src="/img/Linkedin-profil-foto-royanrosyad.jpg"
                alt="Portrait of Royan Rosyad"
                className="h-full w-full object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                width={840}
                height={1050}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
