import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { AiOutlineLogin } from "react-icons/ai";
import { MdOutlineFastfood } from "react-icons/md"; 
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);

    return (
        <section className="sticky top-0 z-50 bg-white  backdrop-blur-md bg-white/60">

        <section className="md:w-11/12 md:mx-auto ">
            <div className="navbar">
                <div className="navbar-start">
                    <img src="/public/logo2-removebg-preview.png" alt="" className='w-[50px] h-[50px] hidden md:block' />
                    <a className="btn btn-ghost text-xl">PlateMate</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                        <li><a href="#aboutUs">About</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <NavLink to='/categories'className="btn btn-ghost mr-5"><MdOutlineFastfood className="text-lg" />Categories</NavLink>
                    <NavLink to='/login' className="btn bg-[#a0e2ff] hidden lg:flex"><AiOutlineLogin className="text-xl" />Login/Signup</NavLink>
                    {/* Hamburger menu for small devices */}
                    <div className="dropdown ml-2 lg:hidden">
                        <Hamburger
                            toggled={hamburger}
                            toggle={setHamburger}
                            onToggle={(toggled) => {
                                if (toggled) {
                                    setHamburger(true);
                                } else {
                                    setHamburger(false);
                                }
                            }}
                        />
                        {hamburger && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box -left-12 z-[1] mt-3 p-2 shadow">
                                <li><Link to='/'>Home</Link></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                                <li className="hover:bg-[#a0e2ff]"><a>Login</a></li>
                                <li className="hover:bg-[#a0e2ff]"><a>SignUp</a></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </section>
    );
};

export default Navbar;
