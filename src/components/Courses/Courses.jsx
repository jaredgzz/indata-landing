import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseCard from './CourseCard'
import { coursesData } from './coursesData'
import { content } from '../../content'
import './Courses.css'

const { courses } = content

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
          <SectionHeader
            eyebrow={courses.eyebrow}
            title={courses.title}
            subtitle={courses.subtitle}
            accentColor="var(--color-teal)"
          />
        </div>
        <div ref={gridRef} className="courses__grid">
          {coursesData.map(({ id, ...course }, i) => (
            <div key={id} className={gridVisible ? `animate-in animate-in--delay-${Math.min(i + 1, 5)}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
              <CourseCard {...course} {...courses.items[id]} linkLabel={courses.viewProgram} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
