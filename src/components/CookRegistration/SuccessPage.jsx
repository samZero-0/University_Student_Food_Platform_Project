
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
const SuccessPage = () => {
    
    
    return (

        <div className="md:w-11/12 md:mx-auto mt-20 mb-5">
                <div className="flex flex-col gap-5 items-center">
                <div className="flex justify-center items-center w-full h-[600px] ">

                <img src="/public/success.svg" alt="" className="w-1/4 h-1/2"/>
                <span className="text-5xl text-black ">Form Submitted Successfully</span>

                
                </div>
                
                
                <Link to="/" className="bg-primary p-4 rounded-xl w-1/4 text-bold text-3xl flex items-center justify-center gap-2 cursor-pointer"> <FaHome className="text-4xl text-black" />Go Home</Link>

                </div>
        </div>
    );
};

export default SuccessPage;