import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = ['UI/UX Design & Strategy', 'Art Direction', 'Web & Mobile Design', 'Content Production', 'Motion Design', 'Branding & Packaging', 'Social & Brand PR', 'Front-End & Back-End Development']

export function Services({ onServicesProgress }) {
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

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.18,
        onUpdate: (self) => {
          onServicesProgress?.(self.progress)
        },
        onLeaveBack: () => onServicesProgress?.(0),
        onLeave: () => onServicesProgress?.(1),
      })

      return () => {
        st.kill()
      }
    },
    { scope: rootRef, dependencies: [onServicesProgress] },
  )

  return (
    <section ref={rootRef} className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.inner}>
        <p id="services-heading" className={styles.label}>
          Our services:
        </p>
        <ul className={`${styles.list} custom-services`}>
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
