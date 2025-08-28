import { createServerFn } from "@tanstack/react-start";
import type { Tables } from "@/types/database.types";
import { getSupabaseServerClient } from "./supabase";

export type ProjectWithCoverImage = Tables<"projects"> & {
  coverImage: Tables<"images">[];
};

export const getProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();

    try {
      const { data, error } = await supabase
        .from("projects")
        .select(`
      *,
      coverImage:images!inner(*)
    `)
        .eq("coverImage.type", "cover")
        .order("order_index", { ascending: true });

      if (error) throw new Error(error.message);

      return { projects: data as ProjectWithCoverImage[] };
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
export type ProjectWithImages = Tables<"projects"> & {
  images: Tables<"images">[];
};

export const getProjectBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => {
    if (typeof slug !== "string") throw new Error("Slug must be a string");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const supabase = getSupabaseServerClient();

    try {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          images:images(*)
        `)
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw new Error(error.message);

      return data as ProjectWithImages | null;
    } catch (error) {
      throw new Error(error as string);
    }
  });

export const listProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("id,title,slug")
      .order("order_index", { ascending: true });
    if (error) throw new Error(error.message);
    return data as Pick<Tables<"projects">, "id" | "title" | "slug">[];
  },
);
