
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, Eye } from 'lucide-react';
import Footer from '../../../components/common/Footer';
import IconNavigation from '../../../components/common/IconNavigation';
import { revealDelay } from '@/hooks/use-scroll-reveal';
import { blogData, BlogPost as BlogPostType } from '../lib/blog-data';

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
      <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5">
        <div className="text-center">
          <h1 className="blog-post-title mb-4 text-[2rem] sm:text-[2.5rem]">Post Not Found</h1>
          <p className="body-copy mx-auto mb-8 max-w-sm text-base">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="btn btn-secondary">
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
    <div className="min-h-[100dvh] bg-background">
      <main className="pb-16 pt-6 sm:pt-8">
        <div className="container-page">
          <Link to="/blog" className="back-link group">
            <ArrowLeft size={16} className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
          
          <article className="mt-8 sm:mt-10">
            {/* Featured Image as Cover - Notion Style */}
            {post.image && (
              <div className="blog-cover media-outline mb-10 sm:mb-14" data-reveal>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute inset-0 h-full w-full object-cover"
                  decoding="async"
                />
              </div>
            )}
            
            <header className="reading-column mb-10 sm:mb-12" data-reveal>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="tag">
                  {getCategoryName(post.category)}
                </span>
                <div className="meta inline-flex items-center gap-1.5 text-sm">
                  <Calendar size={14} aria-hidden="true" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="meta inline-flex items-center gap-1.5 text-sm">
                  <Clock size={14} aria-hidden="true" />
                  <span>{calculateReadTime(post.content)}</span>
                </div>
                <div className="meta inline-flex items-center gap-1.5 text-sm">
                  <Eye size={14} aria-hidden="true" />
                  <span>{post.views} views</span>
                </div>
              </div>
              
              <h1 className="blog-post-title">
                {post.title}
              </h1>
              
              <div className="mt-8 flex items-center justify-between gap-4 border-y py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground">
                    <span className="font-display font-semibold text-background">R</span>
                  </div>
                  <div>
                    <div className="text-[0.9375rem] font-medium text-foreground">Royanrosyad</div>
                    <div className="text-[0.8125rem] text-muted-foreground">AI/ML Engineer</div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button 
                    onClick={handleShare}
                    className="icon-button" 
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </button>
                  <button className="icon-button" aria-label="Bookmark">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </header>
            
            <div className="blog-content reading-column">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="reading-column mt-12 border-t pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag size={15} aria-hidden="true" />
                  <span>Tags:</span>
                </span>
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 sm:mt-24" aria-labelledby="related-title">
              <div className="section-head" data-reveal>
                <h2 id="related-title" className="section-label">Related Articles</h2>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <li key={relatedPost.id} data-reveal style={revealDelay(index * 70)}>
                    <Link
                      to={`/blog/${relatedPost.id}`}
                      className="project-card group flex flex-col"
                    >
                      {relatedPost.image && (
                        <div className="project-media media-outline aspect-[16/10]">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                        <h3 className="card-title line-clamp-2 text-[1.125rem]">
                          {relatedPost.title}
                        </h3>
                        <p className="body-copy mt-2 line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </p>
                        <div className="meta mt-auto flex items-center justify-between pt-4">
                          <span>{formatDate(relatedPost.createdAt)}</span>
                          <div className="inline-flex items-center gap-1.5">
                            <Eye size={13} aria-hidden="true" />
                            {relatedPost.views}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          <div className="surface reading-column mt-16 p-6 sm:mt-20 sm:p-8" data-reveal>
            <h3 className="card-title mb-5">Join the Conversation</h3>
            <form className="flex flex-col gap-4">
              <textarea
                placeholder="Share your thoughts on this article..."
                rows={4}
                aria-label="Share your thoughts on this article"
                className="field min-h-[7.5rem] resize-none py-3 leading-relaxed"
              ></textarea>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Post Comment
                </button>
              </div>
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
