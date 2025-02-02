import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAnalyticsQuery } from "@/services/api/analayticsApi";
import {
  ClipboardCopy,
  DollarSign,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

interface DailyAnalytics {
  totalOrders: number;
  completedOrders: number;
  totalSales: number;
  pendingOrders: number;
  growthRate: {
    totalSales: number;
    totalOrders: number;
    completedOrders: number;
  };
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  growthRate,
  prefix = "",
}: {
  title: string;
  value: number;
  icon: any;
  growthRate: number;
  prefix?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              {prefix}
              {value.toLocaleString()}
            </h2>
            {growthRate !== undefined && (
              <p
                className={`text-sm mt-1 ${
                  growthRate < 0 ? "text-destructive" : "text-primary"
                }`}
              >
                {growthRate > 0 && "+"}
                {growthRate.toFixed(2)}% from yesterday
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardMetrics() {
  const { data, isSuccess } = useGetAnalyticsQuery({});
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyAnalytics>({
    totalOrders: 0,
    completedOrders: 0,
    totalSales: 0,
    pendingOrders: 0,
    growthRate: {
      totalSales: 0,
      totalOrders: 0,
      completedOrders: 0,
    },
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      setDailyAnalytics(data.data);
    }
  }, [isSuccess, data]);

  const metrics = [
    {
      title: "Total Orders",
      value: dailyAnalytics.totalOrders,
      icon: ShoppingCart,
      growthRate: dailyAnalytics.growthRate.totalOrders,
    },
    {
      title: "Completed Orders",
      value: dailyAnalytics.completedOrders,
      icon: CheckCircle,
      growthRate: dailyAnalytics.growthRate.completedOrders,
    },
    {
      title: "Pending Orders",
      value: dailyAnalytics.pendingOrders,
      icon: ClipboardCopy,
    },
    {
      title: "Total Sales",
      value: dailyAnalytics.totalSales,
      icon: DollarSign,
      growthRate: dailyAnalytics.growthRate.totalSales,
      prefix: "Rs ",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics?.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            growthRate={metric.growthRate || 0}
            prefix={metric.prefix}
          />
        ))}
      </div>
    </div>
  );
}
