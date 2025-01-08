/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Users,
  ShoppingCart,
  DollarSign,
  List,
  AlertCircle,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronDown,
  Activity,
  Store,
  Star,
  Calendar,
  Mail,
  Phone,
  Map,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample Data
const revenueData = [
  { month: 'Jan', revenue: 12000, orders: 450 },
  { month: 'Feb', revenue: 19000, orders: 520 },
  { month: 'Mar', revenue: 15000, orders: 480 },
  { month: 'Apr', revenue: 22000, orders: 580 },
  { month: 'May', revenue: 28000, orders: 650 },
  { month: 'Jun', revenue: 25000, orders: 600 },
];

const userDistributionData = [
  { name: 'Regular Users', value: 6500 },
  { name: 'Premium Users', value: 2300 },
  { name: 'Vendors', value: 1200 },
  { name: 'Admin', value: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const users = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 3 === 0 ? 'Admin' : index % 2 === 0 ? 'Vendor' : 'User',
  status: index % 4 === 0 ? 'Pending' : 'Active',
  joinDate: '2024-01-01',
  orders: Math.floor(Math.random() * 50),
}));

const restaurants = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: `Restaurant ${index + 1}`,
  owner: `Owner ${index + 1}`,
  cuisine: ['Italian', 'Chinese', 'Indian', 'Mexican'][index % 4],
  rating: (3 + Math.random() * 2).toFixed(1),
  orders: Math.floor(Math.random() * 1000),
  status: index % 3 === 0 ? 'Pending' : 'Active',
}));

const orders = Array(10).fill(null).map((_, index) => ({
  id: `ORD${1000 + index}`,
  customer: `Customer ${index + 1}`,
  restaurant: `Restaurant ${index % 5 + 1}`,
  amount: Math.floor(50 + Math.random() * 200),
  status: ['Pending', 'Preparing', 'Delivered', 'Cancelled'][index % 4],
  date: '2024-01-01',
}));

// Components
const StatsCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className={`rounded-full p-3 bg-${color}-100 mr-4`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-center">
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <span className={`ml-2 flex items-center text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { type: 'New Order', user: 'John Doe', time: '2m ago', amount: '$156.00' },
          { type: 'New Review', user: 'Sarah Smith', time: '5m ago', rating: '4.5' },
          { type: 'New Restaurant', user: 'Tasty Bites', time: '10m ago', status: 'Pending' },
        ].map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/api/placeholder/32/32`} />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
              </div>
            </div>
            {activity.amount && <span className="font-semibold">{activity.amount}</span>}
            {activity.rating && <Badge>⭐ {activity.rating}</Badge>}
            {activity.status && (
              <Badge variant="outline" className="bg-yellow-100">
                {activity.status}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const TableActions = () => (
  <div className="flex items-center space-x-2">
    <Button variant="ghost" size="icon">
      <Eye className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Edit className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

export default function CompleteDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Total Users" value="12,345" icon={Users} trend={12} />
              <StatsCard title="Total Orders" value="45,678" icon={ShoppingCart} trend={-5} />
              <StatsCard title="Revenue" value="$789,012" icon={DollarSign} trend={8} />
              <StatsCard title="Active Restaurants" value="234" icon={Store} trend={15} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                      <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RecentActivity />
              
              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Restaurant Applications', count: 12, progress: 70 },
                      { name: 'Menu Items', count: 45, progress: 60 },
                      { name: 'User Verifications', count: 28, progress: 85 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-500">{item.count}</span>
                        </div>
                        <Progress value={item.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Add User</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell>
                          <TableActions />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Restaurant Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cuisines</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Add Restaurant</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">{restaurant.name}</TableCell>
                        <TableCell>{restaurant.owner}</TableCell>
                        <TableCell>{restaurant.cuisine}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {restaurant.rating}
                          </div>
                        </TableCell>
                        <TableCell>{restaurant.orders}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={restaurant.status === 'Active' ? 'default' : 'secondary'}
                          >
                            {restaurant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <TableActions />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.restaurant}</TableCell>
                        <TableCell>${order.amount}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              order.status === 'Delivered' 
                                ? 'default'
                                : order.status === 'Cancelled'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <TableActions />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}