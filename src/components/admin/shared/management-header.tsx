import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ManagementHeaderProps {
  title: string;
  description: string;
  onAddNew?: () => void;
  addButtonText?: string;
}

export function ManagementHeader({
  title,
  description,
  onAddNew,
  addButtonText = "Add New",
}: ManagementHeaderProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-light">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {onAddNew && (
          <div className="flex gap-2">
            <Button
              onClick={onAddNew}
              variant="outline"
              size="sm"
              className="border-foreground/20 hover:border-foreground/40 rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonText}
            </Button>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
