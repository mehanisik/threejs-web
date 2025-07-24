import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSupabaseTable } from "@/hooks/use-supabase-query";
import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { LoadingSpinner } from "./shared/loading-spinner";

export function PreviewImagesManagement() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { records, isLoading } = useSupabaseTable("about_images");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);
        if (!publicData?.publicUrl) throw new Error("Failed to get public URL");
        const { error: dbError } = await supabase
          .from("about_images")
          .insert({ image_url: publicData.publicUrl, user_id: user.id });
        if (dbError) throw dbError;
      }
    } catch (err) {
      setError((err as Error).message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  function getFileNameFromUrl(url: string): string {
    const parts = url.split("/");
    const last = parts[parts.length - 1];
    return typeof last === "string" ? last : "";
  }

  const handleDelete = async (id: string, imageUrl: string) => {
    setError(null);
    try {
      const fileName: string = getFileNameFromUrl(imageUrl);
      if (fileName) {
        await supabase.storage.from("images").remove([fileName]);
      }
      const { error: dbError } = await supabase
        .from("about_images")
        .delete()
        .eq("id", id);
      if (dbError) throw dbError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
    }
  };

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  } else if (records?.length === 0) {
    content = (
      <div className="text-muted-foreground text-center py-8">
        No preview images uploaded yet.
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {records?.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-md overflow-hidden border border-border/30 bg-muted/30"
          >
            <img
              src={img.image_url}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
              onClick={() => handleDelete(img.id, img.image_url)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">Preview Images</h2>
        <label htmlFor="preview-upload" className="inline-block">
          <Input
            id="preview-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <Button asChild disabled={uploading} variant="outline">
            <span>{uploading ? "Uploading..." : "Upload Images"}</span>
          </Button>
        </label>
      </div>
      {error && <div className="mb-4 text-destructive text-sm">{error}</div>}
      <Card className="bg-background border-border/40">
        <div className="p-4">{content}</div>
      </Card>
    </div>
  );
}
