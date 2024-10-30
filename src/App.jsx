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

function App() {

  return (
    <>
      <Navbar/>
      
      <Hero/>
      <HowitWorks></HowitWorks>
      <States/>
      <About></About>
      <FeaturedItems></FeaturedItems>
      <BecomeCook></BecomeCook>
      <Outlet></Outlet>

      
    </>
  )
}

export default App
