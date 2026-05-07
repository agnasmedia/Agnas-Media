import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, useProgress } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { Suspense, useEffect, useState } from 'react'
import { CameraRig } from './CameraRig'
import { InteractiveSceneLights } from './InteractiveSceneLights'
import { ALogoScene } from './ALogoScene'
import { ShowreelPlane } from './ShowreelPlane'
import { ServicesCloudsScene } from './ServicesCloudsScene'
import { AlienScene } from './AlienScene'

function SceneReadyBinder({ onReady }) {
  const { active } = useProgress()
  useEffect(() => {
    if (!active) {
      onReady?.()
    }
  }, [active, onReady])
  return null
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(m.matches)
    sync()
    m.addEventListener?.('change', sync)
    return () => m.removeEventListener?.('change', sync)
  }, [])
  return reduced
}

export function SceneCanvas({
  heroProgress,
  showreelProgress,
  servicesProgress,
  footerProgress,
  mountFooterModel,
  onSceneReady,
}) {
  const reducedMotion = useReducedMotion()
  // The canvas sits behind the DOM (.canvasLayer is pointer-events: none) so
  // we route R3F's pointer events through documentElement. That way the Fluid
  // distortion effect stays in sync with the cursor while DOM elements above
  // continue to receive clicks/hovers normally.
  const eventSource = typeof document !== 'undefined' ? document.documentElement : undefined

  return (
    <div className="canvasLayer">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.5, 12]} fov={45} />
          <CameraRig />
          <ambientLight intensity={0.22} />
          <hemisphereLight args={['#f0f4ff', '#080810']} intensity={0.35} />
          <directionalLight position={[-5.5, 9.5, 7.5]} intensity={0.42} color="#e8ecff" />
          <Environment preset="city" background={false} environmentIntensity={0.55} />
          <InteractiveSceneLights reducedMotion={reducedMotion} />
          <ALogoScene progress={heroProgress} />
          <ShowreelPlane heroProgress={heroProgress} showreelProgress={showreelProgress} />
          <ServicesCloudsScene progress={servicesProgress} reducedMotion={reducedMotion} />
          {mountFooterModel ? <AlienScene progress={footerProgress} /> : null}
          {!reducedMotion ? (
            <EffectComposer>
              <Fluid
                radius={0.5}
                curl={1.9}
                swirl={4}
                distortion={0.4}
                force={1.1}
                pressure={0.8}
                densityDissipation={0.96}
                velocityDissipation={1.0}
                intensity={2}
                rainbow
                blend={5.0}
              />
            </EffectComposer>
          ) : null}
          <SceneReadyBinder onReady={onSceneReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
