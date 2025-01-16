import DashboardMetrics from "@/components/admin/dashboard/dailyMaterics";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Clock,
  ShoppingBag,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";

import PopularItemsOfTheDay from "@/components/admin/dashboard/popularItemsOfTheDay";
import RecentOrders from "@/components/admin/dashboard/recentOrders";
import OrderTypeMaterics from "@/components/admin/dashboard/dailyOrderTypeMaterics.component";

const DashBoard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 w-full h-full">
      <div>
        <h1 className="lg:text-2xl text-xl font-bold">Overview</h1>
      </div>
      <DashboardMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <RecentOrders />
        {/* Popular Items */}
        <PopularItemsOfTheDay />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Status</CardTitle>
              <CardDescription>Current kitchen performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Avg. Preparation Time</span>
                  </div>
                  <span className="font-medium">18 mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-green-600" />
                    <span>Active Chefs</span>
                  </div>
                  <span className="font-medium">8/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>Delayed Orders</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <OrderTypeMaterics />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <ShoppingBag className="mr-2 h-4 w-4" />
                New Order
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Staff
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Utensils className="mr-2 h-4 w-4" />
                Update Menu
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;
