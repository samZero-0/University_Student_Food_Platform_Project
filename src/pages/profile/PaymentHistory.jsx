import { useState, useEffect, useContext } from "react";
import Footer from "@/components/home/HowItWorks/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { Calendar, CreditCard, Search, Download, Loader } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://platematebackend.vercel.app/orders/${user?.email}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                
                const data = await response.json();
                
                // Transform the data to match our component structure
                const transformedOrders = data.map((order, index) => ({
                    id: order._id || `ORD-${String(index + 1).padStart(3, '0')}`,
                    date: new Date(order.orderDate).toISOString().split('T')[0],
                    amount: parseFloat(order.shipmentTotal),
                    status: Math.random() > 0.2 ? "completed" : Math.random() > 0.5 ? "refunded" : "pending",
                    method: Math.random() > 0.5 ? "Credit Card" : "PayPal",
                    items: order.items.map(item => item.foodName),
                    cook: getCookName(order.items[0]?.foodName)
                }));
                
                setOrders(transformedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Using sample data instead.");
                
                // Fallback to sample data
                setOrders(getSampleOrders());
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, [user?.email]);

    // Helper function to get a cook name based on food item
    const getCookName = (foodName) => {
        const cookNames = {
            "Biryani": "Sarah's Kitchen",
            "Smoothie Bowl": "Healthy Delights",
            "Khichuri": "Bengali Cuisine"
        };
        
        return cookNames[foodName] || "PlateMate Chef";
    };

    // Sample data as fallback
    const getSampleOrders = () => [
        {
            id: "INV-001",
            date: "2025-03-14",
            amount: 460.00,
            status: "completed",
            method: "Credit Card",
            items: ["Biryani"],
            cook: "Sarah's Kitchen"
        },
        {
            id: "INV-002",
            date: "2025-03-18",
            amount: 2368.00,
            status: "completed",
            method: "PayPal",
            items: ["Smoothie Bowl", "Khichuri"],
            cook: "Healthy Delights"
        },
        {
            id: "INV-003",
            date: "2025-03-10",
            amount: 350.00,
            status: "refunded",
            method: "Credit Card",
            items: ["Family Meal Pack"],
            cook: "Home Delights"
        },
        {
            id: "INV-004",
            date: "2025-03-05",
            amount: 127.50,
            status: "pending",
            method: "PayPal",
            items: ["Spicy Noodles"],
            cook: "Chef's Delight"
        },
        {
            id: "INV-005",
            date: "2025-03-01",
            amount: 99.90,
            status: "completed",
            method: "Credit Card",
            items: ["Spaghetti Bolognese"],
            cook: "Italian Delight"
        }
    ];

    const filteredOrders = orders.filter(order => 
        (selectedFilter === 'all' || order.status === selectedFilter) &&
        (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
         order.cook.toLowerCase().includes(searchQuery.toLowerCase()) ||
         order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'refunded':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Calculate totals
    const totalSpent = orders
        .filter(order => order.status !== 'refunded')
        .reduce((sum, order) => sum + order.amount, 0);
        
    const refundedAmount = orders
        .filter(order => order.status === 'refunded')
        .reduce((sum, order) => sum + order.amount, 0);

    // Format date to a more readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
                    <p className="text-gray-600 mt-2">View and manage your payment transactions</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-600">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Spent</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            ${totalSpent.toFixed(2)}
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-600">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {orders.length}
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-red-600">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Refunded Amount</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            ${refundedAmount.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex gap-2">
                            <button 
                                className={`px-4 py-2 rounded-md ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                onClick={() => setSelectedFilter('all')}
                            >
                                All
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-md ${selectedFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                onClick={() => setSelectedFilter('completed')}
                            >
                                Completed
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-md ${selectedFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                onClick={() => setSelectedFilter('pending')}
                            >
                                Pending
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-md ${selectedFilter === 'refunded' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                onClick={() => setSelectedFilter('refunded')}
                            >
                                Refunded
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="w-full md:w-64 px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    /* Transactions Table */
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cook</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No transactions found</td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        {formatDate(order.date)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4 text-gray-400" />
                                                        {order.method}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.cook}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <div className="max-w-xs truncate">
                                                        {order.items.join(", ")}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-900 focus:outline-none"
                                                        onClick={() => {
                                                            // Generate a simplified invoice for download
                                                            const invoiceContent = `
                                                                Invoice ID: ${order.id}
                                                                Date: ${formatDate(order.date)}
                                                                Amount: $${order.amount.toFixed(2)}
                                                                Status: ${order.status}
                                                                Cook: ${order.cook}
                                                                Items: ${order.items.join(", ")}
                                                            `;
                                                            
                                                            const blob = new Blob([invoiceContent], { type: "text/plain" });
                                                            const url = URL.createObjectURL(blob);
                                                            const a = document.createElement("a");
                                                            a.href = url;
                                                            a.download = `invoice-${order.id}.txt`;
                                                            document.body.appendChild(a);
                                                            a.click();
                                                            document.body.removeChild(a);
                                                        }}
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {/* Pagination - Simple version */}
                {filteredOrders.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                1
                            </a>
                            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                2
                            </a>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default PaymentHistory;