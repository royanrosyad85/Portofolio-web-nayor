
import * as React from 'react';
import { Calendar, BookOpen, Award, ExternalLink } from 'lucide-react';

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Fresh Graduate Degree of Informatics Engineering",
      institution: "UIN Syarif Hidayatullah Jakarta",
      location: "Jakarta, Indonesia",
      period: "2021 - 2025",
      description: "Focused on Artificial Intelligence and Data Science with minor in Mathematics. Thesis on 'Application of Mediapipe and OpenCV to Detect Movement Error in Gym Exercise Activities'.",
      achievements: [
        "GPA: 3.83/4.0",
        "Distinction Graduate Bangkit Academy 2024",
        "Relevant Coursework : Data Structures and Algorithms, Artificial Intelligence, Database Managements, Web Development and Design, Software Project Management"
      ]
    },
  ];
  
  const certifications = [
    {
      id: 1,
      name: "Associate AI Engineer for Developers",
      issuer: "DataCamp",
      date: "Sep 2025",
      credentialId: "247bdb754a5da",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/track/247bdb754a5da008069850231490543992234c93"
    },
    {
      id: 2,
      name: "Applied Data Science",
      issuer: "Dicoding",
      date: "Jun 2025",
      credentialId: "KEXL75LGWXG2",
      link: "https://www.dicoding.com/certificates/KEXL75LGWXG2"
    },
    {
      id: 3,
      name: "Developing a Machine Learning System",
      issuer: "Dicoding",
      date: "Jun 2025",
      credentialId: "MEPJQ8V4LX3V",
      link: "https://www.dicoding.com/certificates/MEPJQ8V4LX3V"
    },
    {
      id: 4,
      name: "Applied Machine Learning",
      issuer: "Dicoding",
      date: "Mei 2025",
      credentialId: "6RPNRM4K9X2M",
      link: "https://www.dicoding.com/certificates/6RPNRM4K9X2M"
    }
  ];

  return (
    <section id="education" className="py-10 bg-background">
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
            
            <div className="solid-card rounded-xl p-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={cert.id}
                    className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 animate-fade-in hover:bg-secondary/30 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 pr-8">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{cert.name}</h4>
                        </div>
                        <div className="text-sm text-primary font-medium">{cert.issuer}</div>
                        {cert.credentialId && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Credential ID: {cert.credentialId}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground ml-4">{cert.date}</span>
                    </div>
                    
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 rounded-md px-2 py-1"
                      >
                        View Certificate
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <h5 className="text-sm font-medium mb-3 text-foreground">Additional Training & Specializations</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {[
                    "AI Agent Automation Workflows",
                    "Developing Machine Learning Systems",
                    "Data Engineering on Google Cloud",
                    "Cloud Architecture Design Patterns",
                  ].map((training, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></span>
                      {training}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
