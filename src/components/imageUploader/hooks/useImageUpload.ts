import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useImageUploadMutation } from "@/services/api/file.api";
import { ImageType } from "../types/imageUploader.types";

interface UseImageUploadProps {
  maxSizeInMB: number;
  allowedTypes: string[];
  setImage: (image: ImageType | null) => void;
}

export const useImageUpload = ({
  maxSizeInMB,
  allowedTypes,
  setImage,
}: UseImageUploadProps) => {
  const [imageUpload, { isLoading, isError, isSuccess, data: response }] =
    useImageUploadMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: `Please upload a ${allowedTypes.join(", ")} file.`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please upload an image smaller than ${maxSizeInMB}MB.`,
        variant: "destructive",
      });
      return false;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await imageUpload(formData);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isSuccess && response) {
      const { data } = response;
      setImage({ publicId: data?.publicId, url: data?.url });
      handleRemove();
    }
  }, [isSuccess, response]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error while uploading image",
        description: "Oops! Something went wrong while uploading the image.",
        variant: "destructive",
      });
      handleRemove();
    }
  }, [isError]);

  return {
    fileInputRef,
    previewUrl,
    selectedFile,
    isLoading,
    handleFileChange,
    handleDrop,
    handleUpload,
    handleRemove,
  };
};
