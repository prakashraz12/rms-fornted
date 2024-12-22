export interface ImageType {
  publicId: string;
  url: string;
}

export interface ImageUploaderProps {
  image: ImageType | null;
  setImage: (image: ImageType | null) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

export interface UploadResponse {
  data: {
    publicId: string;
    url: string;
  };
}
