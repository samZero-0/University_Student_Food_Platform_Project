import  { useEffect, useState } from 'react';
import { Check, X, Clock, DollarSign, Mail, User, School, ChefHat, MapPin, Search, Filter } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast ,ToastContainer } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export  function CookApplications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://platematebackend.vercel.app/cookRequests');
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch cook requests. Please try again later.",
      });
      setLoading(false);
    }
  };

  const handleApprove = async (id, name, studentId, email) => {
    setLoading(true);
    try {
      const data = { name, email, studentId };
      
      await Promise.all([
        fetch('https://platematebackend.vercel.app/cookList', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        }),
        fetch(`https://platematebackend.vercel.app/cookRequests/${id}`, {
          method: "DELETE"
        })
      ]);

      setRequests(requests.filter(req => req._id !== id));
      toast({
        title: "Application Approved",
        description: "The cook application has been successfully approved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve application. Please try again.",
      });
    }
    setLoading(false);
  };

  const handleDecline = async (id) => {
    setSelectedRequestId(id);
    setShowDeclineDialog(true);
  };

  const confirmDecline = async () => {
    try {
      await fetch(`https://platematebackend.vercel.app/cookRequests/${selectedRequestId}`, {
        method: "DELETE"
      });
      
      setRequests(requests.filter(req => req._id !== selectedRequestId));
      toast({
        title: "Application Declined",
        description: "The cook application has been declined.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to decline application. Please try again.",
      });
    }
    setShowDeclineDialog(false);
  };

  const filteredRequests = requests.filter(request => 
    request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.studentId.toString().includes(searchTerm)
  );

  const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Food Seller Requests</h1>
            <p className="mt-2 text-gray-600">Review and manage new food seller applications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search requests..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  All Requests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
                  Pending Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Pending Requests"
            value={requests.length}
            icon={Clock}
            colorClass="text-orange-600"
          />
          <StatsCard
            title="Approved Today"
            value="12"
            icon={Check}
            colorClass="text-green-600"
          />
          <StatsCard
            title="Declined Today"
            value="3"
            icon={X}
            colorClass="text-red-600"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request._id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48">
                  <img 
                    src={request.imgUrl} 
                    alt={request.mealName}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-4 right-4" 
                    variant="secondary"
                  >
                    New Request
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle>{request.mealName}</CardTitle>
                  <CardDescription>Food Seller Application</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={request.imgUrl} />
                      <AvatarFallback>{request.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.fullName}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <School className="w-4 h-4 mr-2" />
                      <span>Student ID: {request.studentId}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{request.mealPrice} BDT</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{request.hours}</span>
                    </div>
                  </div>

                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <ChefHat className="w-4 h-4 text-gray-400 mt-1" />
                        <p className="text-sm text-gray-600">{request.practices}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={() => handleApprove(request._id, request.fullName, request.studentId, request.email)}
                    disabled={loading}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDecline(request._id)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center text-center">
              <ChefHat className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
              <p className="text-sm text-gray-500 mt-1">All food seller requests have been processed.</p>
            </CardContent>
          </Card>
        )}

        <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently decline the food seller application.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDecline} className="bg-red-600 hover:bg-red-700">
                Decline Application
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CookApplications;