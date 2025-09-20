import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Package, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  MapPin,
  Truck
} from "lucide-react";

const BusinessDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const recentOrders = [
    { id: "#12847", customer: "John Smith", status: "in-transit", time: "2:34 PM", value: "$24.99", driver: "Mike Johnson" },
    { id: "#12846", customer: "Sarah Wilson", status: "delivered", time: "2:15 PM", value: "$18.50", driver: "Emma Davis" },
    { id: "#12845", customer: "David Brown", status: "preparing", time: "2:08 PM", value: "$31.25", driver: "Unassigned" },
    { id: "#12844", customer: "Lisa Garcia", status: "in-transit", time: "1:55 PM", value: "$22.75", driver: "Tom Anderson" },
    { id: "#12843", customer: "Robert Taylor", status: "delivered", time: "1:42 PM", value: "$19.99", driver: "Anna Lee" }
  ];

  const drivers = [
    { name: "Mike Johnson", status: "active", orders: 3, rating: 4.9, location: "Downtown", eta: "12 min" },
    { name: "Emma Davis", status: "active", orders: 2, rating: 4.8, location: "North Side", eta: "8 min" },
    { name: "Tom Anderson", status: "active", orders: 4, rating: 4.7, location: "East District", eta: "15 min" },
    { name: "Anna Lee", status: "break", orders: 0, rating: 4.9, location: "South Area", eta: "On break" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "in-transit": return "default";
      case "preparing": return "warning";
      default: return "secondary";
    }
  };

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "break": return "warning";
      case "offline": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold text-foreground">$4,234</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm font-medium text-success">+12.5%</span>
              <span className="text-sm text-muted-foreground ml-1">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
              <span className="text-sm text-muted-foreground">75% capacity</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Truck className="h-5 w-5 text-secondary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Users className="h-4 w-4 text-secondary mr-1" />
              <span className="text-sm font-medium text-secondary">3 available</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</p>
                <p className="text-2xl font-bold text-foreground">23m</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-success">-2 min</span>
              <span className="text-sm text-muted-foreground ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card className="border-0 shadow-large">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Real-time order management and tracking</CardDescription>
              </div>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {order.status === "in-transit" && <Truck className="h-3 w-3 mr-1" />}
                        {order.status === "preparing" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {order.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.value}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm font-medium">{order.driver}</p>
                      {order.driver !== "Unassigned" && (
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="mt-6">
          <Card className="border-0 shadow-large">
            <CardHeader>
              <CardTitle>Driver Management</CardTitle>
              <CardDescription>Monitor and manage your delivery team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {drivers.map((driver, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={getDriverStatusColor(driver.status)}>
                        {driver.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">{driver.location}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{driver.orders} orders</p>
                      <p className="text-sm text-muted-foreground">Rating: {driver.rating}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{driver.eta}</p>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        Locate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-large">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key business indicators and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Order Completion Rate</span>
                    <span className="text-sm text-muted-foreground">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-muted-foreground">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">On-Time Delivery</span>
                    <span className="text-sm text-muted-foreground">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-large">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Financial performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-success/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-2xl font-bold text-success">$4,234</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Average</p>
                    <p className="text-2xl font-bold text-primary">$3,890</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Growth</p>
                    <p className="text-2xl font-bold text-secondary">+15.3%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;