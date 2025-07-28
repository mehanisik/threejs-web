import { zodResolver } from "@hookform/resolvers/zod";
import {
  Filter,
  Grid3X3,
  Image as ImageIcon,
  List,
  Search,
  Upload,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (image.type?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || image.type === filterType;
    return matchesSearch && matchesFilter;
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
              | "portrait"
              | "video"
              | "gif",
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
                      (img) => !(isVideo(img.url) || isGif(img.url)),
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
                    images.filter((img) => isVideo(img.url) || isGif(img.url))
                      .length
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Media</DialogTitle>
                <DialogDescription>
                  Upload images, videos, or GIFs and specify their details
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

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="preview">Preview</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="gif">GIF</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredImages.length} of {totalImages} images
          </div>

          <ImagesGrid
            images={filteredImages}
            projects={projects}
            onDelete={handleDeleteImage}
            viewMode={viewMode}
          />
        </CardContent>
      </Card>
    </div>
  );
};
