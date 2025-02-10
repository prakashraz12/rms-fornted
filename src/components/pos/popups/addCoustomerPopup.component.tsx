import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import useGetMineCoustomer from "@/hooks/useGetCustomer";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCustomers } from "@/features/order/orderSlice";
import { RootState } from "@/types/redux.type";

interface CustomerCardDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CustomerCardPopup({
  isOpen,
  setIsOpen,
}: CustomerCardDialogProps) {
  const dispatch = useDispatch();
  const { coustomers } = useGetMineCoustomer();
  const selectedCustomers = useSelector(
    (state: RootState) => state.order.selectedCustomer
  );

  const toggleCustomerSelection = (customerId: string) => {
    dispatch(
      setSelectedCustomers(selectedCustomers === customerId ? "" : customerId)
    );
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Select Customers</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          {coustomers?.map((customer) => (
            <Card
              key={customer.id}
              className={`mb-4 cursor-pointer transition-all ${
                selectedCustomers === customer.id
                  ? "border-green-600"
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleCustomerSelection(customer.id)}
            >
              <CardContent className="flex items-center p-4">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{customer?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {customer?.address}
                  </p>
                  <p className="text-sm">{customer?.phone}</p>
                  <p className="text-sm font-medium">
                    Credit:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(customer?.creditBalance || 0)}
                  </p>
                </div>
                {selectedCustomers === customer?.id && (
                  <Check className="h-6 w-6 text-primary" />
                )}
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        <div className="mt-4 flex justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedCustomers} customer(s) selected
          </p>
          <Button onClick={() => {}}>Confirm Selection</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
