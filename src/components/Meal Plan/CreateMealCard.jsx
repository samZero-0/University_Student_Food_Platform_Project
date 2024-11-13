

const CreateMealCard = ({meal}) => {

    const {planType,mealType,mealName,rating,image,description} = meal;

    return (
        <div className="border border-gray-300  rounded-xl flex justify-center flex-col items-center shadow-lg motion-scale-in-[0.69] motion-translate-x-in-[107%] motion-translate-y-in-[-3%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[1.20s]/scale motion-duration-[1.05s]/translate motion-duration-[0.70s]/opacity motion-duration-[1.16s]/blur  hover:scale-105 transform transition duration-300">

            <div className="w-full">
                <img src={image} alt="" className="w-full h-[270px] object-cover rounded-lg"/>
            </div>

            <div className="">
                <span className="text-lg font-semibold">{mealName} </span>
            </div>

            <div className="my-5">
                <span className="text-xl font-bold">{planType} Based Meal</span>
            </div>

           

            <div className="mt-2 ">
                <span className="text-sm text-gray-600 font-light p-4">{description} </span>
            </div>

            <div className="mt-2 w-full mb-2">
               <button className="btn bg-primary w-1/3 rounded-lg p-2 text-base">See More</button>
            </div>
            
            
        </div>
    );
};

export default CreateMealCard;