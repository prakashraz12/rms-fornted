export type TableStatus = "available" | "reserved" | "occupied" | "soon";
export type TableShape = "circle" | "rectangle" | "square";

export interface Table {
  id: string;
  number: number;
  status: TableStatus;
  seats: number;
  shape: TableShape;
  timeLeft?: string;
}

export interface TableStatusCardProps {
  tableNumber: number;
  status: "Available" | "Reserved" | "Occupied";
  seats: number;
}

export const initialTables: Table[] = [
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
