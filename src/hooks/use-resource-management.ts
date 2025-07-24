import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";
import type { Tables } from "@/types/database.types";
import { useSupabaseTable } from "./use-supabase-query";

interface UseResourceManagementOptions<
  T extends Tables<"projects"> | Tables<"services"> | Tables<"about">,
> {
  tableName: "projects" | "services" | "about";
  sortConfig?: {
    column: string;
    ascending: boolean;
  };
  editingItemId?: string | null;
  onEditItem?: (itemId: string) => void;
  disableCreate?: boolean;
}

export function useResourceManagement<
  T extends Tables<"projects"> | Tables<"services"> | Tables<"about">,
>({
  tableName,
  sortConfig = { column: "created_at", ascending: false },
  editingItemId,
  onEditItem,
  disableCreate = false,
}: UseResourceManagementOptions<T>) {
  const {
    records: baseRecords,
    isLoading,
    refresh,
  } = useSupabaseTable(tableName, "*", sortConfig);

  const { isAuthenticated } = useAuth();
  const [records, setRecords] = useState<T[] | undefined>();
  const [editingRecord, setEditingRecord] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRecords(baseRecords as T[]);
  }, [baseRecords]);

  useEffect(() => {
    if (editingItemId && records) {
      const record = records.find((r: T) => r.id === editingItemId);
      if (record) {
        setEditingRecord(record);
      }
    } else if (editingItemId === null) {
      setEditingRecord(null);
    }
  }, [editingItemId, records]);

  const handleEdit = useCallback(
    (record: T) => {
      if (onEditItem) {
        onEditItem(record.id);
      } else {
        setEditingRecord(record);
      }
    },
    [onEditItem],
  );

  const handleDelete = useCallback(
    async (id: string, entityName: string) => {
      if (confirm(`Are you sure you want to delete this ${entityName}?`)) {
        try {
          if (!isAuthenticated) {
            throw new Error("You must be logged in to delete records.");
          }

          const { error } = await supabase
            .from(tableName)
            .delete()
            .eq("id", id);

          if (error) {
            console.error(`Delete error (${tableName}):`, error);
            throw error;
          }

          refresh();
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          alert(`Failed to delete ${entityName}: ${errorMessage}`);
        }
      }
    },
    [tableName, refresh, isAuthenticated],
  );

  const handleSave = useCallback(
    async (
      data: Partial<T>,
      isEditing = false,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        setError(null);

        if (!isAuthenticated) {
          throw new Error("You must be logged in to save records.");
        }

        if (isEditing && editingRecord) {
          const { error: updateError } = await supabase
            .from(tableName)
            .update(data)
            .eq("id", editingRecord.id);

          if (updateError) {
            console.error(`Update error (${tableName}):`, updateError);
            throw updateError;
          }
        } else {
          if (disableCreate) {
            throw new Error("Creating new records is disabled");
          }

          let error = null;

          if (tableName === "projects") {
            const { error: insertError } = await supabase
              .from("projects")
              .insert(data as any);
            error = insertError;
          } else if (tableName === "services") {
            const { error: insertError } = await supabase
              .from("services")
              .insert(data as any);
            error = insertError;
          } else if (tableName === "about") {
            const { error: insertError } = await supabase
              .from("about")
              .insert(data as any);
            error = insertError;
          }

          if (error) {
            console.error(`Insert error (${tableName}):`, error);
            throw error;
          }
        }

        refresh();
        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Save error:", errorMessage);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [tableName, editingRecord, refresh, isAuthenticated, disableCreate],
  );

  const handleFormSave = useCallback(() => {
    setEditingRecord(null);
    refresh();
  }, [refresh]);

  const handleFormCancel = useCallback(() => {
    setEditingRecord(null);
  }, []);

  const handleAddNew = useCallback(() => {
    if (disableCreate) {
      console.warn("Creating new records is disabled");
      return;
    }
    setEditingRecord(null);
  }, [disableCreate]);

  return {
    records,
    isLoading,
    refresh,
    editingRecord,
    error,
    handleEdit,
    handleDelete,
    handleSave,
    handleFormSave,
    handleFormCancel,
    handleAddNew,
    disableCreate,
  };
}
