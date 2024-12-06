import { 
    FaUser, 
    FaUsers, 
    FaShoppingCart, 
    FaDollarSign, 
    FaListAlt, 
    FaExclamationCircle 
  } from 'react-icons/fa';
  
  const Dashboard = ({ title, value, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="rounded-full bg-blue-100 p-3 mr-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
  
  const AdminDashboard = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Dashboard 
              title="Total Users" 
              value="10,234" 
              icon={FaUser} 
            />
            <Dashboard 
              title="Active Users" 
              value="8,745" 
              icon={FaUsers} 
            />
            <Dashboard 
              title="Sellers" 
              value="1,234" 
              icon={FaUser} 
            />
            <Dashboard 
              title="Total Orders" 
              value="45,678" 
              icon={FaShoppingCart} 
            />
            <Dashboard 
              title="Revenue" 
              value="$789,012" 
              icon={FaDollarSign} 
            />
            <Dashboard 
              title="Food Categories" 
              value="42" 
              icon={FaListAlt} 
            />
          </div>
  
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pending Approvals & Flagged Content</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {[ // Sample data
                  { id: 1, type: 'Restaurant', name: 'Tasty Bites', status: 'Pending Approval' },
                  { id: 2, type: 'Menu Item', name: 'Spicy Noodles', status: 'Flagged' },
                  { id: 3, type: 'User Review', name: 'John Doe', status: 'Flagged' },
                  { id: 4, type: 'Restaurant', name: 'Gourmet Palace', status: 'Pending Approval' },
                  { id: 5, type: 'Menu Item', name: 'Veggie Supreme Pizza', status: 'Pending Approval' },
                ].map((item) => (
                  <li key={item.id}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <FaExclamationCircle className="h-5 w-5 text-yellow-500 mr-2" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{item.type}: {item.name}</p>
                          <p className="text-sm text-gray-500">{item.status}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Review
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default AdminDashboard;
  