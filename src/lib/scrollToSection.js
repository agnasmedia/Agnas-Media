import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const SHOWREEL_SECTION_ID = 'showreel'
export const SHOWREEL_PIN_ID = 'showreel-pin'

export function getSectionIdFromHref(href) {
  if (!href) return ''
  return href.includes('#') ? href.split('#')[1] : href.replace(/^#/, '')
}

/** Scroll position where a ScrollTrigger section begins (required for pinned sections). */
export function getSectionScrollY(sectionId) {
  const element = document.getElementById(sectionId)
  if (!element) return null

  ScrollTrigger.refresh()

  const pin = ScrollTrigger.getById(SHOWREEL_PIN_ID)
  if (pin && pin.trigger === element) {
    return pin.start
  }

  const match = ScrollTrigger.getAll().find(
    (st) => st.trigger === element || st.trigger?.id === sectionId,
  )
  if (match?.pin) return match.start

  return window.scrollY + element.getBoundingClientRect().top
}

export function scrollToSection(sectionId, lenis, options = {}) {
  const y = getSectionScrollY(sectionId)
  if (y == null) return false

  const duration = options.duration ?? 1.15

  const finish = () => {
    ScrollTrigger.update()
    options.onComplete?.()
  }

  if (lenis) {
    lenis.scrollTo(y, { duration, force: true, onComplete: finish })
    return true
  }

  window.scrollTo({ top: y, behavior: 'smooth' })
  finish()
  return true
}
