import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableStatusCard } from "./tableStatusCard.component";

interface Table {
  id: string;
  number: number;
  status: "available" | "reserved" | "occupied" | "soon";
  seats: number;
  shape: "circle" | "rectangle" | "square";
  timeLeft?: string;
}

const initialTables: Table[] = [
  { id: "t1", number: 1, status: "available", seats: 4, shape: "circle" },
  { id: "t2", number: 2, status: "reserved", seats: 2, shape: "square" },
  {
    id: "t3",
    number: 3,
    status: "soon",
    seats: 6,
    shape: "rectangle",
    timeLeft: "5m 30s",
  },
  { id: "t4", number: 4, status: "occupied", seats: 4, shape: "circle" },
  { id: "t5", number: 5, status: "available", seats: 2, shape: "square" },
  { id: "t6", number: 6, status: "reserved", seats: 4, shape: "rectangle" },
  { id: "t7", number: 7, status: "available", seats: 4, shape: "circle" },
  { id: "t8", number: 5, status: "occupied", seats: 2, shape: "square" },
  { id: "t8", number: 2, status: "occupied", seats: 2, shape: "circle" },
  { id: "t9", number: 9, status: "available", seats: 6, shape: "rectangle" },
  {
      id: "t10",
      number: 10,
      status: "soon",
      seats: 4,
      shape: "circle",
      timeLeft: "10m 15s",
    },
    { id: "t", number: 8, status: "occupied", seats: 2, shape: "circle" },
];

export function FloorTableLayout() {
  const [tables, setTables] = useState<Table[]>(initialTables);

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-200 text-green-800";
      case "reserved":
        return "bg-red-200 text-red-800";
      case "occupied":
        return "bg-gray-200 text-gray-800";
      case "soon":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const getTableShape = (shape: Table["shape"], status: Table["status"]) => {
    const baseClasses = cn(
      "flex items-center justify-center transition-colors",
      getStatusColor(status)
    );

    switch (shape) {
      case "circle":
        return cn(baseClasses, "rounded-full w-24 h-24");
      case "square":
        return cn(baseClasses, "rounded-sm w-24 h-24");
      case "rectangle":
        return cn(baseClasses, "rounded-full md:w-48 md:h-24 w-32 h-24");
      default:
        return baseClasses;
    }
  };

  return (
    <div className="w-full  p-6  dark:bg-slate-950">
      {/* floor selector */}
      <div></div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
        {["available", "reserved", "occupied", "soon"].map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(status as Table["status"])}`}
            ></div>
            <span className="text-sm capitalize">{status}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center ">
        {tables.map((table) => (
          <DropdownMenu key={table.id}>
            <DropdownMenuTrigger className="bg-transparent outline-none border-none cursor-pointer focus-within:bg-transparent focus-within:border-none focus-within:outline-none">
              <div className="relative">
                <div className={getTableShape(table.shape, table.status)}>
                  <div className="text-lg font-semibold">T{table.number}</div>
                </div>
                {/* Chairs */}
                <div className="absolute inset-0 -m-2">
                  {[...Array(table.seats)].map((_, index) => {
                    const angle = (360 * index) / table.seats;
                    let width = "w-6",
                      height = "h-6";

                    if (angle > 45 && angle < 135) {
                      // Top
                      width = "w-10";
                      height = "h-4";
                    } else if (angle > 225 && angle < 315) {
                      // Bottom
                      width = "w-10";
                      height = "h-4";
                    } else if (angle >= 135 && angle <= 225) {
                      // Left
                      width = "w-4";
                      height = "h-10";
                    } else {
                      // Right
                      width = "w-4";
                      height = "h-10";
                    }

                    return (
                      <div
                        key={index}
                        className={`absolute ${width} ${height} bg-slate-50 rounded-full border border-gray-200`}
                        style={{
                          top: `${50 - 50 * Math.cos((2 * Math.PI * index) / table.seats - Math.PI / 2)}%`,
                          left: `${50 + 50 * Math.sin((2 * Math.PI * index) / table.seats - Math.PI / 2)}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                    );
                  })}
                </div>

                {/* Status badge */}
                {table.status === "reserved" && (
                  <Badge className="w-6 h-6 flex justify-center items-center rounded-full absolute bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-10 text-red-700">
                    R
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="outline-none border-none  shadow-none">
              <TableStatusCard tableNumber={3} status="Available" seats={4} />
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}
