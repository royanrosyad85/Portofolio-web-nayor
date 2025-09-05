
// import React from 'react';
import { Code, Cpu, Database, BrainCircuit } from 'lucide-react';

// Bagian tersebut disebut sebagai "section" dalam HTML, dengan id="about".
// Ini adalah elemen <section> yang biasanya digunakan untuk membagi konten menjadi bagian-bagian tematik pada halaman web.
const About = () => {
  const skills = [
    { 
      name: 'Machine Learning', 
      icon: <BrainCircuit className="w-5 h-5 text-primary" />,
      description: 'Building and deploying ML models including supervised, unsupervised, and reinforcement learning.'
    },
    { 
      name: 'Deep Learning', 
      icon: <Cpu className="w-5 h-5 text-primary" />,
      description: 'Designing neural networks for computer vision, NLP, and generative AI applications.'
    },
    { 
      name: 'Data Engineering', 
      icon: <Database className="w-5 h-5 text-primary" />,
      description: 'Experience with data pipelines, ETL processes, and big data technologies.'
    },
    { 
      name: 'MLOps', 
      icon: <Code className="w-5 h-5 text-primary" />,
      description: 'Implementing ML workflows with CI/CD, monitoring, and production deployment.'
    }
  ];

  return (
    <section id="about" className="py-10 bg-background">
      <div className="section-container">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <span className="text-sm font-medium text-primary">About Me</span>
            <h2 className="section-title">Bringing Intelligence to Applications</h2>
            <p className="section-subtitle">My journey in AI and machine learning</p>
            
            <div className="space-y-6 text-muted-foreground animate-slide-up">
              <p>
                As an AI/ML Engineer, I combine technical expertise with a passion for solving complex problems. 
                I specialize in developing machine learning models and AI systems that drive innovation and deliver 
                meaningful results.
              </p>
              <p>
                My approach integrates cutting-edge ML techniques with robust software engineering practices to 
                build scalable, production-ready solutions. I'm passionate about staying at the forefront of AI 
                advancements and applying them to create impact.
              </p>
              <p>
                When I'm not coding or training models, I enjoy sharing my knowledge through writing technical blogs
                and contributing to open-source projects in the AI community.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="glass-effect p-6 rounded-xl hover:border-primary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-secondary/50">
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 glass-effect p-6 rounded-xl animate-fade-in">
              <h3 className="font-semibold mb-4">Languages & Tools</h3>
              <div className="space-y-4">
                {/* Programming Languages */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PHP", "SQL", "JavaScript", "R"].map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-xs rounded-full bg-black text-white dark:bg-white dark:text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* AI/ML Frameworks */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">AI/ML Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Keras", "NLTK", "spaCy", "Hugging Face", "OpenCV", "MediaPipe"].map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-xs rounded-full bg-black text-white dark:bg-white dark:text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Cloud & DevOps */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Cloud & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Google Cloud Platform", "Azure", "Oracle Cloud", "Docker", "Kubernetes", "Git", "MLflow", "Jupyter", "Streamlit", "FastAPI"].map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 text-xs rounded-full bg-black text-white dark:bg-white dark:text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
