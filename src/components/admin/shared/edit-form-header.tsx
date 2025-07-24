import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EditFormHeaderProps {
  isEditing: boolean;
  entityName: string;
  editingItemTitle?: string;
  onAddNew?: () => void;
  hideAddNew?: boolean;
}

export function EditFormHeader({
  isEditing,
  entityName,
  editingItemTitle,
  onAddNew,
  hideAddNew = false,
}: EditFormHeaderProps) {
  const title = isEditing ? `Edit ${entityName}` : `Create New ${entityName}`;

  const description =
    isEditing && editingItemTitle
      ? `Updating ${entityName.toLowerCase()}: ${editingItemTitle}`
      : `Add a new ${entityName.toLowerCase()} to your portfolio`;

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl font-light">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {!isEditing && onAddNew && !hideAddNew && (
          <Button
            onClick={onAddNew}
            variant="outline"
            size="sm"
            className="border-foreground/20 hover:border-foreground/40"
          >
            <Plus className="w-4 h-4 mr-2" />
            New {entityName}
          </Button>
        )}
      </div>
    </CardHeader>
  );
}
