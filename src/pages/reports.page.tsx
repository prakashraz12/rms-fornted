import HeaderProvider from "@/components/common/headerProvider.component";
import ScaleWrapper from "@/components/common/scaleLayoutWrapper.component";

const Reports = () => {
  return (
    <ScaleWrapper>
      <HeaderProvider title="Reports" actionButton buttonName="weekly report" />
    </ScaleWrapper>
  );
};

export default Reports;
