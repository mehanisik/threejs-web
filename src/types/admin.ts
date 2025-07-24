import type { Tables } from "./database.types";

export type ViewMode = "list" | "edit";

export type TabType = "about" | "projects" | "services";

export interface BaseRecord {
  id: string;
  created_at: string | null;
}

// Use the exact types from database schema
export type ProjectRecord = Tables<"projects">;
export type ServiceRecord = Tables<"services">;
export type AboutRecord = Tables<"about">;

// New types for image tables
export type ProjectImageRecord = Tables<"project_images"> & {
  id: string;
  project_id: string;
  image_url: string;
  is_cover: boolean;
  created_at: string;
  user_id: string;
};

export type AboutImageRecord = Tables<"about_images"> & {
  id: string;
  image_url: string;
  created_at: string;
  user_id: string;
};

// Extended types with relations for admin display
export interface ProjectWithImages extends Tables<"projects"> {
  project_images: ProjectImageRecord[];
}

export interface AboutWithImages extends Tables<"about"> {
  about_images: AboutImageRecord[];
}

export interface LoadingSpinnerProps {
  className?: string;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface BaseManagementProps {
  viewMode: ViewMode;
  onSwitchToEdit?: () => void;
  onEditItem?: (itemId: string) => void;
  editingItemId?: string | null;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (record: T) => React.ReactNode;
  className?: string;
}

export type ManagementConfig<T extends BaseRecord> = {
  tableName: string;
  entityName: string;
  entityNamePlural: string;
  sortConfig?: {
    column: string;
    ascending: boolean;
  };
  columns: TableColumn<T>[];
};

// Image management types
export interface ImageUploadConfig {
  bucket: string;
  tableName: "project_images" | "about_images";
  foreignKey: "project_id" | "user_id";
  isMultiple: boolean;
  isCover?: boolean; // For project images
}
