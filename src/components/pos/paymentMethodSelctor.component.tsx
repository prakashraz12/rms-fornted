import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { PAYMENT_METHODS } from "@/constant";
import { PaymentMethod } from "@/enums/paymentMethod.enum";

interface PaymentSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (method: PaymentMethod | null) => void;
  selectedMethod: PaymentMethod | null;
  setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
}

export function PaymentSelector({
  isOpen,
  onClose,
  onSelectPayment,
  selectedMethod,
  setSelectedMethod,
}: PaymentSelectorDialogProps) {
  const handleSubmit = () => {
    if (selectedMethod) {
      onSelectPayment(selectedMethod);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-8 text-center">
          <DialogTitle className="text-xl font-bold">
            Choose Your Payment Method
          </DialogTitle>
        </DialogHeader>
        <div className="p-8 grid grid-cols-2 gap-6">
          {PAYMENT_METHODS.map((method) => (
            <motion.div
              key={method.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={
                  selectedMethod === method.value ? "default" : "outline"
                }
                className="w-full h-40 p-6 flex flex-col items-center justify-center space-y-4 text-center transition-all rounded-xl"
                onClick={() => setSelectedMethod(method.value as PaymentMethod)}
              >
                <method.icon className="h-10 w-10" />
                <span
                  className={`text-2xl font-semibold ${selectedMethod === method.value ? "text-white" : "text-gray-800"}`}
                >
                  {method.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
        <DialogFooter className="p-4 bg-white border-t">
          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-semibold rounded-xl transition-all"
            disabled={!selectedMethod}
          >
            {selectedMethod
              ? "Confirm Payment Method"
              : "Select a Payment Method"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
