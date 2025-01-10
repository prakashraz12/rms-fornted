import { cn } from "@/lib/utils";
import { Table } from "../types/floor.types";
import { Plus } from "lucide-react";

type TableSize = "s" | "m" | "l";

interface SquareTableProps {
  table?: Table;
  isCreator?: boolean;
  isSelected?: boolean;
  size?: TableSize;
  isAvailable?: boolean;
}

const sizeClasses = {
  s: {
    table: "w-[60px] h-[60px]",
    topChair: "-top-4 left-[15px] w-[30px] h-[12px]",
    sideChair: "top-[15px] w-[12px] h-[30px]",
    bottomChair: "-bottom-4 left-[15px] w-[30px] h-[12px]",
    icon: "h-4 w-4",
    text: "text-xs",
  },
  m: {
    table: "w-[90px] h-[90px]",
    topChair: "-top-6 left-[25px] w-[40px] h-[15px]",
    sideChair: "top-[25px] w-[15px] h-[40px]",
    bottomChair: "left-[25px] w-[40px] h-[15px]",
    icon: "h-5 w-5",
    text: "text-sm",
  },
  l: {
    table: "w-[110px] h-[110px]",
    topChair: "left-[30px] w-[50px] h-[20px]",
    sideChair: "top-[30px] w-[20px] h-[50px]",
    bottomChair: "left-[30px] w-[50px] h-[20px]",
    icon: "h-6 w-6",
    text: "text-base",
  },
};

export function SquareTable({
  table,
  isCreator,
  isSelected,
  size = "l",
  isAvailable,
}: SquareTableProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative bg-gray-200 rounded-xl flex items-center justify-center transition-all",
        sizeClass.table,
        isSelected && "border-2 border-green-600 border-dashed",
        isAvailable && "bg-green-500"
      )}
    >
      <p className={sizeClass.text}>
        {isCreator ? (
          <Plus className={cn("text-gray-400", sizeClass.icon)} />
        ) : (
          table?.name
        )}
      </p>
      {/* Top chair */}
      <div
        className={cn(
          "absolute bg-gray-200 rounded-t-xl",
          sizeClass.topChair,
          size === "l" && "-top-6",
          size === "s" && "-top-4",
          isCreator && "bg-gray-100 border-dashed border-gray-200 border-2",
          isAvailable && "bg-green-500"
        )}
      ></div>
      {/* Side chairs */}
      <div
        className={cn(
          "absolute  bg-gray-200 rounded-l-xl",
          sizeClass.sideChair,
          size === "l" && "-left-6",
          size === "s" && "-left-4",
          isCreator && "bg-gray-100 border-dashed border-gray-200 border-2",
          isAvailable && "bg-green-500"
        )}
      ></div>
      <div
        className={cn(
          "absolute -right-6 bg-gray-200 rounded-r-xl",
          sizeClass.sideChair,
          size === "l" && "-right-6",
          size === "s" && "-right-4",
          isCreator && "bg-gray-100 border-dashed border-gray-200 border-2",
          isAvailable && "bg-green-500"
        )}
      ></div>
      {/* Bottom chair */}
      <div
        className={cn(
          "absolute bg-gray-200 rounded-b-xl",
          sizeClass.bottomChair,
          size === "l" && "-bottom-6",
          size === "s" && "-bottom-4",
          isCreator && "bg-gray-100 border-dashed border-gray-200 border-2",
          isAvailable && "bg-green-500"
        )}
      ></div>
    </div>
  );
}
