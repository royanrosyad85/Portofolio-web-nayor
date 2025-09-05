# 🌟 Royan Rosyad - AI/ML Portfolio Website

A modern, responsive portfolio website showcasing AI/ML projects, professional experience, and technical expertise. Built with React, TypeScript, and featuring a comprehensive blog system with rich text editing capabilities.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-blue)

## 🚀 Live Demo

**Website**: [Visit Portfolio](https://royanrosyad.dev)

## ✨ Features

### 🎯 **Core Portfolio Sections**
- **Hero Section**: Dynamic typing animation with professional introduction
- **About**: Comprehensive skills overview with technologies and expertise areas
- **Projects**: Interactive project showcase with detailed modals and filtering
- **Experience**: Professional timeline with company details and achievements
- **Education**: Academic background and certifications
- **Contact**: Professional contact information and social links

### 📝 **Advanced Blog System**
- **Rich Text Editor**: Notion-style editor with slash commands and formatting
- **Content Management**: Full CRUD operations for blog posts
- **Category System**: Organized content with Technology, Personal, Projects, Learning, and Career categories
- **Image Management**: Drag & drop image upload with preview functionality
- **Search & Filter**: Real-time search and category-based filtering
- **View Tracking**: Page view counter for analytics
- **Responsive Design**: Mobile-optimized blog layout

### 🎨 **Modern UI/UX**
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with optimal viewing on all devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Icon Navigation**: Fixed bottom navigation with active section detection

### 🛠️ **Technical Features**
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Meta tags, Open Graph, and semantic HTML structure
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **PWA Ready**: Service worker compatible and mobile app-like experience

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── About.tsx        # About section with skills showcase
│   ├── Blog.tsx         # Blog section for homepage
│   ├── BlogAuth.tsx     # Authentication for blog admin
│   ├── Contact.tsx      # Contact information section
│   ├── Education.tsx    # Education timeline
│   ├── Experience.tsx   # Professional experience timeline
│   ├── Hero.tsx         # Landing section with typing animation
│   ├── Projects.tsx     # Project showcase with modal details
│   ├── Footer.tsx       # Site footer with social links
│   ├── Header.tsx       # Site header (if needed)
│   ├── IconNavigation.tsx # Bottom navigation bar
│   ├── NotionEditor.tsx # Rich text editor component
│   ├── RichTextEditor.tsx # Blog editor implementation
│   ├── ImageUploader.tsx # Drag & drop image upload
│   ├── ThemeToggle.tsx  # Theme switching component
│   └── ui/              # Shadcn/ui components
├── pages/               # Main application pages
│   ├── Index.tsx        # Homepage layout
│   ├── BlogListing.tsx  # Blog posts listing
│   ├── BlogPost.tsx     # Individual blog post view
│   ├── BlogAdmin.tsx    # Blog administration
│   ├── BlogAdminDashboard.tsx # Admin dashboard
│   └── NotFound.tsx     # 404 error page
├── contexts/            # React context providers
│   └── ThemeContext.tsx # Theme management
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile device detection
│   └── use-toast.ts     # Toast notification system
├── lib/                 # Utility functions and data
│   ├── utils.ts         # Helper functions
│   └── blogData.ts      # Blog data management
└── img/                 # Static image assets
```

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.5.3**: Type-safe development with enhanced IntelliSense
- **Vite 5.4.1**: Fast build tool with HMR and optimized bundling

### **Styling & UI**
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library with Radix UI primitives
- **Framer Motion 12.5.0**: Smooth animations and gesture handling
- **Lucide React**: Beautiful icon library
- **Next Themes**: Dark/light mode support

### **Rich Text Editing**
- **React Quill 2.0.0**: Powerful rich text editor
- **Quill 2.0.3**: Core editor engine with customizable toolbar

### **Routing & Navigation**
- **React Router DOM 6.26.2**: Client-side routing and navigation

### **Data Management**
- **TanStack Query 5.56.2**: Server state management and caching
- **React Hook Form 7.53.0**: Form validation and management
- **Zod 3.23.8**: Schema validation

### **Development Tools**
- **ESLint**: Code linting and style enforcement
- **Autoprefixer**: Automatic CSS vendor prefixing
- **PostCSS**: CSS processing and optimization

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/royanrosyad85/Portofolio-web-nayor.git
   cd Portofolio-web-nayor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 📱 Key Sections & Features

### 🏠 **Hero Section**
- Dynamic typing animation showcasing roles: "AI Engineer", "Data Scientist", "ML Engineer"
- Professional photo with glass morphism effects
- Call-to-action buttons for projects and resume
- Responsive design for mobile and desktop

### 👨‍💻 **About Section**
- Skills showcase with icons and descriptions
- Technology stack organized by categories:
  - **Machine Learning**: Supervised, Unsupervised, Reinforcement Learning
  - **Deep Learning**: Computer Vision, NLP, Generative AI
  - **Data Engineering**: Pipelines, ETL, Big Data
  - **MLOps**: CI/CD, Monitoring, Production Deployment
- Interactive hover effects and animations

### 🚀 **Projects Section**
- Filterable project showcase with categories:
  - Machine Learning
  - Deep Learning
  - Data Analytics
  - Web Development
- Detailed project modals with:
  - Full descriptions and key features
  - Technology stacks and implementation details
  - GitHub repository and live demo links
  - Responsive image galleries
- Mobile-optimized layout with smaller fonts and compact spacing

### 💼 **Experience Timeline**
- Professional experience with alternating layout
- Company details, roles, and achievement descriptions
- Timeline visualization with connecting lines
- Location and date information
- Mobile-responsive with stacked layout

### 🎓 **Education Section**
- Academic background and certifications
- Institution details and degree information
- Achievement highlights and relevant coursework

### 📝 **Blog System**
- **Admin Dashboard**: Secure authentication for content management
- **Rich Text Editor**: Notion-style editor with:
  - Slash commands for quick formatting
  - Header support (H1, H2, H3)
  - Lists, links, images, and code blocks
  - Real-time preview and auto-save
- **Content Organization**:
  - Categories: Technology, Personal, Projects, Learning, Career
  - Tag-based filtering and search functionality
  - Chronological post listing
- **Image Management**: Drag & drop upload with preview
- **View Analytics**: Page view tracking for content performance

### 🧭 **Navigation Features**
- **Icon Navigation Bar**: Fixed bottom navigation with:
  - Active section detection based on scroll position
  - Smooth scrolling to sections
  - Tooltips with section descriptions
  - Mobile-optimized with responsive sizing
- **Theme Toggle**: Seamless dark/light mode switching
- **Responsive Behavior**: Adaptive layout for all screen sizes

## 🎨 Design System

### **Color Scheme**
- Supports both light and dark themes
- CSS custom properties for consistent theming
- Glass morphism effects with backdrop blur
- Primary colors with semantic naming

### **Typography**
- Inter font family for modern readability
- Responsive font scales (mobile: smaller, desktop: larger)
- Proper heading hierarchy and text contrast

### **Animations**
- Fade-in animations for section reveals
- Smooth hover transitions and scaling effects
- Loading states and micro-interactions
- Performance-optimized with reduced motion respect

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for mobile devices first
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-Friendly**: Properly sized touch targets and gestures
- **Performance**: Optimized images and lazy loading for mobile networks

## 🔒 Security Features

- **Input Validation**: Zod schema validation for forms
- **XSS Protection**: Sanitized user inputs and content
- **Secure Authentication**: Protected admin routes for blog management
- **Safe External Links**: noopener noreferrer attributes

## 🚀 Deployment

### **Netlify (Recommended)**
1. Connect repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automatically on git push

### **Other Platforms**
- **Vercel**: Zero-config deployment for React apps
- **GitHub Pages**: Static site hosting
- **Custom Domain**: Configurable with DNS settings

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Royan Rosyad**
- Portfolio: [royanrosyad.dev](https://royanrosyad.dev)
- Email: royan.rosyad21@mhs.uinjkt.ac.id
- LinkedIn: [royanrosyad](https://linkedin.com/in/royanrosyad)
- GitHub: [royanrosyad85](https://github.com/royanrosyad85)

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Lucide React** for the comprehensive icon set
- **Tailwind CSS** for the utility-first styling approach
- **Radix UI** for accessible component primitives
- **Lovable.dev** for the development platform and hosting

---

⭐ **Star this repository if you found it helpful!**
