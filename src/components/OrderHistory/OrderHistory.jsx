import ReactStars from "react-rating-stars-component";
import { FaChevronDown, FaBox, FaTruck, FaBan, FaCalendarAlt, FaShoppingBag } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'notShipped', 'cancelled'
  const [timeFilter, setTimeFilter] = useState('3months');
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://platematebackend.vercel.app/orders/${user?.email}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      });
  }, [user]);

  // Filter orders based on active tab and time filter
  const getFilteredOrders = () => {
    let filtered = [...orders];
    
    // Apply time filter
    if (timeFilter === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter(order => new Date(order.orderDate) >= threeMonthsAgo);
    }
    
    // Apply tab filter
    if (activeTab === 'notShipped') {
      filtered = filtered.filter(order => !order.shipped && !order.cancelled);
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(order => order.cancelled);
    } else {
      // 'all' tab shows all orders regardless of status
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // Handle cancel order
  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => {
      if (order._id === orderId) {
        return { ...order, cancelled: true };
      }
      return order;
    }));
    
    // Here you would also make an API call to update the order status in the backend
    // axios.post(`https://platematebackend.vercel.app/orders/cancel/${orderId}`)
    //   .then(response => {
    //     console.log('Order cancelled successfully');
    //   })
    //   .catch(error => {
    //     console.error('Error cancelling order:', error);
    //   });
  };

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaShoppingBag className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
                <p className="text-gray-500">Track and manage your orders</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium">
              {filteredOrders.length} Orders
            </span>
          </div>
        </div>

        {/* Tabs and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto">
              <button 
                className={`px-6 py-2.5 ${activeTab === 'all' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('all')}
              >
                <FaBox className="w-4 h-4" />
                Orders
              </button>
              <button 
                className={`px-6 py-2.5 ${activeTab === 'notShipped' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('notShipped')}
              >
                <FaTruck className="w-4 h-4" />
                Not Yet Shipped
              </button>
              <button 
                className={`px-6 py-2.5 ${activeTab === 'cancelled' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('cancelled')}
              >
                <FaBan className="w-4 h-4" />
                Cancelled Orders
              </button>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <FaCalendarAlt className="w-4 h-4" />
              Past 3 Months
              <FaChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-gray-500 text-lg">No orders found in this category</div>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-accent p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Order placed</div>
                    <div className="font-medium text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="font-medium text-gray-900">{order.shipmentTotal} Tk</div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-sm text-gray-500">Order ID</div>
                    <div className="font-medium text-gray-900">{order._id}</div>
                  </div>
                </div>

                {/* Order Status */}
                {order.cancelled && (
                  <div className="bg-red-50 px-6 py-3 text-red-700 font-medium">
                    This order has been cancelled
                  </div>
                )}

                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div key={index} className="p-6 flex flex-col sm:flex-row gap-6">
                      <img 
                        src={item.image} 
                        alt={item.foodName} 
                        className="w-full sm:w-48 h-48 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.foodName}</h3>
                          <div className="mt-1 text-lg font-medium text-orange-600">{item.price} Tk</div>
                          <div className="mt-2 text-gray-600">Quantity: {item.quantity}</div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Link to={`/categories`}>
                            <button className="px-6 py-2.5 bg-primary text-black rounded-full font-medium hover:bg-orange-600 transition-colors">
                              Buy Again 
                            </button>
                          </Link>
                          
                          {!order.cancelled && !order.shipped && (
                            <button 
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-6 py-2.5 bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition-colors"
                            >
                              Cancel Order
                            </button>
                          )}
                          
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-600">Rate Your Experience</div>
                            <ReactStars
                              count={5}
                              size={24}
                              activeColor="#f97316"
                              color="#e5e7eb"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}