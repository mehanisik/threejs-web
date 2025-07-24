import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BaseRecord, TableColumn } from "@/types/admin";
import { LoadingView } from "./loading-view";
import { ManagementHeader } from "./management-header";
import { TableActions } from "./table-actions";

interface QuickEditCardProps<T extends BaseRecord> {
  records: T[];
  isLoading: boolean;
  onEdit: (record: T) => void;
  entityName: string;
  renderQuickInfo: (record: T) => React.ReactNode;
}

function QuickEditCard<T extends BaseRecord>({
  records,
  isLoading,
  onEdit,
  entityName,
  renderQuickInfo,
}: QuickEditCardProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingView height="py-8" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 max-h-60 overflow-y-auto">
      {records?.map((record) => (
        <div
          key={record.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/20 transition-colors bg-card text-card-foreground"
        >
          {renderQuickInfo(record)}
          <Button
            onClick={() => onEdit(record)}
            variant="ghost"
            size="sm"
            className="text-foreground/60 hover:text-foreground"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
}

interface ManagementViewProps<T extends BaseRecord> {
  records: T[] | undefined;
  isLoading: boolean;
  entityName: string;
  entityNamePlural: string;
  columns: TableColumn<T>[];
  onEdit: (record: T) => void;
  onDelete: (id: string, entityName: string) => void;
  onSwitchToEdit?: () => void;
  renderQuickInfo?: (record: T) => React.ReactNode;
  showQuickEdit?: boolean;
  editingRecord?: T | null;
  hideAddNew?: boolean;
}

export function ManagementView<T extends BaseRecord>({
  records,
  isLoading,
  entityName,
  entityNamePlural,
  columns,
  onEdit,
  onDelete,
  onSwitchToEdit,
  renderQuickInfo,
  showQuickEdit = true,
  editingRecord,
  hideAddNew = false,
}: ManagementViewProps<T>) {
  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <ManagementHeader
          title={entityNamePlural}
          description={`Manage your ${entityNamePlural.toLowerCase()} (${records?.length || 0} total)`}
          onAddNew={hideAddNew ? undefined : onSwitchToEdit}
        />
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={String(column.key)}
                      className={column.className}
                    >
                      {column.label}
                    </TableHead>
                  ))}
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records?.map((record) => (
                  <TableRow key={record.id}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${record.id}-${String(column.key)}`}
                        className={column.className}
                      >
                        {column.render
                          ? column.render(record)
                          : String(record[column.key as keyof T] || "—")}
                      </TableCell>
                    ))}
                    <TableCell>
                      <TableActions
                        record={record}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        entityName={entityName}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      
    </motion.div>
  );
}
