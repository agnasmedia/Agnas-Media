import { useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisContext } from './lenisContext'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      return undefined
    }

    const inst = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenis(inst)

    const onScroll = () => {
      ScrollTrigger.update()
    }
    inst.on('scroll', onScroll)

    let rafId = 0
    function raf(time) {
      inst.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      inst.off('scroll', onScroll)
      inst.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  const value = useMemo(() => ({ lenis, reducedMotion }), [lenis, reducedMotion])

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
