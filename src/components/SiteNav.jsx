import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../config/nav'
import styles from './SiteNav.module.css'

function NavLink({ item, className, onNavigate }) {
  const isRoute = item.href.startsWith('/') && !item.href.includes('#')

  if (isRoute) {
    return (
      <Link className={className} to={item.href} onClick={onNavigate}>
        {item.label}
      </Link>
    )
  }

  return (
    <a className={className} href={item.href} onClick={onNavigate}>
      {item.label}
    </a>
  )
}

export function SiteNav({ placement = 'hero' }) {
  const navMobileRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const isFixed = placement === 'fixed'

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    const onPointerDown = (e) => {
      if (!navMobileRef.current?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`${styles.nav} ${isFixed ? styles.navFixed : styles.navHero}`}
      aria-label="Primary"
    >
      <div className={styles.navDesktop}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} className={styles.navLink} />
        ))}
      </div>

      <div ref={navMobileRef} className={styles.navMobile}>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`${styles.menuIcon} ${menuOpen ? styles.menuIconOpen : ''}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <div
          id="site-nav-menu"
          className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ''}`}
          hidden={!menuOpen}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              className={styles.menuLink}
              onNavigate={closeMenu}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
