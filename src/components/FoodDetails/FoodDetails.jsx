import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Context } from "../../provider/Context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Minus,
  Plus,
  Utensils,
  AlertTriangle,
  Heart,
  ShoppingCart
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function FoodDetails() {
  const { carts, setCarts } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();
  const [food, setFood] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    setTimeout(() => {
      fetch(`https://platematebackend.vercel.app/foods/`)
        .then((res) => res.json())
        .then((data) => {
          const foundProduct = data.find((item) => item._id == _id);
          setFood(foundProduct);
          const related = data.filter(
            (item) => item.sellerName === foundProduct?.sellerName && item._id !== _id
          );
          setRelatedItems(related);
          setLoading(false);
        });
    }, 1000);
  }, [_id]);

  const discountedPrice = food ? food.price - (food.price * (food.discount / 100)) : 0;
  const actualPrice = food ? food.price * quantity : 0;
  const totalAmount = food ? discountedPrice * quantity : 0;

  const handleAddToCart = (food) => {
    const existingItemIndex = carts.findIndex((item) => item._id === food._id);

    if (existingItemIndex >= 0) {
      const updatedCarts = [...carts];
      updatedCarts[existingItemIndex] = {
        ...updatedCarts[existingItemIndex],
        quantity: (updatedCarts[existingItemIndex].quantity || 1) + quantity,
      };
      setCarts(updatedCarts);
    } else {
      setCarts([...carts, { ...food, quantity: quantity }]);
    }

    toast.success(`${food.foodName} added to cart!`, {
      position: "top-center",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "colored",
    });

    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Food item not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <Card className="overflow-hidden" data-aos="fade-right">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={food.image}
                  alt={food.foodName}
                  className="w-full h-[500px] object-cover"
                />
                {food.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500">
                    {food.discount}% OFF
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card data-aos="fade-left">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{food.foodName}</CardTitle>
                  <CardDescription>
                    by{" "}
                    <span className="text-primary font-medium">
                      {food.sellerName}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < food.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-primary" />
                      <span className="font-medium">Category:</span> {food.category}
                    </div>
                    <p className="text-gray-600">{food.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">Allergens:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {food.allergens.map((allergen, idx) => (
                          <Badge key={idx} variant="secondary">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(food.nutrition).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 p-4 rounded-lg text-center"
                      >
                        <p className="text-gray-600 capitalize">{key}</p>
                        <p className="text-lg font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  {food.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {food.reviews.map((review, idx) => (
                        <Card key={idx}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {review.username}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </CardHeader>
                          <CardContent>{review.review}</CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No reviews yet.
                    </p>
                  )}
                </TabsContent>
              </Tabs>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 line-through">
                      {actualPrice.toFixed(2)} Tk
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {totalAmount.toFixed(2)} Tk
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-primary"
                    onClick={() => handleAddToCart(food)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="" variant="outline" size="icon">
                    <Heart className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>More from {food.sellerName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedItems.map((item) => (
                  <Card key={item._id} className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="h-48 w-full object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-lg">{item.foodName}</CardTitle>
                      <CardDescription>
                        {item.price} Tk
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}