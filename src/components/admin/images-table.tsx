import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import type { ImageRecord, Project } from "@/types/admin.types";

interface ImagesTableProps {
  images: ImageRecord[];
  projects: Project[];
  selectedImages: Set<string>;
  onToggleSelection: (imageId: string) => void;
  onDelete: (image: ImageRecord) => void;
}

export const ImagesTable: React.FC<ImagesTableProps> = ({
  images,
  projects,
  selectedImages,
  onToggleSelection,
  onDelete,
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

  const columns: ColumnDef<ImageRecord>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={images.length > 0 && selectedImages.size === images.length}
          onCheckedChange={(value) => {
            if (value) {
              images.forEach((image) => {
                if (!selectedImages.has(image.id)) {
                  onToggleSelection(image.id);
                }
              });
            } else {
              images.forEach((image) => {
                if (selectedImages.has(image.id)) {
                  onToggleSelection(image.id);
                }
              });
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedImages.has(row.original.id)}
          onCheckedChange={() => onToggleSelection(row.original.id)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "preview",
      header: "Preview",
      cell: ({ row }) => {
        const image = row.original;
        return (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            {isVideo(image.image_url) ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-xs text-gray-600">Video</span>
              </div>
            ) : (
              <img
                src={image.image_url}
                alt={image.type || "image"}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const image = row.original;
        return (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {image.type}
            </Badge>
            {isVideo(image.image_url) && <Badge variant="outline">Video</Badge>}
            {isGif(image.image_url) && <Badge variant="outline">GIF</Badge>}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "project_id",
      header: "Project",
      cell: ({ row }) => {
        const image = row.original;
        if (!image.project_id) return <span className="text-gray-500">-</span>;

        const project = projects.find((p) => p.id === image.project_id);
        return (
          <div className="max-w-32 truncate" title={project?.title}>
            {project?.title || "Unknown Project"}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string;
        return (
          <div className="text-sm">
            {date ? new Date(date).toLocaleDateString() : "-"}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "image_url",
      header: "URL",
      cell: ({ row }) => {
        const url = row.getValue("image_url") as string;
        const fileName = url.split("/").pop() || url;
        return (
          <div className="max-w-48 truncate text-sm text-gray-600" title={url}>
            {fileName}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const image = row.original;
        return (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(image)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={images || []}
      searchPlaceholder="Search images..."
    />
  );
};
