import { MostOrderedDishesChart } from "@/components/admin/dashboard/mostOrderDish.component";
import { PickHourChart } from "@/components/admin/dashboard/pickHourChart.component";
import { WaiterAnalysisCard } from "@/components/admin/dashboard/waiterAnalaysis.component";
import RecentOrdersTable from "@/components/admin/table/recentOrder.component";
import AnalyticsCard from "@/components/common/analaytics.component";

const DashBoard = () => {
  return (
    <div className="p-6 space-y-6 w-full h-full">
      <div>
        <h1 className="lg:text-2xl text-xl font-bold">Overview</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnalyticsCard
          title="Total Sales"
          value={1000}
          previousValue={900}
          currency="$"
          progressColor="green"
        />
        <AnalyticsCard
          title="Completed Orders"
          value={20}
          previousValue={25}
          currency="$"
          progressColor="green"
        />
        <AnalyticsCard
          title="Pending Orders"
          value={20}
          previousValue={10}
          currency="$"
          progressColor="green"
        />
        <AnalyticsCard
          title="Total Customers"
          value={20}
          previousValue={10}
          currency="$"
          progressColor="green"
        />
        <AnalyticsCard
          title="Reserved Tables"
          value={20}
          previousValue={10}
          currency="$"
          progressColor="green"
        />
      </div>
      <RecentOrdersTable />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PickHourChart />
        <WaiterAnalysisCard />
        <MostOrderedDishesChart />
      </div>
    </div>
  );
};

export default DashBoard;
