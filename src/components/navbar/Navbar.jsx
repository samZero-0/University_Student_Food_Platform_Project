import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

const Navbar = () => {
    const [hamburger, setHamburger] = useState(false);

    return (
        <section className="w-11/12 mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">PlateMate</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-ghost mr-5">Categories</a>
                    <a className="btn">Login</a>
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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box -left-14 z-[1] mt-3 p-2 shadow">
                                <li><a>Home</a></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
