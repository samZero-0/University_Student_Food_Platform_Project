import { useContext } from "react";
import { GiPhone } from "react-icons/gi";
import { Context } from "../provider/Context";
import PropTypes from "prop-types";
import { AuthContext } from "../../src/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BkashPayment = ({ closeModal }) => {
    const navigate = useNavigate();
    const { shipmentTotal,checkoutComplete } = useContext(Context);
    const {user} = useContext(AuthContext);
    console.log(user)


    const handleProceed = ()=>{
        checkoutComplete(user);
        toast.success("Order Successsful")
        setTimeout(() => {
            navigate('/categories'); // Navigate to the homepage
        }, 1000);
        
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end z-50">
            <ToastContainer></ToastContainer>
            <div className="bg-[#E2136E] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 btn btn-ghost text-gray-500 text-xl hover:bg-none"
                >
                    ✖
                </button>

                {/* Header with BKash Logo */}
                <div className="flex justify-center">
                    <img src='/bkashHeaderLogo.png' alt="Bkash Logo" className="mt-2 mb-3" />
                </div>

                {/* Invoice Details */}
                <div className="flex flex-col gap-4 bg-[#f51d7c] rounded-xl p-4 text-white text-center">
                    <h1 className="font-semibold">Merchant: <span className="font-light"> Kazi Samin Nawal</span></h1>
                    <h1 className="font-semibold">Invoice No.: <span className="font-light"> 45896745896</span></h1>
                    <h1 className="font-semibold">Amount: <span className="font-light">৳ {shipmentTotal}</span></h1>
                </div>

                {/* BKash Account Number */}
                <div className="mb-4 text-xl">
                    <label htmlFor="bkashAccount" className="block text-white font-semibold mb-2">Your BKash Account Number:</label>
                    <input
                        type="text"
                        id="bkashAccount"
                        className="p-3 rounded-lg bg-white mt-2 w-full"
                        placeholder="01XXXXXXXXX"
                    />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center gap-2 text-gray-300 text-lg">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms" className="text-white">I agree to the terms and services</label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button onClick={()=>handleProceed(user)}    className="btn bg-transparent text-white w-full py-2 rounded-md border border-white hover:bg-white hover:text-[#E2136E]">
                        Proceed
                    </button>
                   
                </div>

                {/* BKash Customer Service */}
                <div className="mt-4 text-center text-gray-300">
                    <div className="flex justify-center gap-2 items-center">
                        <GiPhone className="text-2xl" />
                        <span>16247</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BkashPayment.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default BkashPayment;
