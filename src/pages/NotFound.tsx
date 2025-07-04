import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import IconNavigation from '../components/IconNavigation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="glass-effect rounded-2xl p-8 border border-border/50">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-primary">404</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </a>
          </div>
        </div>
      </div>
      <IconNavigation />
    </div>
  );
};

export default NotFound;
