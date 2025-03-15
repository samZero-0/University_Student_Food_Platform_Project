import  { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaSave, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const FeaturedItemsManagement = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all foods and currently featured items
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [foodsResponse, featuredResponse] = await Promise.all([
          axios.get('https://platematebackend.vercel.app/foods'),
          axios.get('https://platematebackend.vercel.app/featuredItems')
        ]);
        
        setAllFoods(foodsResponse.data);
        
        // Create a map of IDs for O(1) lookup
        const featuredIds = new Set(featuredResponse.data.map(item => item._id));
        
        // Mark foods that are already featured
        const updatedFoods = foodsResponse.data.map(food => ({
          ...food,
          isFeatured: featuredIds.has(food._id)
        }));
        
        setAllFoods(updatedFoods);
        setFeaturedItems(featuredResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({
          show: true,
          message: 'Failed to load data. Please try again.',
          type: 'error'
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle checkbox change
  const handleFeaturedToggle = (foodId) => {
    setAllFoods(prevFoods => 
      prevFoods.map(food => 
        food._id === foodId 
          ? { ...food, isFeatured: !food.isFeatured } 
          : food
      )
    );
  };

  // Save featured items
  const saveFeaturedItems = async () => {
    setSaving(true);
    try {
      // Get all items marked as featured
      const itemsToFeature = allFoods.filter(food => food.isFeatured);
      
      // Send to the API
      await axios.post('https://platematebackend.vercel.app/featuredItems', itemsToFeature);
      
      setNotification({
        show: true,
        message: 'Featured items updated successfully!',
        type: 'success'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error saving featured items:', error);
      setNotification({
        show: true,
        message: 'Failed to update featured items. Please try again.',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  // Filter foods based on search term
  const filteredFoods = allFoods.filter(food => 
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </div>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Featured Items Management</h1>
              <p className="text-gray-500">Select which items to feature on your homepage</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={saveFeaturedItems}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-70"
              >
                <FaSave />
                {saving ? 'Saving...' : 'Save Featured Items'}
              </button>
              <div className="bg-orange-100 text-orange-600 rounded-full px-4 py-2 font-medium">
                {allFoods.filter(food => food.isFeatured).length} Selected
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification.show && (
          <div className={`p-4 mb-6 rounded-lg flex items-center ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {notification.type === 'success' ? <FaCheckCircle className="mr-2" /> : <FaExclamationCircle className="mr-2" />}
            {notification.message}
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search by name, category, or seller..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Food Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seller
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((food) => (
                      <tr key={food._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              checked={food.isFeatured} 
                              onChange={() => handleFeaturedToggle(food._id)}
                              className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-md object-cover" 
                              src={food.image} 
                              alt={food.foodName} 
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{food.foodName}</div>
                          <div className="text-sm text-gray-500">ID: {food.foodId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {food.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{food.price} Tk</div>
                          {food.discount > 0 && (
                            <div className="text-xs text-red-500">Discount: {food.discount}%</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 mr-1">{food.rating}</div>
                            <div className="text-yellow-400">★</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {food.sellerName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredFoods.length === 0 && (
                <div className="py-16 text-center text-gray-500">
                  No items found matching your search.
                </div>
              )}
              
              {/* Pagination */}
              {filteredFoods.length > 0 && <Pagination />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedItemsManagement;