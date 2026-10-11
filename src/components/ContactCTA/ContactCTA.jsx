import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { saveLead, leadsAreLive } from '../../lib/leads'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import { leadInterests, isLeadInterest, leadInterestValue } from '../../lib/leadOptions'
import SectionHeader from '../SectionHeader/SectionHeader'
import Icon from '../Icon/Icon'
import { contactInfo } from '../../lib/contactInfo'
import { content } from '../../content'
import './ContactCTA.css'

const { contact } = content
const { fields } = contact

const INITIAL_FORM = {
  nombre: '',
  email: '',
  empresa: '',
  phone: '',
  interes: '',
  mensaje: '',
  hp_field: '', // campo trampa (antispam)
}

// Un envío más rápido que esto, desde que se mostró el formulario, es sospechoso:
// no se rechaza, solo se pide confirmar (el campo trampa es la señal fuerte)
const MIN_FILL_MS = 3000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactCTA() {
  const [ref, visible] = useAnimateIn()
  const [searchParams] = useSearchParams()
  // ?interes=<id> preselecciona la opción (desde las páginas de producto)
  const [form, setForm] = useState(() => {
    const interes = searchParams.get('interes')
    return { ...INITIAL_FORM, interes: isLeadInterest(interes) ? interes : '' }
  })
  const [status, setStatus] = useState('idle') // idle | confirm | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [simulated, setSimulated] = useState(false) // vista previa: no se guardó nada
  const shownAt = useRef(0)

  useEffect(() => {
    shownAt.current = Date.now()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const fail = (message) => {
    setStatus('error')
    setErrorMsg(message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nombre = form.nombre.trim()
    const email = form.email.trim()
    const mensaje = form.mensaje.trim()

    if (!nombre || !email || !mensaje) return fail(contact.errors.required)
    if (!EMAIL_RE.test(email)) return fail(contact.errors.email)

    // Antispam: con el campo trampa lleno no se envía nada y se muestra
    // el mismo error genérico que un fallo real.
    if (form.hp_field) return fail(contact.errors.send)

    // Un envío casi instantáneo no se rechaza: se pide confirmarlo
    if (status !== 'confirm' && Date.now() - shownAt.current < MIN_FILL_MS) {
      setStatus('confirm')
      setErrorMsg('')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    const payload = {
      full_name: nombre,
      email,
      company:   form.empresa.trim() || null,
      phone:     form.phone.trim() || null,
      service:   leadInterestValue(form.interes),
      message:   mensaje,
      state:     'nuevo',
    }

    const { error, simulated: wasSimulated } = await saveLead(payload)

    if (error) {
      // Solo se confirma el envío si Supabase lo guardó
      console.error('Supabase error:', error)
      fail(contact.errors.send)
    } else {
      setSimulated(wasSimulated)
      setStatus('success')
      setForm(INITIAL_FORM)
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contacto" className="contact-cta">
      <div ref={ref} className={`contact-cta__inner${visible ? ' animate-in' : ''}`}>

        <div className="contact-cta__intro">
          <SectionHeader
            title={contact.title}
            subtitle={contact.subtitle}
            className="contact-cta__header"
          />
          <div className="contact-cta__direct">
            <p className="contact-cta__direct-title">{contact.direct.title}</p>
            <ul className="contact-cta__direct-list">
              <li>
                <span className="contact-cta__direct-label">{contact.direct.whatsapp}</span>
                <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <span className="contact-cta__direct-label">{contact.direct.email}</span>
                <a href={`mailto:${contactInfo.email}`} className="text-link">{contactInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {status === 'success' ? (
          <div className="contact-cta__success" role="status">
            <div className="contact-cta__success-icon">
              <Icon name="check" size={26} strokeWidth={2.25} />
            </div>
            <h3 className="contact-cta__success-title">
              {simulated ? contact.preview.successTitle : contact.success.title}
            </h3>
            <p className="contact-cta__success-text">
              {simulated ? contact.preview.successText : contact.success.text}
            </p>
            <button
              className="btn btn--secondary btn--sm"
              onClick={() => setStatus('idle')}
            >
              {contact.success.reset}
            </button>
          </div>
        ) : (
          <form className="contact-cta__form" onSubmit={handleSubmit} noValidate>
            {!leadsAreLive && (
              <p className="contact-cta__preview">{contact.preview.notice}</p>
            )}

            <div className="contact-cta__form-row">
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="nombre">
                  {fields.name.label} <span className="contact-cta__required" aria-hidden="true">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="contact-cta__input"
                  placeholder={fields.name.placeholder}
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  maxLength={120}
                  autoComplete="name"
                  disabled={sending}
                />
              </div>
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="email">
                  {fields.email.label} <span className="contact-cta__required" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-cta__input"
                  placeholder={fields.email.placeholder}
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  autoComplete="email"
                  disabled={sending}
                />
              </div>
            </div>

            <div className="contact-cta__form-row">
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="empresa">
                  {fields.company.label}
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  className="contact-cta__input"
                  placeholder={fields.company.placeholder}
                  value={form.empresa}
                  onChange={handleChange}
                  maxLength={160}
                  autoComplete="organization"
                  disabled={sending}
                />
              </div>
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="phone">
                  {fields.phone.label}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="contact-cta__input"
                  placeholder={fields.phone.placeholder}
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={30}
                  autoComplete="tel"
                  disabled={sending}
                />
              </div>
            </div>

            <div className="contact-cta__field">
              <label className="contact-cta__label" htmlFor="interes">
                {fields.interest.label}
              </label>
              <select
                id="interes"
                name="interes"
                className="contact-cta__select"
                value={form.interes}
                onChange={handleChange}
                disabled={sending}
              >
                <option value="">{fields.interest.placeholder}</option>
                {leadInterests.map(({ id }) => (
                  <option key={id} value={id}>{contact.options[id]}</option>
                ))}
              </select>
            </div>

            <div className="contact-cta__field">
              <label className="contact-cta__label" htmlFor="mensaje">
                {fields.message.label} <span className="contact-cta__required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="contact-cta__textarea"
                placeholder={fields.message.placeholder}
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
                required
                maxLength={3000}
                disabled={sending}
              />
            </div>

            {/* Campo trampa: invisible para personas, los bots suelen llenarlo */}
            <div className="contact-cta__trap" aria-hidden="true">
              <label htmlFor="hp_field">{fields.trap}</label>
              <input
                id="hp_field"
                name="hp_field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.hp_field}
                onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <p className="contact-cta__error" role="alert">{errorMsg}</p>
            )}

            {status === 'confirm' && (
              <p className="contact-cta__confirm" role="status">{contact.confirm.notice}</p>
            )}

            <button
              type="submit"
              className="btn btn--primary contact-cta__submit"
              disabled={sending}
            >
              {sending ? (
                <>
                  <span className="contact-cta__spinner" aria-hidden="true" />
                  {contact.sending}
                </>
              ) : (
                <>
                  {status === 'confirm' ? contact.confirm.submit : contact.submit}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
