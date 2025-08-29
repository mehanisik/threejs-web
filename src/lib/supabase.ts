import { createServerClient } from "@supabase/ssr";
import { parseCookies, setCookie } from "@tanstack/react-start/server";

export function getSupabaseServerClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!(supabaseUrl && supabaseAnonKey)) {
    console.error("Missing Supabase environment variables:", {
      url: supabaseUrl ? "SET" : "MISSING",
      key: supabaseAnonKey ? "SET" : "MISSING",
    });
    throw new Error("Missing Supabase environment variables");
  }

  try {
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value);
          });
        },
      },
    });
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
    throw new Error(`Failed to create Supabase client: ${error}`);
  }
}
