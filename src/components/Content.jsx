import { Scroll } from "@react-three/drei"
import "../App.css"
import Marquee from "./Marquee"
import { motion, useAnimation, useInView } from "framer-motion"
import MagneticButton from "./MagneticButton"
import { useRef, useState } from "react"

import { Link } from "wouter";

import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';
import logoname from '../assets/images/agnas-media---logo-white.png'

export function LandingPageContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });
  return (
    <>
      <Scroll html style={{ width: '100%', height:'100%' }} className="main-wrapper">

        <div className="hero-wrapper">
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
                    <img src={logoname} className="main-logo" /> <span id="registered">®</span>  <br />
                  </motion.span>
                  <motion.span
                    className="heading-text"
                    initial={{ opacity: 0, y: '-15px' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    Unforgettable <br />
                  </motion.span>
                  <motion.span
                    className="heading-text"
                    initial={{ opacity: 0, y: '-15px' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                  >
                    Products & Journeys <br />
                  </motion.span>
                  <motion.span
                    className="heading-text"
                    initial={{ opacity: 0, y: '-15px' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                  >
                   That Drive Growth & Engagement
                  </motion.span>
                </motion.div>


                <div id="menu-bar">
                  <Link to="/portfolio" className="menu-links"><p>Portfolio</p></Link>
                  <Link to="/agency" className="menu-links"><p>Agency</p></Link>
                  <Link to="/contact-us" className="menu-links"><p>Contact</p></Link>
                </div>

                <div className="para1" style={{ color:'white', fontSize: '1.2em', lineHeight: '1.8em', fontWeight: '300'  }}>
                <p>
                Agnas is a full-function creative, digital, PR and Advertising agency.
                We take care of everything from product/brand conceptualization to launch to market.
                We pride ourselves on our ability to craft digital products that 
                not only meet but exceed the expectations of our clients.
                With a wealth of experience and expertise in the field of 
                digital product development, we understand how to design
                user-friendly interfaces that captivate and engage audiences.
                </p>
                </div>

        </div>  
        {/* hero-wrapper END */}

        

        <div className="marquee">
          <Marquee first={"Showreel"} second={"Showreel"}/>
        </div>



      <div className="home-section-3">

        <div className="width-wrap">
                <div className="para2 two">
                  <p>
                    Every project made by agnas 
                    media is created at the intersection
                    between design and technology,
                    making the future — today
                  </p>
                </div>

                <div className="twox-wrap">
                
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
          </div>

      </div> 
      {/* home-section-3 END */}


        <div className="home-section-4">

          <div className="width-wrap">
            <div className="services-main-wrap">
              <div className="services-wrapper">
                <p >Our services:</p>
                <div className="services-list">
                UI/UX Design & Strategy<br />
                <i>Art Direction</i><br />
                Web & Mobile Design<br />
                <i>Content Production</i><br />
                Motion Design<br />
                <i>Branding & Packaging</i><br /> 
                Social & Brand PR<br />
                <i>Front-End & Back-End Development</i>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* home-section-4 END */}
        


        <div className="home-section-5">
          <div className="width-wrap">

            <div className="para2 three" style={{top: `1080vh` }}>
              <p>
                We believe that the power of design,
                creativity, and emotion helps large and
                middle businesses to involve people in their
                products and services, multiplying their
                consumer characteristics
              </p>
            </div>
            
            <div className="we-keep-looking">
            
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
          </div>

        </div>
        {/* home-section-5 END */}


        <div className="home-section-6">

          <div className="width-wrap">
            <div className="recent-works-head">
            Recent Works
            </div>
            <Cursor cursorSize={0} cursorBackgrounColor="#c24040" />
            <WorkCard customClass="work-card-1" img="https://advanced.team/image/project/Alef/alef-preview.jpg" heading="Test Title" description="This is a test" />
            <WorkCard customClass="work-card-2" img="https://advanced.team/image/project/ProtoHomes/protohome-cover-min.jpg" heading="Test Title" description="This is a test" />
            <WorkCard customClass="work-card-3" img="https://advanced.team/image/portfolio/depositprev-progressive.jpg" heading="Test Title" description="This is a test" />
            <WorkCard customClass="work-card-4" img="https://advanced.team/image/portfolio/depositprev-progressive.jpg" heading="Test Title" description="This is a test" />
          </div>

        </div>
        {/* home-section-6 END */}

        <div className="marquee awards">
          <Marquee first={"Awards"} second={"Recognition"}/>
        </div>


        <div className="home-section-7">

          <div className="width-wrap">
              <div className="para4-b">
              <h1 style={{}}>We are proud to be the 2019 "Studio of the Year" at the CSS Design Awards.Our project was also honored as "E-Commerce of the Year" by the Awwwards in 2022.</h1>
            </div>
            <div className="awwards-one">
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
            <div className="awwards-two">
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
            <div className="awwards-three">
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
        </div>

       </div>
       {/* home-section-7 END */}


       <div className="marquee contact">
          <Marquee first={"Contact Us"} second={"Let's Talk"}/>
        </div>
       <div className="footer-wrap">
            <div style={{width:'20%', marginLeft:'1.3vw' }}>
               <h1>Agnas Media US</h1>
               <h1>Main Office</h1>
               <h1>New York City, 10016</h1>
               <h1><a href="mailto:howdy@agnasmedia.com">EMAIL</a></h1>
            </div>
            <div style={{width:'20%', }}>
               <h1>Agnas Media India</h1>
               <h1>Chandigarh, 160001</h1>
               <h1>Punjab, India</h1>
               <h1><a href="mailto:howdy@agnasmedia.com">EMAIL</a></h1>
            </div>
            {/* <div style={{width:'20%', }}>
               <h1>Support from Poland </h1>
               <h1>Los Angeles, 90210</h1>
               <h1>California</h1>
               <h1><a href="mailto:howdy@agnasmedia.com">EMAIL</a></h1>
            </div> */}
            <div style={{width:'20%', paddingLeft:'2.5vw', marginLeft:'2vw' }}>
              <h1><a href="https://www.instagram.com/agnasmedia">Instagram</a></h1>
              <h1><a href="https://www.facebook.com/agnasmedia/">Facebook</a></h1>
              <h1><a href="https://www.dribbble.com/agnasmedia/">Dribble</a></h1>
              <h1><a href="https://www.behance.net/agnasmedia">Behance</a></h1>
            </div>
            <div style={{width:'20%', marginRight:'2vw' }}>
              <h1>Business inquiries</h1>
              <h1>howdy@agnasmedia.com</h1>
              <h1>Internationa: +1 917.259.1089</h1>
              <h1>Asia: +91 999.657.1995</h1>
            </div>
       </div>
        
      </Scroll>
      
    </>
  )
}


function WorkCard({customClass, img, heading, description}){
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });
  return(
    <motion.div ref={ref} initial={{ opacity: 0 }}
    animate={inView ? { opacity: 1, transition: { duration: 1.2 } } : { opacity: 0 }}
     whileHover={{y:-26, transition:{duration:0.4}}} className={'work' + ' ' + customClass}>
        <img data-cursor-text="Read More..." data-cursor-size="180px" data-cursor-color="#c24040" style={{objectFit:"cover", width:"100%", height:"81%"}} src={img} alt="" srcset="" />
        <div className="work-text-wrap">
            <h3>{heading}</h3>
            <h5>{description}
              <span className="work-year">2021</span></h5>
        </div>
     </motion.div>
  )
}