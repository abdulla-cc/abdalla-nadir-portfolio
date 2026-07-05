import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Splash } from './components/Splash'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { CtaBanner } from './components/CtaBanner'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'
import { CaseStudyModal } from './components/CaseStudyModal'

export default function App() {
  const [caseStudyId, setCaseStudyId] = useState<string | null>(null)

  return (
    <ThemeProvider>
      <Splash />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenCaseStudy={setCaseStudyId} />
        <CtaBanner />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CaseStudyModal caseStudyId={caseStudyId} onClose={() => setCaseStudyId(null)} />
    </ThemeProvider>
  )
}
