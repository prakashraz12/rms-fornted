import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CryptoJS from "crypto-js";
import { roleEncryptKey } from "@/keys";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Row {
  id: string;
  [key: string]: any;
}

export const exportSelectedRowsToCSV = (
  rows: Row[],
  selectedRows: number[]
) => {
  const selectedData = rows.filter((row) =>
    selectedRows.includes(parseInt(row.id))
  );
  const csv = Papa.unparse(selectedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "forkflow.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

type Column = {
  id: string;
  label: string;
};

export const exportSelectedRowsToPDF = (
  rows: Row[],
  columns: Column[],
  selectedRows: number[]
) => {
  const selectedRowsData = rows.filter((row) =>
    selectedRows.includes(parseInt(row.id))
  );

  const columnsData = columns.map((column) => ({
    header: column.label,
    dataKey: column.id,
  }));

  const doc: any = new jsPDF("p", "pt");

  const addTableToDoc = () => {
    doc.autoTable({
      head: [columnsData.map((column) => column.header)],
      body: selectedRowsData.map((row) =>
        columnsData.map((column) => row[column.dataKey])
      ),
      startY: 90,
      theme: "grid",
      headStyles: {
        textColor: [255, 255, 255],
      },
      styles: { fontSize: 8, overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
      },
    });

    doc.save("forkflow.pdf");
  };

  addTableToDoc();
};

export const encryptData = (text: string) => {
  return CryptoJS.AES.encrypt(text, roleEncryptKey).toString();
};

export const decryptData = (text: string) => {
  return CryptoJS.AES.decrypt(text, roleEncryptKey).toString(CryptoJS.enc.Utf8);
};
