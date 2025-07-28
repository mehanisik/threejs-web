import { Image as ImageIcon, Play, Trash2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ImageRecord, Project } from "@/types/admin.types";

interface ImagesGridProps {
  images: ImageRecord[];
  projects: Project[];
  onDelete: (image: ImageRecord) => void;
  viewMode?: "grid" | "list";
}

export const ImagesGrid: React.FC<ImagesGridProps> = ({
  images,
  projects,
  onDelete,
  viewMode = "grid",
}) => {
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

  if (viewMode === "list") {
    return (
      <div className="space-y-2">
        {images?.map((image) => (
          <Card key={image.id} className="flex items-center space-x-4 p-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {isVideo(image.url) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Play className="w-6 h-6 text-gray-600" />
                </div>
              ) : (
                <img
                  src={image.url}
                  alt={image.type || "image"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="secondary" className="capitalize">
                  {image.type}
                </Badge>
                {isVideo(image.url) && <Badge variant="outline">Video</Badge>}
                {isGif(image.url) && <Badge variant="outline">GIF</Badge>}
              </div>
              <p className="text-sm text-gray-600 truncate">{image.url}</p>
              {image.project_id && (
                <p className="text-xs text-gray-500">
                  Project:{" "}
                  {projects?.find((p) => p.id === image.project_id)?.title}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(image)}
              className="flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images?.map((image) => (
        <Card
          key={image.id}
          className="group overflow-hidden hover:shadow-lg transition-all duration-200"
        >
          <div className="relative aspect-video bg-gray-100">
            {isVideo(image.url) ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="text-center">
                  <Play className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Video</p>
                </div>
              </div>
            ) : (
              <img
                src={image.url}
                alt={image.type || "image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden",
                  );
                }}
              />
            )}
            <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>

            {/* Overlay with delete button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(image)}
                className="shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="capitalize text-xs">
                  {image.type}
                </Badge>
                {isVideo(image.url) && (
                  <Badge variant="outline" className="text-xs">
                    Video
                  </Badge>
                )}
                {isGif(image.url) && (
                  <Badge variant="outline" className="text-xs">
                    GIF
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-600 truncate mb-1">{image.url}</p>
            {image.project_id && (
              <p className="text-xs text-gray-500 truncate">
                Project:{" "}
                {projects?.find((p) => p.id === image.project_id)?.title}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
