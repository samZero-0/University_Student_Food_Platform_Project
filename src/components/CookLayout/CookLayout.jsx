
// import Footer from '../HowItWorks/Footer';
import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '../home/navbar/Navbar';

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
