import { Trash2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ImageRecord, Project } from "@/types/admin.types";

interface ImagesGridProps {
  images: ImageRecord[];
  projects: Project[];
  onDelete: (image: ImageRecord) => void;
}

export const ImagesGrid: React.FC<ImagesGridProps> = ({
  images,
  projects,
  onDelete,
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images?.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <img
              src={image.url}
              alt={image.type || "image"}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{image.type}</Badge>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(image)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 truncate">{image.url}</p>
            {image.project_id && (
              <p className="text-xs text-gray-500 mt-1">
                Project:{" "}
                {projects?.find((p) => p.id === image.project_id)?.title}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </>
);
