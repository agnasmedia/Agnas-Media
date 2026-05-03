import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { GargoyleMesh } from '../r3f/GargoyleModel'

/** Footer gargoyle — rises into frame as footer scroll progresses. */
export function GargoyleScene({ progress }) {
  const root = useRef()

  useFrame(() => {
    if (!root.current) return
    const y = THREE.MathUtils.lerp(-220, -8, progress)
    root.current.position.set(0.2, y, 6.5)
  })

  return (
    <group ref={root} scale={5.5} rotation={[0, -1.45, 0]}>
      <group position={[-0.35, 0.9, -0.8]}>
        <GargoyleMesh />
      </group>
    </group>
  )
}
