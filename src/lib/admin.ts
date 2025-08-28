import { createServerFn } from "@tanstack/react-start";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";
import { getSupabaseServerClient } from "./supabase";

export type ProjectRow = Tables<"projects">;
export type ProjectInsert = TablesInsert<"projects">;
export type ProjectUpdate = TablesUpdate<"projects">;

export const listProjectsAdmin = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,title,slug,order_index,city,date,external_url,tags,description",
      )
      .order("order_index", { ascending: true });
    if (error) throw new Error(error.message);
    return data as ProjectRow[];
  },
);

export const createProjectFn = createServerFn({ method: "POST" })
  .validator((d: ProjectInsert) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const getNextOrderIndex = async () => {
      const { data: maxRows } = await supabase
        .from("projects")
        .select("order_index")
        .order("order_index", { ascending: false })
        .limit(1);
      const max = maxRows?.length ? maxRows[0].order_index : 0;
      console.log("max", max);
      return (Number(max) || 0) + 1;
    };

    const payload: ProjectInsert = {
      ...data,
      order_index:
        (data as ProjectInsert).order_index == null
          ? await getNextOrderIndex()
          : data.order_index,
    } as ProjectInsert;

    const tryInsert = async (): Promise<ProjectRow> => {
      const { data: row, error } = await supabase
        .from("projects")
        .insert(payload)
        .select("*")
        .single();
      if (error) {
        if ((error as { code?: string }).code === "23505") {
          payload.order_index = await getNextOrderIndex();
          const { data: row2, error: err2 } = await supabase
            .from("projects")
            .insert(payload)
            .select("*")
            .single();
          if (err2) throw new Error(err2.message);
          return row2 as ProjectRow;
        }
        throw new Error(error.message);
      }
      return row as ProjectRow;
    };

    return await tryInsert();
  });

export const updateProjectFn = createServerFn({ method: "POST" })
  .validator((d: ProjectUpdate & { id: string }) => d)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    const supabase = getSupabaseServerClient();

    const { data: row, error } = await supabase
      .from("projects")
      .update(rest)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as ProjectRow;
  });

export const deleteProjectFn = createServerFn({ method: "POST" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true } as const;
  });
