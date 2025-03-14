import { useContext, useState } from 'react';
import { Camera, Clock, Users, Utensils, AlertTriangle, Leaf, Info, Plus, ArrowRight, DollarSign } from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateListing() {

    const {user} = useContext((AuthContext));

    console.log(user.email);
    const [loading,setLoading] = useState(false);

  

  

  

    const handleSubmit = (e) => {
      setLoading(true)
      e.preventDefault();
      const form = e.target;
  
      const foodName = form.foodName.value;
      const category = form.category.value;
      const price = form.price.value;
      const image = form.image.value;
      const status = "opens at 10 am";
      const foodId = '20';
      const sellerName = user.displayName;
      const categoryThumbnail = 'https://i.ibb.co.com/ccdmPZt/main-Courses-thumb.jpg';
      const discount = 10;
      const servingSize = form.servingSize.value;
      const reviews = [];
      const additionalInfo = 'aaaa';
      const availability = 'available';
      const description = form.description.value;
  
      const nutrition = {
          calories: form.calories.value,
          protein: form.protein.value + 'g',
          carbohydrates: form.carbs.value + 'g',
          fat: form.fat.value + 'g',
      };
  
      // Splitting ingredients and allergies into arrays
      const ingredients = form.ingredients.value.split(',').map(item => item.trim());
      const allergens = form.allergens.value.split(',').map(item => item.trim());
      
      const preparationTime = form.preparationTime.value;
      const email = user.email;
      
  
      const food = {
          foodName,
          category,
          price,
          image,
          nutrition,
          ingredients,
          allergens,
          preparationTime,
          email,
          status,
          foodId,
          sellerName,
          categoryThumbnail,
          discount,
          servingSize,
          reviews,
          additionalInfo,
          availability,
          description
      };
  
      fetch('https://platematebackend.vercel.app/foods', {
          method: "POST",
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(food)
      })
      .then(res => res.json())
      .then(data => {
          setLoading(false)
          toast.success('Added food');
          console.log(data);
          form.reset();
      })
      .catch(error => {
        setLoading(false);
        toast.error('Failed to add food');
        console.error(error);
    });
  };
  

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
        <ToastContainer></ToastContainer>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#76fb74] p-6">
          <h2 className="text-3xl font-bold text-black">Create New Food Listing</h2>
          <p className="text-black mt-2">Add your delicious dish to the menu</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Utensils className="w-4 h-4 mr-2 text-orange-500" />
                  Category
                </label>
                <select
                  name="category"
                  
                  className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
                >
                  <option value="">Select a category</option>
                  <option value="Lunch">🥗 Lunch</option>
                  <option value="Main Courses">🍽️ Main Course</option>
                  <option value="Dessert">🍰 Desserts</option>
                  <option value="Snacks">🥤 Snacks</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Info className="w-4 h-4 mr-2 text-orange-500" />
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="e.g., Grilled Salmon"
                  required
                  className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    required
                    className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">TK</span>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Camera className="w-4 h-4 mr-2 text-orange-500" />
                Image
              </label>
              <input type="url" name='image' placeholder='Enter image url' required/>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors">
                
               
                 
                  <div className="space-y-1 text-center">
                    <Plus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                        Upload a file
                        <input
                          id="image-upload"
                          name="image1"
                          type="url"
                          className="sr-only"
                          
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                
              </div>
            </div>
          </div>

          {/* Ingredients and Allergens */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Leaf className="w-4 h-4 mr-2 text-orange-500" />
                Ingredients
              </label>
              <textarea
                name="ingredients"
                rows="3"
                placeholder="List your ingredients here..."
                required
                className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                Allergens
              </label>
              <input
                type="text"
                name="allergens"
                placeholder="e.g., Nuts, Dairy, Shellfish"
                required
                className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
              />
            </div>


            <div >
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Write brief description about your food"
                required
                className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
              />
            </div>


          </div>

          {/* Nutrition Facts */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>

            <div className='flex gap-5'>
  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
    Fat
  </label>
  <div className="relative">
    <input
      type="number"
      name="fat"
      className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
      required
    />
  </div>

  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
    Protein
  </label>
  <div className="relative">
    <input
      type="number"
      name="protein"
      className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
      required
    />
  </div>

  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
    Carbs
  </label>
  <div className="relative">
    <input
      type="number"
      name="carbs"
      className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
      required
    />
  </div>

  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
    Calories
  </label>
  <div className="relative">
    <input
      type="number"
      name="calories"
      className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
      required
    />
  </div>
</div>



            <div className="mt-4">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 mr-2 text-orange-500" />
                Serving Size
              </label>
              <input
                type="text"
                name="servingSize"
                placeholder="e.g., 1 cup, 200g"
                required
                className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              Preparation Time
            </label>
            <div className="relative w-full md:w-1/4">
              <input
                type="number"
                name="preparationTime"
                placeholder="30"
                className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">min</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-[#76fb74] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              {loading? <span className="loading loading-spinner loading-md"></span>:'Create Listing'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}