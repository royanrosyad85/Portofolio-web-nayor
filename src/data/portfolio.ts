export type ProjectTag = 'all' | 'ml' | 'dl' | 'cv' | 'llms' | 'ds' | 'automation';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: Exclude<ProjectTag, 'all'>[];
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  impact?: string;
  year?: string;
  featuredRank?: number;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link: string;
}

export const projectCategories: { id: ProjectTag; name: string }[] = [
  { id: 'all', name: 'All projects' },
  { id: 'automation', name: 'Automation' },
  { id: 'llms', name: 'LLM systems' },
  { id: 'ml', name: 'Machine learning' },
  { id: 'dl', name: 'Deep learning' },
  { id: 'cv', name: 'Computer vision' },
  { id: 'ds', name: 'Data science' },
];

export const featuredMetrics = [
  { label: 'Production tracks', value: '10+', note: 'AI, analytics, and automation systems shipped end-to-end.' },
  { label: 'Focus areas', value: '4', note: 'LLM systems, applied ML, data products, and workflow automation.' },
  { label: 'Delivery style', value: '0→1', note: 'From exploration and prototyping to deployable interfaces.' },
];

export const highlightPillars = [
  {
    title: 'Agentic automation',
    description: 'Designing AI-assisted workflows that reduce manual review, enrich data, and keep operators in control.',
  },
  {
    title: 'Applied machine learning',
    description: 'Turning messy operational data into models, recommendations, and usable decision support.',
  },
  {
    title: 'Product-minded delivery',
    description: 'Packaging technical systems into interfaces that stakeholders can actually trust and use.',
  },
];

export const capabilityGroups = [
  {
    title: 'Core stack',
    items: ['Python', 'TypeScript', 'SQL', 'FastAPI', 'Streamlit', 'React'],
  },
  {
    title: 'AI systems',
    items: ['LangGraph', 'Azure OpenAI', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'],
  },
  {
    title: 'Data and delivery',
    items: ['n8n', 'Notion API', 'Google Cloud', 'Azure ML', 'MLflow', 'Docker'],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 11,
    title: 'AI Enrichment Tool',
    description:
      'An internal lead enrichment workspace that automates company research, fills profile gaps, and prepares structured outputs for commercial teams.',
    fullDescription:
      'AI Enrichment Tool is a workflow-driven enrichment application built for faster company research. It combines agent orchestration, web search, and structured output handling so analysts can enrich account records, surface business context, estimate insurance potential, and export consistent research results without repeating the same manual lookups. The interface is centered on a working table instead of a generic landing page, which makes it useful in day-to-day operational flows rather than only as a demo.',
    image: '/img/AI Lead Enrichment.png',
    tags: ['automation', 'llms', 'ds'],
    demo: 'https://zgti-ai-enrichment-x43jf.ondigitalocean.app/',
    technologies: ['LangGraph', 'Tavily', 'TypeScript', 'AI agents', 'Structured exports'],
    features: ['Company enrichment workflow', 'Research progress tracking', 'AI-assisted profile completion', 'Export to Excel and PDF', 'Tabular review interface'],
    impact: 'Built to compress repetitive desk research into a guided enrichment flow.',
    year: '2026',
    featuredRank: 1,
  },
  {
    id: 1,
    title: 'Automation Habit Tracker Chatbot',
    description:
      'A voice-enabled habit tracking assistant connected to Notion for automatic logging and progress updates.',
    fullDescription:
      'A comprehensive habit tracking automation system that integrates with a Notion database to provide habit classification and progress monitoring. The experience connects Telegram Bot API, ElevenLabs voice synthesis, Azure OpenAI responses, and n8n workflow automation so habit logging becomes conversational instead of manual.',
    image: '/img/Habit Tracker Notion.png',
    tags: ['llms', 'automation'],
    technologies: ['Azure OpenAI', 'n8n', 'Notion API', 'ElevenLabs', 'Telegram Bot API'],
    features: ['Habit classification', 'Voice recognition', 'Automated progress tracking', 'Notion sync', 'Personalized responses'],
    impact: 'Turned fragmented habit notes into a single automated routine.',
    year: '2025',
    featuredRank: 2,
  },
  {
    id: 2,
    title: 'Chickbot',
    description:
      'A poultry health assistant that combines image classification with conversational guidance for farmers.',
    fullDescription:
      'Chickbot combines computer vision and conversational retrieval to help identify chicken diseases. A CNN-based classifier works alongside an agentic RAG assistant so farmers can inspect symptoms, understand likely diagnoses, and read treatment guidance from a curated knowledge base.',
    image: '/img/Chickbot.png',
    tags: ['dl', 'llms'],
    github: 'https://github.com/Capstone-LaskarAi/chicken-diseases-classification-model/tree/dev-1',
    demo: 'https://chickbot-project-d2m6d.ondigitalocean.app/',
    technologies: ['Python', 'TensorFlow', 'CNN', 'RAG', 'LLM', 'Streamlit'],
    features: ['Disease classification', 'Agentic RAG pipeline', 'Real-time analysis', 'Treatment recommendations'],
    impact: 'Bridged advanced AI tooling with a practical farming workflow.',
    year: '2025',
    featuredRank: 3,
  },
  {
    id: 3,
    title: 'Automation Reply Comment & Sentiment Analysis',
    description:
      'A government communication workflow that monitors comments, classifies sentiment, and drafts context-aware replies.',
    fullDescription:
      'A large-scale social response workflow designed for government communication teams. Built with n8n, social media APIs, and sentiment analysis models, it reduced manual review time while keeping responses structured and trackable across channels.',
    image: '/img/Automation Reply Comment.png',
    tags: ['llms', 'automation'],
    technologies: ['Azure OpenAI', 'n8n', 'Google Sheets API', 'Facebook Graph API'],
    features: ['Real-time monitoring', 'Sentiment analysis', 'Automated replies', 'Multi-platform support'],
    impact: 'Reduced manual review time by 75 percent for public-facing comment handling.',
    year: '2025',
    featuredRank: 4,
  },
  {
    id: 4,
    title: 'GoPay sentiment analysis',
    description:
      'A sentiment research project over 40,000 user reviews to identify product issues and satisfaction drivers.',
    fullDescription:
      'A lexicon-based Indonesian NLP analysis of 40,000 GoPay app reviews with a full preprocessing pipeline and exploratory reporting. The project surfaces user satisfaction patterns, technical pain points, and the distribution of positive, negative, and neutral sentiment.',
    image: '/img/NLP.png',
    tags: ['ml', 'ds'],
    github: 'https://github.com/royanrosyad85/Sentiment-Analysis---Gopay',
    technologies: ['Python', 'NLTK', 'Sastrawi', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    features: ['Text preprocessing', 'Lexicon-based analysis', 'Word cloud visualization', 'Sentiment classification'],
    impact: 'Converted raw review data into a usable product feedback map.',
    year: '2024',
  },
  {
    id: 5,
    title: 'Fitness Vision',
    description:
      'A real-time squat form analysis tool using pose estimation to guide training quality.',
    fullDescription:
      'Fitness Vision analyzes squat form in real time using MediaPipe pose estimation. It evaluates posture, counts repetitions, and exposes form mistakes using both live webcam and video uploads so users can review performance with measurable feedback.',
    image: '/img/V-Squat.png',
    tags: ['cv'],
    github: 'https://github.com/royanrosyad85/Squat-Vision-Mediapipe',
    demo: 'https://squat-vision-demo.streamlit.app/',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'Streamlit', 'NumPy'],
    features: ['Pose estimation', 'Form analysis', 'MPJPE evaluation', 'Live feedback'],
    impact: 'Shifted exercise assessment from subjective observation to measurable signals.',
    year: '2024',
  },
  {
    id: 6,
    title: 'Predictive analytics for water potability',
    description:
      'A comparative machine learning and deep learning project for water quality classification.',
    fullDescription:
      'A water potability classification workflow using 3,276 samples and nine chemical parameters. It compares traditional machine learning algorithms with neural network approaches while covering feature engineering, missing-value handling, and hyperparameter tuning.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['ml', 'dl'],
    github: 'https://github.com/royanrosyad85/Machine-Learning-Terapan/tree/main/Submission%20Predictive%20Analytics',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'],
    features: ['Binary classification', 'Feature engineering', 'Model comparison', 'Hyperparameter tuning'],
    impact: 'Framed data quality work as a model selection problem with practical trade-offs.',
    year: '2024',
  },
  {
    id: 7,
    title: 'E-commerce RFM and geospatial analysis',
    description:
      'A customer segmentation and geospatial analytics dashboard for e-commerce performance tracking.',
    fullDescription:
      'A data analytics platform that combines RFM analysis with geospatial segmentation to help businesses read customer behavior, regional performance, and ordering patterns. Built as an interactive Streamlit dashboard with actionable summaries.',
    image: '/img/E-Commerce Dashboard.png',
    tags: ['ds'],
    github: 'https://github.com/royanrosyad85/E-commerce-Data-Geospatial_Analysis.git',
    demo: 'https://e-commerce-data-geospatialanalysis-royanrosyad.streamlit.app/',
    technologies: ['Python', 'NumPy', 'Plotly', 'Streamlit', 'Pandas'],
    features: ['RFM analysis', 'Customer segmentation', 'Geospatial analysis', 'Interactive dashboard'],
    impact: 'Made segmentation and location patterns easier to act on in one view.',
    year: '2024',
  },
  {
    id: 8,
    title: 'Movie recommendation system',
    description:
      'A hybrid recommendation engine combining content-based and collaborative filtering.',
    fullDescription:
      'A recommendation system based on the MovieLens dataset that combines metadata-driven similarity with collaborative filtering. The hybrid design helps address cold-start scenarios and improve recommendation quality using both item and user signals.',
    image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?q=80&w=2071&auto=format&fit=crop',
    tags: ['ml'],
    github: 'https://github.com/royanrosyad85/Machine-Learning-Terapan/tree/main/Submission%20System%20Recommendation',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'TF-IDF'],
    features: ['Content-based filtering', 'Collaborative filtering', 'Hybrid recommendation design'],
    impact: 'Balanced item metadata and behavior patterns for more reliable suggestions.',
    year: '2024',
  },
  {
    id: 9,
    title: 'HR analytics Metabase dashboard',
    description:
      'A workforce analytics dashboard focused on attrition drivers and retention insights.',
    fullDescription:
      'A business intelligence dashboard for employee attrition analysis at PT Jaya Jaya Maju. Built with Metabase and Supabase, it highlights attrition patterns by role, department, demographics, and work-life factors to support HR decision-making.',
    image: '/img/HR Dashboard.png',
    tags: ['ml', 'ds'],
    github: 'https://github.com/royanrosyad85/Business-Metabase-Dashboard-HR',
    demo: '/img/HR Analytics Dashboard_ Employee Retention & Workforce Insights (1).pdf',
    technologies: ['Metabase', 'Supabase', 'Python', 'SQLAlchemy', 'Pandas'],
    features: ['Interactive dashboards', 'Attrition analysis', 'Demographic insights', 'Business intelligence'],
    impact: 'Translated workforce data into retention-focused decision support.',
    year: '2024',
  },
  {
    id: 10,
    title: 'Student analytics dashboard',
    description:
      'A dropout-risk prediction system combined with institutional analytics dashboards.',
    fullDescription:
      'A predictive analytics system for student dropout risk that combines machine learning classification with a dashboard for institutional visibility. It enables early warning analysis and student-level assessment for intervention planning.',
    image: '/img/Student.png',
    tags: ['ml', 'ds'],
    github: 'https://github.com/royanrosyad85/Student-Performance-Prediction-Dashboard-Metabase',
    demo: 'https://student-prediction-royanrosyad.streamlit.app/',
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'Metabase', 'Gradient Boosting'],
    features: ['Dropout prediction', 'Interactive dashboard', 'Risk assessment', 'Early warning system'],
    impact: 'Connected model outputs to a decision flow for academic intervention.',
    year: '2024',
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 0,
    role: 'Data Scientist',
    company: 'Zurich Insurance Indonesia',
    location: 'Jakarta, Indonesia',
    period: 'Nov 2025 — Present',
    summary: 'Working on research automation and pricing data transformation with agentic systems in an insurance context.',
    highlights: [
      'Designed AI-driven workflows for research automation and pricing data transformation.',
      'Built an agent-based pipeline to standardize non-uniform Excel pricing inputs and reduce manual cleanup.',
    ],
  },
  {
    id: 1,
    role: 'AI Automation Engineer',
    company: 'Government of Sukabumi',
    location: 'Freelance, remote',
    period: 'Apr 2025 — Sep 2025',
    summary: 'Built public communication automations to manage high-volume social interactions with consistent response quality.',
    highlights: [
      'Designed a sentiment analysis workflow in n8n for high-volume citizen comments.',
      'Reduced manual review time by 75 percent while improving response consistency across channels.',
    ],
  },
  {
    id: 2,
    role: 'AI Engineer Intern',
    company: 'Lintasarta',
    location: 'Hybrid',
    period: 'Feb 2025 — Aug 2025',
    summary: 'Focused on machine learning experimentation, model tuning, and deployment workflows.',
    highlights: [
      'Applied supervised and unsupervised learning to real-world datasets and tuned models before deployment.',
      'Used MLflow inside Azure ML to track experiments, compare runs, and support reproducibility.',
    ],
  },
  {
    id: 3,
    role: 'DevOps Engineer Intern',
    company: 'Ministry of Religion of the Republic of Indonesia',
    location: 'Jakarta, Indonesia',
    period: 'Nov 2024 — Feb 2025',
    summary: 'Supported web application delivery, infrastructure automation, and internal workflow coordination.',
    highlights: [
      'Contributed to the Pusdiklat Room Management System for booking and scheduling operations.',
      'Implemented CI/CD pipelines on Google Cloud Platform and coordinated work tracking through Notion.',
    ],
  },
  {
    id: 4,
    role: 'Cloud Engineer Intern',
    company: 'Bangkit Academy',
    location: 'Remote',
    period: 'Sep 2024 — Jan 2025',
    summary: 'Built cloud infrastructure for machine learning-backed APIs and collaborated on deployment-readiness.',
    highlights: [
      'Designed scalable Google Cloud infrastructure for API and model serving workflows.',
      'Collaborated with a capstone team to integrate Flask and FastAPI services around deployed ML models.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: 1,
    degree: 'Informatics engineering',
    institution: 'UIN Syarif Hidayatullah Jakarta',
    location: 'Jakarta, Indonesia',
    period: '2021 — 2025',
    description:
      'Focused on artificial intelligence and data science with a minor in mathematics. Thesis centered on MediaPipe and OpenCV for gym movement error detection.',
    achievements: [
      'GPA 3.83 / 4.0',
      'Distinction Graduate, Bangkit Academy 2024',
      'Relevant coursework in AI, data structures, databases, web development, and software project management',
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: 1,
    name: 'Associate AI Engineer for Developers',
    issuer: 'DataCamp',
    date: 'Sep 2025',
    credentialId: 'AIEDA0012898205446',
    link: 'https://www.datacamp.com/certificate/AIEDA0012898205446',
  },
  {
    id: 2,
    name: 'Applied Data Science',
    issuer: 'Dicoding',
    date: 'Jun 2025',
    credentialId: 'KEXL75LGWXG2',
    link: 'https://www.dicoding.com/certificates/KEXL75LGWXG2',
  },
  {
    id: 3,
    name: 'Developing a machine learning system',
    issuer: 'Dicoding',
    date: 'Jun 2025',
    credentialId: 'MEPJQ8V4LX3V',
    link: 'https://www.dicoding.com/certificates/MEPJQ8V4LX3V',
  },
  {
    id: 4,
    name: 'Applied machine learning',
    issuer: 'Dicoding',
    date: 'May 2025',
    credentialId: '6RPNRM4K9X2M',
    link: 'https://www.dicoding.com/certificates/6RPNRM4K9X2M',
  },
];

export const contactChannels = [
  {
    label: 'Email',
    value: 'royanrosyad313@gmail.com',
    href: 'mailto:royanrosyad313@gmail.com',
  },
  {
    label: 'Location',
    value: 'Depok, West Java, Indonesia',
    href: 'https://maps.app.goo.gl/UeqsgmLB5k8URqeL8',
  },
];

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/royanrosyad/' },
  { label: 'GitHub', href: 'https://github.com/royanrosyad85' },
  { label: 'Blog', href: '/blog' },
];
