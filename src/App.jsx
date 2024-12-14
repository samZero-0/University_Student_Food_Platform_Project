import { Outlet } from 'react-router-dom'
import './App.css'
import About from './components/home/About Us/About'
import BecomeCook from './components/home/BecomeCook/BecomeCook'
// import BeforeYouBegin from './components/CookRegistration/BeforeYouBegin'
import FeaturedItems from './components/home/FeaturedItems/FeaturedItems'
import Hero from './components/home/hero/Hero'
import HowitWorks from './components/home/HowItWorks/HowitWorks'
import Navbar from './components/home/navbar/Navbar'
import States from './components/home/states/States'
import WhyTryUs from './components/home/HowItWorks/WhyTryUs'
import Testimonials from './components/home/HowItWorks/Testimonials'
import Footer from './components/home/HowItWorks/Footer'
import { useContext, useEffect } from 'react'
import { Context } from './provider/Context'



function App() {

  const {cookRegistered} = useContext(Context);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar/>
      <Hero></Hero>
      <HowitWorks></HowitWorks>
      <States/>
      <div id='aboutUs'></div>
      <About></About>
      <FeaturedItems></FeaturedItems>
      <WhyTryUs/>
      { cookRegistered? '': <BecomeCook></BecomeCook>
        
      }
      <Outlet></Outlet>
      <Testimonials />
      <Footer />
      
    </>
  )
}

export default App
