import { OrderConfirmationPopup } from "@/components/pos/orderConfirmPopup.component";
import ProductContainer from "@/components/pos/productContainer.component";
import TableContainer from "@/components/pos/tableContainer.component";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";

const PosPage = () => {
  const [
    isOpenProductContainerForSmallScreen,
    setIsOpenProductContainerForSmallScreen,
  ] = useState(false);

  return (
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
      {/* <div className="w-full h-12  absolute top-0 left-0 flex items-center space-x-2">
        <div className=" h-10 w-auto p-2 bg-blue-500 rounded-b-lg cursor-pointer flex items-center space-x-2">
          <h1 className="text-xl  h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
            1
          </h1>
          <p className="text-xs text-white">Holded Orders</p>
          <X className="h-6 w-6 text-white" />
        </div>
        <div className=" h-10 w-auto p-2 bg-red-500 rounded-b-lg cursor-pointer flex items-center space-x-2">
          <h1 className="text-xl  h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
            1
          </h1>
          <p className="text-xs text-white">Holded Orders</p>
          <X className="h-6 w-6 text-white" />
        </div>
        <div className=" h-10 w-auto p-2 bg-red-500 rounded-b-lg cursor-pointer flex items-center space-x-2">
          <h1 className="text-xl  h-6 w-6 flex items-center justify-center rounded-full bg-white text-black">
            1
          </h1>
          <p className="text-xs text-white">Holded Orders</p>
          <X className="h-6 w-6 text-white" />
        </div>
      </div> */}

      <OrderConfirmationPopup />
    </div>
  );
};

export default PosPage;
