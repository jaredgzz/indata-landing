import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import './CourseLeadModal.css'

const INITIAL_FORM = { nombre: '', email: '', empresa: '', phone: '' }

export default function CourseLeadModal({ isOpen, onClose, courseName, tag, pdfPath, pdfFileName }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm(INITIAL_FORM)
      setStatus('idle')
    }
  }, [isOpen])

  if (!isOpen) return null

  function triggerDownload() {
    const a = document.createElement('a')
    a.href = pdfPath
    a.download = pdfFileName
    a.click()
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email) return
    setStatus('sending')

    // NOTE: the `tag` column may not exist yet in the Supabase `leads` table.
    // If you get a "column tag does not exist" error, run this migration:
    //   ALTER TABLE leads ADD COLUMN tag TEXT;
    // Until then, we fall back to using `service` to store the tag value.
    const { error } = await supabase
      .from('leads')
      .insert([{
        full_name: form.nombre,
        email:     form.email,
        company:   form.empresa || null,
        phone:     form.phone   || null,
        state:     'nuevo',
        tag:       tag,
      }])

    if (error) {
      const isUnknownColumn =
        error.message?.includes('tag') ||
        error.code === '42703'

      if (isUnknownColumn) {
        // Fallback: `tag` column not yet created — store value in `service` instead
        await supabase
          .from('leads')
          .insert([{
            full_name: form.nombre,
            email:     form.email,
            company:   form.empresa || null,
            phone:     form.phone   || null,
            state:     'nuevo',
            service:   tag,
          }])
      } else {
        console.error('Supabase error:', error)
      }
    }

    // Always trigger download regardless of Supabase result — never block the user
    triggerDownload()
    setStatus(error ? 'error' : 'success')
  }

  return (
    <div
      className="llf-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="llf-title"
      onClick={onClose}
    >
      <div
        className="llf-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="llf-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2 2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="llf-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <line x1="8" y1="9" x2="10" y2="9" />
          </svg>
        </div>

        <h2 id="llf-title" className="llf-title">
          Descarga el Programa: {courseName}
        </h2>
        <p className="llf-subtitle">
          Dejanos tu info y te enviamos el PDF con el programa completo del curso.
        </p>

        {status === 'success' ? (
          <div className="llf-success">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="llf-success__text">
              La descarga inicio automaticamente.
            </p>
          </div>
        ) : (
          <form className="llf-form" onSubmit={handleSubmit} noValidate>
            <div className="llf-field">
              <label className="llf-label" htmlFor="llf-nombre">
                Nombre <span className="llf-required">*</span>
              </label>
              <input
                id="llf-nombre"
                name="nombre"
                type="text"
                className="llf-input"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
                autoComplete="name"
              />
            </div>

            <div className="llf-field">
              <label className="llf-label" htmlFor="llf-email">
                Email <span className="llf-required">*</span>
              </label>
              <input
                id="llf-email"
                name="email"
                type="email"
                className="llf-input"
                placeholder="tu@empresa.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
                autoComplete="email"
              />
            </div>

            <div className="llf-field">
              <label className="llf-label" htmlFor="llf-empresa">
                Empresa <span className="llf-optional">(opcional)</span>
              </label>
              <input
                id="llf-empresa"
                name="empresa"
                type="text"
                className="llf-input"
                placeholder="Nombre de tu empresa"
                value={form.empresa}
                onChange={handleChange}
                disabled={status === 'sending'}
                autoComplete="organization"
              />
            </div>

            <div className="llf-field">
              <label className="llf-label" htmlFor="llf-phone">
                Telefono <span className="llf-optional">(opcional)</span>
              </label>
              <input
                id="llf-phone"
                name="phone"
                type="tel"
                className="llf-input"
                placeholder="+52 81 2567 0127"
                value={form.phone}
                onChange={handleChange}
                disabled={status === 'sending'}
                autoComplete="tel"
              />
            </div>

            {status === 'error' && (
              <p className="llf-error-msg">
                Hubo un error al guardar tus datos, pero el PDF se descargo de todas formas.
              </p>
            )}

            <button
              type="submit"
              className="llf-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="llf-spinner" aria-hidden="true" />
                  Descargando...
                </>
              ) : (
                'Descargar PDF →'
              )}
            </button>

            <p className="llf-privacy">
              Tu informacion esta segura. Sin spam.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
