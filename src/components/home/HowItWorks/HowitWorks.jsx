import { NavLink } from "react-router-dom";
import GreenButton from "../hero/GreenButton";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const HowitWorks = () => {
    useEffect(()=>{
        Aos.init({
            duration:1100,
            easing: "ease-in-out"
        })
    },[])

    return (
        <div className="md:w-11/12 md:mx-auto mt-20 mb-10 overflow-hidden">
            <div className="flex flex-col gap-2 items-center" >
                <span className="text-4xl font-bold" data-aos="fade-up">How it Works</span>
                <span className="text-sm text-gray-500 italic" data-aos="fade-up">Learn more about our features</span>

                <div className="md:flex gap-4 w-full mt-10 justify-center " >
                   
                    <div className="md:w-1/4 w-11/12  mx-auto p-5  flex flex-col  items-center justify-center border-2 bg-gray-50 rounded-lg relative overflow-hidden " data-aos="zoom-in-right" >
                        <div className="absolute inset-0  mix-blend-multiply"></div>
                        <img src="/registernow.jpg" alt="" className=" object-cover" />
                        <span className="text-2xl font-bold relative z-10">Register / Sign Up</span>
                        <p className="text-center w-9/12 text-sm text-gray-500 relative z-10">
                            Create an account to start buying or selling.
                        </p>
                    </div>

                    <div className="md:w-1/4 w-11/12  mx-auto p-5  flex flex-col gap-3  items-center justify-center border-2 bg-gray-50 rounded-lg relative overflow-hidden" data-aos="fade-up" data-aos-offset="100"
     data-aos-easing="ease-in-sine">
                        <div className="absolute inset-0  mix-blend-multiply"></div>
                        <img src="/browsemeal.jpg" alt="" className=" object-cover mix-blend-multiply" />
                        <span className="text-2xl font-bold relative z-10">Browse Meals</span>
                        <span className="text-center w-9/12 text-sm text-gray-500 relative z-10">
                            Browse over categories to find your perfect meal.
                        </span>
                    </div>

       
                    <div className="md:w-1/4 w-11/12  mx-auto p-5  flex flex-col gap-3  items-center justify-center border-2 bg-gray-50 rounded-lg relative overflow-hidden" data-aos="fade-up" data-aos-offset="100"
     data-aos-easing="ease-in-sine">
                        <div className="absolute inset-0  mix-blend-multiply"></div>
                        <img src="/placeorder.jpg" alt="" className="object-cover mix-blend-multiply" />
                        <span className="text-xl font-bold  relative z-10">Place Your Order & Connect</span>
                        <span className="text-center w-9/12 text-sm text-gray-500 relative z-10">
                            Found a meal? Order it and use in-app chat to coordinate with the seller.
                        </span>
                    </div>
                    <div className="md:w-1/4 w-11/12  mx-auto p-5  flex flex-col gap-3  items-center justify-center border-2 bg-gray-50 rounded-lg relative overflow-hidden" data-aos="zoom-in-left">
                        <div className="absolute inset-0  mix-blend-multiply"></div>
                        <img src="/step-3.jpg" alt="" className="object-cover mix-blend-multiply" />
                        <span className="text-2xl font-bold relative z-10">Pick Up & Enjoy</span>
                        <span className="text-center w-9/12 text-sm text-gray-500 relative z-10">
                            Meet the seller at the campus, take the food, and enjoy your meal!
                        </span>
                    </div>
                
                </div>
                   <NavLink to={"/login"}><button className="btn mt-8 text-lg font-semibold bg-primary hover:motion-preset-shake hover:motion-duration-100" data-aos="fade-up-left">Join Now!<GreenButton /></button> </NavLink>

            </div>
        </div>
    );
};

export default HowitWorks;
