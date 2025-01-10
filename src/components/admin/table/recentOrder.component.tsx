import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGetOrders from "@/hooks/useGetOrders";
import { OrderType } from "@/enums/orderType.enum";
import { HandPlatter, PackageOpen } from "lucide-react";

interface Order {
  tableNumber: number;
  items: number;
  total: number;
  status: "pending" | "completed";
}

export default function RecentOrders() {
  const { orders } = useGetOrders();

  const getStatusStyles = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50";
      case "completed":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "pending";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {orders?.map((order) => (
          <div
            key={order.orderNumber}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                {order?.orderType === "TAKE_AWAY" && (
                  <HandPlatter className="h-6 w-6 text-emerald-900" />
                )}
                {order?.orderType === "DELIVERY" && (
                  <PackageOpen className="h-6 w-6 text-emerald-900" />
                )}
              </div>
              <div className="space-y-1">
                {order?.orderType === OrderType.DINE_IN ? (
                  <></>
                ) : (
                  <p>{order?.orderType}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {order?.totalItems} items • Rs.{order?.totalAmount}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={getStatusStyles(order.status)}
            >
              {getStatusLabel(order.status)}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
