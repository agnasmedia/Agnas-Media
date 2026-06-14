import { ScrollTrigger } from 'gsap/ScrollTrigger'

let timer

/** Debounced refresh after layout shifts (e.g. lazy-loaded work images). */
export function scheduleScrollTriggerRefresh() {
  if (typeof window === 'undefined') return
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    ScrollTrigger.refresh()
  }, 120)
}
