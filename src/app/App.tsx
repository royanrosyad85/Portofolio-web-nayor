import { BrowserRouter } from 'react-router-dom';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { AppProviders } from './providers';
import { AppRoutes } from './AppRoutes';

/**
 * Composition root: providers wrap the router, and smooth scrolling wraps the
 * routed content so every page shares the same momentum-scroll behavior.
 */
const App = () => (
  <AppProviders>
    <BrowserRouter>
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
    </BrowserRouter>
  </AppProviders>
);

export default App;
