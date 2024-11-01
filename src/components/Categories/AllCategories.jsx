import { useEffect, useState } from "react";
import Category from "./Category/Category";
import PromotionalCarousel from "./PromotionalCarousel";

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

  return (
    <div className="md:w-11/12 md:mx-auto mt-20 mb-5">
      <PromotionalCarousel />

      <h1 className="mt-10 mb-10 text-3xl font-bold text-center">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
        <div>
          <div className="text-3xl font-bold mt-10">All Foods</div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-5">
            {categories.map((food, idx) => (
              <Category key={idx} food={food} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mt-10">{selectedCategory}</h1>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-5">
            {filteredFoods.map((food, idx) => (
              <Category key={idx} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllCategories;
