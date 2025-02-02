import { SalesReport } from "./salesReport.component";

const MyReports = () => {
  return (
    <div className="container mx-auto  mt-6">
      <h2 className="text-2xl font-semibold">Reports</h2>
      <p className="text-sm">Here you can see all your reports.</p>

      <div className="mt-6">
        <div>
          <h3>Orders Reports</h3>
          <p>Here you can see all your orders in charts.</p>
        </div>
        <SalesReport />
      </div>
    </div>
  );
};

export default MyReports;
