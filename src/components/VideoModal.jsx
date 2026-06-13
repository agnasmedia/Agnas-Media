import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import styles from './VideoModal.module.css'

export function VideoModal({ open, onClose, videoId, title = 'Video' }) {
  const modalRef = useRef(null)
  const panelRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const closingRef = useRef(false)

  const animateIn = useCallback(() => {
    const modal = modalRef.current
    const panel = panelRef.current
    if (!modal || !panel) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 768px), (max-height: 520px)').matches
    gsap.killTweensOf([modal, panel])

    if (reduce) {
      gsap.set(modal, { opacity: 1 })
      gsap.set(panel, { opacity: 1, scale: 1, y: 0 })
      return
    }

    gsap.set(modal, { opacity: 0 })
    gsap.set(panel, { opacity: 0, scale: compact ? 0.94 : 0.88, y: compact ? 12 : 24 })

    gsap.to(modal, { opacity: 1, duration: 0.45, ease: 'power2.out' })
    gsap.to(panel, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: compact ? 0.48 : 0.55,
      ease: 'power3.out',
      delay: 0.06,
    })
  }, [])

  const animateOut = useCallback(
    (done) => {
      const modal = modalRef.current
      const panel = panelRef.current
      if (!modal || !panel) {
        done()
        return
      }

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.killTweensOf([modal, panel])

      if (reduce) {
        done()
        return
      }

      gsap.to(panel, {
        opacity: 0,
        scale: 0.92,
        y: 16,
        duration: 0.32,
        ease: 'power2.in',
      })
      gsap.to(modal, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        delay: 0.04,
        onComplete: done,
      })
    },
    [],
  )

  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    animateOut(() => {
      closingRef.current = false
      setMounted(false)
      onClose?.()
    })
  }, [animateOut, onClose])

  useEffect(() => {
    if (open) {
      setMounted(true)
    }
  }, [open])

  useEffect(() => {
    if (!mounted || !open) return undefined

    const frame = requestAnimationFrame(() => {
      animateIn()
    })

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') requestClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mounted, open, animateIn, requestClose])

  if (!mounted) return null

  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

  return createPortal(
    <div
      ref={modalRef}
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={requestClose}
    >
      <div ref={panelRef} className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <button type="button" className={styles.close} onClick={requestClose} aria-label="Close video">
            ×
          </button>
        </div>

        <div className={styles.frameWrap}>
          {open ? (
            <iframe
              className={styles.frame}
              src={embedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
