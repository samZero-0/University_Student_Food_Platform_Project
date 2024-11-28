import { useEffect, useState } from "react";
import Category from "./Category/Category";
import PromotionalCarousel from "./PromotionalCarousel";
import { FaSortAmountDownAlt } from "react-icons/fa";
const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('foods.json')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const uniqueCategories = Array.from(
    new Set(categories.map((food) => food.category))
  ).map((category) => {
    const categoryData = categories.find((food) => food.category === category);
    return {
      category: categoryData.category,
      categoryThumbnail: categoryData.categoryThumbnail,
      categoryId: categoryData.categoryId,
    };
  });

  let filteredFoods = [];
  if (selectedCategory !== null) {
    filteredFoods = categories.filter((food) => food.category === selectedCategory);
  }

  const handleSort = () => {
    const sortedCategories = [...categories].sort((a, b) => {
      const caloriesA = a.nutrition.calories;
      const caloriesB = b.nutrition.calories;
      return caloriesA - caloriesB; 
    });
    setCategories(sortedCategories);
  };

  return (
    <div className="md:w-11/12 md:mx-auto mt-20 mb-5">
     


      <PromotionalCarousel />

      <h1 className="mt-5 mb-5 text-3xl font-bold text-center">Categories</h1>

      <div className=" grid grid-cols-1 p-3 md:grid-cols-5 gap-4 motion-scale-in-[0.48] motion-translate-x-in-[-50%] motion-translate-y-in-[-2%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[1.82s]/scale motion-duration-[1.58s]/translate motion-delay-[0.06s]/translate motion-duration-[1.52s]/opacity motion-duration-[1.24s]/blur motion-delay-[0.06s]/blur motion-ease-spring-snappy">
        {uniqueCategories.map((item) => (
          <div
            key={item.categoryId}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(item.category)}
          >
            <img src={item.categoryThumbnail} alt={item.category} className="w-full h-[200px] object-cover rounded-lg" />
            <h2 className="text-center mt-2 text-lg font-bold">{item.category}</h2>
          </div>
        ))}
      </div>
   

      {!selectedCategory ? (
        <div className="  ">
          <div className="text-3xl font-bold mt-10 flex justify-between ml-4 md:ml-52  mb-12">All Foods

          <div className="mr-3 md:mr-48">
        <button onClick={handleSort} className="btn items-center flex">Sort By Calorie <FaSortAmountDownAlt  className="text-xl"/></button>
      </div>
          </div>


        <div className="flex flex-col  items-center ">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-10 mt-5 motion-translate-x-in-[3%] motion-translate-y-in-[85%] motion-duration-[0.86s]/translate">
            {categories.map((food, idx) => (
              <Category key={idx} food={food} />
            ))}
          </div>

        </div>
        </div>
      ) : (
        <>
        <div className="flex flex-col  items-center ">
          <h1 className="text-3xl font-bold mt-10 mb-10">{selectedCategory}</h1>
          
          <div className="grid md:grid-cols-4 grid-cols-1 gap-10 mt-5 motion-scale-in-[0.48] motion-translate-x-in-[-50%] motion-translate-y-in-[-2%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[1.82s]/scale motion-duration-[1.58s]/translate motion-delay-[0.06s]/translate motion-duration-[1.52s]/opacity motion-duration-[1.24s]/blur motion-delay-[0.06s]/blur motion-ease-spring-snappy">
            {filteredFoods.map((food, idx) => (
              <Category key={idx} food={food} />
            ))}
          </div>
          </div>
        </>
      )}
      
    </div>
  );
};

export default AllCategories;
