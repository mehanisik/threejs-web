import type { PostgrestError } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

type SupabaseQueryResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

interface UseSupabaseProps<T> {
  queryFn: () => Promise<SupabaseQueryResult<T>>;
}

export const useSupabase = <T>({ queryFn }: UseSupabaseProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const queryFnRef = useRef(queryFn);

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await queryFnRef.current();
      setData(data);
      setError(error?.message ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};
