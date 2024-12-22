import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { ImageUploaderProps } from "./types/imageUploader.types";
import { useImageUpload } from "./hooks/useImageUpload";
import { UploadPlaceholder } from "./components/UploadPlaceholder";
import useDeleteImage from "./hooks/useDeleteImage";


export const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxSizeInMB = 5,
  image,
  setImage,
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
}) => {
  const {
    fileInputRef,
    previewUrl,
    selectedFile,
    isLoading,
    handleFileChange,
    handleDrop,
    handleUpload,
    handleRemove
  } = useImageUpload({
    maxSizeInMB,
    allowedTypes,
    setImage
  });


  const { handleDeleteImage, isLoading: deleteLoading } = useDeleteImage(image?.publicId, setImage);


  return (
    <Card className="max-w-sm shadow-none border-none">
      <CardHeader className="px-2">
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {image || previewUrl ? (
            <div className="relative">
              <img
                src={image?.url || previewUrl || ""}
                alt="Preview"
                className="w-[400px] rounded-lg"
              />
              {!image && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <UploadPlaceholder
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              allowedTypes={allowedTypes}
              maxSizeInMB={maxSizeInMB}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end mt-2">
        {image ? (
          <Button disabled={deleteLoading} onClick={handleDeleteImage} variant="destructive">
            {deleteLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Delete"}
          </Button>
        ) : (
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
