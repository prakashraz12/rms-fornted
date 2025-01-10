import { cn } from "@/lib/utils";
import { Table } from "../types/floor.types";

type TableSize = "s" | "m" | "l";

interface LargeTableProps {
  table?: Table;
  size?: TableSize;
  isSelected?: boolean;
}

const sizeClasses = {
  s: {
    table: "w-[180px] h-[90px] sm:w-[200px] sm:h-[100px]",
    chair: "w-[40px] sm:w-[50px] h-[15px] sm:h-[20px]",
    sideChair: "w-[15px] sm:w-[20px] h-[40px] sm:h-[50px]",
    topChair: "-top-4 sm:-top-6",
    bottomChair: "-bottom-4 sm:-bottom-6",
    leftChair: "left-2",
    middleChair: "left-[70px] sm:left-[75px]",
    rightChair: "right-2",
    sidePosition: "top-[15px] sm:top-[20px]",
  },
  m: {
    table: "w-[220px] h-[110px] sm:w-[250px] sm:h-[125px]",
    chair: "w-[60px] sm:w-[70px] h-[20px] sm:h-[25px]",
    sideChair: "w-[20px] sm:w-[25px] h-[60px] sm:h-[70px]",
    topChair: "-top-6 sm:-top-8",
    bottomChair: "-bottom-6 sm:-bottom-8",
    leftChair: "left-2",
    middleChair: "left-[80px] sm:left-[90px]",
    rightChair: "right-2",
    sidePosition: "top-[20px] sm:top-[25px]",
  },
  l: {
    table: "w-[260px] h-[130px] sm:w-[300px] sm:h-[150px]",
    chair: "w-[80px] sm:w-[90px] h-[25px] sm:h-[30px]",
    sideChair: "w-[25px] sm:w-[30px] h-[80px] sm:h-[90px]",
    topChair: "-top-8 sm:-top-10",
    bottomChair: "-bottom-8 sm:-bottom-10",
    leftChair: "left-2",
    middleChair: "left-[90px] sm:left-[105px]",
    rightChair: "right-2",
    sidePosition: "top-[25px] sm:top-[30px]",
  },
};

export function LargeTable({ table, size = "m", isSelected }: LargeTableProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative bg-gray-200  rounded-xl flex items-center justify-center transition-all",
        sizeClass.table,
        isSelected && "border-2 border-dashed border-green-600"
      )}
    >
      <p>{table?.name}</p>
      {/* Top chairs */}
      <div
        className={cn(
          "absolute bg-gray-200 rounded-t-xl",
          sizeClass.chair,
          sizeClass.topChair,
          sizeClass.leftChair
        )}
      ></div>
      <div
        className={cn(
          "absolute bg-gray-200 rounded-t-xl",
          sizeClass.chair,
          sizeClass.topChair,
          sizeClass.middleChair
        )}
      ></div>
      <div
        className={cn(
          "absolute bg-gray-200 rounded-t-xl",
          sizeClass.chair,
          sizeClass.topChair,
          sizeClass.rightChair
        )}
      ></div>
      {/* Side chairs */}
      <div
        className={cn(
          "absolute -left-6 sm:-left-8 bg-gray-200 rounded-l-xl",
          sizeClass.sideChair,
          sizeClass.sidePosition
        )}
      ></div>
      <div
        className={cn(
          "absolute -right-6 sm:-right-8 bg-gray-200 rounded-r-xl",
          sizeClass.sideChair,
          sizeClass.sidePosition
        )}
      ></div>
      {/* Bottom chairs */}
      <div
        className={cn(
          "absolute bg-gray-200 rounded-b-xl",
          sizeClass.chair,
          sizeClass.bottomChair,
          sizeClass.leftChair
        )}
      ></div>
      <div
        className={cn(
          "absolute bg-gray-200 rounded-b-xl",
          sizeClass.chair,
          sizeClass.bottomChair,
          sizeClass.middleChair
        )}
      ></div>
      <div
        className={cn(
          "absolute bg-gray-200 rounded-b-xl",
          sizeClass.chair,
          sizeClass.bottomChair,
          sizeClass.rightChair
        )}
      ></div>
    </div>
  );
}
