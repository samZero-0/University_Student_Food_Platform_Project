import { useState, useEffect } from 'react';
// import { GoUpload } from "react-icons/go";
// import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Component() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [mealPrices, setMealPrices] = useState([{ meal: '', price: '' }]);
  // const fileInputRef = useRef(null); 

  // const addMealPrice = () => {
  //   setMealPrices([...mealPrices, { meal: '', price: '' }]);
  // };

  const updateMealPrice = (index, field, value) => {
    const newMealPrices = [...mealPrices];
    newMealPrices[index][field] = value;
    setMealPrices(newMealPrices);
  };

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Selected file:', file);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    console.log(initialData);
    

    fetch('https://platematebackend.vercel.app/cookRequests', {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(initialData)
  })
  .then(res => res.json())
  .then(data => {
      toast.success('Application Sent Successfully');
      console.log(data);
      e.target.reset();

  });


  };

  return (
    <div className="md:w-11/12 md:mx-auto mt-20 mb-5">
      <ToastContainer /> 
      <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
      
        <h1 className='text-3xl text-center font-bold py-5'>Register</h1>
        <div className="px-6 py-4 bg-primary border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Food Service Application</h2>
          <p className="mt-1 text-sm text-gray-600">Please fill out the form below to apply as a food service provider.</p>
        </div>
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-control">
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your student ID"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">University Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your id@iub.edu.bd"
              />
            </div>
            <div className="form-control">
              <label htmlFor="practices" className="block text-sm font-medium text-gray-700">
                Describe your food preparation and storage practices
              </label>
              <textarea
                id="practices"
                name="practices"
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your practices here..."
              ></textarea>
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700">Provide a sample of your meal</label>
              {mealPrices.map((item, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Meal name"
                    value={item.meal}
                    name='mealName'
                    onChange={(e) => updateMealPrice(index, 'meal', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={item.price}
                    name='mealPrice'
                    onChange={(e) => updateMealPrice(index, 'price', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  
                </div>
              ))}
              <div className='my-2'>
                <input type="url" name='imgUrl' placeholder='Enter image url' className='border p-2 rounded-lg w-full'/>
              </div>
              {/* <button
                type="button"
                onClick={addMealPrice}
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-accent hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Meal
              </button> */}
            </div>
            <div className="form-control">
              <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                Specify your available hours for meal preparation and delivery
              </label>
              <input
                type="text"
                id="hours"
                name="hours"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Mon-Fri: 5PM-9PM, Sat-Sun: 12PM-8PM"
              />
            </div>
          </div>
          <div className="form-control !flex-row items-center">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
              I agree to maintain food quality standards
            </label>
          </div>
          <div className="form-control ">
          
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-black bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Application
              </button>
            
          </div>
        </form>
        
      </div>
    </div>
  );
}
