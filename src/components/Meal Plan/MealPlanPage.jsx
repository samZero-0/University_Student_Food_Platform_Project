import { useEffect, useState } from "react"
import { Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import CreateMealCard from "./CreateMealCard"
import Marquee from "react-fast-marquee";
import DietPlanner from "./DietPlanner";
import RecipeSuggestions from "./Recipe";


export default function MealPlanner() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://platematebackend.vercel.app/mealPlan')
      .then(res => res.json())
      .then(data => setMeals(data))
  }, [])

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);




  // const nutritionData = [
  //   { day: "Mon", calories: 2100, protein: 100, carbs: 250, fat: 70 },
  //   { day: "Tue", calories: 2000, protein: 110, carbs: 230, fat: 65 },
  //   { day: "Wed", calories: 2200, protein: 105, carbs: 260, fat: 75 },
  //   { day: "Thu", calories: 1950, protein: 95, carbs: 240, fat: 60 },
  //   { day: "Fri", calories: 2150, protein: 115, carbs: 255, fat: 70 },
  //   { day: "Sat", calories: 2300, protein: 120, carbs: 270, fat: 80 },
  //   { day: "Sun", calories: 2050, protein: 100, carbs: 245, fat: 65 },
  // ]

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Personalized Meal Plan</h1>



      {/* Meal Plan Customization */}
      <div className="w-full rounded-xl   my-5 flex flex-col gap-3 p-3">

        <div className="flex  flex-col items-center my-5">


          <div className="grid md:grid-cols-3 gap-6 w-full text-center">
            {
              meals.map((meal, index) => <CreateMealCard key={index} meal={meal}></CreateMealCard>)
            }
          </div>


        </div>

      </div>


      <div className="flex flex-col items-center mt-10">
        <h1 className="font-semibold text-2xl">Create Your Meal Plan</h1>
        <h1 className="font-light text-base lg:w-1/3 text-center my-5">Personalize and elevate your daily dietary routines for a healthier, more balanced lifestyle</h1>
        <DietPlanner />
      </div>

      {/* Weekly Meal Planner */}
      {/* <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Weekly Meal Planner</h2>
          <p>Plan your meals for the entire week</p>
          <div className="grid md:grid-cols-7 gap-4 ">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="space-y-2 ">
                <h3 className="font-semibold text-center">{day}</h3>
                {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                  <div key={meal} className="bg-base-200 p-2 rounded-md text-center text-sm cursor-pointer">
                    {meal}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Recipe Suggestions */}


      {/* Nutritional Information */}
      {/* <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Nutritional Information</h2>
          <p>Track your daily nutritional intake</p>
          <div className="w-full h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutritionData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#8884d8" />
                <Bar dataKey="protein" fill="#82ca9d" />
                <Bar dataKey="carbs" fill="#ffc658" />
                <Bar dataKey="fat" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div> */}

      <RecipeSuggestions></RecipeSuggestions>






      {/* Tips and Resources */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Tips and Resources</h2>
          <p>Helpful information for successful meal planning</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Plan your meals around sales and seasonal produce</li>
            <li>Prep ingredients in advance for quicker weeknight cooking</li>
            <li>Use leftovers creatively to reduce food waste</li>
            <li>Balance your plate with a variety of food groups</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Info className="mr-2 h-4 w-4" />
              Learn More About Meal Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}