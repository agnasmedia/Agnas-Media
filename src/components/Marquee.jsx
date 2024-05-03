import React from 'react'
import { motion } from 'framer-motion'


import { useEffect, useRef, useLayoutEffect } from 'react'
import {
  useScrollbar,
  SmoothScrollbar,
  useTracker,
} from '@14islands/r3f-scroll-rig'

import { motion, useMotionValue, useTransform } from 'framer-motion'
// import lerp from '@14islands/lerp'

import './App.css'
import '@14islands/r3f-scroll-rig/css'

/**
 * Return a Framer Motion value bound to a tracker scrollState
 * @param {Tracker} tracker scroll-rig tracker instance
 * @param {string} prop scrollState prop to bind
 */
function useTrackerMotionValue(tracker, prop = 'progress') {
  const progress = useMotionValue()
  const { onScroll } = useScrollbar()

  useLayoutEffect(() => {
    // set initial progress
    progress.set(tracker.scrollState[prop])
  }, [progress, tracker, prop])

  useEffect(() => {
    // update progress on scroll
    return onScroll(() => {
      progress.set(tracker.scrollState[prop])
    })
  }, [tracker, progress, onScroll, prop])
  return progress
}


function CSSMarquee({ children, reverse = false, duration = 30, style }) {
  const track = useRef()
  const tracker = useTracker(track)
  const progress = useTrackerMotionValue(tracker)

  const x = useTransform(progress, [0, 1], reverse ? ['-50vw', '50vw'] : ['50vw', '-50vw'], { clamp: false })

  return (
    <div className="marqueeWrapper" ref={track}>
      <div style={style}>
        <motion.div className={'marquee ' + (reverse ? 'reverse' : '')} style={{ x }}>
          <div className="marquee__content" style={{ '--duration': `${duration}s` }}>
            <h2>{children}</h2>
          </div>
          <div className="marquee__content" style={{ '--duration': `${duration}s` }} aria-hidden="true">
            <h2>{children}</h2>
          </div>
        </motion.div>
      </div>
    </div>
  )
}



const Row = ({ children }) => <div className="row">{children}</div>

export default function Marquee() {
  return (
    <>
    
      <SmoothScrollbar>
        {(bind) => (
          <article {...bind}>
            <CSSMarquee style={{ transform: 'rotateZ(3deg)' }}>Showreel-Showreel-Showreel-Showreel-Showreel-Showreel-Showreel-Showreel- </CSSMarquee>
          </article>
        )}
      </SmoothScrollbar>
    </>
  )
}
