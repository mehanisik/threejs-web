import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params: { slug } }) => {
    const project = await getProjectBySlug({ data: slug });
    // Get ordered projects with cover images to compute next + preview
    const { projects } = await getProjects();
    const idx = projects.findIndex((p) => p.slug === slug);
    const next = idx >= 0 ? projects[(idx + 1) % projects.length] : undefined;
    const nextCover = next?.coverImage?.[0]?.image_url as string | undefined;

    return {
      project,
      nextSlug: next?.slug,
      nextTitle: next?.title,
      nextCover,
    };
  },
  pendingComponent: ProjectPending,
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { slug } = Route.useParams();
  const { project, nextSlug, nextTitle, nextCover } = Route.useLoaderData();

  const projectImages = project?.images || [];
  const coverImage = projectImages.find((image) => image.type === "cover");

  const gridColsClass = (() => {
    const len = projectImages.length;
    if (len === 1) return "grid-cols-1 max-w-5xl mx-auto";
    if (len === 2) return "grid-cols-1 sm:grid-cols-2";
    if (len === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    if (len === 4) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
    if (len <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  })();

  const computeSpanClass = (index: number, len: number) => {
    if (len === 4 && index === 0) return "sm:col-span-2 xl:col-span-2";
    if (len === 5 && index === 0) return "sm:col-span-2 lg:col-span-2";
    if (len === 6 && (index === 0 || index === 1))
      return "sm:col-span-1 lg:col-span-1";
    if (len >= 7 && index === 0)
      return "sm:col-span-2 md:col-span-2 lg:col-span-2";
    if (len >= 9 && index === 1) return "md:col-span-1 lg:col-span-2";
    return "";
  };

  const computeAspectRatio = (index: number, len: number) => {
    if (len === 1) return "16/10";
    if (len === 2) return "4/3";
    if (len >= 7 && index === 0) return "16/10";
    if (len >= 9 && index === 1) return "16/10";
    return "4/3";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.985 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
          duration: 0.45,
        }}
        className="will-change-transform"
      >
        <div className="bg-background min-h-screen pt-28 md:pt-20 pb-16">
          <header className="border-b border-foreground/10 p-6">
            <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
              <Link
                to="/projects"
                className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>{project?.city}</span>
                <span>•</span>
                <span>{project?.date}</span>
              </div>
            </div>
          </header>

          <section className="p-6 border-b border-foreground/10">
            <div className="w-full px-4 sm:px-6 lg:px-12">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-sm font-mono text-foreground/50">
                  {project?.order_index?.toString().padStart(3, "0")}
                </span>
                <h1 className="text-4xl md:text-6xl font-light text-foreground">
                  {project?.title}
                </h1>
              </div>
              {project?.description && (
                <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
                  {project?.description}
                </p>
              )}
            </div>
          </section>

          {coverImage?.image_url && (
            <section className="p-4 sm:p-6">
              <div className="w-full px-2 sm:px-6 lg:px-12">
                <div className="relative overflow-hidden bg-foreground/5 rounded-lg shadow-sm">
                  <img
                    src={coverImage.image_url}
                    alt={`${project?.title} cover`}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
              </div>
            </section>
          )}

          <section className="p-4 sm:p-6">
            <div className="w-full px-2 sm:px-6 lg:px-12">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-light mb-2 text-foreground">
                  Project Gallery
                </h2>
                <p className="text-sm sm:text-base text-foreground/60">
                  {projectImages.length} images
                </p>
              </div>

              <div className={`grid gap-3 sm:gap-4 md:gap-6 ${gridColsClass}`}>
                {projectImages.map((image, index: number) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`group cursor-pointer ${computeSpanClass(index, projectImages.length)}`}
                    onClick={() => setSelectedImage(image.image_url)}
                  >
                    <div className="relative overflow-hidden bg-foreground/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={`${project?.title} gallery item ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          aspectRatio: computeAspectRatio(
                            index,
                            projectImages.length,
                          ),
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {projectImages.length === 0 && (
                <div className="text-center py-12 sm:py-16 text-foreground/50">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-foreground/5 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/30" />
                    </div>
                    <p className="text-sm sm:text-base">
                      No images available for this project
                    </p>
                    <p className="text-xs sm:text-sm text-foreground/30 mt-2">
                      Images will appear here once uploaded
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {nextSlug && (
            <section className="px-0 sm:px-0 lg:px-0 mt-10">
              <div className="border-t border-foreground/10 pt-6 px-4 sm:px-6 lg:px-12">
                <p className="text-xs uppercase tracking-wider text-foreground/40 mb-3">
                  Next project
                </p>
                <Link
                  to="/projects/$slug"
                  params={{ slug: nextSlug }}
                  className="block group"
                  aria-label={`Next project: ${nextTitle}`}
                >
                  <div className="w-full overflow-hidden rounded-t-lg bg-foreground/5">
                    {nextCover ? (
                      <motion.img
                        src={nextCover}
                        alt={`${nextTitle} preview`}
                        initial={{ y: 12, opacity: 0.9 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 140,
                          damping: 20,
                          duration: 0.45,
                        }}
                        className="w-full object-cover"
                        style={{ aspectRatio: "32/5", objectPosition: "top" }}
                      />
                    ) : (
                      <div className="h-16 w-full bg-foreground/10" />
                    )}
                  </div>
                  <div className="px-4 sm:px-6 lg:px-12 py-3 flex items-center gap-2 text-foreground/80 group-hover:text-foreground transition-colors">
                    <span className="text-lg sm:text-xl font-light underline decoration-transparent group-hover:decoration-foreground/40 underline-offset-4 transition-[text-decoration-color]">
                      {nextTitle}
                    </span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 6 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 26,
                      }}
                      className="inline-flex"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={selectedImage}
                alt={`Enlarged view of ${project?.title}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectPending() {
  return (
    <div className="bg-background min-h-screen pt-28 md:pt-20 pb-16">
      <section className="p-6 border-b border-foreground/10">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="h-4 w-10 bg-foreground/10 rounded" />
            <div className="h-10 w-64 max-w-full bg-foreground/10 rounded" />
          </div>
          <div className="h-5 w-[36rem] max-w-full bg-foreground/10 rounded" />
        </div>
      </section>

      <section className="p-4 sm:p-6">
        <div className="w-full px-2 sm:px-6 lg:px-12">
          <div className="w-full overflow-hidden bg-foreground/5 rounded-lg">
            <div className="w-full" style={{ aspectRatio: "16/9" }} />
          </div>
        </div>
      </section>

      <section className="p-4 sm:p-6">
        <div className="w-full px-2 sm:px-6 lg:px-12">
          <div className="mb-6 sm:mb-8">
            <div className="h-6 w-40 bg-foreground/10 rounded mb-2" />
            <div className="h-4 w-24 bg-foreground/10 rounded" />
          </div>
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <div
                key={k}
                className="w-full bg-foreground/10 rounded"
                style={{ aspectRatio: "4/3" }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
