import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Footer from '../components/Footer';
import IconNavigation from '../components/IconNavigation';
import { blogData, BlogPost } from '../lib/blogData';

const BlogListing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const categories = blogData.getCategories();

  useEffect(() => {
    const publishedPosts = blogData.getPublishedPosts();
    setPosts(publishedPosts);
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
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Portfolio
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, insights, and experiences from my journey in AI/ML and software development
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-4">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                No blog posts have been published yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <Badge variant="secondary" className="text-xs">
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
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mr-3">
                          {calculateReadTime(post.content)}
                        </span>
                        <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                          Read
                          <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <IconNavigation />
    </div>
  );
};

export default BlogListing;
