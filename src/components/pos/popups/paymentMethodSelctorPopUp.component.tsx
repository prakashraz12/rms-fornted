import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { PAYMENT_METHODS } from "@/constant";
import { RootState } from "@/types/redux.type";
import { useDispatch, useSelector } from "react-redux";

export function PaymentSelector() {
  const dispatch = useDispatch();

  const paymnetMethod = useSelector(
    (state: RootState) => state.pos.selectPaymentMethod
  );
  const isPaymentMethodOpen = useSelector(
    (state: RootState) => state.pos.isSelectPaymentMethodOpen
  );

  return (
    <Dialog
      open={isPaymentMethodOpen}
      onOpenChange={() =>
        dispatch({ type: "pos/setIsSelectPaymentMethodOpen", payload: false })
      }
    >
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-4 text-center">
          <DialogTitle className="text-xl font-bold">
            Choose Your Payment Method
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 grid grid-cols-2 gap-6">
          {PAYMENT_METHODS.map((method) => (
            <motion.div
              key={method.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={paymnetMethod === method.value ? "default" : "outline"}
                className="w-full h-40 p-6 flex flex-col items-center justify-center space-y-4 text-center transition-all rounded-xl"
                onClick={() => {
                  dispatch({
                    type: "pos/setSelectPaymentMethod",
                    payload: method.value,
                  });
                  dispatch({
                    type: "pos/setIsSelectPaymentMethodOpen",
                    payload: false,
                  });
                }}
              >
                <method.icon className="h-10 w-10" />
                <span
                  className={`text-2xl font-semibold ${paymnetMethod === method.value ? "text-white" : "text-gray-800"}`}
                >
                  {method.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
