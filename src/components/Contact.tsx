
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData for Netlify submission
      const formDataForSubmission = new FormData();
      formDataForSubmission.append('form-name', 'contact');
      formDataForSubmission.append('name', formData.name);
      formDataForSubmission.append('email', formData.email);
      formDataForSubmission.append('subject', formData.subject);
      formDataForSubmission.append('message', formData.message);
      
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataForSubmission as any).toString()
      });
      
      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or contact me directly.");
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "royanrosyad313@gmail.com",
      href: "mailto:royanrosyad313@gmail.com"
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Depok, Jawa Barat, Indonesia",
      href: "https://maps.app.goo.gl/UeqsgmLB5k8URqeL8"
    }
  ];
  
  const socialLinks = [
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/royanrosyad/",
      label: "LinkedIn"
    },
    {
      icon: <Github size={18} />,
      href: "https://github.com/royanrosyad85",
      label: "GitHub"
    },
  ];

  return (
    <section id="contact" className="py-10 bg-secondary/5">
      <div className="section-container">
        <span className="text-sm font-medium text-primary">Get In Touch</span>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Let's discuss your project or opportunities</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="animate-slide-right">
            <div className="glass-effect rounded-xl p-8 h-full">
              <h3 className="text-xl font-semibold mb-6">Let's Talk</h3>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out if you're looking for an AI/ML Engineer, have a question, 
                or just want to connect.
              </p>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-4">Connect on Social Media</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-left">
            {/* Hidden form for Netlify detection */}
            <form 
              name="contact" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field" 
              style={{ display: 'none' }}
            >
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="text" name="subject" />
              <textarea name="message"></textarea>
            </form>
            
            <form 
              onSubmit={handleSubmit} 
              className="glass-effect rounded-xl p-8"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Sending<span className="animate-pulse">...</span></>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
