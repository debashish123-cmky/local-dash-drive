import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Clock, CreditCard, Star } from "lucide-react";

const CustomerPortal = () => {
  const [orderType, setOrderType] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const popularRestaurants = [
    { name: "Pizza Express", rating: 4.8, deliveryTime: "25-35 min", fee: "$2.99", image: "🍕" },
    { name: "Burger King", rating: 4.6, deliveryTime: "20-30 min", fee: "$1.99", image: "🍔" },
    { name: "Sushi Master", rating: 4.9, deliveryTime: "30-40 min", fee: "$3.99", image: "🍣" },
    { name: "Coffee Corner", rating: 4.7, deliveryTime: "15-25 min", fee: "$1.49", image: "☕" }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Placement Form */}
      <Card className="border-0 shadow-large">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Place Your Order
          </CardTitle>
          <CardDescription>
            Quick and easy order placement with real-time tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickup">Pickup Address</Label>
              <Input id="pickup" placeholder="Enter pickup location" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery Address</Label>
              <Input id="delivery" placeholder="Enter delivery location" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="orderType">Order Type</Label>
            <Select value={orderType} onValueChange={setOrderType}>
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
            <Select value={deliveryTime} onValueChange={setDeliveryTime}>
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

          <div>
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea 
              id="notes" 
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

          <Button variant="hero" className="w-full" size="lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Place Order - $3.99
          </Button>
        </CardContent>
      </Card>

      {/* Popular Options */}
      <div className="space-y-6">
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

        <Card className="border-0 shadow-soft bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Track Your Order</h3>
            </div>
            <p className="text-white/90 mb-4">
              Get real-time updates on your delivery status with live GPS tracking
            </p>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View Live Tracking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortal;