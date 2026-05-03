import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SRGBColorSpace } from 'three'
import * as THREE from 'three'
import showreelMp4 from '../assets/showreel_preview.mp4'

/**
 * Showreel video plane.
 *
 *   progress 0.00 → 0.30  ENTER : rotates Y from -π/2 → 0, slides Z from -16 → 0.
 *   progress 0.30 → 0.60  HOLD  : sits flat, parallel, dead-center, no rotation.
 *   progress 0.60 → 1.00  EXIT  : translates straight up. NO further rotation.
 */
export function ShowreelPlane({ progress }) {
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
    const p = THREE.MathUtils.clamp(progress, 0, 1)

    let rotY = 0
    let posY = 0
    let posZ = 0

    if (p < 0.3) {
      const t = p / 0.3
      const ease = THREE.MathUtils.smoothstep(t, 0, 1)
      rotY = THREE.MathUtils.lerp(-Math.PI / 2, 0, ease)
      posZ = THREE.MathUtils.lerp(-16, 0, ease)
    } else if (p < 0.6) {
      rotY = 0
      posZ = 0
      posY = 0
    } else {
      const t = (p - 0.6) / 0.4
      const ease = t * t * (3 - 2 * t)
      rotY = 0
      posZ = 0
      // Plane is 9 tall; camera visible-height at z=0 is ~9.94.
      // Move to y = 12 so the plane fully clears the top of the viewport.
      posY = THREE.MathUtils.lerp(0, 12, ease)
    }

    obj.rotation.y = rotY
    obj.position.set(0, posY, posZ)
  })

  // Stay completely hidden until the hero section has been scrolled past and the
  // showreel ScrollTrigger starts driving progress > 0. This prevents any edge-on
  // sliver of the plane (or its black backing) from showing through the A-logo.
  const visible = progress > 0 && progress < 1

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
