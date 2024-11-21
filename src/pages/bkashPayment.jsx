import { useContext } from "react";
import { GiPhone } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Context } from "../contextApi/Context";

const BkashPayment = () => {

    const {shipmentTotal} = useContext(Context);

    return (

        <div className="flex justify-center items-center">

            <div className="flex flex-col gap-4 md:w-1/3  mt-20 bg-[#E2136E] rounded-lg items-center">
                <div>
                    <img src='/bkashHeaderLogo.png' alt="" className="mt-2 mb-3" />
                </div>

                <div className="flex flex-col gap-3 md:w-2/3 shadow-xl bg-[#f51d7c] rounded-xl p-3 items-center mb-5 text-xl">
                    <h1 className="text-white font-semibold">Merchant: <span className="font-light"> Kazi Samin Nawal</span> </h1>
                    <h1 className="text-white font-semibold">Invoice no.:  <span className="font-light"> 45896745896</span> </h1>
                    <h1 className="text-white font-semibold"> Amount:  <span className="font-light">৳ {shipmentTotal}</span></h1>
                </div>

                <div className="mb-5 text-xl">
                    <h1 className="text-white font-semibold">Your BKash Account Number: </h1>

                    <input type="text"  className="p-2 rounded-lg bg-white mt-3 md:w-[320px]" placeholder=" 01XXXXXXXXX"/>
                </div>

                <div className="flex gap-3 text-gray-300 text-lg">
                    <input type="checkbox" />
                    <h1>I agree to the terms and service</h1>
                </div>

                <div className="flex gap-3 text-white w-1/2 mb-5">
                    <button className="btn bg-transparent text-white w-1/2">Proceed</button>
                   <Link to='/categories'  className="btn bg-transparent text-white w-1/2">
                   <button>Close</button></Link>
                </div>

                <div className="mb-5">
                    <div className="flex gap-1 items-center"><GiPhone className="text-2xl"></GiPhone> 
                    <span className="text-gray-300">16247</span>
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default BkashPayment;