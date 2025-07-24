import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import type { TabType, ViewMode } from "@/types/admin";
import { AboutManagement } from "./about/about-management";
import { AdminHeader } from "./admin-header";
import { AdminSidebar, type ExtendedTabType } from "./admin-sidebar";
import { PreviewImagesManagement } from "./preview-images-management";
import { ProjectsManagement } from "./projects/projects-management";
import { ServicesManagement } from "./services/services-management";

interface AdminDashboardProps {
  onLogout?: () => Promise<void>;
  user?: User | null;
}

export function AdminDashboard({
  onLogout,
  user: propUser,
}: AdminDashboardProps) {
  const { user: authUser } = useAuth();
  const currentUser = propUser || authUser;

  const [activeTab, setActiveTab] = useState<ExtendedTabType>("projects");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleEditItem = (itemId: string) => {
    setEditingItemId(itemId);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItemId(null);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setIsCreating(false);
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "projects":
        return "Projects";
      case "services":
        return "Services";
      case "about":
        return "About";
      case "preview-images":
        return "Preview Images";
      default:
        return "Content";
    }
  };

  const getSubtitle = () => {
    if (editingItemId) {
      return "Edit existing item";
    }
    if (isCreating) {
      return `Create new ${activeTab.slice(0, -1)}`;
    }
    if (activeTab === "preview-images") {
      return "Upload and manage preview images";
    }
    return `Manage your ${activeTab}`;
  };

  const renderContent = () => {
    const commonProps = {
      viewMode: (isCreating || editingItemId ? "edit" : "list") as ViewMode,
      onSwitchToEdit: handleCreateNew,
      onEditItem: handleEditItem,
      editingItemId,
    };

    switch (activeTab) {
      case "projects":
        return <ProjectsManagement {...commonProps} />;
      case "services":
        return <ServicesManagement {...commonProps} />;
      case "about":
        return <AboutManagement {...commonProps} />;
      case "preview-images":
        return <PreviewImagesManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} flex-shrink-0 h-screen sticky top-0 hidden lg:block transition-all duration-300`}
      >
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setEditingItemId(null);
            setIsCreating(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader
          user={currentUser as User}
          onLogout={handleLogout}
          activeTab={activeTab as TabType}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-background/50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light tracking-tight">
                  {getTabTitle()}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {getSubtitle()}
                </p>
              </div>
              {activeTab !== "preview-images" &&
                !editingItemId &&
                !isCreating && (
                  <Button onClick={handleCreateNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span>New {activeTab.slice(0, -1)}</span>
                  </Button>
                )}
            </div>
            <Card className="border-border/40 shadow-sm bg-background/80 backdrop-blur-sm">
              <div className="p-6">{renderContent()}</div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
