import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../components/MagneticButton'
import styles from './Mission.module.css'

gsap.registerPlugin(ScrollTrigger)

export function Mission({ id, quote, aside, linkHref, linkLabel }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef)
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return undefined

      gsap.from(q('[data-animate]'), {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })

      return undefined
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className={styles.section} id={id}>
      <div className={styles.inner}>
        <blockquote data-animate className={styles.quote}>
          {quote}
        </blockquote>

        <div data-animate className={styles.bottom}>
          <MagneticButton className={styles.magnetic}>
            <a
              className={styles.circleBtn}
              href={linkHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={linkLabel}
            >
              <ArrowIcon />
            </a>
          </MagneticButton>

          <div className={styles.copy}>
            <p className={styles.body}>{aside}</p>
            <a className={styles.link} href={linkHref} target="_blank" rel="noreferrer noopener">
              {linkLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        className={styles.arrow}
        d="M15 40C15 40 15 18.9683 15 -9.53674e-07M15 -9.53674e-07C15 13.7026 1 16.2319 1 16.2319M15 -9.53674e-07C15 13.7026 29 16.2319 29 16.2319"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
