import React, { useEffect, useState } from 'react'

import { OrbitControls, PerspectiveCamera, ScrollControls } from '@react-three/drei'

import { ALogo } from './ALogo'
import { ShowreelVideo } from './ShowreelVideo'
import WorkScroller from './WorkScroller'
import { FooterModel } from './FooterModel'
import { useFrame } from '@react-three/fiber'

import { easing } from 'maath'
import { LandingPageContent } from './Content'

function LandingPage() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }
``  
  // const pixelWidth = window.screen.availWidth
  // const pixelHeight = window.screen.availHeight
  // console.log("Pixel width and height: ", pixelWidth, pixelHeight)
  const { width, height } = useWindowDimensions();
  // console.log(width ,height, Math.floor(height/100)+1)

  if (width>500){
    useFrame((state, delta) => {
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
      state.camera.lookAt(0, 0, 0) // Look at center
    })
  }

  let minHeight = 0
  if (width>=1750){
    minHeight = 1200
  }else if(width >= 1020 && width<1750){
    minHeight = 1580
  }else if(width>=420 && width<1020){
    minHeight= 1530
  }else if(width>=200 && width<420){
    minHeight = 1590
  }


  return (
    <>
    <ScrollControls pages={minHeight/100}>
      <LandingPageContent />

      <PerspectiveCamera makeDefault fov={100} position={[0, 0, 11]} />
  
      <spotLight
        intensity={80}
        angle={1.2}
        penumbra={0.5}
        position={[0, -1, 10]}
        castShadow
        shadow-bias={-0.0001}
      />
      <ALogo className="logo" />
      <ShowreelVideo />
      <WorkScroller />
      <FooterModel />
    </ScrollControls>

    </>
  )
}

export default LandingPage