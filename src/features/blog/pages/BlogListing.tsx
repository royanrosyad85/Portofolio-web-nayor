import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import Footer from '../../../components/common/Footer';
import IconNavigation from '../../../components/common/IconNavigation';
import { revealDelay } from '@/hooks/use-scroll-reveal';
import { blogData, BlogPost } from '../lib/blog-data';

const BlogListing = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const categories = blogData.getCategories();

  useEffect(() => {
    const publishedPosts = blogData.getPublishedPosts();
    setPosts(publishedPosts);
    // Arriving from a post (or elsewhere) should always start at the top of the index.
    window.scrollTo(0, 0);
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
    <div className="min-h-[100dvh] bg-background">
      <main className="pb-16 pt-6 sm:pt-8">
        <div className="container-page">
          <Link to="/" className="back-link group">
            <ArrowLeft size={16} className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
            Back to Portfolio
          </Link>

          {/* Editorial masthead: same left-rail rhythm as the portfolio sections. */}
          <header className="blog-masthead" data-reveal>
            <h1 className="blog-title">Blog</h1>
            <p className="section-subtitle lg:col-span-7 lg:col-start-6 lg:self-end lg:pb-3">
              Thoughts, insights, and experiences from my journey in AI/ML and software development
            </p>
          </header>

          {/* Posts index */}
          {posts.length === 0 ? (
            <div className="surface mt-12 px-6 py-16 text-center sm:py-20" data-reveal>
              <h3 className="card-title mb-3">No articles found</h3>
              <p className="body-copy mx-auto max-w-sm">
                No blog posts have been published yet.
              </p>
            </div>
          ) : (
            <ul className="mt-4 sm:mt-6">
              {posts.map((post, index) => (
                <li key={post.id} className="blog-index-item" data-reveal style={revealDelay(Math.min(index, 4) * 60)}>
                  <Link to={`/blog/${post.id}`} className="blog-row group">
                    {/* Rail: when + what */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-muted-foreground lg:col-span-3 lg:flex-col lg:items-start lg:gap-2.5 lg:pt-1.5">
                      <span className="tag">
                        {getCategoryName(post.category)}
                      </span>
                      <span className="meta inline-flex items-center gap-1.5">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{formatDate(post.createdAt)}</span>
                      </span>
                      <span className="meta inline-flex items-center gap-1.5">
                        <Eye size={13} aria-hidden="true" />
                        <span>{post.views}</span>
                      </span>
                    </div>

                    <div className={`flex min-w-0 flex-col ${post.image ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
                      <h2 className="blog-row-title line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="body-copy mt-2.5 line-clamp-3 max-w-[40rem]">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag-outline">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="meta pl-1">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="meta inline-flex items-center gap-1.5">
                            <Clock size={13} aria-hidden="true" />
                            {calculateReadTime(post.content)}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/75 transition-colors duration-200 group-hover:text-primary">
                            Read
                            <ArrowRight size={15} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {post.image && (
                      <div className="project-media media-outline order-first aspect-[16/9] lg:order-none lg:col-span-3 lg:aspect-[4/3]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
      <IconNavigation />
    </div>
  );
};

export default BlogListing;
