import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailsRef = useRef([])

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let raf

    // ── Partículas ──────────────────────────────────────────────
    const TRAIL_COUNT = 12
    const trails = []

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = 'cursor-trail'
      el.style.cssText = `
        position:fixed;
        pointer-events:none;
        z-index:99997;
        border-radius:50%;
        transform:translate(-50%,-50%);
        transition:opacity .4s;
      `
      document.body.appendChild(el)
      trails.push({ el, x: mouseX, y: mouseY, life: 0 })
      trailsRef.current.push(el)
    }

    let trailIndex = 0
    let lastTrailX = mouseX
    let lastTrailY = mouseY

    // ── Mouse move ──────────────────────────────────────────────
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot sigue inmediatamente
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      // Partícula cada ~8px de movimiento
      const dx = mouseX - lastTrailX
      const dy = mouseY - lastTrailY
      if (Math.sqrt(dx*dx + dy*dy) > 8) {
        const t = trails[trailIndex % TRAIL_COUNT]
        const size = Math.random() * 5 + 3
        t.el.style.width  = size + 'px'
        t.el.style.height = size + 'px'
        t.el.style.left   = mouseX + 'px'
        t.el.style.top    = mouseY + 'px'
        t.el.style.background = Math.random() > 0.5
          ? 'rgba(110,231,183,0.7)'
          : 'rgba(96,165,250,0.6)'
        t.el.style.opacity = '1'
        t.el.style.boxShadow = `0 0 6px rgba(110,231,183,0.5)`
        setTimeout(() => { t.el.style.opacity = '0' }, 80)
        trailIndex++
        lastTrailX = mouseX
        lastTrailY = mouseY
      }
    }

    // ── Click burst ─────────────────────────────────────────────
    const onClick = (e) => {
      ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px) scale(2)`
      ring.style.opacity = '0'
      setTimeout(() => {
        ring.style.transition = 'none'
        ring.style.opacity = '1'
        ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(1)`
        setTimeout(() => {
          ring.style.transition = 'transform 0.12s ease, opacity 0.12s ease'
        }, 20)
      }, 200)
    }

    // ── Hover en links/buttons ──────────────────────────────────
    const onEnter = () => {
      dot.style.transform  += ' scale(0)'
      ring.style.width  = '50px'
      ring.style.height = '50px'
      ring.style.marginLeft = '-7px'
      ring.style.marginTop  = '-7px'
      ring.style.borderColor = 'var(--accent)'
      ring.style.background  = 'rgba(110,231,183,0.08)'
    }
    const onLeave = () => {
      ring.style.width  = '36px'
      ring.style.height = '36px'
      ring.style.marginLeft = '0'
      ring.style.marginTop  = '0'
      ring.style.borderColor = 'rgba(110,231,183,0.5)'
      ring.style.background  = 'transparent'
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // ── RAF loop para el ring con lag ───────────────────────────
    const loop = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)

    // Ocultar cursor nativo
    document.body.style.cursor = 'none'
    document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
      el.style.cursor = 'none'
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      trails.forEach(t => t.el.remove())
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* Punto central */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#6ee7b7',
          boxShadow: '0 0 8px rgba(110,231,183,0.8)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.05s',
        }}
      />

      {/* Círculo exterior con lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(110,231,183,0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width .2s, height .2s, border-color .2s, background .2s, opacity .12s, transform 0.12s ease',
        }}
      />
    </>
  )
}
