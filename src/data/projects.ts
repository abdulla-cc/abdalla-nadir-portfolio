import type { LucideIcon } from 'lucide-react'
import {
  Activity, Bot, FlaskConical, GraduationCap, Package, Smile, Store, Workflow,
} from 'lucide-react'

export interface ProjectLink {
  label: string
  href: string
  icon: 'github' | 'launch' | 'notebook' | 'brain'
  primary?: boolean
}

export interface Project {
  id: string
  tag: string
  title: string
  description: string
  image?: string
  placeholderIcon: LucideIcon
  featured?: boolean
  status?: string
  tech?: string[]
  links: ProjectLink[]
  caseStudyId: string
}

export const projects: Project[] = [
  {
    id: 'research-agent',
    tag: 'Featured · Jul 2026',
    title: 'Research Agent — Agentic RAG System over arXiv Papers',
    description: 'An end-to-end retrieval-augmented generation (RAG) system that answers questions about a corpus of arXiv papers, returning cited answers grounded in the source papers. Offers two pipelines: a fast single-shot RAG endpoint, and an agentic pipeline that decomposes complex questions into sub-questions, retrieves per sub-question, and runs a critic/verifier pass to check the generated answer against its sources. Built a conservative junk-filter to clean noisy PDF-extracted chunks (reference lists, tables, title-page headers), improving retrieval relevance measurably. Production-hardened with input validation, structured logging, retry with exponential backoff, a custom per-IP rate limiter, and 16 unit tests. Containerized with Docker and deployed live on Render.',
    placeholderIcon: Bot,
    featured: true,
    status: 'Live · Deployed on Render',
    tech: ['Python', 'FastAPI', 'Chroma', 'sentence-transformers', 'Groq (Llama 3.1)', 'Docker', 'Render', 'RAG', 'LLM Agents'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/research-agent-rag', icon: 'github' },
    ],
    caseStudyId: 'research-agent',
  },
  {
    id: 'scoms',
    tag: 'Featured · Final Year Project',
    title: 'AI-Powered Supply Chain Optimization & Risk Management (SCOMS)',
    description: 'A three-module AI pipeline for retail supply chain decision support: LSTM demand forecasting, Random Forest supplier risk classification, and dynamic EOQ / ROP inventory optimization — unified in a Streamlit dashboard with role-based recommendations for store managers. Final Year Project, B.CS (AI), MMU.',
    image: 'scoms-architecture.webp',
    placeholderIcon: Package,
    featured: true,
    status: 'In Progress · Expected Mar 2027',
    tech: ['LSTM', 'Random Forest', 'XGBoost', 'TensorFlow / Keras', 'Scikit-learn', 'Streamlit'],
    links: [],
    caseStudyId: 'scoms',
  },
  {
    id: 'yt-sentiment',
    tag: 'NLP · Live Deployment',
    title: 'YouTube AI Sentiment Tracker',
    description: 'Live, self-updating dashboard tracking public sentiment toward ChatGPT, Gemini, and Copilot from real YouTube comments, scored by a RoBERTa transformer. Commenter sentiment leans ~3:1 negative across all three tools, with Copilot the most consistently negative (overall ≈ −0.18 on a −1 to +1 scale).',
    image: 'yt-sentiment-dashboard.webp',
    placeholderIcon: Smile,
    links: [
      { label: 'Live Dashboard', href: 'https://yt-sentiment-tracker-ea5avtzglszurpccwcnib2.streamlit.app/', icon: 'launch', primary: true },
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/yt-sentiment-tracker', icon: 'github' },
    ],
    caseStudyId: 'yt-sentiment',
  },
  {
    id: 'retail-sales',
    tag: 'Analytics · Excel',
    title: 'Retail Sales Data Analysis',
    description: 'Excel-based retail sales analysis identifying patterns across regions, categories, and sub-categories with a fully interactive dashboard.',
    image: 'retail-dashboard.webp',
    placeholderIcon: Store,
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/sales-data-analysis', icon: 'github' },
    ],
    caseStudyId: 'retail-sales',
  },
  {
    id: 'hr-dashboard',
    tag: 'Power BI · DAX',
    title: 'HR Analytics Dashboard',
    description: 'Power BI dashboard analysing employee attrition. Overall rate 16.12% — R&D identified as the highest-risk department.',
    image: 'hr-dashboard.webp',
    placeholderIcon: Activity,
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/hr-analytics-analysis', icon: 'github' },
    ],
    caseStudyId: 'hr-dashboard',
  },
  {
    id: 'student-db',
    tag: 'SQL · Database Design',
    title: 'Student Management System',
    description: 'Normalized SQL database managing students, courses, and enrollments. Demonstrates advanced schema design and query optimisation.',
    image: 'student-db-erd.webp',
    placeholderIcon: GraduationCap,
    links: [],
    caseStudyId: 'student-db',
  },
  {
    id: 'hr-pipeline',
    tag: 'Python · SQL · Power BI',
    title: 'HR Analytics Pipeline',
    description: 'End-to-end pipeline analysing 1,470 employee records. Sales Reps flagged at 39.76% attrition — highest across all roles.',
    image: 'overview-dashboard.webp',
    placeholderIcon: Workflow,
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/HR-Analytics-Pipeline', icon: 'github' },
    ],
    caseStudyId: 'hr-pipeline',
  },
  {
    id: 'diabetes',
    tag: 'Machine Learning · 2025',
    title: 'XGBoost Diabetes Risk Models',
    description: 'Two parallel XGBoost classifiers predicting diabetes onset — a 2,000-patient clinical pipeline (SMOTE-balanced, 5-fold GridSearchCV over 432 hyperparameter combos → 82% test accuracy on the minority class, F1 0.76) and a 13-feature behavioral / socioeconomic pipeline (stratified splits + StandardScaler → 79.4% accuracy, balanced 0.79 / 0.80 precision & recall).',
    image: 'diabetes-metrics.webp',
    placeholderIcon: FlaskConical,
    links: [
      { label: 'Clinical Notebook', href: 'https://colab.research.google.com/drive/1awAt7c-XUoYg-JzDu5UyAWgEoIxCRlNC?usp=sharing', icon: 'notebook' },
      { label: 'Behavioral Notebook', href: 'https://colab.research.google.com/drive/1yhVrqFeitSPSkqsBFFGTA5AUBCDydhNw?usp=sharing', icon: 'brain' },
    ],
    caseStudyId: 'diabetes',
  },
]
