import { Table } from "../types/floor.types";

type TableSize = "small" | "medium" | "large";

export function RectangularTable({
  table,
  isSelected,
  size = "medium",
}: {
  isSelected?: boolean;
  table?: Table;
  size?: TableSize;
}) {
  const sizeClasses: Record<TableSize, { table: string; chair: string }> = {
    small: {
      table: "w-[150px] h-[80px] sm:w-[170px] sm:h-[100px]",
      chair: "w-[50px] h-[12px] sm:w-[60px] sm:h-[17px]",
    },
    medium: {
      table: "w-[180px] h-[100px] sm:w-[200px] sm:h-[120px]",
      chair: "w-[60px] h-[15px] sm:w-[70px] sm:h-[20px]",
    },
    large: {
      table: "w-[210px] h-[120px] sm:w-[230px] sm:h-[140px]",
      chair: "w-[70px] h-[18px] sm:w-[80px] sm:h-[23px]",
    },
  };

  const { table: tableClass, chair: chairClass } = sizeClasses[size];

  return (
    <div
      className={`relative ${tableClass} bg-gray-200 rounded-xl flex items-center justify-center transition-all ${isSelected && "border-2 border-dashed border-green-600"}`}
    >
      <p>{table?.name}</p>

      {/* Top chairs */}

      <div
        className={`absolute -top-6  left-2 ${chairClass} bg-gray-200 rounded-t-xl`}
      ></div>
      <div
        className={`absolute -top-6 right-2 ${chairClass} bg-gray-200 rounded-t-xl`}
      ></div>

      {/* Bottom chairs */}

      <div
        className={`absolute -bottom-6 left-2 ${chairClass} bg-gray-200 rounded-b-xl`}
      ></div>

      <div
        className={`absolute -bottom-6 right-2 ${chairClass} bg-gray-200 rounded-b-xl`}
      ></div>
    </div>
  );
}
