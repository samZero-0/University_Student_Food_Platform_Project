import { useState } from 'react';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useEffect } from "react";
import BIRDS from "vanta/dist/vanta.birds.min"; 
import GLOBE from "vanta/dist/vanta.globe.min"; 



const AuthPage = () => {
  
  useEffect(() => {
    const effect = BIRDS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color1: '#76fb74',
      // color2: '#a0e2ff',
      colorMode: "lerpGradient",
      backgroundAlpha: 0.00

    }); 

    return () => effect.destroy();
  }, []);

  useEffect(() => {
    const effect = GLOBE({
      el: "#bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: '#76fb74',
      color2: '#a0e2ff',
      size: 2.00,
      backgroundColor: 0xffffff

    }); 

    return () => effect.destroy();
  }, []);







  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsTransitioning(false);
    }, 500); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');

  };



  return (
    <div id='bg' className="min-h-screen flex items-center justify-center bg-gray-200 drop-shadow-2xl " >
      <div id='vanta' className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row md:w-3/4 max-w-4xl
      
      motion-scale-in-[0.04] motion-translate-x-in-[-63%] motion-translate-y-in-[-3%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.48s]/scale motion-delay-[0.22s]/scale motion-duration-[0.53s]/translate motion-duration-[0.57s]/opacity motion-duration-[0.66s]/rotate motion-duration-[0.70s]/blur motion-ease-bounce
      ">
        <div className="w-full md:w-1/2 p-5">
          <img 
            src="/login.png"
            alt="Auth Illustration"
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <p className="text-gray-500 mb-8">{isSignUp ? 'Create an account to get started!' : 'Log in to your account'}</p>
          
          <form onSubmit={handleSubmit} className={`w-full max-w-sm transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {isSignUp && (
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    required 
                  />
                </label>
              </div>
            )}
            
            <div className="mb-5">
              <label className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                  required 
                />
              </label>
            </div>

            <div className="mb-5">
              <label className="flex items-center border-b border-gray-300 py-2">
                <FaLock className="text-gray-400 mr-3" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                  required 
                />
              </label>
            </div>

            {isSignUp && (
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaLock className="text-gray-400 mr-3" />
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    required 
                  />
                </label>
              </div>
            )}

            <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <button
            onClick={toggleAuthMode}
            className="mt-6 text-sm text-blue-500 hover:underline transition duration-300"
          >
            {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
