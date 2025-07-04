
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IconNavigation from '../components/IconNavigation';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would normally come from an API call
  const blogPost = {
    id: Number(id),
    title: "Demystifying Transformer Architecture for NLP Applications",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop",
    content: `
      <p>Transformer models have revolutionized natural language processing tasks by introducing a novel architecture that relies on self-attention mechanisms instead of recurrence or convolution. This approach has proven remarkably effective, enabling models to better capture long-range dependencies in sequences.</p>
      
      <h2>The Architecture</h2>
      <p>At its core, the Transformer architecture consists of an encoder and a decoder, each composed of multiple identical layers. Each layer has two sub-layers: a multi-head self-attention mechanism and a position-wise fully connected feed-forward network.</p>
      
      <p>The self-attention mechanism allows the model to weight the importance of different words in the input when making predictions, enabling it to focus on relevant context regardless of distance in the sequence.</p>
      
      <h2>Key Components</h2>
      <ul>
        <li><strong>Self-Attention:</strong> Allows the model to attend to different positions of the input sequence to compute a representation.</li>
        <li><strong>Multi-Head Attention:</strong> Extends self-attention by running multiple attention operations in parallel, allowing the model to focus on different aspects of the input.</li>
        <li><strong>Positional Encoding:</strong> Since Transformers don't use sequence order by default, positional encoding is added to give the model information about the position of tokens.</li>
        <li><strong>Feed-Forward Networks:</strong> Apply the same transformation to each position separately and identically.</li>
        <li><strong>Layer Normalization:</strong> Helps stabilize the learning process and reduces training time.</li>
      </ul>
      
      <h2>Practical Applications</h2>
      <p>Since the introduction of the original Transformer in the "Attention is All You Need" paper, numerous variants have emerged, powering state-of-the-art models like BERT, GPT, T5, and others.</p>
      
      <p>These models have excelled in various NLP tasks including:</p>
      <ul>
        <li>Machine Translation</li>
        <li>Text Classification</li>
        <li>Named Entity Recognition</li>
        <li>Question Answering</li>
        <li>Text Generation</li>
        <li>Summarization</li>
      </ul>
      
      <h2>Implementation Considerations</h2>
      <p>When working with Transformer models, it's important to consider:</p>
      <ul>
        <li><strong>Computational Requirements:</strong> Transformers can be resource-intensive, especially for long sequences.</li>
        <li><strong>Fine-tuning Strategies:</strong> Often pre-trained models can be fine-tuned for specific tasks with less data and compute.</li>
        <li><strong>Context Window Limitations:</strong> The self-attention mechanism scales quadratically with sequence length, imposing practical limits.</li>
        <li><strong>Tokenization:</strong> The choice of tokenization strategy can significantly impact model performance.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Transformer architectures have fundamentally changed the NLP landscape, enabling more powerful language understanding and generation capabilities. By understanding their core mechanisms, practitioners can better leverage these models and adapt them to specific use cases.</p>
      
      <p>As research continues to evolve, we're seeing innovations that address limitations and extend capabilities, making Transformers even more versatile for a wider range of applications.</p>
    `,
    tags: ["NLP", "Transformers", "Deep Learning", "Neural Networks", "BERT", "GPT"]
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set document title
    document.title = `${blogPost.title} | Royanrosyad Blog`;
  }, [blogPost.title]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/#blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
          
          <article className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {blogPost.category}
                </span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                  <div>
                    <div className="font-medium">Royanrosyad</div>
                    <div className="text-xs text-muted-foreground">AI/ML Engineer</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors" aria-label="Share">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors" aria-label="Bookmark">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={blogPost.image} 
                alt={blogPost.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
            
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center">
                <span className="flex items-center mr-3 mb-2">
                  <Tag size={16} className="mr-2" />
                  <span className="text-sm text-muted-foreground">Tags:</span>
                </span>
                {blogPost.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-foreground mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
          
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
