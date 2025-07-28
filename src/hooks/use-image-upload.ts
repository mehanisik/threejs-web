import { useState } from "react";
import supabase from "@/lib/supabase";

function getFolderByFileExtension(fileName: string): string {
  const extension = fileName.toLowerCase().split(".").pop();

  if (
    [
      "mp4",
      "webm",
      "ogg",
      "mov",
      "avi",
      "wmv",
      "flv",
      "mkv",
      "3gp",
      "3g2",
    ].includes(extension || "")
  ) {
    return "videos";
  }

  if (extension === "gif") {
    return "gifs";
  }

  return "images";
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const folder = getFolderByFileExtension(file.name);
      const filePath = `${folder}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";
      setUploadError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadError,
  };
}
