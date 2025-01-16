import { OrderItem } from "@/types/order.type";
import React from "react";

interface KOTLayoutProps {
  items: OrderItem[];
  kotNumber: string;
  tableNumber?: string;
  orderType: string;
  createdAt: string;
  remarks?: string;
}

export function KOTLayout({
  items,
  kotNumber,
  tableNumber,
  orderType,
  createdAt,
  remarks,
}: KOTLayoutProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className=" p-4 max-w-[80mm] mx-auto text-[12px] leading-tight">
      <div className="text-center mb-4 border-b-2 border-black pb-2">
        <h1 className="font-bold text-[16px] mb-1">K.O.T</h1>
        <div className="flex flex-col justify-between text-[14px] font-bold">
          <span>{kotNumber}</span>
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
          {items?.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-b border-dashed">
                <td className="py-2">{item.name}</td>
                <td className="text-center text-[14px]">{item.quantity}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {remarks && (
        <tr className="border-b border-dashed">
          <td colSpan={2} className="py-1 pl-4 text-[10px] italic">
            Note: {remarks}
          </td>
        </tr>
      )}

      <div className="text-center text-[10px] mt-4">
        {new Date(createdAt)?.toLocaleDateString()} -{" "}
        {new Date(createdAt)?.toLocaleTimeString("en-US", {
          hour12: true,
        })}
      </div>
    </div>
  );
}
