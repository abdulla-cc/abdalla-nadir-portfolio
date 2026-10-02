import type { LucideIcon } from 'lucide-react'
import {
  Activity, Bot, BriefcaseBusiness, FlaskConical, GraduationCap, Package, PiggyBank, Scale, Smile, Store, Workflow,
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
    description: 'A FastAPI research assistant with single-shot retrieval and an agentic decompose-retrieve-verify pipeline over arXiv papers. Includes cited answers, PDF chunk filtering, input validation, retry/backoff, rate limiting, Docker packaging, and 16 documented unit tests. Retrieval observations are exploratory; a formal answer-quality benchmark is still needed.',
    placeholderIcon: Bot,
    featured: true,
    status: 'Demo on Render · Free tier',
    tech: ['Python', 'FastAPI', 'Chroma', 'sentence-transformers', 'Groq (Llama 3.1)', 'Docker', 'Render', 'RAG', 'LLM Agents'],
    links: [
      { label: 'Live Demo', href: 'https://research-agent-rag-ko8d.onrender.com', icon: 'launch', primary: true },
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/research-agent-rag', icon: 'github' },
    ],
    caseStudyId: 'research-agent',
  },
  {
    id: 'job-tracker',
    tag: 'Featured · Full Stack · Sep 2026',
    title: 'JobTracker — AI-Powered Job Application Platform',
    description: 'A production-deployed platform combining a four-stage job-application pipeline with AI job-description analysis and CV tailoring. Includes secure accounts, user-scoped data, a structured CV workspace, and 53 backend tests across the full workflow.',
    image: 'job-tracker-login.png',
    placeholderIcon: BriefcaseBusiness,
    featured: true,
    status: 'Live · Deployed on Render',
    tech: ['React 19', 'FastAPI', 'SQLModel', 'PostgreSQL', 'JWT + Argon2', 'Groq API', 'GPT-OSS 20B', 'Docker', 'Render'],
    links: [
      { label: 'Live App', href: 'https://job-tracker-web-ckxo.onrender.com/', icon: 'launch', primary: true },
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/job-tracker', icon: 'github' },
    ],
    caseStudyId: 'job-tracker',
  },
  {
    id: 'budget-tracker',
    tag: 'PWA · TypeScript · Sep 2026',
    title: 'Budget Tracker — Offline-First Personal Finance PWA',
    description: 'An installable mobile-first budgeting app for monthly allowances, category budgets, expenses, and savings. It keeps data private in IndexedDB and derives remaining balances, over-budget warnings, and a safe-to-spend-today figure directly from the transaction history.',
    placeholderIcon: PiggyBank,
    featured: true,
    tech: ['React 19', 'TypeScript', 'Dexie.js', 'IndexedDB', 'Tailwind CSS', 'PWA'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/Budget_Tracker', icon: 'github' },
    ],
    caseStudyId: 'budget-tracker',
  },
  {
    id: 'decision-os',
    tag: 'AI Engineering · Full Stack · Sep 2026',
    title: 'DecisionOS — Evidence-Based AI Decision Support',
    description: 'A full-stack application for comparing 2–4 options using explicit criteria, AI reasoning, optional research, and reproducible heuristic scores. Includes counterarguments, what-if analysis, outcome tracking, React and Expo clients, a FastAPI API, and SQLAlchemy storage. The normalized scores rank options; they are not calibrated probabilities of success.',
    placeholderIcon: Scale,
    featured: true,
    status: 'Open Source · Local Application',
    tech: ['Python', 'FastAPI', 'React 19', 'Expo', 'TypeScript', 'SQLAlchemy', 'Groq / OpenAI', 'Tavily', 'Docker', 'pytest'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abdulla-cc/Decision_OS', icon: 'github' },
    ],
    caseStudyId: 'decision-os',
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
    tag: 'NLP · Streamlit',
    title: 'YouTube AI Sentiment Tracker',
    description: 'A Streamlit dashboard exploring sentiment in sampled YouTube comments about ChatGPT, Gemini, and Copilot using a RoBERTa transformer. Includes monthly summaries, sample-size filters, and a scheduled collection pipeline. The sample describes selected comments, not the general public.',
    image: 'yt-sentiment-dashboard.webp',
    placeholderIcon: Smile,
    links: [
      { label: 'Dashboard (may sleep)', href: 'https://yt-sentiment-tracker-ea5avtzglszurpccwcnib2.streamlit.app/', icon: 'launch', primary: true },
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
    description: 'Power BI dashboard exploring historical employee attrition: a 16.12% overall rate and breakdowns by department, role, and overtime. R&D has the largest departure count; counts alone do not establish the highest attrition risk.',
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
    description: 'Academic relational database design for students, courses, and enrollments. The case study covers relationships, constraints, and CRUD queries; a public source download is not yet available.',
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
    description: 'Two educational XGBoost classification notebooks using clinical and behavioral features. Explores class imbalance, SMOTE, feature engineering, cross-validation, and confusion matrices. Exact metrics need a reproducible evaluation report; these models have not been clinically validated.',
    placeholderIcon: FlaskConical,
    links: [
      { label: 'Clinical Notebook', href: 'https://colab.research.google.com/drive/1awAt7c-XUoYg-JzDu5UyAWgEoIxCRlNC?usp=sharing', icon: 'notebook' },
      { label: 'Behavioral Notebook', href: 'https://colab.research.google.com/drive/1yhVrqFeitSPSkqsBFFGTA5AUBCDydhNw?usp=sharing', icon: 'brain' },
    ],
    caseStudyId: 'diabetes',
  },
]
