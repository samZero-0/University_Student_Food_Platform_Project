import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetails = () => {
    const { foodId } = useParams();
    const [food, setFood] = useState(null);

    console.log(foodId);

    useEffect(() => {
        fetch('../foods.json')
            .then((res) => res.json())
            .then((data) => {
                const foundProduct = data.find((item) => item.foodId == foodId);
                setFood(foundProduct);
            });
    }, [foodId]);

    console.log(food);

    const firstExample = {
        size: 30,
        value: food?.rating || 0,
        edit: false
    };

    const handleAddToCart = () =>{
        toast.success(`${food.foodName} added to cart!`,{
            position: 'top-center',
            autoClose: 1500, 
            closeOnClick: true, 
            pauseOnHover: false, 
        })
    }

    return (
        <div className="md:w-11/12 md:mx-auto mt-20 mb-5 flex  flex-col items-center">
            <ToastContainer />
            {food ? (  
                <div className="border border-gray-300 p-3 w-2/3 rounded-xl flex motion-scale-in-[0.71] motion-translate-x-in-[-3%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[1.00s]/scale motion-duration-[0.87s]/translate motion-delay-[0.03s]/translate motion-duration-[0.84s]/opacity motion-duration-[0.22s]/blur motion-delay-[0.03s]/blur motion-ease-spring-bouncy">

                    {/* Image section */}
                    <div className="w-1/2  flex justify-center">
                        <img src={food.image} alt={food.foodName} className="h-[460px] rounded-xl w-11/12 object-cover"/>
                    </div>

                    {/* Description section */}
                    <div className="w-1/2  p-3 flex flex-col">
                        <div>
                            <span className="text-4xl font-bold">{food.foodName}</span>
                        </div>

                        <div className="mt-1">
                           <span>by <span className="text-yellow-700">{food.sellerName}</span></span> 
                        </div>

                        <div className="mt-2 flex justify-between items-center gap-3">

                            <span className="text-gray-500">Category: {food.category}</span>

                            <div className="flex gap-3 items-center">
                        <ReactStars {...firstExample} />
                        <span className="font-bold">{food.rating}</span>
                        </div>

                        </div>


                        
                        {/* <div className="mt-5">
                            <span className="text-gray-500">Category: {food.category}</span>
                        </div> */}

                        <div className="mt-5">
                            <span className="text-2xl font-bold">{food.price} Tk.</span>
                        </div>

                        <div className="mt-5">
                            <span className="font-semibold text-lg">Details</span>
                            <div className="border border-gray-300 h-[150px] rounded-xl mt-2">

                            </div>
                        </div>

                        <div onClick={()=>handleAddToCart()} className="w-1/3 rounded-xl bg-primary p-3  mt-4 text-center font-bold text-xl cursor-pointer">
                            <button>Add to cart</button>
                        </div>

                                

                        
                    </div>
                </div>
            ) : (
                <p>Loading...</p>  
            )}

                <div className=" w-8/12 rounded-xl mt-10 flex flex-col gap-2 ">

                    <div className="mt-2 p-3 flex justify-center">
                        <span className="text-2xl font-bold">Browse More Dishes from this cook</span>
                    </div>

                    <div className="mt-2 p-3 flex justify-center">
                     <span className="text-xl">Currently there are no items</span>
                                </div>
                     

                </div>


        </div>
    );
};

export default FoodDetails;
