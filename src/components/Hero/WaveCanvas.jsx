import { useEffect, useRef } from 'react'

export default function WaveCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H, t = 0

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      r: Math.random() * 1.8 + 0.4,
      color: ['#2563EB', '#00D1B2', '#7C3AED', '#60A5FA'][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.8 + 0.2,
    }))

    const drawWave = (yBase, amplitude, freq, speed, colorStops, glowColor, glowAlpha, lineWidth) => {
      ctx.beginPath()
      const pts = []
      for (let x = 0; x <= W; x += 3) {
        const y = yBase
          + Math.sin(x * freq + t * speed) * amplitude
          + Math.sin(x * freq * 0.6 + t * speed * 0.8 + 1) * amplitude * 0.45
          + Math.sin(x * freq * 0.3 + t * speed * 1.3 + 2) * amplitude * 0.25
        pts.push([x, y])
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }

      ctx.shadowColor = glowColor
      ctx.shadowBlur = 18
      ctx.strokeStyle = glowColor
      ctx.lineWidth = lineWidth + 4
      ctx.globalAlpha = glowAlpha
      ctx.stroke()

      ctx.beginPath()
      pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      colorStops.forEach(([stop, color]) => grad.addColorStop(stop, color))
      ctx.strokeStyle = grad
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      ctx.stroke()

      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
      const fillGrad = ctx.createLinearGradient(0, yBase - amplitude, 0, H)
      fillGrad.addColorStop(0, glowColor.replace(/,\s*[\d.]+\)$/, ',0.10)'))
      fillGrad.addColorStop(1, 'rgba(8,12,24,0)')
      ctx.fillStyle = fillGrad
      ctx.globalAlpha = 0.6
      ctx.fill()
      ctx.globalAlpha = 1

      return pts
    }

    const drawVerticalRays = (pts, color, peakThreshold) => {
      pts.forEach(([x, y]) => {
        if (y < peakThreshold) {
          const rayH = (peakThreshold - y) * 2.5
          const rayGrad = ctx.createLinearGradient(x, y - rayH, x, y)
          rayGrad.addColorStop(0, 'rgba(255,255,255,0)')
          rayGrad.addColorStop(0.3, color.replace('1)', '0.6)'))
          rayGrad.addColorStop(1, color)
          ctx.beginPath()
          ctx.moveTo(x, y - rayH)
          ctx.lineTo(x, y)
          ctx.strokeStyle = rayGrad
          ctx.lineWidth = 0.8
          ctx.globalAlpha = 0.7
          ctx.shadowColor = color.replace('1)', '0.8)')
          ctx.shadowBlur = 6
          ctx.stroke()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
          ctx.beginPath()
          ctx.arc(x, y - rayH, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = '#fff'
          ctx.globalAlpha = 0.6
          ctx.fill()
          ctx.globalAlpha = 1
        }
      })
    }

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, W, H)

      const bgGrad = ctx.createRadialGradient(W * 0.7, H * 0.4, 0, W * 0.7, H * 0.4, W * 0.7)
      bgGrad.addColorStop(0, 'rgba(15,28,60,0.6)')
      bgGrad.addColorStop(0.5, 'rgba(10,16,38,0.3)')
      bgGrad.addColorStop(1, 'rgba(8,12,24,0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      const yBase = H * 0.62

      ctx.save()
      const pts3 = drawWave(yBase + 20, 55, 0.007, 0.5,
        [[0, 'rgba(100,40,200,0.7)'], [0.5, 'rgba(124,58,237,0.9)'], [1, 'rgba(80,20,180,0.7)']],
        'rgba(124,58,237,1)', 0.12, 2)
      drawVerticalRays(pts3.filter((_, i) => i % 9 === 0), 'rgba(124,58,237,1)', yBase - 10)
      ctx.restore()

      ctx.save()
      const pts2 = drawWave(yBase - 10, 70, 0.009, 0.7,
        [[0, 'rgba(37,99,235,0.8)'], [0.4, 'rgba(60,130,255,1)'], [1, 'rgba(37,99,235,0.7)']],
        'rgba(37,99,235,1)', 0.15, 2.5)
      drawVerticalRays(pts2.filter((_, i) => i % 7 === 0), 'rgba(96,165,250,1)', yBase - 20)
      ctx.restore()

      ctx.save()
      const pts1 = drawWave(yBase - 35, 50, 0.011, 0.9,
        [[0, 'rgba(0,180,160,0.9)'], [0.3, 'rgba(0,230,200,1)'], [0.7, 'rgba(120,220,255,1)'], [1, 'rgba(0,180,160,0.8)']],
        'rgba(0,220,190,1)', 0.2, 3)
      drawVerticalRays(pts1.filter((_, i) => i % 5 === 0), 'rgba(0,230,200,1)', yBase - 60)
      ctx.restore()

      ctx.shadowBlur = 0
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * 0.7
        ctx.fill()
        ctx.globalAlpha = 1
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * W
          const dy = (particles[i].y - particles[j].y) * H
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x * W, particles[i].y * H)
            ctx.lineTo(particles[j].x * W, particles[j].y * H)
            ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - dist / 70)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
