import { useState } from "react";
import Footer from "@/components/home/HowItWorks/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { Clock, Copy, Gift, Percent, Tag, Timer, Utensils } from 'lucide-react';
import { Link } from "react-router-dom";

const DiscountPromo = () => {
    const [copiedCode, setCopiedCode] = useState(null);

    // Sample promo data - replace with your actual data
    const promos = [
        {
            id: 1,
            code: "NEWUSER50",
            title: "50% Off First Order",
            description: "Get 50% off on your first order up to $20",
            validUntil: "2024-02-01",
            type: "new-user",
            discount: 50,
            maxDiscount: 20,
            minOrder: 30
        },
        {
            id: 2,
            code: "PLATE25",
            title: "Weekend Special",
            description: "25% off on all weekend orders",
            validUntil: "2024-01-31",
            type: "weekend",
            discount: 25,
            maxDiscount: 15,
            minOrder: 40
        },
        {
            id: 3,
            code: "FREESHIP",
            title: "Free Delivery",
            description: "Free delivery on orders above $50",
            validUntil: "2024-01-25",
            type: "delivery",
            discount: 100,
            maxDiscount: 5,
            minOrder: 50
        }
    ];

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Deals & Promotions</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Save big on your favorite homemade meals with our exclusive offers and promotions
                    </p>
                </div>

                {/* Featured Promo Banner */}
                <div className="bg-primary/10 rounded-xl p-8 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-2">New User Special Offer! 🎉</h2>
                            <p className="text-gray-700 mb-4">
                                Get 50% off on your first order with PlateMate
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">
                                    <Clock className="inline-block w-4 h-4 mr-1" />
                                    Limited time offer
                                </span>
                                <span className="text-sm text-gray-500">
                                    <Tag className="inline-block w-4 h-4 mr-1" />
                                    Up to $20 off
                                </span>
                            </div>
                        </div>
                        <Link to="/categories" className="btn bg-secondary">
                            Order Now
                        </Link>
                    </div>
                </div>

                {/* Available Promos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promos.map((promo) => (
                        <div key={promo.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h3 className="card-title text-xl">{promo.title}</h3>
                                    <div className="badge badge-secondary">{promo.discount}% OFF</div>
                                </div>
                                
                                <p className="text-gray-600 my-4">{promo.description}</p>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Timer className="w-4 h-4" />
                                        Valid until: {new Date(promo.validUntil).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Utensils className="w-4 h-4" />
                                        Min. order: ${promo.minOrder}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Percent className="w-4 h-4" />
                                        Max discount: ${promo.maxDiscount}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-base-200 p-3 rounded-lg">
                                    <code className="flex-grow font-mono text-green-600 font-bold">
                                        {promo.code}
                                    </code>
                                    <button 
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleCopyCode(promo.code)}
                                    >
                                        {copiedCode === promo.code ? 'Copied!' : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* How to Use Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center mb-8">How to Use Promo Codes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Copy className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="font-semibold mb-2">Copy Code</h3>
                            <p className="text-gray-600">Click the copy button next to your preferred promo code</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Add Items</h3>
                            <p className="text-gray-600">Add your favorite meals to the cart</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Tag className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="font-semibold mb-2">Apply & Save</h3>
                            <p className="text-gray-600">Paste the code at checkout to get your discount</p>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default DiscountPromo;