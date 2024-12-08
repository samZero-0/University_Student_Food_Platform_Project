
import { 
  FaHome, 
  FaUsers, 
  FaShoppingCart, 
  FaUtensils, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, text, active }) => (
  <li className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{text}</span>
  </li>
);

const DashboardSidebar = () => {
  return (
    <div className="bg-white h-screen w-64 flex flex-col shadow-lg">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <SidebarItem icon={FaHome} text="Dashboard" active={true} />
          <Link to='/admin/users'><SidebarItem icon={FaUsers} text="Users" /></Link>
          <Link to='/admin/orders'><SidebarItem icon={FaShoppingCart} text="Orders" /></Link>
          <SidebarItem icon={FaUtensils} text="Restaurants" />
          <SidebarItem icon={FaChartBar} text="Analytics" />
          <SidebarItem icon={FaCog} text="Settings" />
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center text-red-500 hover:text-red-600 transition-colors">
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;