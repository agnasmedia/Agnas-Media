import { Scroll } from "@react-three/drei"
import "../App.css"
import Marquee from "./Marquee"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton"
import { useState } from "react"

import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';

export function LandingPageContent() {
  const [cardHovered, setCardHovered] = useState(false)
  return (
    <>
      <Scroll html style={{ width: '100%', height:'100%' }}>

        <motion.div
          className="heading"
          initial={{ rotate: -15, y: '-55%', opacity: 0 }}
          whileInView={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 2, delay: 0 }}
        >
          <motion.span
          className="heading-text"
            initial={{ opacity: 0, y: '-15px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            Agnas Media <span id="registered">®</span>  <br />
          </motion.span>
          <motion.span
            className="heading-text"
            initial={{ opacity: 0, y: '-15px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            Digital Design <br />
          </motion.span>
          <motion.span
            className="heading-text"
            initial={{ opacity: 0, y: '-15px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          >
            Boutique with Focus <br />
          </motion.span>
          <motion.span
            className="heading-text"
            initial={{ opacity: 0, y: '-15px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.8 }}
          >
            on Aesthetics
          </motion.span>
        </motion.div>
  

        <div id="menu-bar" style={{top:'8vh', position: 'absolute', display: 'flex', color: 'white', right: '4em', width: '20vw', justifyContent: 'space-between'}}>
          <p>Portfolio</p>
          <p>Agency</p>
          <p>Services</p>
          <p>Contact</p> 
          <p></p>
        </div>

        <div className="para1" style={{ position: 'absolute', top: `90vh`, left: '11vw', transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.1em', lineHeight: '1.8em', fontWeight: '300'  }}>
        We pride ourselves on our ability to craft digital products that <br />
        not only meet but exceed the expectations of our clients. <br />
        With a wealth of experience and expertise in the field of <br />
        digital product development, we understand how to design <br />
        user-friendly interfaces that captivate and engage audiences.
        </div>

        <div className="marquee" style={{ width: "100%", position: 'absolute', top: `550vh`, transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
          <Marquee first={"Showreel"} second={"Showreel"}/>
        </div>

        <div className="para2" style={{top:'880vh'}}>
          <p>
            Every project made by advanced 
            team is created at the intersection
            between design and technology,
            making the future — today
          </p>
        </div>

        <div style={{width: '100%', position: 'absolute', top: '887vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        
          <MagneticButton>
          <div class="my-button">
              <div style={{textAlign: 'center', transform: 'rotate(45deg)'}}>
                <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="button-arrow" d="M15 40C15 40 15 18.9683 15 -9.53674e-07M15 -9.53674e-07C15 13.7026 1 16.2319 1 16.2319M15 -9.53674e-07C15 13.7026 29 16.2319 29 16.2319" stroke="white" stroke-width="2"></path>
                </svg>
              </div>
            </div>
          </MagneticButton>

          <div className="para3">
            <p>
              With over 200 projects completed, our team has gained a comprehensive understanding
              of user behavior patterns. This knowledge allows us to provide our clients with efficient
              and effective solutions to their digital challenges. By leveraging our experience, we are
              able to achieve maximum efficiency in solving client problems and delivering successful
              outcomes.
            </p>
          </div>
        </div>

        <div style={{ width:'100%', display: 'flex' ,position: 'absolute', top: `1020vh`, transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.2em', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: '60%'}}>
            <p >Our services:</p>
            <div style={{fontSize: '7em' }}>
            UX Strategy<br />
            UI Design <br />
            Development <br />
            Communication<br />
            Example<br />
            Example<br />
            </div>
          </div>
        </div>
        
        <div className="para2" style={{top: `1080vh` }}>
          <p>
            We believe that the power of design,
            creativity, and emotion helps large and
            middle businesses to involve people in their
            products and services, multiplying their
            consumer characteristics
          </p>
        </div>
        
        <div style={{width: '100%', position: 'absolute', top: '1090vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        
          <MagneticButton>
            <div class="my-button">
              <div style={{textAlign: 'center', transform: 'rotate(45deg)'}}>
                <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="button-arrow" d="M15 40C15 40 15 18.9683 15 -9.53674e-07M15 -9.53674e-07C15 13.7026 1 16.2319 1 16.2319M15 -9.53674e-07C15 13.7026 29 16.2319 29 16.2319" stroke="white" stroke-width="2"></path>
                </svg>
              </div>
            </div>
          </MagneticButton>

          <div className="para3">
            <p>
            We keep looking towards the future, at the same time recognizing 
            that behavior change takes place only with a clear awareness of the
            current state. Before we get down to the design, our team conducts
            a thorough audit of how your audience feels. Then we implement an
            emotional solution, attracting Customers to make a click. In this way,
            you stay unique today and will be of current interest no matter what
            awaits you in the future.
            outcomes.
            </p>
          </div>
        </div>

        <div style={{width: "100%", textAlign:'center',position: 'absolute', top: `1160vh`, transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '10.3em' }}>
        Recent Works
        </div>
        <Cursor cursorSize={0} cursorBackgrounColor="#c24040" />
        <WorkCard top="1180vh" left="35%" bottom="-30%" right="" img="https://advanced.team/image/project/Alef/alef-preview.jpg" />
        <WorkCard top="1280vh" left="9%" bottom="" right="" img="https://advanced.team/image/project/ProtoHomes/protohome-cover-min.jpg" />
        <WorkCard top="1320vh" left="" bottom="" right="11%" img="https://advanced.team/image/portfolio/depositprev-progressive.jpg" />
        <WorkCard top="1390vh" left="9%" bottom="" right="" img="https://advanced.team/image/portfolio/depositprev-progressive.jpg" />
        <WorkCard top="1440vh" left="" bottom="" right="11%" img="https://advanced.team/image/portfolio/depositprev-progressive.jpg" />

        <div className="marquee" style={{ width: "100%", position: 'absolute', top: `1560vh`, transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Marquee first={"Awards"} second={"Recognition"}/>
        </div>
        <div style={{ position: 'absolute', top: `1610vh`, left: '14vw', transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.7em', width:'54vw', lineHeight:'3.7vw'}}>
        <h1 style={{}}>We are proud to be the 2019 "Studio of the Year" at the CSS Design Awards.Our project was also honored as "E-Commerce of the Year" by the Awwwards in 2022.</h1>
       </div>
       <div style={{ display: 'flex',flexDirection:'column',width: '50%', position: 'absolute', top: `1650vh`, right: '0', transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.3em' }}>
            <div style={{fontSize:'1.5em', display: 'flex', width: '90%', justifyContent: 'space-between'}}><div>Awwwards</div>  <div>34</div></div>
            <svg style={{ width:'90%',marginTop:'2em'}} width="100%" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="4" />
            </svg>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Site of the Day </div>  <div>09</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Developer Award</div>  <div>04</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Honorable Mention</div>  <div>11</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Ecommerce of the year </div>  <div>05</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Mobile of the Week</div>  <div>01</div></div>
       </div>
       <div style={{ display: 'flex',flexDirection:'column',width: '50%', position: 'absolute', top: `1685vh`, right: '0', transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.3em' }}>
            <div style={{fontSize:'1.5em', display: 'flex', width: '90%', justifyContent: 'space-between'}}><div>The CSS Design Awards</div>  <div>34</div></div>
            <svg style={{ width:'90%',marginTop:'2em'}} width="100%" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="4" />
            </svg>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Site of the Day </div>  <div>09</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Developer Award</div>  <div>04</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Honorable Mention</div>  <div>11</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Ecommerce of the year </div>  <div>05</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Mobile of the Week</div>  <div>01</div></div>
       </div>
       <div style={{ display: 'flex',flexDirection:'column',width: '50%', position: 'absolute', top: `1725vh`, right: '0', transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '1.3em' }}>
            <div style={{fontSize:'1.5em', display: 'flex', width: '90%', justifyContent: 'space-between'}}><div>The FWA</div>  <div>34</div></div>
            <svg style={{ width:'90%',marginTop:'2em'}} width="100%" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="4" />
            </svg>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Site of the Day </div>  <div>09</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Developer Award</div>  <div>04</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Honorable Mention</div>  <div>11</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Ecommerce of the year </div>  <div>05</div></div>
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-between', marginTop: '0.5em', marginBottom: '0.5em'}}><div>Mobile of the Week</div>  <div>01</div></div>
       </div>
       <div className="marquee" style={{ width: "100%", position: 'absolute', top: `1946vh`, transform: `translate3d(0,-100%,0)`, color:'white', fontSize: '4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Marquee first={"Contact Us"} second={"Let's Talk"}/>
        </div>
       <div style={{width:'100%',position: 'absolute', padding:'1vw', display:'flex', gap:'2vw', top:'2000vh',transform: `translate3d(0,-100%,0)`, color:'white', fontSize:'0.5vw', lineHeight:'1vw' }}>
            <div style={{width:'20%', marginLeft:'1.3vw' }}>
               <h1>Heroes from Ukraine</h1>
               <h1>Main Office</h1>
               <h1>Dnipro, 49000</h1>
               <h2>hello@agnasmedia.team</h2>
            </div>
            <div style={{width:'20%', }}>
               <h1>Based in USA</h1>
               <h1>Los Angeles, 90210</h1>
               <h1>California</h1>
               <h2>la@agnasmedia.team</h2>
            </div>
            <div style={{width:'20%', }}>
               <h1>Support from Poland </h1>
               <h1>Los Angeles, 90210</h1>
               <h1>California</h1>
               <h2>la@agnasmedia.team</h2>
            </div>
            <div style={{width:'20%', paddingLeft:'2.5vw', marginLeft:'2vw' }}>
              <h1>Facebook</h1>
              <h1>Instagram</h1>
              <h1>Dribble</h1>
              <h1>Behance</h1>
            </div>
            <div style={{width:'20%', marginRight:'2vw' }}>
              <h2>Business inquiries</h2>
              <h2>hello@agnasmedia.com</h2>
              <h2>agnasmedia</h2>
              <h2>agnasmedia</h2>
            </div>
       </div>
        
      </Scroll>

    </>
  )
}


function WorkCard({top, left, bottom, right, img}){
  return(
    <div data-cursor-text="Read More..." data-cursor-size="180px" data-cursor-color="#c24040" className='work' style={{height:"90vh", width:"33vw", position:'absolute', left:left,bottom:bottom, overflow:"hidden", top:top , right: right }}>
        <img style={{objectFit:"cover", width:"100%", height:"81%"}} src={img} alt="" srcset="" />
        <div style={{height:"20%", width:"100%",color:"whitesmoke", position:"relative", padding:"0.2vw" }}>
            <h3 style={{fontSize:"2.5vw",position: "absolute", display:"inline-block", bottom:"30%"}} >Alef Estate</h3>
            <h5 style={{fontSize:"1vw",position: "absolute", display:"inline-block", bottom:"15%"}}>The site of the day by Awwards
              <span style={{marginLeft:"15vw", fontSize:"1vw"}}>2021</span></h5>
        </div>
    </div>
  )
}