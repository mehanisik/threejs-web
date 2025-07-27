import * as z from "zod";
import type { Tables } from "@/types/database.types";

export type Project = Tables<"projects">;
export type Service = Tables<"services">;
export type ImageRecord = Tables<"images">;

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  city: z.string().optional(),
  date: z.string().optional(),
  external_url: z.string().url().optional().or(z.literal("")),
  slug: z.string().optional(),
  tags: z.string().optional(),
  order_index: z.number().min(0),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  service_code: z.string().min(1, "Service code is required"),
  icon_url: z.string().url().optional().or(z.literal("")),
  slug: z.string().optional(),
  order_index: z.number().min(0).optional(),
});

export const imageSchema = z
  .object({
    type: z.enum(["portrait", "project", "cover", "preview", "services"]),
    project_id: z.string().optional(),
    service_id: z.string().optional(),
    file: z.any().optional(),
  })
  .refine((data) => data.file, {
    message: "Either an image file or a URL is required",
    path: ["file"],
  });
