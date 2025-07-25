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
import { deleteImage, uploadImage } from "@/lib/admin";
import { type ImageRecord, imageSchema, type Project } from "@/types/admin";

interface ImageDialogProps {
  images: ImageRecord[];
  projects: Project[];
  refreshImages: () => void;
  isLoadingImages: boolean;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({
  images,
  projects,
  refreshImages,
  isLoadingImages,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imageForm = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      type: "project",
      project_id: "",
    },
  });

  const handleImageSubmit = async (data: z.infer<typeof imageSchema>) => {
    if (data.file && data.file.length > 0) {
      const files = Array.from(data.file as FileList);
      for (const file of files) {
        await uploadImage(file, data.type, data.project_id);
      }
      refreshImages();
      setIsDialogOpen(false);
      imageForm.reset();
    }
  };
  const handleDeleteImage = async (image: ImageRecord) => {
    await deleteImage(image);
    refreshImages();
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
            <Button>
              <Upload className="w-4 h-4 mr-2" /> Upload Image
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
          isLoading={isLoadingImages}
          onDelete={handleDeleteImage}
        />
      </CardContent>
    </Card>
  );
};
