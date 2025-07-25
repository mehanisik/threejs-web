import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import type { Tables } from "@/types/database.types";

export type TableName = "images" | "projects" | "services";

export function useSupabaseTable<T extends TableName = TableName>(
  tableName: T,
  selectFields = "*",
) {
  type Row = Tables<T>;
  const [records, setRecords] = useState<Row[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);

    const query = supabase.from(tableName).select(selectFields);

    const { data, error } = await query;

    if (error) {
      setFetchError(error.message);
    } else {
      setRecords(data as Row[]);
    }

    setIsLoading(false);
  }, [tableName, selectFields]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    isLoading,
    fetchError,
    isEmpty: records?.length === 0 && !isLoading,
    total: records?.length || 0,
    refresh: fetchRecords,
  };
}
