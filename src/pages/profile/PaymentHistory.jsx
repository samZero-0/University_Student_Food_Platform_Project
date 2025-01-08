import { useState } from "react";
import Footer from "@/components/home/HowItWorks/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { Calendar, CreditCard,  Search, Download } from "lucide-react";

const PaymentHistory = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Sample payment data - replace with your actual data
    const payments = [
        {
            id: "INV-001",
            date: "2024-01-09",
            amount: 24.99,
            status: "completed",
            method: "Credit Card",
            items: ["Chicken Biryani", "Naan Bread"],
            cook: "Sarah's Kitchen"
        },
        {
            id: "INV-002",
            date: "2024-01-08",
            amount: 18.50,
            status: "completed",
            method: "PayPal",
            items: ["Vegetable Curry", "Rice"],
            cook: "Mike's Homestyle"
        },
        {
            id: "INV-003",
            date: "2024-01-07",
            amount: 35.00,
            status: "refunded",
            method: "Credit Card",
            items: ["Family Meal Pack"],
            cook: "Home Delights"
        },
        {
            id: "INV-004",
            date: "2024-01-06",
            amount: 12.75,
            status: "pending",
            method: "PayPal",
            items: ["Spicy Noodles"],
            cook: "Chef's Delight"
        },
        {
            id: "INV-005",
            date: "2024-01-05",
            amount: 9.99,
            status: "completed",
            method: "Credit Card",
            items: ["Spaghetti Bolognese"],
            cook: "Italian Delight"
        },
        {
            id: "INV-006",
            date: "2024-01-04",
            amount: 24.99,
            status: "completed",
            method: "PayPal",
            items: ["Chicken Biryani", "Naan Bread"],
            cook: "Sarah's Kitchen"
        },
        {
            id: "INV-007",
            date: "2024-01-03",
            amount: 18.50,
            status: "completed",
            method: "PayPal",
            items: ["Vegetable Curry", "Rice"],
            cook: "Mike's Homestyle"
        },
        {
            id: "INV-008",
            date: "2024-01-02",
            amount: 35.00,
            status: "refunded",
            method: "Credit Card",
            items: ["Family Meal Pack"],
            cook: "Home Delights"
        }
    ];

    const filteredPayments = payments.filter(payment => 
        (selectedFilter === 'all' || payment.status === selectedFilter) &&
        (payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
         payment.cook.toLowerCase().includes(searchQuery.toLowerCase()) ||
         payment.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())))
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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
                    <p className="text-gray-600 mt-2">View and manage your payment transactions</p>
                </div>
                 {/* Summary Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
                    <div className="card bg-gray-600 text-white">
                        <div className="card-body">
                            <h3 className="card-title">Total Spent</h3>
                            <p className="text-3xl font-bold">
                                ${payments.reduce((sum, payment) => 
                                    payment.status !== 'refunded' ? sum + payment.amount : sum, 0
                                ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                    
                    <div className="card bg-secondary text-white">
                        <div className="card-body">
                            <h3 className="card-title">Total Orders</h3>
                            <p className="text-3xl font-bold">
                                {payments.length}
                            </p>
                        </div>
                    </div>
                    
                    <div className="card bg-accent text-black   ">
                        <div className="card-body">
                            <h3 className="card-title">Refunded Amount</h3>
                            <p className="text-3xl font-bold">
                                ${payments.reduce((sum, payment) => 
                                    payment.status === 'refunded' ? sum + payment.amount : sum, 0
                                ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="flex gap-4">
                        <div className="join">
                            <button 
                                className={`btn join-item ${selectedFilter === 'all' ? 'btn bg-primary' : 'btn-ghost'}`}
                                onClick={() => setSelectedFilter('all')}
                            >
                                All
                            </button>
                            <button 
                                className={`btn join-item ${selectedFilter === 'completed' ? 'btn bg-primary' : 'btn-ghost'}`}
                                onClick={() => setSelectedFilter('completed')}
                            >
                                Completed
                            </button>
                            <button 
                                className={`btn join-item ${selectedFilter === 'refunded' ? 'btn bg-primary' : 'btn-ghost'}`}
                                onClick={() => setSelectedFilter('refunded')}
                            >
                                Refunded
                            </button>
                        </div>
                    </div>

                    <div className="join">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="input input-bordered join-item w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn join-item  bg-secondary">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Cook</th>
                                <th>Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-base-200/50">
                                    <td className="font-medium">{payment.id}</td>
                                    <td><Calendar className="w-4 h-4 inline-block" ></Calendar> {new Date(payment.date).toLocaleDateString()}</td>
                                    <td className="font-medium">${payment.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            {payment.method}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{payment.cook}</td>
                                    <td>
                                        <div className="max-w-xs overflow-hidden">
                                            {payment.items.join(", ")}
                                        </div>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => window.print()}
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

               
            </main>
            
            <Footer />
        </div>
    );
};

export default PaymentHistory;