import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Category = ({ food }) => {
  const { category, foodName, price, image, sellerName, rating, status, discount, foodId, nutrition } = food;

  const statusStyles = {
    Open: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    "Opens at": "bg-yellow-50 text-yellow-800",
  };

  const getStatusStyle = () => {
    if (status === "Open") return statusStyles.Open;
    if (status === "Closed") return statusStyles.Closed;
    if (status.includes("Opens at")) return statusStyles["Opens at"];
    return "bg-gray-100 text-gray-600"; 
  };

  // const handleView(food){



  // }

  return (
    <div className="flex flex-col w-80 border border-gray-200 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 bg-white">
      
      {/* Image Section with Discount Badge */}
      <div className="relative">
        <img src={image} alt={foodName} className="w-full h-48 object-cover rounded-t-2xl" />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-green-500 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-md">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Food Name and Rating */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">{foodName}</h2>
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{category}</p>

        {/* Price and Seller */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-">{price} Tk.</span>
          <span className="text-xs text-gray-400">by {sellerName}</span>
        </div>

        {/* nutrition info */}

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-">Calories: {nutrition.calories} Kcal </span>
         
        </div>

        {/* Status and Buy Button */}
        <div className="flex justify-between items-center mt-4">
          <span className={`text-sm font-medium px-3 py-1 rounded-lg shadow ${getStatusStyle()}`}>
            {status || "Open"} 
          </span>

          <Link to={`/details/${foodId}`}>
          <button 
            className="py-2 px-5 bg-gradient-to-r from-green-500 to-primary text-white font-bold text-sm rounded-lg hover:bg-gradient-to-l hover:from-primary hover:to-green-400 transition-all duration-200 ease-in-out shadow-lg"
          >
            View
          </button>
          </Link>

        </div>
      </div>
    </div>
  );
};



Category.propTypes = {
  food: PropTypes.shape({
    category: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    sellerName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Category;
