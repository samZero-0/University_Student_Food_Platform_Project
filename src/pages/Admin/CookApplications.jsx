import {  useEffect, useState } from 'react';
import { Check, X, Clock, DollarSign, Mail, User, School, ChefHat, MapPin } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';


export default function CookApplications() {
  const [requests, setRequests] = useState([]);
  



 useEffect(()=>{
    fetch(`https://platematebackend.vercel.app/cookRequests`)
    .then(res => res.json())
    .then(data => setRequests(data))
 },[])

  const handleApprove = (id,name,studentId,email) => {
   
    const data = {name,email,studentId}

    fetch('https://platematebackend.vercel.app/cookList',{
        method: 'POST',
        headers: {
            'content-type' : 'application/json'

        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      toast.success("Application Approved")
      setRequests(requests.filter(req => req._id !== id));
    })

    fetch(`https://platematebackend.vercel.app/cookRequests/${id}`,{
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      
    })



    
  };

  const handleDecline = (id) => {

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Decline the Application?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        fetch(`https://platematebackend.vercel.app/cookRequests/${id}`,{
          method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setRequests(requests.filter(req => req._id !== id));
          
        })
        swal("Deleted!", "Application Declined", "success");
      }
    });




    
   
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer></ToastContainer>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Food Seller Requests</h1>
          <p className="mt-2 text-gray-600">Review and manage new food seller applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Pending Requests</div>
            <div className="mt-2 text-3xl font-semibold text-orange-600">{requests.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Approved Today</div>
            <div className="mt-2 text-3xl font-semibold text-green-600">12</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Declined Today</div>
            <div className="mt-2 text-3xl font-semibold text-red-600">3</div>
          </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div key={request._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Card Image */}
              <div className="relative h-48">
                <img 
                  src={request.imgUrl} 
                  alt={request.mealName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Request
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{request.mealName}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{request.fullName}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <School className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Student ID: {request.studentId}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{request.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{request.mealPrice} BDT</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{request.hours}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <ChefHat className="w-5 h-5 mr-3 text-gray-400 mt-1" />
                    <p className="text-gray-600 text-sm">{request.practices}</p>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(request._id,request.fullName,request.studentId,request.email)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  
                  <button
                    onClick={() => handleDecline(request._id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
            <p className="mt-1 text-sm text-gray-500">All food seller requests have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
}