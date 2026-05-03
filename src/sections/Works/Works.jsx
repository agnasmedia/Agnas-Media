import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORKS } from '../../data/works'
import styles from './Works.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * First card in each column: offset tops in vh so (0,1,2) never share a horizontal line.
 * Spreads columns vertically so triplet tops don’t align (lead + inter-card gaps in vh).
 */
const FIRST_CARD_LEAD_VH = [0, 55, 11]

/**
 * Space before each following card in that column (vh). Values differ per column so
 * wave 2+ (indices 3–5, 6–8, 9–11) don’t re-form three parallel tops at once.
 */
const GAP_BEFORE_NEXT_VH = [
  [50, 52, 61],
  [55, 56, 52],
  [48, 32, 59],
]

function marginTopForCard(index) {
  const col = index % 3
  const rowInCol = Math.floor(index / 3)
  if (rowInCol === 0) {
    const v = FIRST_CARD_LEAD_VH[col]
    return v === 0 ? undefined : `${v}vh`
  }
  const gap = GAP_BEFORE_NEXT_VH[col][rowInCol - 1]
  return `${gap}vh`
}

function WorkCard({ work, index }) {
  const cardRef = useRef(null)
  const mt = marginTopForCard(index)

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
      className={styles.card}
      style={{
        '--order': index,
        ...(mt ? { marginTop: mt } : {}),
      }}
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
  const columns = useMemo(() => {
    const c = [[], [], []]
    WORKS.forEach((work, index) => {
      c[index % 3].push({ work, index })
    })
    return c
  }, [])

  return (
    <section className={styles.section} id="works" aria-labelledby="works-heading">
      <h2 id="works-heading" className={styles.heading}>
        Recent Works
      </h2>
      <div className={styles.grid}>
        {columns.map((items, column) => (
          <div key={column} className={`${styles.column} ${styles[`track${column}`]}`}>
            {items.map(({ work, index }) => (
              <WorkCard key={work.title} work={work} index={index} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
