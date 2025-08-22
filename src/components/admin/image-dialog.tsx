import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckSquare,
  Image as ImageIcon,
  Square,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ImagesTable } from "@/components/admin/images-table";
import { ImageForm } from "@/components/forms/image-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DragDropUpload } from "@/components/ui/drag-drop-upload";
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
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    open: boolean;
    image?: ImageRecord;
    isBulk?: boolean;
  }>({ open: false });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const isVideo = (url: string): boolean => {
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".mov",
      ".avi",
      ".wmv",
      ".flv",
      ".mkv",
      ".3gp",
      ".3g2",
    ];
    return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
  };

  const isGif = (url: string): boolean => {
    return url.toLowerCase().includes(".gif");
  };

  const imageForm = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      type: "project",
      project_id: "",
      service_id: "",
    },
  });

  const totalImages = images.length;

  const handleFilesSelected = (files: File[]) => {
    console.log("Files selected:", files);
    setSelectedFiles(files);
  };

  const handleImageSubmit = async (data: z.infer<typeof imageSchema>) => {
    console.log("Upload started with data:", data);
    console.log("Selected files:", selectedFiles);

    if (selectedFiles.length === 0) {
      showErrorToast("Please select files to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const progress = ((i + 1) / selectedFiles.length) * 100;
        setUploadProgress(progress);

        console.log(
          `Uploading file ${i + 1}/${selectedFiles.length}:`,
          file.name,
        );

        const result = await uploadImage(
          file,
          data.type as
            | "services"
            | "project"
            | "cover"
            | "preview"
            | "portrait"
            | "video"
            | "gif",
          data.project_id,
        );

        console.log(`Upload result for ${file.name}:`, result);

        if (result.error) {
          const errorMessage =
            typeof result.error === "object" &&
            result.error !== null &&
            "message" in result.error
              ? result.error.message
              : "Unknown error";
          console.error(`Upload failed for ${file.name}:`, result.error);
          showErrorToast(`Upload failed for ${file.name}: ${errorMessage}`);
        }
      }

      refreshImages();
      setIsDialogOpen(false);
      setSelectedFiles([]);
      imageForm.reset();
      showSuccessToast(
        `${selectedFiles.length} file(s) uploaded successfully!`,
      );
    } catch (_error) {
      showErrorToast("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteImage = async (image: ImageRecord) => {
    setDeleteConfirmDialog({ open: true, image, isBulk: false });
  };

  const confirmDeleteImage = async () => {
    const { image, isBulk } = deleteConfirmDialog;

    try {
      if (isBulk && selectedImages.size > 0) {
        // Bulk delete
        const imagesToDelete = images.filter((img) =>
          selectedImages.has(img.id),
        );

        let successCount = 0;
        let errorCount = 0;

        for (const img of imagesToDelete) {
          const result = await deleteImage({ id: img.id, url: img.image_url });
          if (result.error) {
            console.error("Failed to delete image:", img.id, result.error);
            errorCount++;
          } else {
            successCount++;
          }
        }

        setSelectedImages(new Set());

        if (errorCount === 0) {
          showSuccessToast(`${successCount} images deleted successfully!`);
        } else if (successCount === 0) {
          showErrorToast(`Failed to delete ${errorCount} images.`);
        } else {
          showSuccessToast(
            `${successCount} images deleted successfully. ${errorCount} failed.`,
          );
        }
      } else if (image) {
        // Single delete
        const result = await deleteImage({
          id: image.id,
          url: image.image_url,
        });
        if (result.error) {
          console.error("Failed to delete image:", image.id, result.error);
          showErrorToast("Delete failed. Please try again.");
          return;
        }
        showSuccessToast("Image deleted successfully!");
      }

      refreshImages();
    } catch (error) {
      console.error("Unexpected error in confirmDeleteImage:", error);
      showErrorToast("Delete failed. Please try again.");
    } finally {
      setDeleteConfirmDialog({ open: false });
    }
  };

  const handleBulkDelete = () => {
    if (selectedImages.size === 0) {
      showErrorToast("Please select images to delete");
      return;
    }
    setDeleteConfirmDialog({ open: true, isBulk: true });
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    setSelectedImages(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map((img) => img.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Media</p>
                <p className="text-2xl font-bold text-blue-700">
                  {totalImages}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">Images</p>
                <p className="text-2xl font-bold text-green-700">
                  {
                    images.filter(
                      (img) =>
                        !(isVideo(img.image_url) || isGif(img.image_url)),
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Videos & GIFs
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {
                    images.filter(
                      (img) => isVideo(img.image_url) || isGif(img.image_url),
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-semibold">
              Media Library
            </CardTitle>
            <CardDescription>
              Manage your image and video assets
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={isUploading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Media"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload New Media</DialogTitle>
                <DialogDescription>
                  Upload images, videos, or GIFs and specify their details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <DragDropUpload
                  onFilesSelected={handleFilesSelected}
                  uploading={isUploading}
                  uploadProgress={uploadProgress}
                />
                <ImageForm
                  form={imageForm}
                  services={services}
                  onSubmit={handleImageSubmit}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setSelectedFiles([]);
                  }}
                  projects={projects}
                  uploading={isUploading}
                  hasFiles={selectedFiles.length > 0}
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Bulk operations bar */}
          {selectedImages.size > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {selectedImages.size} image(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedImages(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                Total: {totalImages} images
              </div>
              {images.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="text-xs"
                >
                  {selectedImages.size === images.length ? (
                    <>
                      <CheckSquare className="w-3 h-3 mr-1" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <Square className="w-3 h-3 mr-1" />
                      Select All ({images.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <ImagesTable
            images={images}
            projects={projects}
            selectedImages={selectedImages}
            onToggleSelection={toggleImageSelection}
            onDelete={handleDeleteImage}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmDialog.open}
        onOpenChange={(open) => setDeleteConfirmDialog({ open })}
        title={
          deleteConfirmDialog.isBulk
            ? `Delete ${selectedImages.size} Images?`
            : "Delete Image?"
        }
        description={
          deleteConfirmDialog.isBulk
            ? `Are you sure you want to delete ${selectedImages.size} selected images? This action cannot be undone.`
            : `Are you sure you want to delete this image? This action cannot be undone.`
        }
        confirmText="Delete"
        variant="destructive"
        onConfirm={confirmDeleteImage}
      />
    </div>
  );
};
