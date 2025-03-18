import ReactStars from "react-rating-stars-component";
import { FaChevronDown, FaBox, FaTruck, FaBan, FaCalendarAlt, FaShoppingBag, FaClock, FaCheck, FaExclamationTriangle, FaFilter, FaStar, FaReceipt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'notShipped', 'shipped', 'cancelled'
  const [timeFilter, setTimeFilter] = useState('3months');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [submittingRating, setSubmittingRating] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://platematebackend.vercel.app/orders/${user?.email}`)
      .then((response) => {
      // Sort orders by date, newest first
        const sortedOrders = response.data.sort((a, b) => 
          new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load your orders. Please try again.");
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
    } else if (timeFilter === '6months') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filtered = filtered.filter(order => new Date(order.orderDate) >= sixMonthsAgo);
    } else if (timeFilter === '1year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = filtered.filter(order => new Date(order.orderDate) >= oneYearAgo);
    }
    // 'all' timeFilter shows all time orders
    
    // Apply tab filter
    if (activeTab === 'notShipped') {
      filtered = filtered.filter(order => !order.shipped && !order.cancelled);
    } else if (activeTab === 'shipped') {
      filtered = filtered.filter(order => order.shipped && !order.cancelled);
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(order => order.cancelled);
    } else {
      // 'all' tab shows all orders regardless of status
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();


  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
  
        // Make API call to cancel order
        axios.post(`https://platematebackend.vercel.app/orders/cancel/${orderId}`)
          .then(response => {
            // Update local state
            setOrders(orders.map(order => {
              if (order._id === orderId) {
                return { ...order, cancelled: true };
              }
              return order;
            }));
            toast.success('Order cancelled successfully');
            setLoading(false);
          })
          .catch(error => {
            console.error('Error cancelling order:', error);
            toast.error('Failed to cancel order. Please try again.');
            setLoading(false);
          });
      }
    });
  };

  // Handle rating submission
  const handleRatingChange = (orderId, itemId, newRating) => {
    setSubmittingRating(true);
    
    // API call to submit rating
    axios.post(`https://platematebackend.vercel.app/ratings`, {
      orderId,
      itemId,
      rating: newRating,
      userId: user?.email
    })
    .then(response => {
      toast.success('Thank you for your rating!');
      
      // Update local state
      setOrders(orders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            items: order.items.map(item => {
              if (item._id === itemId) {
                return { ...item, userRating: newRating };
              }
              return item;
            })
          };
        }
        return order;
      }));
      setSubmittingRating(false);
    })
    .catch(error => {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again.');
      setSubmittingRating(false);
    });
  };

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getOrderStatusInfo = (order) => {
    if (order.cancelled) {
      return {
        icon: <FaBan className="w-5 h-5 text-red-500" />,
        text: "Cancelled",
        bgColor: "bg-red-50",
        textColor: "text-red-700"
      };
    } else if (order.shipped) {
      return {
        icon: <FaCheck className="w-5 h-5 text-green-500" />,
        text: "Shipped",
        bgColor: "bg-green-50",
        textColor: "text-green-700"
      };
    } else {
      return {
        icon: <FaClock className="w-5 h-5 text-amber-500" />,
        text: "Processing",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700"
      };
    }
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <FaShoppingBag className="w-10 h-10 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
                <p className="text-gray-500">Track and manage your order history</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium flex items-center gap-2">
                <FaReceipt className="w-4 h-4" />
                {filteredOrders.length} Orders
              </div>
              {orders.length > 0 && !orders[0].shipped && !orders[0].cancelled && (
                <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium flex items-center gap-2">
                  <FaExclamationTriangle className="w-4 h-4" />
                  New Order Placed
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Latest Order Alert */}
        {orders.length > 0 && !orders[0].shipped && !orders[0].cancelled && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-blue-800">Your most recent order is being processed</h2>
                <p className="text-blue-600">Order {orders[0]._id.substring(0, 8)}... placed on {formatDateTime(orders[0].orderDate)}</p>
              </div>
              <Link to={`/tracking/${orders[0]._id}`}>
                <button className="px-6 py-2.5 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
                  Track Order
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Tabs and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button 
                className={`px-6 py-2.5 ${activeTab === 'all' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('all')}
              >
                <FaBox className="w-4 h-4" />
                All Orders
              </button>
              <button 
                className={`px-6 py-2.5 ${activeTab === 'notShipped' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('notShipped')}
              >
                <FaClock className="w-4 h-4" />
                Processing
              </button>
              <button 
                className={`px-6 py-2.5 ${activeTab === 'shipped' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('shipped')}
              >
                <FaTruck className="w-4 h-4" />
                Shipped
              </button>
              <button 
                className={`px-6 py-2.5 ${activeTab === 'cancelled' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'} rounded-full font-medium flex items-center gap-2 transition-colors`}
                onClick={() => setActiveTab('cancelled')}
              >
                <FaBan className="w-4 h-4" />
                Cancelled
              </button>
            </div>
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              >
                <FaFilter className="w-4 h-4" />
                {timeFilter === '3months' && 'Past 3 Months'}
                {timeFilter === '6months' && 'Past 6 Months'}
                {timeFilter === '1year' && 'Past Year'}
                {timeFilter === 'all' && 'All Time'}
                <FaChevronDown className={`w-3 h-3 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showTimeDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button 
                      className={`block w-full text-left px-4 py-2 text-sm ${timeFilter === '3months' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setTimeFilter('3months');
                        setShowTimeDropdown(false);
                      }}
                    >
                      Past 3 Months
                    </button>
                    <button 
                      className={`block w-full text-left px-4 py-2 text-sm ${timeFilter === '6months' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setTimeFilter('6months');
                        setShowTimeDropdown(false);
                      }}
                    >
                      Past 6 Months
                    </button>
                    <button 
                      className={`block w-full text-left px-4 py-2 text-sm ${timeFilter === '1year' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setTimeFilter('1year');
                        setShowTimeDropdown(false);
                      }}
                    >
                      Past Year
                    </button>
                    <button 
                      className={`block w-full text-left px-4 py-2 text-sm ${timeFilter === 'all' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        setTimeFilter('all');
                        setShowTimeDropdown(false);
                      }}
                    >
                      All Time
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <FaShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No orders found in this category</div>
              <Link to="/categories">
                <button className="mt-6 px-6 py-2.5 bg-primary text-black rounded-full font-medium hover:bg-orange-600 transition-colors">
                  Browse Categories
                </button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getOrderStatusInfo(order);
              const isExpanded = expandedOrderId === order._id;
              
              return (
                <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-accent p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Order placed</div>
                      <div className="font-medium text-gray-900">
                        {formatDateTime(order.orderDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total Amount</div>
                      <div className="font-medium text-gray-900">{order.shipmentTotal} Tk</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Order ID</div>
                      <div className="font-medium text-gray-900">{order._id.substring(0, 8)}...</div>
                    </div>
                    <div className="md:text-right">
                      <button 
                        onClick={() => toggleOrderDetails(order._id)}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 md:ml-auto"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                        <FaChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Order Status */}
                  <div className={`px-6 py-3 flex items-center justify-between ${statusInfo.bgColor}`}>
                    <div className={`font-medium flex items-center gap-2 ${statusInfo.textColor}`}>
                      {statusInfo.icon}
                      {statusInfo.text}
                    </div>
                    
                    {!order.cancelled && !order.shipped && (
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-4 py-1.5 bg-white text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors border border-red-200"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {/* Order Items - Collapsed Summary */}
                  {!isExpanded && (
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                          {order.items.slice(0, 3).map((item, index) => (
                            <img 
                              key={index} 
                              src={item.image} 
                              alt={item.foodName} 
                              className="w-12 h-12 rounded-full object-cover border-2 border-white"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                              <span className="text-sm font-medium">+{order.items.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div>
                        {order.shipped && !order.reviewed && (
                          <div className="flex items-center gap-2 text-amber-600">
                            <FaStar className="w-4 h-4" />
                            <span className="text-sm font-medium">Rate your experience</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Order Items - Expanded Details */}
                  {isExpanded && (
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
                              <Link to={`/food/${item.foodId}`} className="hover:text-orange-500 transition-colors">
                                <h3 className="text-xl font-bold text-gray-900">{item.foodName}</h3>
                              </Link>
                              <div className="mt-1 text-lg font-medium text-orange-600">{item.price} Tk</div>
                              <div className="mt-2 text-gray-600">Quantity: {item.quantity}</div>
                              {item.specialInstructions && (
                                <div className="mt-2 text-gray-600">
                                  <span className="font-medium">Special Instructions:</span> {item.specialInstructions}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <Link to={`/food/${item.foodId}`}>
                                <button className="px-6 py-2.5 bg-primary text-black rounded-full font-medium hover:bg-orange-600 transition-colors">
                                  Buy Again 
                                </button>
                              </Link>
                              
                              {!order.cancelled && order.shipped && (
                                <div className="space-y-2">
                                  <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                    <FaStar className="text-amber-500" />
                                    Rate Your Experience
                                  </div>
                                  <ReactStars
                                    count={5}
                                    onChange={(newRating) => handleRatingChange(order._id, item._id, newRating)}
                                    size={24}
                                    value={item.userRating || 0}
                                    activeColor="#f97316"
                                    color="#e5e7eb"
                                    isHalf={false}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Delivery Information */}
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Delivery Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Delivery Address</div>
                            <div className="font-medium text-gray-900">{order.deliveryAddress || "Not specified"}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Contact Number</div>
                            <div className="font-medium text-gray-900">{order.contactNumber || "Not specified"}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Information */}
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Payment Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Payment Method</div>
                            <div className="font-medium text-gray-900">{order.paymentMethod || "Cash on Delivery"}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Subtotal</div>
                            <div className="font-medium text-gray-900">{order.subtotal || order.shipmentTotal} Tk</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Delivery Fee</div>
                            <div className="font-medium text-gray-900">{order.deliveryFee || "0"} Tk</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="p-6 bg-gray-50">
                        <div className="flex flex-wrap gap-4">
                          <Link to="/contact">
                            <button className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition-colors">
                              Need Help?
                            </button>
                          </Link>
                          {order.shipped && (
                            <Link to="/feedback">
                              <button className="px-6 py-2.5 bg-amber-100 text-amber-700 rounded-full font-medium hover:bg-amber-200 transition-colors">
                                Leave Feedback
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}