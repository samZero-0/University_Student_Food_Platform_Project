import { useState } from 'react';
import { FiHome, FiList, FiStar, FiDollarSign, FiShoppingCart, FiPlusCircle } from 'react-icons/fi';
import AllCategories from '../../components/Categories/AllCategories';
import FoodListing from '../../components/Cook/FoodListing';



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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFoodItem({ ...newFoodItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFoodItems([...foodItems, newFoodItem]);
    setNewFoodItem({
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
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Cook Dashboard</h2>
            <p className="text-gray-600">Here you can manage your food listings, view ratings, and track your sales.</p>
            
          </div>
        );
      case 'listings':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Food Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <img src={item.image} alt={item.foodName} className="w-full h-48 object-cover rounded-md mb-2" />
                  <h3 className="text-xl font-semibold">{item.foodName}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ratings':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Ratings</h2>
            <p className="text-gray-600">View your customer ratings and feedback here.</p>
          </div>
        );
      case 'transactions':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <p className="text-gray-600">View your recent transactions here.</p>
          </div>
        );
      case 'sold':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Sold Foods</h2>
            <p className="text-gray-600">Track your sold food items here.</p>
          </div>
        );

      case 'create':
        return (
        
            <div className='w-full'>
                 <FoodListing></FoodListing>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#a0e2ff] text-black font-bold">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Cook Dashboard</h1>
        </div>
        <nav className="mt-4 ">
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'home' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <FiHome className="mr-2" /> Home
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'create' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <FiPlusCircle className="mr-2" /> Create Listing
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'listings' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <FiList className="mr-2" /> Food Listings
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'ratings' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('ratings')}
          >
            <FiStar className="mr-2" /> Ratings
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'transactions' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <FiDollarSign className="mr-2" /> Transactions
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${activeTab === 'sold' ? 'bg-indigo-500' : ''}`}
            onClick={() => setActiveTab('sold')}
          >
            <FiShoppingCart className="mr-2" /> Sold Foods
          </a>
         
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white ">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {/* <h1 className="text-3xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1> */}
          </div>
        </header>
        <main>{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default CookDashboard;