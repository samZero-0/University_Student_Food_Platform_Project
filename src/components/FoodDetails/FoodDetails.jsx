import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Context } from "../../provider/Context";

const FoodDetails = () => {
    const {carts,setCarts,quantity,setQuantity }= useContext(Context);

    const { _id } = useParams();
    const [food, setFood] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800 });
        setTimeout(() => {
            fetch(`https://platematebackend.vercel.app/foods/`)
                .then((res) => res.json())
                .then((data) => {
                    const foundProduct = data.find((item) => item._id == _id );
                    setFood(foundProduct);
                    const related = data.filter(item => item.sellerName === foundProduct?.sellerName && item._id !== _id );
                    setRelatedItems(related);
                    setLoading(false);
                });
        }, 1000); 
    }, [_id]);


    const discountedPrice = food ? food.price - (food.price * (food.discount / 100)) : 0;
    const actualPrice = food ? food.price * quantity : 0;
    const totalAmount = food? discountedPrice * quantity : 0;

    const handleAddToCart = (food) => {
        setCarts([...carts, food]);
        toast.success(`${food.foodName} added to cart!`, {
            position: 'top-center',
            autoClose: 1500,
            closeOnClick: true,
            pauseOnHover: false,
            hideProgressBar: true,
            theme: "colored",
        });
    };

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };



    return (
        <div className="container mx-auto px-4 py-6 w-10/12 ">
            <ToastContainer />
            {loading ? (
                <div className="flex justify-center mt-20">
                    <ScaleLoader color="#a0e2ff" />
                </div>
            ) : food ? (
                <div className="bg-gray-100 md:h-[580px]  shadow-lg rounded-lg overflow-hidden flex lg:flex-row flex-col  ">
                    <div className="w-full p-10  lg:w-1/2">
                        <img src={food.image} alt={food.foodName} className="object-cover rounded-2xl h-full w-full" data-aos="fade-right" />
                    </div>
                    <div className="w-full lg:w-1/2 p-10" data-aos="fade-left">
                        <h1 className="text-xl font-bold ">{food.foodName}</h1>
                        <p className="text-gray-500 text-sm">by <span className="text-yellow-700">{food.sellerName}</span></p>
                        <div className="flex items-center mb-2">
                            <ReactStars size={24} value={food.rating} edit={false} />
                            <span className="ml-2 font-bold text-lg">{food.rating}</span>
                        </div>
                        <p className="mb-2"><strong>Category:</strong> {food.category}</p>
                        <p className="mb-2"><strong>Description:</strong> {food.description}</p>
                        <div className="mb-2">
                            <p><strong>Ingredients:</strong> {food.ingredients}</p>
                            <p><strong>Allergens:</strong> {food.allergens}</p>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mb-2">
                            <p><strong>Nutrition:</strong></p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                Calories: {food.nutrition.calories},
                                Protein: {food.nutrition.protein},
                                Carbohydrates: {food.nutrition.carbohydrates},
                                Fat: {food.nutrition.fat}
                            </ul>
                        </div>
                        <div className="flex items-center justify-between font-bold text-xl mb-2">
                            <span className="text-gray-400 line-through">{actualPrice} Tk.</span>
                            
                        </div>
                        <div className="flex justify-between items-center mb-4 space-x-2">
                            <div>
                            <button onClick={() => handleQuantityChange(-1)} className="text-2xl p-2 border rounded">−</button>
                            <span className="mx-2 font-semibold text-lg">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="text-2xl p-2 border rounded">+</button>
                            </div>
                            
                        </div>

                        {/* <div className="font-bold text-lg mb-4">
                            <span>Total Amount: {totalAmount} Tk.</span>
                        </div> */}

                        <p><strong>Additional Info:</strong> {food.additionalInfo}</p>

                        <div className="w-full my-5 flex gap-3 md:gap-12 items-center ">
                        <button onClick={()=>handleAddToCart(food)} className="btn bg-primary text-white px-4 py-2 rounded-md   md:w-1/3 md:text-xl text-lg">Add to Cart</button>
                          <span className="text-green-500 text-lg md:text-2xl font-bold">{totalAmount} Tk.</span>
                        </div>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {food && (
                <div className="border-t border-gray-200 pt-4 mt-6">
                    <h2 className="text-2xl font-bold mb-2">Reviews</h2>
                    {food.reviews.length > 0 ? (
                        food.reviews.map((review, index) => (
                            <div key={index} className="mb-2">
                                <p><strong>{review.username}</strong>: {review.review}</p>
                                <ReactStars size={20} value={review.rating} edit={false} />
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            )}

            <div className="w-full rounded-xl mt-10">
                <div className="p-3 flex justify-center">
                    <span className="text-2xl font-bold">Browse More Dishes from {food?.sellerName}</span>
                </div>
                {relatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-3">
                        {relatedItems.map((item) => (
                            <div key={item._id} className="border rounded-lg shadow-md p-4">
                                <img src={item.image} alt={item.foodName} className="h-[200px] w-full object-cover rounded-md mb-2" />
                                <p className="text-lg font-bold">{item.foodName}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center p-3">
                        <ScaleLoader color="#a0e2ff" />
                        <span className="text-xl ml-3">Loading {food?.sellerName} dishes...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodDetails;
