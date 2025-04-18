import { Link, Navigate, NavLink } from "react-router-dom";
import GreenButton from "../../home/hero/GreenButton";

const BecomeCook = () => {
    return (
        <div className="md:w-11/12 md:mx-auto mt-28 mb-5 p-2 mb:p-0 ">

            <div
                style={{
                    backgroundImage: `url('/join.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '600px',
                    position: 'relative',
                    
                    
                }}
            >
                <div className="flex flex-col items-center justify-center gap-4"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        
                    }}
                >

                   <span className="text-white text-4xl font-bold">Join With Us!</span>
                   <span className=" text-gray-400 text-center">Share your love of Homecooked meals as a cook</span>
                   <div className="border p-2 border-primary rounded-xl">
                   <NavLink to="/joinAsCook"><button className="bg-primary flex justify-center  item-center btn border-none rounded-xl font-bold">Register Now <GreenButton /> </button></NavLink> 

                  
                   </div>
                </div>

                
            </div>
        </div>
    );
};

export default BecomeCook;
