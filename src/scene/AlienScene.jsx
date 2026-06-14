import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Center } from '@react-three/drei'
import { AlienMesh } from '../r3f/AlienModel'

/**
 * Footer alien — scroll-driven Y (tuned to the CTA band at progress ≈ 0.5).
 *
 *   progress 0.0 → 0.5 : Y from -9 → 0 (rises into CTA band).
 *   progress 0.5 → 1.0 : Y 0 → 3 (light parallax).
 */
export function AlienScene({ progressRef }) {
  const root = useRef()

  useFrame(() => {
    if (!root.current || !progressRef) return

    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1)

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
    root.current.visible = p > 0
  })

  return (
    <group ref={root} visible={false}>
      <group scale={15} rotation={[0, 0.5, 0]} position={[0, 0.5, 0]}>
        <Center>
          <AlienMesh />
        </Center>
      </group>
    </group>
  )
}
