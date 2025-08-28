import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createProjectFn,
  deleteProjectFn,
  listProjectsAdmin,
  type ProjectInsert,
  type ProjectRow,
  updateProjectFn,
} from "@/lib/admin";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjectsPage,
});

function AdminProjectsPage() {
  const qc = useQueryClient();
  const projectsQuery = useQuery({
    queryKey: ["admin-projects-list"],
    queryFn: () => listProjectsAdmin(),
  });

  const createMutation = useMutation({
    mutationFn: createProjectFn,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin-projects-list"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateProjectFn,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin-projects-list"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProjectFn,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin-projects-list"] }),
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState<number>(0);

  useEffect(() => {
    if (!slug && title) {
      const s = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug((prev) => (prev ? prev : s));
    }
  }, [title, slug]);

  function startCreate() {
    setEditing(null);
    setTitle("");
    setSlug("");
    setCity("");
    setDate("");
    setExternalUrl("");
    setTagsInput("");
    setDescription("");
    setOrderIndex(0);
    setOpen(true);
  }

  function startEdit(p: ProjectRow) {
    setEditing(p);
    setTitle(p.title);
    setSlug(p.slug || "");
    setCity(p.city || "");
    setDate(p.date || "");
    setExternalUrl(p.external_url || "");
    setTagsInput(Array.isArray(p.tags) ? p.tags.join(", ") : "");
    setDescription(p.description || "");
    setOrderIndex(p.order_index);
    setOpen(true);
  }

  const tagsArray = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || null,
      city: city || null,
      date: date || null,
      external_url: externalUrl || null,
      tags: tagsArray.length ? tagsArray : null,
      description: description || null,
      order_index: orderIndex,
    };
    if (editing) {
      await updateMutation.mutateAsync({
        data: { id: editing.id, ...payload },
      });
    } else {
      await createMutation.mutateAsync({ data: payload as ProjectInsert });
    }
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" onClick={startCreate}>
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Project" : "New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="title"
                    className="text-sm text-muted-foreground"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="slug"
                    className="text-sm text-muted-foreground"
                  >
                    Slug
                  </label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="city"
                    className="text-sm text-muted-foreground"
                  >
                    City
                  </label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="date"
                    className="text-sm text-muted-foreground"
                  >
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label
                    htmlFor="external"
                    className="text-sm text-muted-foreground"
                  >
                    External URL
                  </label>
                  <Input
                    id="external"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label
                    htmlFor="tags"
                    className="text-sm text-muted-foreground"
                  >
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="react, threejs, ui"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-sm text-muted-foreground"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[96px] border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="order"
                    className="text-sm text-muted-foreground"
                  >
                    Order
                  </label>
                  <Input
                    id="order"
                    type="number"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value || 0))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {editing ? "Save" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projectsQuery.isLoading && <div>Loading...</div>}
      {!projectsQuery.isLoading && projectsQuery.error && (
        <div>Error loading projects</div>
      )}

      {projectsQuery.data && (
        <ProjectsTable
          rows={projectsQuery.data}
          onEdit={startEdit}
          onDelete={(id) => deleteMutation.mutate({ data: { id } })}
        />
      )}
    </div>
  );
}

function ProjectsTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: ProjectRow[];
  onEdit: (p: ProjectRow) => void;
  onDelete: (id: string) => void;
}) {
  const columns: ColumnDef<ProjectRow>[] = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <span>/{row.original.slug || "no-slug"}</span>,
    },
    { accessorKey: "city", header: "City" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "order_index", header: "Order" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable<ProjectRow, unknown>
      columns={columns}
      data={rows}
      searchPlaceholder="Search projects..."
      searchColumn="title"
      pageSizeOptions={[10, 20, 50]}
    />
  );
}
