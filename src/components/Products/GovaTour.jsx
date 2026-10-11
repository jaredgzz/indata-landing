import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { getProduct, govaScreens, govaTour, screenSrcSet } from './productsData'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { content } from '../../content'
import './GovaTour.css'

const { products, common } = content
const text = products.gova

/*
 * Gova paso a paso.
 *
 * En escritorio el recorrido se queda fijo mientras se hace scroll: los pasos
 * a la izquierda y, a la derecha, la captura del paso activo de frente y lo
 * más grande posible, para que se lea. Cada paso dura un tramo de scroll
 * (--step-scroll) y también se puede elegir con un clic. En pantallas
 * angostas o bajas cada paso muestra su captura debajo del texto.
 */

// La misma media query que activa la escena fija en GovaTour.css
const PINNED_QUERY = '(min-width: 1180px) and (min-height: 600px)'

const STEPS = govaTour.length
const FADE = { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

const isPortrait = id => govaScreens[id].height > govaScreens[id].width

// Una captura vertical (el documento) flota sobre la pantalla del paso anterior
function backdropOf(id) {
  let i = govaTour.indexOf(id)
  while (i > 0 && isPortrait(govaTour[i])) i--
  return govaTour[i]
}

const screenIds = govaTour.filter(id => !isPortrait(id))
const docIds = govaTour.filter(isPortrait)
// El marco tiene la proporción de las pantallas horizontales
const FRAME = govaScreens[screenIds[0]]
// Alto del documento respecto al marco
const DOC_HEIGHT = 0.92

function ShotImage({ id, className }) {
  const shot = govaScreens[id]
  return (
    <img
      className={className}
      src={shot.src}
      srcSet={screenSrcSet(shot)}
      width={shot.width}
      height={shot.height}
      alt={text.screens[id].alt}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  )
}

// Pantalla a todo el marco; la que sale espera a que la nueva la cubra
function Screen({ id, shown, active }) {
  return (
    <motion.div
      className="tour-visual__screen"
      data-screen={id}
      data-active={active}
      aria-hidden={!shown}
      initial={false}
      animate={shown
        ? { opacity: 1, y: 0, visibility: 'visible' }
        : { opacity: 0, y: 10, transitionEnd: { visibility: 'hidden' } }}
      transition={shown ? FADE : { duration: 0, delay: FADE.duration }}
      style={{ zIndex: shown ? 1 : 0 }}
    >
      <ShotImage id={id} />
    </motion.div>
  )
}

// Documento al frente y centrado, sobre la pantalla atenuada
function Doc({ id, shown }) {
  const shot = govaScreens[id]
  const width = DOC_HEIGHT * (FRAME.height / FRAME.width) * (shot.width / shot.height) * 100
  return (
    <motion.div
      className="tour-visual__doc"
      data-screen={id}
      data-active={shown}
      aria-hidden={!shown}
      initial={false}
      animate={shown
        ? { opacity: 1, y: 0, visibility: 'visible' }
        : { opacity: 0, y: 24, transitionEnd: { visibility: 'hidden' } }}
      transition={FADE}
      style={{
        width: `${width}%`,
        left: `${(100 - width) / 2}%`,
        top: `${((1 - DOC_HEIGHT) / 2) * 100}%`,
        aspectRatio: `${shot.width} / ${shot.height}`,
      }}
    >
      <ShotImage id={id} />
    </motion.div>
  )
}

function TourVisual({ active, frameRef }) {
  const backdrop = backdropOf(active)
  return (
    <div className="tour-visual">
      <div ref={frameRef} className="tour-visual__frame" style={{ '--frame-ratio': FRAME.width / FRAME.height }}>
        {screenIds.map(id => (
          <Screen key={id} id={id} shown={id === backdrop} active={id === active} />
        ))}
        <motion.div
          className="tour-visual__scrim"
          initial={false}
          animate={{ opacity: backdrop === active ? 0 : 1 }}
          transition={FADE}
        />
        {docIds.map(id => <Doc key={id} id={id} shown={id === active} />)}
      </div>
    </div>
  )
}

function TourStep({ id, index, pinned, active, progress, onSelect }) {
  const isActive = pinned && index === active
  // La línea del paso se llena mientras dura su tramo de scroll
  const fill = useTransform(progress, p => Math.min(1, Math.max(0, p * STEPS - index)))
  const step = text.tour.steps[id]
  const label = (
    <>
      <span className="gova-tour__number">{index + 1}</span>
      <span className="gova-tour__title-text">{step.title}</span>
    </>
  )

  return (
    <li className={`gova-tour__step${isActive ? ' is-active' : ''}`}>
      {pinned && <motion.span className="gova-tour__rail" style={{ scaleY: fill }} aria-hidden="true" />}
      <h4 className="gova-tour__title">
        {pinned ? (
          <button
            type="button"
            className="gova-tour__trigger"
            aria-current={isActive ? 'step' : undefined}
            onClick={() => onSelect(index)}
          >
            {label}
          </button>
        ) : label}
      </h4>
      <div className="gova-tour__detail">
        <div className="gova-tour__detail-inner">
          <p className="gova-tour__desc">{step.desc}</p>
        </div>
      </div>
      {!pinned && (
        <ShotImage id={id} className={`gova-tour__shot${isPortrait(id) ? ' gova-tour__shot--portrait' : ''}`} />
      )}
    </li>
  )
}

export default function GovaTour() {
  const pinned = useMediaQuery(PINNED_QUERY)
  const trackRef = useRef(null)
  const pinRef = useRef(null)
  const frameRef = useRef(null)
  // 0 → 1 a lo largo del tramo en que el recorrido está fijo
  const progress = useMotionValue(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!pinned) return
    const track = trackRef.current
    const pin = pinRef.current
    const update = () => {
      const range = track.offsetHeight - pin.offsetHeight
      const offset = pin.getBoundingClientRect().top - track.getBoundingClientRect().top
      const p = range > 0 ? Math.min(1, Math.max(0, offset / range)) : 0
      progress.set(p)
      setActive(Math.min(STEPS - 1, Math.floor(p * STEPS)))
    }
    // Se centra con el alto de la captura, que no cambia al abrir otro paso
    const observer = new ResizeObserver(() => {
      pin.style.setProperty('--pin-height', `${frameRef.current.offsetHeight}px`)
      update()
    })
    observer.observe(pin)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pinned, progress])

  // Lleva el scroll al inicio del tramo del paso
  const select = index => {
    const track = trackRef.current
    const pin = pinRef.current
    const range = track.offsetHeight - pin.offsetHeight
    const start = track.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(pin).top)
    const p = progress.get()
    window.scrollTo({
      top: start + ((index + 0.1) / STEPS) * range,
      // Con el recorrido ya fijo no se mueve nada más: el cambio es inmediato.
      // Si no, el scroll suave del sitio (que respeta el movimiento reducido)
      behavior: p > 0 && p < 1 ? 'instant' : 'auto',
    })
  }

  return (
    <div ref={trackRef} className="gova-tour__track" style={{ '--steps': STEPS }}>
      <div ref={pinRef} className="gova-tour__pin">
        <div className="gova-tour__steps-col">
          <p className="gova-tour__label">{text.tour.title}</p>
          <ol className="gova-tour__steps">
            {govaTour.map((id, i) => (
              <TourStep
                key={id}
                id={id}
                index={i}
                pinned={pinned}
                active={active}
                progress={progress}
                onSelect={select}
              />
            ))}
          </ol>
          <div className="gova-tour__foot">
            <Link to={getProduct('gova').path} className="btn btn--secondary">
              {text.cta}
            </Link>
            <p className="gova-tour__note">{common.screenshotsNote}</p>
          </div>
        </div>
        {pinned && <TourVisual active={govaTour[active]} frameRef={frameRef} />}
      </div>
      {pinned && <div className="gova-tour__spacer" aria-hidden="true" />}
    </div>
  )
}
