import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ProjectsTable } from "@/components/admin/project-table";
import { ProjectForm } from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject, deleteProject, updateProject } from "@/lib/admin";
import { type Project, projectSchema } from "@/types/admin";

interface ProjectDialogProps {
  projects: Project[];
  refreshProjects: () => void;
  isLoadingProjects: boolean;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  projects,
  refreshProjects,
  isLoadingProjects,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      date: "",
      external_url: "",
      slug: "",
      tags: "",
      order_index: 0,
    },
  });

  const handleProjectSubmit = async (data: z.infer<typeof projectSchema>) => {
    if (editingProject) {
      const { error } = await updateProject(editingProject.id, data);
      if (!error) {
        refreshProjects();
        setIsDialogOpen(false);
        setEditingProject(null);
        projectForm.reset();
      }
    } else {
      const { error } = await createProject(data);
      if (!error) {
        refreshProjects();
        setIsDialogOpen(false);
        projectForm.reset();
      }
    }
  };
  const handleDeleteProject = async (id: string) => {
    const { error } = await deleteProject(id);
    if (!error) refreshProjects();
  };
  const openEditProjectDialog = (project: Project) => {
    setEditingProject(project);
    projectForm.reset({
      title: project.title,
      description: project.description || "",
      city: project.city || "",
      date: project.date || "",
      external_url: project.external_url || "",
      slug: project.slug || "",
      tags: project.tags?.join(", ") || "",
      order_index: project.order_index,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Manage your project portfolio</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProject(null);
                projectForm.reset();
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                Fill in the project details below
              </DialogDescription>
            </DialogHeader>
            <ProjectForm
              form={projectForm}
              onSubmit={handleProjectSubmit}
              onCancel={() => setIsDialogOpen(false)}
              editingProject={editingProject}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ProjectsTable
          projects={projects}
          isLoading={isLoadingProjects}
          onEdit={openEditProjectDialog}
          onDelete={handleDeleteProject}
        />
      </CardContent>
    </Card>
  );
};
