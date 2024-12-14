import { useContext, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { MdOutlineFastfood } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { FaBell, FaCog, FaFileSignature, FaHistory, FaHome, FaPhone, FaShoppingCart, FaSignOutAlt, FaSmile, FaTag, FaUserAlt, } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { AuthContext } from "../../../provider/AuthProvider";

import { Context } from "../../../provider/Context";

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    const {user,logOut} = useContext(AuthContext);
    
    
   const {cookRegistered} = useContext(Context);


    
    return (
        <section className="sticky top-0 z-50 bg-white backdrop-blur-md bg-white/60">
            <section className="md:w-11/12 md:mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                         {/* Hamburger menu for small devices */}
                         <div className="lg:hidden">
                            <Hamburger
                                toggled={hamburger}
                                toggle={setHamburger}
                                className="text-primary"
                            />
                        </div>
                        <img src="/logo-main.png" alt="Logo" className="w-[60px] h-[40px] hidden md:block" />
                        <Link to="/" className="btn btn-ghost text-xl">PlateMate</Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#aboutUs">About</a></li>
                            <li><Link to="/mealPlan">Meal Plan</Link></li>
                        </ul>
                    </div>

                    <div className="navbar-end">
                        <NavLink to="/categories" className="btn btn-ghost mr-5 hidden lg:flex">
                            <MdOutlineFastfood className="text-lg" /> Categories
                        </NavLink>


                        {/* <NavLink to='/login' className="btn bg-[#a0e2ff] hidden lg:flex"><AiOutlineLogin className="text-xl" />Login/Signup</NavLink> */}

                        {user && user.email? (
                   ''
                ) : (
                    <NavLink to='/login' className="btn bg-[#a0e2ff] hidden lg:flex"><AiOutlineLogin className="text-xl" />Login/Signup</NavLink>
                )}



                        {/* profile cart div */}

                        {
                            user && user.email? <div className="flex space-x-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">0</span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                    <div className="card-body">
                                        <span className="text-lg font-bold">0 Items</span>
                                        <span className="text-info">Subtotal: $0</span>
                                        <div className="card-actions">
                                            <button className="btn btn-outline text-secondary btn-block">View cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                
                                
                                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user.photoURL} />
                                    </div>
                                </div> 
                                
                                <ul
                                    tabIndex={0}
                                    className="menu  dropdown-content bg-base-200 rounded-box z-[1] mt-2  w-52 p-2 shadow">
                                    <li>
                                        <Link to='/profile'>
                                            <FaUserAlt className="mr-2" />
                                            Profile
                                            </Link>
                                    </li>
                                    
                                    
                                    {
                                        cookRegistered? <li><Link to='/cookDashboard'><FaHome className="mr-2" />Cook Dashboard</Link></li> : ''
                                    }





                                    <li><Link to='/profile/notification'><FaBell className="mr-2" />Notification</Link></li>
                                    <li><a><FaTag className="mr-2" />Discount&Promo</a></li>
                                    <li><Link to='/orderHistory'><FaShoppingCart className="mr-2" />MyOrders</Link></li>
                                    <li><a><FaHistory className="mr-2" />Payment History</a></li>
                                    <li><Link to='/profile/settings'><FaCog className="mr-2" />Settings</Link></li>
                                    <li><Link to='/contact'><FaPhone className="mr-2" />Contact Us</Link></li>
                                    {/* <li><a><FaSmile className="mr-2" />Feedback</a></li>
                                    <li><a><FaFileSignature className="mr-2" />Terms & Conditions</a></li> */}
                                    <li><button onClick={logOut}><FaSignOutAlt className="mr-2" />Logout</button></li>
                                </ul>
                            </div>
                        </div>:''
                        }



                       
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {hamburger && (
                    <div className="absolute top-[64px] left-0 w-full bg-white shadow-lg z-40 lg:hidden" data-aos="fade-down">
                        <ul className="menu menu-vertical p-4" data-aos="fade-up" data-aos-duration="2000" >
                            <li>
                                <Link to="/" onClick={() => setHamburger(false)}>Home</Link>
                            </li>
                            <li>
                                <a href="#aboutUs" onClick={() => setHamburger(false)}>About</a>
                            </li>
                            <li>
                                <Link to="/mealPlan" onClick={() => setHamburger(false)}>Meal Plan</Link>
                            </li>
                            <li>
                                <Link to="/categories" onClick={() => setHamburger(false)}>Categories</Link>
                            </li>
                            <li className="hover:bg-[#a0e2ff]">
                                <a href="/login" onClick={() => setHamburger(false)}>Login</a>
                            </li>
                            <li className="hover:bg-[#a0e2ff]">
                                <a href="/" onClick={() => setHamburger(false)}>SignUp</a>
                            </li>
                        </ul>
                    </div>
                )}
            </section>
        </section>
    );
};

export default Navbar;
