import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  User,
  Phone,
  MessageCircle,
  Star,
  Navigation
} from "lucide-react";

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("#12847");

  const orderStatus = {
    current: "in-transit",
    progress: 75,
    estimatedTime: "8-12 minutes",
    driver: {
      name: "Mike Johnson",
      rating: 4.9,
      phone: "+1 (555) 123-4567",
      vehicle: "Honda Civic - ABC123"
    },
    timeline: [
      { status: "placed", time: "2:15 PM", completed: true, description: "Order placed successfully" },
      { status: "confirmed", time: "2:17 PM", completed: true, description: "Restaurant confirmed order" },
      { status: "preparing", time: "2:20 PM", completed: true, description: "Kitchen started preparation" },
      { status: "ready", time: "2:32 PM", completed: true, description: "Order ready for pickup" },
      { status: "picked-up", time: "2:34 PM", completed: true, description: "Driver picked up order" },
      { status: "in-transit", time: "2:36 PM", completed: true, description: "On the way to delivery address" },
      { status: "delivered", time: "Est. 2:48 PM", completed: false, description: "Order will be delivered" }
    ],
    order: {
      id: "#12847",
      restaurant: "Pizza Express",
      customer: "John Smith",
      address: "456 Oak Ave, Apt 2B",
      items: [
        { name: "Margherita Pizza (Large)", price: "$18.99", quantity: 1 },
        { name: "Garlic Bread", price: "$5.99", quantity: 1 }
      ],
      total: "$24.99"
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    
    switch (status) {
      case "in-transit":
        return <Truck className="h-4 w-4 text-primary animate-pulse-glow" />;
      case "delivered":
        return <Package className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Order Tracking Input */}
      <div className="lg:col-span-3">
        <Card className="border-0 shadow-soft mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">Track Your Order</label>
                <Input 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter order ID or tracking number"
                  className="mt-1"
                />
              </div>
              <Button variant="default">
                <MapPin className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Tracking */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-large">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Live Tracking
                </CardTitle>
                <CardDescription>Order {orderStatus.order.id} from {orderStatus.order.restaurant}</CardDescription>
              </div>
              <Badge variant="default" className="animate-pulse-glow">
                {orderStatus.current.replace('-', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Delivery Progress</span>
                <span className="text-muted-foreground">{orderStatus.progress}% complete</span>
              </div>
              <Progress value={orderStatus.progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Estimated delivery: <span className="font-medium text-foreground">{orderStatus.estimatedTime}</span>
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 text-center border-2 border-dashed border-border">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-lg font-semibold mb-2">Live Map View</h3>
              <p className="text-muted-foreground">
                Real-time GPS tracking would be displayed here showing driver location and route
              </p>
              <Button variant="outline" className="mt-4">
                <Navigation className="h-4 w-4 mr-2" />
                View Full Screen Map
              </Button>
            </div>

            {/* Driver Info */}
            <Card className="bg-gradient-secondary text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{orderStatus.driver.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-sm">{orderStatus.driver.rating}</span>
                        <span className="text-sm text-white/80">• {orderStatus.driver.vehicle}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  Your driver is on the way! You can contact them directly for any special instructions.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Order Details & Timeline */}
      <div className="space-y-6">
        {/* Order Summary */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>{orderStatus.order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{orderStatus.order.restaurant}</p>
              <p className="text-sm text-muted-foreground">Delivering to: {orderStatus.order.address}</p>
            </div>
            
            <div className="space-y-2">
              {orderStatus.order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>{orderStatus.order.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderStatus.timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-1 ${step.completed ? 'text-success' : 'text-muted-foreground'}`}>
                    {getStatusIcon(step.status, step.completed)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium text-sm ${
                        step.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.description}
                      </p>
                      <span className={`text-xs ${
                        step.completed ? 'text-muted-foreground' : 'text-muted-foreground/60'
                      }`}>
                        {step.time}
                      </span>
                    </div>
                    {step.status === orderStatus.current && (
                      <Badge variant="default" className="mt-1 text-xs">Current</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;