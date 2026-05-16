import { useAnimateIn } from '../../hooks/useAnimateIn'
import ProjectCard from './ProjectCard'
import { projectsData } from './projectsData'
import './Projects.css'

export default function Projects() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn()

  return (
    <section id="proyectos" className="projects">
      <div
        ref={headerRef}
        className={`projects__header${headerVisible ? ' animate-in' : ''}`}
      >
        <div className="projects__eyebrow">PROYECTOS</div>
        <h2 className="projects__title">Casos reales, resultados reales</h2>
        <p className="projects__subtitle">
          Algunos ejemplos de soluciones que generan impacto para los negocios con datos e inteligencia.
        </p>
      </div>
      <div ref={gridRef}>
        <div className="projects__grid-top">
          {projectsData.slice(0, 3).map((p, i) => (
            <div key={p.title} className={gridVisible ? `animate-in animate-in--delay-${i + 1}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
        <div className="projects__grid-bottom">
          {projectsData.slice(3).map((p, i) => (
            <div key={p.title} className={gridVisible ? `animate-in animate-in--delay-${i + 2}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
