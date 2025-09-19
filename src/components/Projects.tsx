
import { useState } from 'react';
import { ArrowRight, Github, ExternalLink, X } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'dl', name: 'Deep Learning' },
    { id: 'cv', name: 'Computer Vision' },
    { id: 'llms', name: 'LLM' },
    { id: 'ds', name: 'Data Science' },
    { id: 'automation', name: 'Automation' },
  ];
  
  const projects = [
    {
      id: 1,
      title: "Automation Habit Tracker Chatbot (Integrated with Notion Dashboard)",
      description: "Developed habit classification system for different activity types (Gym/Running, Language Learning, etc.) with automated progress tracking and Notion database integration.",
      fullDescription: "A comprehensive habit tracking automation system that seamlessly integrates with Notion database to provide intelligent habit classification and progress monitoring. The system features automated habit detection for various activity types including Gym/Running and Language Learning, with intelligent response filtering and mode switching capabilities. Successfully deployed a fully functional habit tracking chatbot equipped with voice recognition, automatic habit logging, personalized AI responses powered by Azure OpenAI, and real-time progress updates stored directly in Notion database. The automation pipeline built with n8n enables seamless data flow between Telegram Bot API, ElevenLabs for voice synthesis, and Notion API for persistent storage.",
      image: "/img/Habit Tracker Notion.png",
      tags: ["llms", "automation"],
      technologies: ["Azure OpenAI", "n8n", "Notion API", "ElevenLabs", "Telegram Bot API"],
      features: ["Habit Classification", "Automated Progress Tracking", "Voice Recognition", "Notion Integration", "Personalized AI Responses", "Real-time Updates"]
    },
    {
      id: 2,
      title: "Chickbot - Poultry Health AI Chatbot",
      description: "An intelligent AI system for chicken disease classification using computer vision and agentic RAG pipeline. Combines CNN-based image analysis with LLM-powered conversational assistance.",
      fullDescription: "Chickbot is a sophisticated poultry health management system that combines computer vision and natural language processing to assist farmers in identifying chicken diseases. The system features a Convolutional Neural Network (CNN) for disease classification from chicken images, integrated with an agentic Retrieval-Augmented Generation (RAG) pipeline that provides contextual information and treatment recommendations. The RAG system retrieves relevant veterinary knowledge from a curated database and uses large language models to generate personalized advice. Key features include real-time disease detection, confidence scoring, historical tracking, and an intelligent chat interface that can answer questions about poultry health, treatment protocols, and prevention strategies. The system is designed to bridge the gap between advanced AI technology and practical farming applications.",
      image: "/img/Chickbot.png",
      tags: ["dl", "llms"],
      github: "https://github.com/Capstone-LaskarAi/chicken-diseases-classification-model/tree/dev-1",
      demo: "https://chickbot-project-d2m6d.ondigitalocean.app/",
      technologies: ["Python", "TensorFlow", "CNN", "RAG", "LLM", "Streamlit", "Computer Vision"],
      features: ["Disease Classification", "Agentic RAG Pipeline", "Computer Vision", "LLM Integration", "Real-time Analysis", "Treatment Recommendations"]
    },
    {
      id: 3,
      title: "Automation Reply Comment & Sentiment Analysis",
      description: "Architected end-to-end automation pipeline using n8n connecting social media APIs, sentiment analysis models, and response generation systems for government communication.",
      fullDescription: "A comprehensive automation solution designed for government agencies to handle citizen interactions across social media platforms. The system features an end-to-end automation pipeline built with n8n that seamlessly connects social media APIs, advanced sentiment analysis models, and intelligent response generation systems. Key capabilities include real-time comment monitoring across multiple platforms, automated reply posting with context-aware responses, and integrated Google Sheets logging for comprehensive data tracking and response analytics. The solution successfully reduced manual review time by 75%, ensured consistent response quality across all government communication channels, and delivered a scalable automation system capable of handling thousands of daily citizen interactions while maintaining high-quality, contextually appropriate responses.",
      image: "/img/Automation Reply Comment.png",
      tags: ["llms", "automation"],
      technologies: ["Azure OpenAI", "n8n", "Google Sheets API", "Facebook Graph API"],
      features: ["Real-time Monitoring", "Sentiment Analysis", "Automated Replies", "Multi-platform Support", "Data Logging", "Scalable Processing"]
    },
    {
      id: 4,
      title: "GoPay Sentiment Analysis - NLP for User Reviews",
      description: "Comprehensive sentiment analysis of 40,000 GoPay app reviews using Natural Language Processing and lexicon-based approach. Analyzes user sentiment patterns and provides actionable insights.",
      fullDescription: "A comprehensive Natural Language Processing project that analyzes sentiment from 40,000 GoPay application reviews scraped from Google Play Store. The project implements a lexicon-based sentiment analysis approach using Indonesian language processing, featuring advanced text preprocessing pipeline including cleaning, normalization, tokenization, stopword removal, and stemming using Sastrawi. The system successfully classified reviews into positive (42.5%), negative (41.6%), and neutral (15.9%) sentiments, providing valuable insights into user satisfaction patterns. Key findings revealed balanced sentiment distribution with technical issues being the main complaint area, while ease of use was highly appreciated. The project includes comprehensive visualizations through word clouds, sentiment distribution plots, and statistical analysis to understand user perception patterns.",
      image: "/img/NLP.png",
      tags: ["ml", "ds"],
      github: "https://github.com/royanrosyad85/Sentiment-Analysis---Gopay",
      technologies: ["Python", "NLTK", "Sastrawi", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "WordCloud"],
      features: ["Text Preprocessing", "Lexicon-based Analysis", "Natural Language Processing", "Word Cloud Visualization", "Sentiment Classification", "Data Scraping"]
    },
    {
      id: 5,
      title: "Fitness Vision: V-Squat Machine Analysis Detection",
      description: "Real-time AI-powered squat form analysis using MediaPipe pose estimation. Provides instant feedback on squat technique with MPJPE accuracy evaluation for pose detection quality.",
      fullDescription: "Fitness Vision is an advanced computer vision application that analyzes squat form in real-time using MediaPipe pose estimation technology. The system provides immediate feedback on posture correctness, tracks squat repetitions, and evaluates common form errors like knee alignment, body positioning, and depth. It includes Mean Per Joint Position Error (MPJPE) evaluation for assessing pose estimation accuracy, supporting both live webcam analysis and video upload functionality. The application features beginner and pro modes with customizable thresholds, making it suitable for fitness enthusiasts and trainers seeking data-driven workout analysis.",
      image: "/img/V-Squat.png",
      tags: ["cv"],
      github: "https://github.com/royanrosyad85/Squat-Vision-Mediapipe",
      demo: "https://squat-vision-demo.streamlit.app/",
      technologies: ["Python", "MediaPipe", "OpenCV", "Streamlit", "NumPy", "Computer Vision"],
      features: ["Real-time Pose Estimation", "Form Analysis", "MPJPE Evaluation", "Live Feedback", "Video Processing", "Performance Metrics"]
    },
    {
      id: 6,
      title: "E-Commerce RFM and Geospatial Analysis",
      description: "Comprehensive data analytics solution combining RFM (Recency, Frequency, Monetary) customer segmentation with geospatial analysis and interactive Streamlit dashboard.",
      fullDescription: "A comprehensive e-commerce analytics platform that combines advanced RFM (Recency, Frequency, Monetary) customer segmentation with detailed geospatial analysis to provide actionable business insights. The solution features an interactive Streamlit dashboard that displays key e-commerce metrics including 54,011 total orders, 52,601 total customers, and $141.83 average order value. The system includes comprehensive order trends analysis with sophisticated time-series visualization, enabling businesses to understand customer behavior patterns, identify high-value customer segments, and optimize marketing strategies based on geographic and temporal data. The platform provides powerful tools for customer lifecycle analysis, sales forecasting, and regional performance assessment.",
      image: "/img/E-Commerce Dashboard.png",
      tags: ["ds"],
      github: "https://github.com/royanrosyad85/E-commerce-Data-Geospatial_Analysis.git",
      demo: "https://e-commerce-data-geospatialanalysis-royanrosyad.streamlit.app/",
      technologies: ["Python", "NumPy", "Plotly", "Streamlit", "Pandas", "Matplotlib"],
      features: ["RFM Analysis", "Customer Segmentation", "Geospatial Analysis", "Interactive Dashboard", "Time-series Visualization", "Performance Metrics"]
    },
    {
      id: 7,
      title: "Predictive Analytics",
      description: "A machine learning project that classifies water potability using multiple algorithms including Random Forest, KNN, and XGBoost, combined with deep learning approaches using neural networks.",
      fullDescription: "This comprehensive water quality analysis project addresses the critical public health challenge of determining water potability. Using a dataset of 3,276 water samples with 9 chemical parameters (pH, hardness, solids, chloramines, sulfate, conductivity, organic carbon, trihalomethanes, and turbidity), the project implements both traditional machine learning algorithms (Random Forest, KNN, XGBoost) and deep learning neural networks. The solution includes extensive data preprocessing, handling missing values through oversampling, feature scaling, and hyperparameter optimization using Grid Search. The final model achieves high accuracy in binary classification, helping ensure safe drinking water distribution.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tags: ["ml", "dl"],
      github: "https://github.com/royanrosyad85/Machine-Learning-Terapan/tree/main/Submission%20Predictive%20Analytics",
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      features: ["Binary Classification", "Data Preprocessing", "Feature Engineering", "Model Comparison", "Hyperparameter Tuning"]
    },
    {
      id: 8,
      title: "Movie Recommendation System",
      description: "An intelligent movie recommendation system built using MovieLens dataset with over 9,000 films and 100k+ ratings. Implements both content-based filtering and collaborative filtering.",
      fullDescription: "This advanced recommendation system combines two powerful approaches to deliver personalized movie suggestions. The content-based filtering analyzes movie metadata including genres, cast, directors, and plot descriptions using TF-IDF vectorization and cosine similarity. The collaborative filtering component leverages user rating patterns and implements matrix factorization techniques to identify users with similar preferences. The hybrid approach addresses the cold start problem and provides more accurate recommendations by considering both item features and user behavior patterns.",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?q=80&w=2071&auto=format&fit=crop",
      tags: ["ml"],
      github: "https://github.com/royanrosyad85/Machine-Learning-Terapan/tree/main/Submission%20System%20Recommendation",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "TF-IDF", "Cosine Similarity"],
      features: ["Content-Based Filtering", "Collaborative Filtering", "Hybrid Approach", "Data Visualization", "Performance Evaluation"]
    },
    {
      id: 9,
      title: "HR Analytics Metabase Dashboard",
      description: "Comprehensive business intelligence dashboard for analyzing employee attrition patterns and HR metrics. Built with Metabase to provide actionable insights for workforce management.",
      fullDescription: "This comprehensive HR Analytics dashboard addresses the critical challenge of employee attrition at PT Jaya Jaya Maju, a multinational company with over 1,000 employees. The dashboard analyzes various factors affecting employee turnover including demographics, job roles, departments, work-life balance, salary levels, and commute distance. Built using Metabase with Supabase as the database backend, it provides interactive visualizations showing attrition rates by gender, department, age groups, and job satisfaction levels. The system helps HR teams identify high-risk employee segments and develop targeted retention strategies based on data-driven insights.",
      image: "/img/HR Dashboard.png",
      tags: ["ml", "ds"],
      github: "https://github.com/royanrosyad85/Business-Metabase-Dashboard-HR",
      demo: "/img/HR Analytics Dashboard_ Employee Retention & Workforce Insights (1).pdf",
      technologies: ["Metabase", "Supabase", "Python", "SQLAlchemy", "Pandas", "Machine Learning"],
      features: ["Interactive Dashboards", "Attrition Analysis", "Demographic Insights", "Predictive Modeling", "Business Intelligence", "Data Visualization"]
    },
    {
      id: 10,
      title: "Student Analytics Dashboard",
      description: "Machine learning-powered dashboard for predicting student dropout risk at Jaya Jaya Institut. Features interactive Streamlit interface and comprehensive analytics using Metabase.",
      fullDescription: "This advanced student analytics system tackles the dropout challenge at Jaya Jaya Institut by combining predictive machine learning with comprehensive dashboard analytics. The solution uses Gradient Boosting Classifier to predict student status (Graduate/Dropout) with ~90% accuracy, analyzing factors like academic performance, age, financial status, scholarship holdings, and attendance patterns. The system includes both a Streamlit prediction interface for real-time student assessment and a Metabase dashboard showing institutional KPIs, enrollment trends, and demographic analysis across 17 courses and 4,424 students. This enables early intervention strategies to improve student retention and graduation rates.",
      image: "/img/Student.png",
      tags: ["ml", "ds"],
      github: "https://github.com/royanrosyad85/Student-Performance-Prediction-Dashboard-Metabase",
      demo: "https://student-prediction-royanrosyad.streamlit.app/",
      technologies: ["Python", "Scikit-learn", "Streamlit", "Metabase", "Pandas", "Gradient Boosting"],
      features: ["Dropout Prediction", "Interactive Dashboard", "Academic Analytics", "Risk Assessment", "Early Warning System", "Performance Tracking"]
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMoreProjects = filteredProjects.length > 6;

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const openImagePreview = (imageSrc, imageTitle) => {
    setImagePreview({ src: imageSrc, title: imageTitle });
    document.body.style.overflow = 'hidden';
  };

  const closeImagePreview = () => {
    setImagePreview(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="projects" className="py-10 bg-secondary/5">
        <div className="section-container">
          <span className="text-sm font-medium text-primary">My Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Explore my recent AI and machine learning projects</p>
          
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-none gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  filter === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-card-foreground border border-border hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-card text-card-foreground border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openModal(project)}
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
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
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
                        className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors z-10"
                        aria-label="GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href={project.demo} 
                        className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors z-10"
                        aria-label="Live Demo"
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-8">
                <button
                  aria-label="Load more projects"
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 rounded-2xl glass-effect backdrop-blur-xl bg-background/90 border border-border/50 shadow-xl text-foreground font-medium flex items-center mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {showAll ? 'Show Less Projects' : `Load More Projects (${filteredProjects.length - 6} remaining)`}
                  <ArrowRight size={16} className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
                </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-background/95 border border-border hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
              <div className="h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    openImagePreview(selectedProject.image, selectedProject.title);
                  }}
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-foreground">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full bg-primary text-primary-foreground"
                    >
                      {categories.find(c => c.id === tag)?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6 sm:mb-8">
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Key Features</h3>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base text-muted-foreground">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 flex-shrink-0 mt-1.5 sm:mt-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm text-sm sm:text-base"
                >
                  <Github size={16} className="sm:w-5 sm:h-5 mr-2" />
                  View on GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium shadow-sm text-sm sm:text-base"
                >
                  <ExternalLink size={16} className="sm:w-5 sm:h-5 mr-2" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {imagePreview && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={closeImagePreview}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 border border-white/20 hover:bg-black/70 transition-colors shadow-lg text-white"
              aria-label="Close image preview"
            >
              <X size={24} />
            </button>
            <div className="bg-black/20 rounded-lg overflow-hidden">
              <img 
                src={imagePreview.src} 
                alt={imagePreview.title}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">{imagePreview.title}</p>
              <p className="text-white/70 text-sm mt-1">Click anywhere to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
