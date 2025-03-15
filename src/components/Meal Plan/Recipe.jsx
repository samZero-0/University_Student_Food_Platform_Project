import Marquee from "react-fast-marquee";
import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';

const RecipeSuggestions = () => {
  const recipes = [
    { 
      id: 1,
      name: "Grilled Chicken Salad", 
      image: "https://i.ibb.co/12pX328/grilled-chicken.jpg",
      time: "25 min",
      difficulty: "Easy",
      rating: 4.8,
      recipeUrl: "https://www.allrecipes.com/recipe/16409/grilled-chicken-salad/"
    },
    { 
      id: 2,
      name: "Fish Curry", 
      image: "https://i.ibb.co/zSLF0TT/fish-currry.jpg",
      time: "35 min",
      difficulty: "Medium",
      rating: 4.5,
      recipeUrl: "https://www.bbcgoodfood.com/recipes/collection/fish-curry-recipes"
    },
    { 
      id: 3,
      name: "Pancakes", 
      image: "https://i.ibb.co/M28NHdn/pancake.jpg",
      time: "15 min",
      difficulty: "Easy",
      rating: 4.9,
      recipeUrl: "https://www.tasteofhome.com/recipes/fluffy-pancakes/"
    },
    { 
      id: 4,
      name: "Vegetable Stir Fry", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHGPRhSREA-H8Z5cEddsA94RDQUeAHl5UQ9g&s",
      time: "20 min",
      difficulty: "Easy",
      rating: 4.6,
      recipeUrl: "https://cookieandkate.com/vegetable-stir-fry-recipe/"
    },
    { 
      id: 5,
      name: "Beef Burger", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP7IqE_5zGYlHKPXosN2eyi4QJ4bq2ykUDew&s",
      time: "30 min",
      difficulty: "Medium",
      rating: 4.7,
      recipeUrl: "https://www.foodnetwork.com/recipes/bobby-flay/perfect-burger-recipe-1957542"
    },
    { 
      id: 6,
      name: "Chocolate Brownies", 
      image: "https://40204166.fs1.hubspotusercontent-na1.net/hubfs/40204166/Best%20Chocolate%20Brownie%20Recipe%20NZ%20Chelsea%20Sugar.jpg",
      time: "40 min",
      difficulty: "Medium",
      rating: 4.9,
      recipeUrl: "https://sallysbakingaddiction.com/seriously-fudgy-homemade-brownies/"
    },
    { 
      id: 7,
      name: "Spaghetti Carbonara", 
      image: "https://www.sipandfeast.com/wp-content/uploads/2022/09/spaghetti-carbonara-recipe-snippet.jpg",
      time: "25 min",
      difficulty: "Medium",
      rating: 4.8,
      recipeUrl: "https://www.bonappetit.com/recipe/simple-carbonara"
    },
    { 
      id: 8,
      name: "Vegetable Soup", 
      image: "https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-2-1200.jpg",
      time: "45 min",
      difficulty: "Easy",
      rating: 4.4,
      recipeUrl: "https://www.inspiredtaste.net/9603/simple-vegetable-soup-recipe/"
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && remainder >= 0.5) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Recipe Suggestions</h2>
          <p className="text-gray-600 mb-6">Explore new recipes for your meal plan</p>
        </div>
        
        <Marquee 
          pauseOnHover={true} 
          speed={50} 
          gradientWidth={50}
          gradientColor={[255, 255, 255]}
        >
          <div className="flex gap-6 py-4 px-2">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="card w-64 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <figure className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-64 h-48 object-cover hover:scale-105 transition-transform duration-300" 
                  />
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-80 hover:opacity-100">
                    <FaHeart className="text-gray-500 hover:text-red-500 transition-colors" />
                  </button>
                </figure>
                
                <div className="card-body p-4">
                  <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    {renderStars(recipe.rating)}
                    <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-1" /> {recipe.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUtensils className="mr-1" /> {recipe.difficulty}
                    </div>
                  </div>
                  
                  <a 
                    href={recipe.recipeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block mt-3 w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-center"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default RecipeSuggestions;