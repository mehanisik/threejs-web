import type { User } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "./supabase";

export const fetchUserFn = createServerFn({ method: "GET" }).handler<{
  user: User | null | undefined;
  error: string | null;
}>(async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      error: error?.message || ("No user found" as const),
    };
  }

  return {
    user: JSON.parse(JSON.stringify(user)),
    error: null,
  };
});

export const signInFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ data: { email, password } }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { success: false, error: error.message };

    return { success: true };
  });

export const signOutFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
);
