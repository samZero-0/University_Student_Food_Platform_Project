import { BsThreeDots, BsStar } from 'react-icons/bs';
import ReactStars from "react-rating-stars-component";
import { FaChevronDown } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../../provider/AuthProvider";

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const  [loading,setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true)
    axios.get(`https://platematebackend.vercel.app/orders/${user?.email}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false)
      });

    
  }, [user]);

  console.log(orders);

  if(loading){
    return <h1>loading</h1>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans flex flex-col gap-12">
      <h1 className="text-xl font-medium mb-6">
        Your Orders <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{orders.length}</span>
      </h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6 border-b">
          <button className="px-4 py-2 border-b-2 border-black font-medium">Orders</button>
          <button className="px-4 py-2 text-gray-600">Not Yet Shipped</button>
          <button className="px-4 py-2 text-gray-600">Cancelled Orders</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          Past 3 Months
          <FaChevronDown className="text-sm" />
        </button>
      </div>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-6 space-y-6   ">
          <div className="flex justify-between">
            <div className="grid gap-1">
              <div className="text-sm text-gray-600">Order placed</div>
              <div>{new Date(order.orderDate).toLocaleDateString()}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm text-gray-600">Total</div>
              <div>{order.shipmentTotal} Tk</div>
            </div>
            <div className="grid gap-1 text-right">
              <div className="text-sm text-gray-600">Order ID</div>
              <div>{order._id}</div>
            </div>
          </div>

          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 pt-4">
              <img 
                src={item.image} 
                alt={item.foodName} 
                className="w-52 h-52 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-2xl mb-2">{item.foodName}</h3>
                <div className="text-lg text-gray-600 mb-4">{item.price} Tk</div>
                <div className="text-lg text-gray-600 mb-4">Quantity: {item.quantity}</div>
                <div className="flex gap-2 ">
                  <button className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-green-800 font-semibold">
                    Buy Again
                  </button>

                <div className='flex flex-col ml-5'>
                  <span>Rate Your Experience</span>

                  <ReactStars
    count={5}
    // onChange={}
    size={24}
    activeColor="#ffd700"

  />

                </div>

                  


                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
