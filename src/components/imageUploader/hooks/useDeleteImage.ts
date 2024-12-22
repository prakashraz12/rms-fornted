import { toast } from "@/hooks/use-toast";
import { useDeleteImageMutation } from "@/services/api/file.api";
import { useEffect } from "react";

const useDeleteImage = (publicId: string | undefined, setImage: (type: any) => void) => {

    const [deleteImage, { isLoading, isError, isSuccess }] = useDeleteImageMutation();
    const handleDeleteImage = async () => {
        if (!publicId) return;
        await deleteImage(publicId);
    };


    useEffect(() => {
        if (isSuccess) {
            setImage(null)
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    }, [isError]);


    return {
        handleDeleteImage,
        isLoading,

    }
};

export default useDeleteImage;