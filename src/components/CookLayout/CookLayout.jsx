
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';

const CookLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default CookLayout;
