import { useContext, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { MdOutlineFastfood } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { FaBell, FaCog, FaHistory, FaHome, FaPhone, FaShoppingCart, FaSignOutAlt,  FaTag, FaUserAlt, } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { AuthContext } from "../../../provider/AuthProvider";
import { Context } from "../../../provider/Context";

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);
    const {user, logOut} = useContext(AuthContext);
    const {cookRegistered, carts} = useContext(Context);

    const navLinkClasses = ({ isActive }) => `
        relative 
        transition-all 
        duration-300 
        hover:text-primary
        before:content-[''] 
        before:absolute 
        before:-bottom-1 
        before:left-0 
        before:w-0 
        before:h-[2px] 
        before:rounded-full 
        before:opacity-0 
        before:transition-all 
        before:duration-300 
        before:bg-primary 
        hover:before:w-full 
        hover:before:opacity-100
        ${isActive ? 
            'text-primary before:w-full before:opacity-100 font-medium' : 
            'text-base-content'
        }
    `;

    const categoryNavLinkClasses = ({ isActive }) => `
        btn btn-ghost mr-5 hidden lg:flex
        relative overflow-hidden
        transition-all duration-300
        after:content-['']
        after:absolute
        after:h-full
        after:w-full
        after:top-0
        after:left-0
        after:bg-primary
        after:opacity-0
        after:scale-x-0
        after:origin-left
        after:transition-transform
        after:duration-300
        hover:after:opacity-10
        hover:after:scale-x-100
        ${isActive ? 'text-primary after:opacity-10 after:scale-x-100' : ''}
    `;

    const loginNavLinkClasses = ({ isActive }) => `
        btn bg-[#a0e2ff] hidden lg:flex
        transform transition-transform duration-300 
        hover:scale-105 
        hover:shadow-md
        active:scale-95
        ${isActive ? 'bg-[#7cd4ff] shadow-md' : ''}
    `;

    return (
        <section className="sticky top-0 z-50 bg-white backdrop-blur-md bg-white/60">
            <section className="md:w-11/12 md:mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="lg:hidden">
                            <Hamburger
                                toggled={hamburger}
                                toggle={setHamburger}
                                className="text-primary"
                            />
                        </div>
                        <img src="/logo-main.png" alt="Logo" className="w-[60px] h-[40px] hidden md:block" />
                        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent hover:text-primary transition-colors duration-300">PlateMate</Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2">
                            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                            <li><a href="#aboutUs" className={navLinkClasses}>About</a></li>
                            <li><NavLink to="/mealPlan" className={navLinkClasses}>Meal Plan</NavLink></li>
                        </ul>
                    </div>

                    <div className="navbar-end">
                        <NavLink to="/categories" className={categoryNavLinkClasses}>
                            <MdOutlineFastfood className="text-lg" /> Categories
                        </NavLink>

                        <div className="dropdown dropdown-end pl-3 pr-3">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors duration-300">
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
                                    <span className="badge badge-sm indicator-item">{carts ? carts.length : '0'}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">{carts ? carts.length : '0'} Items</span>
                                    <div className="card-actions">
                                        {carts && carts.length > 0 ? (
                                            <Link to="/details/:_id/viewcartdetails">
                                                <button className="btn btn-outline text-secondary btn-block hover:scale-105 transition-transform duration-300">
                                                    View cart
                                                </button>
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user && user.email ? (
                            ''
                        ) : (
                            <NavLink to='/login' className={loginNavLinkClasses}>
                                <AiOutlineLogin className="text-xl" />Login/Signup
                            </NavLink>
                        )}

                        {user && user.email ? (
                            <div className="flex space-x-2">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-transparent hover:ring-primary transition-all duration-300">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User avatar"
                                                src={user.photoURL?.split('?')[0]} />
                                        </div>
                                    </div>
                                    
                                    <ul
                                        tabIndex={0}
                                        className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-2 w-52 p-2 shadow">
                                        <li>
                                            <NavLink to='/profile' className={navLinkClasses}>
                                                <FaUserAlt className="mr-2" />
                                                Profile
                                            </NavLink>
                                        </li>
                                        
                                        {cookRegistered && (
                                            <li>
                                                <NavLink to='/cookDashboard' className={navLinkClasses}>
                                                    <FaHome className="mr-2" />Cook Dashboard
                                                </NavLink>
                                            </li>
                                        )}

                                        <li>
                                            <NavLink to='/profile/notification' className={navLinkClasses}>
                                                <FaBell className="mr-2" />Notification
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/discountPromo' className={navLinkClasses}>
                                                <FaTag className="mr-2" />Discount&Promo
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/orderHistory' className={navLinkClasses}>
                                                <FaShoppingCart className="mr-2" />MyOrders
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/paymentHistory' className={navLinkClasses}>
                                                <FaHistory className="mr-2" />Payment History
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/profile/settings' className={navLinkClasses}>
                                                <FaCog className="mr-2" />Settings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/contact' className={navLinkClasses}>
                                                <FaPhone className="mr-2" />Contact Us
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={logOut} 
                                                className="hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                                            >
                                                <FaSignOutAlt className="mr-2" />Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {hamburger && (
                    <div className="absolute top-[64px] left-0 w-full bg-white shadow-lg z-40 lg:hidden" data-aos="fade-down">
                        <ul className="menu menu-vertical p-4" data-aos="fade-up" data-aos-duration="2000">
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-primary/10 transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href="#aboutUs" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-primary/10 transition-colors duration-300"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <Link 
                                    to="/mealPlan" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-primary/10 transition-colors duration-300"
                                >
                                    Meal Plan
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/categories" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-primary/10 transition-colors duration-300"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href="/login" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-[#a0e2ff] transition-colors duration-300"
                                >
                                    Login
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/" 
                                    onClick={() => setHamburger(false)}
                                    className="hover:bg-[#a0e2ff] transition-colors duration-300"
                                >
                                    SignUp
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </section>
        </section>
    );
};

export default Navbar;