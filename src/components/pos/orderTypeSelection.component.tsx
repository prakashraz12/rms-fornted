import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Truck, ShoppingBag, Users } from "lucide-react";
import useGetTables from "@/hooks/useGetTables";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDeliveryAddress,
  setSelectedTableId,
  setSelectOrderType,
} from "@/features/pos/posSlice";
import { OrderType } from "@/enums/orderType.enum";

export function OrderTypeSelector() {
  const orderType = useSelector(
    (state: RootState) => state.pos.selectOrderType
  );
  const selectedTables = useSelector(
    (state: RootState) => state.pos.selectedTableIds
  );
  const deliveryAddress = useSelector(
    (state: RootState) => state.pos.selectedDeliveryAddress
  );
  const dispatch = useDispatch();

  const { floorData } = useGetTables();
  const [selectedFloor, setSelectedFloor] = useState(1);

  const handleOrderTypeChange = (value: string) => {
    dispatch(setSelectOrderType(value));
    dispatch(setSelectedTableId([]));
    setSelectedFloor(1);
    dispatch(setSelectedDeliveryAddress(""));
  };

  const handleTableSelect = (tableId: string) => {
    dispatch(
      setSelectedTableId(
        selectedTables.includes(parseInt(tableId))
          ? selectedTables.filter((id) => id !== parseInt(tableId))
          : [...selectedTables, parseInt(tableId)]
      )
    );
  };

  const handleDeliveryAddressChange = (address: string) => {
    dispatch(setSelectedDeliveryAddress(address));
  };

  console.log(selectedTables);
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Choose Your Order Type
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-2">
        <RadioGroup
          value={orderType || OrderType.DINE_IN}
          onValueChange={handleOrderTypeChange}
          className="flex  space-x-4"
        >
          <div className="flex flex-col items-center space-y-2">
            <RadioGroupItem
              value={OrderType.DINE_IN}
              id="dine-in"
              className="sr-only"
            />
            <Label
              htmlFor="dine-in"
              className={`flex flex-col items-center p-6 rounded-lg cursor-pointer transition-all ${
                orderType === OrderType.DINE_IN
                  ? "bg-green-600 text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Utensils className="w-8 h-8 mb-2" />
              Dine-in
            </Label>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <RadioGroupItem
              value={OrderType.DELIVERY}
              id="delivery"
              className="sr-only"
            />
            <Label
              htmlFor="delivery"
              className={`flex flex-col items-center p-6 rounded-lg cursor-pointer transition-all ${
                orderType === OrderType.DELIVERY
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Truck className="w-8 h-8 mb-2" />
              Delivery
            </Label>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <RadioGroupItem
              value={OrderType.TAKE_AWAY}
              id="take-away"
              className="sr-only"
            />
            <Label
              htmlFor="take-away"
              className={`flex flex-col items-center p-6 rounded-lg cursor-pointer transition-all ${
                orderType === OrderType.TAKE_AWAY
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <ShoppingBag className="w-8 h-8 mb-2" />
              Take-away
            </Label>
          </div>
        </RadioGroup>

        {orderType === OrderType.DINE_IN && (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2 p-2 bg-muted rounded-lg">
              {floorData?.map((floor) => (
                <Button
                  key={floor.id}
                  variant={selectedFloor === floor.id ? "default" : "ghost"}
                  onClick={() => setSelectedFloor(floor.id)}
                  className="w-full"
                >
                  {floor?.name}
                </Button>
              ))}
            </div>
            <ScrollArea className="h-[300px] w-full  p-4">
              <div className="grid grid-cols-4 gap-4">
                {floorData
                  .find((floor) => floor.id === selectedFloor)
                  ?.tables.map((table) => (
                    <Button
                      key={table.id}
                      variant={
                        selectedTables.includes(table.id)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleTableSelect(table.id?.toString())}
                      className={`h-24 p-2 flex flex-col items-center justify-center ${
                        table.status === "occupied"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={table.status === "occupied"}
                    >
                      <svg viewBox="0 0 24 24" className="w-12 h-12 mb-2">
                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                        <circle
                          cx="12"
                          cy="12"
                          r="6"
                          fill={table.status === "occupied" ? "red" : "green"}
                        />
                      </svg>
                      <span className="text-sm font-semibold">
                        {table.name}
                      </span>
                      <span className="text-xs flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {table.seats}
                      </span>
                    </Button>
                  ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {orderType === OrderType.DELIVERY && (
          <div className="space-y-2">
            <Label htmlFor="delivery-address" className="text-lg font-semibold">
              Delivery Address
            </Label>
            <Input
              id="delivery-address"
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => handleDeliveryAddressChange(e.target.value)}
              className="w-full p-3 text-lg"
            />
          </div>
        )}

        {orderType === OrderType.TAKE_AWAY && (
          <div className="text-center text-lg font-semibold">
            Order will be prepared for pick-up.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
