import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisProvider } from './lib/LenisProvider'
import { CustomCursor } from './components/CustomCursor'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import './styles/global.css'
import './styles/fonts.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <LenisProvider>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </LenisProvider>
  )
}
