/**
 * Shared domain types for the portfolio feature.
 * Keeping these separate from the data layer keeps content and contracts decoupled.
 */

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

export type CompanyLogo =
  | 'straitpoint'
  | 'zurich'
  | 'government'
  | 'lintasarta'
  | 'kemenag'
  | 'bangkit';

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyLogo: CompanyLogo;
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

export interface SkillItem {
  name: string;
  logo: string;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface ProjectCategory {
  id: ProjectTag;
  name: string;
}
