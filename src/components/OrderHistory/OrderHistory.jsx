// import { BsThreeDots, BsStar } from 'react-icons/bs';
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
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://platematebackend.vercel.app/orders/${user?.email}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      });
  }, [user]);

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
              {orders.length} Orders
            </span>
          </div>
        </div>

        {/* Tabs and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto">
              <button className="px-6 py-2.5 bg-orange-50 text-orange-600 rounded-full font-medium flex items-center gap-2 hover:bg-orange-100 transition-colors">
                <FaBox className="w-4 h-4" />
                Orders
              </button>
              <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-full font-medium flex items-center gap-2 transition-colors">
                <FaTruck className="w-4 h-4" />
                Not Yet Shipped
              </button>
              <button className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-full font-medium flex items-center gap-2 transition-colors">
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
          {orders.map((order) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}