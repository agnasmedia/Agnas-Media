import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = ['UX Strategy', 'UI Design', 'Development', 'Communication']

export function Services() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const lines = gsap.utils.toArray(rootRef.current?.querySelectorAll('[data-service-line]'))
      if (!lines.length || reduce) return undefined

      gsap.from(lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      return undefined
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.inner}>
        <p id="services-heading" className={styles.label}>
          Our services:
        </p>
        <ul className={styles.list}>
          {ITEMS.map((item) => (
            <li key={item} data-service-line className={styles.line}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
