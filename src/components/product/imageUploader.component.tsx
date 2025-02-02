import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader: React.FC<{
  previewImage: string | null;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}> = ({ previewImage, setPreviewImage, file, setFile }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit");
        setFile(null);
        setPreviewImage(null);
      } else {
        setError(null);
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit");
        setFile(null);
        setPreviewImage(null);
      } else {
        setError(null);
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <div
        className="w-[200px] h-[200px] p-2 overflow-hidden  border-2 border-dashed border-gray-300 rounded-lg  text-center cursor-pointer flex items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Label htmlFor="image-upload" className="cursor-pointer">
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-lg w-full h-full object-cover"
              />
              <Button
                size={"icon"}
                variant={"destructive"}
                className="absolute top-2 right-2"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className="text-gray-500 text-xs">
              Drag and drop an image here, or click to select a file
            </div>
          )}
        </Label>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-1">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ImageUploader;
