import React, { useState, useEffect } from 'react';
import BlogAuth from './BlogAuth';

interface ProtectedBlogRouteProps {
  children: React.ReactNode;
}

const ProtectedBlogRoute: React.FC<ProtectedBlogRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const authStatus = localStorage.getItem('blog_auth');
    const authTime = localStorage.getItem('blog_auth_time');
    
    if (authStatus === 'true' && authTime) {
      const timeElapsed = Date.now() - parseInt(authTime);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timeElapsed < twentyFourHours) {
        setIsAuthenticated(true);
        return;
      } else {
        // Auth expired, clear it
        localStorage.removeItem('blog_auth');
        localStorage.removeItem('blog_auth_time');
      }
    }
    
    setIsAuthenticated(false);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('blog_auth');
    localStorage.removeItem('blog_auth_time');
    setIsAuthenticated(false);
  };

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return <BlogAuth onAuthenticated={handleAuthenticated} />;
  }

  // Show protected content if authenticated
  return (
    <div>
      {/* Add logout functionality to children if needed */}
      {React.cloneElement(children as React.ReactElement, { onLogout: handleLogout })}
    </div>
  );
};

export default ProtectedBlogRoute;
