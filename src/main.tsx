import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import App from './app/App';
import './styles/globals.css';

// Arm scroll reveals before first paint so revealed content never flashes. Skipped
// for reduced motion (and old browsers), in which case everything renders static.
if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  document.documentElement.classList.add('reveal-ready');
}

createRoot(document.getElementById('root')!).render(<App />);
