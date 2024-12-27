export interface FloorType {
  id: number;
  name: string;
  tables: TableTypes[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TableTypes {
  id: number;
  name: string;
  status: string;
  seats: number;
  shape: string;
  floorId: number;
}
