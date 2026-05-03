import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Center } from '@react-three/drei'
import { ALogoMesh } from '../r3f/ALogoModel'

const ROT_X = Math.PI / 2

/**
 * Hero "A" logo. Pivot is auto-centered, then scaled to fit the viewport,
 * then translated along Z to fly past the camera as the hero scrolls.
 */
export function ALogoScene({ progress }) {
  const group = useRef()

  useFrame(() => {
    if (!group.current) return
    // 0 → camera plane (z = 12). Past z = 12 the logo is behind the camera.
    const z = THREE.MathUtils.lerp(0, 22, progress)
    group.current.position.z = z
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <group scale={10}>
        <Center>
          <group rotation={[ROT_X, 0, 0]}>
            <ALogoMesh />
          </group>
        </Center>
      </group>
    </group>
  )
}
