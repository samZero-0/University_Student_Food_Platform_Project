
const HowitWorks = () => {
    return (
        <div className="md:w-11/12 md:mx-auto mt-20 mb-10">
            <div className="flex flex-col gap-2 items-center">
                <span className="text-4xl font-bold">How it Works</span>
                <span className="text-sm text-gray-500 italic">Learn more about our features</span>



            <div className="flex gap-2 w-full mt-10 justify-center">

                
                <div className="w-1/4  flex flex-col gap-3 items-center justify-center">
                    
                <img src="/public/step-1.jpg" alt=""  className="w-1/3 h-[140px] "/>

                <span className="text-2xl font-bold">Browse Meals</span>

                <span className="text-center w-1/2 text-sm text-gray-500">Browse over Categories and find your suitable meal
                </span>

                <button className="btn btn-outline bg-accent mt-5">Learn More</button>

                </div>


                <div className="w-1/4  flex flex-col gap-3 items-center justify-center" >
                    
                <img src="/public/step-2.jpg" alt=""  className="w-1/3 h-[140px]"/>

                <span className="text-2xl font-bold">Place Your Order & Connect</span>

                <span className="text-center w-1/2 text-sm text-gray-500">Found a meal? order it and use in-app chat to coordinate with the seller.
                
                </span>

                <button className="btn btn-outline bg-accent mt-5">Learn More</button>

                </div>


                <div className="w-1/4  flex flex-col gap-3 items-center justify-center">
                    
                <img src="/public/step-3.jpg" alt=""  className="w-1/3 h-[140px]"/>

                <span className="text-2xl font-bold">Pick Up & Enjoy</span>

                <span className="text-center w-1/2 text-sm text-gray-500">Meet the seller at the campus, take the food, and enjoy your meal!
                
                </span>

                <button className="btn btn-outline bg-accent mt-5">Learn More</button>

                </div>
                   <button className="btn mt-8 text-lg font-semibold bg-primary">Join Now!</button>
            </div>
        </div>
    );
};

export default HowitWorks;
