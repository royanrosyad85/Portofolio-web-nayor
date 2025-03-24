
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Senior ML Engineer",
      company: "TechCorp AI",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      description: [
        "Led a team of 5 engineers to develop and deploy a recommendation system that increased user engagement by 42%.",
        "Designed and implemented computer vision models for real-time object detection with 95% accuracy.",
        "Optimized ML pipelines to reduce inference time by 60% and cloud computing costs by 35%."
      ]
    },
    {
      id: 2,
      role: "Data Scientist",
      company: "DataInsight Solutions",
      location: "Seattle, WA",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Developed NLP models for sentiment analysis and topic modeling on customer feedback data.",
        "Created data visualization dashboards to communicate insights to non-technical stakeholders.",
        "Collaborated with product teams to implement A/B testing frameworks for feature evaluation."
      ]
    },
    {
      id: 3,
      role: "Machine Learning Intern",
      company: "AI Research Lab",
      location: "Boston, MA",
      period: "Jun 2019 - Feb 2020",
      description: [
        "Contributed to research on reinforcement learning algorithms for robotic control systems.",
        "Implemented and evaluated various deep learning models for image classification tasks.",
        "Published a paper on efficient training methods for large-scale neural networks."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-secondary/5">
      <div className="section-container">
        <span className="text-sm font-medium text-primary">My Journey</span>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">Where I've worked and what I've accomplished</p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border opacity-50 transform md:translate-x-px"></div>
          
          <div className="space-y-12 relative">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`flex flex-col md:flex-row gap-4 md:gap-8 animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="md:w-1/2 flex flex-col items-start md:items-end">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <h4 className="text-primary font-medium">{exp.company}</h4>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-primary rounded-full transform -translate-x-2 md:-translate-x-2.5 z-10"></div>
                
                <div className="md:w-1/2 glass-effect p-6 rounded-xl">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
