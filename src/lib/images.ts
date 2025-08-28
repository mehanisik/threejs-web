import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "./supabase";

export const fetchAllImages = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("images").select("*");
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);

export const getPotraitImage = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("images")
        .select("image_url")
        .eq("type", "portrait");
      if (error) throw new Error(error.message);
      return data?.[0]?.image_url;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);

export const getPreviewImages = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("type", "preview");
    if (error) throw new Error(error.message);
    return data ?? [];
  },
);

export const uploadImageFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fileBase64: z.string(), // data URL or base64 without prefix
      contentType: z.string(),
      fileName: z.string(),
      type: z.string().optional(),
      projectId: z.string().optional(),
      serviceId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { fileBase64, contentType, fileName, type, projectId, serviceId } =
      data;
    const extension = fileName.includes(".")
      ? fileName.split(".").pop()
      : "bin";

    const base64 = fileBase64.includes(",")
      ? fileBase64.split(",")[1]
      : fileBase64;
    const buffer = Buffer.from(base64, "base64");

    const path = `${type || "uploads"}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadErr } = await supabase.storage
      .from("images")
      .upload(path, buffer, { contentType, upsert: false });
    if (uploadErr) throw new Error(uploadErr.message);

    const { data: pub } = supabase.storage.from("images").getPublicUrl(path);
    const image_url = pub.publicUrl;

    const { data: row, error: insertErr } = await supabase
      .from("images")
      .insert({
        image_url,
        type,
        project_id: projectId ?? null,
        service_id: serviceId ?? null,
      })
      .select("*")
      .single();
    if (insertErr) throw new Error(insertErr.message);

    return row;
  });

export const deleteImageFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().or(z.number()), image_url: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const url = new URL(data.image_url);
    const idx = url.pathname.indexOf("/object/public/");
    let storagePath = "";
    if (idx >= 0) {
      storagePath = url.pathname.substring(idx + "/object/public/".length);
      const parts = storagePath.split("/");
      parts.shift();
      storagePath = parts.join("/");
    }

    if (storagePath) {
      await supabase.storage.from("images").remove([storagePath]);
    }

    const { error } = await supabase.from("images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    return { ok: true };
  });
