
import { useState } from 'react';
import { ArrowRight, Github, ExternalLink, X } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'dl', name: 'Deep Learning' },
    { id: 'cv', name: 'Computer Vision' },
    { id: 'llms', name: 'LLM' },
    { id: 'ds', name: 'Data Science' },
  ];
  
  const projects = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      title: "Fitness Vision: V-Squat Machine Analysis Detection",
      description: "Real-time AI-powered squat form analysis using MediaPipe pose estimation. Provides instant feedback on squat technique with MPJPE accuracy evaluation for pose detection quality.",
      fullDescription: "Fitness Vision is an advanced computer vision application that analyzes squat form in real-time using MediaPipe pose estimation technology. The system provides immediate feedback on posture correctness, tracks squat repetitions, and evaluates common form errors like knee alignment, body positioning, and depth. It includes Mean Per Joint Position Error (MPJPE) evaluation for assessing pose estimation accuracy, supporting both live webcam analysis and video upload functionality. The application features beginner and pro modes with customizable thresholds, making it suitable for fitness enthusiasts and trainers seeking data-driven workout analysis.",
      image: "/img/V-Squat.png",
      tags: ["cv"],
      demo: "https://squat-vision-demo.streamlit.app/",
      technologies: ["Python", "MediaPipe", "OpenCV", "Streamlit", "NumPy", "Computer Vision"],
      features: ["Real-time Pose Estimation", "Form Analysis", "MPJPE Evaluation", "Live Feedback", "Video Processing", "Performance Metrics"]
    },
    {
      id: 5,
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
      id: 6,
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

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
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
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' 
                    : 'bg-card text-card-foreground border border-border hover:bg-accent hover:text-accent-foreground'
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
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/95 border border-border hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4 text-foreground">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground"
                    >
                      {categories.find(c => c.id === tag)?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm"
                >
                  <Github size={20} className="mr-2" />
                  View on GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium shadow-sm"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
