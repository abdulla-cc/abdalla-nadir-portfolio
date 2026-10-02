import type { LucideIcon } from 'lucide-react'
import {
  Award, BarChart3, Cloud, Network, ShieldCheck, Terminal,
} from 'lucide-react'

export interface Certification {
  title: string
  issuer: string
  badge: 'Completed' | 'In Progress'
  icon: LucideIcon
  featured?: boolean
}

export const certifications: Certification[] = [
  { title: 'Data Visualization and Dashboards with Excel and Cognos', issuer: 'IBM via Coursera · Sep 2026', badge: 'Completed', icon: Award },
  { title: 'Google Analytics Certification', issuer: 'Google · Nov 2025', badge: 'Completed', icon: BarChart3 },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco · Feb 2026', badge: 'Completed', icon: Network },
  { title: 'HCIA-AI V4.0', issuer: 'Huawei · Feb 2026', badge: 'Completed', icon: Cloud },
  { title: 'Claude Code 101', issuer: 'Anthropic · Jul 2026', badge: 'Completed', icon: Terminal, featured: true },
  { title: 'Introduction to Responsible AI', issuer: 'Google Cloud · Jul 2026', badge: 'Completed', icon: ShieldCheck },
]
