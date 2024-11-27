import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { MdOutlineFastfood } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
// import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);

    return (
        <section className="sticky top-0 z-50 bg-white backdrop-blur-md bg-white/60">
            <section className="md:w-11/12 md:mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
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
                        <NavLink to="/categories" className="btn btn-ghost mr-5">
                            <MdOutlineFastfood className="text-lg" /> Categories
                        </NavLink>
                         {/* <NavLink to='/login' className="btn bg-[#a0e2ff] hidden lg:flex"><AiOutlineLogin className="text-xl" />Login/Signup</NavLink> */}
                        {/* Hamburger menu for small devices */}
                        <div className="lg:hidden">
                            <Hamburger
                                toggled={hamburger}
                                toggle={setHamburger}
                                className="text-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {hamburger && (
                    <div className="absolute top-[64px] left-0 w-full bg-white shadow-lg z-40 lg:hidden" data-aos="fade-down">
                        <ul className="menu menu-vertical p-4" data-aos="fade-up"  data-aos-duration="2000" >
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
