import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/use-zod-form";
import { useAuth } from "@/lib/auth";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignInForm() {
  const { form, resetForm } = useZodForm(signInSchema);
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsSubmitting(true);

    setError(null);
    const { error } = await login(data.email, data.password);
    if (error) {
      setError(error.message || "Login failed");
    } else {
      resetForm({ email: "", password: "" });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-2 text-center tracking-tight">
        Sign in to your account
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Welcome back! Please enter your credentials.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
            disabled={isSubmitting}
            className={`transition-all ${form.formState.errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-gray-200"}`}
            placeholder="you@example.com"
            aria-invalid={!!form.formState.errors.email}
            aria-describedby="email-error"
          />
          {form.formState.errors.email && (
            <span id="email-error" className="text-xs text-red-600 mt-1 block">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...form.register("password")}
              disabled={isSubmitting}
              className={`transition-all pr-10 ${form.formState.errors.password ? "border-red-500 focus:ring-red-200" : "focus:ring-gray-200"}`}
              placeholder="••••••••"
              aria-invalid={!!form.formState.errors.password}
              aria-describedby="password-error"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Hide password</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m2.122-2.122A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575m-2.122 2.122A9.956 9.956 0 0112 21c-1.657 0-3.22-.403-4.575-1.125"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Show password</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.67 1.664-1.175 2.4M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {form.formState.errors.password && (
            <span
              id="password-error"
              className="text-xs text-red-600 mt-1 block"
            >
              {form.formState.errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 font-semibold tracking-wide"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
