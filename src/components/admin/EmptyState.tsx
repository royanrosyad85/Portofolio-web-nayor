import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  totalPosts: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({ totalPosts }) => {
  return (
    <div className="glass-effect rounded-lg p-12 text-center">
      <h3 className="text-lg font-semibold mb-2">No posts found</h3>
      <p className="text-muted-foreground mb-4">
        {totalPosts === 0 
          ? "You haven't created any blog posts yet." 
          : "No posts match your current filters."}
      </p>
      <Link to="/blog-admin/new">
        <Button>
          <Plus size={16} className="mr-2" />
          Create Your First Post
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
