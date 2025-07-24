import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BaseRecord } from "@/types/admin";

interface TableActionsProps<T extends BaseRecord> {
  record: T;
  onEdit: (record: T) => void;
  onDelete: (id: string, entityName: string) => void;
  entityName: string;
}

export function TableActions<T extends BaseRecord>({
  record,
  onEdit,
  onDelete,
  entityName,
}: TableActionsProps<T>) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => onEdit(record)}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-foreground/10 rounded-full"
        title={`Edit ${entityName}`}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => onDelete(record.id, entityName)}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full1"
        title={`Delete ${entityName}`}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
