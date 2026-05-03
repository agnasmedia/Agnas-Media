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
    heading: 'Heroes from Ukraine',
    lines: ['Main Office', 'Dnipro, 49000'],
    mail: 'hello@advanced.team',
  },
  {
    heading: 'Based in USA',
    lines: ['Los Angeles, 90210', 'California'],
    mail: 'la@advanced.team',
  },
  {
    heading: 'Support from Poland',
    lines: ['Main Office', 'Warsaw'],
    mail: 'pl@advanced.team',
  },
]

const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/advanced.team/' },
  { label: 'Instagram', href: 'https://www.instagram.com/advanced.team/' },
  { label: 'Dribbble', href: 'https://dribbble.com/advanced-team' },
  { label: 'Behance', href: 'https://www.behance.net/advanced_team' },
]

export function Footer({ onFooterProgress, onRequestFooterModel }) {
  const rootRef = useRef(null)
  const sentinalRef = useRef(null)

  useEffect(() => {
    const el = sentinalRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          useGLTF.preload('/models/gargoyle-transformed.glb')
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
      if (!rootRef.current) return undefined

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
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

      <div className={styles.marquee}>
        <MarqueeStrip first="Let's talk" second="Contact us" />
      </div>

      <div className={styles.ctaRow}>
        <MagneticButton className={styles.magnetic}>
          <a
            className={styles.talkBtn}
            href="mailto:hello@advanced.team"
            data-cursor-text="Say hello"
          >
            Let&apos;s Talk
          </a>
        </MagneticButton>
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
          <p className={styles.colHead}>Business inquiries</p>
          <a className={styles.mail} href="mailto:hello@advanced.team">
            hello@advanced.team
          </a>
          <p className={styles.note}>advanced.team</p>
        </div>
      </div>

    </footer>
  )
}
