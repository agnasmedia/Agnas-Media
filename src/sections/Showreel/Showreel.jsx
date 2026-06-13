import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../components/MagneticButton'
import { MarqueeStrip } from '../../components/MarqueeStrip'
import { VideoModal } from '../../components/VideoModal'
import styles from './Showreel.module.css'

gsap.registerPlugin(ScrollTrigger)

const SHOWREEL_VIDEO_ID = 'x5faT66jmG4'

export function Showreel({ onShowreelProgress }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage) return undefined

      if (reduce) {
        onShowreelProgress?.(0.45)
        return undefined
      }

      const applyExit = (p) => {
        const t = Math.max(0, Math.min(1, (p - 0.6) / 0.4))
        const ease = t * t * (3 - 2 * t)
        const y = -ease * window.innerHeight * 1.15
        stage.style.transform = `translate3d(0, ${y}px, 0)`
      }

      const st = ScrollTrigger.create({
        id: 'showreel-pin',
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          onShowreelProgress?.(p)
          applyExit(p)
        },
        onLeaveBack: () => {
          onShowreelProgress?.(0)
          applyExit(0)
        },
        onLeave: () => {
          onShowreelProgress?.(1)
          applyExit(1)
        },
      })

      return () => {
        st.kill()
        stage.style.transform = ''
      }
    },
    { scope: sectionRef, dependencies: [onShowreelProgress] },
  )

  return (
    <section ref={sectionRef} className={styles.section} id="showreel" aria-labelledby="showreel-heading">
      <h2 id="showreel-heading" className="visuallyHidden">
        Showreel
      </h2>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.marquee} aria-hidden>
          <MarqueeStrip first="Showreel" second="Showreel" />
        </div>

        <MagneticButton className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.fullBtn}
            data-cursor-text="Watch video…"
            aria-label="Play showreel video"
            aria-haspopup="dialog"
            onClick={() => setVideoOpen(true)}
          >
            <span className={styles.fullBtnLabel}>Play Showreel</span>
          </button>
        </MagneticButton>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={SHOWREEL_VIDEO_ID}
        title="Agnas Media Showreel"
      />
    </section>
  )
}
