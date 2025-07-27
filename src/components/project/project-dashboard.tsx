import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import { useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/hooks/use-supabase";
import supabase from "@/lib/supabase";

export const ProjectDashboard = () => {
  const { id } = useParams();

  const {
    data: project,
    loading: loadingProject,
    error: projectError,
  } = useSupabase({
    queryFn: async () => {
      if (!id) {
        throw new Error("Project ID is required");
      }
      const { data, error } = await supabase
        .from("projects")
        .select("*, images(*)")
        .eq("slug", id)
        .single();

      return { data, error, status: 200, statusText: "OK" };
    },
  });

  if (loadingProject) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Project not found
          </h1>
          <p className="text-muted-foreground mt-2">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const firstImage = project.images.find((image) => image.type === "cover");
  const remainingImages = project.images
    .filter((image) => image.type !== "cover")
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <main className="w-full min-h-screen bg-zinc-950">
      {firstImage && (
        <section className="relative w-full h-screen">
          <img
            src={firstImage.url}
            alt={`Project ${firstImage.type} content`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0  p-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
              {project.title}
            </h1>
          </div>
        </section>
      )}

      <section className="w-full py-20 px-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-between">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-foreground uppercase tracking-tight">
                About the project
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  {project.city && (
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {project.city}
                    </span>
                  )}
                  {project.date && (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {project.description && (
                <div>
                  <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-4">
                    Description
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {project.external_url && (
                <Button asChild variant="outline" size="lg">
                  <a
                    href={project.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Project
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {remainingImages.length > 0 && (
        <div className="w-full">
          <div className="space-y-0">
            {remainingImages.map((img, index) => {
              const isFullWidth = index % 3 === 0;

              if (isFullWidth) {
                return (
                  <div key={img.id} className="w-full">
                    {img.url && (
                      <img
                        src={img.url}
                        alt={`Project ${img.type} content`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                );
              }
              const nextImage = remainingImages[index + 1];
              if (nextImage && index % 3 !== 2) {
                return (
                  <div key={img.id} className="w-full flex gap-0">
                    <div className="w-1/2">
                      {img.url && (
                        <img
                          src={img.url}
                          alt={`Project ${img.type} content`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="w-1/2">
                      {nextImage.url && (
                        <img
                          src={nextImage.url}
                          alt={`Project ${nextImage.type} content`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div key={img.id} className="w-full">
                  {img.url && (
                    <img
                      src={img.url}
                      alt={`Project ${img.type} content`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {project.images.length === 0 && (
        <div className="flex items-center justify-center py-32">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto mb-4 w-12 h-12 opacity-40" />
            <p className="text-lg">No images for this project yet.</p>
          </div>
        </div>
      )}
    </main>
  );
};
