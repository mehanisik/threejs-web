import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ImagesGrid } from "@/components/admin/images-grid";
import { ImageForm } from "@/components/forms/image-form";
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
import { showErrorToast, showSuccessToast } from "@/components/ui/error-toast";
import { deleteImage, uploadImage } from "@/lib/admin";
import {
  type ImageRecord,
  imageSchema,
  type Project,
  type Service,
} from "@/types/admin.types";

interface ImageDialogProps {
  images: ImageRecord[];
  projects: Project[];
  services: Service[];
  refreshImages: () => void;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({
  images,
  projects,
  services,
  refreshImages,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const imageForm = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      type: "project",
      project_id: "",
      service_id: "",
    },
  });

  const handleImageSubmit = async (data: z.infer<typeof imageSchema>) => {
    if (data.file && data.file.length > 0) {
      setIsUploading(true);
      try {
        const files = Array.from(data.file as FileList);
        for (const file of files) {
          const result = await uploadImage(
            file,
            data.type as
              | "services"
              | "project"
              | "cover"
              | "preview"
              | "portrait",
            data.project_id,
          );

          if (result.error) {
            const errorMessage =
              typeof result.error === "object" &&
              result.error !== null &&
              "message" in result.error
                ? result.error.message
                : "Unknown error";
            showErrorToast(`Upload failed: ${errorMessage}`);
            return;
          }
        }
        refreshImages();
        setIsDialogOpen(false);
        imageForm.reset();
        showSuccessToast("Image uploaded successfully!");
      } catch (_error) {
        showErrorToast("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = async (image: ImageRecord) => {
    try {
      await deleteImage(image);
      refreshImages();
      showSuccessToast("Image deleted successfully!");
    } catch (_error) {
      showErrorToast("Delete failed. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Images</CardTitle>
          <CardDescription>Manage your image assets</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
              <DialogDescription>
                Upload an image and specify its details
              </DialogDescription>
            </DialogHeader>
            <ImageForm
              form={imageForm}
              services={services}
              onSubmit={handleImageSubmit}
              onCancel={() => setIsDialogOpen(false)}
              projects={projects}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ImagesGrid
          images={images}
          projects={projects}
          onDelete={handleDeleteImage}
        />
      </CardContent>
    </Card>
  );
};
