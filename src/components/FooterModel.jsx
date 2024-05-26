import { Html, Image, Text, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

import mailLogo from "../assets/images/agnas-logo.png"

export function FooterModel(props) {
  const ref = useRef()
  const scroll = useScroll()
  const tl = useRef();

  const gltf = useLoader(GLTFLoader, './models/alien.glb');

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // LOGO ANIMATION
    tl.current.to(
      ref.current.position,
      {
        duration: 100,
        y: 1,
      },
      0
    );
  }, []);
 


  return <group ref={ref} position={[0, -300, 7]}>
    <primitive scale= {6} object={gltf.scene} rotation={[0,0.33,0]} position={[-0.4, 1.1, -1]} />
    <mesh scale={5} position={[0, 0.7, 1]} onClick={()=>{window.open("https://www.youtube.com/watch?v=Csip8i-TZMI")}}>
      <circleGeometry args={[0.08, 42]} />
      <meshBasicMaterial color="#c24040" />
      <Text scale={0.02} position={[0,0,0.01]}>Let's Talk</Text>
    </mesh>
  </group> ;
}