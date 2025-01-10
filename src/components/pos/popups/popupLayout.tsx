import OrderTypeSelectionPopUp from "./orderTypeSelectionPopup.component";

const PosPopUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <OrderTypeSelectionPopUp />
    </>
  );
};

export default PosPopUpLayout;
