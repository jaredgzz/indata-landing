import { contactInfo } from '../../lib/contactInfo'
import { content } from '../../content'
import './Privacy.css'

const { privacy } = content

/** Párrafo con {email} convertido en enlace mailto */
function Paragraph({ text }) {
  const [before, after] = text.split('{email}')
  if (after === undefined) return <p>{text}</p>
  return (
    <p>
      {before}
      <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
      {after}
    </p>
  )
}

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page__inner">
        <h1 className="privacy-page__title">{privacy.title}</h1>
        <p className="privacy-page__updated">{privacy.updated}</p>
        <p className="privacy-page__intro">{privacy.intro}</p>

        {privacy.sections.map(({ title, items, paragraphs }) => (
          <section key={title} className="privacy-page__section">
            <h2 className="privacy-page__heading">{title}</h2>
            {items && (
              <ul className="privacy-page__list">
                {items.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
            {paragraphs?.map(text => <Paragraph key={text} text={text} />)}
          </section>
        ))}
      </div>
    </main>
  )
}
