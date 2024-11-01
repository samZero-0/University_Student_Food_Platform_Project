
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import GreenButton from "../hero/GreenButton";
// import GreenButton from "../hero/GreenButton";
const About = () => {
    return (
        <div id=''>
        <div className="md:w-11/12 md:mx-auto  mt-60  mb-5">

            <div className="flex flex-col items-center">
                <span className="font-bold text-4xl ">About Us</span>
            </div>

            <div className="md:flex md:flex-row flex flex-col gap-5  mt-10 p-2 ">

                {/* image section */}
                    <div className="md:w-1/2 flex justify-end">
                        <img src="/public/about-2.jpg" alt="" className=" rounded-lg" />
                    </div>

                {/* desc section */}
            
                    <div className="md:w-1/2 flex flex-col gap-2 ml-5  ">

                        <span className=" md:w-11/12 text-base text-gray-500">
                        <span className="font-bold text-2xl text-black">Welcome to our Food Sharing Platform </span><br/><br />– a place where students help students thrive! We believe that food should be affordable and accessible to everyone within our university community. Our platform connects students who have extra or homemade food with others who are looking for budget-friendly meal options, creating a vibrant, sustainable ecosystem of sharing.
                        </span>

                        <div className=" border-2 w-9/12 py-5 px-4 mt-10 rounded-xl ">
                        
                        <div className="flex gap-2 items-center font-semibold mt-5 ">
                        <IoMdCheckmarkCircleOutline className="text-2xl text-primary" />
                        <span>Sign up with your university email to join the community.</span></div>


                        <div className="flex gap-2 items-center font-semibold">
                        <IoMdCheckmarkCircleOutline className="text-2xl text-primary" />
                        <span>Have extra food? List it with a short description and price.</span></div>

                        <div className="flex gap-2 items-center font-semibold">
                        <IoMdCheckmarkCircleOutline className="text-2xl text-primary" />
                        <span>Explore affordable meal options posted by fellow students.</span></div>

                        <div className="flex gap-2 items-center font-semibold mb-5">
                        <IoMdCheckmarkCircleOutline className="text-2xl text-primary" />
                        <span>Enjoy meals while making a positive impact!</span></div>
                        
                        

                        <div className="flex justify-center text-center items-center">
                        <button className= "btn  border-none bg-primary  rounded-xl  font-bold w-3/5 hover:bg-accent ">
                            Learn More  <GreenButton></GreenButton>
                        </button>
                        </div>
                        </div>


                    </div>

            </div>

            </div>
        </div>
    );
};

export default About;