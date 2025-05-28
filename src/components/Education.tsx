
import * as React from 'react';
import { Calendar, BookOpen, Award } from 'lucide-react';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "UIN Syarif Hidayatullah Jakarta",
      location: "Jakarta, Indonesia",
      period: "2021 - 2025",
      description: "Focused on Artificial Intelligence and Data Science with minor in Mathematics. Thesis on 'Application of Mediapipe and OpenCV to Detect Movement Error in Gym Exercise Activities'.",
      achievements: [
        "GPA: 3.82/4.0",
        "Distinction Graduate Bangkit Academy 2024",
        "Relevant Coursework : Data Structures and Algorithms, Artificial Intelligence, Database Managements, Web Development and Design, Software Project Management"
      ]
    },
  ];
  
  const certifications = [
    {
      id: 1,
      name: "Tensorflow Developer Certificate (soon)",
      issuer: "Google",
      date: "2025"
    },
    {
      id: 2,
      name: "Oracle Cloud Certified Foundations Associate",
      issuer: "Oracle Cloud",
      date: "2024"
    },
    {
      id: 3,
      name: "Azure AI Engineer Associate (soon)",
      issuer: "Microsoft",
      date: "2025"
    },
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="section-container">
        <span className="text-sm font-medium text-primary">My Background</span>
        <h2 className="section-title">Education & Certifications</h2>
        <p className="section-subtitle">Academic qualifications and professional certifications</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-xl font-semibold inline-flex items-center">
              <BookOpen size={20} className="mr-2 text-primary" />
              Academic Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={edu.id}
                  className="glass-effect rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-primary">{edu.institution}</div>
                    <div className="text-xs text-muted-foreground">{edu.location}</div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{edu.description}</p>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Key Achievements:</h5>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-xl font-semibold inline-flex items-center">
              <Award size={20} className="mr-2 text-primary" />
              Professional Certifications
            </h3>
            
            <div className="glass-effect rounded-xl p-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={cert.id}
                    className="p-4 rounded-lg bg-secondary/30 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{cert.name}</h4>
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                    </div>
                    <div className="text-xs text-primary mt-1">{cert.issuer}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <h5 className="text-sm font-medium mb-3">Additional Training</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {[
                    "Reinforcement Learning Specialization",
                    "MLOps Engineering on GCP",
                    "AI Agent Automation Workflows",
                    "Developing a Machine Learning Systems",
                    "Applied Machine Learning with GCP",
                    "Data Engineering on GCP"
                  ].map((training, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                      {training}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="glass-effect rounded-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Languages & Tools</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PHP", "SQL", "JavaScript"].map((lang, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary/50">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    {["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", 
                      "Keras", "NLTK", "spaCy", "Hugging Face"].map((lib, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary/50">
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tools & Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "Kubernetes", "AWS", "GCP", "Azure ML", 
                      "Jupyter", "MLflow"].map((tool, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary/50">
                        {tool}
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

export default Education;
