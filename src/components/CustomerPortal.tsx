import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";

const CustomerPortal = () => {
  const navigate = useNavigate();

  const popularRestaurants = [
    { name: "Pizza Express", rating: 4.8, deliveryTime: "25-35 min", fee: "$2.99", image: "🍕" },
    { name: "Burger King", rating: 4.6, deliveryTime: "20-30 min", fee: "$1.99", image: "🍔" },
    { name: "Sushi Master", rating: 4.9, deliveryTime: "30-40 min", fee: "$3.99", image: "🍣" },
    { name: "Coffee Corner", rating: 4.7, deliveryTime: "15-25 min", fee: "$1.49", image: "☕" }
  ];

  const features = [
    { icon: <CheckCircle className="h-5 w-5 text-success" />, text: "Real-time order tracking" },
    { icon: <CheckCircle className="h-5 w-5 text-success" />, text: "Multiple delivery options" },
    { icon: <CheckCircle className="h-5 w-5 text-success" />, text: "Fast & reliable service" },
    { icon: <CheckCircle className="h-5 w-5 text-success" />, text: "Secure payment processing" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Placement CTA */}
      <Card className="border-0 shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Package className="h-6 w-6 text-primary" />
            Start Your Order
          </CardTitle>
          <CardDescription className="text-lg">
            Quick and easy order placement with real-time tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-primary text-white p-6 rounded-lg text-center">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Place an Order?</h3>
            <p className="text-white/90 mb-6">
              Sign in to access our full delivery platform with personalized recommendations and order history.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/auth')}
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Sign In & Order Now
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-lg">What you'll get:</h4>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {feature.icon}
                <span className="text-muted-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Delivery Fee:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">Starting at $1.49</Badge>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Average delivery time: 15-35 minutes
            </div>
          </div>
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

        <Card className="border-0 shadow-soft bg-gradient-secondary text-white">
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
  );
};

export default CustomerPortal;