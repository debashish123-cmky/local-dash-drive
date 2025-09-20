import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Navigation, 
  Package, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  DollarSign,
  Fuel,
  Timer,
  Route
} from "lucide-react";

const DriverInterface = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(0);

  const deliveries = [
    {
      id: "#12847",
      customer: "John Smith",
      pickup: "Pizza Express, 123 Main St",
      delivery: "456 Oak Ave, Apt 2B",
      value: "$24.99",
      tip: "$5.00",
      distance: "2.3 miles",
      estimatedTime: "12 min",
      priority: "high",
      phone: "+1 (555) 123-4567"
    },
    {
      id: "#12848",
      customer: "Sarah Wilson",
      pickup: "Coffee Corner, 789 First St",
      delivery: "321 Pine St, Suite 5",
      value: "$18.50",
      tip: "$3.50",
      distance: "1.8 miles",
      estimatedTime: "8 min",
      priority: "normal",
      phone: "+1 (555) 987-6543"
    },
    {
      id: "#12849",
      customer: "David Brown",
      pickup: "Burger King, 555 Second Ave",
      delivery: "789 Elm St, Floor 3",
      value: "$31.25",
      tip: "$6.25",
      distance: "3.1 miles",
      estimatedTime: "15 min",
      priority: "normal",
      phone: "+1 (555) 456-7890"
    }
  ];

  const todayStats = {
    deliveries: 12,
    earnings: "$186.50",
    miles: "34.2",
    rating: 4.9,
    onlineTime: "6h 23m"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "normal": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Driver Status & Stats */}
      <div className="space-y-6">
        <Card className="border-0 shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Driver Status
              <Badge variant={isOnline ? "success" : "destructive"}>
                {isOnline ? "Online" : "Offline"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="online-toggle">Available for deliveries</Label>
              <Switch
                id="online-toggle"
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Location</span>
                <span className="text-sm font-medium">Downtown Area</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Next Delivery ETA</span>
                <span className="text-sm font-medium">12 minutes</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Update Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Today's Performance</CardTitle>
            <CardDescription>Your delivery statistics for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <Package className="h-6 w-6 text-success mx-auto mb-1" />
                <p className="text-xl font-bold text-success">{todayStats.deliveries}</p>
                <p className="text-xs text-muted-foreground">Deliveries</p>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-xl font-bold text-primary">{todayStats.earnings}</p>
                <p className="text-xs text-muted-foreground">Earnings</p>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <Fuel className="h-6 w-6 text-secondary mx-auto mb-1" />
                <p className="text-xl font-bold text-secondary">{todayStats.miles}</p>
                <p className="text-xs text-muted-foreground">Miles</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <Star className="h-6 w-6 text-warning mx-auto mb-1" />
                <p className="text-xl font-bold text-warning">{todayStats.rating}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-muted-foreground">Online Time</span>
              <Badge variant="outline" className="text-sm">{todayStats.onlineTime}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Queue */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Delivery Queue</span>
              <Badge variant="secondary">{deliveries.length} pending</Badge>
            </CardTitle>
            <CardDescription>Optimized route for maximum efficiency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveries.map((delivery, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedDelivery === index 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedDelivery(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {delivery.id}
                    </Badge>
                    <Badge variant={getPriorityColor(delivery.priority)}>
                      {delivery.priority} priority
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{delivery.value}</p>
                    <p className="text-sm text-success">+{delivery.tip} tip</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Pickup: {delivery.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Deliver to: {delivery.customer}</p>
                      <p className="text-muted-foreground">{delivery.delivery}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Route className="h-3 w-3" />
                      {delivery.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      {delivery.estimatedTime}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant={index === 0 ? "default" : "secondary"}>
                      <Navigation className="h-3 w-3 mr-1" />
                      {index === 0 ? "Start Route" : "View"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {selectedDelivery === 0 && (
              <div className="bg-gradient-primary text-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Next Delivery Ready</h4>
                  <Badge className="bg-white/20 text-white">Priority</Badge>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Optimized route will save you 8 minutes and 1.2 miles compared to standard routing.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Picked Up
                  </Button>
                  <Button variant="hero" className="bg-white text-primary hover:bg-white/90">
                    <Navigation className="h-4 w-4 mr-2" />
                    Start Navigation
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverInterface;