import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calculator } from "lucide-react";

type Operation = "+" | "-" | "*" | "/" | "%" | "=";

export function CalculatorDialog() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleOperation = (op: Operation) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operation) {
      const result = performCalculation(currentValue, inputValue, operation);
      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(op);
  };

  const performCalculation = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return (a * b) / 100;
      default:
        return b;
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleEquals = () => {
    if (currentValue !== null && operation) {
      const inputValue = parseFloat(display);
      const result = performCalculation(currentValue, inputValue, operation);
      setDisplay(String(result));
      setCurrentValue(result);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white">
          <Calculator className="h-5 w-5 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Calculator
          </DialogTitle>
        </DialogHeader>
        <Card className="w-full max-w-md mx-auto border-none shadow-none">
          <CardContent>
            <div className="py-6 rounded-lg mb-4">
              <div className="text-right text-3xl font-bold truncate">
                {display}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map(
                (digit) => (
                  <Button
                    key={digit}
                    onClick={() => handleDigit(digit)}
                    className="h-14 text-xl font-semibold col-span-3"
                  >
                    {digit}
                  </Button>
                )
              )}
              <Button
                onClick={handleDecimal}
                className="h-14 text-xl font-semibold col-span-3"
              >
                .
              </Button>
              <Button
                onClick={() => handleOperation("+")}
                className="h-14 text-xl font-semibold col-span-3"
              >
                +
              </Button>
              <Button
                onClick={() => handleOperation("-")}
                className="h-14 text-xl font-semibold col-span-3"
              >
                -
              </Button>
              <Button
                onClick={() => handleOperation("*")}
                className="h-14 text-xl font-semibold col-span-3"
              >
                ×
              </Button>
              <Button
                onClick={() => handleOperation("/")}
                className="h-14 text-xl font-semibold col-span-3"
              >
                ÷
              </Button>
              <Button
                onClick={handlePercentage}
                className="h-14 text-xl font-semibold col-span-3"
              >
                %
              </Button>
              <Button
                onClick={handleClear}
                className="h-14 text-xl font-semibold bg-red-500 hover:bg-red-600 col-span-3"
              >
                C
              </Button>
              <Button
                onClick={handleEquals}
                className="h-14 text-xl bg-blue-500 hover:bg-blue-600 font-semibold col-span-9"
              >
                =
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
