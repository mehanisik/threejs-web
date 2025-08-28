import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DragDropUpload } from "@/components/ui/drag-drop-upload";
import { deleteImageFn, fetchAllImages, uploadImageFn } from "@/lib/images";
import { listProjects } from "@/lib/projects";
import { listServices } from "@/lib/services";

export const Route = createFileRoute("/admin/images")({
  component: ImagesAdminPage,
});

function ImagesAdminPage() {
  const qc = useQueryClient();
  const [scope, setScope] = useState<
    "project" | "service" | "preview" | "portrait"
  >("project");
  const [selectedType, setSelectedType] = useState<string>("project");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState<boolean>(false);

  const imagesQuery = useQuery({
    queryKey: ["admin-images"],
    queryFn: () => fetchAllImages(),
  });
  const projectsQuery = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => listProjects(),
  });
  const servicesQuery = useQuery({
    queryKey: ["admin-services"],
    queryFn: () => listServices(),
  });

  const uploadMutation = useMutation({
    mutationFn: uploadImageFn,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-images"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImageFn,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-images"] }),
  });

  const [files, setFiles] = useState<File[]>([]);
  function handleFilesSelected(newFiles: File[]) {
    setFiles(newFiles);
  }

  async function onSubmitUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!files.length) return;
    setUploading(true);
    setProgress(0);
    let completed = 0;

    function readAsDataUrl(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = () => reject(fr.error);
        fr.onload = () => resolve(String(fr.result));
        fr.readAsDataURL(file);
      });
    }

    for (const file of files) {
      const dataUrl = await readAsDataUrl(file);
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
      await uploadMutation.mutateAsync({
        data: {
          fileBase64: base64,
          contentType: file.type,
          fileName: file.name,
          type: selectedType,
          projectId:
            scope === "project" && selectedProject
              ? selectedProject
              : undefined,
          serviceId:
            scope === "service" && selectedService
              ? selectedService
              : undefined,
        },
      });
      completed += 1;
      setProgress(Math.round((completed / files.length) * 100));
    }
    setUploading(false);
    setProgress(0);
    setFiles([]);
    setOpen(false);
  }

  const isLoading = imagesQuery.isLoading;
  const isError = !!imagesQuery.error;

  type ImageRow = { id: string | number; image_url: string; type?: string };
  const rows = (imagesQuery.data ?? []) as ImageRow[];

  const [filterType, setFilterType] = useState<string>("all");
  const typeOptions = [
    "all",
    "cover",
    "project",
    "services",
    "preview",
    "portrait",
  ] as const;

  const filteredRows = rows.filter((img) =>
    filterType === "all" ? true : img.type === filterType,
  );

  let availableTypes: string[] = ["preview"];
  if (scope === "project") availableTypes = ["cover", "project"];
  else if (scope === "service") availableTypes = ["services"];
  else if (scope === "portrait") availableTypes = ["portrait"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="flex items-center gap-3">
          <label
            className="text-sm text-muted-foreground"
            htmlFor="filter-type"
          >
            Filter
          </label>
          <select
            id="filter-type"
            className="border rounded px-2 py-1 text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Images</DialogTitle>
              </DialogHeader>
              <form onSubmit={onSubmitUpload} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label
                      className="text-sm text-muted-foreground"
                      htmlFor="scope"
                    >
                      Belongs to
                    </label>
                    <select
                      id="scope"
                      className="border rounded px-2 py-1 text-sm"
                      value={scope}
                      onChange={(e) => {
                        const v = e.target.value as
                          | "project"
                          | "service"
                          | "preview"
                          | "portrait";
                        setScope(v);
                        setSelectedProject("");
                        setSelectedService("");
                        if (v === "project") setSelectedType("project");
                        else if (v === "service") setSelectedType("services");
                        else if (v === "portrait") setSelectedType("portrait");
                        else setSelectedType("preview");
                      }}
                    >
                      <option value="project">Project</option>
                      <option value="service">Service</option>
                      <option value="preview">Preview</option>
                      <option value="portrait">Portrait</option>
                    </select>
                  </div>
                  {scope === "project" && (
                    <div className="flex items-center gap-3">
                      <label
                        className="text-sm text-muted-foreground"
                        htmlFor="project"
                      >
                        Project
                      </label>
                      <select
                        id="project"
                        className="border rounded px-2 py-1 text-sm min-w-56"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <option value="">Select project</option>
                        {projectsQuery.data?.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {scope === "service" && (
                    <div className="flex items-center gap-3">
                      <label
                        className="text-sm text-muted-foreground"
                        htmlFor="service"
                      >
                        Service
                      </label>
                      <select
                        id="service"
                        className="border rounded px-2 py-1 text-sm min-w-56"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="">Select service</option>
                        {servicesQuery.data?.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label
                      className="text-sm text-muted-foreground"
                      htmlFor="img-type"
                    >
                      Image type
                    </label>
                    <select
                      id="img-type"
                      className="border rounded px-2 py-1 text-sm"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      {availableTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <DragDropUpload
                  onFilesSelected={handleFilesSelected}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                  }}
                  multiple
                  uploading={uploading}
                  uploadProgress={progress}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={uploading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!files.length || uploading}>
                    {uploading
                      ? `Uploading ${progress}%`
                      : `Upload${files.length ? ` (${files.length})` : ""}`}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading && <div>Loading images...</div>}
      {!isLoading && isError && <div>Error loading images</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRows.map((img) => (
          <div key={String(img.id)} className="border rounded overflow-hidden">
            <img
              src={img.image_url}
              alt={String(img.id)}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 flex items-center justify-between text-sm">
              <span className="truncate">{img.type || "image"}</span>
              <button
                type="button"
                className="px-2 py-1 border rounded"
                onClick={() =>
                  deleteMutation.mutate({
                    data: { id: img.id, image_url: img.image_url },
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
