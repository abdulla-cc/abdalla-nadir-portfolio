import type { LucideIcon } from 'lucide-react'
import { profileStats } from './profile'
import {
  BarChart3, Code2, FlaskConical, LineChart, Rocket, Trophy, Users, GraduationCap,
} from 'lucide-react'

export const skillTags = [
  'Power BI', 'Python', 'SQL', 'Excel', 'DAX', 'Pandas', 'SQLite',
  'Machine Learning', 'AI Engineering', 'React', 'FastAPI', 'REST APIs',
  'Docker', 'ETL Pipelines', 'openpyxl', 'Google Analytics', 'Git',
]

export const learningNow = ['Advanced Python', 'Full-stack engineering', 'Applied ML systems']

export interface SkillCard {
  icon: LucideIcon
  title: string
  description: string
}

export const skillCards: SkillCard[] = [
  { icon: BarChart3, title: 'Data & BI', description: 'Power BI dashboards, DAX measures, SQL analysis, KPI tracking, and interactive Excel reports.' },
  { icon: Code2, title: 'Software Engineering', description: 'Full-stack projects using React, TypeScript, FastAPI, REST APIs, SQLModel, and account authentication.' },
  { icon: FlaskConical, title: 'ML & AI Engineering', description: 'Applied machine learning, deep learning, RAG systems, LLM integration, feature engineering, and evaluation.' },
  { icon: Rocket, title: 'Testing & Deployment', description: 'Docker, automated tests, GitHub workflows, cloud deployment, and API error handling.' },
]

export interface Achievement {
  icon: LucideIcon
  title: string
  description: string
}

export const achievements: Achievement[] = [
  { icon: Trophy, title: "Dean's List", description: 'Recognised for academic performance at Multimedia University.' },
  { icon: LineChart, title: `${profileStats.projectCount} Projects`, description: 'Full-stack software, offline-first apps, analytics, ML, NLP, and computer vision — including the personal project below.' },
  { icon: GraduationCap, title: 'AI Specialisation', description: 'Coursework in machine learning, deep learning, and applied AI.' },
  { icon: Users, title: 'Arabic Culture Society', description: 'High Committee — leading events and cross-campus collaboration.' },
]
