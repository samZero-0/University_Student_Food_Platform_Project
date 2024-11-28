
import { Camera, ChevronDown, X } from 'lucide-react'
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa'
import { SiVisa, SiMastercard } from 'react-icons/si'

export default function UserProfile() {
  return (
    <div className="min-h-screen  p-6">
      
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-sm">
     <div className='flex justify-center mt-2 mb-8'>
     <span className='text-3xl font-bold'>Profile</span>
     </div>

        <div className=" lg:grid lg:grid-cols-[300px_1fr] lg:gap-12">
          <div className="mb-8 lg:mb-0">
            <div className="relative mx-auto w-fit  rounded-full">
              <img
                src="/profilePicture.webp"
                alt="Profile"
                className="h-[200px] w-[200px] rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-4 rounded-full bg-white p-2 shadow-md">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <input
                  type="text"
                  defaultValue="Jane"
                  className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <input
                  type="text"
                  defaultValue="Smith"
                  className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Password</label>
              <div className="relative">
                <input
                  type="password"
                  defaultValue="********"
                  className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                />
                <button className="absolute right-2 top-3 text-sm text-primary hover:text-emerald-500">
                  CHANGE PASSWORD
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                defaultValue="janeSmith@gmail.com"
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="tel"
                defaultValue="477-046-1827"
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Address</label>
              <input
                type="text"
                defaultValue=""
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Nation</label>
              <input
                type="text"
                defaultValue=""
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <div className="relative mt-1">
                  <span>Female</span>
                 
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Language</label>
                <div className="relative mt-1">
                  <select className="w-full appearance-none rounded-md border border-gray-200 bg-white p-2 focus:border-gray-300 focus:outline-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <div className="relative mt-1">
                  <select className="w-full appearance-none rounded-md border border-gray-200 bg-white p-2 focus:border-gray-300 focus:outline-none">
                    <option>September</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative mt-7">
                <select className="w-full appearance-none rounded-md border border-gray-200 bg-white p-2 focus:border-gray-300 focus:outline-none">
                  <option>31</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
              </div>
              <div className="relative mt-7">
                <select className="w-full appearance-none rounded-md border border-gray-200 bg-white p-2 focus:border-gray-300 focus:outline-none">
                  <option>1990</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Twitter</label>
                <div className="mt-1 flex items-center gap-2">
                  <FaTwitter className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Facebook</label>
                <div className="mt-1 flex items-center gap-2">
                  <FaFacebook className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Google</label>
                <div className="mt-1 flex items-center gap-2">
                  <FaGoogle className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Description</label>
              <input
                type="text"
                defaultValue=""
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Payment Method</label>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative rounded-md border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <SiVisa className="h-8 w-8 text-blue-600" />
                    <button className="text-red-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">Visa - 8394</p>
                </div>
                <div className="relative rounded-md border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <SiMastercard className="h-8 w-8 text-orange-600" />
                    <button className="text-red-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">Master - 8745</p>
                </div>
              </div>
              <button className="mt-4 text-sm text-emerald-400 hover:text-emerald-500">
                + ADD PAYMENT METHOD
              </button>
              <br />
              <button className="mt-5 rounded-full bg-primary px-11  py-2 text-lg text-black hover:bg-emerald-500">
              Save
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

