import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { govaScreens, screenSrcSet } from '../Products/productsData'
import { content } from '../../content'
import './ProductStage.css'

/*
 * Capturas reales de Gova en perspectiva (CSS 3D): la captura principal casi
 * de frente, con dos más detrás; al hacer scroll queda de frente y las de
 * atrás se abren.
 *
 * variant="hero":   Inicio al frente (home).
 * variant="detail": la cotización al frente (página de Gova).
 *
 * Cada composición se diseña en un espacio fijo (stage) y se escala al ancho
 * disponible, para que se vea igual en cualquier pantalla.
 */

const PLANE = { width: 1000, height: 740, rotateX: 5, rotateY: -12, rotateZ: 0, scale: 1 }
// Al terminar el scroll
const PLANE_END = { rotateX: 0, rotateY: -4, rotateZ: 0 }

// La misma composición con otras capturas: atrás a la derecha, el documento y al frente.
// `open`: cuánto se abre cada capa de atrás con el scroll
const composition = (back, doc, front) => ({
  stage: { width: 1000, height: 740 },
  plane: PLANE,
  planeEnd: PLANE_END,
  layers: [
    { id: back,  x: 350, y: 30,  z: -180, width: 620, opacity: 0.92, open: { x: 50, y: -30 } },
    { id: doc,   x: 20,  y: 170, z: -110, width: 240, rotate: -6, open: { x: -50, y: 20 } },
    { id: front, x: 100, y: 150, z: 0,    width: 820 },
  ],
})

const LAYOUTS = {
  hero:   composition('ventas', 'documento', 'inicio'),
  detail: composition('catalogo', 'documento', 'cotizacion'),
}

function layerSize(layer) {
  const shot = govaScreens[layer.id]
  return { width: layer.width, height: Math.round((layer.width * shot.height) / shot.width) }
}

// Escala del escenario según el ancho del contenedor
function useStageScale(ref, designWidth) {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / designWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, designWidth])
  return scale
}

// La opacidad va en este último nivel: en una capa con preserve-3d aplanaría el giro
function Screen({ id, eager, opacity = 1 }) {
  const shot = govaScreens[id]
  return (
    <div className="product-stage__screen" style={{ opacity }}>
      <img
        src={shot.src}
        srcSet={screenSrcSet(shot)}
        width={shot.width}
        height={shot.height}
        alt={content.products.gova.screens[id].alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
      />
    </div>
  )
}

// Capa de la composición: las de atrás se abren hacia los lados con el scroll
function OverviewLayer({ layer, progress }) {
  const open = layer.open ?? { x: 0, y: 0 }
  const x = useTransform(progress, [0, 1], [0, open.x])
  const y = useTransform(progress, [0, 1], [0, open.y])
  return (
    <motion.div
      className="product-stage__layer"
      data-screen={layer.id}
      style={{ left: layer.x, top: layer.y, ...layerSize(layer), x, y, z: layer.z, rotateZ: layer.rotate ?? 0 }}
    >
      <Screen id={layer.id} eager opacity={layer.opacity} />
    </motion.div>
  )
}

export default function ProductStage({ variant = 'hero', caption = true, className = '' }) {
  const layout = LAYOUTS[variant]
  const { stage, plane, planeEnd: end } = layout
  const frameRef = useRef(null)
  const scale = useStageScale(frameRef, stage.width)

  // Se mueve con el scroll, nunca con movimiento reducido
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : 1], { clamp: true })
  const rotateX = useTransform(progress, [0, 1], [plane.rotateX, end.rotateX])
  const rotateY = useTransform(progress, [0, 1], [plane.rotateY, end.rotateY])
  const rotateZ = useTransform(progress, [0, 1], [plane.rotateZ, end.rotateZ])

  return (
    <figure className={`product-stage product-stage--${variant}${className ? ` ${className}` : ''}`}>
      <div
        ref={frameRef}
        className="product-stage__frame"
        style={{ aspectRatio: `${stage.width} / ${stage.height}` }}
      >
        <div
          className="product-stage__scaler"
          style={{ width: stage.width, height: stage.height, transform: `scale(${scale})` }}
        >
          <motion.div
            className="product-stage__plane"
            style={{
              width: plane.width,
              height: plane.height,
              marginLeft: -plane.width / 2,
              marginTop: -plane.height / 2,
              rotateX,
              rotateY,
              rotateZ,
              scale: plane.scale,
            }}
          >
            {layout.layers.map(layer => (
              <OverviewLayer key={layer.id} layer={layer} progress={progress} />
            ))}
          </motion.div>
        </div>
      </div>
      {caption && <figcaption className="product-stage__caption">{content.common.screenshotsNote}</figcaption>}
    </figure>
  )
}
