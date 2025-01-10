import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableStatusCard } from "./tableStatusCard.component";
import useGetTables from "@/hooks/useGetTables";

import { Button } from "../ui/button";
import { AddFloorForm } from "./addFloorForm";
import { useCreateFloorMutation } from "@/services/api/floorApi";
import { TableCreateForm } from "./addTableForm";
import { SquareTable } from "./tablesShapes/squareTable";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { RectangularTable } from "./tablesShapes/rectangularTable";
import { LargeTable } from "./tablesShapes/largeTable";
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

  const [createFloor] = useCreateFloorMutation();
  const [seletedFloor, setSelectedFloor] = useState<any>();

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

  const handleAddFloor = async (name: string, description: string) => {
    await createFloor({
      name,
      description,
    });
  };

  useEffect(() => {
    if (floorData) {
      setSelectedFloor(floorData[0]);
    }
  }, [floorData]);

  console.log(seletedFloor);
  return (
    <div className="w-full container mx-auto p-6 space-y-6  h-full dark:bg-slate-950">
      {/* floor selector */}
      <div className="mb-6 flex overflow-scroll items-center justify-end gap-4">
        {floorData?.map((floor) => (
          <Button
            variant={seletedFloor?.id === floor.id ? "default" : "outline"}
            key={floor.id}
            onClick={() => {
              setSelectedFloor(floor);
            }}
          >
            {floor.name}
          </Button>
        ))}
        <AddFloorForm onSubmit={handleAddFloor} />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-4">
        {seletedFloor?.tables?.map((table) => (
          <DropdownMenu key={table.id}>
            <DropdownMenuTrigger className="bg-transparent outline-none border-none cursor-pointer focus-within:bg-transparent focus-within:border-none focus-within:outline-none">
              {table.tableType === "S" ? (
                <SquareTable
                  table={table}
                  isAvailable={table.status === "AVAILABLE"}
                />
              ) : null}
              {table.tableType === "M" ? (
                <RectangularTable table={table} />
              ) : null}
              {table.tableType === "L" ? <LargeTable table={table} /> : null}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="outline-none border-none shadow-none">
              <TableStatusCard
                tableNumber={parseInt(table.id)}
                status={table.status}
                seats={table.chairs}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <div>
          <Dialog>
            <DialogTrigger className="flex items-center justify-center">
              <SquareTable isCreator />
            </DialogTrigger>
            <DialogContent className="p-0 min-w-2xl">
              <TableCreateForm floorId={seletedFloor?.id as number} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

// Square table component

// Large table component
