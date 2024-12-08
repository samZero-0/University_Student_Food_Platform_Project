import { Camera, ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';

export default function UserProfile() {
  const { user, loading } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState(user?.photoURL || '');

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = imageURL;

    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        toast.success('Successfully updated');
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Failed to update profile.');
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageURL(''); // Clear the existing imageURL state
      const reader = new FileReader();
      reader.onload = (e) => setImageURL(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <ToastContainer />

      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-sm">
        <div className="flex justify-center mt-2 mb-8">
          <span className="text-3xl font-bold">Profile</span>
        </div>

        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-12">
          <div className="mb-8 lg:mb-0">
            <div className="relative mx-auto w-fit rounded-full">
              <img
                src={imageURL || user.photoURL}
                alt="Profile"
                className="h-[200px] w-[200px] rounded-full object-cover"
              />
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-4 cursor-pointer rounded-full bg-white p-2 shadow-md"
              >
                <Camera className="h-5 w-5 text-gray-600" />
              </label>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ''}
                  className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                disabled
                className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
              />
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
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="tel"
              defaultValue="477-046-1827"
              className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
            />
          </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <div className="relative mt-1">
                  <select className="w-full appearance-none rounded-md border border-gray-200 bg-white p-2 focus:border-gray-300 focus:outline-none">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
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

            <div>
            <label className="text-sm text-gray-500">Address</label>
            <input
              type="text"
              defaultValue=""
              className="mt-1 w-full rounded-md border border-gray-200 p-2 focus:border-gray-300 focus:outline-none"
            />
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

            <button
              type="submit"
              className="mt-5 rounded-full bg-primary px-11 py-2 text-lg text-black hover:bg-emerald-500"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
