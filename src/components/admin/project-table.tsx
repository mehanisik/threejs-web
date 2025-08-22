import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/admin.types";
import { DataTable } from "../ui/data-table";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => <div>{row.getValue("city") || "-"}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return <div>{date ? new Date(date).toLocaleDateString() : "-"}</div>;
      },
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const dateA = rowA.getValue("date") as string;
        const dateB = rowB.getValue("date") as string;
        if (!(dateA || dateB)) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[] | null;
        return (
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            )) || "-"}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "order_index",
      header: "Order",
      cell: ({ row }) => <div>{row.getValue("order_index")}</div>,
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={projects || []}
      searchPlaceholder="Search projects..."
      searchColumn="title"
    />
  );
};
