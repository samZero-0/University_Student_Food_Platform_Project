import  { useState } from 'react';

const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState('normal');
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [food, setFood] = useState({
    name: '',
    madeBy: '',
    description: '',
    ingredients: '',
    allergies: '',
    nutrition: '',
    price: '',
    discount: '',
    additionalInfo: '',
  });
  const [recommendations, setRecommendations] = useState('');

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const newCategory = { name: categoryName, type: categoryType, foods: [] };
    setCategories([...categories, newCategory]);
    setCategoryName('');
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      const updatedCategories = categories.map((cat) => {
        if (cat.name === selectedCategory) {
          return { ...cat, foods: [...cat.foods, food] };
        }
        return cat;
      });
      setCategories(updatedCategories);
      setFood({
        name: '',
        madeBy: '',
        description: '',
        ingredients: '',
        allergies: '',
        nutrition: '',
        price: '',
        discount: '',
        additionalInfo: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Categories</h1>

      {/* Category Creation Form */}
      <form onSubmit={handleCategorySubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Category Type:</label>
          <select
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="normal">Normal Category</option>
            <option value="healthy">Healthy Category</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {categoryType === 'healthy' && (
          <div className="mb-4">
            <label className="block mb-2">Recommendations:</label>
            <textarea
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Category
        </button>
      </form>

      {/* Food Addition Form (for normal categories) */}
      {categories.filter((cat) => cat.type === 'normal').length > 0 && (
        <form onSubmit={handleFoodSubmit} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add Food to Category</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              {categories
                .filter((cat) => cat.type === 'normal')
                .map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          {[
            'name',
            'madeBy',
            'description',
            'ingredients',
            'allergies',
            'nutrition',
            'price',
            'discount',
            'additionalInfo',
          ].map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-2 capitalize">{field}:</label>
              <input
                type="text"
                name={field}
                value={food[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Food
          </button>
        </form>
      )}

      {/* Display Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.name} className="mb-2">
              <strong>{category.name}</strong> ({category.type})
              {category.type === 'healthy' && (
                <p className="text-sm text-gray-600">Recommendations: {category.recommendations}</p>
              )}
              {category.type === 'normal' && category.foods.length > 0 && (
                <ul className="ml-4">
                  {category.foods.map((food, index) => (
                    <li key={index} className="text-sm">
                      {food.name} - ${food.price}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategories;