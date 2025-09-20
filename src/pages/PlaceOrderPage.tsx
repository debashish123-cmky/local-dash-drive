import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Package, 
  Clock, 
  CreditCard, 
  Star, 
  LogOut, 
  User,
  CheckCircle,
  Loader2
} from "lucide-react";

const PlaceOrderPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [orderForm, setOrderForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    orderType: "",
    deliveryTime: "",
    specialInstructions: "",
    customerPhone: ""
  });

  const popularRestaurants = [
    { name: "Pizza Express", rating: 4.8, deliveryTime: "25-35 min", fee: "$2.99", image: "🍕" },
    { name: "Burger King", rating: 4.6, deliveryTime: "20-30 min", fee: "$1.99", image: "🍔" },
    { name: "Sushi Master", rating: 4.9, deliveryTime: "30-40 min", fee: "$3.99", image: "🍣" },
    { name: "Coffee Corner", rating: 4.7, deliveryTime: "15-25 min", fee: "$1.49", image: "☕" }
  ];

  useEffect(() => {
    if (user) {
      loadOrderHistory();
    }
  }, [user]);

  const loadOrderHistory = async () => {
    if (!user) return;

    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(ordersQuery);
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrderHistory(orders);
    } catch (error) {
      console.error('Error loading order history:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to place an order.",
        variant: "destructive"
      });
      return;
    }

    if (!orderForm.pickupAddress || !orderForm.deliveryAddress || !orderForm.orderType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...orderForm,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        status: 'placed',
        createdAt: new Date(),
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        orderValue: '$24.99', // This would be calculated based on actual items
        deliveryFee: '$3.99'
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast({
        title: "Order placed successfully!",
        description: "We'll send you updates on your delivery.",
      });

      // Reset form
      setOrderForm({
        pickupAddress: "",
        deliveryAddress: "",
        orderType: "",
        deliveryTime: "",
        specialInstructions: "",
        customerPhone: ""
      });

      // Reload order history
      loadOrderHistory();

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'in-transit': return 'default';
      case 'preparing': return 'warning';
      case 'placed': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Delivery System</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.displayName || user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Placement Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Place Your Order
                </CardTitle>
                <CardDescription>
                  Fill in your delivery details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup">Pickup Address *</Label>
                      <Input 
                        id="pickup" 
                        value={orderForm.pickupAddress}
                        onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                        placeholder="Enter pickup location" 
                        className="mt-1" 
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery">Delivery Address *</Label>
                      <Input 
                        id="delivery" 
                        value={orderForm.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                        placeholder="Enter delivery location" 
                        className="mt-1" 
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orderType">Order Type *</Label>
                      <Select value={orderForm.orderType} onValueChange={(value) => handleInputChange('orderType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select order type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food Delivery</SelectItem>
                          <SelectItem value="package">Package Delivery</SelectItem>
                          <SelectItem value="grocery">Grocery Delivery</SelectItem>
                          <SelectItem value="pharmacy">Pharmacy Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
                      <Select value={orderForm.deliveryTime} onValueChange={(value) => handleInputChange('deliveryTime', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select delivery time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="30min">Within 30 minutes</SelectItem>
                          <SelectItem value="1hour">Within 1 hour</SelectItem>
                          <SelectItem value="2hours">Within 2 hours</SelectItem>
                          <SelectItem value="scheduled">Schedule for later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={orderForm.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="Your phone number" 
                      className="mt-1" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea 
                      id="notes" 
                      value={orderForm.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      placeholder="Add any special delivery instructions..."
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Estimated Delivery Fee:</span>
                      <Badge variant="secondary" className="text-lg px-3 py-1">$3.99</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Estimated delivery time: 25-35 minutes
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Place Order - $3.99
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Options */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Popular Near You
                </CardTitle>
                <CardDescription>
                  Top-rated restaurants and stores in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularRestaurants.map((restaurant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border hover:shadow-soft transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{restaurant.image}</div>
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {restaurant.rating}
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          {restaurant.deliveryTime}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{restaurant.fee}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order History */}
            {orderHistory.length > 0 && (
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>
                    Your order history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {orderHistory.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{order.orderType}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(order.status)} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Track Order CTA */}
            <Card className="border-0 shadow-soft bg-gradient-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Track Your Order</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Get real-time updates on your delivery status with live GPS tracking
                </p>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate('/?tab=tracking')}
                >
                  View Live Tracking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;