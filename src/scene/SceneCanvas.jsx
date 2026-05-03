import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, useProgress } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { CameraRig } from './CameraRig'
import { ALogoScene } from './ALogoScene'
import { ShowreelPlane } from './ShowreelPlane'
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
  showreelProgress,
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
          <PerspectiveCamera makeDefault position={[0, 0.5, 12]} fov={45} />
          <CameraRig />
          <ambientLight intensity={0.45} />
          <spotLight position={[8, 14, 12]} intensity={1.35} angle={0.55} penumbra={0.55} />
          <directionalLight position={[-8, 10, 6]} intensity={0.5} />
          <ALogoScene progress={heroProgress} />
          <ShowreelPlane progress={showreelProgress} />
          {mountFooterModel ? <GargoyleScene progress={footerProgress} /> : null}
          <SceneReadyBinder onReady={onSceneReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
