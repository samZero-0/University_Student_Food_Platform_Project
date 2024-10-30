
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const About = () => {
    return (
        
        <div className="md:w-11/12 md:mx-auto  mt-28 mb-5">

            <div className="flex flex-col items-center">
                <span className="font-bold text-4xl ">About Us</span>
                
            </div>

            <div className="md:flex md:flex-row flex flex-col gap-5  mt-10 p-3">

                {/* image section */}
                    <div className="md:w-1/2 flex justify-end">
                        <img src="/public/about-2.jpg" alt="" className="w-[630px] h-[400px]" />
                    </div>

                {/* desc section */}
            
                    <div className="md:w-1/2 flex flex-col gap-2  ">

                        <span className=" md:w-8/12">
                        <span className="font-bold text-2xl">Welcome to our Food Sharing Platform </span><br/><br />– a place where students help students thrive! We believe that food should be affordable and accessible to everyone within our university community. Our platform connects students who have extra or homemade food with others who are looking for budget-friendly meal options, creating a vibrant, sustainable ecosystem of sharing.
                        </span>

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


                        


                        


                        <span className=" md:w-8/12 text-center text-[15px]">
                        Whether you’re trying to reduce food waste, save some money, or find a delicious homemade meal, our platform brings people together through the love of food. 
                        </span>

                    </div>

            </div>


        </div>
    );
};

export default About;