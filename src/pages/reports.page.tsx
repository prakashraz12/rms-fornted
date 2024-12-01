import HeaderProvider from "@/components/common/headerProvider.component";
import ScaleWrapper from "@/components/common/scaleLayoutWrapper.component";
import { SalesChart } from "@/components/report/salesReport.component";

const Reports = () => {
  return (
    <ScaleWrapper>
      <HeaderProvider title="Reports" actionButton buttonName="weekly report" />
      <SalesChart />
    </ScaleWrapper>
  );
};

export default Reports;
