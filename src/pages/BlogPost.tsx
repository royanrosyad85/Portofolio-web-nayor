
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Footer from '../components/Footer';
import IconNavigation from '../components/IconNavigation';
import { blogData, BlogPost as BlogPostType } from '../lib/blogData';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundPost = blogData.getPostById(id);
      if (foundPost && foundPost.isPublished) {
        setPost(foundPost);
        // Increment view count
        blogData.incrementViews(id);
        
        // Get related posts (same category, excluding current post)
        const related = blogData.getPostsByCategory(foundPost.category)
          .filter(p => p.id !== id)
          .slice(0, 3);
        setRelatedPosts(related);
        
        // Set document title
        document.title = `${foundPost.title} | Royanrosyad Blog`;
      }
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
          
          <article className="animate-fade-in">
            {/* Featured Image as Cover - Notion Style */}
            {post.image && (
              <div className="blog-cover-image mb-12">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
            
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-8">
                <Badge variant="secondary" className="text-sm">
                  {getCategoryName(post.category)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  <span>{calculateReadTime(post.content)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye size={14} className="mr-1" />
                  <span>{post.views} views</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight font-serif">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent mr-3 flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">R</span>
                  </div>
                  <div>
                    <div className="font-medium">Royanrosyad</div>
                    <div className="text-xs text-muted-foreground">AI/ML Engineer</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-secondary/50 transition-colors" 
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors" aria-label="Bookmark">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center">
                <span className="flex items-center mr-3 mb-2">
                  <Tag size={16} className="mr-2" />
                  <span className="text-sm text-muted-foreground">Tags:</span>
                </span>
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="mr-2 mb-2"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group glass-effect rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {relatedPost.image && (
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>{formatDate(relatedPost.createdAt)}</span>
                        <div className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {relatedPost.views}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-16 glass-effect rounded-xl p-8 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Join the Conversation</h3>
            <form>
              <textarea
                placeholder="Share your thoughts on this article..."
                rows={4}
                className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none mb-4"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
      <IconNavigation />
    </div>
  );
};

export default BlogPost;
