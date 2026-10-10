import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Problems from './components/Problems/Problems'
import Products from './components/Products/Products'
import Services from './components/Services/Services'
import Process from './components/Process/Process'
import About from './components/About/About'
import OpenTeaser from './components/Open/OpenTeaser'
import ContactCTA from './components/ContactCTA/ContactCTA'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import NotFound from './components/NotFound/NotFound'
import { homeSections, legacyHashes } from './lib/data'
import { content } from './content'

// Detail pages — lazy loaded to keep the home bundle small
const ProductDetail       = lazy(() => import('./components/Products/ProductDetail'))
const OpenPage            = lazy(() => import('./components/Open/OpenPage'))

// Tab title per known route; anything else renders the 404 page
const PAGE_TITLES = {
  '/':                        content.pages.home,
  '/productos/gova':          content.pages.gova,
  '/productos/miga':          content.pages.miga,
  '/open':                    content.pages.open,
}

// Page-level content only — Nav and Footer are rendered outside AnimatePresence
function HomeContent() {
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()
  const navigate = useNavigate()

  // Old anchors (#servicios, #cursos, …) → new location
  useEffect(() => {
    const target = legacyHashes[location.hash]
    if (target) navigate(target, { replace: true })
  }, [location.hash, navigate])

  // The active section is the one crossing the middle of the viewport
  // (works for sections taller than the screen, unlike a ratio threshold)
  useEffect(() => {
    const observers = homeSections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-50% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      {/* Nav lives here on the home so the section observers can drive activeSection */}
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <Problems />
        <Products />
        <Services />
        <Process />
        <About />
        <OpenTeaser />
        <ContactCTA />
      </main>
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/'
    document.title = PAGE_TITLES[path] ?? content.pages.notFound
  }, [location.pathname])

  return (
    <>
      {/* Nav lives outside AnimatePresence on non-home routes so it doesn't fade */}
      {!isHome && <Nav activeSection="" />}

      <AnimatePresence mode="wait">
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
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
              path="/productos/:slug"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
            />
            <Route
              path="/open"
              element={
                <PageTransition>
                  <OpenPage />
                </PageTransition>
              }
            />
            {/* Unknown routes: 404 page (old home anchors are redirected in HomeContent).
                /cursos/* also lands here until the programs are updated. */}
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <AppRoutes />
      </MotionConfig>
    </BrowserRouter>
  )
}
