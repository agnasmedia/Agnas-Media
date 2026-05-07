import { useMemo, useRef } from 'react'
import { Cloud, Clouds } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CLOUD_CONFIG = {
  segments: 20,
  volume: 7,
  opacity: 0.5,
  fade: 10,
  growth: 4,
  speed: 0.12,
}

const CLOUDS = [
  { seed: 1, color: '#d8dbe2', position: [2.4, 0, 0] },
  { seed: 2, color: '#d3bebe', position: [10.6, 0.2, -0.6] },
  { seed: 3, color: '#becbc4', position: [-10.8, -0.3, -0.8] },
  { seed: 4, color: '#8f9ebd', position: [1.2, 0.1, -7.6] },
  { seed: 5, color: '#aaa9c7', position: [-1.2, -0.2, 7.2] },
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
  const keyLightRef = useRef()
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

    if (keyLightRef.current) {
      keyLightRef.current.position.set(px * 10, 8 + py * 5, 4)
      keyLightRef.current.intensity = 70 * visual.opacity
    }
  })

  if (reducedMotion) return null

  return (
    <group ref={groupRef} visible={visual.visible}>
      <spotLight ref={keyLightRef} position={[0, 8, 4]} decay={0} distance={48} penumbra={1} intensity={70 * visual.opacity} />
      <spotLight position={[-13, -1, 4]} color="#8a2d2d" angle={0.22} decay={0} penumbra={0.65} intensity={18 * visual.opacity} />
      <spotLight position={[13, -5, 4]} color="#99443d" angle={0.25} decay={0} penumbra={0.7} intensity={16 * visual.opacity} />
      <Clouds material={THREE.MeshLambertMaterial} limit={360} range={80}>
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
        <Cloud
          concentrate="outside"
          growth={92}
          color="#b895a2"
          opacity={0.68 * visual.opacity}
          seed={0.3}
          bounds={180}
          volume={180}
          fade={24}
        />
      </Clouds>
    </group>
  )
}
