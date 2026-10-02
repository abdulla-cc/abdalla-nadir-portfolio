import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { useReducedMotion } from './lib/useReducedMotion'
import { ThemeProvider } from './context/ThemeContext'
import { Splash } from './components/Splash'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { PersonalProjects } from './components/PersonalProjects'
import { CtaBanner } from './components/CtaBanner'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'
import { CaseStudyModal } from './components/CaseStudyModal'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [caseStudyId, setCaseStudyId] = useState<string | null>(null)
  const closeCaseStudy = useCallback(() => setCaseStudyId(null), [])

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <a
        href="#main-content"
        className="sr-only fixed top-3 left-3 z-[10000] rounded-lg bg-gold px-4 py-3 font-bold text-on-gold focus:not-sr-only"
      >
        Skip to content
      </a>
      <Splash />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenCaseStudy={setCaseStudyId} />
        <Certifications />
        <CtaBanner />
        <PersonalProjects onOpenCaseStudy={setCaseStudyId} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CaseStudyModal caseStudyId={caseStudyId} onClose={closeCaseStudy} />
      </MotionConfig>
    </ThemeProvider>
  )
}
