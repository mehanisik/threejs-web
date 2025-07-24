import { motion } from "framer-motion";
import { ProjectForm } from "@/components/forms/project-form";
import { Badge } from "@/components/ui/badge";
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
  ProjectRecord,
  TableColumn,
} from "@/types/admin";
import { LoadingSpinner } from "../shared/loading-spinner";

const projectColumns: TableColumn<ProjectRecord>[] = [
  {
    key: "number",
    label: "#",
    className: "w-16",
    render: (project) => (
      <span className="font-mono text-sm">{project.number}</span>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (project) => (
      <div className="flex items-center gap-3">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-10 h-10 rounded-md object-cover"
          />
        )}
        <span className="font-medium truncate">{project.title}</span>
      </div>
    ),
  },
  {
    key: "city",
    label: "Location",
    className: "text-muted-foreground",
  },
  {
    key: "date",
    label: "Date",
    className: "text-muted-foreground",
  },
  {
    key: "tags",
    label: "Tags",
    render: (project) => (
      <div className="flex flex-wrap gap-1">
        {project.tags?.slice(0, 2).map((tag, index) => (
          <Badge
            key={`${project.id}-tag-${tag}-${index}`}
            variant="secondary"
            className="text-xs"
          >
            {tag}
          </Badge>
        ))}
        {project.tags && project.tags.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{project.tags.length - 2}
          </Badge>
        )}
      </div>
    ),
  },
];

export function ProjectsManagement({
  viewMode,
  onSwitchToEdit,
  onEditItem,
  editingItemId,
}: BaseManagementProps) {
  const {
    records: projects,
    isLoading,
    editingRecord: editingProject,
    handleEdit,
    handleDelete,
    handleSave,
    handleFormSave,
    handleFormCancel,
  } = useResourceManagement<ProjectRecord>({
    tableName: "projects",
    sortConfig: { column: "number", ascending: true },
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
        <ProjectForm
          editingProject={editingProject}
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
                {projectColumns.map((column) => (
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
              {projects?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={projectColumns.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                projects?.map((project) => (
                  <TableRow key={project.id} className="group">
                    {projectColumns.map((column) => (
                      <TableCell
                        key={`${project.id}-${String(column.key)}`}
                        className={column.className}
                      >
                        {column.render
                          ? column.render(project)
                          : String(
                              project[column.key as keyof ProjectRecord] || "—",
                            )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(project)}
                          className="h-8 opacity-70 group-hover:opacity-100"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id, "project")}
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
          {projects?.length} {projects?.length === 1 ? "project" : "projects"}{" "}
          total
        </div>
      </div>
    </motion.div>
  );
}
