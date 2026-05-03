import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { ALogoMesh } from '../r3f/ALogoModel'

const ROT_X = (89.5 * Math.PI) / 180

/** Hero “A” logo — z-depth driven by scroll progress (legacy ~0→80). */
export function ALogoScene({ progress }) {
  const group = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    if (!group.current) return
    const z = THREE.MathUtils.lerp(0, 80, progress)
    group.current.position.set(0, -6, z)

    const cam = state.camera
    const wide = typeof window !== 'undefined' && window.innerWidth > 900
    if (wide) {
      const tx = pointer.x * 1.4
      const ty = pointer.y * 0.7 + 1.5
      cam.position.x = THREE.MathUtils.lerp(cam.position.x, tx, 0.045)
      cam.position.y = THREE.MathUtils.lerp(cam.position.y, ty, 0.045)
      cam.lookAt(0, 0, 0)
    } else {
      cam.position.x = THREE.MathUtils.lerp(cam.position.x, 0, 0.12)
      cam.position.y = THREE.MathUtils.lerp(cam.position.y, 1.5, 0.12)
      cam.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={group} scale={18} rotation={[ROT_X, 0, 0]}>
      <ALogoMesh />
    </group>
  )
}
