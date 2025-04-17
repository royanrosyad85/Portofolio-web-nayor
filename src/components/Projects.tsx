
import { useState } from 'react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'cv', name: 'Computer Vision' },
    { id: 'nlp', name: 'NLP' },
    { id: 'data', name: 'Data Science' },
  ];
  
  const projects = [
    {
      id: 1,
      title: "Predictive Analytics Platform",
      description: "A machine learning platform for time-series forecasting with automated feature engineering and model selection.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tags: ["ml", "data"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Computer Vision Object Detection",
      description: "Real-time object detection system for manufacturing quality control using YOLOv5 and custom datasets.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1887&auto=format&fit=crop",
      tags: ["cv"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "NLP Sentiment Analyzer",
      description: "Text analysis tool that leverages transformer models to detect sentiment and emotional tone in customer feedback.",
      image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2070&auto=format&fit=crop",
      tags: ["nlp"],
      github: "#",
      demo: "#",
    },
    {
      id: 4,
      title: "Anomaly Detection System",
      description: "Implemented unsupervised learning algorithms to identify anomalies in network traffic for cybersecurity applications.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      tags: ["ml", "data"],
      github: "#",
      demo: "#",
    },
    {
      id: 5,
      title: "Recommendation Engine",
      description: "Built a collaborative filtering recommendation system for a content streaming platform using matrix factorization techniques.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      tags: ["ml"],
      github: "#",
      demo: "#",
    },
    {
      id: 6,
      title: "Image Generation with GANs",
      description: "Developed a generative adversarial network to create synthetic images for data augmentation in limited dataset scenarios.",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?q=80&w=2071&auto=format&fit=crop",
      tags: ["cv", "ml"],
      github: "#",
      demo: "#",
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="section-container">
        <span className="text-sm font-medium text-primary">My Work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Explore some of my recent AI and machine learning projects</p>
        
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-none gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === category.id 
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' 
                  : 'glass-effect hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group glass-effect rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-foreground"
                    >
                      {categories.find(c => c.id === tag)?.name}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <a 
                      href={project.github} 
                      className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={project.demo} 
                      className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <a 
                    href={project.demo} 
                    className="text-sm font-medium text-primary flex items-center group-hover:underline"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 font-medium rounded-lg glass-effect hover:bg-white/10 transition-colors"
          >
            View All Projects
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
