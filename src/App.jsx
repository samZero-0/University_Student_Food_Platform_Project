import { Outlet } from 'react-router-dom'
import './App.css'
import About from './components/home/About Us/About'
import BecomeCook from './components/home/BecomeCook/BecomeCook'
// import BeforeYouBegin from './components/CookRegistration/BeforeYouBegin'
import FeaturedItems from './components/home/FeaturedItems/FeaturedItems'
import Hero from './components/hero/Hero'
import HowitWorks from './components/HowItWorks/HowitWorks'
import Navbar from './components/navbar/Navbar'
import States from './components/home/states/States'
import WhyTryUs from './components/HowItWorks/WhyTryUs'
import Testimonials from './components/HowItWorks/Testimonials'
import Footer from './components/HowItWorks/Footer'
import { useEffect } from 'react'



function App() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar/>
      <Hero/>
      <HowitWorks></HowitWorks>
      <States/>
      <div id='aboutUs'></div>
      <About></About>
      <FeaturedItems></FeaturedItems>
      <WhyTryUs/>
      <BecomeCook></BecomeCook>
      <Outlet></Outlet>
      <Testimonials />
      <Footer />
      
    </>
  )
}

export default App
