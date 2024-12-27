import React from "react";
import { UploadCloud } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadPlaceholderProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allowedTypes: string[];
  maxSizeInMB: number;
}

export const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({
  fileInputRef,
  handleFileChange,
  allowedTypes,
  maxSizeInMB,
}) => {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
      <div className="flex text-sm text-gray-600 flex flex-col">
        <Label className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
          <span>Upload a file</span>
          <Input
            ref={fileInputRef}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={allowedTypes.join(",")}
          />
        </Label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-gray-500">
        {allowedTypes.join(", ")} up to {maxSizeInMB}MB
      </p>
    </div>
  );
};
