import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Center } from '@react-three/drei'
import { ALogoMesh } from '../r3f/ALogoModel'

const ROT_X = Math.PI / 2
const DESKTOP_SCALE = 10

function getLogoScale(viewportWidth) {
  if (viewportWidth <= 480) return DESKTOP_SCALE * 0.42
  if (viewportWidth <= 768) return DESKTOP_SCALE * 0.48
  return DESKTOP_SCALE
}

/**
 * Hero "A" logo. Pivot is auto-centered, then scaled to fit the viewport,
 * then translated along Z to fly past the camera as the hero scrolls.
 */
export function ALogoScene({ progress }) {
  const group = useRef()
  const viewportWidth = useThree((state) => state.size.width)
  const modelScale = useMemo(() => getLogoScale(viewportWidth), [viewportWidth])

  useFrame(() => {
    if (!group.current) return
    // 0 → camera plane (z = 12). Past z = 12 the logo is behind the camera.
    const z = THREE.MathUtils.lerp(0, 22, progress)
    group.current.position.z = z
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <group scale={modelScale}>
        <Center>
          <group rotation={[ROT_X, 0, 0]}>
            <ALogoMesh />
          </group>
        </Center>
      </group>
    </group>
  )
}
