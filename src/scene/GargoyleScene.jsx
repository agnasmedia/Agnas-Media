import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Center } from '@react-three/drei'
import { GargoyleMesh } from '../r3f/GargoyleModel'

/**
 * Footer gargoyle.
 *
 * Footer ScrollTrigger uses the .ctaBand DOM element as its trigger with
 * start='top bottom' / end='bottom top', so progress=0.5 corresponds to the
 * "Let's Talk" button being at the vertical center of the viewport.
 *
 *   progress 0.0  → 0.5  : translates Y from -9 → 0  (rises into the CTA band).
 *   progress 0.5  → 1.0  : gentle parallax,  Y → 3   (drifts up as user scrolls past).
 */
export function GargoyleScene({ progress }) {
  const root = useRef()

  useFrame(() => {
    if (!root.current) return
    const p = THREE.MathUtils.clamp(progress, 0, 1)

    let y
    if (p < 0.5) {
      const t = p / 0.5
      const ease = THREE.MathUtils.smoothstep(t, 0, 1)
      y = THREE.MathUtils.lerp(-9, 0, ease)
    } else {
      const t = (p - 0.5) / 0.5
      y = THREE.MathUtils.lerp(0, 3, t)
    }

    root.current.position.set(0, y, -1)
  })

  // Stay hidden until the CTA band's ScrollTrigger starts driving progress > 0.
  // Without this gate the gargoyle (scale=20) can peek into the bottom of the
  // viewport from earlier sections like Awards/Works once it has been mounted.
  const visible = progress > 0

  return (
    <group ref={root} visible={visible}>
      <group scale={20} rotation={[0, -1.55, 0]} position={[0, 0.5, 0]}>
        <Center>
          <GargoyleMesh />
        </Center>
      </group>
    </group>
  )
}
