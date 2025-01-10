import DashboardMetrics from "@/components/admin/dashboard/dailyMaterics";
import PopularItemsOfThisWeek from "@/components/admin/dashboard/popularItemsOfThisWeek";
import RecentOrders from "@/components/admin/table/recentOrder.component";

const DashBoard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6 w-full h-full">
      <div>
        <h1 className="lg:text-2xl text-xl font-bold">Overview</h1>
      </div>
      <DashboardMetrics />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentOrders />
        <PopularItemsOfThisWeek />
      </div>
    </div>
  );
};

export default DashBoard;
