import { BillPrintLayout } from "@/components/pos/billPrintLayout.component";
import { OrderConfirmationPopup } from "@/components/pos/popups/orderConfirmPopup.component";
import ProductContainer from "@/components/pos/productContainer.component";
import TableContainer from "@/components/pos/tableContainer.component";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { setHoldOrder, setSelectedProducts } from "@/features/pos/posSlice";
import { RootState } from "@/types/redux.type";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PosPopUpLayout from "@/components/pos/popups/popupLayout";

const PosPage = () => {
  const dispatch = useDispatch();

  const [
    isOpenProductContainerForSmallScreen,
    setIsOpenProductContainerForSmallScreen,
  ] = useState(false);

  const handleRemoveHoldOrder = () => {
    dispatch(setHoldOrder(null));
  };

  const handleLoadHoldOrder = () => {
    dispatch(setHoldOrder(null));
    dispatch(setSelectedProducts(holdOrder));
  };

  const holdOrder = useSelector((state: RootState) => state.pos.holdOrder);

  return (
    <PosPopUpLayout>
      <div className="w-full h-screen overflow-hidden grid grid-cols-12 relative">
        <div className="col-span-12 md:col-span-7 lg:col-span-6 border-r border-gray-200">
          <TableContainer />
        </div>
        <div className="hidden md:block md:col-span-5 lg:col-span-6">
          <ProductContainer
            setIsOpenProductContainerForSmallScreen={
              setIsOpenProductContainerForSmallScreen
            }
          />
        </div>
        <Drawer
          direction="right"
          open={isOpenProductContainerForSmallScreen}
          onClose={() => setIsOpenProductContainerForSmallScreen(false)}
        >
          <DrawerContent
            className="h-screen rounded-none overflow-hidden m-0 p-1"
            aria-details="product-dialogTitle"
            title="product-container"
            aria-describedby="product-container"
          >
            <ProductContainer
              setIsOpenProductContainerForSmallScreen={
                setIsOpenProductContainerForSmallScreen
              }
            />
          </DrawerContent>
        </Drawer>
        {holdOrder && (
          <div className="w-full h-12  absolute -top-2 left-0 flex items-center space-x-2">
            <div
              className=" h-10 w-auto p-2 bg-green-500 rounded-b-lg cursor-pointer flex items-center space-x-2"
              onClick={handleLoadHoldOrder}
            >
              <h1 className="text-xl  h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
                1
              </h1>
              <p className="text-xs text-white">Holded Orders</p>
              <X
                className="h-6 w-6 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveHoldOrder();
                }}
              />
            </div>
          </div>
        )}

        <OrderConfirmationPopup />

        <BillPrintLayout />
      </div>
    </PosPopUpLayout>
  );
};

export default PosPage;
