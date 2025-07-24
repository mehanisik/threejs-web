import { useCallback, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import type { Tables } from "@/types/database.types";

type TableName = "projects" | "services" | "about";

export function useAdminData<T extends TableName>(
  tableName: T,
  selectFields = "*",
  sort?: { column: string; ascending?: boolean },
) {
  const [records, setRecords] = useState<Tables<T>[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);

    let query = supabase.from(tableName).select(selectFields);

    if (sort) {
      query = query.order(sort.column, { ascending: sort.ascending ?? true });
    }

    const { data, error } = await query;

    if (error) {
      setFetchError(error.message);
    } else {
      setRecords(data as Tables<T>[]);
    }

    setIsLoading(false);
  }, [tableName, selectFields, sort]);

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
