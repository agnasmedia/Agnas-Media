import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SRGBColorSpace } from 'three'
import * as THREE from 'three'
import showreelMp4 from '../assets/showreel_preview.mp4'

/** Hero scroll (A-logo): from this point the showreel plane begins rotating in behind the hero. */
const HERO_ENTER_START = 0.6

/** First segment of the pinned showreel can still complete the enter if hero finished late. */
const SHOWREEL_ENTER_END = 0.3

/** Hold flat until this showreel progress, then exit upward. */
const SHOWREEL_EXIT_START = 0.6

/**
 * Showreel video plane.
 *
 *   ENTER (rotate Y, slide Z): heroProgress HERO_ENTER_START → 1, and/or first SHOWREEL_ENTER_END of pin.
 *   HOLD: enter complete and showreelProgress < SHOWREEL_EXIT_START.
 *   EXIT: showreelProgress SHOWREEL_EXIT_START → 1 (translate up, no rotation).
 */
export function ShowreelPlane({ heroProgress, showreelProgress }) {
  const ref = useRef()
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: showreelMp4,
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
      playsInline: true,
      preload: 'auto',
    }),
  )

  useEffect(() => {
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
    return () => {
      video.pause()
    }
  }, [video])

  useFrame(() => {
    const obj = ref.current
    if (!obj) return
    const h = THREE.MathUtils.clamp(heroProgress, 0, 1)
    const sp = THREE.MathUtils.clamp(showreelProgress, 0, 1)

    const fromHero = THREE.MathUtils.clamp((h - HERO_ENTER_START) / (1 - HERO_ENTER_START), 0, 1)
    const fromShowreelPin = THREE.MathUtils.clamp(sp / SHOWREEL_ENTER_END, 0, 1)
    const enterT = Math.max(fromHero, fromShowreelPin)
    const ease = THREE.MathUtils.clamp(enterT, 0, 1)

    let rotY = 0
    let posY = 0
    let posZ = 0

    if (enterT < 1) {
      rotY = THREE.MathUtils.lerp(-Math.PI / 2, 0, ease)
      posZ = THREE.MathUtils.lerp(-16, 0, ease)
      posY = 0
    } else if (sp < SHOWREEL_EXIT_START) {
      rotY = 0
      posZ = 0
      posY = 0
    } else {
      const t = (sp - SHOWREEL_EXIT_START) / (1 - SHOWREEL_EXIT_START)
      const exitEase = t * t * (3 - 2 * t)
      rotY = 0
      posZ = 0
      posY = THREE.MathUtils.lerp(0, 12, exitEase)
    }

    obj.rotation.y = rotY
    obj.position.set(0, posY, posZ)
  })

  const h = heroProgress
  const sp = showreelProgress
  const visible = (h >= HERO_ENTER_START - 0.01 || sp > 0) && sp < 1

  return (
    <group ref={ref} position={[0, 0, -16]} rotation={[0, -Math.PI / 2, 0]} visible={visible}>
      <mesh>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} colorSpace={SRGBColorSpace} />
        </meshBasicMaterial>
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[16.04, 9.04]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  )
}
