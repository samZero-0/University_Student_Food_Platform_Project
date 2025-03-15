import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ListOrdered,
  Star,
  DollarSign,
  ShoppingCart,
  PlusCircle,
  ChefHat,
  ArrowLeft,
  Menu
} from 'lucide-react';
import AllCategories from '../../components/Categories/AllCategories';
import FoodListing from '../../components/Cook/FoodListing';
import CookHome from './CookHome';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const CookDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    category: '',
    foodName: '',
    price: '',
    description: '',
    image: '',
    ingredients: '',
    allergens: '',
    calories: '',
    fat: '',
    protein: '',
    carbs: '',
    preparationTime: '',
    servingSize: '',
    additionalInfo: '',
  });

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'Create Listing', icon: PlusCircle },
    { id: 'ratings', label: 'Ratings', icon: Star },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'sold', label: 'Sold Foods', icon: ShoppingCart },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4">
            <CookHome />
          </div>
        );
     
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Your Food Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.foodName} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.foodName}</h3>
                      <p className="text-gray-600 mb-2">{item.category}</p>
                      <p className="text-green-600 font-bold">${item.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'ratings':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Your Ratings</h2>
            <p className="text-gray-600">View your customer ratings and feedback here.</p>
          </div>
        );
      case 'transactions':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Transaction History</h2>
            <p className="text-gray-600">View your recent transactions here.</p>
          </div>
        );
      case 'sold':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Sold Foods</h2>
            <p className="text-gray-600">Track your sold food items here.</p>
          </div>
        );
      case 'create':
        return (
          <div className="w-full">
            <FoodListing />
          </div>
        );
      default:
        return null;
    }
  };

  const NavItem = ({ item, isMobile = false }) => (
    <Button
      variant={activeTab === item.id ? "secondary" : "ghost"}
      className={`w-full justify-start ${activeTab === item.id ? 'bg-blue-100 text-blue-800' : ''}`}
      onClick={() => setActiveTab(item.id)}
    >
      <item.icon className="mr-2 h-5 w-5" />
      {item.label}
    </Button>
  );

  const Sidebar = ({ isMobile = false }) => (
    <div className="space-y-2 py-4">
      <div className="px-3 py-2">
        <div className="mb-4 flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-800">Cook Dashboard</h2>
        </div>
      </div>
      <div className="space-y-1 px-3">
        {menuItems.map((item) => (
          <NavItem key={item.id} item={item} isMobile={isMobile} />
        ))}
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r bg-white">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden absolute left-4 top-4">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="h-full">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default CookDashboard;