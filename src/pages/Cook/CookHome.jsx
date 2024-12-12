import { useContext, useEffect, useState } from 'react';
import { 
  ChefHat, 
  ShoppingBag, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';

export default function CookHome() {

    const {user} = useContext(AuthContext);

    const [foodItems,setFoodItems] = useState([]);

    useEffect(()=>{
        fetch(`https://platematebackend.vercel.app/foods/${user.email}`)
        .then(res => res.json())
        .then(data => setFoodItems(data))
    },[])
  
  const stats = [
    { label: 'Total Sales', value: '$4,385.00', icon: DollarSign, trend: '+12.5%' },
    { label: 'Items Sold', value: '465', icon: ShoppingBag, trend: '+8.2%' },
    { label: 'Active Listings', value: '12', icon: TrendingUp, trend: '+3.1%' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, trend: '+0.3%' }
  ];

  return (
    <div className="min-h-screen ">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="ml-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200"
              alt="Chef"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.displayName}!</h1>
              
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New Dish
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Food Listings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <div key={item._id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold mb-1">{item.foodName}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">${item.price}</span>
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-4 h-4 text-white/90" />
                      <span className="text-white/90">20 sold</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}