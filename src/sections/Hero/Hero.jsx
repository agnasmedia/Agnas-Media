import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero({ onHeroProgress }) {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const lines = gsap.utils.toArray(sectionRef.current?.querySelectorAll('[data-hero-line]'))
      gsap.from(lines, {
        y: -15,
        opacity: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.06,
      })

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.35,
        onUpdate: (self) => {
          onHeroProgress?.(self.progress)
        },
      })

      return () => {
        st.kill()
      }
    },
    { scope: sectionRef, dependencies: [onHeroProgress] },
  )

  return (
    <section ref={sectionRef} className={styles.hero} id="top">
      <nav className={styles.nav} aria-label="Primary">
        <a className={styles.navLink} href="#works">
          Portfolio
        </a>
        <a className={styles.navLink} href="#mission">
          Agency
        </a>
        <a className={styles.navLink} href="#contact">
          Contact
        </a>
      </nav>

      <h1 className={styles.title}>
        <span data-hero-line className={`${styles.line} ${styles.logoLine}`}>
          <span className={styles.logoLockup}>
            <img className={styles.logoImg} src="/full-logo.png" alt="Agnas Media" />
            <span className={styles.reg}>®</span>
          </span>
        </span>
        <span data-hero-line className={styles.line}>
        Unforgettable
        </span>
        <span data-hero-line className={styles.line}>
        Products & Journeys
        </span>
        <span data-hero-line className={styles.line}>
        That Drive Growth & Engagement
        </span>
      </h1>

      <p className={styles.intro}>
        We pride ourselves on our ability to craft digital products that not only meet but exceed the
        expectations of our clients. With a wealth of experience and expertise in the field of digital product
        development, we understand how to design user-friendly interfaces that captivate and engage audiences.
      </p>
    </section>
  )
}
