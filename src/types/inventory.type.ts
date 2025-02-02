export interface InventoryItems {
  id: number;
  name: string;
  quantity: number;
  minimumStockLevel: number;
  unitPrice: number;
  measuringUnit: string;
  productName: string;
  lastUpdated: Date;
}
