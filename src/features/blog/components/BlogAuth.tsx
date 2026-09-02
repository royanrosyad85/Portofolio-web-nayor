import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface BlogAuthProps {
  onAuthenticated: () => void;
}

const BlogAuth: React.FC<BlogAuthProps> = ({ onAuthenticated }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Valid credentials from environment variables
  const VALID_EMAIL = import.meta.env.VITE_BLOG_ADMIN_EMAIL;
  const VALID_PASSWORD = import.meta.env.VITE_BLOG_ADMIN_PASSWORD;

  // Validate that environment variables are set
  if (!VALID_EMAIL || !VALID_PASSWORD) {
    console.error('Blog admin credentials not configured. Please check your .env file.');
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if environment variables are configured
    if (!VALID_EMAIL || !VALID_PASSWORD) {
      toast({
        title: "Configuration Error",
        description: "Blog admin credentials are not properly configured. Please contact the administrator.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.email === VALID_EMAIL && formData.password === VALID_PASSWORD) {
      // Store authentication in localStorage
      localStorage.setItem('blog_auth', 'true');
      localStorage.setItem('blog_auth_time', Date.now().toString());
      
      toast({
        title: "Authentication Successful",
        description: "Welcome to Blog Administration!",
      });
      
      onAuthenticated();
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 opacity-90"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full mx-4">
        <div className="glass-effect rounded-xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Blog Administration</h1>
            <p className="text-muted-foreground">
              Please sign in to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Secured access for blog content management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAuth;
