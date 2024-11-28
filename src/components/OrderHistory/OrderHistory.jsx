import { BsThreeDots, BsStar } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { FaChevronDown } from 'react-icons/fa'

export default function OrderHistory() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-xl font-medium mb-6">
        Your Orders <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">1</span>
      </h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6 border-b">
          <button className="px-4 py-2 border-b-2 border-black font-medium">Orders</button>
          <button className="px-4 py-2 text-gray-600">Not Yet Shipped</button>
          <button className="px-4 py-2 text-gray-600">Cancelled Orders</button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          Past 3 Month
          <FaChevronDown className="text-sm" />
        </button>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <div className="flex justify-between">
          <div className="grid gap-1">
            <div className="text-sm text-gray-600">Order placed</div>
            <div>November 25, 2024</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm text-gray-600">Total</div>
            <div>150Tk</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm text-gray-600">Ship to</div>
            <div>Jane Smith</div>
          </div>
          <div className="grid gap-1 text-right">
            <div className="text-sm text-gray-600">Order # 112-0822160-5390023</div>
            <div className="space-x-4">
              <button className="text-green-700 hover:underline">View order details</button>
              <button className="text-green-700 hover:underline">View invoice</button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-100 p-4 flex items-start">
          <BsStar className="text-lg mt-1" />
          <div className="ml-2">Please rate your experience with the seller</div>
          <button className="ml-auto">
            <IoMdClose className="text-lg" />
          </button>
        </div>

     

        <div className="flex items-start gap-4 pt-4">
          <img 
            src="https://i.ibb.co.com/twG8hmm/biryani.jpg" 
            alt="Samsung 980 PRO SSD" 
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium mb-2">
             Biryani
            </h3>
            <div className="text-sm text-gray-600 mb-4">
              150 TK.
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Buy it again
              </button>
             
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Track package
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <BsThreeDots />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

