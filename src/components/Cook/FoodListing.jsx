import { useContext, useState } from 'react';
import { Camera, Clock, Users, Utensils, AlertTriangle, Leaf, Info, DollarSign } from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

<<<<<<< HEAD
export default function CreateListing() {
=======
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function App() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [formData, setFormData] = useState({
    category: '',
    foodName: '',
    price: '',
    image: '',
    ingredients: '',
    allergens: '',
    description: '',
    fat: '',
    protein: '',
    carbs: '',
    calories: '',
    servingSize: '',
    preparationTime: ''
  });
>>>>>>> 6273bec4e22911599145bb25b1c43cfd0ac8c72f

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate progress
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values({ ...formData, [name]: value }).filter(v => v !== '').length;
    setFormProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const foodData = {
      foodName: formData.foodName,
      category: formData.category,
      price: formData.price,
      image: formData.image,
      status: "opens at 10 am",
      foodId: '20',
      sellerName: user.displayName,
      categoryThumbnail: 'https://i.ibb.co.com/ccdmPZt/main-Courses-thumb.jpg',
      discount: 10,
      servingSize: formData.servingSize,
      reviews: [],
      additionalInfo: 'aaaa',
      availability: 'available',
      description: formData.description,
      nutrition: {
        calories: formData.calories,
        protein: formData.protein + 'g',
        carbohydrates: formData.carbs + 'g',
        fat: formData.fat + 'g',
      },
      ingredients: formData.ingredients.split(',').map(item => item.trim()),
      allergens: formData.allergens.split(',').map(item => item.trim()),
      preparationTime: formData.preparationTime,
      email: user.email,
    };

    try {
      const response = await fetch('https://platematebackend.vercel.app/foods', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(foodData)
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('Food added successfully!');
        setFormData({
          category: '',
          foodName: '',
          price: '',
          image: '',
          ingredients: '',
          allergens: '',
          description: '',
          fat: '',
          protein: '',
          carbs: '',
          calories: '',
          servingSize: '',
          preparationTime: ''
        });
        setFormProgress(0);
      } else {
        throw new Error(data.message || 'Failed to add food');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Failed to add food');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="max-w-7xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
          <CardTitle className="text-3xl">Create New Food Listing</CardTitle>
          <CardDescription className="text-white/90">Add your delicious dish to the menu</CardDescription>
          <Progress value={formProgress} className="mt-4 h-2 bg-white/20" />
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid grid-cols-3 gap-4 bg-gray-100 p-1">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients & Details</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition & Serving</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-8">
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-emerald-500" />
                        Category *
                      </Label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-gray-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                      >
                        <option value="">Select a category</option>
                        <option value="Lunch">🥗 Lunch</option>
                        <option value="Main Courses">🍽️ Main Course</option>
                        <option value="Dessert">🍰 Desserts</option>
                        <option value="Snacks">🥤 Snacks</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-500" />
                        Food Name *
                      </Label>
                      <Input
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleInputChange}
                        placeholder="e.g., Grilled Salmon"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        Price (TK) *
                      </Label>
                      <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-500" />
                      Image URL *
                    </Label>
                    <Input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      required
                    />
                    <div className="mt-4 p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-emerald-500 transition-colors text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600 mt-2">
                        Drag and drop or paste image URL above
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-500" />
                      Ingredients *
                    </Label>
                    <Textarea
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      placeholder="List your ingredients here (comma-separated)"
                      required
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-emerald-500" />
                      Allergens *
                    </Label>
                    <Input
                      name="allergens"
                      value={formData.allergens}
                      onChange={handleInputChange}
                      placeholder="e.g., Nuts, Dairy, Shellfish (comma-separated)"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Write a brief description about your food"
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Facts *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { name: 'fat', label: 'Fat (g)' },
                        { name: 'protein', label: 'Protein (g)' },
                        { name: 'carbs', label: 'Carbs (g)' },
                        { name: 'calories', label: 'Calories' }
                      ].map(({ name, label }) => (
                        <div key={name} className="space-y-2">
                          <Label>{label}</Label>
                          <Input
                            type="number"
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2">
                      <Label className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-500" />
                        Serving Size *
                      </Label>
                      <Input
                        name="servingSize"
                        value={formData.servingSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 1 cup, 200g"
                        required
                      />
                    </div>

                    <div className="mt-6 space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        Preparation Time (minutes) *
                      </Label>
                      <Input
                        type="number"
                        name="preparationTime"
                        value={formData.preparationTime}
                        onChange={handleInputChange}
                        placeholder="30"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Create Listing'
                    )}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}