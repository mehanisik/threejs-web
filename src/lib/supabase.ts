import { createClient } from "@supabase/supabase-js";
import { showErrorToast } from "@/components/ui/error-toast";
import type { Database } from "@/types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!(supabaseUrl && supabaseKey)) {
  showErrorToast("Missing Supabase environment variables");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
