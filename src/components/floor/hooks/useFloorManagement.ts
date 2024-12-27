import { useState } from "react";
import { Table, TableStatus, initialTables } from "../types/floor.types";
import { cn } from "@/lib/utils";

export const useFloorManagement = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);

  const getStatusColor = (status: TableStatus) => {
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

  const getTableShape = (shape: Table["shape"], status: TableStatus) => {
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

  const updateTableStatus = (tableId: string, newStatus: TableStatus) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status: newStatus } : table
      )
    );
  };

  const bookTable = (tableId: string, bookingName: string) => {
    updateTableStatus(tableId, "reserved");
    // Add API call here to update backend
  };

  return {
    tables,
    getStatusColor,
    getTableShape,
    updateTableStatus,
    bookTable,
  };
};
