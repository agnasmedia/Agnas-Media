import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const BASE = new THREE.Vector3(0, 0.5, 12)

/** Light pointer-driven parallax shared by every scene. */
export function CameraRig() {
  const { camera, pointer } = useThree()
  const target = useRef(BASE.clone())

  useFrame(() => {
    const wide = typeof window !== 'undefined' && window.innerWidth > 900
    const sx = wide ? pointer.x * 1.4 : pointer.x * 0.5
    const sy = wide ? pointer.y * 0.7 : pointer.y * 0.25
    target.current.set(sx, BASE.y + sy, BASE.z)
    camera.position.lerp(target.current, 0.09)
    camera.lookAt(0, 0, 0)
  })

  return null
}

CameraRig.BASE = BASE
