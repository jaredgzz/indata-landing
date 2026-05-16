import { useState, useEffect } from 'react'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Courses from './components/Courses/Courses'
import Projects from './components/Projects/Projects'
import About from './components/About/About'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'

const SECTIONS = ['inicio', 'servicios', 'cursos', 'proyectos', 'sobre', 'contacto']

export default function App() {
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
