

import { useContext, useEffect, useState } from "react"
import { FaCreditCard,  FaTruck } from "react-icons/fa"
import { Context } from "../provider/Context";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";

export default function CheckoutPage() {



  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading,setLoading] = useState(false);
  const { carts, quantity, subtotal, shipmentTotal } = useContext(Context);
    console.log(carts);


    


    const handleCheckoutSubmission = async (event) => {
      setLoading(true);
      event.preventDefault();
    
      
      const formData = new FormData(event.target);
      const billingDetails = Object.fromEntries(formData.entries());
    
      
      const cartDetails = carts.map((item) => ({
        foodName: item.foodName || item.mealName,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        discountedPrice: (item.price - item.price * (item.discount / 100)).toFixed(2),
      }));
    
    
      const orderData = {
        billingDetails,
        cartDetails,
        subtotal,
        shipmentTotal,
        paymentMethod,
      };
    
      try {
        const response = await axios.post(
          "https://platematebackend.vercel.app/guestOrders",
          orderData
        );
        console.log("Order successfully placed:", response.data);
        setLoading(false);
        toast.success("Order successfully placed! Please check your email");

      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
      }
    };
    



  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
        <Toaster position="top-center" reverseOrder={false} 
              toastOptions={{
                style: {
                  width: "300px", // Adjust width
                  height: "100px", // Adjust height
                  fontSize: "16px", // Adjust font size (optional)
                  padding: "20px", // Add padding for better spacing (optional)
                },
              }}
          />
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Checkout</h1>
      <div className="py-10">
      <div className="mb-4">
           <Link  to='/login'>
           <button className="w-full flex justify-between items-center text-left font-normal py-3 px-4 bg-white hover:bg-pink-100  rounded-md ">
              <span>Returning Customer?</span>
              <span className="text-pink-600">Click here to Login</span>
            </button></Link>
          </div>
          <div className="mb-4">
            <button className="w-full flex justify-between items-center text-left font-normal py-3 px-4 bg-white hover:bg-pink-100  rounded-md">
              <span>Have a coupon?</span>
              <span className="text-pink-600">Click here to enter code</span>
            </button>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
         
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
            <form className="grid gap-4" onSubmit={handleCheckoutSubmission}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block mb-1">First Name*</label>
                  <input name="first-name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="First Name" required />
                </div>
                <div>
                  <label htmlFor="last-name" className="block mb-1">Last Name*</label>
                  <input name="last-name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Last Name"  required/>
                </div>
              </div>
              <div>
                <label htmlFor="company-name" className="block mb-1">Company Name (optional)</label>
                <input name="company-name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Company Name" required />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1">Region*</label>
                <select id="country" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select Area</option>
                  <option value="us">A</option>
                  <option value="ca">B</option>
                  <option value="uk">C</option>
                </select>
              </div>
              <div>
                <label htmlFor="street-address" className="block mb-1">Detail Address*</label>
                <input name="street-address" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Street Address" required/>
              </div>
              
              
              
              <div>
                <label htmlFor="phone" className="block mb-1">Phone*</label>
                <input name="phone" type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Phone" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email Address*</label>
                <input name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Email Address" required/>
              </div>

              <div>
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <label htmlFor="notes" className="block mb-2">Order notes (optional)</label>
            <textarea name="notes" className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]" placeholder="Notes about your order, e.g. special notes for delivery." />
          </div>

              {
                loading? <span className="loading loading-ring loading-lg"></span> : <button type="submit" className="w-full mt-6 bg-primary hover:bg-pink-600 text-black py-4 px-6 rounded-md text-lg font-semibold">
                Place Order →
              </button>
              }
            
            </form>
          </div>
          
        </div>
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            <div className="grid gap-2">
            {carts.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <span><img src={item.image} className="w-16 h-12 rounded-md" alt="" /></span>
                  <span>{item.foodName || item.mealName} (x{item.quantity})</span>
                  <span>৳{((item.price - (item.price * (item.discount / 100))) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
             
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold">Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold">Delivery Fee</span>
                <span>100</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total</span>
                <span>{shipmentTotal}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="grid gap-2">
            {[
  { id: "credit-card", icon: FaCreditCard, label: "Credit Card" },
  { id: "cash-on-delivery", icon: FaTruck, label: "Cash on Delivery" },
  { id: "bkash", icon: "/BKash.png", label: "Pay with Bkash" }, // Path to PNG
].map((method) => (
  <label
    key={method.id}
    className={`flex items-center p-3 rounded-md cursor-pointer ${
      paymentMethod === method.id ? "bg-gray-100" : "bg-white border"
    }`}
  >
    <input
      type="radio"
      name="payment-method"
      id={method.id}
      value={method.id}
      checked={paymentMethod === method.id}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="mr-2"
    />
    {typeof method.icon === "string" ? (
      <img
        src={method.icon}
        alt={method.label}
        className="mr-2 h-5 w-5"
      />
    ) : (
      <method.icon className="mr-2 h-5 w-5" />
    )}
    {method.label}
  </label>
))}

            </div>
            <p className="text-sm mt-4 text-gray-600">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
           
          </div>
        </div>
      </div>
    </div>
  )
}

