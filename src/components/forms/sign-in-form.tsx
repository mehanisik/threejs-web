import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/use-zod-form";
import { signInFn } from "@/lib/auth";
import { PageWrapper } from "../ui/page-wrapper";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
});

export function SignInForm() {
  const navigate = useNavigate();
  const { form, resetForm } = useZodForm(signInSchema);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setValue, getValues } = form;

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("rememberEmail");
    if (saved) {
      setValue("email", saved);
    }
  }

  const mutation = useMutation({
    mutationFn: signInFn,
    onSuccess: () => {
      const { email, remember } = getValues();
      if (typeof window !== "undefined") {
        if (remember) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
      }
      resetForm({ email: "", password: "", remember: false });
      navigate({ to: "/admin", replace: true });
    },
    onError: (err: Error) => {
      setError(err?.message || "Login failed");
    },
  });

  function onSubmit(data: z.infer<typeof signInSchema>) {
    setError(null);
    mutation.mutate({ data });
  }

  return (
    <PageWrapper>
      <div className="relative mx-auto flex min-h-screen max-w-lg items-center justify-center p-6">
        <div className="w-full rounded-xl border border-foreground/10 bg-background/60 p-6 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10 select-none rounded-md bg-primary/15 text-primary grid place-items-center">
              ✦
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...form.register("email")}
                  disabled={mutation.isPending}
                  className={`peer pr-10 transition-all ${
                    form.formState.errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "focus:ring-primary/20"
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  aria-describedby="email-error"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                  @
                </span>
              </div>
              {form.formState.errors.email && (
                <span
                  id="email-error"
                  className="mt-1 block text-xs text-red-600"
                >
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...form.register("password")}
                  disabled={mutation.isPending}
                  className={`pr-10 transition-all ${
                    form.formState.errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "focus:ring-primary/20"
                  }`}
                  placeholder="••••••••"
                  aria-invalid={!!form.formState.errors.password}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {form.formState.errors.password && (
                <span
                  id="password-error"
                  className="mt-1 block text-xs text-red-600"
                >
                  {form.formState.errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-foreground/30"
                  {...form.register("remember")}
                />
                Remember me
              </label>
            </div>

            {error && (
              <div className="mt-1 text-center text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full gap-2 font-semibold tracking-wide transition-transform active:translate-y-[1px]"
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
