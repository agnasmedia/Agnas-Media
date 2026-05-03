import styles from './MarqueeStrip.module.css'

/**
 * Horizontal infinite marquee (Showreel, Awards, Contact) — advanced.team style.
 */
export function MarqueeStrip({ first, second, className = '' }) {
  const text = `${first} — ${second} — `
  const chunk = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className={styles.span}>
      {text}
    </span>
  ))

  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden>
      <div className={styles.track}>
        <div className={styles.half}>{chunk}</div>
        <div className={styles.half}>{chunk}</div>
      </div>
    </div>
  )
}
