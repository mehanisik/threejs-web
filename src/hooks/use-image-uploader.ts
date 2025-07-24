import { useCallback, useState } from "react";
import {
  deleteImageFromStorage,
  listImagesFromStorage,
  uploadFileToStorage,
} from "@/lib/supabase-storage";

export function useImageUploader(bucket: string) {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await listImagesFromStorage(bucket);
    if (data) {
      setImages(data);
    }
    setIsLoading(false);
  }, [bucket]);

  const uploadImage = useCallback(
    async (file: File) => {
      setIsLoading(true);
      const { data, error } = await uploadFileToStorage(file, bucket);
      if (error) {
        console.error("Upload error:", error);
        setIsLoading(false);
        return null;
      }
      await fetchImages();
      setIsLoading(false);
      return data;
    },
    [bucket, fetchImages],
  );

  const deleteImage = useCallback(
    async (filePath: string) => {
      setIsLoading(true);
      const { error } = await deleteImageFromStorage(bucket, filePath);
      if (error) {
        console.error("Delete error:", error);
      }
      await fetchImages();
      setIsLoading(false);
    },
    [bucket, fetchImages],
  );

  return { images, isLoading, fetchImages, uploadImage, deleteImage };
}