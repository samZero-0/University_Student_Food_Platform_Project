import { PiNumberSquareOneBold } from "react-icons/pi";
import { PiNumberSquareTwoBold } from "react-icons/pi";
import { PiNumberSquareThreeBold } from "react-icons/pi";
import { PiNumberSquareFourBold } from "react-icons/pi";
import { Link } from "react-router-dom";


const BeforeYouBegin = () => {
    return (
        <div className="md:w-11/12 md:mx-auto  mt-28 mb-5">

            <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col gap-3 items-center ">
                <span className="text-lg">Become a Cook</span>
                <span  className="text-4xl">Requirements for Becoming a Seller</span></div>

                <div className="flex items-center gap-2 mt-16 border border-gray-300 rounded-xl p-4 w-1/2 shadow-lg">
                <PiNumberSquareOneBold  className="text-3xl font-bold text-accent"/>
                <img src="/public/student.webp" alt="" className="h-[100px] w-1/8"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">University Enrollment</span>
                <span>You must be an active student at the university with a valid student ID.</span></div>
            </div>

            <div className="flex items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-1/2 shadow-lg" >
                <PiNumberSquareTwoBold  className="text-3xl font-bold text-accent"/>
                <img src="/public/food-safety.webp" alt="" className="h-[100px] w-1/8"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Food Quality and Safety</span>
                <span>Ensure that the food you sell is fresh, properly prepared, and stored under safe conditions.</span></div>
            </div>


            <div className="flex items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-1/2 shadow-lg">
                <PiNumberSquareThreeBold  className="text-3xl font-bold text-accent"/>
                <img src="/public/price.png" alt="" className="h-[100px] w-1/8"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Pricing Guidelines</span>
                <span>Set fair and affordable prices, keeping in mind the student communitys budget.</span></div>
            </div>

            <div className="flex items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-1/2 shadow-lg">
                <PiNumberSquareFourBold  className="text-3xl font-bold text-accent"/>
                <img src="/public/delivery.jpg" alt="" className="h-[100px] w-1/8"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Availability and Timely Delivery</span>
                <span>Be responsive to messages from buyers and ensure timely delivery of meals at agreed locations.</span></div>
            </div>


            <div className="w-full flex justify-center mt-16">


          <Link to='/cookReg' className="w-full flex justify-center"><button className="p-3 bg-primary rounded-xl w-1/3 text-center text-black font-bold text-xl">I agree and want to continue</button></Link>

            </div>
            
        </div>
        </div>
    );
};

export default BeforeYouBegin;