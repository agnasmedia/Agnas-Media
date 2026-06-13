import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGLTF } from '@react-three/drei'
import MagneticButton from '../../components/MagneticButton'
import { MarqueeStrip } from '../../components/MarqueeStrip'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const CONTACT = [
  {
    heading: 'Based in USA',
    lines: ['162 Madison Ave', 'New York City, 10016 NY'],
    mail: 'nyc@agnasmedia.com',
  },
  {
    heading: 'Heroes from Singapore',
    lines: ['63 Robinson Rd', '068894, Singapore'],
    mail: 'hello@agnasmedia.com',
  },
  {
    heading: 'Support from Belgium',
    lines: ['Av. Louise 200', 'Bruxelles, 1050, Belgium'],
    mail: 'be@agnasmedia.com',
  },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/agnasmedia/' },
  { label: 'Dribbble', href: 'https://dribbble.com/agnasmedia' },
  { label: 'Behance', href: 'https://www.behance.net/agnasmedia' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/agnasmedia' },
]

export function Footer({ onFooterProgress, onRequestFooterModel }) {
  const rootRef = useRef(null)
  const sentinalRef = useRef(null)
  const ctaBandRef = useRef(null)

  useEffect(() => {
    const el = sentinalRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          useGLTF.preload('/models/alien-transformed.glb')
          onRequestFooterModel?.()
          io.disconnect()
        }
      },
      { rootMargin: '320px 0px', threshold: 0 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [onRequestFooterModel])

  useGSAP(
    () => {
      if (!ctaBandRef.current) return undefined

      // Trigger off the CTA band itself so progress=0.5 corresponds to the
      // "Let's Talk" button being at the vertical center of the viewport.
      const st = ScrollTrigger.create({
        trigger: ctaBandRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          onFooterProgress?.(self.progress)
        },
      })

      return () => {
        st.kill()
      }
    },
    { scope: rootRef, dependencies: [onFooterProgress] },
  )

  return (
    <footer ref={rootRef} className={styles.footer} id="contact">
      <span ref={sentinalRef} className={styles.sentinal} aria-hidden />

      <div ref={ctaBandRef} className={styles.ctaBand}>
        <div className={styles.marqueeLayer} aria-hidden>
          <MarqueeStrip first="Let's talk" second="Contact us" />
        </div>
        <div className={styles.ctaLayer}>
          <MagneticButton className={styles.magnetic}>
            <a
              className={styles.talkBtn}
              href="mailto:hello@agnasmedia.com"
              data-cursor-text="Say hello"
            >
              Let&apos;s Talk
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className={styles.grid}>
        {CONTACT.map((col) => (
          <div key={col.heading} className={styles.col}>
            <p className={styles.colHead}>{col.heading}</p>
            {col.lines.map((line) => (
              <p key={line} className={styles.line}>
                {line}
              </p>
            ))}
            <a className={styles.mail} href={`mailto:${col.mail}`}>
              {col.mail}
            </a>
          </div>
        ))}

        <div className={styles.col}>
          <p className={styles.colHead}>Social</p>
          <ul className={styles.social}>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a className={styles.socialLink} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colHead}>Business Inquiries</p>
          <a className={styles.mail} href="mailto:howdy@agnasmedia.com">
            howdy@agnasmedia.com
          </a>
          <a className={styles.mail} href="tel:+19172591089">
            +1 (917) 259-1089
          </a>
          <p className={styles.note}>Agnas® is a registered trademark of Wenkroy Inc.</p>
        </div>
      </div>
    </footer>
  )
}
