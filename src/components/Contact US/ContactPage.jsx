
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaCheck } from 'react-icons/fa';

const ContactPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-8  rounded-lg mt-10 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="mb-6 text-gray-600">We'd love to hear from you. Please fill out the form below.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-accent text-black font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg ">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
            <p className="flex items-center mb-2 text-gray-600">
              <FaEnvelope className="mr-2 text-primary" /> info@example.com
            </p>
            <p className="flex items-center mb-2 text-gray-600">
              <FaPhone className="mr-2 text-primary" /> +1 (123) 456-7890
            </p>
            <p className="flex items-center mb-2 text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-primary" /> 123 Main St, City, Country
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Rate Your Experience</h2>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            
            <textarea
              placeholder="Leave your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
            <button className='btn bg-primary px-10 py-2'>Submit</button>
          </div>
          
        </div>
      </div>
              <div>
              <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Terms and Conditions</h2>
            <p className="mb-4 text-gray-600">
            By using Platemate, you agree that the platform facilitates healthy food sales between university students and does not take responsibility for the quality, safety, or delivery of items. Buyers and sellers are solely responsible for their transactions, ensuring compliance with university policies and local laws. We may charge a service fee and reserve the right to suspend accounts for misuse or violations. Use the platform at your own risk, and ensure all food sold aligns with healthy standards.
            </p>
           
          </div>
              </div>
    </div>
  );
};

export default ContactPage;

