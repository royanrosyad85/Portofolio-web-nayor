
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { blogData, BlogPost } from '../lib/blogData';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Get the latest 3 published posts
    const latestPosts = blogData.getPublishedPosts().slice(0, 3);
    setPosts(latestPosts);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const getCategoryName = (categoryId: string) => {
    const categories = blogData.getCategories();
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (posts.length === 0) {
    return null; // Don't show blog section if no posts
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="section-container">
        <span className="text-sm font-medium text-primary">My Blog</span>
        <h2 className="section-title">Latest Articles</h2>
        <p className="section-subtitle">Sharing insights and knowledge on AI, ML, and personal experiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="group glass-effect rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-in flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                  <Badge variant="secondary">
                    {getCategoryName(post.category)}
                  </Badge>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{calculateReadTime(post.content)}</span>
                  <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                    Read Article
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 font-medium rounded-lg glass-effect hover:bg-white/10 transition-colors"
          >
            All Articles
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
