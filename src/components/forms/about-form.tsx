import { Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { ImageUploader } from "@/components/admin/shared/image-uploader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/hooks/use-zod-form";
import { useAuth } from "@/lib/auth";
import type { AboutRecord } from "@/types/admin";

const aboutSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  address: z.string().optional(),
  portrait_url: z.string().optional(),
  languages: z.string().optional(),
  tools: z.string().optional(),
});

type AboutForm = z.infer<typeof aboutSchema>;

interface AboutFormProps {
  editingAbout?: AboutRecord | null;
  onSave: () => void;
  onCancel: () => void;
  handleSave?: (
    data: Partial<AboutRecord>,
    isEditing: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
}

interface UploadedPhoto {
  url: string;
  caption?: string;
  id?: string;
}

export function AboutForm({
  editingAbout,
  onSave,
  onCancel,
  handleSave,
}: AboutFormProps) {
  const [saveError, setSaveError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [portraitPhoto, setPortraitPhoto] = useState<UploadedPhoto[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<UploadedPhoto[]>([]);
  const { user, isAuthenticated } = useAuth();

  const { form, resetForm } = useZodForm(aboutSchema, {
    defaultValues: {
      bio: editingAbout?.bio || "",
      address: editingAbout?.address || "",
      portrait_url: editingAbout?.portrait_url || "",
      languages: editingAbout?.languages?.join(", ") || "",
      tools: editingAbout?.tools?.join(", ") || "",
    },
  });

  // Initialize portrait photo if available
  useEffect(() => {
    if (editingAbout?.portrait_url) {
      setPortraitPhoto([{ url: editingAbout.portrait_url }]);
    } else {
      setPortraitPhoto([]);
    }
  }, [editingAbout?.portrait_url]);

  // Update form values when editingAbout changes
  useEffect(() => {
    if (editingAbout) {
      // Reset form with new values when editing about changes
      resetForm({
        bio: editingAbout.bio || "",
        address: editingAbout.address || "",
        portrait_url: editingAbout.portrait_url || "",
        languages: editingAbout.languages?.join(", ") || "",
        tools: editingAbout.tools?.join(", ") || "",
      });
      console.log("Form reset with about:", editingAbout.id);
    } else {
      // Reset to empty form when creating new
      resetForm({
        bio: "",
        address: "",
        portrait_url: "",
        languages: "",
        tools: "",
      });
    }
  }, [editingAbout, resetForm]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = form;

  const portraitUrlValue = watch("portrait_url");

  const handleAboutSave = useCallback(
    async (data: AboutForm) => {
      try {
        setSaveError("");
        setSaving(true);

        const aboutData = {
          bio: data.bio,
          address: data.address || null,
          portrait_url: data.portrait_url || null,
          languages: data.languages
            ? data.languages
                .split(",")
                .map((lang) => lang.trim())
                .filter(Boolean)
            : null,
          tools: data.tools
            ? data.tools
                .split(",")
                .map((tool) => tool.trim())
                .filter(Boolean)
            : null,
        };

        if (handleSave) {
          // Use the new handleSave method
          const { success, error } = await handleSave(
            aboutData,
            !!editingAbout,
          );

          if (!success) {
            throw new Error(error || "Failed to save about information");
          }
        }

        reset();
        onSave();
      } catch (error: any) {
        setSaveError(error.message || "Failed to save about information");
      } finally {
        setSaving(false);
      }
    },
    [editingAbout, reset, onSave, handleSave],
  );

  const handlePortraitChange = useCallback(
    (photos: UploadedPhoto[]) => {
      if (photos.length > 0) {
        setValue("portrait_url", photos[0].url);
        setPortraitPhoto(photos);
      } else {
        setValue("portrait_url", "");
        setPortraitPhoto([]);
      }
    },
    [setValue],
  );

  const handlePreviewImagesChange = useCallback((photos: UploadedPhoto[]) => {
    setPreviewPhotos(photos);
  }, []);

  if (!(isAuthenticated && user)) {
    setImageError("You must be logged in to upload images");
  }

  return (
    <form onSubmit={handleSubmit(handleAboutSave)} className="space-y-6 mt-6">
      <div className="space-y-2">
        <label
          htmlFor="about-bio"
          className="text-sm font-medium text-foreground"
        >
          Bio*
        </label>
        <Textarea
          id="about-bio"
          placeholder="Enter your bio"
          {...register("bio")}
          className="min-h-32 border-foreground/20 focus-visible:border-foreground/60"
        />
        {errors.bio && (
          <Alert
            variant="destructive"
            className="border-0 bg-destructive/5 p-3"
          >
            <AlertDescription className="text-sm">
              {errors.bio.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="about-address"
          className="text-sm font-medium text-foreground"
        >
          Address
        </label>
        <Input
          id="about-address"
          placeholder="Enter your address"
          {...register("address")}
          className="h-10 border-foreground/20 focus-visible:border-foreground/60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="about-languages"
            className="text-sm font-medium text-foreground"
          >
            Languages
          </label>
          <Input
            id="about-languages"
            placeholder="JavaScript, TypeScript, Python (comma separated)"
            {...register("languages")}
            className="h-10 border-foreground/20 focus-visible:border-foreground/60"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="about-tools"
            className="text-sm font-medium text-foreground"
          >
            Tools & Technologies
          </label>
          <Input
            id="about-tools"
            placeholder="React, Node.js, Figma (comma separated)"
            {...register("tools")}
            className="h-10 border-foreground/20 focus-visible:border-foreground/60"
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-foreground">
          Portrait Image
        </span>
        <ImageUploader
          onUpload={handlePortraitChange}
          existingPhotos={portraitPhoto}
          imageType="portrait"
          parentId={editingAbout?.id}
        />
      </div>

      {editingAbout && user && (
        <div className="space-y-3">
          <span className="text-sm font-medium text-foreground">
            Preview Images
          </span>
          {imageError ? (
            <Alert
              variant="destructive"
              className="border-0 bg-destructive/5 p-3"
            >
              <AlertDescription className="text-sm">
                {imageError}
              </AlertDescription>
            </Alert>
          ) : (
            <ImageUploader
              onUpload={handlePreviewImagesChange}
              existingPhotos={previewPhotos}
              imageType="about_images"
              parentId={editingAbout.id}
            />
          )}
        </div>
      )}

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
              return editingAbout ? "Updating..." : "Saving...";
            }
            return editingAbout ? "Update About" : "Save About";
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
