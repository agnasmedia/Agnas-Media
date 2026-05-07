import { useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisProvider } from './lib/LenisProvider'
import { SceneCanvas } from './scene/SceneCanvas'
import { CustomCursor } from './components/CustomCursor'
import { Hero } from './sections/Hero/Hero'
import { Showreel } from './sections/Showreel/Showreel'
import { Mission } from './sections/Mission/Mission'
import { Services } from './sections/Services/Services'
import { Works } from './sections/Works/Works'
import { Awards } from './sections/Awards/Awards'
import { Footer } from './sections/Footer/Footer'
import './styles/global.css'
import './styles/fonts.css'
import styles from './App.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [heroProgress, setHeroProgress] = useState(0)
  const [showreelProgress, setShowreelProgress] = useState(0)
  const [servicesProgress, setServicesProgress] = useState(0)
  const [footerProgress, setFooterProgress] = useState(0)
  const [mountFooterModel, setMountFooterModel] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  const onHeroProgress = useCallback((v) => {
    setHeroProgress(v)
  }, [])

  const onShowreelProgress = useCallback((v) => {
    setShowreelProgress(v)
  }, [])

  const onServicesProgress = useCallback((v) => {
    setServicesProgress(v)
  }, [])

  const onFooterProgress = useCallback((v) => {
    setFooterProgress(v)
  }, [])

  const onSceneReady = useCallback(() => {
    setSceneReady(true)
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    queueMicrotask(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <LenisProvider>
      <CustomCursor />
      {!sceneReady ? (
        <div className={styles.loader} role="status" aria-live="polite">
          <div className={styles.loaderTrack}>
            <div className={styles.loaderBar} />
          </div>
          <span className="visuallyHidden">Loading…</span>
        </div>
      ) : null}
      <SceneCanvas
        heroProgress={heroProgress}
        showreelProgress={showreelProgress}
        servicesProgress={servicesProgress}
        footerProgress={footerProgress}
        mountFooterModel={mountFooterModel}
        onSceneReady={onSceneReady}
      />
      <div className={`mainSurface ${styles.main}`}>
        <Hero onHeroProgress={onHeroProgress} />
        <Showreel onShowreelProgress={onShowreelProgress} />
        <Mission
          id="mission"
          quote={
            <>
              Every project made by Agnas Media is created at the intersection between design and technology,
              making the future — today
            </>
          }
          aside="With over 200 projects completed, our team has gained a comprehensive understanding of user behavior patterns. This knowledge allows us to provide our clients with efficient and effective solutions to their digital challenges. By leveraging our experience, we are able to achieve maximum efficiency in solving client problems and delivering successful outcomes."
          linkHref="https://agnasmedia.com/team"
          linkLabel="Read more about us"
        />
        <Services onServicesProgress={onServicesProgress} />
        <Mission
          id="beliefs"
          quote={
            <>
              We believe that the power of design, creativity, and emotion helps large and middle businesses to
              involve people in their products and services, multiplying their consumer characteristics
            </>
          }
          aside="We keep looking towards the future, at the same time recognizing that behavior change takes place only with a clear awareness of the current state. Before we get down to the design, our team conducts a thorough audit of how your audience feels. Then we implement an emotional solution, attracting Customers to make a click. In this way, you stay unique today and will be of current interest no matter what awaits you in the future."
          linkHref="https://agnasmedia.com/ru/services"
          linkLabel="Read more about our services"
        />
        <Works />
        <Awards />
        <Footer
          onFooterProgress={onFooterProgress}
          onRequestFooterModel={() => setMountFooterModel(true)}
        />
      </div>
    </LenisProvider>
  )
}
