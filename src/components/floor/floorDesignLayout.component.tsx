import { useState } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableStatusCard } from "./tableStatusCard.component";
import useGetTables from "@/hooks/useGetTables";

import { Button } from "../ui/button";
interface Table {
  id: string;
  number: number;
  status: "available" | "reserved" | "OCCUPIED" | "soon";
  seats: number;
  shape: "circle" | "rectangle" | "square";
  timeLeft?: string;
}

export function FloorTableLayout() {
  const { floorData, isFloorFetched, isFloorFetching } = useGetTables();
  const [seletedFloor, setSelectedFloor] = useState(floorData[0] || []);

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-200 text-green-800";
      case "reserved":
        return "bg-red-200 text-red-800";
      case "OCCUPIED":
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

  console.log("seletedFloor", seletedFloor);

  return (
    <div className="w-full  p-6  dark:bg-slate-950">
      {/* floor selector */}
      <div>
        {floorData?.map((floor) => (
          <Button
            key={floor.id}
            onClick={() => {
              setSelectedFloor(floor);
            }}
          >
            {floor.name}
          </Button>
        ))}
      </div>
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
        {seletedFloor?.tables?.map((table) => (
          <DropdownMenu key={table.id}>
            <DropdownMenuTrigger className="bg-transparent outline-none border-none cursor-pointer focus-within:bg-transparent focus-within:border-none focus-within:outline-none">
              <div className="relative">
                <div className={getTableShape("rectangle", table.status)}>
                  <div className="text-lg font-semibold">{table.name}</div>
                </div>
                {/* Chairs */}
                <div className="absolute inset-0 -m-2">
                  {[...Array(table.chairs)].map((_, index) => {
                    const angle = (360 * index) / table.chairs;
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
                          top: `${50 - 50 * Math.cos((2 * Math.PI * index) / table.chairs - Math.PI / 2)}%`,
                          left: `${50 + 50 * Math.sin((2 * Math.PI * index) / table.chairs - Math.PI / 2)}%`,
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
