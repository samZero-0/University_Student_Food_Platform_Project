/* eslint-disable react/prop-types */
import { FaCcVisa, FaCcMastercard, FaCcJcb, FaCcAmex, FaQuestionCircle } from 'react-icons/fa';

export default function CardPayment({ closeModal }) {
  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Invoice</h2>
        <div className="flex justify-center space-x-4 mb-6">
          <FaCcVisa className="text-3xl text-blue-600" />
          <FaCcMastercard className="text-3xl text-red-500" />
          <FaCcJcb className="text-3xl text-green-600" />
          <FaCcAmex className="text-3xl text-blue-400" />
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 1234 5678 9012 3456"
            />
          </div>
          <div>
            <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
              Name on card
            </label>
            <input
              type="text"
              id="nameOnCard"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex. John"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01 / 19"
              />
            </div>
            <div className="w-1/2 relative">
              <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">
                Security code
              </label>
              <input
                type="text"
                id="securityCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="•••"
              />
              <FaQuestionCircle className="absolute right-3 top-9 text-gray-400" />
            </div>
          </div>
          <button className="w-full bg-secondary btn text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-
          primary focus:ring-offset-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
