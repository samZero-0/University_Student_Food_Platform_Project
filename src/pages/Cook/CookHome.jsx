import { useContext, useEffect, useState } from 'react';
import { 
  ChefHat, 
  ShoppingBag, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Settings,
  LogOut,
  Plus,
  Search
} from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CookHome() {
  const { user } = useContext(AuthContext);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
      fetch(`https://platematebackend.vercel.app/foods/${user?.email}`)
          .then((res) => res.json())
          .then((data) => setFoodItems(data));
  }, [user?.email]);

  const stats = [
      { label: 'Total Sales', value: '$4,385.00', icon: DollarSign, trend: '+12.5%' },
      { label: 'Items Sold', value: '465', icon: ShoppingBag, trend: '+8.2%' },
      { label: 'Active Listings', value: '12', icon: TrendingUp, trend: '+3.1%' },
      { label: 'Avg. Rating', value: '4.8', icon: Star, trend: '+0.3%' },
  ];

  return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-8 sm:py-16">
              {/* Enhanced Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 bg-white rounded-2xl p-6 shadow-sm space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                      <div className="relative">
                          <img
                              src={user?.photoURL}
                              alt="Chef"
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg ring-4 ring-orange-100"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-4 border-white"></div>
                      </div>
                      <div>
                          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.displayName}!</h1>
                          <p className="text-sm sm:text-base text-gray-500 mt-1">Let's cook something amazing today</p>
                      </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="relative w-full sm:w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input placeholder="Search dishes..." className="pl-8" />
                      </div>
                      <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Dish
                      </Button>
                  </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {stats.map((stat, i) => (
                      <Card key={i} className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                          <CardContent className="pt-6">
                              <div className="flex items-center justify-between mb-4">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                  </div>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                                      {stat.trend}
                                  </Badge>
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</h3>
                              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>

              {/* Enhanced Food Listings */}
              <Card>
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <CardTitle>My Listings</CardTitle>
                      <Button variant="ghost" className="text-orange-600 hover:text-orange-700 mt-4 sm:mt-0">
                          View All
                      </Button>
                  </CardHeader>
                  <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {foodItems.map((item) => (
                              <div
                                  key={item._id}
                                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                              >
                                  <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-36 sm:h-48 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                      <h3 className="text-white font-semibold mb-1">{item.foodName}</h3>
                                      <div className="flex items-center justify-between">
                                          <span className="text-white/90">${item.price}</span>
                                          <div className="flex items-center space-x-2">
                                              <ShoppingBag className="w-4 h-4 text-white/90" />
                                              <span className="text-white/90">20 sold</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                      <span className="text-sm font-medium">{item.rating}</span>
                                  </div>
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <Button
                                              variant="ghost"
                                              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                                          >
                                              <Settings className="h-4 w-4" />
                                          </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                          <DropdownMenuItem>Edit</DropdownMenuItem>
                                          <DropdownMenuItem>Delete</DropdownMenuItem>
                                          <DropdownMenuItem>Hide</DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  );
}
