import type { User } from "@supabase/supabase-js";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import type { TabType } from "@/types/admin";

interface AdminHeaderProps {
  user: User | null;
  onLogout?: () => Promise<void>;
  activeTab?: TabType;
  onToggleSidebar?: () => void;
}

export function AdminHeader({
  user,
  onLogout,
  activeTab = "projects",
  onToggleSidebar,
}: AdminHeaderProps) {
  const [theme, setTheme] = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "projects":
        return "Projects";
      case "services":
        return "Services";
      case "about":
        return "About";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:flex md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div>
            <h1 className="text-lg font-medium">{getTabTitle()}</h1>
            <p className="text-xs text-muted-foreground">Manage your content</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 rounded-full p-1 px-2 hover:bg-accent"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={user?.email || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {user?.email ? getInitials(user.email) : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden md:inline-block truncate max-w-[100px]">
                {user?.email}
              </span>
            </Button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover rounded-md shadow-lg border border-border overflow-hidden">
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Account</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                </div>
                <Separator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={handleLogout}
                  >
                    <span>Sign out</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
