import { createServerFn } from "@tanstack/react-start";
import type { Tables } from "@/types/database.types";
import { getSupabaseServerClient } from "./supabase";

export type ServiceWithImages = Tables<"services"> & {
  images: Tables<"images">[];
};

export const getServices = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("services")
        .select(`
    *,
    images:images!inner(*)
  `)
        .eq("images.type", "services")
        .order("order_index", { ascending: true });
      if (error) throw new Error(error.message);
      return data as ServiceWithImages[];
    } catch (error) {
      throw new Error(error as string);
    }
  },
);

export const listServices = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("id,title,service_code")
      .order("order_index", { ascending: true });
    if (error) throw new Error(error.message);
    return data as Pick<Tables<"services">, "id" | "title" | "service_code">[];
  },
);
