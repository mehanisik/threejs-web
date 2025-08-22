import type {
  Database,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Projects = Tables<"projects">;
export type Images = Tables<"images">;
export type Services = Tables<"services">;

export type RowOf<T extends keyof Database["public"]["Tables"]> = Tables<T>;
export type InsertOf<T extends keyof Database["public"]["Tables"]> =
  TablesInsert<T>;
export type UpdateOf<T extends keyof Database["public"]["Tables"]> =
  TablesUpdate<T>;
export type DeleteOf<T extends keyof Database["public"]["Tables"]> = Pick<
  Tables<T>,
  "id"
>;
