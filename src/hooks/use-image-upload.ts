import { useState } from "react";
import supabase from "@/lib/supabase";

function createKebabCaseFileName(fileName: string): string {
  // Remove file extension
  const lastDotIndex = fileName.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const extension = lastDotIndex !== -1 ? fileName.slice(lastDotIndex) : '';

  // Convert to kebab-case: lowercase, replace spaces and special chars with hyphens
  const kebabCaseName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();
  const finalName = kebabCaseName || 'unnamed-file';

  return `${timestamp}-${finalName}${extension}`;
}

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
      const kebabCaseFileName = createKebabCaseFileName(file.name);
      const folder = getFolderByFileExtension(file.name);
      const filePath = `${folder}/${kebabCaseFileName}`;

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
