import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Default categories for personal journaling
const defaultCategories: BlogCategory[] = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Technical insights and tutorials',
    color: '#3B82F6'
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Personal thoughts and experiences',
    color: '#10B981'
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Project showcases and development stories',
    color: '#8B5CF6'
  },
  {
    id: 'learning',
    name: 'Learning',
    description: 'Learning journey and insights',
    color: '#F59E0B'
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Career development and professional growth',
    color: '#EF4444'
  }
];

// Sample blog posts
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Demystifying Transformer Architecture for NLP Applications',
    content: `<p>Transformer models have revolutionized natural language processing tasks by introducing a novel architecture that relies on self-attention mechanisms instead of recurrence or convolution. This approach has proven remarkably effective, enabling models to better capture long-range dependencies in sequences.</p>
      
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
      </ul>`,
    excerpt: 'A deep dive into the mechanics of transformer models and how they\'ve revolutionized natural language processing tasks.',
    category: 'tech',
    tags: ['NLP', 'Transformers', 'Deep Learning', 'Neural Networks'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop',
    isPublished: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 245
  },
  {
    id: '2',
    title: 'My Journey into AI/ML Engineering',
    content: `<p>Starting my career in AI/ML has been an incredible journey filled with challenges, discoveries, and continuous learning. In this post, I want to share some insights from my personal experience transitioning into this exciting field.</p>
      
      <h2>The Beginning</h2>
      <p>Like many others, I was drawn to AI/ML by the promise of creating intelligent systems that could solve real-world problems. However, the reality of working in this field is both more complex and more rewarding than I initially anticipated.</p>
      
      <h2>Key Learnings</h2>
      <p>Through various projects and experiences, I've learned that successful AI/ML engineering requires not just technical skills, but also strong problem-solving abilities, domain expertise, and the ability to communicate complex concepts to non-technical stakeholders.</p>`,
    excerpt: 'Reflections on my journey transitioning into AI/ML engineering and the lessons learned along the way.',
    category: 'personal',
    tags: ['Career', 'AI/ML', 'Personal Growth', 'Journey'],
    isPublished: true,
    createdAt: '2024-02-01T14:30:00Z',
    updatedAt: '2024-02-01T14:30:00Z',
    views: 156
  },
  {
    id: 'test-formatting',
    title: 'Testing Blog Formatting Features',
    content: `<h1>Testing All Basic Formatting</h1>
<p>This is a test post to ensure all formatting works correctly.</p>

<h2>Lists Testing</h2>
<p>Here are some bullet points:</p>
<ul>
<li>First bullet item</li>
<li>Second bullet item with <strong>bold text</strong></li>
<li>Third item with <em>italic text</em></li>
<li>Fourth item with <a href="#">a link</a></li>
</ul>

<p>And here's a numbered list:</p>
<ol>
<li>First numbered item</li>
<li>Second numbered item</li>
<li>Third numbered item</li>
</ol>

<h3>Other Formatting</h3>
<blockquote>This is a blockquote to test quote formatting.</blockquote>

<p>Some <code>inline code</code> and a code block:</p>
<pre>function test() {
  return "Hello World";
}</pre>

<p>That's all for the formatting test!</p>`,
    excerpt: 'A comprehensive test of all blog formatting features including lists, headers, quotes, and code blocks.',
    category: 'tech',
    tags: ['testing', 'formatting', 'blog'],
    image: '',
    isPublished: true,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
    views: 23
  }
];

class BlogDataManager {
  private static instance: BlogDataManager;
  private posts: BlogPost[] = [];
  private categories: BlogCategory[] = defaultCategories;

  private constructor() {
    this.loadData();
  }

  static getInstance(): BlogDataManager {
    if (!BlogDataManager.instance) {
      BlogDataManager.instance = new BlogDataManager();
    }
    return BlogDataManager.instance;
  }

  private loadData(): void {
    try {
      const storedPosts = localStorage.getItem('blog_posts');
      const storedCategories = localStorage.getItem('blog_categories');
      
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      } else {
        // Initialize with sample posts
        this.posts = samplePosts;
        this.saveData();
      }
      
      if (storedCategories) {
        this.categories = JSON.parse(storedCategories);
      } else {
        // Initialize with default categories
        this.categories = defaultCategories;
        this.saveCategories();
      }
    } catch (error) {
      console.error('Error loading blog data:', error);
      this.posts = samplePosts;
      this.categories = defaultCategories;
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    } catch (error) {
      console.error('Error saving blog posts:', error);
    }
  }

  private saveCategories(): void {
    try {
      localStorage.setItem('blog_categories', JSON.stringify(this.categories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  }

  // Blog Posts Methods
  getAllPosts(): BlogPost[] {
    return [...this.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getPublishedPosts(): BlogPost[] {
    return this.posts
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getPostById(id: string): BlogPost | undefined {
    return this.posts.find(post => post.id === id);
  }

  getPostsByCategory(categoryId: string): BlogPost[] {
    return this.posts
      .filter(post => post.category === categoryId && post.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  searchPosts(query: string): BlogPost[] {
    const lowerQuery = query.toLowerCase();
    return this.posts
      .filter(post => 
        post.isPublished && (
          post.title.toLowerCase().includes(lowerQuery) ||
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): BlogPost {
    const newPost: BlogPost = {
      ...postData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    };
    
    this.posts.unshift(newPost);
    this.saveData();
    return newPost;
  }

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    this.posts[index] = {
      ...this.posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveData();
    return this.posts[index];
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    this.posts.splice(index, 1);
    this.saveData();
    return true;
  }

  incrementViews(id: string): void {
    const post = this.posts.find(p => p.id === id);
    if (post) {
      post.views = (post.views || 0) + 1;
      this.saveData();
    }
  }

  // Categories Methods
  getCategories(): BlogCategory[] {
    return [...this.categories];
  }

  getCategoryById(id: string): BlogCategory | undefined {
    return this.categories.find(cat => cat.id === id);
  }

  createCategory(categoryData: Omit<BlogCategory, 'id'>): BlogCategory {
    const newCategory: BlogCategory = {
      ...categoryData,
      id: uuidv4()
    };
    
    this.categories.push(newCategory);
    this.saveCategories();
    return newCategory;
  }

  // Draft Management
  saveDraft(title: string, content: string): void {
    try {
      const draft = {
        title,
        content,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('blog_draft', JSON.stringify(draft));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }

  loadDraft(): { title: string; content: string; savedAt: string } | null {
    try {
      const draft = localStorage.getItem('blog_draft');
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }

  clearDraft(): void {
    try {
      localStorage.removeItem('blog_draft');
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  }
}

export const blogData = BlogDataManager.getInstance();
