import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORKS } from '../../data/works'
import styles from './Works.module.css'

gsap.registerPlugin(ScrollTrigger)

const RIBBON_DISABLED_QUERY = '(max-width: 768px)'

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

function createRibbonPath(points) {
  if (points.length < 2) return ''

  const d = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`]

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1 = {
      x: p1.x + (p2.x - p0.x) / 6,
      y: p1.y + (p2.y - p0.y) / 6,
    }
    const c2 = {
      x: p2.x - (p3.x - p1.x) / 6,
      y: p2.y - (p3.y - p1.y) / 6,
    }

    d.push(
      `C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    )
  }

  return d.join(' ')
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
      data-work-card
      data-work-index={index}
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
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const headingRef = useRef(null)
  const [ribbonEnabled, setRibbonEnabled] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia(RIBBON_DISABLED_QUERY).matches
  })
  const columns = useMemo(() => {
    const c = [[], [], []]
    WORKS.forEach((work, index) => {
      c[index % 3].push({ work, index })
    })
    return c
  }, [])

  useEffect(() => {
    const mql = window.matchMedia(RIBBON_DISABLED_QUERY)
    const onChange = (e) => setRibbonEnabled(!e.matches)
    if (mql.addEventListener) mql.addEventListener('change', onChange)
    else mql.addListener(onChange)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange)
      else mql.removeListener(onChange)
    }
  }, [])

  useEffect(
    () => {
      const section = sectionRef.current
      const svg = svgRef.current
      const heading = headingRef.current
      const paths = svg ? gsap.utils.toArray(svg.querySelectorAll('[data-ribbon-path]')) : []
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!section || !svg || !paths.length || reduce || !ribbonEnabled) {
        if (section) section.style.setProperty('--ribbon-opacity', 0)
        return undefined
      }

      // Optional: ribbon's left "tail" anchors at the Beliefs section's circle
      // arrow so the ribbon emerges from there.
      const beliefArrow = document.querySelector('#beliefs [data-mission-arrow]')

      const updatePath = () => {
        const sectionRect = section.getBoundingClientRect()
        const width = section.clientWidth
        const height = section.offsetHeight
        const cards = gsap.utils
          .toArray(section.querySelectorAll('[data-work-card]'))
          .sort((a, b) => Number(a.dataset.workIndex) - Number(b.dataset.workIndex))

        if (!cards.length || !width || !height) return

        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

        // Belief-arrow anchor (typically above the section → negative y).
        let arrowY
        if (beliefArrow) {
          const ar = beliefArrow.getBoundingClientRect()
          arrowY = ar.top - sectionRect.top + ar.height / 2
        } else {
          arrowY = -Math.min(height * 0.18, 220)
        }

        // Build a soft sweep up to the heading underline, then back out.
        // We use Range to measure the actual text content of the heading
        // (its <h2> element is a block centred via text-align so its bounding
        // rect is much wider than the visible text).
        const headingPoints = []
        if (heading) {
          const range = document.createRange()
          range.selectNodeContents(heading)
          const tr = range.getBoundingClientRect()
          range.detach?.()
          const ulY = tr.bottom - sectionRect.top + Math.min(26, Math.max(10, tr.height * 0.12))
          const ulLeft = tr.left - sectionRect.left
          const ulRight = tr.right - sectionRect.left
          const lead = Math.min(160, Math.max(90, width * 0.08))
          headingPoints.push(
            { x: Math.max(ulLeft - lead, -width * 0.04), y: ulY },
            { x: ulLeft, y: ulY },
            { x: ulRight, y: ulY },
            { x: Math.min(ulRight + lead, width * 1.04), y: ulY },
          )
        }

        const centers = cards.map((card) => {
          const rect = card.getBoundingClientRect()
          return {
            x: rect.left - sectionRect.left + rect.width / 2,
            y: rect.top - sectionRect.top + rect.height * 0.42,
          }
        })
        const points = [
          { x: -width * -1, y: arrowY },
          ...headingPoints,
          ...centers,
          { x: width * 1.22, y: centers[centers.length - 1].y },
        ]
        const d = createRibbonPath(points)

        paths.forEach((path) => {
          path.setAttribute('d', d)
          const length = path.getTotalLength()
          path.style.strokeDasharray = `0 ${length}`
          path.style.strokeDashoffset = '0'
        })
      }

      const setProgress = (progress) => {
        paths.forEach((path) => {
          const length = path.getTotalLength()
          const trail = gsap.utils.clamp(520, 1160, section.clientWidth * 0.78)
          const draw = gsap.utils.clamp(0, length, progress * (length + trail))
          path.style.strokeDasharray = `${draw} ${length}`
          path.style.strokeDashoffset = '0'
        })

        const enter = gsap.utils.clamp(0, 1, progress * 8)
        const exit = gsap.utils.clamp(0, 1, (1 - progress) * 8)
        section.style.setProperty('--ribbon-opacity', enter * exit)
      }

      updatePath()
      setProgress(0)

      const sortedCards = gsap.utils
        .toArray(section.querySelectorAll('[data-work-card]'))
        .sort((a, b) => Number(a.dataset.workIndex) - Number(b.dataset.workIndex))
      const lastCard = sortedCards[sortedCards.length - 1] ?? section
      // If we have the beliefs arrow, start the timeline as it scrolls into
      // view; otherwise fall back to the first card.
      const startTrigger = beliefArrow ?? sortedCards[0] ?? section

      const st = ScrollTrigger.create({
        trigger: startTrigger,
        endTrigger: lastCard,
        start: beliefArrow ? 'center bottom-=12%' : 'top bottom-=10%',
        end: 'bottom top+=15%',
        scrub: 0.12,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          updatePath()
          setProgress(self.progress)
        },
        onUpdate: (self) => {
          setProgress(self.progress)
        },
      })

      const resizeObserver = new ResizeObserver(() => {
        updatePath()
        setProgress(st.progress)
      })
      resizeObserver.observe(section)

      return () => {
        resizeObserver.disconnect()
        st.kill()
      }
    },
    [ribbonEnabled],
  )

  return (
    <section ref={sectionRef} className={styles.section} id="works" aria-labelledby="works-heading">
      <h2 ref={headingRef} id="works-heading" className={styles.heading}>
        Recent Works
      </h2>
      <svg ref={svgRef} className={styles.ribbonLayer} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="works-ribbon-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff5b55" stopOpacity="0" />
            <stop offset="14%" stopColor="#ff6f63" stopOpacity="0.74" />
            <stop offset="48%" stopColor="#eaf1ff" stopOpacity="0.86" />
            <stop offset="78%" stopColor="#7bc7ff" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#7bc7ff" stopOpacity="0" />
          </linearGradient>
          <filter id="works-ribbon-glow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.95  0 1 0 0 0.2  0 0 1 0 0.16  0 0 0 0.58 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path data-ribbon-path className={styles.ribbonGlow} />
        <path data-ribbon-path className={styles.ribbonBody} />
        <path data-ribbon-path className={styles.ribbonCore} />
      </svg>
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
