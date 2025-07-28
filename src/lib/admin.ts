import type { z } from "zod";
import type { projectSchema, serviceSchema } from "@/types/admin.types";
import supabase from "./supabase";

function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
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
    const sanitizedFileName = sanitizeFileName(file.name);
    const folder = getFolderByType(type);
    const filePath = `${folder}/${Date.now()}_${sanitizedFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      return { error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    const mediaUrl = publicUrlData.publicUrl;

    if (mediaUrl) {
      const insertData = {
        url: mediaUrl,
        type,
        project_id: project_id || null,
      };

      const { data, error } = await supabase
        .from("images")
        .insert([insertData]);

      if (error) {
        return { error };
      }

      return { data };
    }
    return { error: "No media URL generated" };
  } catch (error) {
    return { error };
  }
}

// Keep the old function name for backward compatibility
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
  const { error: deleteError } = await supabase
    .from("images")
    .delete()
    .eq("id", image.id);
  if (!deleteError) {
    const urlParts = image.url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    // Try to find the file in different folders
    const folders = [
      "portraits",
      "projects",
      "covers",
      "previews",
      "services",
      "videos",
      "gifs",
      "images",
      "public",
    ];
    for (const folder of folders) {
      try {
        await supabase.storage.from("images").remove([`${folder}/${fileName}`]);
        break; // If successful, break the loop
      } catch (error) {}
    }
  }
  return { error: deleteError };
}
