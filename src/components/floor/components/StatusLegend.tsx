import React from 'react';
import { TableStatus } from '../types/floor.types';

interface StatusLegendProps {
  getStatusColor: (status: TableStatus) => string;
}

export const StatusLegend: React.FC<StatusLegendProps> = ({ getStatusColor }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
      {["available", "reserved", "occupied", "soon"].map((status) => (
        <div key={status} className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(status as TableStatus)}`}
          />
          <span className="text-sm capitalize">{status}</span>
        </div>
      ))}
    </div>
  );
};
