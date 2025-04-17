
// import React from 'react';
// import { ArrowRight, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Blog = () => {
//   const blogPosts = [
//     {
//       id: 1,
//       title: "Demystifying Transformer Architecture for NLP Applications",
//       excerpt: "A deep dive into the mechanics of transformer models and how they've revolutionized natural language processing tasks.",
//       date: "May 15, 2023",
//       image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop",
//       readTime: "8 min read",
//       category: "Deep Learning"
//     },
//     {
//       id: 2,
//       title: "Best Practices for ML Model Deployment in Production",
//       excerpt: "Lessons learned from deploying machine learning models to production environments at scale.",
//       date: "March 22, 2023",
//       image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2874&auto=format&fit=crop",
//       readTime: "6 min read",
//       category: "MLOps"
//     },
//     {
//       id: 3,
//       title: "Feature Engineering Techniques for Time Series Data",
//       excerpt: "Exploring effective feature extraction methods to improve forecasting models with temporal data.",
//       date: "January 10, 2023",
//       image: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=3087&auto=format&fit=crop",
//       readTime: "5 min read",
//       category: "Data Science"
//     }
//   ];

//   return (
//     <section id="blog" className="py-20 bg-background">
//       <div className="section-container">
//         <span className="text-sm font-medium text-primary">My Blog</span>
//         <h2 className="section-title">Latest Articles</h2>
//         <p className="section-subtitle">Sharing insights and knowledge on AI, ML, and data science</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {blogPosts.map((post, index) => (
//             <Link 
//               to={`/blog/${post.id}`} 
//               key={post.id}
//               className="group glass-effect rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-in flex flex-col h-full"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img 
//                   src={post.image} 
//                   alt={post.title} 
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   loading="lazy"
//                 />
//               </div>
//               <div className="p-6 flex flex-col flex-grow">
//                 <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
//                   <span className="px-3 py-1 rounded-full bg-secondary/50">{post.category}</span>
//                   <div className="flex items-center">
//                     <Calendar size={14} className="mr-1" />
//                     <span>{post.date}</span>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
//                 <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p>
//                 <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
//                   <span className="text-xs text-muted-foreground">{post.readTime}</span>
//                   <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
//                     Read Article
//                     <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
        
//         <div className="mt-12 text-center">
//           <Link 
//             to="/blog" 
//             className="inline-flex items-center px-6 py-3 font-medium rounded-lg glass-effect hover:bg-white/10 transition-colors"
//           >
//             All Articles
//             <ArrowRight size={16} className="ml-2" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

const Blog = () => null; // Placeholder for the Blog component

export default Blog;
