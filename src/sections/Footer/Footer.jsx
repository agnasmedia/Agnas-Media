import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGLTF } from '@react-three/drei'
import MagneticButton from '../../components/MagneticButton'
import { MarqueeStrip } from '../../components/MarqueeStrip'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

export const FOOTER_CTA_SCROLL_ID = 'footer-cta-pin'

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

export function Footer({
  onFooterProgress,
  onRequestFooterModel,
  sceneSync = true,
  showCta = true,
  talkHref = '/contact',
}) {
  const rootRef = useRef(null)
  const sentinalRef = useRef(null)
  const ctaBandRef = useRef(null)

  useEffect(() => {
    if (!sceneSync) return undefined
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
  }, [onRequestFooterModel, sceneSync])

  useGSAP(
    () => {
      if (!sceneSync || !ctaBandRef.current) return undefined

      const st = ScrollTrigger.create({
        id: FOOTER_CTA_SCROLL_ID,
        trigger: ctaBandRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          onFooterProgress?.(self.progress)
        },
      })

      return () => {
        st.kill()
      }
    },
    { scope: rootRef, dependencies: [onFooterProgress, sceneSync] },
  )

  return (
    <footer
      ref={rootRef}
      className={`${styles.footer} ${!showCta ? styles.footerCompact : ''}`}
      id="contact"
    >
      {showCta ? <span ref={sentinalRef} className={styles.sentinal} aria-hidden /> : null}

      {showCta ? (
        <div ref={ctaBandRef} className={styles.ctaBand}>
          <div className={styles.marqueeLayer} aria-hidden>
            <MarqueeStrip first="Let's talk" second="Contact us" />
          </div>
          <div className={styles.ctaLayer}>
            <MagneticButton className={styles.magnetic}>
              <Link
                className={styles.talkBtn}
                to={talkHref}
                data-cursor-text="Say hello"
              >
                Let&apos;s Talk
              </Link>
            </MagneticButton>
          </div>
        </div>
      ) : null}

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
