import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import { leadInterests, isLeadInterest, leadInterestValue } from '../../lib/leadOptions'
import SectionHeader from '../SectionHeader/SectionHeader'
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

// Un envío más rápido que esto, desde que se mostró el formulario, es de un bot
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
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
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

    // Antispam: si se llenó el campo trampa o el envío fue casi instantáneo,
    // no se envía nada y se muestra el mismo error genérico que un fallo real.
    if (form.hp_field || Date.now() - shownAt.current < MIN_FILL_MS) {
      return fail(contact.errors.send)
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

    let error
    try {
      ({ error } = await supabase.from('leads').insert([payload]))
    } catch (err) {
      error = err
    }

    if (error) {
      // Solo se confirma el envío si Supabase lo guardó
      console.error('Supabase error:', error)
      fail(contact.errors.send)
    } else {
      setStatus('success')
      setForm(INITIAL_FORM)
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contacto" className="contact-cta">
      <div ref={ref} className={`contact-cta__inner${visible ? ' animate-in' : ''}`}>

        <div className="contact-cta__header">
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            subtitle={contact.subtitle}
            accentColor="var(--color-teal)"
          />
        </div>

        {status === 'success' ? (
          <div className="contact-cta__success" role="status">
            <div className="contact-cta__success-icon">
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="contact-cta__success-title">{contact.success.title}</h3>
            <p className="contact-cta__success-text">{contact.success.text}</p>
            <button
              className="contact-cta__success-reset"
              onClick={() => setStatus('idle')}
            >
              {contact.success.reset}
            </button>
          </div>
        ) : (
          <form className="contact-cta__form" onSubmit={handleSubmit} noValidate>
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

            <button
              type="submit"
              className="contact-cta__submit"
              disabled={sending}
            >
              {sending ? (
                <>
                  <span className="contact-cta__spinner" aria-hidden="true" />
                  {contact.sending}
                </>
              ) : (
                <>{contact.submit} <span aria-hidden="true">→</span></>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
