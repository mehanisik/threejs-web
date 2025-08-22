import type { z } from "zod";
import type { projectSchema, serviceSchema } from "@/types/admin.types";
import type { Database } from "@/types/database.types";
import supabase from "./supabase";

function createKebabCaseFileName(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const extension = lastDotIndex !== -1 ? fileName.slice(lastDotIndex) : '';

  const kebabCaseName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  const timestamp = Date.now();
  const finalName = kebabCaseName || 'unnamed-file';

  return `${timestamp}-${finalName}${extension}`;
}

function getFolderByType(
  type:
    | "portrait"
    | "project"
    | "cover"
    | "preview"
    | "services"
    | "video"
    | "gif",
): string {
  switch (type) {
    case "portrait":
      return "portraits";
    case "project":
      return "projects";
    case "cover":
      return "covers";
    case "preview":
      return "previews";
    case "services":
      return "services";
    case "video":
      return "videos";
    case "gif":
      return "gifs";
    default:
      return "misc";
  }
}

export async function testStorageBucket() {
  const { data, error } = await supabase.storage.from("images").list("public", {
    limit: 1,
  });
  return { data, error };
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  return supabase.from("projects").insert([
    {
      ...data,
      tags: data.tags
        ? data.tags.split(",").map((tag: string) => tag.trim())
        : [],
    },
  ]);
}

export async function updateProject(
  id: string,
  data: z.infer<typeof projectSchema>,
) {
  return supabase
    .from("projects")
    .update({
      ...data,
      tags: data.tags
        ? data.tags.split(",").map((tag: string) => tag.trim())
        : [],
    })
    .eq("id", id);
}

export async function deleteProject(id: string) {
  return supabase.from("projects").delete().eq("id", id);
}

export async function createService(data: z.infer<typeof serviceSchema>) {
  return supabase.from("services").insert([data]);
}

export async function updateService(
  id: string,
  data: z.infer<typeof serviceSchema>,
) {
  return supabase.from("services").update(data).eq("id", id);
}

export async function deleteService(id: string) {
  return supabase.from("services").delete().eq("id", id);
}

function mapTypeToDatabaseEnum(
  type:
    | "portrait"
    | "project"
    | "cover"
    | "preview"
    | "services"
    | "video"
    | "gif",
): Database["public"]["Enums"]["image_type"] {
  switch (type) {
    case "video":
    case "gif":
      return "preview"; 
    default:
      return type as Database["public"]["Enums"]["image_type"];
  }
}

export async function uploadMedia(
  file: File,
  type:
    | "portrait"
    | "project"
    | "cover"
    | "preview"
    | "services"
    | "video"
    | "gif",
  project_id?: string,
) {
  try {
    console.log("uploadMedia called with:", { fileName: file.name, type, project_id });
    
    const kebabCaseFileName = createKebabCaseFileName(file.name);
    const folder = getFolderByType(type);
    const filePath = `${folder}/${kebabCaseFileName}`;
    
    console.log("Upload path:", filePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    console.log("Storage upload result:", { uploadData, uploadError });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    const mediaUrl = publicUrlData.publicUrl;
    console.log("Generated media URL:", mediaUrl);

    if (mediaUrl) {
      const insertData = {
        image_url: mediaUrl,
        type: mapTypeToDatabaseEnum(type),
        project_id: project_id || null,
      };
      
      console.log("Inserting to database:", insertData);

      const { data, error } = await supabase
        .from("images")
        .insert([insertData])
        .select()
        .single();

      console.log("Database insert result:", { data, error });

      if (error) {
        console.error("Database insert error:", error);
        return { error };
      }

      return { data };
    }
    return { error: "No media URL generated" };
  } catch (error) {
    console.error("uploadMedia catch error:", error);
    return { error };
  }
}

export async function uploadImage(
  file: File,
  type:
    | "portrait"
    | "project"
    | "cover"
    | "preview"
    | "services"
    | "video"
    | "gif",
  project_id?: string,
) {
  return uploadMedia(file, type, project_id);
}

export async function deleteImage(image: { id: string; url: string }) {
  try {
    console.log('Attempting to delete image:', { id: image.id, url: image.url });
    
    // First delete from database
    const { error: deleteError, data } = await supabase
      .from("images")
      .delete()
      .eq("id", image.id)
      .select();
    
    console.log('Database delete result:', { deleteError, data });
    
    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return { error: deleteError };
    }
    
    // If database deletion successful, try to delete file from storage
    if (image.url.includes('/storage/v1/object/public/images/')) {
      // Extract the file path from the URL
      const urlPart = image.url.split('/storage/v1/object/public/images/')[1];
      console.log('Attempting to delete file from storage:', urlPart);
      
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([urlPart]);
      
      if (storageError) {
        console.warn('Storage delete error (non-critical):', storageError);
        // Don't return error for storage deletion failure as the DB record is already deleted
      } else {
        console.log('Storage file deleted successfully');
      }
    }
    
    return { error: null };
  } catch (error) {
    console.error('Unexpected error in deleteImage:', error);
    return { error };
  }
}
