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
import AuthPage from './components/Login-Signup/AuthPage.jsx';
import LoginSignupLayout from './components/Login-Signup/LoginSignupLayout.jsx';
import FoodDetails from './components/FoodDetails/FoodDetails.jsx';
import ContexProvider from './provider/ContexProvider.jsx';
import MealPlanner from './components/Meal Plan/MealPlanPage.jsx';
import MealPlanDetails from './components/Meal Plan/MealPlanDetails.jsx';
import MealDetails from './components/Meal Plan/MealDetails.jsx';
import ViewCartDetails from './pages/cart/ViewCartDetails.jsx';
import CheckoutPage from './pages/CheckoutForm.jsx';
import BkashPayment from './pages/bkashPayment.jsx';
import CardPayment from './pages/cart/CardPayment.jsx';
import UserProfile from './pages/profile/UserProfile.jsx';
import ProfileLayout from './layouts/ProfileLayout.jsx';
import Notification from './components/ProfileComponents/Notification.jsx';
import Settings from './components/ProfileComponents/Settings.jsx';
import OrderHistory from './components/OrderHistory/OrderHistory.jsx';
import ContactPage from './components/home/Contact US/ContactPage.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import AdminUserManagement from './pages/Admin/AdminUserManagement.jsx';
import AdminOrderManagement from './pages/Admin/AdminOrderManagement.jsx';
import AddCategories from './pages/Admin/AddCategories.jsx';
import CookDashboard from './pages/Cook/CookDashboard.jsx';
import CookApplications from './pages/Admin/CookApplications.jsx';
import PaymentHistory from './pages/profile/PaymentHistory';
import DiscountPromo from './pages/profile/DiscountPromo';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    
    children: [],
  },
  {
    path: '/joinAsCook',
    element: <CookLayout />,
    children: [
      { path: '', element: <BeforeYouBegin /> },
    ],
  },
  {
    path: '/cookReg',
    element: <CookLayout />,
    children: [
      { path: '', element: <CookRegistrationPage /> },
    ],
  },
  {
    path: '/success',
    element: <CookLayout />,
    children: [
      { path: '', element: <SuccessPage /> },
    ],
  },
  {
    path: '/categories',
    element: <CookLayout />,
    children: [
      { path: '', element: <AllCategories /> },
    ],
  },
  {
    path: '/login',
    element: <LoginSignupLayout />,
    children: [
      { path: '', element: <AuthPage /> },
    ],
  },
  {
    path: '/checkout',
    element: <CookLayout />,
    children: [
      { path: '', element: <CheckoutPage></CheckoutPage> },
    ],
  },
  {
    path: '/bkash',
    element: <CookLayout />,
    children: [
      { path: '', element: <BkashPayment></BkashPayment> },
    ],
  },
  {
    path: '/card',
    element: <CookLayout />,
    children: [
      { path: '', element: <CardPayment></CardPayment> },
    ],
  },
  {
   
    path: '/details/:_id',
    element: <CookLayout />,
    children: [
      { path: '', element: <FoodDetails /> },
      { path: '/details/:_id/viewcartdetails', 
        element: <ViewCartDetails/> 
      },
    ],
  },
  {
    path: '/mealPlan',
    element: <CookLayout />,
    children: [
      { path: '', element: <MealPlanner /> },
    ],
  },
  {
    
    path: '/MealPlanPage/:planType',
    element: <CookLayout />,
    children: [
      { path: '', element: <MealPlanDetails /> },
      
    ],
  },
  {
    
    path: '/mealDetails/:mealId',
    element: <CookLayout />,
    children: [
      { path: '', element: <MealDetails /> },
    ],
  },
  {
    
    path: '/orderHistory',
    element: <CookLayout />,
    children: [
      { path: '', element: <OrderHistory /> },
    ],
  },
  {
    
    path: '/contact',
    element: <CookLayout />,
    children: [
      { path: '', element: <ContactPage /> },
    ],
  },
  {
    
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      { path: '', element:<Dashboard></Dashboard> },
      { path: 'users', element:<AdminUserManagement></AdminUserManagement> },
      { path: 'orders', element:<AdminOrderManagement></AdminOrderManagement>},
      { path: 'addCategories', element:<AddCategories></AddCategories>},
      { path: 'applications', element:<CookApplications></CookApplications>},
    ],
  },
  {
    
    path: '/profile',
    element: <ProfileLayout />,
    children: [
      { path: '', element: <UserProfile></UserProfile>},
      {path: '/profile/notification', element: <Notification></Notification>},
      {path: '/profile/settings', element: <Settings></Settings>},
    ],
  },
  {
    path: '/cookDashboard',
    element: <CookDashboard></CookDashboard>,
    
  },
  {
    path: '/paymentHistory',
    element: <PaymentHistory></PaymentHistory>,
  },
  {
    path:'/discountPromo',
    element:<DiscountPromo></DiscountPromo>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ContexProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </ContexProvider>
    </AuthProvider>
  </StrictMode>
);
