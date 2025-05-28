// import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "AI Engineer Intern",
      company: "Lintasarta",
      location: "Remote",
      period: "Feb 2025 - Present",
      description: [
      "Gained hands-on experience in machine learning and deep learning techniques, applying supervised and unsupervised learning algorithms to real-world datasets, and fine-tuning models for optimal performance before deployment.",
      "Leveraged MLflow within Azure ML to track experiments, manage model versions, and compare performance metrics across multiple iterations, supporting reproducibility and collaboration"
      ]
    },
    {
      id: 2,
      role: "DevOps Engineer Intern",
      company: "Ministry of Religion of the Republic of Indonesia",
      location: "Jakarta, Indonesia",
      period: "Nov 2024 - Feb 2025",
      description: [
      "Played a key role in the development and deployment of the Pusdiklat Room Management System, a web-based application designed to streamline room booking, scheduling, and resource allocation for internal ministry operations.",
      "Implemented CI/CD pipelines using Google Cloud Platform (GCP) to automate testing, building, and deployment. Also contributed to project management and task tracking using Notion, ensuring timely delivery and alignment with business requirements"
      ]
    },
    {
      id: 3,
      role: "Cloud Engineer Intern",
      company: "Bangkit Academy",
      location: "Remote",
      period: "Sep 2024 - Jan 2025",
      description: [
      "Designed and implemented scalable cloud infrastructure on Google Cloud Platform",
      "Created the server infrastructure to process API calls and serve machine learning models effectively",
      "Collaborated in a capstone team to integrate machine learning models with Flask and FastAPI frameworks, deploying them to production-grade environments with minimal latency and high uptime."
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
          {/* Timeline line - Adjusted for mobile */}
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border opacity-50 transform -translate-x-1/2 md:left-1/2 md:translate-x-px"></div>
          
          {/* Use space-y-8 for mobile spacing, remove relative from here */}
          <div className="space-y-8"> 
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                // Apply relative positioning here for the dot
                className="relative pl-10 md:pl-0 flex flex-col md:flex-row gap-4 md:gap-8 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot - Adjusted positioning */}
                <div className="absolute left-0 top-1 w-5 h-5 bg-primary rounded-full transform -translate-x-1/2 md:left-1/2 md:-translate-x-2.5 z-10"></div>

                {/* Left/Top Section (Role, Company, etc.) - Adjusted for mobile and desktop alignment */}
                <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:items-end md:pr-8' : 'md:items-start md:pl-8 md:order-last'}`}>
                  <div className={`flex flex-col items-start ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <h4 className="text-primary font-medium">{exp.company}</h4>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs text-muted-foreground mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
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
                
                {/* Right/Bottom Section (Description) - Adjusted padding and width */}
                <div className={`w-full md:w-1/2 glass-effect p-6 rounded-xl ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
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
