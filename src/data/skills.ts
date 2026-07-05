import type { LucideIcon } from 'lucide-react'
import {
  BarChart3, Database, FlaskConical, LineChart, Rocket, Trophy, Users, GraduationCap,
} from 'lucide-react'

export const skillTags = [
  'Power BI', 'Python', 'SQL', 'Excel', 'DAX', 'Pandas', 'SQLite',
  'Machine Learning', 'ETL Pipelines', 'openpyxl', 'Google Analytics', 'Git',
]

export const learningNow = ['Python (advanced)', 'UI / UX', 'Machine Learning']

export interface SkillCard {
  icon: LucideIcon
  title: string
  description: string
}

export const skillCards: SkillCard[] = [
  { icon: BarChart3, title: 'Data & BI', description: 'Power BI dashboards, DAX measures, KPI tracking, and interactive Excel reports.' },
  { icon: Database, title: 'Python & SQL', description: 'End-to-end pipelines using Pandas, SQLite, openpyxl — with CTEs, window functions, and views.' },
  { icon: FlaskConical, title: 'AI & ML', description: 'Machine learning fundamentals, deep learning, feature engineering, and prompt engineering.' },
  { icon: Rocket, title: 'Deploy & Report', description: 'Cisco CCNA, Google Analytics, GitHub workflows, and automated reports with openpyxl.' },
]

export interface Achievement {
  icon: LucideIcon
  title: string
  description: string
}

export const achievements: Achievement[] = [
  { icon: Trophy, title: "Dean's List", description: 'Recognised for academic performance at Multimedia University.' },
  { icon: LineChart, title: '7 Projects', description: 'Analytics, ML & NLP work across Excel, Power BI, SQL, Python, XGBoost & Transformers — plus an AI Final Year Project.' },
  { icon: GraduationCap, title: 'AI Specialisation', description: 'Coursework in machine learning, deep learning, and applied AI.' },
  { icon: Users, title: 'Arabic Culture Society', description: 'High Committee — leading events and cross-campus collaboration.' },
]
