import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NumericInputPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title?: string;
}

export function NumericInputPopup({
  isOpen,
  onClose,
  onSubmit,
  title = "Enter Number",
}: NumericInputPopupProps) {
  const [value, setValue] = useState("");

  const handleDigitClick = (digit: string) => {
    setValue((prev) => prev + digit);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span className="text-3xl font-bold">{value || "0"}</span>
            <Button variant="ghost" size="icon" onClick={handleClear}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
              <Button
                key={digit}
                className="h-16 text-2xl font-bold"
                onClick={() => handleDigitClick(digit.toString())}
              >
                {digit}
              </Button>
            ))}
            <Button
              className="h-16 text-2xl font-bold col-span-2"
              onClick={() => handleDigitClick("0")}
            >
              0
            </Button>
            <Button
              className="h-16 text-2xl font-bold"
              onClick={() => handleDigitClick(".")}
            >
              .
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-bold"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
