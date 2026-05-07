import { useMemo, useRef } from 'react'
import { Cloud, Clouds } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CLOUD_CONFIG = {
  segments: 18,
  volume: 6,
  opacity: 0.3,
  fade: 16,
  growth: 4,
  speed: 0.12,
}

const CLOUDS = [
  { seed: 1, color: '#9da1a9', position: [2.4, 0.1, 0] },
  { seed: 2, color: '#9a9ea6', position: [10.6, 0.2, -0.6] },
  { seed: 3, color: '#9c9fa7', position: [-10.8, -0.3, -0.8] },
  { seed: 4, color: '#94989f', position: [1.2, 0.1, -7.6] },
  { seed: 5, color: '#989ca4', position: [-1.2, -0.2, 7.2] },
]

function smoothstep(edge0, edge1, value) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function getVisualState(progress) {
  const p = THREE.MathUtils.clamp(progress, 0, 1)
  const enter = smoothstep(0.02, 0.18, p)
  const exit = 1 - smoothstep(0.8, 0.98, p)
  const presence = enter * exit
  const centerPull = p < 0.5 ? 1 - enter : 1 - exit

  return {
    opacity: presence,
    scale: THREE.MathUtils.lerp(1, 0.06, centerPull),
    z: THREE.MathUtils.lerp(-5.8, -18, centerPull),
    spin: centerPull,
    visible: presence > 0.01,
  }
}

export function ServicesCloudsScene({ progress = 0, reducedMotion = false }) {
  const groupRef = useRef()
  const { pointer } = useThree()
  const visual = useMemo(() => getVisualState(progress), [progress])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const time = state.clock.elapsedTime
    const px = reducedMotion ? 0 : pointer.x
    const py = reducedMotion ? 0 : pointer.y
    const spin = reducedMotion ? 0 : visual.spin

    group.visible = visual.visible
    group.position.set(px * 1.3, -0.1 + py * 0.55, visual.z)
    const scale = THREE.MathUtils.lerp(group.scale.x, visual.scale, 0.18)
    group.scale.setScalar(scale)
    group.rotation.x = Math.sin(time * 0.42) * 0.12 + py * 0.12 + spin * 0.72
    group.rotation.y += delta * (0.08 + spin * 2.2)
    group.rotation.z = px * -0.08
  })

  if (reducedMotion) return null

  // MeshBasicMaterial ignores scene lights so the clouds keep a predictable
  // mid-grey tone instead of flaring whenever a scene light passes over them.
  return (
    <group ref={groupRef} visible={visual.visible}>
      <Clouds material={THREE.MeshBasicMaterial} limit={200} range={60}>
        {CLOUDS.map((cloud) => (
          <Cloud
            key={cloud.seed}
            {...CLOUD_CONFIG}
            seed={cloud.seed}
            bounds={[6.8, 1.15, 1.25]}
            color={cloud.color}
            opacity={CLOUD_CONFIG.opacity * visual.opacity}
            position={cloud.position}
          />
        ))}
      </Clouds>
    </group>
  )
}
