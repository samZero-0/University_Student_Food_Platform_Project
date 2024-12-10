import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/home/navbar/Navbar";

const ProfileLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex w-full justify-center mt-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-600">
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) =>
                                `text-lg ${isActive ? "text-gray-400 " : "text-gray-600"}`
                            }
                        >
                            My profile
                        </NavLink>
                        <span className="text-gray-300">|</span>
                        <NavLink
                            to="/profile/notification"
                            className={({ isActive }) =>
                                `text-lg ${isActive ? "text-gray-400 " : "text-gray-600"}`
                            }
                        >
                            Notification
                        </NavLink>
                        <span className="text-gray-300">|</span>
                        <NavLink
                            to="/profile/settings"
                            className={({ isActive }) =>
                                `text-lg ${isActive ? "text-gray-400 " : "text-gray-600"}`
                            }
                        >
                            Settings
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default ProfileLayout;
