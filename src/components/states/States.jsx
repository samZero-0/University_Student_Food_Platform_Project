import { FaBoxOpen, FaUserPlus } from 'react-icons/fa';
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const States = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        Aos.init({
            duration: 700,
            easing: "ease-in-out"
        });
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 10000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <section>
            <div className='mt-20 text-center'>
                <h1 className='text-3xl font-bold' data-aos="fade-up">Stats </h1>
                <p className='text-gray-500 mt-2' data-aos="fade-up">Explore the stats of PlateMate</p>
            </div>
            <section className="md:mt-20 md:mb-10 mb-4 md:w-11/12 md:p-3 p-10 mx-auto md:flex md:justify-center gap-8">

                {/* New Orders */}
                <div className="bg-gray-50 shadow-lg p-6 mb-3 rounded-lg md:w-64" data-aos="fade-right">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <FaBoxOpen className="text-green-500 text-3xl" />
                        </div>
                        <div className="ml-4">
                            <div className="text-gray-500 text-sm">New Orders</div>
                            <div className="text-xl font-bold">
                                <CountUp key={key + '-orders'} end={1368} duration={8} />
                            </div>
                            <div className="text-green-500 text-sm">0.43% ↑</div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>

                {/* New Customers */}
                <div className="bg-gray-50 shadow-lg p-6 mb-3 rounded-lg md:w-64" data-aos="fade-up-right">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <FaUserPlus className="text-blue-500 text-3xl" />
                        </div>
                        <div className="ml-4">
                            <div className="text-gray-500 text-sm">New Customers</div>
                            <div className="text-xl font-bold">
                                <CountUp key={key + '-customers'} end={785} duration={7} />
                            </div>
                            <div className="text-green-500 text-sm">0.39% ↑</div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                </div>

                {/* Online Orders */}
                <div className="bg-gray-50 shadow-lg p-6 mb-3 rounded-lg md:w-64" data-aos="fade-up-left">
                    <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <MdOutlineShoppingBag className="text-orange-500 text-3xl" />
                        </div>
                        <div className="ml-4">
                            <div className="text-gray-500 text-sm">Online Orders</div>
                            <div className="text-xl font-bold">
                                <CountUp key={key + '-online'} end={795} duration={7} />
                            </div>
                            <div className="text-red-500 text-sm">1.39% ↓</div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>

                {/* Offline Orders */}
                <div className="bg-gray-50 shadow-lg p-6 mb-3 rounded-lg md:w-64" data-aos="fade-left">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <PiShoppingCartSimpleDuotone className="text-purple-500 text-3xl" />
                        </div>
                        <div className="ml-4">
                            <div className="text-gray-500 text-sm">Offline Orders</div>
                            <div className="text-xl font-bold">
                                <CountUp key={key + '-offline'} end={573} duration={7} />
                            </div>
                            <div className="text-purple-500 text-sm">2.69% ↑</div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>

            </section>
        </section>
    );
};

export default States;
