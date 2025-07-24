import { motion } from "framer-motion";
import { ServiceForm } from "@/components/forms/service-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useResourceManagement } from "@/hooks/use-resource-management";
import type {
  BaseManagementProps,
  ServiceRecord,
  TableColumn,
} from "@/types/admin";
import { LoadingSpinner } from "../shared/loading-spinner";

const serviceColumns: TableColumn<ServiceRecord>[] = [
  {
    key: "title",
    label: "Title",
    render: (service) => (
      <div className="flex items-center gap-3">
        <span className="font-medium truncate">{service.title}</span>
      </div>
    ),
  },
  {
    key: "service_code",
    label: "Code",
    className: "w-32 font-mono text-sm text-muted-foreground",
  },
  {
    key: "description",
    label: "Description",
    render: (service) => (
      <div className="max-w-md">
        <p className="text-sm text-muted-foreground truncate">
          {service.description || "—"}
        </p>
      </div>
    ),
  },
];

export function ServicesManagement({
  viewMode,
  onSwitchToEdit,
  onEditItem,
  editingItemId,
}: BaseManagementProps) {
  const {
    records: services,
    isLoading,
    editingRecord: editingService,
    handleEdit,
    handleDelete,
    handleSave,
    handleFormSave,
    handleFormCancel,
  } = useResourceManagement<ServiceRecord>({
    tableName: "services",
    sortConfig: { column: "created_at", ascending: false },
    editingItemId,
    onEditItem,
  });

  if (viewMode === "edit") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ServiceForm
          editingService={editingService}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          handleSave={handleSave}
        />
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-6">
        <div className="overflow-hidden rounded-md border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {serviceColumns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={column.className}
                  >
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={serviceColumns.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                services?.map((service) => (
                  <TableRow key={service.id} className="group">
                    {serviceColumns.map((column) => (
                      <TableCell
                        key={`${service.id}-${String(column.key)}`}
                        className={column.className}
                      >
                        {column.render
                          ? column.render(service)
                          : String(
                              service[column.key as keyof ServiceRecord] || "—",
                            )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="h-8 opacity-70 group-hover:opacity-100"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service.id, "service")}
                          className="h-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground text-center">
          {services?.length} {services?.length === 1 ? "service" : "services"}{" "}
          total
        </div>
      </div>
    </motion.div>
  );
}
