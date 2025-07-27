import type { z } from "zod";
import type { projectSchema, serviceSchema } from "@/types/admin.types";
import supabase from "./supabase";

function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

export async function testStorageBucket() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      return false;
    }
    const imagesBucket = data?.find((bucket) => bucket.name === "images");
    if (!imagesBucket) {
      return false;
    }
    return true;
  } catch (_error) {
    return false;
  }
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

export async function uploadImage(
  file: File,
  type: "portrait" | "project" | "cover" | "preview" | "services",
  project_id?: string,
) {
  try {
    const sanitizedFileName = sanitizeFileName(file.name);
    const filePath = `public/${Date.now()}_${sanitizedFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      return { error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    const imageUrl = publicUrlData.publicUrl;

    if (imageUrl) {
      const insertData = {
        url: imageUrl,
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
    return { error: "No image URL generated" };
  } catch (error) {
    return { error };
  }
}

export async function deleteImage(image: { id: string; url: string }) {
  const { error: deleteError } = await supabase
    .from("images")
    .delete()
    .eq("id", image.id);
  if (!deleteError) {
    const urlParts = image.url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    await supabase.storage.from("images").remove([`public/${fileName}`]);
  }
  return { error: deleteError };
}
