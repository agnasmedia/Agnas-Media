import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SiteNav } from '../components/SiteNav'
import { ContactForm } from '../sections/Contact/ContactForm'
import { Footer } from '../sections/Footer/Footer'
import styles from './ContactPage.module.css'

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact — Agnas Media'
    return () => {
      document.title = 'Agnas Media'
    }
  }, [])

  return (
    <div className={`mainSurface ${styles.page}`}>
      <header className={styles.header}>
        <Link className={styles.logoLink} to="/" aria-label="Agnas Media home">
          <img className={styles.logoImg} src="/full-logo.png" alt="Agnas Media" />
          <span className={styles.reg}>®</span>
        </Link>
        <SiteNav placement="fixed" />
      </header>

      <ContactForm />

      <Footer sceneSync={false} showCta={false} />
    </div>
  )
}
