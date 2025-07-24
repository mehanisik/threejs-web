import { useCallback, useState } from "react";

import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { uploadFileToStorage } from "@/lib/supabase-storage";

import type { AboutImageRecord, ProjectImageRecord } from "@/types/admin";

interface UseImageManagementOptions {
  tableName: "project_images" | "about_images";
  foreignKey: "project_id" | "user_id";
  bucket: string;
}

interface ProjectImageInsert {
  image_url: string;
  project_id: string;
  is_cover: boolean;
}

interface AboutImageInsert {
  image_url: string;
  user_id: string;
}

export function useImageManagement({
  tableName,
  foreignKey,
  bucket,
}: UseImageManagementOptions) {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const uploadImage = useCallback(
    async (
      file: File,
      parentId: string,
      isCover = false,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        setUploading(true);

        if (!isAuthenticated || !user) {
          throw new Error("Authentication required. Please log in again.");
        }

        const { data: uploadData, error: uploadError } =
          await uploadFileToStorage(file, bucket);

        if (uploadError || !uploadData?.publicUrl) {
          throw new Error(uploadError?.message || "Failed to upload file");
        }

        let imageRecord: ProjectImageInsert | AboutImageInsert;

        if (tableName === "project_images") {
          imageRecord = {
            image_url: uploadData.publicUrl,
            project_id: parentId,
            is_cover: isCover,
          };
        } else {
          imageRecord = {
            image_url: uploadData.publicUrl,
            user_id: user.id,
          };
        }

        const { error: insertError } = await supabase
          .from(tableName)
          .insert(imageRecord);

        if (insertError) {
          throw new Error(`${insertError.message} (Code: ${insertError.code})`);
        }

        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        return { success: false, error: errorMessage };
      } finally {
        setUploading(false);
      }
    },
    [tableName, bucket, isAuthenticated, user],
  );

  const deleteImage = useCallback(
    async (imageId: string): Promise<{ success: boolean; error?: string }> => {
      try {
        if (!isAuthenticated || !user) {
          throw new Error("Authentication required");
        }

        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", imageId)
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Delete failed";
        return { success: false, error: errorMessage };
      }
    },
    [tableName, isAuthenticated, user],
  );

  const loadImages = useCallback(
    async (
      parentId: string,
    ): Promise<{
      data: (ProjectImageRecord | AboutImageRecord)[] | null;
      error?: string;
    }> => {
      try {
        setLoading(true);

        let query = supabase.from(tableName).select("*");

        if (tableName === "project_images") {
          query = query
            .eq("project_id", parentId)
            .order("created_at", { ascending: false });
        } else {
          query = query
            .eq("user_id", parentId)
            .order("created_at", { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        return { data: data as (ProjectImageRecord | AboutImageRecord)[] };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load images";
        return { data: null, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [tableName, foreignKey],
  );

  const setCoverImage = useCallback(
    async (
      imageId: string,
      parentId: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (tableName !== "project_images") {
        return {
          success: false,
          error: "Cover images only supported for projects",
        };
      }

      try {
        if (!isAuthenticated || !user) {
          throw new Error("Authentication required");
        }

        const { error: updateError1 } = await supabase
          .from("project_images")
          .update({ is_cover: false })
          .eq("project_id", parentId)
          .eq("user_id", user.id);

        if (updateError1) {
          throw new Error(updateError1.message);
        }

        const { error: updateError2 } = await supabase
          .from("project_images")
          .update({ is_cover: true })
          .eq("id", imageId)
          .eq("user_id", user.id);

        if (updateError2) {
          throw new Error(updateError2.message);
        }

        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to set cover image";
        return { success: false, error: errorMessage };
      }
    },
    [tableName, isAuthenticated, user],
  );

  return {
    uploading,
    loading,
    uploadImage,
    deleteImage,
    loadImages,
    setCoverImage,
  };
}