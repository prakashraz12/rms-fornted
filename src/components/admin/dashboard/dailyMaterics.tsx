import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetAnalyticsQuery } from "@/services/api/analayticsApi";
import { ClipboardCopy, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface dailyAnalytics {
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

export default function DashboardMetrics() {
  const { data, isSuccess } = useGetAnalyticsQuery({});

  const [dailyAnalytics, setDailyAnalytics] = useState<dailyAnalytics>({
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
    if (isSuccess) {
      setDailyAnalytics({
        totalOrders: data?.data?.totalOrders,
        completedOrders: data?.data?.completedOrders,
        totalSales: data?.data?.totalSales,
        pendingOrders: data?.data?.pendingOrders,
        growthRate: {
          totalSales: data?.data?.growthRate?.totalSales,
          totalOrders: data?.data?.growthRate?.totalOrders,
          completedOrders: data?.data?.growthRate?.completedOrders,
        },
      });
    }
  }, [isSuccess]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Orders
            </p>
            <div className="h-8 w-8 rounded-full bg-emerald-50 p-2">
              <ClipboardCopy className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {dailyAnalytics?.totalOrders}
            </h2>
            <p
              className={cn(
                "text-xs",
                dailyAnalytics?.growthRate?.totalOrders < 0
                  ? "text-red-500"
                  : "text-emerald-500"
              )}
            >
              {dailyAnalytics?.growthRate?.totalOrders?.toFixed(2)}% from last
              yesterday
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Completed Orders
            </p>
            <div className="h-8 w-8 rounded-full bg-emerald-50 p-2">
              <ClipboardCopy className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {dailyAnalytics?.completedOrders}
            </h2>
            <p
              className={cn(
                "text-xs",
                dailyAnalytics?.growthRate?.completedOrders < 0
                  ? "text-red-500"
                  : "text-emerald-500"
              )}
            >
              {dailyAnalytics?.growthRate?.completedOrders?.toFixed(2)}% from
              last yesterday
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </p>
            <div className="h-8 w-8 rounded-full bg-emerald-50 p-2">
              <ClipboardCopy className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {dailyAnalytics?.pendingOrders}
            </h2>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Sales
            </p>
            <div className="h-8 w-8 rounded-full bg-emerald-50 p-2">
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Rs {dailyAnalytics?.totalSales}
            </h2>
            <p
              className={cn(
                "text-xs",
                dailyAnalytics?.growthRate?.totalSales < 0
                  ? "text-red-500"
                  : "text-emerald-500"
              )}
            >
              {dailyAnalytics?.growthRate?.totalSales?.toFixed(2)}% from
              yesterday.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
