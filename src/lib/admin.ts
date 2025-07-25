import type { z } from "zod";
import type { projectSchema, serviceSchema } from "@/types/admin";
import supabase from "./supabase";

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
  type: string,
  project_id?: string,
) {
  const filePath = `public/${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file);
  if (uploadError) return { error: uploadError };
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(uploadData.path);
  const imageUrl = publicUrlData.publicUrl;
  if (imageUrl) {
    return supabase
      .from("images")
      .insert([{ url: imageUrl, type, project_id: project_id || null }]);
  }
  return { error: "No image URL" };
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
