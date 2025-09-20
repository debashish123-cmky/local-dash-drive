import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  Users, 
  BarChart3, 
  Route,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  Shield
} from "lucide-react";
import CustomerPortal from "@/components/CustomerPortal";
import BusinessDashboard from "@/components/BusinessDashboard";
import DriverInterface from "@/components/DriverInterface";
import OrderTracking from "@/components/OrderTracking";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: <Package className="h-8 w-8 text-primary" />,
      title: "Order Management",
      description: "Streamlined order placement and management system for seamless operations."
    },
    {
      icon: <Route className="h-8 w-8 text-secondary" />,
      title: "Route Optimization",
      description: "AI-powered route optimization to reduce delivery time and costs by up to 30%."
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Real-time Tracking",
      description: "Live GPS tracking for customers and businesses to monitor delivery progress."
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Multi-User Platform",
      description: "Separate interfaces for customers, businesses, and delivery drivers."
    }
  ];

  const stats = [
    { label: "Active Deliveries", value: "2,847", icon: <Truck className="h-5 w-5" />, change: "+12%" },
    { label: "Orders Today", value: "1,453", icon: <Package className="h-5 w-5" />, change: "+8%" },
    { label: "Delivery Success Rate", value: "98.5%", icon: <CheckCircle className="h-5 w-5" />, change: "+0.3%" },
    { label: "Avg. Delivery Time", value: "23 min", icon: <Clock className="h-5 w-5" />, change: "-5%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Zap className="h-3 w-3 mr-1" />
            Next-Gen Delivery Management
          </Badge>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Optimize Your Local
            <br />
            <span className="text-accent-foreground">Delivery Operations</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Complete delivery management system with real-time tracking, route optimization, 
            and multi-platform interfaces for customers, businesses, and drivers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setActiveTab("customer")}
              className="text-lg px-8"
            >
              <Package className="h-5 w-5 mr-2" />
              Place Order
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => setActiveTab("business")}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Business Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className={`h-4 w-4 mr-1 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-warning'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-warning'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">vs last week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Everything You Need for Modern Delivery</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform handles every aspect of delivery management,
              from order placement to final delivery confirmation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Demo Tabs */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore the Complete System</h2>
            <p className="text-xl text-muted-foreground">
              See how our platform works for customers, businesses, and delivery drivers
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card className="border-0 shadow-large">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">System Overview</CardTitle>
                  <CardDescription className="text-lg">
                    A complete delivery ecosystem designed for efficiency and scalability
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-primary/5 rounded-lg">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Customer Portal</h3>
                    <p className="text-sm text-muted-foreground">Easy order placement with real-time tracking</p>
                  </div>
                  <div className="text-center p-6 bg-secondary/5 rounded-lg">
                    <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Business Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive management and analytics</p>
                  </div>
                  <div className="text-center p-6 bg-success/5 rounded-lg">
                    <Truck className="h-12 w-12 text-success mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Driver Interface</h3>
                    <p className="text-sm text-muted-foreground">Optimized routes and delivery management</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customer">
              <CustomerPortal />
            </TabsContent>

            <TabsContent value="business">
              <BusinessDashboard />
            </TabsContent>

            <TabsContent value="driver">
              <DriverInterface />
            </TabsContent>

            <TabsContent value="tracking">
              <OrderTracking />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Delivery Operations?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of businesses already using our platform to optimize their deliveries
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
              <Star className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;