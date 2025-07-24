import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Layers,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TabType } from "@/types/admin";

export type ExtendedTabType = TabType | "preview-images";

interface AdminSidebarProps {
  activeTab: ExtendedTabType;
  onTabChange: (tab: ExtendedTabType) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const tabs = [
  {
    id: "projects" as ExtendedTabType,
    label: "Projects",
    icon: Layers,
    description: "Manage portfolio projects",
  },
  {
    id: "services" as ExtendedTabType,
    label: "Services",
    icon: FileText,
    description: "Manage service offerings",
  },
  {
    id: "about" as ExtendedTabType,
    label: "About",
    icon: User,
    description: "Manage personal information",
  },
  {
    id: "preview-images" as ExtendedTabType,
    label: "Preview Images",
    icon: ImageIcon,
    description: "Upload preview images",
  },
];

export function AdminSidebar({
  activeTab,
  onTabChange,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <div className="h-full border-r border-border/40 bg-background flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center w-full" : "",
          )}
        >
          {" "}
          <span className={cn("font-semibold", collapsed ? "hidden" : "")}>
            Admin
          </span>{" "}
        </div>
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        )}
      </div>
      <Separator />
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  collapsed ? "flex justify-center" : "flex items-center",
                )}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    !isActive && "text-muted-foreground",
                  )}
                />
                {!collapsed && (
                  <span className="ml-3 text-sm">{tab.label}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        {!collapsed && (
          <div className="rounded-md bg-muted p-3">
            <div className="text-xs font-medium mb-1">Admin Panel</div>
            <div className="text-xs text-muted-foreground">v1.0.0</div>
          </div>
        )}
      </div>
    </div>
  );
}
