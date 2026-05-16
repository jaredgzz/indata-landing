import { useAnimateIn } from '../../hooks/useAnimateIn'
import CourseCard from './CourseCard'
import { coursesData } from './coursesData'
import './Courses.css'

export default function Courses() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn()

  return (
    <section id="cursos" className="courses">
      <div className="courses__inner">
        <div
          ref={headerRef}
          className={`courses__header${headerVisible ? ' animate-in' : ''}`}
        >
          <div className="courses__eyebrow">CURSOS</div>
          <h2 className="courses__title">Aprende las habilidades del futuro</h2>
          <p className="courses__subtitle">
            Cursos prácticos y aplicados para que puedas implementar tecnología moderna en tu trabajo y negocio.
          </p>
        </div>
        <div ref={gridRef} className="courses__grid">
          {coursesData.map((c, i) => (
            <div key={c.title} className={gridVisible ? `animate-in animate-in--delay-${Math.min(i + 1, 5)}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
              <CourseCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
