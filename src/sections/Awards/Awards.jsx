import { MarqueeStrip } from '../../components/MarqueeStrip'
import { AWARD_BLOCKS } from '../../data/awards'
import styles from './Awards.module.css'

export function Awards() {
  return (
    <section className={styles.section} id="awards" aria-labelledby="awards-heading">
      <div className={styles.marquee}>
        <MarqueeStrip first="Awards" second="Recognition" />
      </div>

      <div className={styles.inner}>
        <h2 id="awards-heading" className="visuallyHidden">
          Awards and recognition
        </h2>
        <p className={styles.lead}>
          We are proud to be the 2024 &quot;Studio of the Year&quot; at the CSS Design Awards. Our project was
          also honored as &quot;E-Commerce of the Year&quot; by the Awwwards.
        </p>

        <div className={styles.columns}>
          {AWARD_BLOCKS.map((block) => (
            <div key={block.id} className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockLabel}>{block.label}</span>
                <span className={styles.blockTotal}>{block.total}</span>
              </div>
              <div className={styles.rule} />
              <ul className={styles.rows}>
                {block.rows.map((row) => (
                  <li key={row.label} className={styles.row}>
                    <span>{row.label}</span>
                    <span className={styles.rowVal}>{String(row.value).padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
