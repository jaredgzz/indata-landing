import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { govaScreens } from '../Products/productsData'
import { content } from '../../content'
import './ProductStage.css'

/*
 * Capturas reales de Gova sobre una superficie en perspectiva (CSS 3D).
 *
 * variant="hero": vista general; al hacer scroll el plano se endereza y las
 *                 capas se separan.
 * variant="tour": la captura `active` se levanta de la superficie y queda de
 *                 frente; las demás se quedan atrás, atenuadas.
 *
 * Cada composición se diseña en un espacio fijo (stage) y se escala al ancho
 * disponible, para que se vea igual en cualquier pantalla. `height` acorta ese
 * espacio cuando la captura activa no necesita todo el alto (p. ej. no es el
 * documento vertical).
 */

const SCREEN_W = 560
const DOC_W = 240

const LAYOUTS = {
  hero: {
    stage: { width: 1400, height: 640 },
    plane: { width: 1240, height: 760, rotateX: 52, rotateZ: -20, scale: 0.92 },
    // Al terminar el scroll del hero; `y` compensa que el plano sube al enderezarse
    planeEnd: { rotateX: 42, rotateZ: -13, y: 70 },
    spread: 2.2,
    layers: [
      { id: 'ventas',     x: 0,   y: 60,  z: 0 },
      { id: 'catalogo',   x: 170, y: 170, z: 34 },
      { id: 'cotizacion', x: 340, y: 280, z: 68 },
      { id: 'inicio',     x: 510, y: 390, z: 102 },
      { id: 'documento',  x: 980, y: 40,  z: 60, doc: true },
    ],
  },
  tour: {
    stage: { width: 1000, height: 860 },
    plane: { width: 980, height: 700, rotateX: 56, rotateZ: -24, scale: 0.8 },
    // La captura activa sube, se agranda y gira para quedar de frente
    // (con `tilt` grados de inclinación, para que no se vea plana)
    // `shift` mueve la captura activa (px de pantalla) para que se vea la pila de atrás
    lift: { z: 320, tilt: 6, scale: 1.2, docScale: 1.75, shift: { x: 150, y: -170 } },
    layers: [
      { id: 'catalogo',   x: 0,   y: 80,  z: 0 },
      { id: 'cotizacion', x: 150, y: 200, z: 30 },
      { id: 'inicio',     x: 300, y: 320, z: 60 },
      { id: 'documento',  x: 720, y: 0,   z: 40, doc: true },
    ],
  },
}

const TOUR_TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] }

const rad = deg => (deg * Math.PI) / 180

/*
 * Desplazamiento sobre el plano para una capa levantada `z`: compensa la
 * subida y la deja `shift` px (de pantalla) lejos del centro del escenario.
 */
function liftOffset(plane, z, shift) {
  const a = rad(-plane.rotateZ)
  const b = rad(plane.rotateX)
  const dy = (Math.cos(a) * (shift.y + z * Math.sin(b) + Math.cos(b) * Math.tan(a) * shift.x)) / Math.cos(b)
  return { dx: (shift.x - Math.sin(a) * dy) / Math.cos(a), dy }
}

function layerSize(layer) {
  const shot = govaScreens[layer.id]
  const width = layer.doc ? DOC_W : SCREEN_W
  return { width, height: Math.round((width * shot.height) / shot.width) }
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
function Screen({ id, eager, dimmed = false }) {
  const shot = govaScreens[id]
  return (
    <motion.div
      className="product-stage__screen"
      initial={false}
      animate={{ opacity: dimmed ? 0.5 : 1 }}
      transition={TOUR_TRANSITION}
    >
      <img
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={content.products.gova.screens[id].alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
      />
    </motion.div>
  )
}

// Capa de la vista general: su altura (z) crece con el scroll
function OverviewLayer({ layer, progress, spread, eager }) {
  const z = useTransform(progress, [0, 1], [layer.z, layer.z * spread])
  return (
    <motion.div
      className="product-stage__layer"
      data-screen={layer.id}
      style={{ left: layer.x, top: layer.y, ...layerSize(layer), z }}
    >
      <Screen id={layer.id} eager={eager} />
    </motion.div>
  )
}

// Capa del recorrido: la activa se levanta hacia el centro y gira de frente
function TourLayer({ layer, layout, active }) {
  const isActive = layer.id === active
  const size = layerSize(layer)
  const { plane, lift } = layout
  const { dx, dy } = liftOffset(plane, lift.z, lift.shift)
  const raised = {
    x: plane.width / 2 - (layer.x + size.width / 2) + dx,
    y: plane.height / 2 - (layer.y + size.height / 2) + dy,
    z: lift.z,
    scale: layer.doc ? lift.docScale : lift.scale,
  }

  return (
    <motion.div
      className={`product-stage__layer${isActive ? ' is-active' : ''}`}
      data-screen={layer.id}
      data-active={isActive}
      style={{ left: layer.x, top: layer.y, ...size }}
      initial={false}
      animate={isActive ? raised : { x: 0, y: 0, z: layer.z, scale: 1 }}
      transition={TOUR_TRANSITION}
    >
      {/* Giro inverso al del plano, en dos pasos para conservar el orden de los ejes */}
      <motion.div
        className="product-stage__turn"
        initial={false}
        animate={{ rotateZ: isActive ? -plane.rotateZ : 0 }}
        transition={TOUR_TRANSITION}
      >
        <motion.div
          className="product-stage__turn"
          initial={false}
          animate={{ rotateX: isActive ? -(plane.rotateX - lift.tilt) : 0 }}
          transition={TOUR_TRANSITION}
        >
          <Screen id={layer.id} dimmed={active !== null && !isActive} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductStage({ variant = 'hero', active = null, height, caption = true, className = '' }) {
  const layout = LAYOUTS[variant]
  const { plane } = layout
  const stage = { ...layout.stage, height: height ?? layout.stage.height }
  const frameRef = useRef(null)
  const scale = useStageScale(frameRef, stage.width)

  // Solo la vista del hero se mueve con el scroll (y nunca con movimiento reducido)
  const reduceMotion = useReducedMotion()
  const moving = variant === 'hero' && !reduceMotion
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, 600], [0, moving ? 1 : 0], { clamp: true })
  const end = layout.planeEnd ?? plane
  const rotateX = useTransform(progress, [0, 1], [plane.rotateX, end.rotateX])
  const rotateZ = useTransform(progress, [0, 1], [plane.rotateZ, end.rotateZ])
  const planeY = useTransform(progress, [0, 1], [0, end.y ?? 0])

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
              y: planeY,
              rotateX,
              rotateZ,
              scale: plane.scale,
            }}
          >
            {variant === 'tour'
              ? layout.layers.map(layer => (
                <TourLayer key={layer.id} layer={layer} layout={layout} active={active} />
              ))
              : layout.layers.map((layer, i) => (
                <OverviewLayer
                  key={layer.id}
                  layer={layer}
                  progress={progress}
                  spread={layout.spread}
                  eager={i >= layout.layers.length - 2}
                />
              ))}
          </motion.div>
        </div>
      </div>
      {caption && <figcaption className="product-stage__caption">{content.common.screenshotsNote}</figcaption>}
    </figure>
  )
}
