import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Key / rim / accent point lights in a slow orbit with pointer follow — reads as
 * light moving around the hero A, showreel plane, and footer alien without
 * per-object rigging.
 */
export function InteractiveSceneLights({ reducedMotion = false }) {
  const mainRef = useRef()
  const rimRef = useRef()
  const accentRef = useRef()
  const { pointer } = useThree()
  const timeRef = useRef(0)
  const goalMain = useMemo(() => new THREE.Vector3(), [])
  const goalRim = useMemo(() => new THREE.Vector3(), [])
  const goalAccent = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (!reducedMotion) timeRef.current += delta

    const t = reducedMotion ? 1.15 : timeRef.current * 0.19
    const px = reducedMotion ? 0 : pointer.x
    const py = reducedMotion ? 0 : pointer.y

    const r = 12.8
    const cx = Math.cos(t * 0.88) * r
    const cz = Math.sin(t * 0.72) * r * 0.68 + 9.2
    const cy = 4.4 + Math.sin(t * 0.33) * 1.9 + py * 4.8

    goalMain.set(cx + px * 6.8, cy, cz + px * 2.2)
    goalRim.set(-cx * 0.74 - px * 3.2, 2.9 - py * 3.6, -cz * 0.46 + 3.8)
    goalAccent.set(7.2 + px * 5.2, -1.1 + py * 2.6, 7.4 + py * 3.2)

    const kMain = reducedMotion ? 0.12 : 0.072
    const kRim = reducedMotion ? 0.1 : 0.062
    const kAccent = reducedMotion ? 0.09 : 0.055

    if (mainRef.current) mainRef.current.position.lerp(goalMain, kMain)
    if (rimRef.current) rimRef.current.position.lerp(goalRim, kRim)
    if (accentRef.current) accentRef.current.position.lerp(goalAccent, kAccent)
  })

  return (
    <>
      <pointLight ref={mainRef} color="#fff2e8" intensity={2.8} distance={80} decay={2} />
      <pointLight ref={rimRef} color="#b8ceff" intensity={1.35} distance={72} decay={2} />
      <pointLight ref={accentRef} color="#ff6a5c" intensity={1.05} distance={56} decay={2} />
    </>
  )
}
