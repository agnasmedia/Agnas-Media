import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORKS } from '../../data/works'
import styles from './Works.module.css'

gsap.registerPlugin(ScrollTrigger)

function WorkCard({ work }) {
  const cardRef = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce || !cardRef.current) return undefined

      gsap.to(cardRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      return undefined
    },
    { scope: cardRef },
  )

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${work.side === 'left' ? styles.left : styles.right}`}
    >
      <a
        className={styles.cardLink}
        href={work.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-text="Read more…"
      >
        <div className={styles.thumb}>
          <img
            className={styles.img}
            src={work.image}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.opacity = 0.35
            }}
          />
        </div>
        <div className={styles.meta}>
          <h3 className={styles.title}>{work.title}</h3>
          <p className={styles.sub}>
            <span>{work.meta}</span>
            <span className={styles.year}>{work.year}</span>
          </p>
        </div>
      </a>
    </article>
  )
}

export function Works() {
  return (
    <section className={styles.section} id="works" aria-labelledby="works-heading">
      <h2 id="works-heading" className={styles.heading}>
        Recent Works
      </h2>
      <div className={styles.grid}>
        {WORKS.map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </div>
    </section>
  )
}
