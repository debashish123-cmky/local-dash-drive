import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  Truck,
  Loader2
} from "lucide-react";

const BusinessDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeOrders: 0,
    todayRevenue: 0,
    avgDeliveryTime: 23,
    successRate: 98.5
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const drivers = [
    { name: "Mike Johnson", status: "active", orders: 3, rating: 4.9, location: "Downtown", eta: "12 min" },
    { name: "Emma Davis", status: "active", orders: 2, rating: 4.8, location: "North Side", eta: "8 min" },
    { name: "Tom Anderson", status: "active", orders: 4, rating: 4.7, location: "East District", eta: "15 min" },
    { name: "Anna Lee", status: "break", orders: 0, rating: 4.9, location: "South Area", eta: "On break" }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load recent orders
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRecentOrders(ordersData);

      // Calculate stats from real data
      const activeOrdersQuery = query(
        collection(db, 'orders'),
        where('status', 'in', ['placed', 'preparing', 'in-transit'])
      );
      
      const activeOrdersSnapshot = await getDocs(activeOrdersQuery);
      const activeOrdersCount = activeOrdersSnapshot.size;

      // Calculate today's orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayOrdersQuery = query(
        collection(db, 'orders'),
        where('createdAt', '>=', today)
      );
      
      const todayOrdersSnapshot = await getDocs(todayOrdersQuery);
      const todayOrdersCount = todayOrdersSnapshot.size;

      setStats({
        activeOrders: activeOrdersCount,
        todayRevenue: todayOrdersCount * 24.99, // Approximate revenue
        avgDeliveryTime: 23,
        successRate: 98.5
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatOrderData = (order: any) => {
    return {
      id: order.id || '#' + Math.random().toString(36).substr(2, 5),
      customer: order.userName || 'Anonymous',
      status: order.status || 'placed',
      time: order.createdAt?.toDate?.()?.toLocaleTimeString() || 'Recently',
      value: order.orderValue || '$24.99',
      driver: order.driver || 'Unassigned'
    };
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold text-foreground">${stats.todayRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeOrders}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
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
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</p>
                <p className="text-2xl font-bold text-foreground">{stats.avgDeliveryTime}m</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
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
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <p className="text-sm text-muted-foreground">Orders will appear here once customers start placing them</p>
                  </div>
                ) : (
                  recentOrders.map((order, index) => {
                    const formattedOrder = formatOrderData(order);
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <Badge variant={getStatusColor(formattedOrder.status)}>
                            {formattedOrder.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {formattedOrder.status === "in-transit" && <Truck className="h-3 w-3 mr-1" />}
                            {formattedOrder.status === "preparing" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {formattedOrder.status}
                          </Badge>
                          <div>
                            <p className="font-medium">{formattedOrder.id}</p>
                            <p className="text-sm text-muted-foreground">{formattedOrder.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formattedOrder.value}</p>
                          <p className="text-sm text-muted-foreground">{formattedOrder.time}</p>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-sm font-medium">{formattedOrder.driver}</p>
                          {formattedOrder.driver !== "Unassigned" && (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              Track
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
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
                    <p className="text-2xl font-bold text-success">${stats.todayRevenue.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Orders</p>
                    <p className="text-2xl font-bold text-primary">{stats.activeOrders}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold text-secondary">{stats.successRate}%</p>
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