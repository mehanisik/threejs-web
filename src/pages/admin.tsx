import { useState } from "react";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";
import { useAuth } from "@/lib/auth";

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { initialized, isAuthenticated, user, logout } = useAuth();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  // Show loading state while checking session
  if (!initialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          <p className="text-sm text-foreground/60">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated or just logged in, show dashboard
  if (isAuthenticated || isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} user={user} />;
  }

  // Otherwise show login screen
  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
}
