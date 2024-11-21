
// import Footer from '../HowItWorks/Footer';
import { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';

const CookLayout = () => {

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
     
    </>
  );
};

export default CookLayout;
