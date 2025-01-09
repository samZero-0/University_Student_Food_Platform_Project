import  { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EnhancedFoodServiceForm() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [mealPrices, setMealPrices] = useState([{ meal: '', price: '' }]);
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.get('fullName').trim()) newErrors.fullName = 'Full name is required';
    if (!formData.get('studentId').trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.get('practices').trim()) newErrors.practices = 'Food practices description is required';
    if (!formData.get('hours').trim()) newErrors.hours = 'Available hours are required';
    if (!formData.get('agreement')) newErrors.agreement = 'You must agree to maintain food quality standards';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateMealPrice = (index, field, value) => {
    const newMealPrices = [...mealPrices];
    newMealPrices[index][field] = value;
    setMealPrices(newMealPrices);
  };

  const addMealPrice = () => {
    setMealPrices([...mealPrices, { meal: '', price: '' }]);
  };

  const removeMealPrice = (index) => {
    if (mealPrices.length > 1) {
      const newMealPrices = mealPrices.filter((_, i) => i !== index);
      setMealPrices(newMealPrices);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (!validateForm(formData)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const initialData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://platematebackend.vercel.app/cookRequests', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(initialData)
      });

      if (!response.ok) throw new Error('Failed to submit application');

      toast.success('Application submitted successfully!');
      e.target.reset();
      setMealPrices([{ meal: '', price: '' }]);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Food Service Application</CardTitle>
          <CardDescription className="text-center">
            Join our community of food service providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.fullName}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter your student ID"
                  className={errors.studentId ? 'border-red-500' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="practices">Food Preparation Practices</Label>
                <Textarea
                  id="practices"
                  name="practices"
                  placeholder="Describe your food preparation and storage practices..."
                  className={errors.practices ? 'border-red-500' : ''}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Meal Options</Label>
                {mealPrices.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Meal name"
                      name={`mealName${index}`}
                      value={item.meal}
                      onChange={(e) => updateMealPrice(index, 'meal', e.target.value)}
                    />
                    <Input
                      placeholder="Price"
                      name={`mealPrice${index}`}
                      value={item.price}
                      onChange={(e) => updateMealPrice(index, 'price', e.target.value)}
                    />
                    {mealPrices.length > 1 && (
                      <Button 
                        type="button"
                        variant="destructive"
                        onClick={() => removeMealPrice(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addMealPrice}
                  className="w-full"
                >
                  Add Another Meal
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imgUrl">Image URL</Label>
                <Input
                  type="url"
                  id="imgUrl"
                  name="imgUrl"
                  placeholder="Enter image URL for your meal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Available Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  placeholder="e.g., Mon-Fri: 5PM-9PM, Sat-Sun: 12PM-8PM"
                  className={errors.hours ? 'border-red-500' : ''}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="agreement" name="agreement" />
                <Label htmlFor="agreement" className="text-sm">
                  I agree to maintain food quality standards
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary text-black hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
      />
    </div>
  );
}