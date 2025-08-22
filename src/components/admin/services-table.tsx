import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/admin.types";
import { DataTable } from "../ui/data-table";

interface ServicesTableProps {
  services: Service[];
  isLoading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "service_code",
      header: "Service Code",
      cell: ({ row }) => <div>{row.getValue("service_code")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div>{row.getValue("slug") || "-"}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "order_index",
      header: "Order",
      cell: ({ row }) => <div>{row.getValue("order_index") || "-"}</div>,
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const service = row.original;
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(service)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(service.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={services || []}
      searchPlaceholder="Search services..."
      searchColumn="title"
    />
  );
};
