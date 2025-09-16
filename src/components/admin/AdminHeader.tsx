import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  onLogout?: () => void;
  actions?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, backHref = '/', onLogout, actions }) => {
  return (
    <div className="mb-8">
      <Link 
        to={backHref}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Portfolio
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex space-x-2 items-center">
          <ThemeToggle />
          {onLogout && (
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;