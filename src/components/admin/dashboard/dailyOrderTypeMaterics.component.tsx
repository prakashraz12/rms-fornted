import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDailyOrderTypeMappingQuery } from "@/services/api/order.api";
import { motion } from "framer-motion";
const OrderTypeMaterics = () => {
  const { data } = useDailyOrderTypeMappingQuery({});
  console.log(data, "dailu ma");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Order Analytics</CardTitle>
          <CardDescription>Today's order breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dine-in</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Takeaway</span>
                <span className="font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Delivery</span>
                <span className="font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderTypeMaterics;
