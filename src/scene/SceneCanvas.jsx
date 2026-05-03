import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { ALogoScene } from './ALogoScene'
import { GargoyleScene } from './GargoyleScene'

function SceneReadyBinder({ onReady }) {
  const { active } = useProgress()
  useEffect(() => {
    if (!active) {
      onReady?.()
    }
  }, [active, onReady])
  return null
}

export function SceneCanvas({
  heroProgress,
  footerProgress,
  mountFooterModel,
  onSceneReady,
}) {
  return (
    <div className="canvasLayer">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 10]} fov={48} />
          <ambientLight intensity={0.38} />
          <spotLight position={[8, 14, 12]} intensity={1.35} angle={0.55} penumbra={0.55} />
          <directionalLight position={[-8, 10, 6]} intensity={0.45} />
          <ALogoScene progress={heroProgress} />
          {mountFooterModel ? <GargoyleScene progress={footerProgress} /> : null}
          <SceneReadyBinder onReady={onSceneReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
