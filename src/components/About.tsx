
import React from 'react';
import { Code, Cpu, Database, BrainCircuit } from 'lucide-react';

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
    <section id="about" className="py-20 bg-background">
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
              <h3 className="font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Computer Vision", 
                  "NLP", "Reinforcement Learning", "Data Analysis", "Pandas", "SQL", "NoSQL", 
                  "AWS", "GCP", "Docker", "Kubernetes"].map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
