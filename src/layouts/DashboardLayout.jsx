import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";


const DashboardLayout = () => {
    return (
        <div >
            
            <div className="flex min-h-screen">
            <aside className="w-72 sticky top-0 h-screen bg-white shadow-md">
            <DashboardSidebar></DashboardSidebar>
            </aside>
            <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
            </div>


            
        </div>
    );
};

export default DashboardLayout;