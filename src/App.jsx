import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Courses from './components/Courses/Courses'
import Projects from './components/Projects/Projects'
import About from './components/About/About'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import LangflowDetail from './components/Courses/LangflowDetail'

const SECTIONS = ['inicio', 'servicios', 'cursos', 'proyectos', 'sobre', 'contacto']

function HomePage() {
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
      <Nav activeSection={activeSection} />
      <Hero />
      <Services />
      <Courses />
      <Projects />
      <About />
      <ContactCTA />
      <Footer />
    </>
  )
}

function CourseDetailLayout() {
  return (
    <>
      <Nav activeSection="" />
      <LangflowDetail />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursos/langflow" element={<CourseDetailLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
