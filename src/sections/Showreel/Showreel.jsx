import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../components/MagneticButton'
import { MarqueeStrip } from '../../components/MarqueeStrip'
import showreelMp4 from '../../assets/showreel_preview.mp4'
import styles from './Showreel.module.css'

gsap.registerPlugin(ScrollTrigger)

const SHOWREEL_URL = 'https://www.youtube.com/watch?v=4k1ty5U4Hi4'

export function Showreel() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return undefined

      const inner = innerRef.current
      const section = sectionRef.current
      if (!inner || !section) return undefined

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        inner,
        {
          scale: 0.38,
          borderRadius: '20px',
        },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'none',
          duration: 1,
        },
      )

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="showreel-heading">
      <h2 id="showreel-heading" className="visuallyHidden">
        Showreel
      </h2>
      <div className={styles.marquee}>
        <MarqueeStrip first="Showreel" second="Showreel" />
      </div>

      <div className={styles.stage}>
        <div ref={innerRef} className={styles.videoInner}>
          <video
            className={styles.video}
            src={showreelMp4}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
          />
          <MagneticButton className={styles.magnetic}>
            <button
              type="button"
              className={styles.fullBtn}
              data-cursor-text="Watch video…"
              aria-label="Open full showreel video on YouTube"
              onClick={() => window.open(SHOWREEL_URL, '_blank', 'noopener,noreferrer')}
            >
              <span className={styles.fullBtnLabel}>Full Video</span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
