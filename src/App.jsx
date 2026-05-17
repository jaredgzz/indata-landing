import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Courses from './components/Courses/Courses'
import Projects from './components/Projects/Projects'
import TeamSection from './components/About/TeamSection'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import LangflowDetail from './components/Courses/LangflowDetail'
import AiEngineerDetail from './components/Courses/AiEngineerDetail'
import ClaudeMasteryDetail from './components/Courses/ClaudeMasteryDetail'
import PageTransition from './components/PageTransition'

const SECTIONS = ['inicio', 'servicios', 'cursos', 'proyectos', 'sobre', 'contacto']

// Page-level content only — Nav and Footer are rendered outside AnimatePresence
function HomeContent() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const observers = SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      {/* activeSection is forwarded up to AppRoutes via a ref-like callback,
          but since IntersectionObserver state lives here, we pass it down
          through context or keep Nav colocated. For now Nav is in AppRoutes
          and receives a static empty string for non-home routes; home scroll
          highlighting requires Nav inside HomeContent. We keep Nav here only
          for the home page so intersection observers can control activeSection. */}
      <Nav activeSection={activeSection} />
      <Hero />
      <Services />
      <Courses />
      <Projects />
      <TeamSection />
      <ContactCTA />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {/* Nav lives outside AnimatePresence on non-home routes so it doesn't fade */}
      {!isHome && <Nav activeSection="" />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomeContent />
              </PageTransition>
            }
          />
          <Route
            path="/cursos/langflow"
            element={
              <PageTransition>
                <LangflowDetail />
              </PageTransition>
            }
          />
          <Route
            path="/cursos/ai-engineer"
            element={
              <PageTransition>
                <AiEngineerDetail />
              </PageTransition>
            }
          />
          <Route
            path="/cursos/mastering-claude"
            element={
              <PageTransition>
                <ClaudeMasteryDetail />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}
