import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import './ContactCTA.css'

const SERVICIOS = [
  'Inteligencia Artificial',
  'Ingeniería de Datos',
  'Automatización de Procesos',
  'Dashboards y BI',
  'Desarrollo de Software',
  'Agentes IA Empresariales',
  'Cursos / Academia',
  'Otro',
]

const INITIAL_FORM = {
  nombre: '',
  email: '',
  empresa: '',
  phone: '',
  servicio: '',
  mensaje: '',
}

export default function ContactCTA() {
  const [ref, visible] = useAnimateIn()
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) return
    setStatus('sending')
    setErrorMsg('')

    const payload = {
      full_name: form.nombre,
      email:     form.email,
      company:   form.empresa || null,
      phone:     form.phone   || null,
      service:   form.servicio || null,
      message:   form.mensaje,
      state:     'nuevo',
    }

    const { error } = await supabase.from('leads').insert([payload])

    if (error) {
      console.error('Supabase error:', error)
      setStatus('error')
      setErrorMsg(`Error: ${error.message || error.code || JSON.stringify(error)}`)
    } else {
      setStatus('success')
      setForm(INITIAL_FORM)
    }
  }

  return (
    <section id="contacto" className="contact-cta">
      <div ref={ref} className={`contact-cta__inner${visible ? ' animate-in' : ''}`}>

        <div className="contact-cta__header">
          <SectionHeader
            eyebrow="CONTACTO"
            title="¿Listo para transformar tus datos?"
            subtitle="Conversemos sobre cómo podemos ayudar a tu empresa a crecer con datos, IA y automatización."
            accentColor="var(--color-teal)"
          />
        </div>

        {status === 'success' ? (
          <div className="contact-cta__success">
            <div className="contact-cta__success-icon">
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="contact-cta__success-title">¡Mensaje enviado!</h3>
            <p className="contact-cta__success-text">
              Gracias por contactarnos. Te responderemos en menos de 24 horas.
            </p>
            <button
              className="contact-cta__success-reset"
              onClick={() => setStatus('idle')}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form className="contact-cta__form" onSubmit={handleSubmit} noValidate>
            <div className="contact-cta__form-row">
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="nombre">
                  Nombre <span className="contact-cta__required">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="contact-cta__input"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="email">
                  Email <span className="contact-cta__required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-cta__input"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                />
              </div>
            </div>

            <div className="contact-cta__form-row">
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="empresa">
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  className="contact-cta__input"
                  placeholder="Nombre de tu empresa (opcional)"
                  value={form.empresa}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                />
              </div>
              <div className="contact-cta__field">
                <label className="contact-cta__label" htmlFor="servicio">
                  ¿Qué te interesa?
                </label>
                <select
                  id="servicio"
                  name="servicio"
                  className="contact-cta__select"
                  value={form.servicio}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICIOS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-cta__field">
              <label className="contact-cta__label" htmlFor="phone">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="contact-cta__input"
                placeholder="+52 81 2567 0127 (opcional)"
                value={form.phone}
                onChange={handleChange}
                disabled={status === 'sending'}
                autoComplete="tel"
              />
            </div>

            <div className="contact-cta__field">
              <label className="contact-cta__label" htmlFor="mensaje">
                Mensaje <span className="contact-cta__required">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="contact-cta__textarea"
                placeholder="Cuéntanos sobre tu proyecto, reto o pregunta..."
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && (
              <p className="contact-cta__error">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="contact-cta__submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="contact-cta__spinner" />
                  Enviando...
                </>
              ) : (
                'Enviar mensaje →'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
