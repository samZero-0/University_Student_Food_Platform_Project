import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const MealPlanDetails = () => {
    const { planType } = useParams();
    
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetch('../mealPlan.json')
                .then((res) => res.json())
                .then((data) => {
                    const filteredMeals = data.filter((item) => item.planType === planType);
                    setMeals(filteredMeals);    
                });
        }, 1000);
    }, [planType]);



    return (
        <div className="container mx-auto px-4 py-6 w-10/12">
            {meals.length > 0 ? (
                <>
                    <div className="w-full text-center">
                        <h1 className="text-4xl font-bold">{meals[0].planType} Based Meal Plans</h1>
                    </div>

                    <div className="my-5">
                        <span><span className="text-xl font-bold">Diet Focus: </span>{meals[0].foodSuggestion.dietFocus}</span>
                    </div>

                    <div className="my-5">
                        <span className="text-xl font-bold">Recommendations: </span>
                    </div>

                    <div className="my-5">
                        <table className="table-auto w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Food Category</th>
                                    <th className="px-4 py-2 border">Examples</th>
                                    <th className="px-4 py-2 border">Benefits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meals[0].foodSuggestion.recommendedFoods.map((food, index) => (
                                    <tr key={index} className="border">
                                        <td className="px-4 py-2 border">{food.category}</td>
                                        <td className="px-4 py-2 border">{food.examples.join(', ')}</td>
                                        <td className="px-4 py-2 border">{food.benefits}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full my-10">
                        <h1 className="text-xl font-semibold">You can try these items...</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {meals.map((meal) => (
                            <div key={meal.mealId} className="p-4 border border-gray-400 rounded-lg shadow">
                                <img src={meal.image} alt={meal.mealName} className="w-full h-[250px] object-cover rounded-md mb-3" />
                                <h2 className="text-xl font-bold mb-1">{meal.mealName}</h2>
                                <p className="text-gray-700">{meal.description}</p>
                                <Link to={`/mealDetails/${meal.mealId}`}><button  className="btn bg-primary my-5">Order Now</button></Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4 justify-center items-center mt-80">
                    <span>Loading</span>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            )}
        </div>
    );
};

export default MealPlanDetails;
