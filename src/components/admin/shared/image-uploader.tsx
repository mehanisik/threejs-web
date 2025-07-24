import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";

interface UploadedPhoto {
  url: string;
  caption?: string;
  id?: string;
}

interface DatabaseRecord {
  id: string;
  [key: string]: any;
}

interface ImageUploaderProps {
  onUpload: (photos: UploadedPhoto[]) => void;
  existingPhotos?: UploadedPhoto[];
  imageType?: "portrait" | "about_images" | "project_images";
  parentId?: string;
}

const SortablePhoto = ({
  id,
  index,
  photo,
  onRemove,
  onMoveUp,
  onMoveDown,
  onCaptionChange,
  isFirst,
  isLast,
}: {
  id: string;
  index: number;
  photo: UploadedPhoto;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onCaptionChange: (caption: string) => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative border p-2 rounded-md shadow-sm flex flex-col"
    >
      <div {...listeners} className="cursor-grab absolute top-1 left-1">
        <GripVertical
          size={26}
          className=" py-1 px-0 rounded-md shadow-sm bg-primary text-primary-foreground"
        />
      </div>

      <img
        src={photo.url}
        alt={`Uploaded Preview ${index + 1}`}
        className="w-full h-32 object-cover rounded-md"
      />

      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={onRemove}
        className="absolute top-1 right-1"
      >
        X
      </Button>

      <div className="flex justify-between items-center mt-2 space-x-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={isFirst}
          onClick={onMoveUp}
        >
          ↑
        </Button>
        <Textarea
          placeholder="Enter caption (optional)"
          value={photo.caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          className="mt-2 text-sm"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={isLast}
          onClick={onMoveDown}
        >
          ↓
        </Button>
      </div>
    </div>
  );
};

export const ImageUploader = ({
  onUpload,
  existingPhotos = [],
  imageType,
  parentId,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { user } = useAuth();

  // Always use the 'images' bucket
  const BUCKET = "images";

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (existingPhotos.length > 0) {
      setPhotos(existingPhotos);
    }
  }, []);

  const updatePhotos = async (newPhotos: UploadedPhoto[]) => {
    setPhotos(newPhotos);
    onUpload(newPhotos);
  };

  const saveImageToDatabase = async (imageUrl: string, isCover = false) => {
    if (!(imageType && parentId)) return null;

    try {
      let data: DatabaseRecord[] | null = null;
      let error: Error | null = null;

      switch (imageType) {
        case "portrait":
          // Update portrait_url in the about table
          ({ data, error } = await supabase
            .from("about")
            .update({ portrait_url: imageUrl })
            .eq("id", parentId)
            .select());
          break;

        case "about_images":
          // Insert into about_images table
          ({ data, error } = await supabase
            .from("about_images")
            .insert([
              {
                image_url: imageUrl,
                user_id: parentId,
              },
            ])
            .select());
          break;

        case "project_images":
          ({ data, error } = await supabase
            .from("project_images")
            .insert([
              {
                image_url: imageUrl,
                project_id: parentId,
                is_cover: isCover,
              },
            ])
            .select());
          break;
      }

      if (error) {
        console.error(`Failed to save image to ${imageType}:`, error);
        return null;
      }

      return data?.[0]?.id || null;
    } catch (err) {
      console.error(`Error saving image to database:`, err);
      return null;
    }
  };

  const deleteImageFromDatabase = async (photoId: string) => {
    if (!(imageType && photoId)) return false;

    try {
      let error: Error | null = null;

      switch (imageType) {
        case "portrait":
          // Only update if parentId exists
          if (parentId) {
            ({ error } = await supabase
              .from("about")
              .update({ portrait_url: null })
              .eq("id", parentId));
          }
          break;

        case "about_images":
          ({ error } = await supabase
            .from("about_images")
            .delete()
            .eq("id", photoId));
          break;

        case "project_images":
          ({ error } = await supabase
            .from("project_images")
            .delete()
            .eq("id", photoId));
          break;
      }

      if (error) {
        console.error(`Failed to delete image from ${imageType}:`, error);
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error deleting image from database:`, err);
      return false;
    }
  };

  const uploadFiles = async (files: FileList | File[]) => {
    if (!user) {
      setError("You must be logged in to upload images");
      return;
    }

    if (imageType && !parentId) {
      setError(`Missing parent ID for ${imageType}`);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    const validFiles = Array.from(files).filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        setError(`File too large: ${file.name} (Max: 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadedPhotos: UploadedPhoto[] = [];

      for (const file of validFiles) {
        const fileName = `${uuidv4()}_${file.name}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, file);

        if (uploadError) throw new Error(uploadError.message);

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

        if (!data.publicUrl) throw new Error("Failed to retrieve public URL");

        // Save to database if needed
        let dbId = null;
        if (imageType && parentId) {
          // If it's a portrait and there's already one, we're replacing it
          const isPortraitReplacement =
            imageType === "portrait" && photos.length > 0;

          // For project images, first image is cover if none exists
          const isCover =
            imageType === "project_images" &&
            photos.length === 0 &&
            !photos.some((p) => p.id && p.caption === "cover");

          dbId = await saveImageToDatabase(data.publicUrl, isCover);
        }

        uploadedPhotos.push({
          url: data.publicUrl,
          caption: "",
          id: dbId || undefined,
        });
      }

      updatePhotos([...photos, ...uploadedPhotos]);
    } catch (uploadError: unknown) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "An unknown error occurred",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = event.target.files;
    if (!files || files.length === 0) {
      setError("Please select at least one file.");
      return;
    }
    uploadFiles(files);
  };

  const handleAddUrl = async () => {
    if (!imageUrl) return;

    try {
      new URL(imageUrl);
    } catch {
      setError("Invalid URL format.");
      return;
    }

    if (!user) {
      setError("You must be logged in to add images");
      return;
    }

    if (imageType && !parentId) {
      setError(`Missing parent ID for ${imageType}`);
      return;
    }

    setUploading(true);

    try {
      // Save to database if needed
      let dbId = null;
      if (imageType && parentId) {
        // If it's a portrait and there's already one, we're replacing it
        const isPortraitReplacement =
          imageType === "portrait" && photos.length > 0;

        // For project images, first image is cover if none exists
        const isCover =
          imageType === "project_images" &&
          photos.length === 0 &&
          !photos.some((p) => p.id && p.caption === "cover");

        dbId = await saveImageToDatabase(imageUrl, isCover);
      }

      updatePhotos([
        ...photos,
        { url: imageUrl, caption: "", id: dbId || undefined },
      ]);
      setImageUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add image URL");
    } finally {
      setUploading(false);
    }
  };

  const movePhoto = (from: number, to: number) => {
    if (to < 0 || to >= photos.length) return;
    const updated = [...photos];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updatePhotos(updated);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = photos.findIndex((_, i) => `photo-${i}` === active.id);
      const newIndex = photos.findIndex((_, i) => `photo-${i}` === over?.id);
      updatePhotos(arrayMove(photos, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const removePhoto = async (index: number) => {
    const photo = photos[index];

    // Delete from database if needed
    if (imageType && photo.id) {
      const success = await deleteImageFromDatabase(photo.id);
      if (!success) {
        setError(`Failed to delete image from database`);
        return;
      }
    }

    // Also try to delete from storage if it's in our bucket
    if (photo.url.includes(BUCKET)) {
      try {
        const urlParts = photo.url.split("/");
        const filePath = urlParts[urlParts.length - 1];
        if (filePath) {
          await supabase.storage.from(BUCKET).remove([filePath]);
        }
      } catch (err) {
        console.error("Failed to delete image from storage:", err);
        // Continue even if storage deletion fails
      }
    }

    const updated = photos.filter((_, i) => i !== index);
    updatePhotos(updated);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="file-upload" className="cursor-pointer">
        Images
      </label>
      <div className="flex items-center gap-4">
        <div className="flex items-center pb-2">
          <label
            htmlFor="file-upload"
            className={buttonVariants({
              variant: "outline",
              className: `cursor-pointer flex items-center space-x-2 border p-2 rounded-md hover:bg-muted ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`,
            })}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pb-2">
        <Input
          type="url"
          placeholder="Enter Image URL (e.g., Unsplash)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleAddUrl} disabled={!imageUrl.trim() || uploading}>
          Add
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {photos.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={photos.map((_, i) => `photo-${i}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <SortablePhoto
                  key={`photo-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  id={`photo-${index}`}
                  index={index}
                  photo={photo}
                  onRemove={() => removePhoto(index)}
                  onMoveUp={() => movePhoto(index, index - 1)}
                  onMoveDown={() => movePhoto(index, index + 1)}
                  onCaptionChange={(caption) => {
                    const updated = [...photos];
                    updated[index].caption = caption;
                    updatePhotos(updated);
                  }}
                  isFirst={index === 0}
                  isLast={index === photos.length - 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
