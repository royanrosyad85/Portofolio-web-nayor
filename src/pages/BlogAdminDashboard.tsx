import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, EyeOff, Trash2, Search, Filter, Calendar, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import BlogStats from '../components/BlogStats';
import { blogData, BlogPost } from '../lib/blogData';
import AdminHeader from '@/components/admin/AdminHeader';
import FilterBar from '@/components/admin/FilterBar';
import PostRow from '@/components/admin/PostRow';
import EmptyState from '@/components/admin/EmptyState';

interface BlogAdminDashboardProps {
  onLogout?: () => void;
}

const BlogAdminDashboard: React.FC<BlogAdminDashboardProps> = ({ onLogout }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const categories = blogData.getCategories();

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, categoryFilter, statusFilter]);

  const loadPosts = () => {
    const allPosts = blogData.getAllPosts();
    setPosts(allPosts);
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'published') {
        filtered = filtered.filter(post => post.isPublished);
      } else if (statusFilter === 'draft') {
        filtered = filtered.filter(post => !post.isPublished);
      }
    }

    setFilteredPosts(filtered);
  };

  const handleDeletePost = (id: string) => {
    blogData.deletePost(id);
    loadPosts();
    toast({
      title: "Success",
      description: "Post deleted successfully!"
    });
  };

  const togglePublishStatus = (id: string, currentStatus: boolean) => {
    blogData.updatePost(id, { isPublished: !currentStatus });
    loadPosts();
    toast({
      title: "Success",
      description: `Post ${!currentStatus ? 'published' : 'unpublished'} successfully!`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminHeader
          title="Blog Administration"
          subtitle="Manage your blog posts and content"
          backHref="/"
          onLogout={onLogout}
          actions={
            <div className="flex space-x-2">
              <Link to="/notion-demo">
                <Button variant="outline" className="flex items-center">
                  <span className="mr-2">✨</span>
                  Try Notion Editor
                </Button>
              </Link>
              <Link to="/blog-admin/new">
                <Button className="flex items-center">
                  <Plus size={16} className="mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          }
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categories={categories}
          resultCount={filteredPosts.length}
        />

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <EmptyState totalPosts={posts.length} />
          ) : (
            filteredPosts.map((post) => (
              <PostRow
                key={post.id}
                post={post}
                onTogglePublish={togglePublishStatus}
                onDelete={handleDeletePost}
                getCategoryName={getCategoryName}
              />
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mb-8">
          <BlogStats
            totalPosts={posts.length}
            publishedPosts={posts.filter(p => p.isPublished).length}
            draftPosts={posts.filter(p => !p.isPublished).length}
            totalViews={posts.reduce((total, post) => total + (post.views || 0), 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogAdminDashboard;
