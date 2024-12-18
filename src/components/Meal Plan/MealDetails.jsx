import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Context } from "../../provider/Context";

const MealDetails = () => {
    const { carts, setCarts } = useContext(Context);
    const [quantity, setQuantity] = useState(1);
    
    const [food, setFood] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { mealId } = useParams();

    console.log(mealId);

    useEffect(() => {
        AOS.init({ duration: 800 });
    
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://platematebackend.vercel.app/mealPlan`);
    
                if (!response.ok) {
                    throw new Error('Failed to fetch meal data');
                }
    
                const data = await response.json();
                console.log(data);
    
                const foundProduct = data.find((item) => item.mealId === Number(mealId)); // Fix type issue
    
                if (!foundProduct) {
                    throw new Error('Meal not found');
                }
    
                setFood(foundProduct);
                const related = data.filter(item =>
                    item.sellerName === foundProduct.sellerName &&
                    item._id !== foundProduct._id
                );
                setRelatedItems(related);
            } catch (err) {
                setError(err.message);
                toast.error('Failed to load meal details');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData(); // Direct call, no timeout
    }, [mealId]); // Dependency updated
    

    const discountedPrice = food ? food.price - (food.price * (food.discount / 100)) : 0;
    const actualPrice = food ? food.price * quantity : 0;
    const totalAmount = food ? discountedPrice * quantity : 0;

    const handleAddToCart = (food) => {
        if (!food) return;

        const existingItemIndex = carts.findIndex(item => item._id == food._id);

        if (existingItemIndex >= 0) {
            const updatedCarts = [...carts];
            updatedCarts[existingItemIndex] = {
                ...updatedCarts[existingItemIndex],
                quantity: (updatedCarts[existingItemIndex].quantity || 1) + quantity
            };
            setCarts(updatedCarts);
        } else {
            setCarts([...carts, { ...food, quantity }]);
        }

        toast.success(`${food.foodName} added to cart!`, {
            position: 'top-center',
            autoClose: 1500,
            closeOnClick: true,
            pauseOnHover: false,
            hideProgressBar: true,
            theme: "colored",
        });

        setQuantity(1);
    };

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6 flex justify-center mt-20">
                <ScaleLoader color="#a0e2ff" />
            </div>
        );
    }

    if (!food) {
        return (
            <div className="container mx-auto px-4 py-6 text-center">
                <p>No meal found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 w-10/12">
            <ToastContainer />
            <div className="bg-gray-100 md:h-[680px] shadow-lg rounded-lg overflow-hidden flex lg:flex-row flex-col">
                <div className="w-full p-10 lg:w-1/2">
                    <img
                        src={food.image}
                        alt={food.foodName}
                        className="object-cover rounded-2xl h-full w-full"
                        data-aos="fade-right"
                        onError={(e) => {
                            e.target.src = '/fallback-image.jpg';
                            e.target.onerror = null;
                        }}
                    />
                </div>
                <div className="w-full lg:w-1/2 p-10" data-aos="fade-left">
                    <h1 className="text-xl font-bold">{food.mealName}</h1>
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
                            <li>Calories: {food.nutrition?.calories}</li>
                            <li>Protein: {food.nutrition?.protein}</li>
                            <li>Carbohydrates: {food.nutrition?.carbohydrates}</li>
                            <li>Fat: {food.nutrition?.fat}</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-between font-bold text-xl mb-2">
                        <span className="text-gray-400 line-through">{actualPrice.toFixed(2)} Tk.</span>
                    </div>

                    <div className="flex justify-between items-center mb-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="text-2xl p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <span className="mx-2 font-semibold text-lg">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="text-2xl p-2 border rounded hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <p><strong>Additional Info:</strong> {food.additionalInfo}</p>

                    <div className="w-full my-5 flex gap-3 md:gap-12 items-center">
                        <button
                            onClick={() => handleAddToCart(food)}
                            className="btn bg-primary text-white px-4 py-2 rounded-md md:w-1/3 md:text-xl text-lg hover:bg-opacity-90 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <span className="text-green-500 text-lg md:text-2xl font-bold">
                            {totalAmount.toFixed(2)} Tk.
                        </span>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-4 mt-6">
                <h2 className="text-2xl font-bold mb-2">Reviews</h2>
                {food.reviews && food.reviews.length > 0 ? (
                    <div className="grid gap-4">
                        {food.reviews.map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <p className="font-bold">{review.username}</p>
                                <ReactStars size={20} value={review.rating} edit={false} />
                                <p className="mt-2">{review.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>

            {/* Related Items Section */}
            <div className="w-full rounded-xl mt-10">
                <div className="p-3 flex justify-center">
                    <span className="text-2xl font-bold">
                        Browse More Dishes 
                    </span>
                </div>
                {relatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-3">
                        {relatedItems.map((item) => (
                            <Link to={`/mealDetails/${item.mealId}`} key={item._id}>
                                <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                                    <img
                                        src={item.image}
                                        alt={item.foodName}
                                        className="h-[200px] w-full object-cover rounded-md mb-2"
                                        onError={(e) => {
                                            e.target.src = '/fallback-image.jpg';
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <p className="text-lg font-bold">{item.mealName}</p>
                                    <p className="text-gray-600">{item.price.toFixed(2)} Tk.</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-3">
                        <ScaleLoader color="#a0e2ff" />
                        <span className="text-xl ml-3">Loading {food.sellerName} dishes...</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default MealDetails;
