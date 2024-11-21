import { useEffect } from "react";
import { PiNumberSquareOneBold } from "react-icons/pi";
import { PiNumberSquareTwoBold } from "react-icons/pi";
import { PiNumberSquareThreeBold } from "react-icons/pi";
import { PiNumberSquareFourBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const BeforeYouBegin = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="md:w-11/12 md:mx-auto mt-28 mb-5">
      <div className="flex flex-col gap-2 items-center ">
        
        <div className="flex flex-col gap-3 items-center">
          <span className="text-lg">Become a Cook</span>
          <span className="text-2xl font-bold md:text-4xl">
            Requirements for Becoming a Seller
          </span>
        </div>
        <div className="flex w-full  gap-11 mt-5">
            <div className=" w-1/2 ">
        <div className="md:flex md:flex-row flex flex-col items-center gap-2 mt-16 border border-gray-300 rounded-xl p-4 w-11/12 md:w-full shadow-lg">
          <PiNumberSquareOneBold className="text-3xl font-bold text-accent" />
          <img
            src="/student.webp"
            alt=""
            className="h-[100px] w-1/8 opacity-90 "
          />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">University Enrollment</span>
            <span>
              You must be an active student at the university with a valid
              student ID.
            </span>
          </div>
        </div>

        <div className="md:flex md:flex-row flex flex-col items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-11/12 md:w-full shadow-lg">
          <PiNumberSquareTwoBold className="text-3xl font-bold text-accent" />
          <img
            src="/food-safety.webp"
            alt=""
            className="h-[100px] w-1/8 opacity-90 "
          />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Food Quality and Safety</span>
            <span>
              Ensure that the food you sell is fresh, properly prepared, and
              stored under safe conditions.
            </span>
          </div>
        </div>

        <div className="md:flex md:flex-row flex flex-col items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-11/12 md:w-full shadow-lg">
          <PiNumberSquareThreeBold className="text-3xl font-bold text-accent" />
          <img
            src="/price.png"
            alt=""
            className="h-[100px] w-1/8 opacity-90 "
          />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Pricing Guidelines</span>
            <span>
              Set fair and affordable prices, keeping in mind the student
              community's budget.
            </span>
          </div>
        </div>

        <div className="md:flex md:flex-row flex flex-col items-center gap-7 mt-10 border border-gray-300 rounded-xl p-4 w-11/12 md:w-full shadow-lg">
          <PiNumberSquareFourBold className="text-3xl font-bold text-accent" />
          <img
            src="/delivery.jpg"
            alt=""
            className="h-[100px] w-1/8 opacity-90 "
          />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">
              Availability and Timely Delivery
            </span>
            <span>
              Be responsive to messages from buyers and ensure timely delivery
              of meals at agreed locations.
            </span>
          </div>
          </div>
         
        </div>

    
           <div className="flex flex-col w-1/2 mt-5">

           <span className="text-2xl font-bold mt-10">What we check for Approval</span>
            <div className="flex flex-col gap-4">
            <span className="text-lg py-2 mt-4">🗹 Clean kitchen photos</span>
            <span className="text-lg py-2">🗹 Safe food handling</span>
            <span className="text-lg py-2">🗹 Accurate nutritional data</span>
            <span className="text-lg py-2"> 🗹 Adherence to healthy food standards</span>
            </div>

           </div>
        </div>

       

        <div className="diff aspect-[16/9] mt-10">
  <div className="diff-item-1">
    <div
      style={{
        backgroundImage: "url('/kitchen1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      className="bg-primary text-primary-content grid place-content-center text-9xl font-bold "
    >
      Kitchen <div className="flex flex-col gap-4 ">
        <span className="text-7xl text-primary">Standards</span>
        <span className="text-xl text-white w-1/2">Confirmation that food is prepared in a clean, sanitized environment.</span>
        <span className="text-xl text-white w-1/2"> Submission of photos of the kitchen/preparation area (if required by the system).</span>
      </div>
    </div>
  </div>
  <div
    style={{
      backgroundImage: "url('/menu1.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}
    className="diff-item-2"
  >
    <div className="bg-base-200 bg-opacity-10 grid place-content-center text-9xl font-black ">
      Menu <div className="flex flex-col gap-4 ">
        <span className="text-7xl text-white">Comliance</span>
        <span className="text-xl text-primary-content w-1/2">Agreement to adhere to the platform’s healthy food criteria (e.g., use of fresh ingredients, limited use of sugar, low-fat cooking methods).</span>
        <span className="text-xl text-primary-content w-1/2"> Nutritional breakdown for each menu item, including calorie count, macronutrients (carbs, proteins, fats), and allergens.</span>
      </div>
    </div>
  </div>
  <div className="diff-resizer"></div>
</div>


        <div className="w-full flex justify-center mt-16">
          <Link to="/cookReg" className="w-full flex justify-center">
            <button className="p-3 bg-primary rounded-xl md:w-1/3 text-center text-black font-bold text-xl">
              I agree and want to continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeforeYouBegin;
