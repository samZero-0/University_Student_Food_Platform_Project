import { FaBoxOpen , FaUserPlus } from 'react-icons/fa';
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
const States = () => {
    useEffect(()=>{
        Aos.init({
            duration:700,
            easing: "ease-in-out"
        })
    },[])
    return (
        <section className="mt-20  mb-10 w-11/12 mx-auto flex justify-center gap-8" data-aos="fade-up">
            {/* New Orders */}
            <div className="bg-gray-50 shadow-lg p-6 rounded-lg w-64">
                <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaBoxOpen Box className="text-green-500 text-3xl" />
                    </div>
                    <div className="ml-4">
                        <div className="text-gray-500 text-sm">New Orders</div>
                        <div className="text-xl font-bold">1,368</div>
                        <div className="text-green-500 text-sm">0.43% ↑</div>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>

            {/* New Customers */}
            <div className="bg-gray-50 shadow-lg p-6 rounded-lg w-64">
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaUserPlus className="text-blue-500 text-3xl" />
                    </div>
                    <div className="ml-4">
                        <div className="text-gray-500 text-sm">New Customers</div>
                        <div className="text-xl font-bold">785</div>
                        <div className="text-green-500 text-sm">0.39% ↑</div>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
            </div>

            {/* Online Orders */}
            <div className="bg-gray-50 shadow-lg p-6 rounded-lg w-64">
                <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                        <MdOutlineShoppingBag className="text-orange-500 text-3xl" />
                    </div>
                    <div className="ml-4">
                        <div className="text-gray-500 text-sm">Online Orders</div>
                        <div className="text-xl font-bold">795</div>
                        <div className="text-red-500 text-sm">1.39% ↓</div>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
            </div>

            {/* Offline Orders */}
            <div className="bg-gray-50 shadow-lg p-6 rounded-lg w-64">
                <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                        <PiShoppingCartSimpleDuotone className="text-purple-500 text-3xl" />
                    </div>
                    <div className="ml-4">
                        <div className="text-gray-500 text-sm">Offline Orders</div>
                        <div className="text-xl font-bold">573</div>
                        <div className="text-purple-500 text-sm">2.69% ↑</div>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
            </div>
        </section>
    );
};

export default States;
