import { Outlet } from 'react-router-dom'
import './App.css'
import About from './components/About Us/About'
import BecomeCook from './components/BecomeCook/BecomeCook'
// import BeforeYouBegin from './components/CookRegistration/BeforeYouBegin'
import FeaturedItems from './components/FeaturedItems/FeaturedItems'
import Hero from './components/hero/Hero'
import HowitWorks from './components/HowItWorks/HowitWorks'
import Navbar from './components/navbar/Navbar'
import States from './components/states/States'
import WhyTryUs from './components/HowItWorks/WhyTryUs'
import Testimonials from './components/HowItWorks/Testimonials'
import Footer from './components/HowItWorks/Footer'

function App() {

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
