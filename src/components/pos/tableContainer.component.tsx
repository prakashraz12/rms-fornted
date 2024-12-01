import React from "react";
import { Button } from "../ui/button";
import { Maximize, Menu, ReceiptText, Settings } from "lucide-react";
import OrderTable from "./orderList.component";
import POSButtons from "./posButton.component";
import PosActionBottomContainer from "./posActionBottomContainer.component";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface TableContainerProps{
  setIsOpenProductContainerForSmallScreen:(type:boolean)=>void;

}

const TableContainer = ({setIsOpenProductContainerForSmallScreen}:TableContainerProps) => {

  const handleScale = () => {
    console.log("Scale");
  };

  const handleProductContainerOpenForSmallScreen = ()=>{
    setIsOpenProductContainerForSmallScreen(true);
  }
  
  return (
    <div className="w-full h-screen ">
      {/* header */}
      <div className="w-full h-16 flex items-center border-b border-gray-200 ">
        <div className="flex justify-between items-center w-full px-2 md:px-1 lg:px-5">
          <div className="flex items-center space-x-2">
          <Button size="icon" className="h-10 w-10 bg-primary rounded-xl md:hidden" onClick={handleProductContainerOpenForSmallScreen}>
              <Menu className="h-4 w-4" />
              <span className="sr-only">Scale</span>
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold">Prakash Raz Shrestha, POS User</h1>
              <p className="text-xs">rzprakash16@gmail.com</p>
             
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="icon" className="h-10 w-10 bg-purple-500 rounded-xl" onClick={handleScale}>
              <Maximize className="h-4 w-4" />
              <span className="sr-only">Scale</span>
            </Button>
            <Button size="icon" className="h-10 w-10 bg-blue-900 rounded-xl">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button size="icon" className="h-10 w-full bg-green-500 rounded-xl">
              <ReceiptText className="h-4 w-4" />
              <p className="text-white">Orders</p>
              <span className="sr-only">Orders</span>
            </Button>
          </div>
        </div>
      </div>
      {/* main product list */}
      <div className="flex flex-col justify-start h-[calc(100vh-4rem)] ">
        <POSButtons />
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Item</TableHead>
                <TableHead className="text-center w-1/4">Quantity</TableHead>
                <TableHead className="text-right w-1/10">Price</TableHead>
                <TableHead className="w-1/10"></TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <OrderTable />
        <div className="bg-background  max-h-[220px]">
          <Table>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell className="text-right">${400}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Tax 15%</TableCell>
                <TableCell className="text-right">${200}</TableCell>
                <TableCell></TableCell>
              </TableRow>
             
              <TableRow>
                <TableCell colSpan={2} className="font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">${300}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <PosActionBottomContainer />
      </div>
    </div>
  );
};

export default TableContainer;
