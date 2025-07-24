import { Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { ImageUploader } from "@/components/admin/shared/image-uploader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/use-zod-form";
import type { ProjectRecord } from "@/types/admin";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  city: z.string().optional(),
  date: z.string().optional(),
  url: z
    .string()
    .regex(
      /^\/projects\/([a-z0-9-]+)$/i,
      "Please enter a valid project URL (e.g. /projects/123 or /projects/project-name)",
    ),
  image_url: z.string().optional(),
  tags: z.string().optional(),
  number: z.number().min(1, "Project number must be positive"),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  editingProject?: ProjectRecord | null;
  onSave: () => void;
  onCancel: () => void;
  handleSave?: (
    data: Partial<ProjectRecord>,
    isEditing: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
}

interface UploadedPhoto {
  url: string;
  caption?: string;
  id?: string;
}

export function ProjectForm({
  editingProject,
  onSave,
  onCancel,
  handleSave,
}: ProjectFormProps) {
  const [saveError, setSaveError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<UploadedPhoto[]>([]);
  const [projectPhotos, setProjectPhotos] = useState<UploadedPhoto[]>([]);

  const { form, resetForm } = useZodForm(projectSchema, {
    defaultValues: {
      title: editingProject?.title || "",
      city: editingProject?.city || "",
      date: editingProject?.date || "",
      url: editingProject?.url || "/projects/",
      image_url: editingProject?.image_url || "",
      tags: editingProject?.tags?.join(", ") || "",
      number: editingProject?.number || 1,
    },
  });

  // Initialize cover photo if available
  useEffect(() => {
    if (editingProject?.image_url) {
      setCoverPhoto([{ url: editingProject.image_url }]);
    } else {
      setCoverPhoto([]);
    }
  }, [editingProject?.image_url]);

  // Update form values when editingProject changes
  useEffect(() => {
    if (editingProject) {
      // Reset form with new values when editing project changes
      resetForm({
        title: editingProject.title || "",
        city: editingProject.city || "",
        date: editingProject.date || "",
        url: editingProject.url || "/projects/",
        image_url: editingProject.image_url || "",
        tags: editingProject.tags?.join(", ") || "",
        number: editingProject.number || 1,
      });
      console.log("Form reset with project:", editingProject.id);
    } else {
      // Reset to empty form when creating new
      resetForm({
        title: "",
        city: "",
        date: "",
        url: "/projects/",
        image_url: "",
        tags: "",
        number: 1,
      });
    }
  }, [editingProject, resetForm]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = form;

  const imageUrlValue = watch("image_url");

  const handleProjectSave = useCallback(
    async (data: ProjectForm) => {
      try {
        setSaveError("");
        setSaving(true);

        const projectData = {
          title: data.title,
          city: data.city || null,
          date: data.date || null,
          url: data.url,
          image_url: data.image_url || null,
          tags: data.tags
            ? data.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : null,
          number: data.number,
        };

        if (handleSave) {
          // Use the new handleSave method
          const { success, error } = await handleSave(
            projectData,
            !!editingProject,
          );

          if (!success) {
            throw new Error(error || "Failed to save project");
          }
        }

        reset();
        onSave();
      } catch (error: any) {
        setSaveError(error.message || "Failed to save project");
      } finally {
        setSaving(false);
      }
    },
    [editingProject, reset, onSave, handleSave],
  );

  const handleCoverImageChange = useCallback(
    (photos: UploadedPhoto[]) => {
      if (photos.length > 0) {
        setValue("image_url", photos[0].url);
        setCoverPhoto(photos);
      } else {
        setValue("image_url", "");
        setCoverPhoto([]);
      }
    },
    [setValue],
  );

  const handleProjectImagesChange = useCallback((photos: UploadedPhoto[]) => {
    setProjectPhotos(photos);
    // Note: Project images are handled separately through the database
  }, []);

  return (
    <form onSubmit={handleSubmit(handleProjectSave)} className="space-y-6 mt-6">
      <div className="space-y-2">
        <label
          htmlFor="project-title"
          className="text-sm font-medium text-foreground"
        >
          Project Title*
        </label>
        <Input
          id="project-title"
          placeholder="Enter project title"
          {...register("title")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.title && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.title.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="project-number"
          className="text-sm font-medium text-foreground"
        >
          Project Number*
        </label>
        <Input
          id="project-number"
          type="number"
          placeholder="1"
          {...register("number", { valueAsNumber: true })}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.number && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.number.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="project-city"
            className="text-sm font-medium text-foreground"
          >
            City
          </label>
          <Input
            id="project-city"
            placeholder="Enter city"
            {...register("city")}
            className="h-10 border-foreground/20 focus-visible:border-foreground/60"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="project-date"
            className="text-sm font-medium text-foreground"
          >
            Date
          </label>
          <Input
            id="project-date"
            placeholder="Enter date"
            {...register("date")}
            className="h-10 border-foreground/20 focus-visible:border-foreground/60"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="project-url"
          className="text-sm font-medium text-foreground"
        >
          Project URL
        </label>
        <Input
          id="project-url"
          placeholder="/projects/my-project"
          {...register("url")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.url && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.url.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-foreground">
          Project Cover Image
        </span>
        <ImageUploader
          onUpload={handleCoverImageChange}
          existingPhotos={coverPhoto}
          imageType="project_images"
          parentId={editingProject?.id}
        />
        {!editingProject?.id && (
          <div className="text-xs text-muted-foreground mt-1">
            Save the project first to upload images.
          </div>
        )}
      </div>

      {editingProject && editingProject.id && (
        <div className="space-y-3">
          <span className="text-sm font-medium text-foreground">
            Project Images
          </span>
          <ImageUploader
            onUpload={handleProjectImagesChange}
            existingPhotos={projectPhotos}
            imageType="project_images"
            parentId={editingProject.id}
          />
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="project-tags"
          className="text-sm font-medium text-foreground"
        >
          Tags
        </label>
        <Input
          id="project-tags"
          placeholder="React, TypeScript, Node.js (comma separated)"
          {...register("tags")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
      </div>

      {saveError && (
        <Alert variant="destructive" className="border-0 bg-destructive/5 p-4">
          <AlertDescription className="text-sm">{saveError}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 pt-6 border-t border-foreground/10">
        <Button
          type="submit"
          disabled={isSubmitting || saving}
          size="lg"
          className="border border-foreground/20 bg-transparent hover:bg-foreground hover:text-background text-foreground px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {(() => {
            if (isSubmitting || saving) {
              return editingProject ? "Updating..." : "Saving...";
            }
            return editingProject ? "Update Project" : "Save Project";
          })()}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          size="lg"
          className="border border-foreground/20 hover:border-foreground/40 px-8"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}
