import { useState, useEffect, useContext } from 'react';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BIRDS from "vanta/dist/vanta.birds.min";
import GLOBE from "vanta/dist/vanta.globe.min";
import { AuthContext } from '../../contextApi/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {createAccount,setUser,signIn} = useContext(AuthContext)

  useEffect(() => {
    const birdsEffect = BIRDS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: "#76fb74",
      backgroundAlpha: 0.0,
    });

    return () => birdsEffect.destroy();
  }, []);

  useEffect(() => {
    const globeEffect = GLOBE({
      el: "#bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: "#76fb74",
      color2: "#a0e2ff",
      size: 2.0,
      backgroundColor: 0xffffff,
    });

    return () => globeEffect.destroy();
  }, []);

  const toggleAuthMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsTransitioning(false);
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;

    signIn(email, pass)
      .then(res => {
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
        toast("Login successful");
      })
      .catch(err => {
        toast.error(`Login Failed: ${err.message}`);
      });

    
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName =form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const photoUrl = form.photo.value;

    if (regex.test(password)) {
      createAccount(email, password)
        .then((result) => {
          const currentUser = result.user;
          console.log(currentUser);
          setUser(currentUser);
          updateProfile(currentUser, { displayName: fullName ,photoURL :photoUrl })
            .then(() => {
              navigate('/');
            })
            .catch(err => {
              toast.error(`Registration Failed: ${err}`);
            })
        })
        .catch((error) => {
          toast.error(`Registration Failed: ${error}`);
        });
    } else {
      setError('Password must have an uppercase letter, lowercase letter, and a length of at least 6 characters.');
    }




    
  };

  return (
    <div
      id="bg"
      className="min-h-screen flex items-center justify-center bg-gray-200 drop-shadow-2xl"
    >
      <ToastContainer></ToastContainer>
      <div
        id="vanta"
        className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row md:w-3/4 max-w-4xl"
      >
        <div className="w-full md:w-1/2 p-5">
          <img
            src="/login.png"
            alt="Auth Illustration"
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          <p className="text-gray-500 mb-8">
            {isSignUp
              ? "Create an account to get started!"
              : "Log in to your account"}
          </p>

          {/* Conditional Forms */}
          {isSignUp ? (
            <form
              onSubmit={handleSignUp}
              className={`w-full max-w-sm transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    required
                    name='name'
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    required
                    name='email'
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
                    name='password'
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    
                    name='confirmPassword'
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type="url"
                    placeholder="Photo URL"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    
                    name='photo'
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
              >
                Sign Up
              </button>
              {error && <div className="text-sm font-bold text-red-500 py-5">{error}</div>}
            </form>
          ) : (
            <form
              onSubmit={handleLogin}
              className={`w-full max-w-sm transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mb-5">
                <label className="flex items-center border-b border-gray-300 py-2">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    required
                    name='email'
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
                    name='password'
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
              >
                Login
              </button>
            </form>
          )}

          <button
            onClick={toggleAuthMode}
            className="mt-6 text-sm text-blue-500 hover:underline transition duration-300"
          >
            {isSignUp
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
