import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './CustomCursor.module.css'

/**
 * Advanced.team–style cursor: dot + optional label on hover (`data-cursor-text`).
 */
export function CustomCursor() {
  const dotRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const enabled = mqFine.matches && !mqReduce.matches

    if (!enabled) {
      document.body.classList.remove('hide-cursor')
      return undefined
    }

    document.body.classList.add('hide-cursor')

    const dot = dotRef.current
    const lbl = labelRef.current
    if (!dot || !lbl) return undefined

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' })
    const lxTo = gsap.quickTo(lbl, 'x', { duration: 0.35, ease: 'power3.out' })
    const lyTo = gsap.quickTo(lbl, 'y', { duration: 0.35, ease: 'power3.out' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      lxTo(e.clientX + 20)
      lyTo(e.clientY + 20)
    }

    const onOver = (e) => {
      const t = e.target.closest?.('[data-cursor-text]')
      if (t) {
        setLabel(t.getAttribute('data-cursor-text') || '')
        gsap.to(dot, { scale: 4, duration: 0.25, ease: 'power2.out' })
      }
    }

    const onOut = (e) => {
      const t = e.target.closest?.('[data-cursor-text]')
      const rel = e.relatedTarget?.closest?.('[data-cursor-text]')
      if (t && !rel) {
        setLabel('')
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
      }
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const show = () => setVisible(true)
    const hide = () => setVisible(false)
    window.addEventListener('pointerenter', show)
    window.addEventListener('pointerleave', hide)

    return () => {
      document.body.classList.remove('hide-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('pointerenter', show)
      window.removeEventListener('pointerleave', hide)
    }
  }, [])

  return (
    <div className={styles.root} aria-hidden data-cursor-root>
      <div ref={dotRef} className={styles.dot} style={{ opacity: visible ? 1 : 0 }} />
      <div
        ref={labelRef}
        className={styles.label}
        style={{ opacity: label ? 1 : 0, visibility: label ? 'visible' : 'hidden' }}
      >
        {label}
      </div>
    </div>
  )
}
