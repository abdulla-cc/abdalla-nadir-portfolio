import type { LucideIcon } from 'lucide-react'
import {
  Award, BarChart3, BrainCircuit, Cloud, Network, Terminal,
} from 'lucide-react'

export interface Certification {
  title: string
  issuer: string
  badge: 'Verified' | 'Mastery' | 'In Progress'
  icon: LucideIcon
  featured?: boolean
}

export const certifications: Certification[] = [
  { title: 'Microsoft Power BI for Beginners', issuer: 'Microsoft · Dec 2025', badge: 'Verified', icon: Award },
  { title: 'Google Analytics Certification', issuer: 'Google · Nov 2025', badge: 'Verified', icon: BarChart3 },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco · Feb 2026', badge: 'Verified', icon: Network },
  { title: 'HCIA-AI V4.0', issuer: 'Huawei · Feb 2026', badge: 'Verified', icon: Cloud },
  { title: 'Claude Code 101', issuer: 'Anthropic · Jul 2026', badge: 'Mastery', icon: Terminal, featured: true },
  { title: 'IBM Data Analyst Professional Certificate', issuer: 'IBM · 2026', badge: 'In Progress', icon: BrainCircuit },
]
