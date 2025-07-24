import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useZodForm } from "@/hooks/use-zod-form";
import { useAuth } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const SecurityIllustration = () => (
  <motion.svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    className="text-foreground/20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <title>Security Illustration</title>
    <motion.circle
      cx="60"
      cy="60"
      r="50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />

    <motion.rect
      x="35"
      y="45"
      width="50"
      height="40"
      rx="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />

    <motion.circle
      cx="60"
      cy="40"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1 }}
    />

    <motion.circle
      cx="60"
      cy="65"
      r="3"
      fill="currentColor"
      fillOpacity="0.3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    />

    <motion.line
      x1="60"
      y1="68"
      x2="60"
      y2="75"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
    />

    {[0, 1, 2, 3].map((i) => (
      <motion.circle
        key={`dot-${i}`}
        cx={45 + i * 10}
        cy={95}
        r="1.5"
        fill="currentColor"
        fillOpacity="0.2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
      />
    ))}
  </motion.svg>
);

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  const { form } = useZodForm(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleLogin = async (data: LoginForm) => {
    try {
      setAuthError("");

      const { error } = await login(data.email, data.password);

      if (error) {
        console.error("Login error:", error);

        if (error.message.includes("Invalid login credentials")) {
          setAuthError("Invalid email or password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          setAuthError("Please confirm your email address before logging in.");
        } else {
          setAuthError(error.message);
        }
        return;
      }

      console.log("Login successful");
      reset();
      onLoginSuccess();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Login exception:", err);
      setAuthError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-foreground/10">
          <CardHeader className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <SecurityIllustration />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-foreground/60" />
                <CardTitle className="text-xl font-light">
                  Admin Access
                </CardTitle>
              </div>
              <CardDescription>
                Secure authentication required for dashboard access
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {authError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-foreground/60" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-10 border-foreground/20 focus:border-foreground/40"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-2"
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-foreground/60" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Your secure password"
                    className="pl-10 pr-10 border-foreground/20 focus:border-foreground/40"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              <Separator className="bg-foreground/10" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Authenticating..." : "Access Dashboard"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-foreground/50">
            Protected by enterprise-grade security protocols
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
