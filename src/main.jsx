import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import BeforeYouBegin from './components/CookRegistration/BeforeYouBegin.jsx';
import CookLayout from './components/CookLayout/CookLayout.jsx';
import CookRegistrationPage from './components/CookRegistration/CookRegistrationPage.jsx';
import SuccessPage from './components/CookRegistration/SuccessPage.jsx';
import AllCategories from './components/Categories/AllCategories.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/joinAsCook',
    element: <CookLayout></CookLayout>,
    children: [
      {
        path: '',
        element: <BeforeYouBegin />,
      },
      
      
    ],
  },
  {
    path: '/cookReg',
    element: <CookLayout></CookLayout>,
    children: [
      {
        path: '',
        element: <CookRegistrationPage />,
      },
      
      
    ],
  },
  {
    path: '/success',
    element: <CookLayout></CookLayout>,
    children: [
      {
        path: '',
        element: <SuccessPage />,
      },
      
      
    ],
  },
  {
    path: '/categories',
    element: <CookLayout></CookLayout>,
    children: [
      {
        path: '',
        element: <AllCategories />,
      },
      
      
    ],
  }
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
