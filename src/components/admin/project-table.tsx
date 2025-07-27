import { Edit, Trash2 } from "lucide-react";
import type React from "react";
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
import type { Project } from "@/types/admin.types";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>City</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Tags</TableHead>
        <TableHead>Order</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {projects?.length === 0 && (
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            No projects found.
          </TableCell>
        </TableRow>
      )}
      {projects?.map((project) => (
        <TableRow key={project.id}>
          <TableCell className="font-medium">{project.title}</TableCell>
          <TableCell>{project.city}</TableCell>
          <TableCell>{project.date}</TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </TableCell>
          <TableCell>{project.order_index}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(project)}
              >
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
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
