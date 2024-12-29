import React from "react";

interface KOTItem {
  id: string;
  name: string;
  quantity: number;
  remarks?: string;
}

interface KOTLayoutProps {
  items: KOTItem[];
  kotNumber: string;
  tableNumber?: string;
  orderType: string;
}

export function KOTLayout({
  items,
  kotNumber,
  tableNumber,
  orderType,
}: KOTLayoutProps) {
  return (
    <div className="hidden print:block p-4 max-w-[80mm] mx-auto text-[12px] leading-tight">
      <div className="text-center mb-4 border-b-2 border-black pb-2">
        <h1 className="font-bold text-[16px] mb-1">KITCHEN ORDER TICKET</h1>
        <div className="flex justify-between text-[14px] font-bold">
          <span>KOT #: {kotNumber}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Table: {tableNumber || "N/A"}</span>
          <span>{orderType}</span>
        </div>
      </div>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left py-1 text-[14px]">Item</th>
            <th className="text-center text-[14px] w-16">Qty</th>
          </tr>
        </thead>
        <tbody className="font-bold">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-b border-dashed">
                <td className="py-2">{item.name}</td>
                <td className="text-center text-[14px]">{item.quantity}</td>
              </tr>
              {item.remarks && (
                <tr className="border-b border-dashed">
                  <td colSpan={2} className="py-1 pl-4 text-[10px] italic">
                    Note: {item.remarks}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="text-center text-[10px] mt-4">
        {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
