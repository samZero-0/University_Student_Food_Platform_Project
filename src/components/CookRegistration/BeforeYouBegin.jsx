import { PiNumberSquareOneBold } from "react-icons/pi";
import { PiNumberSquareTwoBold } from "react-icons/pi";
import { PiNumberSquareThreeBold } from "react-icons/pi";
import { PiNumberSquareFourBold } from "react-icons/pi";


const BeforeYouBegin = () => {
    return (
        <div className="md:w-11/12 md:mx-auto  mt-28 mb-5">

            <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 items-center ">
                <span className="text-lg">Become a Cook</span>
                <span  className="text-4xl">Requirements for Becoming a Seller</span></div>

                <div className="flex items-center gap-3 mt-16">
                <PiNumberSquareOneBold  className="text-3xl font-bold text-accent"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">University Enrollment</span>
                <span>You must be an active student at the university with a valid student ID.</span></div>
            </div>

            <div className="flex items-center gap-3 mt-10">
                <PiNumberSquareTwoBold  className="text-3xl font-bold text-accent"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Food Quality and Safety</span>
                <span>Ensure that the food you sell is fresh, properly prepared, and stored under safe conditions.</span></div>
            </div>


            <div className="flex items-center gap-3 mt-10">
                <PiNumberSquareThreeBold  className="text-3xl font-bold text-accent"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Pricing Guidelines</span>
                <span>Set fair and affordable prices, keeping in mind the student communitys budget.</span></div>
            </div>

            <div className="flex items-center gap-3 mt-10">
                <PiNumberSquareFourBold  className="text-3xl font-bold text-accent"/>
                <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Availability and Timely Delivery</span>
                <span>Be responsive to messages from buyers and ensure timely delivery of meals at agreed locations.</span></div>
            </div>
            <div className="w-full flex justify-center mt-16">
            <button className="p-3 bg-primary rounded-xl w-1/3 text-center text-black font-bold text-xl">I agree and want to continue</button></div>
            
        </div>
        </div>
    );
};

export default BeforeYouBegin;